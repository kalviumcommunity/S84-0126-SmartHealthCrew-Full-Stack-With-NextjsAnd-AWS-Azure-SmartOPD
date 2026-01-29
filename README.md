# SmartOPD - Digital Queue Management System

**A Lightweight Web-Based Queue System for Tier-2/3 City Hospitals**

---

## 📋 Overview

SmartOPD is a lightweight digital queue management system designed to eliminate physical waiting lines in hospitals, especially in Tier-2 and Tier-3 cities where expensive queue management systems are not affordable.

This project demonstrates advanced Next.js rendering strategies (SSG, SSR, ISR) applied to a real-world healthcare scenario.

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

- **Zero Hardware Required** - Fully web-based, works on any device
- **Real-time Updates** - Queue status updates under 200ms
- **Cloud-Based** - Scalable and accessible from anywhere
- **Budget-Friendly** - Affordable for Tier-2/3 hospitals
- **Patient Portal** - Check queue position from home
- **Admin Dashboard** - Manage queue, call next patient, mark consultations complete

---

## 🚀 Rendering Strategies Implementation

### 1️⃣ Static Rendering (SSG) - About Page

**File:** `src/app/about/page.tsx`

```tsx
// STATIC RENDERING (SSG) — Pre-rendered at build time
export const revalidate = false; // No re-rendering after build

export default function About() {
  return (
    <div>
      <h1>About SmartOPD</h1>
      <p>This page is pre-rendered at build time using SSG.</p>
    </div>
  );
}
```

**Why SSG for About Page:**
- Content rarely changes
- Fastest load time (served from CDN)
- Zero server cost per request
- Perfect for static information

---

### 2️⃣ Dynamic Rendering (SSR) - Live Queue Status

**File:** `src/app/live-queue/page.tsx`

```tsx
// DYNAMIC RENDERING (SSR) — Always fresh data
export const dynamic = 'force-dynamic';

export default async function LiveQueue() {
  const res = await fetch("https://dummyjson.com/posts/1", { cache: "no-store" });
  const data = await res.json();

  return (
    <div>
      <h1>Live Queue Status (SSR)</h1>
      <p>Data fetched at request time: {data.title}</p>
    </div>
  );
}
```

**Why SSR for Live Queue:**
- Queue status changes rapidly
- Real-time data essential for accuracy
- Fresh response on every request
- Critical for hospital operations

---

### 3️⃣ Hybrid Rendering (ISR) - SmartOPD Updates

**File:** `src/app/news/page.tsx`

```tsx
// HYBRID RENDERING (ISR) — Regenerates every 60s
export const revalidate = 60;

export default async function News() {
  const res = await fetch("https://dummyjson.com/posts", { next: { revalidate: 60 }});
  const data = await res.json();

  return (
    <div>
      <h1>SmartOPD Updates (ISR)</h1>
      <p>This page updates every 60 seconds using ISR.</p>
      <p>Fetched posts: {data.posts.length}</p>
    </div>
  );
}
```

**Why ISR for Updates:**
- Updates occasionally, not every second
- Speed of static pages + periodic freshness
- Reduced cost compared to SSR
- Perfect balance for announcements

---

## 📊 Case Study: DailyEdge News Portal

### Problem Summary
DailyEdge statically generated their homepage → **fast but breaking news became stale**.  
They switched to SSR → **fresh but slow and expensive** due to high server load.

### Trade-Off Triangle

| Rendering | Speed | Freshness | Scalability |
|----------|--------|-----------|-------------|
| SSG | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ |
| SSR | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| ISR | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

### Proposed Balanced Solution
- Use **ISR** for Breaking News → updates every 30–60 seconds
- Use **SSG** for evergreen articles
- Use **SSR** only for heavy personalized pages (dashboards)

**Result:** Reduces cost, improves speed, and keeps content reasonably fresh.

### Applied to SmartOPD

| Page | Rendering Mode | Reason |
|------|----------------|--------|
| About | SSG | No frequent changes |
| Live Queue | SSR | Must always be fresh |
| SmartOPD Updates | ISR | Changes occasionally |

