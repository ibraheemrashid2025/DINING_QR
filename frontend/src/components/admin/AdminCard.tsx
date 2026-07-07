import { ReactNode } from 'react';

export function AdminCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-stone-800 bg-[#17110f] p-5 shadow-xl shadow-black/20 ${className}`}>
      {children}
    </section>
  );
}
