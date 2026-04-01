# Notification Flow

Система уведомлений: когда, кому и по каким каналам отправляем.

---

## Архитектура

Единая точка входа — сервис `server/services/notification.ts`:

```ts
sendNotification(userId: string, type: NotificationType, data: {
  title: string
  body: string
  link?: string
})
```

Внутри:
1. Сохранить `Notification` в БД (`isRead: false`)
2. Если `user.emailVerified` → отправить email через Resend
3. Если `user.telegramChatId` → отправить через Telegram Bot API

Флаги `sentEmail` и `sentTg` на записи `Notification` предотвращают повторную отправку при ретраях.

---

## Таблица уведомлений

| Событие | Кому | Email | Telegram | Ссылка |
|---|---|---|---|---|
| Новый отклик на вакансию | Заказчик | ✓ | ✓ | /dashboard/jobs/[jobId] |
| Отклик принят | Фрилансер | ✓ | ✓ | /dashboard/contracts/[contractId] |
| Отклик отклонён | Фрилансер | ✓ | – | /dashboard/proposals |
| Прямое приглашение | Фрилансер | ✓ | ✓ | /dashboard/invitations |
| Приглашение принято | Заказчик | ✓ | ✓ | /dashboard/contracts/[contractId] |
| Приглашение отклонено | Заказчик | ✓ | – | /dashboard/invitations |
| Новое сообщение в чате | Получатель | ✓ | ✓ | /dashboard/messages/[id] |
| Контракт завершён | Обе стороны | ✓ | ✓ | /dashboard/contracts/[contractId] |
| Запрос отзыва | Обе стороны | ✓ | ✓ | /dashboard/contracts/[contractId] |
| Получен отзыв | Адресат | ✓ | – | /freelancers/[userId] |
| Спор открыт | Модераторы | ✓ | – | /admin/reports |
| Жалоба получена | Модераторы | ✓ | – | /admin/reports |
| Верификация одобрена | Пользователь | ✓ | – | /dashboard/settings/verification |
| Верификация отклонена | Пользователь | ✓ | – | /dashboard/settings/verification |
| Подписка истекает (за 3 дня) | Пользователь | ✓ | – | /dashboard/billing |
| Аккаунт заблокирован | Пользователь | ✓ | – | – |

---

## Email-шаблоны (React Email)

Шаблоны в `/src/emails/`:

```
emails/
├── new-proposal.tsx          — новый отклик
├── proposal-accepted.tsx     — отклик принят
├── new-invitation.tsx        — прямое приглашение
├── contract-completed.tsx    — контракт завершён
├── review-request.tsx        — запрос отзыва
├── subscription-expiring.tsx — подписка истекает
├── verification-result.tsx   — результат верификации
├── account-blocked.tsx       — блокировка
└── _components/
    ├── Header.tsx             — логотип + шапка
    └── Footer.tsx             — ссылка отписки
```

Отправка через Resend:
```ts
await resend.emails.send({
  from: process.env.EMAIL_FROM,   // noreply@bim-portal.ru
  to: user.email,
  subject: title,
  react: <NewProposalEmail {...data} />,
})
```

---

## Telegram-бот

Команды бота:

| Команда | Действие |
|---|---|
| `/start <code>` | Привязать аккаунт по коду из настроек |
| `/stop` | Отвязать аккаунт (очистить telegramChatId) |
| `/help` | Список команд |

Формат сообщений:
```
🔔 Новый отклик

Фрилансер Алексей Громов откликнулся на вашу вакансию
«BIM-координатор для жилого комплекса»

Предложенная цена: 85 000 ₽
Срок: 30 дней

👉 Открыть отклик: https://bim-portal.ru/dashboard/jobs/xxx
```

Webhook endpoint: `POST /api/webhooks/telegram`
Верификация через `TELEGRAM_WEBHOOK_SECRET` в заголовке `X-Telegram-Bot-Api-Secret-Token`.

---

## Настройки уведомлений пользователя

Пользователь может отключить каналы в `/dashboard/settings/notifications`.
Хранится в отдельных полях (добавить в схему при реализации):

```prisma
model User {
  ...
  notifyEmail    Boolean @default(true)
  notifyTelegram Boolean @default(true)
}
```

Сервис `sendNotification` проверяет эти флаги перед отправкой.

---

## Cron-задачи для уведомлений

| Задача | Расписание | Действие |
|---|---|---|
| Подписка истекает | Каждый день в 10:00 | Найти подписки с expiresAt через 3 дня, отправить email |
| Приглашения истекают | Каждый час | Найти Invitation с expiresAt < now, поставить EXPIRED |

Реализация через Vercel Cron Jobs (`vercel.json`):
```json
{
  "crons": [
    {
      "path": "/api/cron/subscription-expiry",
      "schedule": "0 10 * * *"
    },
    {
      "path": "/api/cron/invitation-expiry",
      "schedule": "0 * * * *"
    }
  ]
}
```
