# Onboarding — Запуск проекта локально

Следуй этому гайду если ты новый разработчик или настраиваешь проект с нуля.
Цель: рабочее окружение за 20–30 минут.

---

## Требования

- **Node.js** 20+ (`node -v` для проверки)
- **Git**
- **npm** 10+ (идёт вместе с Node.js)
- Доступ к Vercel-проекту для получения переменных окружения

---

## Шаг 1 — Клонировать репозиторий

```bash
git clone https://github.com/username/bim-portal.git
cd bim-portal
npm install
```

---

## Шаг 2 — Переменные окружения

**Вариант А (рекомендуется) — через Vercel CLI:**
```bash
npm install -g vercel
vercel login
vercel link          # привязать к проекту
vercel env pull .env.local
```

**Вариант Б — вручную:**
```bash
cp .env.example .env.local
# Открыть .env.local и заполнить переменные
# Значения запросить у лида проекта
```

Описание каждой переменной — в `.env.example`.

---

## Шаг 3 — База данных

```bash
# Применить схему Prisma к БД
npx prisma db push

# Загрузить тестовые данные
npx prisma db seed
```

После seed в БД будут:
- 3 тестовых фрилансера с профилями и портфолио
- 2 тестовых заказчика с вакансиями
- Несколько откликов и один активный контракт
- Тестовые отзывы

---

## Шаг 4 — Запустить

```bash
npm run dev
```

Открыть: **http://localhost:3000**

---

## Тестовые аккаунты

После `prisma db seed` в Clerk и БД созданы тестовые пользователи:

| Роль | Email | Пароль |
|---|---|---|
| Фрилансер (Expert) | freelancer@test.com | Test1234! |
| Фрилансер (новичок) | freelancer2@test.com | Test1234! |
| Заказчик | client@test.com | Test1234! |
| Администратор | admin@test.com | Test1234! |

---

## Полезные команды

```bash
# Просмотр и редактирование данных в БД
npx prisma studio
# → http://localhost:5555

# Проверка типов TypeScript
npm run typecheck

# Линтер
npm run lint

# Форматирование кода
npm run format

# Сброс и пересоздание БД (осторожно!)
npx prisma db push --force-reset
npx prisma db seed
```

---

## Структура проекта (краткая)

```
src/
├── app/                 — страницы (Next.js App Router)
│   ├── (auth)/          — /sign-in, /sign-up
│   ├── (public)/        — /freelancers, /jobs, /pricing
│   ├── (dashboard)/     — /dashboard, /profile, /jobs, /messages...
│   ├── admin/           — /admin/* (только для ADMIN)
│   └── api/
│       ├── trpc/        — tRPC endpoint
│       └── webhooks/    — Clerk, ЮKassa, Telegram
│
├── server/
│   ├── trpc.ts          — базовые процедуры (public/protected/admin/client/freelancer)
│   ├── root.ts          — сборка всех роутеров
│   ├── db.ts            — Prisma client singleton
│   ├── routers/         — 15 tRPC роутеров
│   └── services/        — бизнес-логика (платежи, уведомления, уровни)
│
├── components/          — React компоненты
├── lib/                 — утилиты, константы, валидации
└── trpc/                — клиентская инициализация tRPC
```

---

## Частые проблемы

**"Can't reach database server"**
→ Проверь `DATABASE_URL` в `.env.local`. Для Supabase нужно два URL: `DATABASE_URL` (pooler) и `DIRECT_URL` (direct connection).

**Clerk redirect loop при открытии /dashboard**
→ Проверь `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` и `CLERK_SECRET_KEY`.
→ Убедись что в Clerk Dashboard указан правильный `Redirect URL`: `http://localhost:3000`.

**"Missing environment variable"**
→ Сравни свой `.env.local` с `.env.example` — возможно добавились новые переменные.

**Prisma: "The table does not exist"**
→ Выполни `npx prisma db push` снова. Если не помогает — `npx prisma db push --force-reset && npx prisma db seed`.

**ЮKassa webhook не приходит локально**
→ Используй [ngrok](https://ngrok.com) для туннеля:
```bash
ngrok http 3000
# Скопировать https://xxx.ngrok.io и вставить в личный кабинет ЮKassa
# как адрес webhook: https://xxx.ngrok.io/api/webhooks/youkassa
```

**Stream Chat: "Invalid API key"**
→ Проверь `NEXT_PUBLIC_STREAM_API_KEY` (публичный, начинается без `secret`) и `STREAM_SECRET`.

---

## Локальный Telegram-бот

Для разработки функционала уведомлений через Telegram:

1. Создать тестового бота через [@BotFather](https://t.me/BotFather) → получить токен
2. Добавить `TELEGRAM_BOT_TOKEN` в `.env.local`
3. Настроить webhook через ngrok:
```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
     -d "url=https://xxx.ngrok.io/api/webhooks/telegram"
```

---

## CI/CD

- **Push в `dev`** → автоматический деплой на Vercel Preview URL
- **Push в `main`** → автоматический деплой на продакшн
- **Pull Request** → запускается CI: `tsc`, `prisma validate`, `eslint`, `prettier`

Прямые пуши в `main` и `dev` запрещены через Branch Protection Rules.
