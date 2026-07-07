import { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { SteakhouseLogo } from '../components/brand/SteakhouseLogo';
import { ToastStack } from '../components/admin/ToastStack';
import { AdminMockProvider } from '../contexts/AdminMockContext';

const adminNavItems = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Categories', to: '/admin/categories' },
  { label: 'Menu Items', to: '/admin/menu' },
  { label: 'Tables / QR', to: '/admin/tables' },
  { label: 'Branches', to: '/admin/branches' },
];

export function AdminLayout() {
  return (
    <AdminMockProvider>
      <AdminFrame>
        <Outlet />
      </AdminFrame>
      <ToastStack />
    </AdminMockProvider>
  );
}

function AdminFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0908] text-stone-50 lg:flex">
      <aside className="border-b border-orange-900/40 bg-black p-3 text-white sm:p-4 lg:sticky lg:top-0 lg:min-h-screen lg:w-72 lg:border-b-0">
        <div className="rounded-2xl border border-orange-900/50 bg-orange-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">Admin Panel</p>
          <SteakhouseLogo className="mt-2" compact />
        </div>
        <nav className="no-scrollbar mt-4 flex gap-2 overflow-x-auto lg:mt-5 lg:grid lg:overflow-visible">
          {adminNavItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `shrink-0 rounded-full px-3 py-2 text-sm font-semibold lg:rounded-md lg:py-3 ${
                  isActive ? 'bg-orange-600 text-white' : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`
              }
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-orange-900/40 bg-black/85 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">
                Mock data workspace
              </p>
              <p className="text-sm text-stone-400">Frontend-only admin functionality</p>
            </div>
            <select className="rounded-full border border-stone-700 bg-[#17110f] px-4 py-2 text-sm font-semibold text-stone-200">
              <option>Main Branch</option>
            </select>
          </div>
        </header>
        <main className="px-3 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
