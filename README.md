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
- MySQL, locally available through XAMPP/phpMyAdmin or hosted for deployment

## Setup

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run prisma:generate --workspace backend
npm run dev
```

## Build

```bash
npm run build
```

## App URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Backend health endpoint: `http://localhost:5000/api/health`