This combination balances:
- **Speed** ⚡ - Fast page loads
- **Real-time accuracy** 🔄 - When needed
- **Cost-efficiency** 💰 - Optimized resources

**Trade-off Insight:**
- SSG gives you: Speed + Scalability (but stale data)
- SSR gives you: Freshness + Accuracy (but slower + costly)
- ISR gives you: Speed + Reasonable Freshness (balanced approach)

Each rendering mode gives you **two out of three** — choose wisely!

---

---

## 🛠️ Tech Stack

### Current Implementation
- **Frontend + Backend:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Runtime:** Node.js
- **Database:** PostgreSQL with Prisma ORM

### Planned Architecture
- **Caching:** Redis for real-time queue updates
- **Containerization:** Docker
- **Deployment:** AWS/Azure
- **CI/CD:** GitHub Actions

---

## 📦 Prisma ORM Setup

### What We Implemented

✅ **Installed Prisma ORM**
- Installed `prisma` as dev dependency
- Installed `@prisma/client` for database queries

✅ **Created Database Schema**
- Defined `Patient` model (id, name, phone, token, status, createdAt)
- Defined `Admin` model (id, username, password)
- Configured PostgreSQL as database provider

✅ **Generated Prisma Client**
- Auto-generated type-safe query builder
- Includes all CRUD operations for Patient & Admin models

✅ **Connected to PostgreSQL**
- Set up `DATABASE_URL` in environment variables
- Configured connection through `prisma.config.ts`

✅ **Created Reusable Prisma Instance**
- Built singleton pattern in `src/lib/prisma.ts`
- Prevents multiple database connections during dev hot reload
- Includes query logging for debugging

### Why Prisma?

- **Type Safety** - Auto-generated TypeScript types prevent runtime errors
- **Developer Experience** - Intuitive API, IntelliSense support, auto-completion
- **Prevents SQL Injection** - Parameterized queries by default
- **Easy Migrations** - Database schema versioning and migration management
- **Built for Next.js** - Perfect integration with API routes and server components
- **Auto-Generated Queries** - No need to write raw SQL

### Project Structure After Prisma Setup

```
SmartOPD/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migrations (future)
├── prisma.config.ts           # Prisma configuration
├── src/
│   ├── lib/
│   │   └── prisma.ts          # Reusable Prisma client instance
│   ├── app/
│   │   └── test-prisma/
│   │       └── page.tsx       # Test page for Prisma connection
└── .env                       # Database connection string
```

### Usage Example

```typescript
import { prisma } from "@/lib/prisma";

// Get all patients
const patients = await prisma.patient.findMany();

// Create a new patient
const newPatient = await prisma.patient.create({
  data: {
    name: "John Doe",
    phone: "1234567890",
    token: 101,
    status: "waiting"
  }
});

// Update patient status
const updated = await prisma.patient.update({
  where: { id: 1 },
  data: { status: "completed" }
});
```

---

## 📁 Project Structure

```
SmartOPD/
├── prisma/
│   ├── schema.prisma             # Prisma database schema
│   └── migrations/               # Database migrations (future)
├── prisma.config.ts              # Prisma configuration
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── about/
│   │   │   └── page.tsx          # About SmartOPD (SSG)
│   │   ├── live-queue/
│   │   │   └── page.tsx          # Live Queue Status (SSR)
│   │   ├── news/
│   │   │   └── page.tsx          # SmartOPD Updates (ISR)
│   │   ├── test-prisma/
│   │   │   └── page.tsx          # Prisma connection test
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # Reusable UI components (future)
│   └── lib/
│       ├── prisma.ts             # Prisma client instance
│       ├── constants.ts          # Constants
│       └── types.ts              # TypeScript types
│
├── public/                       # Static assets
├── .env                          # Environment variables (database URL)
├── .env.example                  # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SmartOPD

# Install dependencies
npm install
```

### Environment Variables Setup

