import { useContext } from 'react';

import { AdminMockContext } from './admin-mock.context';

export function useAdminMock() {
  const context = useContext(AdminMockContext);

  if (!context) {
    throw new Error('useAdminMock must be used within AdminMockProvider');
  }

  return context;
}
