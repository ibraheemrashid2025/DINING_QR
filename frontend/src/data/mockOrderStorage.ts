import { mockOrders } from './mockData';
import { mockTableTokens } from './mockTableTokens';
import { httpClient } from '../api/httpClient';
import { MockOrder, OrderStatus } from '../types/demo';

const STORAGE_KEY = 'demo.orders';
type DemoOrdersResponse = {
  data: MockOrder[];
};

type DemoOrderResponse = {
  data: MockOrder;
};

type LegacyMockOrder = MockOrder & {
  id?: string;
};

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function normalizeOrder(order: LegacyMockOrder): MockOrder {
  return {
    ...order,
    orderId: order.orderId ?? order.id ?? `ORD-${Date.now().toString().slice(-6)}`,
  };
}

function readStoredOrders() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as LegacyMockOrder[]).map(normalizeOrder) : [];
  } catch {
    return [];
  }
}

function writeStoredOrders(orders: MockOrder[]) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function getFallbackDemoOrders() {
  const validTokens = new Set(mockTableTokens.map((token) => token.qrToken));
  const storedOrders = readStoredOrders().filter((order) => validTokens.has(order.qrToken));
  const seedOrders = mockOrders.filter((order) => validTokens.has(order.qrToken));

  return [...storedOrders, ...seedOrders];
}

export async function getDemoOrders() {
  try {
    const response = await httpClient.get<DemoOrdersResponse>('/demo-orders');
    return response.data.data;
  } catch {
    return getFallbackDemoOrders();
  }
}

export async function saveDemoOrder(order: MockOrder) {
  try {
    const response = await httpClient.post<DemoOrderResponse>('/demo-orders', order);
    return response.data.data;
  } catch {
    saveDemoOrderFallback(order);
    return order;
  }
}

export function saveDemoOrderFallback(order: MockOrder) {
  const storedOrders = readStoredOrders();
  writeStoredOrders([order, ...storedOrders]);
}

export async function updateDemoOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const response = await httpClient.patch<DemoOrderResponse>(`/demo-orders/${orderId}/status`, {
      status,
    });
    return response.data.data;
  } catch {
    updateDemoOrderStatusFallback(orderId, status);
    return getFallbackDemoOrders().find((order) => order.orderId === orderId) ?? null;
  }
}

function updateDemoOrderStatusFallback(orderId: string, status: OrderStatus) {
  const storedOrders = readStoredOrders();
  writeStoredOrders(
    storedOrders.map((order) => (order.orderId === orderId ? { ...order, status } : order)),
  );
}