SmartOPD uses environment variables to manage configuration securely. Follow these steps:

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in real values in `.env.local`:**
   ```bash
   # === SERVER ONLY VARIABLES ===
   DATABASE_URL=postgres://user:password@localhost:5432/smartopd
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-secret-key

   # === CLIENT SAFE VARIABLES ===
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

3. **⚠️ IMPORTANT: Never commit `.env.local` to Git**  
   This file contains real secrets and is already in `.gitignore`.

4. **Environment Variables Reference:**

   | Variable | Type | Description |
   |----------|------|-------------|
   | `DATABASE_URL` | Server-only | PostgreSQL connection string |
   | `REDIS_URL` | Server-only | Redis connection string for caching |
   | `JWT_SECRET` | Server-only | Secret key for JWT token generation |
   | `NEXT_PUBLIC_API_BASE_URL` | Client-safe | API base URL (accessible in browser) |

   **Usage in Code:**
   ```tsx
   // ✅ Server-side usage (API routes, server components)
   const dbUrl = process.env.DATABASE_URL;
   
   // ✅ Client-side usage (only NEXT_PUBLIC_ variables)
   const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
   
   // ❌ WRONG: Server variables in client code
   console.log(process.env.DATABASE_URL); // Won't work in browser
   ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## 📄 Pages & Rendering Modes

| Page | Route | Rendering | Revalidation | Use Case |
|------|-------|-----------|--------------|----------|
| **Home** | `/` | Mixed | N/A | Landing page |
| **About SmartOPD** | `/about` | SSG | `false` | Static content, rarely changes |
| **Live Queue Status** | `/live-queue` | SSR | N/A | Real-time queue data, always fresh |
| **SmartOPD Updates** | `/news` | ISR | `60s` | Periodic updates, balanced performance |

---

## 🎓 Learning Outcomes

This project demonstrates understanding of:

1. **Next.js App Router** - Modern file-based routing
2. **Server Components** - React Server Components architecture
3. **Data Fetching Strategies** - `fetch` with caching options
4. **Rendering Modes** - SSG, SSR, ISR configuration
5. **Performance Optimization** - Choosing the right rendering strategy
6. **Real-world Application** - Applied to healthcare domain

---

## 🔄 Rendering Strategy Decision Matrix

**When to use SSG (Static):**
- Content doesn't change often (e.g., About, FAQs, Documentation)
- Same content for all users
- Need maximum performance and lowest cost

**When to use SSR (Dynamic):**
- Content changes frequently (e.g., Live dashboards, User profiles)
- User-specific or personalized content
- Need guaranteed fresh data on every request

**When to use ISR (Hybrid):**
- Content changes periodically (e.g., News, Product listings, Events)
- Can tolerate brief staleness (seconds to minutes)
- Need balance between speed and freshness

---

## 📈 Performance Considerations

### If SmartOPD had 10x more users:

**Current Strategy:**
- ✅ About page (SSG) - No change needed, scales infinitely
- ⚠️ Live Queue (SSR) - Would need caching layer (Redis) or move to websockets
- ✅ Updates (ISR) - Perfect as-is, handles increased load well

**Recommended Changes at Scale:**
1. Add Redis for queue caching
2. Implement WebSocket connections for real-time queue updates
3. Use CDN for static assets
4. Consider edge computing for global users
5. Implement rate limiting and request queuing

---

## �️ Database & Migrations

SmartOPD uses **Prisma** as its ORM and **PostgreSQL** (hosted on Neon) as its database.

### 🔄 Migrations

We follow a structured migration process to ensure database consistency.

- **Initial Migration:** `20260127053924_add_auth_system`
- **First Schema Setup:** Managed via `npx prisma migrate dev --name init_schema`

Commands:
- `npx prisma migrate dev`: Run migrations in development
- `npx prisma migrate deploy`: Apply pending migrations in production
- `npx prisma studio`: Open UI to view and edit data

### 🌿 Seeding

To quickly set up the local environment, run the seeding script to create a default admin user.

