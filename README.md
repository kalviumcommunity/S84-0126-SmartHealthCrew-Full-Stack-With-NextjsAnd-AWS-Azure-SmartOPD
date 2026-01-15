# SmartOPD

A Lightweight Digital Queue System for Hospitals

Developed by **SmartHealthCrew**

---

## Problem Statement

 In Tier-2/3 cities, medical appointments still depend on physical queues. How can hospitals adopt lightweight digital queueing without expensive infrastructure?
---

## Tech Stack Overview

### Current Implementation (Sprint 1)
- Next.js (App Router)
- TypeScript
- Node.js
- npm

### Complete Architecture Pipeline

```
Frontend (Next.js)
    ↓
API Layer (Next.js API Routes)
    ↓
Database (PostgreSQL + Prisma ORM)
    ↓
Caching Layer (Redis)
    ↓
Containerization (Docker)
    ↓
Deployment (AWS/Azure + CI/CD)
```

---

## Technology Details

### 1. Next.js - Full-Stack Framework

Next.js serves as the foundation of our application, providing both frontend and backend capabilities within a single codebase. Unlike traditional React applications that only handle client-side rendering, Next.js offers:

**Core Capabilities:**
- **App Router**: File-based routing system for pages and API endpoints
- **API Routes**: Backend endpoints integrated directly into the project structure
- **Server Components**: Server-side rendering for improved performance and SEO
- **Static Generation + SSR**: Hybrid rendering strategies for optimal page delivery
- **TypeScript Integration**: Native support for type-safe development
- **Production Optimization**: Built-in optimization for deployment on Docker, AWS, Azure, and Vercel

**Why Next.js?**

Next.js eliminates the need for separate frontend and backend repositories. It handles server-side rendering, API routes, and static generation out of the box, which significantly reduces architectural complexity while maintaining enterprise-grade performance.

**Resources:**
- [Official Documentation](https://nextjs.org/docs)
- [The Ultimate Guide to Next.js](https://vercel.com/blog)
- [Next.js API Routes Course](https://www.youtube.com/watch?v=next-api-routes)

---

### 2. PostgreSQL - Relational Database

PostgreSQL is our primary data store, chosen for its reliability, ACID compliance, and advanced SQL features. As an open-source relational database, it provides data integrity guarantees essential for healthcare applications where data accuracy is critical.

**Key Features:**
- Strong data consistency and transactional integrity
- Advanced indexing and query optimization
- Support for complex relationships between entities
- JSON support for flexible data structures
- Proven reliability in production environments

**Resources:**
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Why PostgreSQL](https://www.postgresql.org/about/)

---

### 3. Prisma ORM - Database Interface

Prisma acts as the bridge between our TypeScript application code and PostgreSQL. It provides type-safe database queries, eliminating the need for raw SQL while maintaining full control over database operations.

**Benefits:**
- Auto-generated TypeScript types from database schema
- Migration management and version control for database changes
- Intuitive query API with autocomplete support
- Protection against SQL injection vulnerabilities
- Database schema visualization and documentation

**Resources:**
- [Prisma Documentation](https://www.prisma.io/docs)
- [Getting Started with Prisma](https://www.prisma.io/docs/getting-started)

---

### 4. Redis - In-Memory Cache

Redis provides high-speed data caching and session management. By storing frequently accessed data in memory, we reduce database load and improve response times for end users.

**Use Cases:**
- Session management for user authentication
- Caching frequently accessed queue data
- Rate limiting for API endpoints
- Real-time analytics and counters

**Resources:**
- [Redis Documentation](https://redis.io/docs/)
- [What is Redis?](https://www.ibm.com/cloud/learn/redis)

---

### 5. Docker - Containerization

Docker packages our application with all its dependencies into standardized containers. This ensures consistent behavior across development, testing, and production environments.

**Advantages:**
- Identical runtime environment across all stages
- Simplified dependency management
- Easy scaling and deployment
- Isolation between services
- Integration with CI/CD pipelines

**Resources:**
- [Docker Documentation](https://docs.docker.com/)
- [What is Docker?](https://aws.amazon.com/docker/)
- [Docker Course](https://www.youtube.com/watch?v=docker-course)

---

### 6. AWS/Azure - Cloud Infrastructure

Cloud deployment provides scalable infrastructure without upfront hardware costs. We'll use either AWS or Azure for hosting, with managed services for databases, caching, and container orchestration.

**Cloud Services:**
- Container hosting (AWS ECS/EKS or Azure Container Instances)
- Managed PostgreSQL (AWS RDS or Azure Database)
- Managed Redis (AWS ElastiCache or Azure Cache)
- Load balancing and auto-scaling
- Monitoring and logging

**Resources:**
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Azure Documentation](https://docs.microsoft.com/azure/)
- [Getting Started with DevOps on AWS](https://aws.amazon.com/devops/)

---

### 7. CI/CD with GitHub Actions

Continuous Integration and Deployment automates the build, test, and deployment process. Every code change is automatically validated and deployed, reducing manual errors and accelerating development cycles.

**Pipeline Stages:**
1. Code pushed to repository
2. Automated tests run
3. Docker image built
4. Image pushed to container registry
5. Deployment to staging/production
6. Health checks and monitoring

**Resources:**
- [GitHub Actions Documentation](https://docs.github.com/actions)

---

## Architecture Integration

Each technology layer serves a specific purpose:

- **Next.js**: Handles user interface and API logic
- **Prisma**: Translates application code to database operations
- **PostgreSQL**: Stores persistent data with transactional guarantees
- **Redis**: Accelerates read operations through caching
- **Docker**: Packages the application for consistent deployment
- **AWS/Azure**: Provides scalable infrastructure and managed services
- **GitHub Actions**: Automates the deployment pipeline

This architecture allows SmartOPD to start simple and scale incrementally as usage grows.

---

## Project Structure

```
SmartOPD/
├── src/
│   ├── app/
│   │   ├── page.tsx        # Main landing page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   │
│   ├── components/
│   │   └── README.md       # Reusable UI components (future)
│   │
│   └── lib/
│       └── README.md       # Utilities, helpers, configs (future)
│
├── public/                 # Static assets
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Directory Organization

**`src/app/`** - Application routes, layouts, and pages (Next.js App Router)

**`src/components/`** - Reusable UI components

**`src/lib/`** - Utility functions, configurations, and shared logic

This structure separates routing logic, presentational components, and business logic, facilitating team collaboration and code maintainability.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Access the application:
   ```
   http://localhost:3000
   ```

### Production Build

```bash
npm run build
npm start
```

---

## Development Roadmap

| Sprint | Focus Area | Technologies |
|--------|-----------|-------------|
| Sprint 1 | Project Setup & Core Architecture | Next.js, TypeScript, Node.js |
| Sprint 2 | Database Implementation | PostgreSQL, Prisma ORM |
| Sprint 3 | Authentication & Authorization | NextAuth.js, JWT |
| Sprint 4 | Queue Management System | Real-time updates, WebSockets |
| Sprint 5 | Caching & Performance | Redis, Query optimization |
| Sprint 6 | Containerization & Deployment | Docker, AWS/Azure, CI/CD |

---

## Development Guidelines

- Follow Next.js App Router conventions
- Maintain type safety with TypeScript across all modules
- Write modular, reusable components
- Document API endpoints and data models
- Implement comprehensive error handling
- Follow Git workflow with feature branches and pull requests

---

## Team

**SmartHealthCrew**

A collaborative development team focused on building accessible healthcare technology solutions.

---

## License

This project is developed for educational purposes as part of a full-stack development learning initiative focused on healthcare technology solutions.
