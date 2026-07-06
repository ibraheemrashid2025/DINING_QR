import { motion } from 'framer-motion';
import { useState } from 'react';

import { DashboardShell } from '../components/demo/DashboardShell';
import { OrderCard } from '../components/demo/OrderCard';
import { mockOrders } from '../data/mockData';
import { MockOrder, OrderStatus } from '../types/demo';

export function KitchenDemoPage() {
  const [orders, setOrders] = useState<MockOrder[]>(
    mockOrders.filter((order) => order.status !== 'completed'),
  );

  const updateStatus = (orderId: string, status: OrderStatus) => {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
  };

  return (
    <DashboardShell eyebrow="Kitchen display" title="Prep Queue">
      <div className="mb-6 grid gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4 text-orange-950 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Active tickets</p>
          <p className="mt-2 text-3xl font-bold">{orders.length}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Ready</p>
          <p className="mt-2 text-3xl font-bold">
            {orders.filter((order) => order.status === 'ready').length}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Mode</p>
          <p className="mt-2 text-3xl font-bold">Demo</p>
        </div>
      </div>
      <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" layout>
        {orders.map((order) => (
          <OrderCard key={order.id} onStatusChange={updateStatus} order={order} variant="kitchen" />
        ))}
      </motion.div>
    </DashboardShell>
  );
}

