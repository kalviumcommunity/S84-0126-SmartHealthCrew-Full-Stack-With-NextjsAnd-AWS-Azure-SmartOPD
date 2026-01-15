# SmartOPD

**A Lightweight Digital Queue System for Hospitals (Sprint 1 Submission)**

---

## Overview

SmartOPD is a lightweight digital queue management system designed to reduce physical waiting lines in hospitals, especially in Tier-2 and Tier-3 cities.  
The goal of the project is to explore how modern full-stack web technologies can be used to design scalable, cost-effective healthcare software without heavy infrastructure requirements.

This repository represents **Sprint 1**.

---

## Academic Context

This project is submitted as part of an academic assignment for learning and applying modern full-stack development practices using **Next.js and TypeScript**.

---

## Problem Statement

In many hospitals, especially in non-metro regions, outpatient departments still rely on physical queues and manual token systems.  
This leads to overcrowding, long wait times, and inefficient patient flow.

SmartOPD aims to provide a **simple, digital queueing solution** that hospitals can adopt without expensive hardware or complex setups.

---

## Project Status

### Implemented

- Next.js project initialized using App Router
- TypeScript configuration
- Standard project folder structure
- ESLint and PostCSS setup
- Initial documentation and architectural planning

### Planned

- Database integration using PostgreSQL and Prisma ORM
- Authentication and authorization
- Queue and token management logic
- Caching for performance optimization
- Containerization and cloud deployment

---

## Tech Stack (Current)

- **Next.js (App Router)**
- **TypeScript**
- **Node.js**
- **npm**

> Note: Other technologies mentioned in this repository are part of future planning and are not implemented in the current submission.

---

## Planned Architecture (High-Level)

Frontend (Next.js)
↓
API Layer (Next.js API Routes)
↓
Database (PostgreSQL + Prisma ORM)
↓
Caching Layer (Redis)

---

## Project Structure
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

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```