**Command:**
```bash
npx prisma db seed
```

**What it does:**
- Creates a default admin: `admin@example.com` / `admin123`
- Uses `upsert` to ensure idempotency (no duplicate entries)
- Hashes passwords using `bcrypt` for production safety

---

## 🛠️ Production Safety & Best Practices

- **Migrations Matter:** We avoid `prisma db push` in production to maintain a clear history of schema changes.
- **Environment Isolation:** `DATABASE_URL` is managed via `.env` and secret management.
- **Security:** Admin passwords are NEVER stored in plain text.
- **Idempotent Seeding:** Scripts can be run multiple times without corrupting data.

---

## �🔧 Code Quality Setup (Strict TS + ESLint + Prettier + Husky)

### 🔹 Why Strict TypeScript?
Strict mode catches:
- Undefined types
- Unused variables
- Unused parameters
- Implicit any errors

This reduces runtime bugs and improves long-term maintainability.

### 🔹 Why ESLint + Prettier?
ESLint enforces code correctness (no console logs, semicolons, double quotes).  
Prettier ensures consistent formatting across the entire team.

### 🔹 Why Pre-Commit Hooks (Husky)?
Husky + lint-staged run ESLint and Prettier BEFORE every commit.  
This means:
- No team member can push broken code  
- Code formatting stays consistent  
- Quality is enforced automatically

### Result
We now have a clean, consistent, professional codebase that enforces quality at every commit.

---


## 📚 Resources

