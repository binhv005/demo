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
import { ReviewDetailPage } from './pages/Review';
import { GuideDetailPage } from './pages/Guide';
import { RankingDetailPage } from './pages/Ranking';
import { ComparisonDetailPage } from './pages/Comparison';
import { ComparisonsListPage } from './pages/Comparisons';
import { CategoryDetailPage } from './pages/Category';
import { PhysicalProductsPage } from './pages/PhysicalProducts';
import { DigitalProductsPage } from './pages/DigitalProducts';
import { ArticlesPage } from './pages/Articles';
import { SearchPage } from './pages/Search';

// Admin Pages
import { AdminDashboardPage } from './pages/Admin/Dashboard';
import { AdminProductsPage } from './pages/Admin/Products';
import { AdminCategoriesPage } from './pages/Admin/Categories';
import { AdminRankingsPage } from './pages/Admin/Rankings';
import { AdminArticlesPage } from './pages/Admin/Articles';
import { AdminComparisonsPage } from './pages/Admin/Comparisons';
import { AdminExpertsPage } from './pages/Admin/Experts';
import { AdminLeadsPage } from './pages/Admin/Leads';
import { AdminSettingsPage } from './pages/Admin/Settings';
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
                {/* PUBLIC PAGES */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Reviews & Product Details */}
                  <Route path="/danh-gia/:slug" element={<ReviewDetailPage />} />
                  <Route path="/review/:slug" element={<ReviewDetailPage />} />

                  {/* Guides & Instructions */}
                  <Route path="/bai-viet" element={<ArticlesPage />} />
                  <Route path="/huong-dan" element={<ArticlesPage />} />
                  <Route path="/cam-nang" element={<ArticlesPage />} />
                  <Route path="/huong-dan/:slug" element={<GuideDetailPage />} />
                  <Route path="/bai-viet/:slug" element={<GuideDetailPage />} />
                  <Route path="/guide/:slug" element={<GuideDetailPage />} />
                  <Route path="/cam-nang/:slug" element={<GuideDetailPage />} />

                  {/* Top Rankings */}
                  <Route path="/top-san-pham/:slug" element={<RankingDetailPage />} />
                  <Route path="/xep-hang/:slug" element={<RankingDetailPage />} />
                  <Route path="/ranking/:slug" element={<RankingDetailPage />} />

                  {/* Comparisons */}
                  <Route path="/so-sanh" element={<ComparisonsListPage />} />
                  <Route path="/so-sanh/:slug" element={<ComparisonDetailPage />} />
                  <Route path="/comparison/:slug" element={<ComparisonDetailPage />} />

                  {/* Categories & Product Catalogs */}
                  <Route path="/san-pham-vat-ly" element={<PhysicalProductsPage />} />
                  <Route path="/san-pham-so" element={<DigitalProductsPage />} />
                  <Route path="/tim-kiem" element={<SearchPage />} />
                  <Route path="/danh-muc/:category" element={<CategoryDetailPage />} />
                  <Route path="/:group/:category" element={<CategoryDetailPage />} />
                </Route>

                {/* ADMIN CMS */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="categories" element={<AdminCategoriesPage />} />
                  <Route path="rankings" element={<AdminRankingsPage />} />
                  <Route path="articles" element={<AdminArticlesPage />} />
                  <Route path="comparisons" element={<AdminComparisonsPage />} />
                  <Route path="experts" element={<AdminExpertsPage />} />
                  <Route path="leads" element={<AdminLeadsPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>

                {/* 404 / Fallback Route */}
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
