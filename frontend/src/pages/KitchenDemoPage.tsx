import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { DashboardShell } from '../components/demo/DashboardShell';
import { OrderCard } from '../components/demo/OrderCard';
import { getDemoOrders, updateDemoOrderStatus } from '../data/mockOrderStorage';
import { MockOrder, OrderStatus } from '../types/demo';

export function KitchenDemoPage() {
  const [orders, setOrders] = useState<MockOrder[]>([]);

  const updateStatus = (orderId: string, status: OrderStatus) => {
    void updateDemoOrderStatus(orderId, status);
    setOrders((current) =>
      current.map((order) => (order.orderId === orderId ? { ...order, status } : order)),
    );
  };

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      const nextOrders = (await getDemoOrders()).filter((order) => order.status !== 'completed');
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

  return (
    <DashboardShell eyebrow="Kitchen display" title="Prep Queue">
      <div className="mb-6 grid gap-4 rounded-2xl border border-orange-800/50 bg-orange-500/10 p-4 text-orange-100 sm:grid-cols-3">
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
          <OrderCard key={order.orderId} onStatusChange={updateStatus} order={order} variant="kitchen" />
        ))}
      </motion.div>
    </DashboardShell>
  );
}
