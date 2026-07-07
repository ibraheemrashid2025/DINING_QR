import { MockTableToken } from '../types/demo';

export const mockTableTokens: MockTableToken[] = [
  {
    qrToken: 'demo-table-1',
    restaurantName: 'Ember & Oak Grill',
    branchName: 'Main Branch',
    tableNumber: 1,
    tableId: 'table_1',
    branchId: 'main_branch',
  },
  {
    qrToken: 'demo-table-2',
    restaurantName: 'Ember & Oak Grill',
    branchName: 'Main Branch',
    tableNumber: 2,
    tableId: 'table_2',
    branchId: 'main_branch',
  },
];

export function resolveMockTableToken(qrToken: string | undefined) {
  return mockTableTokens.find((token) => token.qrToken === qrToken) ?? null;
}

export function getDemoMenuPath(qrToken: string) {
  return `/menu/t/${qrToken}`;
}

export function getDemoQrImageUrl(origin: string, qrToken: string) {
  const menuUrl = `${origin}${getDemoMenuPath(qrToken)}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(menuUrl)}`;
}