- [Next.js Data Fetching Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Understanding ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## 📄 License

This project is for educational purposes as part of an academic assignment.

---

## 👤 Author

**SmartOPD Team**
- Assignment: Advanced Data Fetching & Rendering Modes
- Framework: Next.js App Router
- Focus: Real-world healthcare application

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**

---

## 🛠️ Data Modeling & PostgreSQL Schema

### 📊 ER Diagram

```mermaid
erDiagram
    Patient ||--o{ QueueToken : "has"
    Patient {
        Int id PK
        String name
        String phone
        Int token UK
        String status
        DateTime createdAt
    }
    Admin {
        Int id PK
        String email UK
        String password
        DateTime createdAt
    }
    QueueToken {
        Int id PK
        Int token
        String status
        DateTime createdAt
        Int patientId FK
    }
```

### 📝 Schema Explanation

The database consists of three core models designed for efficiency and scalability:

1.  **Patient**: Represents a user who joins the queue.
    *   `id`: Primary Key.
    *   `token`: Unique queue number assigned to the patient.
    *   `status`: Current state (waiting, completed).

2.  **Admin**: Hospital staff who manages the queue.
    *   `email`: Unique identifier for login.
    *   `password`: Hashed password for security.

3.  **QueueToken**: Stores historical queue data (optional but added for scalability).
    *   `patientId`: Foreign Key linking to Patient.

### 🔑 Keys & Constraints

*   **Primary Keys (`@id`)**: `id` fields in all tables are auto-incrementing integers.
*   **Unique Keys (`@unique`)**:
    *   `Patient.token`: Ensures no two active patients have the same token.
    *   `Admin.email`: Prevents duplicate admin accounts.
*   **Foreign Keys (`@relation`)**:
    *   `QueueToken.patientId` references `Patient.id`.
*   **Default Values (`@default`)**:
    *   `status`: Defaults to "waiting".
    *   `createdAt`: Defaults to `now()`.

### 📐 Normalization

*   **1NF (First Normal Form)**: Atomic values (no repeating groups or arrays in columns).
*   **2NF (Second Normal Form)**: All non-key attributes depend on the primary key.
*   **3NF (Third Normal Form)**: No transitive dependencies; attributes depend only on the primary key.

### ⚡ Migration Commands

```bash
# 1. Initialize Migration
npx prisma migrate dev --name init_schema

# 2. Seed Database
npx prisma db seed

# 3. Verify in Studio
npx prisma studio
```

### 🌱 Seed Data Explanation

The `prisma/seed.ts` script populates the database with initial test data:
*   **Admin**: Creates a default admin `admin@example.com` with password `admin123` (hashed using bcrypt).
*   **Patients**: Inserts sample patients (Amit, Sita) with tokens 1 and 2.

### 📸 Data Verification

*(Add Screenshot of Patient Table in Prisma Studio Here)*

*(Add Screenshot of Admin Table in Prisma Studio Here)*

### 🧠 Reflection: Scalability

**Question:** If SmartOPD must support 10x more data, does the design support it?

**Response:** Yes, the design supports scalability because:
1.  **Indexing**: critical fields like `token` and `email` are unique and indexed, ensuring fast lookups even as data grows.
2.  **History Separation**: The `QueueToken` table is designed to decouple active queue status from historical logs, preventing the main `Patient` table from becoming bloated over time.
3.  **Normalization**: The schema is normalized to avoid data redundancy, saving storage and maintaining consistency.
 
 - - -  
  
 # #   � a�   T r a n s a c t i o n s   &   Q u e r y   O p t i m i z a t i o n  
  
 S m a r t O P D   u s e s   P r i s m a   t r a n s a c t i o n s   t o   e n s u r e   d a t a   c o n s i s t e n c y   d u r i n g   c r i t i c a l   o p e r a t i o n s   l i k e   p a t i e n t   r e g i s t r a t i o n .  
  
 # # #   � x    T r a n s a c t i o n   S c e n a r i o :   P a t i e n t   R e g i s t r a t i o n  
  
 W h e n   a   p a t i e n t   r e g i s t e r s ,   t h r e e   o p e r a t i o n s   m u s t   h a p p e n   a t o m i c a l l y :  
 1 .     * * G e n e r a t e   T o k e n * * :   C a l c u l a t e   t h e   n e x t   a v a i l a b l e   t o k e n   n u m b e r .  
 2 .     * * C r e a t e   P a t i e n t * * :   I n s e r t   a   n e w   p a t i e n t   r e c o r d .  
 3 .     * * C r e a t e   Q u e u e   E n t r y * * :   I n s e r t   a   r e c o r d   i n t o   t h e   ` Q u e u e T o k e n `   t a b l e .  
  
 W e   u s e   ` p r i s m a . $ t r a n s a c t i o n `   t o   b u n d l e   t h e s e   o p e r a t i o n s .   I f   a n y   s t e p   f a i l s   ( e . g . ,   t o k e n   g e n e r a t i o n   e r r o r ) ,   t h e   e n t i r e   t r a n s a c t i o n   r o l l s   b a c k ,   p r e v e n t i n g   p a r t i a l   d a t a   ( o r p h a n   r e c o r d s ) .  
  
 # # #   � x: � � � �   R o l l b a c k   B e h a v i o r  
  
 T o   g u a r a n t e e   d a t a   i n t e g r i t y :  
 -   * * S u c c e s s * * :   A l l   d a t a b a s e   c h a n g e s   a r e   c o m m i t t e d   o n l y   i f   e v e r y   s t e p   i n   t h e   t r a n s a c t i o n   s u c c e e d s .  
 -   * * R o l l b a c k * * :   I f   a n   e r r o r   o c c u r s   ( e . g . ,   d u p l i c a t e   t o k e n ,   n e t w o r k   f a i l u r e ) ,   P r i s m a   a u t o m a t i c a l l y   r o l l s   b a c k   a l l   c h a n g e s .   N o   p a t i e n t   i s   c r e a t e d   w i t h o u t   a   t o k e n ,   a n d   n o   t o k e n   i s   i s s u e d   w i t h o u t   a   p a t i e n t .  
  
 # # #   � x �   I n d e x e s   A d d e d  
  
 T o   i m p r o v e   q u e r y   p e r f o r m a n c e   a s   t h e   d a t a s e t   g r o w s ,   w e   a d d e d   t h e   f o l l o w i n g   i n d e x e s :  
  
 *       * * P a t i e n t   M o d e l * * :  
         *       ` @ @ i n d e x ( [ t o k e n ] ) ` :   O p t i m i z e s   s e a r c h e s   b y   t o k e n   n u m b e r   ( e . g . ,   c h e c k i n g   s t a t u s ) .  
         *       ` @ @ i n d e x ( [ p h o n e ] ) ` :   O p t i m i z e s   p a t i e n t   l o o k u p s   b y   p h o n e   n u m b e r   d u r i n g   l o g i n / r e g i s t r a t i o n .  
 *       * * Q u e u e T o k e n   M o d e l * * :  
         *       ` @ @ i n d e x ( [ p a t i e n t I d ] ) ` :   S p e e d s   u p   j o i n s   a n d   l o o k u p s   f o r   p a t i e n t   h i s t o r y .  
         *       ` @ @ i n d e x ( [ t o k e n ] ) ` :   O p t i m i z e s   t o k e n   v e r i f i c a t i o n .  
 *       * * A d m i n   M o d e l * * :  
         *       ` @ @ i n d e x ( [ e m a i l ] ) ` :   A c c e l e r a t e s   a d m i n   l o g i n   l o o k u p s .  
  
 # # #   � xa�   Q u e r y   O p t i m i z a t i o n   E x a m p l e s  
  
 * * B a d   P r a c t i c e   ( O v e r - f e t c h i n g ) : * *  
 F e t c h i n g   a l l   f i e l d s   w h e n   o n l y   a   f e w   a r e   n e e d e d   i n c r e a s e s   m e m o r y   u s a g e   a n d   n e t w o r k   l o a d .  
 ` ` ` t y p e s c r i p t  
 / /   � � R  F e t c h e s   h u g e   J S O N   w i t h   a l l   c o l u m n s  
 a w a i t   p r i s m a . p a t i e n t . f i n d M a n y ( ) ;  
 ` ` `  
  
 * * G o o d   P r a c t i c e   ( S e l e c t i o n   &   P a g i n a t i o n ) : * *  
 S e l e c t   o n l y   n e c e s s a r y   f i e l d s   a n d   u s e   p a g i n a t i o n .  
 ` ` ` t y p e s c r i p t  
 / /   � S&   O p t i m i z e d   q u e r y  
 a w a i t   p r i s m a . p a t i e n t . f i n d M a n y ( {  
     s e l e c t :   {   i d :   t r u e ,   n a m e :   t r u e ,   t o k e n :   t r u e ,   s t a t u s :   t r u e   } ,  
     t a k e :   2 0 ,  
     o r d e r B y :   {   c r e a t e d A t :   " d e s c "   }  
 } ) ;  
 ` ` `  
  
 # # #   � x� �   R e f l e c t i o n :   P e r f o r m a n c e   a t   S c a l e  
  
 * * Q u e s t i o n : * *   H o w   d o   t h e s e   o p t i m i z a t i o n s   h e l p   i f   S m a r t O P D   s c a l e s   1 0 x ?  
  
 * * R e s p o n s e : * *   I f   S m a r t O P D   s c a l e s   1 0 x ,   t h e   i n d e x i n g   o f   ` t o k e n ` ,   ` p h o n e ` ,   a n d   ` p a t i e n t I d `   e n s u r e s   c o n s t a n t - t i m e   l o o k u p s   ( O ( 1 )   o r   O ( l o g   n ) )   i n s t e a d   o f   f u l l   t a b l e   s c a n s   ( O ( n ) ) .   T h i s   k e e p s   r e s p o n s e   t i m e s   f a s t   e v e n   w i t h   m i l l i o n s   o f   r e c o r d s .   F u r t h e r m o r e ,   p r e v e n t i n g   o v e r - f e t c h i n g   r e d u c e s   t h e   l o a d   o n   t h e   d a t a b a s e   a n d   t h e   b a n d w i d t h   r e q u i r e d ,   a l l o w i n g   t h e   s e r v e r   t o   h a n d l e   m o r e   c o n c u r r e n t   r e q u e s t s .  
 