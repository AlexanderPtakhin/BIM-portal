# Payment Flow

Описание всех платёжных сценариев. Читать перед реализацией `payment.ts` и `subscription.ts`.

---

## Модель монетизации

Портал зарабатывает только на подписках. Комиссий нет.

**Тарифы для заказчиков (CLIENT):**

| Тариф | Публикаций/мес | Описание |
|---|---|---|
| FREE | 0 | Только просмотр анкет и вакансий |
| STARTER | 5 | Базовая подписка |
| PRO | 20 | Стандарт для активных заказчиков |
| UNLIMITED | ∞ | Для компаний |
| ONE_TIME_POST | 1 разово | Без подписки, дороже в пересчёте |

**Тарифы для фрилансеров (FREELANCER):**

| Тариф | Описание |
|---|---|
| FREE | Стандартная анкета |
| FREELANCER_PRO | Повышенная видимость: `isBoosted=true`, приоритет в поиске |

---

## Сценарий 1: Покупка подписки

```
1. POST trpc/subscription.checkout({ plan })
2. Создать Payment{ purpose: SUBSCRIPTION, status: PENDING }
3. ЮKassa API: создать рекуррентный платёж → получить confirmationUrl
4. Вернуть { confirmationUrl } клиенту
5. Редирект пользователя на страницу оплаты ЮKassa
6. После оплаты: ЮKassa → POST /api/webhooks/youkassa
7. event="payment.succeeded":
   - Payment.status = PAID
   - Upsert Subscription{ plan, jobPostsLeft, expiresAt: +30d, youkassaSubId }
   - Уведомить пользователя (email)
```

---

## Сценарий 2: Разовая публикация вакансии

```
1. POST trpc/job.publish({ jobId })
   → Проверка: есть подписка с jobPostsLeft > 0?

2a. ДА (через подписку):
    - subscription.jobPostsLeft--
    - job.status = PENDING
    - Уведомить модераторов
    - Вернуть { success: true }

2b. НЕТ (разовая оплата):
    - POST trpc/payment.createJobPayment({ jobId })
    - Создать Payment{ purpose: JOB_PUBLICATION, status: PENDING }
    - ЮKassa API → confirmationUrl
    - Вернуть { redirectUrl: confirmationUrl }
    - Редирект пользователя
    - Webhook payment.succeeded:
        Payment.status = PAID
        Job.publicationPaymentId = payment.id
        Job.status = PENDING
        Уведомить модераторов
```

---

## Сценарий 3: Отклонение вакансии модератором

```
Модератор нажимает "Отклонить"
    ↓
admin.rejectJob({ jobId, note })
    ↓
Если job.publicationPaymentId != null:
    → Разовая оплата → вернуть деньги
    → ЮKassa createRefund(payment.youkassaPaymentId)
    → Payment.status = REFUNDED
    → Payment.refundNote = note

Если job.publicationPaymentId == null:
    → Оплачено подпиской → вернуть слот
    → subscription.jobPostsLeft++

job.status = DRAFT
job.moderationNote = note
Уведомить заказчика (email)
```

---

## Сценарий 4: Автопродление подписки

```
ЮKassa автоматически списывает по youkassaSubId каждые 30 дней
    ↓
Webhook payment.succeeded (purpose=SUBSCRIPTION)
    ↓
subscription.jobPostsLeft = plan.limit  // сбросить счётчик
subscription.expiresAt = now + 30 days
subscription.isActive = true
```

---

## Сценарий 5: Отмена автопродления

```
POST trpc/subscription.cancelAutoRenew()
    ↓
ЮKassa API: отменить рекуррентный платёж по youkassaSubId
    ↓
subscription.autoRenew = false
// Подписка продолжает работать до expiresAt
// После expiresAt: isActive = false, plan = FREE
    ↓
Уведомить пользователя: "Подписка активна до {expiresAt}"
За 3 дня до expiresAt: напомнить email
```

---

## ЮKassa Webhook — обработка событий

Endpoint: `POST /api/webhooks/youkassa`

Верификация подписи:
```ts
const hash = crypto
  .createHmac('sha256', process.env.YOUKASSA_SECRET_KEY)
  .update(rawBody)
  .digest('hex')

if (hash !== req.headers['x-youkassa-signature']) {
  return new Response('Invalid signature', { status: 401 })
}
```

Обрабатываемые события:

| Event | Действие |
|---|---|
| `payment.succeeded` | Активировать подписку или опубликовать вакансию |
| `payment.canceled` | Payment.status = FAILED |
| `refund.succeeded` | Payment.status = REFUNDED |

**Важно:** webhook должен отвечать `200` быстро (< 3 сек).
Тяжёлые операции (уведомления, пересчёт) — в фоновую задачу или выполнять асинхронно после ответа.

---

## Тестирование платежей локально

1. Установить ngrok: `ngrok http 3000`
2. Скопировать `https://xxx.ngrok.io`
3. В личном кабинете ЮKassa (тестовый режим):
   - Настройки → HTTP-уведомления → URL: `https://xxx.ngrok.io/api/webhooks/youkassa`
4. Использовать тестовые карты ЮKassa:
   - Успешная оплата: `5555 5555 5555 4477`
   - Отклонённая: `5555 5555 5555 4444`
