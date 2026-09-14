import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { MegaMenu } from './MegaMenu';
import { Logo } from '../ui/Logo';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { renderCategoryIcon } from '../../utils/icons';

export const Header: React.FC = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<'physical' | 'digital' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<'physical' | 'digital' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useData();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const closeMenus = () => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  };

  const physicalCategories = categories.filter((c) => c.group === 'physical' && c.status !== 'inactive');
  const digitalCategories = categories.filter((c) => c.group === 'digital' && c.status !== 'inactive');

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenus}
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <Logo variant="light" size="md" />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            {/* Sản phẩm vật lý */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'physical' ? null : 'physical')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                  activeMegaMenu === 'physical' || location.pathname.startsWith('/san-pham-vat-ly')
                    ? 'text-orange-700 bg-orange-50 font-bold ring-1 ring-orange-200/80 shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Sản phẩm vật lý</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'physical' ? 'rotate-180 text-orange-600' : ''}`} />
              </button>
            </div>

            {/* Sản phẩm số */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'digital' ? null : 'digital')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                  activeMegaMenu === 'digital' || location.pathname.startsWith('/san-pham-so')
                    ? 'text-indigo-700 bg-indigo-50 font-bold ring-1 ring-indigo-200/80 shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Sản phẩm số</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'digital' ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
            </div>

            {/* Bảng xếp hạng */}
            <Link
              to="/top/noi-chien-khong-dau"
              onClick={closeMenus}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                location.pathname.startsWith('/top')
                  ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Bảng xếp hạng</span>
            </Link>

            {/* Hướng dẫn */}
            <Link
              to="/huong-dan/cach-chon-noi-chien-khong-dau"
              onClick={closeMenus}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                location.pathname.startsWith('/huong-dan')
                  ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Hướng dẫn</span>
            </Link>
          </nav>

          {/* SEARCH & ADMIN LINK */}
          <div className="hidden sm:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Tìm sản phẩm, review, so sánh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 lg:w-64 pl-9 pr-4 py-2 bg-slate-100 text-xs rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <Link
              to="/admin"
              className="px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Khu vực Quản trị Admin Demo"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin Demo</span>
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/tim-kiem"
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP MEGA MENU DROPDOWN WITH BACKDROP */}
      {activeMegaMenu && (
        <>
          <div
            className="fixed inset-0 top-20 bg-slate-950/40 backdrop-blur-[2px] z-30 transition-opacity animate-fadeIn"
            onClick={closeMenus}
          />
          <MegaMenu
            type={activeMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
          />
        </>
      )}

      {/* MOBILE BACKDROP OVERLAY & RIGHT-SIDE DRAWER VIA PORTAL */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* Mobile Backdrop */}
          {mobileMenuOpen && (
            <div
              onClick={closeMenus}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[9998] sm:hidden transition-opacity duration-300"
            />
          )}

          {/* Mobile Slide-in Drawer from Right */}
          <div
            className={`fixed inset-y-0 right-0 z-[9999] w-[86%] max-w-sm sm:hidden bg-white shadow-2xl flex flex-col border-l border-slate-200 transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
            }`}
          >
            {/* Drawer Top Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 flex-shrink-0">
              <Link to="/" onClick={closeMenus} className="flex items-center">
                <Logo variant="light" size="sm" />
              </Link>
              <button
                onClick={closeMenus}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Search Box inside Drawer */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Bạn đang tìm sản phẩm gì..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100/90 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </form>

              {/* Navigation Links */}
              <nav className="space-y-1 text-xs font-medium text-slate-800">
                {/* Accordion Sản phẩm vật lý */}
                <div className="border-b border-slate-100 pb-2">
                  <button
                    onClick={() => setMobileCategoryOpen(mobileCategoryOpen === 'physical' ? null : 'physical')}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-orange-50/60 text-slate-800 font-bold transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span>Sản phẩm vật lý</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileCategoryOpen === 'physical' ? 'rotate-180 text-orange-600' : ''}`} />
                  </button>

                  {mobileCategoryOpen === 'physical' && (
                    <div className="pl-4 py-2 space-y-1.5 bg-orange-50/30 rounded-xl my-1 border border-orange-100/60">
                      <Link
                        to="/san-pham-vat-ly"
                        onClick={closeMenus}
                        className="block text-xs font-bold text-orange-600 py-1 px-2 rounded-lg hover:bg-orange-100/50"
                      >
                        → Xem tất cả sản phẩm vật lý
                      </Link>
                      {physicalCategories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/${c.groupSlug}/${c.subcategories[0]?.slug || c.slug}`}
                          onClick={closeMenus}
                          className="block text-xs text-slate-700 py-1.5 px-2 rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion Sản phẩm số */}
                <div className="border-b border-slate-100 pb-2">
                  <button
                    onClick={() => setMobileCategoryOpen(mobileCategoryOpen === 'digital' ? null : 'digital')}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-indigo-50/60 text-slate-800 font-bold transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>Sản phẩm số &amp; AI</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileCategoryOpen === 'digital' ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  {mobileCategoryOpen === 'digital' && (
                    <div className="pl-4 py-2 space-y-1.5 bg-indigo-50/30 rounded-xl my-1 border border-indigo-100/60">
                      <Link
                        to="/san-pham-so"
                        onClick={closeMenus}
                        className="block text-xs font-bold text-indigo-600 py-1 px-2 rounded-lg hover:bg-indigo-100/50"
                      >
                        → Xem tất cả sản phẩm số
                      </Link>
                      {digitalCategories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/${c.groupSlug}/${c.subcategories[0]?.slug || c.slug}`}
                          onClick={closeMenus}
                          className="block text-xs text-slate-700 py-1.5 px-2 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bảng xếp hạng Top */}
                <Link
                  to="/top/noi-chien-khong-dau"
                  onClick={closeMenus}
                  className="flex items-center gap-2.5 py-3 px-3 rounded-xl hover:bg-amber-50 font-bold text-slate-800 border-b border-slate-100 transition-colors"
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Bảng xếp hạng Top 10</span>
                </Link>

                {/* Hướng dẫn chọn mua */}
                <Link
                  to="/huong-dan/cach-chon-noi-chien-khong-dau"
                  onClick={closeMenus}
                  className="flex items-center gap-2.5 py-3 px-3 rounded-xl hover:bg-emerald-50 font-bold text-slate-800 border-b border-slate-100 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span>Hướng dẫn chọn mua</span>
                </Link>
              </nav>
            </div>

            {/* Drawer Footer Action */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex-shrink-0">
              <Link
                to="/admin"
                onClick={closeMenus}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-md hover:bg-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span>Khu vực Quản trị Admin</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
};
