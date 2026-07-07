import { motion } from 'framer-motion';

import { AdminCard } from '../../components/admin/AdminCard';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { useAdminMock } from '../../contexts/useAdminMock';
import { getDemoOrders } from '../../data/mockOrderStorage';
import { formatCurrency } from '../../utils/format';

export function AdminDashboardPage() {
  const { branches, categories, menuItems, tables } = useAdminMock();
  const orders = getDemoOrders();
  const stats = [
    { label: 'Total Categories', value: categories.length },
    { label: 'Total Menu Items', value: menuItems.length },
    { label: 'Total Tables', value: tables.length },
    { label: 'Total Branches', value: branches.length },
  ];

  return (
    <>
      <AdminPageHeader
        description="A premium mock overview for the restaurant operating system."
        title="Dashboard"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 12 }} key={stat.label}>
            <AdminCard>
              <p className="text-sm font-semibold text-stone-400">{stat.label}</p>
              <p className="mt-3 text-4xl font-bold text-orange-300">{stat.value}</p>
            </AdminCard>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <AdminCard>
          <h3 className="text-xl font-bold text-stone-50">Recent Activity</h3>
          <div className="mt-4 space-y-3">
            {['Category updated', 'Menu item marked popular', 'QR preview generated', 'Branch details edited'].map(
              (activity, index) => (
                <div className="rounded-xl bg-black/30 p-4" key={activity}>
                  <p className="font-semibold text-stone-100">{activity}</p>
                  <p className="mt-1 text-sm text-stone-500">{index + 2} minutes ago - Mock event</p>
                </div>
              ),
            )}
          </div>
        </AdminCard>
        <AdminCard>
          <h3 className="text-xl font-bold text-stone-50">Demo Orders</h3>
          <p className="mt-2 text-sm text-stone-400">
            Local demo orders placed from the table QR menu links.
          </p>
          <div className="mt-5 space-y-3">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div className="rounded-xl border border-stone-800 bg-black/25 p-4" key={order.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-stone-100">{order.id}</p>
                      <p className="text-sm text-stone-500">{order.branchName}</p>
                    </div>
                    <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold capitalize text-orange-200">
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <OrderInfo label="Table Number" value={`Table ${order.tableNumber}`} />
                    <OrderInfo label="Customer Name" value={order.customerName} />
                    <OrderInfo label="Bill Total" value={formatCurrency(order.totalBill)} />
                    <OrderInfo label="Time" value={order.createdAt} />
                  </div>
                  <div className="mt-3">
                    <OrderInfo
                      label="Items"
                      value={order.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-xl bg-black/30 p-4 text-sm text-stone-400">
                No local demo orders yet. Open Table 1 and Table 2 from the demo landing page to place orders.
              </p>
            )}
          </div>
        </AdminCard>
      </div>
    </>
  );
}

function OrderInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-1 font-semibold text-stone-100">{value}</p>
    </div>
  );
}
