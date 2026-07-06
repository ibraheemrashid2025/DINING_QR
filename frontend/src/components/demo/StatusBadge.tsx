import { OrderStatus } from '../../types/demo';

const statusStyles: Record<OrderStatus, string> = {
  new: 'bg-amber-100 text-amber-800 ring-amber-200',
  accepted: 'bg-sky-100 text-sky-800 ring-sky-200',
  preparing: 'bg-indigo-100 text-indigo-800 ring-indigo-200',
  ready: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  completed: 'bg-slate-100 text-slate-700 ring-slate-200',
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

