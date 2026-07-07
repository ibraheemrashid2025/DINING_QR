import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { DashboardShell } from '../components/demo/DashboardShell';
import { OrderCard } from '../components/demo/OrderCard';
import { getDemoOrders, updateDemoOrderStatus } from '../data/mockOrderStorage';
import { MockOrder, OrderStatus } from '../types/demo';

export function CounterDemoPage() {
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const newOrders = orders.filter((order) => order.status === 'new').length;

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      const nextOrders = await getDemoOrders();
      if (isMounted) {
        setOrders(nextOrders);
      }
    };

    void loadOrders();
    const intervalId = window.setInterval(() => {
      void loadOrders();
    }, 2000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const updateStatus = (orderId: string, status: OrderStatus) => {
    void updateDemoOrderStatus(orderId, status);
    setOrders((current) =>
      current.map((order) => (order.orderId === orderId ? { ...order, status } : order)),
    );
  };

  return (
    <DashboardShell eyebrow="Counter operations" title="Incoming Orders">
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <SummaryCard label="Incoming" value={newOrders.toString()} />
        <SummaryCard label="In progress" value={orders.filter((order) => order.status === 'preparing').length.toString()} />
        <SummaryCard label="Sound indicator" value={newOrders > 0 ? 'On' : 'Idle'} />
      </div>
      <div className="mb-6 rounded-2xl border border-orange-800/50 bg-orange-500/10 p-4 text-orange-100">
        <span className="font-bold">Notification UI:</span> {newOrders} new mock order
        {newOrders === 1 ? '' : 's'} waiting. Sound playback is intentionally not implemented yet.
      </div>
      <motion.div className="grid gap-5 lg:grid-cols-2" layout>
        {orders.map((order) => (
          <OrderCard key={order.orderId} onStatusChange={updateStatus} order={order} />
        ))}
      </motion.div>
    </DashboardShell>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-800 bg-[#17110f] p-5 shadow-xl shadow-black/20">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
