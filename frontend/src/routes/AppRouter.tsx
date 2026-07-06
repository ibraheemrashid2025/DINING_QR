import { Route, Routes } from 'react-router-dom';

import { RootLayout } from '../layouts/RootLayout';
import { AdminDemoPage } from '../pages/AdminDemoPage';
import { CounterDemoPage } from '../pages/CounterDemoPage';
import { FoundationPage } from '../pages/FoundationPage';
import { KitchenDemoPage } from '../pages/KitchenDemoPage';
import { MenuDemoPage } from '../pages/MenuDemoPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MenuDemoPage />} path="/menu" />
      <Route element={<CounterDemoPage />} path="/counter" />
      <Route element={<KitchenDemoPage />} path="/kitchen" />
      <Route element={<AdminDemoPage />} path="/admin" />
      <Route element={<RootLayout />}>
        <Route element={<FoundationPage />} index />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}
