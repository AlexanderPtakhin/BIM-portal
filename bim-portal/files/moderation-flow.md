# Moderation Flow

Жизненный цикл профилей, вакансий и документов на верификацию.

---

## Профиль фрилансера

```
DRAFT
  ↓ (фрилансер заполнил профиль → submitForReview)
PENDING  ← очередь в /admin/profiles
  ↓ (модератор одобрил)        ↓ (модератор отклонил + note)
PUBLISHED                      DRAFT (с moderationNote)
  ↓ (модератор заблокировал)
SUSPENDED
```

**Условия для submitForReview:**
- Заполнены: title, bio, skills (≥ 1), specializations (≥ 1)
- Загружен хотя бы один пункт портфолио (опционально, но желательно)

**При отклонении:**
- Job.status = DRAFT
- Заполнить moderationNote
- Уведомить пользователя по email с объяснением причины

**При блокировке (SUSPENDED):**
- Профиль скрывается из поиска
- Активные отклики остаются, но новые — заблокированы
- Уведомить пользователя

---

## Вакансия (Job)

```
DRAFT
  ↓ (заказчик нажал "Опубликовать" + оплатил)
PENDING  ← очередь в /admin/jobs
  ↓ (модератор одобрил)        ↓ (модератор отклонил + note)
PUBLISHED                      DRAFT (с moderationNote)
                                 + возврат слота/денег
  ↓ (принят отклик / приглашение)
IN_PROGRESS
  ↓ (контракт завершён)
COMPLETED

PUBLISHED/IN_PROGRESS
  ↓ (заказчик отменил)
CANCELLED
```

**Критерии одобрения вакансии:**
- Внятное описание (не спам, не фейк)
- Указаны BIM-инструменты и специализация
- Адекватный бюджет / описание оплаты

**При отклонении — обязательно:**
1. Определить источник оплаты: `publicationPaymentId` или подписка
2. Вернуть слот или деньги (см. `docs/payment-flow.md`)
3. Заполнить `moderationNote` — пользователь увидит причину

---

## Верификация документов

```
UserDocument создан (status: PENDING)
    ↓
Модератор видит в очереди /admin/verification
    ↓
  Одобрить                   Отклонить
    ↓                             ↓
  VERIFIED                    REJECTED + reviewNote
    ↓
Пересчитать verificationStatus профиля:
  - Если верифицирован паспорт/ИНН → user.isDocVerified = true
  - Если верифицированы BIM-сертификаты → profile.verificationStatus = VERIFIED
  - VERIFIED-профиль учитывается при расчёте уровня EXPERT
```

**Типы документов:**

| Тип | Для кого | Что проверяем |
|---|---|---|
| `passport` | Физлицо | ФИО совпадает с аккаунтом, документ действителен |
| `inn` | Физлицо / ИП | ИНН валиден |
| `bim_certificate` | Фрилансер | Сертификат buildingSMART, Autodesk и др. |
| `autodesk_cert` | Фрилансер | Autodesk Certified Professional |

---

## Жалобы (Reports)

```
Пользователь нажимает "Пожаловаться"
    ↓
report.create({ targetId/jobId, reason, description })
    ↓
Report{ status: OPEN }
Уведомить всех модераторов
    ↓
Модератор открывает жалобу /admin/reports
    ↓
Report.status = UNDER_REVIEW
    ↓
Модератор принимает решение:
  ↓ dismiss         → Report.status = RESOLVED, action = none
  ↓ warn_user       → отправить предупреждение по email
  ↓ remove_job      → Job.status = CANCELLED
  ↓ block_user      → User.isBlocked = true, инвалидировать сессию в Clerk
  ↓ refund          → инициировать возврат платежа
    ↓
Report.status = RESOLVED / DISMISSED
Report.resolvedBy = adminId
Report.resolution = текст решения
```

---

## Блокировка аккаунта

```
admin.blockUser({ userId, reason })
    ↓
User.isBlocked = true
User.blockedReason = reason
    ↓
Clerk API: инвалидировать все сессии пользователя
    ↓
Уведомить пользователя по email
    ↓
Пользователь при попытке войти видит сообщение о блокировке
```

`protectedProcedure` проверяет `user.isBlocked` и возвращает ошибку `FORBIDDEN` если заблокирован.
