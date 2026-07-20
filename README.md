# Центр раскрытия информации (OI System)

Система для подготовки, подписания ЭЦП и публикации отчётности и существенных фактов эмитентов. Интеграция с KSE, ролевая модель доступа, Telegram-бот для уведомлений.

<!-- Логотип: положите файл docs/images/logo.png -->
<p align="center">
  <img src="docs/images/logo.png" alt="Логотип Центра раскрытия информации" width="200" />
</p>

---

## Содержание

- [Обзор](#обзор)
- [Скриншоты](#скриншоты)
- [Функциональность](#функциональность)
- [Стек технологий](#стек-технологий)
- [Структура проекта](#структура-проекта)
- [Требования](#требования)
- [Быстрый старт (Docker)](#быстрый-старт-docker)
- [Локальная разработка](#локальная-разработка)
- [Переменные окружения](#переменные-окружения)
- [Роли пользователей](#роли-пользователей)
- [Как добавить изображения в README](#как-добавить-изображения-в-readme)

---

## Обзор

| Компонент | Описание |
|-----------|----------|
| **client** | React-приложение (Ant Design), личный кабинет эмитента и администратора |
| **server** | NestJS API, PostgreSQL, генерация PDF/DOCX, ЭЦП (RuToken) |
| **nginx** | Reverse proxy для client и api |
| **database** | PostgreSQL 14 |
| **pgadmin** | Веб-интерфейс для БД (опционально) |

<!-- Схема архитектуры: docs/images/architecture.png -->
<p align="center">
  <img src="docs/images/architecture.png" alt="Схема архитектуры системы" width="800" />
</p>

---

## Скриншоты

> Положите PNG или JPG в папку `docs/images/` с именами из таблицы ниже — пути в README уже прописаны.

### Авторизация

<!-- docs/images/01-auth.png -->
![Страница входа](docs/images/01-auth.png)

### Панель управления

<!-- docs/images/02-dashboard.png -->
![Главная панель с аналитикой](docs/images/02-dashboard.png)

### Документы

<!-- docs/images/03-documents-list.png -->
![Список документов](docs/images/03-documents-list.png)

<!-- docs/images/04-document-form.png -->
![Форма создания / редактирования документа](docs/images/04-document-form.png)

### Электронная цифровая подпись (ЭЦП)

<!-- docs/images/05-eds-sign.png -->
![Подписание документа ЭЦП](docs/images/05-eds-sign.png)

<!-- docs/images/06-eds-check.png -->
![Проверка ЭЦП](docs/images/06-eds-check.png)

### Компании и пользователи

<!-- docs/images/07-companies.png -->
![Список компаний](docs/images/07-companies.png)

<!-- docs/images/08-users.png -->
![Управление пользователями](docs/images/08-users.png)

### Профиль и поиск

<!-- docs/images/09-profile.png -->
![Профиль компании](docs/images/09-profile.png)

<!-- docs/images/10-search.png -->
![Поиск по документам](docs/images/10-search.png)

### Публичный просмотр отчёта

<!-- docs/images/11-public-report.png -->
![Публичная страница отчёта](docs/images/11-public-report.png)

---

## Функциональность

- **Документы** — создание отчётов и существенных фактов по шаблонам, автосохранение, статусы
- **ЭЦП** — подписание через RuToken, проверка подписи
- **Компании** — учёт эмитентов, связка OI/KSE
- **Пользователи и роли** — ADMIN, MODERATOR, USER с разграничением доступа к разделам и типам отчётов
- **Поиск** — фильтрация опубликованных документов
- **Публичный доступ** — просмотр отчётов без авторизации по ссылке
- **Квитанции** — формирование квитанций о приёме документов
- **Нормативные акты** — раздел с регламентирующими документами
- **Руководство пользователя** — встроенные инструкции и видео
- **Telegram-бот** — уведомления (серверный модуль `bot`)

---

## Стек технологий

| Слой | Технологии |
|------|------------|
| Frontend | React 18, Ant Design 4, Redux Toolkit, React Router 6, ApexCharts |
| Backend | NestJS 9, Sequelize, PostgreSQL, JWT, PDFKit, docx |
| Инфраструктура | Docker, Docker Compose, Nginx |
| ЭЦП | @aktivco/rutoken-plugin |

---

## Структура проекта

```
oi_system/
├── client/          # React-приложение
├── server/          # NestJS API
├── nginx/           # Конфиг reverse proxy
├── docs/
│   └── images/      # ← сюда кладите скриншоты для README
├── docker-compose.yml
└── README.md
```

---

## Требования

- Node.js 16+
- Docker и Docker Compose (для контейнерного запуска)
- PostgreSQL 14 (при локальной разработке без Docker)
- RuToken и плагин (для работы с ЭЦП в браузере)

---

## Быстрый старт (Docker)

```bash
docker-compose up --build
```

| Сервис | URL / порт |
|--------|------------|
| Приложение (nginx) | http://localhost |
| API | http://localhost:8088 |
| PostgreSQL | localhost:5434 |
| pgAdmin | http://localhost:5050 |

---

## Локальная разработка

### Сервер

```bash
cd server
npm install
npm run start:dev
```

Создайте файл `server/.development.env` (см. [переменные окружения](#переменные-окружения)).

### Клиент

```bash
cd client
npm install
npm run dev
```

Создайте файл `client/.env` с адресом API:

```env
REACT_APP_SERVER_HOST=http://localhost:3000
REACT_APP_CLIENT_HOST=localhost
```

---

## Переменные окружения

### server (`.development.env` / `.production.env`)

| Переменная | Описание |
|------------|----------|
| `PORT` | Порт API |
| `SERVER_HOST` | Хост для bind |
| `CLIENT_HOST` | Origin клиента (CORS) |
| `DB_HOST` | Хост PostgreSQL |
| `DB_PORT` | Порт PostgreSQL |
| `DB_USER` | Пользователь БД |
| `DB_PASS` | Пароль БД |
| `DB_NAME` | Имя базы данных |

### client (`.env`)

| Переменная | Описание |
|------------|----------|
| `REACT_APP_SERVER_HOST` | URL backend API |
| `REACT_APP_CLIENT_HOST` | Хост dev-сервера React |

---

## Роли пользователей

| Роль | Доступ |
|------|--------|
| **USER** | Профиль, документы, руководство, нормативные акты |
| **MODERATOR** | + панель управления, пользователи, компании |
| **ADMIN** | Полный доступ |

---

## Как добавить изображения в README

### 1. Папка для файлов

Все картинки для README хранятся в:

```
docs/images/
```

### 2. Рекомендуемые имена файлов

| Файл | Что снимать |
|------|-------------|
| `logo.png` | Логотип системы |
| `architecture.png` | Схема компонентов (client / server / db) |
| `01-auth.png` | Страница входа |
| `02-dashboard.png` | Главная панель |
| `03-documents-list.png` | Список документов |
| `04-document-form.png` | Форма документа |
| `05-eds-sign.png` | Подписание ЭЦП |
| `06-eds-check.png` | Проверка ЭЦП |
| `07-companies.png` | Компании |
| `08-users.png` | Пользователи |
| `09-profile.png` | Профиль |
| `10-search.png` | Поиск |
| `11-public-report.png` | Публичный отчёт |

### 3. Формат вставки в Markdown

**Обычное изображение:**

```markdown
![Описание для alt-текста](docs/images/01-auth.png)
```

**По центру с заданной шириной (HTML):**

```html
<p align="center">
  <img src="docs/images/logo.png" alt="Логотип" width="200" />
</p>
```

**Несколько скриншотов в ряд:**

```html
<p align="center">
  <img src="docs/images/03-documents-list.png" alt="Список" width="400" />
  <img src="docs/images/04-document-form.png" alt="Форма" width="400" />
</p>
```

### 4. Правила

- Используйте **относительные пути** от корня репозитория: `docs/images/...`
- Форматы: **PNG** (интерфейс) или **JPG** (фото)
- Рекомендуемая ширина скриншотов: **1200–1600 px**
- Всегда заполняйте **alt** — текст при недоступности картинки и для доступности
- Не коммитьте тяжёлые файлы (>1–2 МБ) без сжатия — используйте [TinyPNG](https://tinypng.com/) или аналог

### 5. Добавление нового скриншота

1. Сохраните файл в `docs/images/`, например `12-receipt.png`
2. В нужном разделе README добавьте:

```markdown
![Квитанция о приёме](docs/images/12-receipt.png)
```

3. Проверьте отображение в предпросмотре Markdown (VS Code / GitHub)

---

## Лицензия

Проприетарное ПО. Все права защищены.
