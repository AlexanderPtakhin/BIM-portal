# 🚀 Настройка Supabase для BIM Portal

## 1. Создание проекта в Supabase

1. Перейди на https://supabase.com
2. Нажми "New Project"
3. Выбери организацию или создай новую
4. Название проекта: `BIM Portal`
5. Пароль базы данных: **запиши его!**
6. Регион: выбери ближайший (EU West, etc.)
7. Создай проект

## 2. Получение ключей доступа

После создания проекта зайди в **Settings > API**:

```
Project URL: https://your-project-id.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Настройка .env.local

Скопируй `.env.example` в `.env.local` и заполни реальные значения:

```bash
cp .env.example .env.local
```

**Обязательные поля для заполнения:**
- `NEXT_PUBLIC_SUPABASE_URL` - Project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service Role Key  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon Key
- `DATABASE_URL` - Database connection string

**Формат DATABASE_URL:**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
```

## 4. Применение схемы базы данных

### Вариант А: Через SQL Editor (рекомендуется)

1. В Supabase Dashboard открой **SQL Editor**
2. Нажми "New query"
3. Скопируй весь файл `supabase.sql`
4. Вставь в редактор и нажми "Run"

### Вариант Б: Через Supabase CLI

```bash
# Установка CLI (если еще не установлен)
choco install supabase

# Логин в Supabase
supabase login

# Привязка к проекту
supabase link --project-ref your-project-id

# Применение миграции
supabase db push
```

## 5. Настройка Row Level Security (RLS)

Схема уже включает RLS политики. Проверь что они работают:

1. В Supabase Dashboard открой **Authentication > Policies**
2. Убедись что для каждой таблицы есть политики
3. При необходимости создай тестового пользователя в **Authentication**

## 6. Проверка подключения

После настройки проверь что всё работает:

```bash
# Пересоздай Prisma клиент
npx prisma generate

# Проверь подключение к БД
npx prisma db pull

# Запусти проект
npm run dev
```

## 7. Следующие шаги

После настройки Supabase:

1. Настрой Clerk аутентификацию
2. Добавь переменные для платежей (ЮKassa)
3. Настрой уведомления (Resend, Telegram)
4. Настрой чат (Stream)

---

## 🛠 Полезные команды Supabase

```bash
# Посмотреть статус проекта
supabase status

# Посмотреть логи
supabase logs

# Сбросить базу данных (осторожно!)
supabase db reset

# Создать новую миграцию
supabase migration new add_new_table

# Применить миграции
supabase db push
```

## 🔍 Проверка

Если всё настроено правильно, ты должен увидеть:
- ✅ Проект запускается без ошибок
- ✅ Prisma подключается к Supabase
- ✅ Таблицы созданы в Supabase Dashboard
- ✅ RLS политики активны
