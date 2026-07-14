# System Architecture

## Overview

Mantra Global Education follows a **monorepo architecture** with clear separation between frontend, backend, and shared packages. The system is designed for future microservices migration.

## Architecture Layers

```
┌─────────────────────────────────────────────────┐
│                  Client Layer                    │
│         Next.js App (apps/web)                   │
│    Public Website │ Student │ Counselor │ Admin  │
└──────────────────────┬──────────────────────────┘
                       │ REST API (JWT)
┌──────────────────────▼──────────────────────────┐
│                  API Layer                       │
│         Express.js (apps/api)                    │
│    Controllers → Services → Repositories         │
└──────────────────────┬──────────────────────────┘
                       │ Prisma ORM
┌──────────────────────▼──────────────────────────┐
│               Data Layer                           │
│         PostgreSQL Database                       │
└─────────────────────────────────────────────────┘
```

## Design Principles

### Domain Driven Design (DDD)
- Each business domain is a self-contained module
- Modules communicate through well-defined service interfaces
- No direct cross-module dependencies

### Clean Architecture
```
Routes → Controller → Service → Repository → Database
                ↓
            Validators/DTOs
```

### Feature Isolation (Frontend)
- Each feature has its own components, hooks, services, schemas, and types
- Features must not directly depend on other features
- Shared UI components live in `components/`

## Authentication Flow

```
1. User submits credentials
2. API validates and returns JWT access + refresh tokens
3. Client stores tokens (localStorage)
4. API requests include Bearer token
5. Middleware validates token and extracts user role
6. Role-based authorization on protected routes
```

## Roles

| Role | Access |
|------|--------|
| Student | Portal, applications, documents, appointments |
| Counselor | Assigned students, reviews, calendar, tasks |
| Admin | Full system management, CRM, reports |

## Scalability Path

The current monolithic API is structured for future extraction:

```
Phase 1 (MVP):     Monolithic Express API
Phase 2:           Extract AI services
Phase 3:           Extract notification/payment services
Phase 4:           Full microservices with API gateway
```

## Extension Points

Phase 2 services are defined as interfaces in `@mge/types` with stub implementations in the API. This allows:

1. Interface-first development
2. Easy swapping of implementations
3. Independent service extraction
4. No MVP scope creep
