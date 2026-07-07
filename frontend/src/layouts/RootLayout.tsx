import { Outlet } from 'react-router-dom';

import { SteakhouseLogo } from '../components/brand/SteakhouseLogo';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#0b0908] text-stone-50">
      <header className="border-b border-orange-900/40 bg-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">
          <SteakhouseLogo compact />
          <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-200">
            Demo
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
