import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { ConfirmProvider } from './context/ConfirmContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/admin/AdminLayout';

// Public Pages
import { HomePage } from './pages/Home';
import { PhysicalProductsPage } from './pages/PhysicalProducts';
import { DigitalProductsPage } from './pages/DigitalProducts';
import { CategoryDetailPage } from './pages/Category';
import { RankingDetailPage } from './pages/Ranking';
import { ReviewDetailPage } from './pages/Review';
import { ComparisonDetailPage } from './pages/Comparison';
import { GuideDetailPage } from './pages/Guide';
import { SearchPage } from './pages/Search';

// Admin Pages
import { AdminLoginPage } from './pages/Admin/AdminLogin';
import { AdminDashboardPage } from './pages/Admin/Dashboard';
import { AdminCategoriesPage } from './pages/Admin/Categories';
import { AdminProductsPage } from './pages/Admin/Products';
import { AdminRankingsPage } from './pages/Admin/Rankings';
import { AdminArticlesPage } from './pages/Admin/Articles';
import { AdminComparisonsPage } from './pages/Admin/Comparisons';
import { AdminExpertsPage } from './pages/Admin/Experts';
import { AdminSettingsPage } from './pages/Admin/Settings';

import { FloatingWidgets } from './components/ui/FloatingWidgets';
import { PageTransition } from './components/layout/PageTransition';

// Scroll to top helper on reload and route navigation
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

// Public Website Wrapper Layout (Header + Page + Footer + Floating Widgets)
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 font-sans text-slate-900 selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="flex-1 w-full">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          <ConfirmProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* SINGLE-PAGE PUBLIC LANDING PAGE */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                </Route>

                {/* ADMIN LOGIN */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* ADMIN SECURE CMS (Nested Routes) */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminProductsPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                </Route>

                {/* 404 / Fallback Route (Redirect to Home Landing Page) */}
                <Route element={<PublicLayout />}>
                  <Route path="*" element={<HomePage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ConfirmProvider>
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
