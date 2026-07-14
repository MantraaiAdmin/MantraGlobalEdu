# Database Schema

## Entity Relationship Overview

```
User ──┬── Student ──┬── Application ── University
       │             ├── Document
       │             ├── Appointment
       │             └── Favorite
       │
       ├── Counselor ──┬── CounselorStudent
       │               ├── CounselorNote
       │               └── Task
       │
       └── Notification

Country ── University ── Course ── Scholarship
```

## Core Tables

| Table | Description |
|-------|-------------|
| `users` | All system users with role-based access |
| `students` | Student profile extensions |
| `counselors` | Counselor profile extensions |
| `countries` | Study destination countries |
| `universities` | University catalogue |
| `courses` | Academic programs |
| `scholarships` | Scholarship opportunities |
| `applications` | Student admission applications |
| `documents` | Uploaded student documents |
| `appointments` | Counseling appointments |
| `leads` | CRM lead management |
| `content_articles` | CMS knowledge centre |
| `contact_inquiries` | Contact form submissions |
| `counseling_bookings` | Free counseling bookings |

## Enums

- `UserRole`: ADMIN, COUNSELOR, STUDENT
- `ApplicationStatus`: DRAFT → SUBMITTED → UNDER_REVIEW → OFFER_RECEIVED → ACCEPTED
- `AppointmentStatus`: SCHEDULED, CONFIRMED, COMPLETED, CANCELLED
- `LeadStatus`: NEW, CONTACTED, QUALIFIED, CONVERTED, LOST
- `DegreeLevel`: BACHELORS, MASTERS, PHD, DIPLOMA, CERTIFICATE

## Running Migrations

```bash
npm run db:generate   # Generate Prisma client
npm run db:migrate    # Apply migrations
npm run db:seed       # Seed demo data
npm run db:studio     # Open Prisma Studio
```
