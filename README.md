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

### Planned Architecture
- **Database:** PostgreSQL with Prisma ORM
- **Caching:** Redis for real-time queue updates
- **Containerization:** Docker
- **Deployment:** AWS/Azure
- **CI/CD:** GitHub Actions

---

## 📁 Project Structure

```
SmartOPD/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── about/
│   │   │   └── page.tsx          # About SmartOPD (SSG)
│   │   ├── live-queue/
│   │   │   └── page.tsx          # Live Queue Status (SSR)
│   │   ├── news/
│   │   │   └── page.tsx          # SmartOPD Updates (ISR)
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # Reusable UI components (future)
│   └── lib/                      # Utilities and helpers (future)
│
├── public/                       # Static assets
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

## 🔧 Code Quality Setup (Strict TS + ESLint + Prettier + Husky)

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