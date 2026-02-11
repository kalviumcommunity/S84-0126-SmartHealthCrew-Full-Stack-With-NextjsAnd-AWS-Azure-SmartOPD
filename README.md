# SmartOPD - Digital Queue Management System

**A Secure, Cloud-Based Queue System for Tier-2/3 City Hospitals**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Security & Authentication](#-security--authentication)
- [Rendering Strategies](#-rendering-strategies)
- [Database Architecture](#-database-architecture)
- [API Documentation](#-api-documentation)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)

---

## 📋 Overview

SmartOPD is a lightweight digital queue management system designed to eliminate physical waiting lines in hospitals, especially in Tier-2 and Tier-3 cities where expensive queue management systems are not affordable.

This project demonstrates:
- ✅ **Advanced Next.js rendering strategies** (SSG, SSR, ISR)
- ✅ **Secure authentication & authorization** (JWT + bcrypt)
- ✅ **Role-Based Access Control (RBAC)** middleware
- ✅ **Real-world healthcare scenario** implementation
- ✅ **Database design with Prisma ORM**

---

## 🎯 Problem Statement

Hospitals in Tier-2 and Tier-3 cities face significant challenges:

- **Physical queues** cause long waiting times and patient frustration
- **Overcrowding** in waiting areas leads to poor patient experience
- **Inefficient resource utilization** impacts hospital operations
- **Expensive queue management systems** are unaffordable for small hospitals

**SmartOPD Solution:** A web-based digital queue system that requires **no hardware**, operates entirely in the cloud, and costs significantly less than traditional systems.

---

## ✨ Key Features

### Core Functionality
- 🏥 **Zero Hardware Required** - Fully web-based, works on any device
- ⚡ **Real-time Updates** - Queue status updates under 200ms
- ☁️ **Cloud-Based** - Scalable and accessible from anywhere
- 💰 **Budget-Friendly** - Affordable for Tier-2/3 hospitals

### User Features
- 👨‍⚕️ **Patient Portal** - Check queue position from home
- 📊 **Admin Dashboard** - Manage queue, call next patient
- 🔔 **Status Updates** - Real-time consultation completion tracking

### Technical Features
- 🔐 **Secure Authentication** - JWT + bcrypt password hashing
- 🛡️ **RBAC Middleware** - Role-based route protection
- 📈 **Optimized Rendering** - SSG, SSR, ISR strategies
- 🗄️ **PostgreSQL + Prisma** - Robust database with migrations

---

## 🛠️ Tech Stack

### Frontend & Backend
- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Runtime:** Node.js

### Database & ORM
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Migrations:** Prisma Migrate
- **Seeding:** TypeScript seed scripts

### Security & Authentication
- **Password Hashing:** bcrypt (10 rounds)
- **Token Management:** JWT (JSON Web Tokens)
- **Authorization:** Custom RBAC middleware
- **Cookie Handling:** HTTP-only, secure cookies

### Code Quality
- **Linting:** ESLint with Prettier
- **Type Safety:** TypeScript strict mode
- **Validation:** Zod schemas
- **Git Hooks:** Husky + lint-staged

---

## 🔐 Security & Authentication

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                      │
└─────────────────────────────────────────────────────────────┘

1. SIGNUP
   User submits → Validate → Hash password (bcrypt) → Save to DB

2. LOGIN
   User submits → Verify email → Compare password → Generate JWT
   
3. PROTECTED ROUTE ACCESS
   Request → Extract token → Verify JWT → Check role → Allow/Deny
```

### Password Security (bcrypt)

```typescript
// Password hashing during signup
const hashedPassword = await bcrypt.hash(password, 10);
// Cost factor: 10 rounds (2^10 = 1024 iterations)

// Password verification during login
const isValid = await bcrypt.compare(password, storedHash);
```

**Why bcrypt?**
- ✅ **Irreversible** - Cannot decrypt hash back to original password
- ✅ **Unique salts** - Same password produces different hashes
- ✅ **Slow by design** - Prevents rapid brute-force attacks
- ✅ **Industry standard** - Battle-tested security algorithm

### JWT (JSON Web Tokens)

```typescript
// Token structure: Header.Payload.Signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJhZG1pbklkIjoxLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Payload includes:**
```json
{
  "adminId": 1,
  "email": "admin@example.com",
  "role": "admin",
  "iat": 1738742400,
  "exp": 1738828800
}
```

**Token Properties:**
- ✅ **Stateless** - No server-side session storage needed
- ✅ **Tamper-proof** - Signature invalidates if modified
- ✅ **Time-limited** - Expires after 24 hours
- ⚠️ **Secure storage** - Stored in HTTP-only cookies + Authorization header

---

## 🛡️ Role-Based Access Control (RBAC)

### Authorization Middleware

SmartOPD implements a custom Next.js middleware for RBAC:

```typescript
// middleware.ts (root level)
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Extract token from header/cookie
  const token = extractToken(req);
  
  // Verify JWT signature
  const decoded = verifyAdminToken(token);
  
  // Check role-based permissions
  if (pathname.startsWith("/api/admin") && decoded.role !== "admin") {
    return NextResponse.json(
      { message: "Access denied. Admin privileges required." },
      { status: 403 }
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/api/users/:path*"],
};
```

### Authorization Flow Diagram

```
┌──────────────┐
│ Client Request│
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│         MIDDLEWARE (middleware.ts)          │
├─────────────────────────────────────────────┤
│ 1. Extract token (Header/Cookie)            │
│ 2. Verify JWT signature                     │
│ 3. Decode payload (adminId, email, role)    │
│ 4. Check route permissions                  │
└──────┬─────────────────────┬────────────────┘
       │                     │
       ▼                     ▼
  ┌─────────┐          ┌──────────┐
  │ ✅ ALLOW │          │ ❌ DENY  │
  │  (200)  │          │  (403)   │
  └─────────┘          └──────────┘
```

### Protected Routes

| Route Pattern | Required Role | Description |
|--------------|---------------|-------------|
| `/api/admin/*` | `admin` | Admin-only operations (patient management) |
| `/api/users/*` | Any authenticated | General user operations |
| `/api/auth/*` | Public | Login/Signup endpoints |
| `/api/patients` | Public | Patient registration |
| `/api/queue/*` | Public | Queue status checking |

### RBAC Benefits

✅ **Least Privilege Principle** - Users only access what they need  
✅ **Centralized Authorization** - Single middleware controls all access  
✅ **Easy Role Extension** - Add `doctor`, `nurse` roles in future  
✅ **Audit Trail Ready** - Logs all authorization attempts  

---

## 🚀 Rendering Strategies Implementation

### 1️⃣ Static Site Generation (SSG) - About Page

**File:** `src/app/about/page.tsx`

```tsx
// Pre-rendered at build time
export const revalidate = false;

export default function About() {
  return (
    <div>
      <h1>About SmartOPD</h1>
      <p>This page is pre-rendered at build time using SSG.</p>
    </div>
  );
}
```

**Why SSG?**
- ✅ Fastest load time (served from CDN)
- ✅ Zero server cost per request
- ✅ Perfect for static content (About, Terms, Privacy)
- ❌ Not suitable for dynamic data

---

### 2️⃣ Server-Side Rendering (SSR) - Live Queue

**File:** `src/app/live-queue/page.tsx`

```tsx
// Always fresh data on every request
export const dynamic = 'force-dynamic';

export default async function LiveQueue() {
  const res = await fetch("API_URL", { cache: "no-store" });
  const data = await res.json();

  return <div>Current Queue: {data.currentToken}</div>;
}
```

**Why SSR?**
- ✅ Real-time data accuracy
- ✅ Fresh on every request
- ✅ Critical for queue status
- ❌ Higher server load

---

### 3️⃣ Incremental Static Regeneration (ISR) - News

**File:** `src/app/news/page.tsx`

```tsx
// Regenerates every 60 seconds
export const revalidate = 60;

export default async function News() {
  const res = await fetch("API_URL", { next: { revalidate: 60 }});
  const data = await res.json();

  return <div>Latest Updates: {data.posts.length}</div>;
}
```

**Why ISR?**
- ✅ Speed of SSG + freshness of SSR
- ✅ Reduces server load
- ✅ Perfect balance for announcements
- ✅ Stale-while-revalidate strategy

---

### Rendering Strategy Comparison

| Strategy | Speed | Freshness | Scalability | Use Case |
|----------|-------|-----------|-------------|----------|
| **SSG** | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ | About, Terms |
| **SSR** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Live Queue |
| **ISR** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | News, Updates |

**Key Insight:** Each rendering mode gives you **two out of three** (Speed, Freshness, Scalability) — choose wisely based on your data requirements!

---

## 🗄️ Database Architecture

### Prisma Schema

```prisma
model Patient {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String
  token     Int      @unique
  status    String   @default("waiting")
  createdAt DateTime @default(now())

  queueTokens QueueToken[]

  @@index([token])
  @@index([phone])
}

model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      String   @default("admin")
  createdAt DateTime @default(now())

  @@index([email])
}

model QueueToken {
  id        Int      @id @default(autoincrement())
  token     Int
  status    String   @default("waiting")
  createdAt DateTime @default(now())

  patientId Int
  patient   Patient  @relation(fields: [patientId], references: [id])

  @@index([patientId])
  @@index([token])
}
```

### Why Prisma?

- ✅ **Type Safety** - Auto-generated TypeScript types
- ✅ **SQL Injection Prevention** - Parameterized queries by default
- ✅ **Migration Management** - Version-controlled schema changes
- ✅ **Developer Experience** - Intuitive API, IntelliSense support
- ✅ **Optimized Queries** - Automatic index suggestions

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name add_admin_role

# Apply migrations to production
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

---

## 📡 API Documentation

### Authentication APIs

#### 1. Admin Signup

**Endpoint:** `POST /api/admin/signup`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "SecurePass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Admin account created successfully",
  "adminId": 1
}
```

**Error Response (409):**
```json
{
  "success": false,
  "message": "Admin with this email already exists"
}
```

---

#### 2. Admin Login

**Endpoint:** `POST /api/admin/login`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "admin": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Headers Set:**
```http
Set-Cookie: adminToken=<JWT>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

#### 3. Protected Route Example

**Endpoint:** `GET /api/admin/patients`

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "patients": [
    {
      "id": 1,
      "name": "John Doe",
      "phone": "1234567890",
      "token": 101,
      "status": "waiting"
    }
  ]
}
```

**Error Response (401 - Missing Token):**
```json
{
  "success": false,
  "message": "Authentication required. Please provide a valid token."
}
```

**Error Response (403 - Invalid Role):**
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

---

### Queue Management APIs

#### 1. Get Current Queue

**Endpoint:** `GET /api/queue/current`

**Success Response:**
```json
{
  "success": true,
  "currentToken": 105,
  "waitingCount": 12
}
```

---

#### 2. Call Next Patient

**Endpoint:** `POST /api/queue/next`

**Success Response:**
```json
{
  "success": true,
  "message": "Next patient called",
  "token": 106
}
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SmartOPD

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed the database (optional)
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

---

## 📁 Project Structure

```
SmartOPD/
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.ts                    # Seed script
│   └── migrations/                # Migration history
│
├── src/
│   ├── app/
│   │   ├── page.tsx               # Home page
│   │   ├── about/page.tsx         # SSG example
│   │   ├── live-queue/page.tsx    # SSR example
│   │   ├── news/page.tsx          # ISR example
│   │   │
│   │   └── api/
│   │       ├── admin/             # Admin routes (protected)
│   │       │   ├── login/route.ts
│   │       │   ├── signup/route.ts
│   │       │   └── patients/route.ts
│   │       │
│   │       ├── auth/              # Legacy auth routes
│   │       ├── patients/          # Patient operations
│   │       └── queue/             # Queue management
│   │
│   └── lib/
│       ├── auth.ts                # JWT & bcrypt functions
│       ├── prisma.ts              # Prisma client singleton
│       ├── adminMiddleware.ts     # Route validation
│       ├── responseHandler.ts     # Standardized responses
│       ├── errorCodes.ts          # Error code constants
│       └── schemas/               # Zod validation schemas
│
├── middleware.ts                  # RBAC middleware (root)
├── .env                           # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Testing RBAC

### Test Scenario 1: Admin Login & Access

```bash
# 1. Login as admin
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Response includes token:
# {"success":true,"token":"eyJhbGci...","admin":{"role":"admin"}}

# 2. Access admin route with token
curl -X GET http://localhost:3000/api/admin/patients \
  -H "Authorization: Bearer <TOKEN>"

# ✅ Expected: 200 OK with patient list
```

---

### Test Scenario 2: Missing Token

```bash
# Try accessing protected route without token
curl -X GET http://localhost:3000/api/admin/patients

# ❌ Expected: 401 Unauthorized
# {"success":false,"message":"Authentication required. Please provide a valid token."}
```

---

### Test Scenario 3: Invalid/Expired Token

```bash
# Use invalid token
curl -X GET http://localhost:3000/api/admin/patients \
  -H "Authorization: Bearer INVALID_TOKEN"

# ❌ Expected: 403 Forbidden
# {"success":false,"message":"Invalid or expired token. Please login again."}
```

---

## 🔄 Development Workflow

### 1. Create Feature Branch

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

### 2. Make Changes

- Edit code
- Run linter: `npm run lint`
- Test locally: `npm run dev`

### 3. Commit Changes

```bash
git add .
git commit -m "feat: descriptive commit message"
# Husky runs lint-staged automatically
```

### 4. Push & Create PR

```bash
git push origin feat/your-feature-name
```

---

## 📚 Key Learnings & Reflections

### Why Least Privilege Matters

- **Security:** Users only access what they need
- **Compliance:** HIPAA requires role-based access for healthcare
- **Auditability:** Track who accessed what data
- **Scalability:** Easy to add new roles (doctor, nurse)

### How to Add New Roles

1. Update Admin model in `schema.prisma`
2. Run migration: `npx prisma migrate dev --name add_new_role`
3. Modify middleware to check new role
4. Update signup to allow role selection

### What Happens Without Middleware?

- ❌ Anyone with any token can access admin routes
- ❌ No authorization checks
- ❌ Security vulnerability
- ❌ Compliance violations

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## �️ Error Handling

This project implements a **Centralized Error Handling** strategy to ensure consistent logging and secure user responses.

### Features
- **Centralized Handler**: Wraps API logic to catch and process errors uniformly.
- **Environment-Aware**:
  - **Development**: Returns full stack traces.
  - **Production**: Redacts sensitive info, returning generic messages.
- **Structured Logging**: Uses a custom logger for consistent log formats.

### Usage
Import `handleError` in your API routes:

```typescript
import { handleError } from "@/lib/errorHandler";

try {
  // logic
} catch (error) {
  return handleError(error, "Route Name");
}
```

### Development vs Production

| Environment | Response Message | Stack Trace |
|-------------|------------------|-------------|
| **Development** | Real error message | Visible |
| **Production** | "Something went wrong..." | Hidden (REDACTED) |

---

## �👨‍💻 Author

**SmartOPD Team**

- GitHub: [@kalviumcommunity](https://github.com/kalviumcommunity)
- Project Repository: [S84-0126-SmartHealthCrew](https://github.com/kalviumcommunity/S84-0126-SmartHealthCrew-Full-Stack-With-NextjsAnd-AWS-Azure-SmartOPD)

---

## 🙏 Acknowledgments

- Next.js Team for the amazing framework
- Prisma Team for the excellent ORM
- Neon for PostgreSQL hosting
- Kalvium for project guidance

---

**Made with ❤️ for Tier-2/3 City Hospitals**
