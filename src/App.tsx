import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
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

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Website Wrapper Layout (Header + Page + Footer)
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
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
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* PUBLIC USER ROUTES */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/san-pham-vat-ly" element={<PhysicalProductsPage />} />
                <Route path="/san-pham-so" element={<DigitalProductsPage />} />
                <Route path="/:group/:category" element={<CategoryDetailPage />} />
                <Route path="/top/:slug" element={<RankingDetailPage />} />
                <Route path="/review/:slug" element={<ReviewDetailPage />} />
                <Route path="/so-sanh/:slug" element={<ComparisonDetailPage />} />
                <Route path="/huong-dan/:slug" element={<GuideDetailPage />} />
                <Route path="/tim-kiem" element={<SearchPage />} />
              </Route>

              {/* ADMIN LOGIN */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* ADMIN SECURE DASHBOARD & CMS (Nested Routes) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="rankings" element={<AdminRankingsPage />} />
                <Route path="articles" element={<AdminArticlesPage />} />
                <Route path="comparisons" element={<AdminComparisonsPage />} />
                <Route path="experts" element={<AdminExpertsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* 404 / Fallback Route */}
              <Route element={<PublicLayout />}>
                <Route
                  path="*"
                  element={
                    <div className="py-24 text-center space-y-4">
                      <h2 className="text-4xl font-extrabold text-slate-900">404 - Không tìm thấy trang</h2>
                      <p className="text-slate-500 text-sm">Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển.</p>
                      <a href="/" className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm">
                        Trở về Trang chủ
                      </a>
                    </div>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
