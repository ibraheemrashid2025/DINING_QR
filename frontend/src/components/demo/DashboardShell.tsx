import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

type DashboardShellProps = {
  title: string;
  eyebrow: string;
  children: ReactNode;
  sidebar?: boolean;
};

const navItems = [
  { label: 'Menu', to: '/menu?table=5' },
  { label: 'Counter', to: '/counter' },
  { label: 'Kitchen', to: '/kitchen' },
  { label: 'Admin', to: '/admin' },
];

export function DashboardShell({ title, eyebrow, children, sidebar = false }: DashboardShellProps) {
  if (sidebar) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-950 lg:flex">
        <aside className="border-b border-slate-200 bg-slate-950 p-5 text-white lg:min-h-screen lg:w-72 lg:border-b-0">
          <Link className="text-lg font-bold" to="/">
            Casa Lumiere OS
          </Link>
          <nav className="mt-8 grid gap-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10'}`
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Header eyebrow={eyebrow} title={title} />
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link className="text-lg font-bold text-slate-950" to="/">
            Casa Lumiere OS
          </Link>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold ${isActive ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'}`
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Header eyebrow={eyebrow} title={title} />
        {children}
      </main>
    </div>
  );
}

function Header({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
    </div>
  );
}

