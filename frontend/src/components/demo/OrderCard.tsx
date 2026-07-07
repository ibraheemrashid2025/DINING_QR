import { MockOrder, OrderStatus } from '../../types/demo';
import { formatCurrency } from '../../utils/format';
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
    <article className={`rounded-2xl border bg-[#17110f] p-5 shadow-xl shadow-black/20 ${isKitchen ? 'border-orange-800/60' : 'border-stone-800'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">{order.id}</p>
          <h3 className="mt-1 text-2xl font-bold text-stone-50">Table {order.tableNumber}</h3>
          <p className="mt-1 text-sm text-stone-400">{order.branchName}</p>
          <p className="mt-1 text-sm text-stone-400">{order.createdAt}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {!isKitchen ? (
        <div className="mt-5 grid gap-3 rounded-xl bg-black/30 p-3 text-sm sm:grid-cols-2">
          <InfoItem label="Branch Name" value={order.branchName} />
          <InfoItem label="Table Number" value={`Table ${order.tableNumber}`} />
          <InfoItem label="Customer Name" value={order.customerName} />
          <InfoItem label="Total Bill" value={formatCurrency(order.totalBill)} />
        </div>
      ) : (
        <div className="mt-5 grid gap-3 rounded-xl bg-black/30 p-3 text-sm">
          <InfoItem label="Branch Name" value={order.branchName} />
          <InfoItem label="Table Number" value={`Table ${order.tableNumber}`} />
        </div>
      )}

      <div className="mt-5 space-y-3">
        {order.items.map((item) => (
          <div className="flex items-center justify-between rounded-xl bg-black/30 px-3 py-2" key={item.id}>
            <span className="font-medium text-stone-200">{item.name}</span>
            <span className="rounded-full bg-orange-500/15 px-2 py-1 text-sm font-bold text-orange-200">
              x{item.quantity}
            </span>
          </div>
        ))}
      </div>

      {order.notes ? (
        <p className="mt-4 rounded-xl bg-orange-500/15 px-3 py-2 text-sm text-orange-100">Note: {order.notes}</p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {nextStatuses.map((status) => (
          <button
            className="rounded-full border border-stone-700 px-3 py-2 text-xs font-semibold capitalize text-stone-300 hover:border-orange-500 hover:text-orange-200"
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

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-1 font-bold text-stone-50">{value}</p>
    </div>
  );
}
