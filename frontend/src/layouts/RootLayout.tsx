import { Outlet } from 'react-router-dom';

import { useAppConfig } from '../contexts/useAppConfig';

export function RootLayout() {
  const { appName } = useAppConfig();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            {appName}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Foundation
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
