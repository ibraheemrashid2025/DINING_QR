import { motion } from 'framer-motion';

import { useHealthCheck } from '../hooks/useHealthCheck';

export function FoundationPage() {
  const healthQuery = useHealthCheck();
  const status = healthQuery.data?.status ?? 'checking';

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25 }}
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-wide text-emerald-700">
        Production foundation
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-slate-950">
        Restaurant QR Ordering Platform
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        Core application infrastructure is wired for React, routing, server state,
        API communication, Express, Prisma, Socket.IO, validation, security, and
        deployment-ready configuration.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-950">Frontend</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Vite, React, TypeScript, Tailwind CSS, React Router, TanStack Query,
            Axios, and Framer Motion are configured.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-950">Backend</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Express, Prisma MySQL, Socket.IO, Helmet, CORS, Morgan, rate limiting,
            JWT, bcrypt, Zod, and centralized errors are configured.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-950">API Health</h2>
        <p className="mt-2 text-sm text-slate-600">
          Status: <span className="font-medium text-slate-950">{status}</span>
        </p>
      </div>
    </motion.section>
  );
}

