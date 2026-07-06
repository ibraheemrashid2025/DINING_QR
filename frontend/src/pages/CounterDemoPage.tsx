import { motion } from 'framer-motion';
import { useState } from 'react';

import { DashboardShell } from '../components/demo/DashboardShell';
import { OrderCard } from '../components/demo/OrderCard';
import { mockOrders } from '../data/mockData';
import { MockOrder, OrderStatus } from '../types/demo';

export function CounterDemoPage() {
  const [orders, setOrders] = useState<MockOrder[]>(mockOrders);
  const newOrders = orders.filter((order) => order.status === 'new').length;

  const updateStatus = (orderId: string, status: OrderStatus) => {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
  };

  return (
    <DashboardShell eyebrow="Counter operations" title="Incoming Orders">
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <SummaryCard label="Incoming" value={newOrders.toString()} tone="amber" />
        <SummaryCard label="In progress" value="7" tone="sky" />
        <SummaryCard label="Sound indicator" value={newOrders > 0 ? 'On' : 'Idle'} tone="emerald" />
      </div>
      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
        <span className="font-bold">Notification UI:</span> {newOrders} new mock order
        {newOrders === 1 ? '' : 's'} waiting. Sound playback is intentionally not implemented yet.
      </div>
      <motion.div className="grid gap-5 lg:grid-cols-2" layout>
        {orders.map((order) => (
          <OrderCard key={order.id} onStatusChange={updateStatus} order={order} />
        ))}
      </motion.div>
    </DashboardShell>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: string; tone: 'amber' | 'sky' | 'emerald' }) {
  const tones = {
    amber: 'bg-amber-50 text-amber-800',
    sky: 'bg-sky-50 text-sky-800',
    emerald: 'bg-emerald-50 text-emerald-800',
  };

  return (
    <div className={`rounded-lg border border-white p-5 shadow-sm ${tones[tone]}`}>
      <p className="text-sm font-semibold uppercase tracking-wide opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

