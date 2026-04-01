# Data Flow — Ключевые сценарии

Описание потоков данных для сложных сценариев.
Читать перед реализацией соответствующего модуля.

---

## 1. Регистрация и синхронизация пользователя

```
Пользователь заполняет форму Clerk (email, имя, роль)
    ↓
Clerk создаёт сессию
    ↓
Clerk отправляет webhook → POST /api/webhooks/clerk
    ↓
auth.syncUser():
  - upsert User в БД (clerkId, email, name, role, accountType)
  - создать Subscription{ plan: FREE }
  - если роль FREELANCER → создать пустой FreelancerProfile{ status: DRAFT }
    ↓
Редирект в /dashboard
```

**Важно:** пользователь существует в Clerk до того, как попадёт в нашу БД.
Все `protectedProcedure` должны проверять наличие User в БД, а не только сессию Clerk.

---

## 2. Переключение роли

```
Пользователь нажимает "Стать заказчиком" / "Стать фрилансером"
    ↓
auth.switchRole({ role })
    ↓
  - Обновить user.role в БД
  - Обновить publicMetadata.role в Clerk
  - Если переключается на FREELANCER и профиля нет →
    создать FreelancerProfile{ status: DRAFT }
    ↓
Clerk инвалидирует сессию → перезагрузка токена
    ↓
UI перестраивается под новую роль
```

---

## 3. Публикация вакансии (основной флоу с оплатой)

```
Заказчик создаёт Job{ status: DRAFT }
    ↓
Нажимает "Опубликовать"
    ↓
job.publish({ jobId })
    ↓
    ├── Есть активная подписка + jobPostsLeft > 0?
    │       ↓ ДА
    │   subscription.jobPostsLeft--
    │   job.status = PENDING
    │   уведомить модераторов
    │   вернуть { success: true }
    │
    └── Нет слотов / нет подписки?
            ↓ НЕТ
        payment.createJobPayment({ jobId })
            ↓
        создать Payment{ purpose: JOB_PUBLICATION, status: PENDING }
        вызвать ЮKassa API → получить confirmationUrl
        вернуть { redirectUrl: confirmationUrl }
            ↓
        Пользователь оплачивает на странице ЮKassa
            ↓
        ЮKassa → POST /api/webhooks/youkassa
            ↓
        event = "payment.succeeded"
        Payment.status = PAID
        Job.publicationPaymentId = payment.id
        Job.status = PENDING
        уведомить модераторов
```

**Важно при отклонении вакансии модератором:**
- Если `job.publicationPaymentId` заполнен → инициировать возврат через ЮKassa API
- Если `publicationPaymentId` = null → вернуть слот: `subscription.jobPostsLeft++`

---

## 4. Вариант А: Заказчик публикует → фрилансер откликается

```
Job{ status: PUBLISHED } виден в каталоге
    ↓
Фрилансер нажимает "Откликнуться"
    ↓
proposal.create({ jobId, coverLetter, price, durationDays })
    ↓
  - Проверить @@unique([jobId, freelancerId]) — нельзя дважды
  - Создать Proposal{ status: PENDING }
  - Создать Conversation{ proposalId } + ConversationParticipant × 2
  - Уведомить заказчика (email + Telegram)
    ↓
Заказчик просматривает отклики
    ↓
proposal.accept({ proposalId })
    ↓
  - Proposal.status = ACCEPTED
  - Остальные отклики на этот Job → status = REJECTED
  - Job.status = IN_PROGRESS
  - Создать Contract{ proposalId, freelancerId, clientId, amount }
  - Уведомить фрилансера
```

---

## 5. Вариант Б: Заказчик приглашает фрилансера напрямую

```
Заказчик находит фрилансера в каталоге
    ↓
invitation.send({ receiverId, message, jobId? })
    ↓
  - Создать Invitation{ status: PENDING, expiresAt: now+7days }
  - Создать Conversation{ invitationId } + ConversationParticipant × 2
  - Уведомить фрилансера (email + Telegram)
    ↓
Фрилансер принимает
    ↓
invitation.accept({ invitationId })
    ↓
  - Invitation.status = ACCEPTED
  - Создать Contract{ invitationId, freelancerId, clientId }
  - Уведомить заказчика
    ↓
    ИЛИ
    ↓
Фрилансер отклоняет → Invitation.status = DECLINED
Срок истёк (cron job) → Invitation.status = EXPIRED
```

---

## 6. Завершение контракта и отзывы

