import { Route, Routes } from 'react-router-dom';

import { RootLayout } from '../layouts/RootLayout';
import { FoundationPage } from '../pages/FoundationPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<FoundationPage />} index />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}

