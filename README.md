# Restaurant QR Ordering Platform

Production-ready project foundation for a commercial Restaurant QR Ordering Platform.

This phase intentionally contains infrastructure only. It does not include restaurant pages, menu logic, orders, carts, admin screens, dashboards, QR flows, payments, notifications, or restaurant database tables.

## Project Structure

```text
.
├── backend
│   ├── prisma
│   └── src
│       ├── config
│       ├── constants
│       ├── controllers
│       ├── middleware
│       ├── repositories
│       ├── routes
│       ├── services
│       ├── sockets
│       ├── types
│       ├── utils
│       └── validators
└── frontend
    └── src
        ├── api
        ├── assets
        ├── components
        ├── contexts
        ├── hooks
        ├── layouts
        ├── pages
        ├── routes
        ├── services
        ├── types
        └── utils
```

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL 14+ locally or hosted

## PostgreSQL Options

- Neon: recommended for Vercel-style deployments and serverless PostgreSQL.
- Railway: useful when hosting the backend and database together.
- Supabase: useful if future auth, storage, or realtime features are needed.

## Setup

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run prisma:migrate --workspace backend
npm run prisma:generate --workspace backend
npm run dev
```

Use a PostgreSQL connection string in `backend/.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

For local development, create a PostgreSQL database first, then run the Prisma migration command above.

## Build

```bash
npm run build
```

## App URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Backend health endpoint: `http://localhost:5000/api/health`
