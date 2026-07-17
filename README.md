# Mantra Global Education Platform

Enterprise-grade Global Education Management Platform — Phase 1 MVP.

A premium SaaS platform enabling students to discover universities, explore courses, apply for admissions, manage their study-abroad journey, and interact with counselors.

## Architecture

```
apps/
  web/          → Next.js 15 (App Router) frontend
  api/          → Express.js REST API with DDD modules

packages/
  types/        → Shared TypeScript types & Phase 2 interfaces
  shared/       → Shared validators, error classes
  config/       → Application configuration & constants
  utils/        → Utility functions

database/
  prisma/       → PostgreSQL schema
  seed/         → Seed data

docs/
  architecture/ → System architecture documentation
  api/          → API documentation
  database/     → Database schema documentation
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, TanStack Query |
| Backend | Node.js, Express.js, Prisma ORM, PostgreSQL |
| Auth | JWT (Access + Refresh tokens) |
| Validation | Zod |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm 10+

### Setup

```bash
# Clone and install
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Start development servers
npm run dev
```

- **Web**: http://localhost:3000
- **API**: http://localhost:4000/api/v1

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | vinodhini@mantraglobaledu.com | Set via `ADMIN_INITIAL_PASSWORD` in environment |
| Counselor | counselor@mantraglobaleducation.com | Set via admin user management |
| Student | student@mantraglobaleducation.com | Set via admin user management |

## Project Structure

### Frontend Features (Isolated Modules)

```
src/features/
  authentication/    dashboard/         students/
  counselors/        universities/      countries/
  courses/           scholarships/        applications/
  appointments/      crm/                 cms/
  reports/
```

### Backend Modules (DDD)

Each module contains: Controller → Service → Repository → DTO → Validation → Routes

```
src/modules/
  authentication/    students/          counselors/
  universities/      countries/         courses/
  scholarships/        applications/      crm/
  cms/                 appointments/      notifications/
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login |
| POST | `/auth/refresh` | Refresh token |
| GET | `/auth/profile` | Get user profile |
| GET | `/universities` | List universities |
| GET | `/universities/:slug` | Get university by slug |
| GET | `/countries` | List countries |
| GET | `/countries/:code` | Get country details |
| GET | `/courses` | Search courses |
| GET | `/scholarships` | Search scholarships |
| POST | `/public/contact` | Submit contact form |
| POST | `/public/counseling` | Book counseling |
| POST | `/public/cost-estimate` | Calculate costs |
| GET | `/public/articles` | List articles |

## Design System

| Token | Value |
|-------|-------|
| Primary | Navy Blue `#1e3a5f` |
| Secondary | White |
| Accent | Gold `#d4af37` |
| Success | Emerald Green `#10b981` |

## Phase 2 Extension Points

Reserved interfaces for future modules (not implemented in MVP):

- AI University Recommendation
- AI Education Advisor
- AI Resume Builder / SOP Generator
- AI Document Verification / Chat Assistant
- Payment Gateway
- WhatsApp / Email Automation
- Mobile Application
- Multi-language Support

See `packages/types/src/index.ts` and `apps/api/src/shared/services/extension-points.ts`.

## License

Proprietary — All rights reserved.
