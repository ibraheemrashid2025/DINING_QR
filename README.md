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

## Demo Staff Logins

After running the Prisma seed command, these demo users are available for protected staff routes:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@casalumiere.test` | `DemoPass@123` |
| Counter Staff | `counter@casalumiere.test` | `DemoPass@123` |
| Kitchen Staff | `kitchen@casalumiere.test` | `DemoPass@123` |

Customer QR menu routes remain public and do not require login.

## Build

```bash
npm run build
```

## Backend Deployment

The backend is prepared for deployment on Render, Railway, Fly.io, or a similar Node.js host.

The API listens on `process.env.PORT` through the validated backend `PORT` environment variable. In production, the hosting platform should provide this value automatically or allow it to be configured.

### Render Deployment

Create a new Render Web Service from this repository.

- Root directory: repository root
- Build command: `npm install && npm run prisma:generate --workspace backend && npm run build --workspace backend`
- Start command: `npm run start --workspace backend`
- Health check URL: `https://YOUR-BACKEND-URL/api/health`

Required backend environment variables:

```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://YOUR-VERCEL-FRONTEND-URL
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
JWT_ACCESS_SECRET=replace-with-a-secure-32-plus-character-secret
JWT_REFRESH_SECRET=replace-with-a-secure-32-plus-character-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=3000
```

Use a production PostgreSQL database URL from Render PostgreSQL, Railway PostgreSQL, Neon, Supabase, or another managed PostgreSQL provider. The Prisma schema is configured for PostgreSQL.

After setting `DATABASE_URL`, run migrations against production PostgreSQL from your deployment workflow or local machine:

```bash
npm run prisma:migrate --workspace backend
```

### Railway Deployment

Create a Railway service from this repository and connect a PostgreSQL database.

- Root directory: repository root
- Build command: `npm install && npm run prisma:generate --workspace backend && npm run build --workspace backend`
- Start command: `npm run start --workspace backend`
- Health check URL: `https://YOUR-BACKEND-URL/api/health`

Set the same backend environment variables listed in the Render section.

### Demo Order API Check

After backend deployment, confirm these endpoints respond:

- `GET https://YOUR-BACKEND-URL/api/health`
- `GET https://YOUR-BACKEND-URL/api/demo-orders`
- `POST https://YOUR-BACKEND-URL/api/demo-orders`
- `PATCH https://YOUR-BACKEND-URL/api/demo-orders/:orderId/status`

Demo orders are currently stored in server memory and will reset when the deployed backend restarts. Database-backed order persistence belongs to a later phase.

### Vercel Frontend API URL

In the Vercel frontend project, set:

```env
VITE_API_BASE_URL=https://YOUR-BACKEND-URL/api
```

Redeploy the frontend after changing this environment variable.

## App URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Backend health endpoint: `http://localhost:5000/api/health`
