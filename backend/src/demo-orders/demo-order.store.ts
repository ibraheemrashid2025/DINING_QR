import { DemoOrder, DemoOrderStatus } from './demo-order.types';

const demoOrders = new Map<string, DemoOrder>();

export function listDemoOrders() {
  return Array.from(demoOrders.values()).sort((first, second) =>
    second.createdAt.localeCompare(first.createdAt),
  );
}

export function createDemoOrder(order: DemoOrder) {
  demoOrders.set(order.orderId, order);
  return order;
}

export function updateDemoOrderStatus(orderId: string, status: DemoOrderStatus) {
  const order = demoOrders.get(orderId);

  if (!order) {
    return null;
  }

  const updatedOrder = { ...order, status };
  demoOrders.set(orderId, updatedOrder);
  return updatedOrder;
}
