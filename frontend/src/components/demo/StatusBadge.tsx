import { OrderStatus } from '../../types/demo';

const statusStyles: Record<OrderStatus, string> = {
  new: 'bg-orange-500/15 text-orange-200 ring-orange-500/30',
  accepted: 'bg-red-500/15 text-red-200 ring-red-500/30',
  preparing: 'bg-amber-500/15 text-amber-200 ring-amber-500/30',
  ready: 'bg-emerald-500/15 text-emerald-200 ring-emerald-500/30',
  completed: 'bg-stone-500/15 text-stone-300 ring-stone-500/30',
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
