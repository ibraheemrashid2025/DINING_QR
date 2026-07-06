import { MockOrder, OrderStatus } from '../../types/demo';
import { StatusBadge } from './StatusBadge';

type OrderCardProps = {
  order: MockOrder;
  variant?: 'counter' | 'kitchen';
  onStatusChange?: (orderId: string, status: OrderStatus) => void;
};

const nextStatuses: OrderStatus[] = ['accepted', 'preparing', 'ready', 'completed'];

export function OrderCard({ order, variant = 'counter', onStatusChange }: OrderCardProps) {
  const isKitchen = variant === 'kitchen';

  return (
    <article className={`rounded-lg border bg-white p-5 shadow-sm ${isKitchen ? 'border-orange-200' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{order.id}</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-950">Table {order.tableNumber}</h3>
          <p className="mt-1 text-sm text-slate-500">{order.createdAt}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-5 space-y-3">
        {order.items.map((item) => (
          <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2" key={item.id}>
            <span className="font-medium text-slate-800">{item.name}</span>
            <span className="rounded-full bg-white px-2 py-1 text-sm font-bold text-slate-950">
              x{item.quantity}
            </span>
          </div>
        ))}
      </div>

      {order.notes ? (
        <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">Note: {order.notes}</p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {nextStatuses.map((status) => (
          <button
            className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold capitalize text-slate-700 hover:border-slate-950 hover:text-slate-950"
            key={status}
            onClick={() => onStatusChange?.(order.id, status)}
            type="button"
          >
            {status}
          </button>
        ))}
      </div>
    </article>
  );
}

