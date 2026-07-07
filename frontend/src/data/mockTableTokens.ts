import { MockTableToken } from '../types/demo';

export const defaultDemoQrToken = '7fd2a9c1-6d8b-4f2b-a8c4-f91e6d12e3ab';

export const mockTableTokens: MockTableToken[] = [
  {
    id: 'table_1',
    qrToken: defaultDemoQrToken,
    restaurantName: 'Ember & Oak Grill',
    branchName: 'Main Branch',
    tableNumber: 1,
    branchId: 'main_branch',
  },
  {
    id: 'table_2',
    qrToken: 'e15b8fd7-7b12-4dc9-9178-9d5e2d9f4a61',
    restaurantName: 'Ember & Oak Grill',
    branchName: 'Main Branch',
    tableNumber: 2,
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
