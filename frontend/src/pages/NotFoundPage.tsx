import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950">Page not found</h1>
      <p className="mt-3 text-slate-600">The requested route does not exist.</p>
      <Link
        className="mt-6 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        to="/"
      >
        Return home
      </Link>
    </section>
  );
}

