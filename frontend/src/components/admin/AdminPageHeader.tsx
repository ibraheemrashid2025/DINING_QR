import { ReactNode } from 'react';

type AdminPageHeaderProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function AdminPageHeader({ action, description, title }: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-stone-50">{title}</h2>
        <p className="mt-2 text-sm text-stone-400">{description}</p>
      </div>
      {action}
    </div>
  );
}