```
Contract{ status: ACTIVE }
    ↓
Любая из сторон нажимает "Завершить"
(двустороннее подтверждение — обе стороны должны нажать)
    ↓
contract.complete({ contractId })
    ↓
  - Contract.status = COMPLETED
  - Contract.completedAt = now
  - FreelancerProfile.completedContracts++
  - Пересчитать уровень: recalculateFreelancerLevel(freelancerId)
      BEGINNER → completedContracts >= 3 И rating >= 4.0  → PRO
      PRO      → completedContracts >= 10 И rating >= 4.5 И verifiedCerts → EXPERT
  - Уведомить обе стороны: "Оставьте отзыв"
    ↓
Обе стороны оставляют отзыв
    ↓
review.create({ contractId, rating, comment })
    ↓
  - Проверить @@unique([contractId, authorId])
  - Определить type (CLIENT_TO_FREELANCER / FREELANCER_TO_CLIENT)
  - Пересчитать FreelancerProfile.rating:
      newRating = (currentRating * reviewCount + newRating) / (reviewCount + 1)
      reviewCount++
  - Пересчитать уровень ещё раз (рейтинг изменился)
  - Уведомить адресата отзыва
```

---

## 7. Спор по контракту

```
Одна из сторон нажимает "Открыть спор"
    ↓
contract.dispute({ contractId, description })
    ↓
  - Contract.status = DISPUTED
  - Автоматически создать Report{
      reason: FRAUD,
      description,
      status: OPEN
    }
  - Уведомить всех модераторов
    ↓
Модератор рассматривает спор
    ↓
admin.resolveReport({ reportId, resolution, action })
    ↓
  action = "dismiss"     → Contract.status = COMPLETED (спор снят)
  action = "block_user"  → User.isBlocked = true
  action = "refund"      → инициировать возврат платежа
```

---

## 8. Подписка (рекуррентный платёж)

```
Пользователь выбирает тариф
    ↓
subscription.checkout({ plan: "PRO" })
    ↓
  - Создать Payment{ purpose: SUBSCRIPTION, status: PENDING }
  - Вызвать ЮKassa Recurring Payments API
  - Вернуть { confirmationUrl }
    ↓
Пользователь оплачивает
    ↓
ЮKassa → webhook "payment.succeeded"
    ↓
  - Payment.status = PAID
  - Upsert Subscription{
      plan: PRO,
      jobPostsLeft: 20,
      startsAt: now,
      expiresAt: now + 30 days,
      youkassaSubId: ...,
      isActive: true,
      autoRenew: true
    }
    ↓
Ежемесячно: ЮKassa автоматически списывает
    ↓
webhook "payment.succeeded" → обновить expiresAt, jobPostsLeft = 20

Если autoRenew = false:
    expiresAt наступает → Subscription.isActive = false → plan = FREE
    Уведомить пользователя за 3 дня до истечения
```

---

## 9. Уведомления

```
Любой сервис вызывает:
sendNotification(userId, type, { title, body, link })
    ↓
notification.ts (сервис):
  1. Сохранить Notification в БД { isRead: false }
  2. Если user.emailVerified → отправить email через Resend
  3. Если user.telegramChatId → отправить через Telegram Bot API
    ↓
Пользователь видит бейдж с кол-вом непрочитанных (NotificationBell)
Пользователь переходит по ссылке из уведомления → notification.markRead()
```

**Типы уведомлений по каналам:**

| Событие | Email | Telegram |
|---|---|---|
| Новый отклик на вакансию | ✓ | ✓ |
| Отклик принят | ✓ | ✓ |
| Прямое приглашение | ✓ | ✓ |
| Новое сообщение в чате | ✓ | ✓ |
| Контракт завершён | ✓ | ✓ |
| Запрос отзыва | ✓ | ✓ |
| Подписка истекает (за 3 дня) | ✓ | – |
| Верификация одобрена/отклонена | ✓ | – |

---

## 10. Привязка Telegram-бота

```
1. Пользователь открывает /settings
2. Нажимает "Подключить Telegram"
    ↓
auth.getTelegramCode()
    ↓
  - Сгенерировать 6-значный код
  - Сохранить в user.telegramCode
  - Вернуть код пользователю (показать на экране)
    ↓
3. Пользователь открывает бота в Telegram
4. Отправляет боту: /start 123456
    ↓
Telegram → POST /api/webhooks/telegram
    ↓
auth.confirmTelegramBinding({ code: "123456", telegramChatId })
    ↓
  - Найти User по telegramCode
  - user.telegramChatId = telegramChatId
  - user.telegramCode = null
  - Отправить подтверждение в Telegram
```
