# NextGen E-Learning Platform 🎓

A scalable, AI-ready e-learning platform built with a modern full-stack architecture.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-emerald?logo=supabase)](https://supabase.com/)

## ✨ Features

- **Premium Dark UI** — Glassmorphism design system with radial gradients and micro-animations
- **Course Catalog** — Filterable course grid with category navigation
- **Distraction-Free Learning Player** — Custom video player with curriculum sidebar
- **Supabase Authentication** — Real login/register with email verification & protected routes
- **Instructor Dashboard** — Analytics, KPI tracking, and multi-step course creation wizard
- **Checkout Flow** — Stripe-like payment UI with success confirmation
- **Student Profiles** — Certificate tracking and learning statistics

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + React Router |
| Styling | Vanilla CSS with CSS Custom Properties |
| State | Zustand (persistent auth store) |
| Auth | Supabase Auth (JWT-based) |
| Backend | FastAPI + SQLAlchemy (async) |
| Database | PostgreSQL (via Supabase or Docker) |
| Deployment | Docker Compose |

## 🚀 Getting Started

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- [Python 3.11+](https://python.org/)
- [Docker Desktop](https://docker.com/products/docker-desktop/) (for local Postgres)
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Clone and install frontend

```bash
cd client
npm install
```

### 2. Configure environment variables

**`client/.env`** — get values from Supabase → Settings → API:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

**`server/.env`** — get JWT secret from Supabase → Settings → API → JWT Settings:
```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/elearning
```

### 3. Start local database

```bash
docker-compose up -d
```

### 4. Start the frontend dev server

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Start the backend server

```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs at [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── features/       # Domain-driven feature modules
│   │   │   ├── auth/       # Login, Register
│   │   │   ├── catalog/    # Home, Catalog, Checkout
│   │   │   ├── learning/   # CoursePlayer
│   │   │   ├── instructor/ # Dashboard, CourseCreationWizard
│   │   │   └── student/    # StudentProfile
│   │   ├── components/     # Shared layouts (PublicLayout, DashboardLayout, ProtectedRoute)
│   │   ├── lib/            # axios.js, supabase.js
│   │   └── store/          # authStore.js (Zustand)
│   └── .env                # ← Fill in your Supabase keys
│
├── server/                 # FastAPI backend
│   └── app/
│       ├── api/v1/         # REST endpoints
│       ├── core/           # config.py, security.py (Supabase JWT validation)
│       ├── db/             # session.py, seed.py
│       ├── models/         # SQLAlchemy ORM models
│       └── schemas/        # Pydantic schemas
│
└── docker-compose.yml      # Local Postgres + pgAdmin
```

## 📄 License

MIT
