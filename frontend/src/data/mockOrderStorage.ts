import { mockOrders } from './mockData';
import { mockTableTokens } from './mockTableTokens';
import { MockOrder, OrderStatus } from '../types/demo';

const STORAGE_KEY = 'demo.orders';

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStoredOrders() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as MockOrder[]) : [];
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

export function getDemoOrders() {
  const validTokens = new Set(mockTableTokens.map((token) => token.qrToken));
  const storedOrders = readStoredOrders().filter((order) => validTokens.has(order.qrToken));
  const seedOrders = mockOrders.filter((order) => validTokens.has(order.qrToken));

  return [...storedOrders, ...seedOrders];
}

export function saveDemoOrder(order: MockOrder) {
  const storedOrders = readStoredOrders();
  writeStoredOrders([order, ...storedOrders]);
}

export function updateDemoOrderStatus(orderId: string, status: OrderStatus) {
  const storedOrders = readStoredOrders();
  writeStoredOrders(
    storedOrders.map((order) => (order.id === orderId ? { ...order, status } : order)),
  );
}
