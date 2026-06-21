import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { Loader } from '../components/shared/Loader';

// Lazy loaded pages
const SettingsPage = React.lazy(() => import('../pages/settings/SettingsPage'));
const CalculatorPage = React.lazy(() => import('../pages/calculator/CalculatorPage'));
const InvoiceCreatePage = React.lazy(() => import('../pages/invoice/InvoiceCreatePage'));
const HistoryPage = React.lazy(() => import('../pages/history/HistoryPage'));

const LoadingFallback = () => <Loader />;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/calculator" replace />} />
          
          <Route path="calculator" element={
            <Suspense fallback={<LoadingFallback />}>
              <CalculatorPage />
            </Suspense>
          } />
          
          <Route path="invoice" element={
            <Suspense fallback={<LoadingFallback />}>
              <InvoiceCreatePage />
            </Suspense>
          } />
          
          <Route path="history" element={
            <Suspense fallback={<LoadingFallback />}>
              <HistoryPage />
            </Suspense>
          } />
          
          <Route path="settings" element={
            <Suspense fallback={<LoadingFallback />}>
              <SettingsPage />
            </Suspense>
          } />

          <Route path="*" element={<Navigate to="/calculator" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
