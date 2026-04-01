# Code Conventions

Соглашения по коду для BIM Portal.
Цель: единый стиль независимо от того, кто писал файл.

---

## Именование файлов

| Тип | Стиль | Пример |
|---|---|---|
| React-компонент | PascalCase | `FreelancerCard.tsx` |
| Страница Next.js | lowercase | `page.tsx`, `layout.tsx` |
| tRPC роутер | kebab-case | `freelancer-profile.ts` |
| Сервис | kebab-case | `freelancer-level.ts` |
| Утилита / хук | camelCase | `useDebounce.ts`, `formatPrice.ts` |
| Константы | camelCase | `constants.ts` |

---

## TypeScript

Никогда не используй `any`. Явные типы для всех пропсов.
Zod-схемы живут в `src/lib/validations.ts` и переиспользуются на фронте (React Hook Form) и бэке (tRPC input).
Типы из Prisma используй напрямую — не дублируй.

---

## Структура компонента

Порядок: импорты → типы пропсов → хуки → производные данные → хендлеры → JSX.

---

## tRPC роутеры

Роутер — тонкий. Только валидация + вызов сервиса.
Вся бизнес-логика — в `/server/services/`.
`query` — чтение без side effects. `mutation` — изменение данных.

---

## База данных

Всегда явный `select` или `include` — не тяни лишние поля.
Связанные операции — в `$transaction`.
Пагинация — только cursor-based, не offset.

---

## Стили

Tailwind + CSS-переменные из дизайн-системы.
Адаптив mobile-first: сначала мобайл, затем `sm:`, `lg:`.
Анимации через Framer Motion для ключевых моментов (появление списка, hover карточки).

---

## Git-коммиты (Conventional Commits)

```
feat(module):    новый функционал
fix(module):     исправление бага
chore:           технические задачи
refactor(module): рефакторинг
docs:            документация
```

Модули: `auth`, `user`, `profile`, `job`, `proposal`, `invitation`,
`contract`, `search`, `review`, `payment`, `subscription`, `chat`,
`notification`, `admin`, `ui`

---

## Запрещено

- `any` в TypeScript
- `console.log` в коммите
- Хардкод строк — выноси в `constants.ts`
- Бизнес-логика в компоненте — только через tRPC
- Секреты в коде — только через `process.env`
- TODO без Issue на GitHub
