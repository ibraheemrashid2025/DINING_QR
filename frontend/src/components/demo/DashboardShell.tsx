import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { SteakhouseLogo } from '../brand/SteakhouseLogo';

type DashboardShellProps = {
  title: string;
  eyebrow: string;
  children: ReactNode;
  sidebar?: boolean;
};

const navItems = [
  { label: 'Menu', to: '/menu/t/demo-table-1' },
  { label: 'Counter', to: '/counter' },
  { label: 'Kitchen', to: '/kitchen' },
  { label: 'Admin', to: '/admin' },
];

export function DashboardShell({ title, eyebrow, children, sidebar = false }: DashboardShellProps) {
  if (sidebar) {
    return (
      <div className="min-h-screen bg-[#0b0908] text-stone-50 lg:flex">
        <aside className="border-b border-orange-900/40 bg-black p-5 text-white lg:min-h-screen lg:w-72 lg:border-b-0">
          <Link className="inline-flex" to="/">
            <SteakhouseLogo compact />
          </Link>
          <nav className="mt-8 grid gap-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-orange-600 text-white' : 'text-stone-300 hover:bg-white/10'}`
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
    <div className="min-h-screen bg-[#0b0908] text-stone-50">
      <header className="sticky top-0 z-20 border-b border-orange-900/40 bg-black/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-4">
          <Link className="inline-flex" to="/">
            <SteakhouseLogo compact />
          </Link>
          <nav className="no-scrollbar flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-600 text-white' : 'bg-[#17110f] text-stone-300'}`
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
      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-8">
        <Header eyebrow={eyebrow} title={title} />
        {children}
      </main>
    </div>
  );
}

function Header({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-50 sm:text-4xl">{title}</h1>
    </div>
  );
}
