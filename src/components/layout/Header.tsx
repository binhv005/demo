import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { MegaMenu } from './MegaMenu';
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                Tech<span className="text-indigo-600">Review</span>
              </span>
              <span className="block text-[10px] tracking-wider text-slate-400 font-semibold uppercase -mt-1">
                Đánh giá & So sánh
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            {/* Sản phẩm vật lý */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('physical')}
            >
              <button
                type="button"
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'physical' ? null : 'physical')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                  activeMegaMenu === 'physical' || location.pathname.startsWith('/san-pham-vat-ly')
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Sản phẩm vật lý</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'physical' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Sản phẩm số */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('digital')}
            >
              <button
                type="button"
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'digital' ? null : 'digital')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                  activeMegaMenu === 'digital' || location.pathname.startsWith('/san-pham-so')
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Sản phẩm số</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'digital' ? 'rotate-180' : ''}`} />
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
              <Award className="w-4 h-4 text-amber-500" />
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
              <BookOpen className="w-4 h-4 text-emerald-500" />
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

      {/* DESKTOP MEGA MENU DROPDOWN */}
      {activeMegaMenu && (
        <MegaMenu
          type={activeMegaMenu}
          onClose={() => setActiveMegaMenu(null)}
        />
      )}

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 bg-white overflow-y-auto pb-12 sm:hidden border-t border-slate-200">
          <div className="p-4 space-y-4">
            {/* Search Input Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Bạn đang tìm sản phẩm gì..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            <nav className="space-y-1 text-sm font-medium text-slate-800">
              {/* Accordion Sản phẩm vật lý */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  onClick={() => setMobileCategoryOpen(mobileCategoryOpen === 'physical' ? null : 'physical')}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    Sản phẩm vật lý
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoryOpen === 'physical' ? 'rotate-180' : ''}`} />
                </button>

                {mobileCategoryOpen === 'physical' && (
                  <div className="pl-6 py-2 space-y-2 bg-slate-50 rounded-xl my-1">
                    <Link
                      to="/san-pham-vat-ly"
                      onClick={closeMenus}
                      className="block text-xs font-bold text-indigo-600 py-1"
                    >
                      → Xem trang tổng quan vật lý
                    </Link>
                    {physicalCategories.map((c) => (
                      <Link
                        key={c.id}
                        to={`/${c.groupSlug}/${c.subcategories[0]?.slug || c.slug}`}
                        onClick={closeMenus}
                        className="block text-xs text-slate-600 py-1"
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
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Sản phẩm số & AI
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoryOpen === 'digital' ? 'rotate-180' : ''}`} />
                </button>

                {mobileCategoryOpen === 'digital' && (
                  <div className="pl-6 py-2 space-y-2 bg-slate-50 rounded-xl my-1">
                    <Link
                      to="/san-pham-so"
                      onClick={closeMenus}
                      className="block text-xs font-bold text-indigo-600 py-1"
                    >
                      → Xem trang tổng quan sản phẩm số
                    </Link>
                    {digitalCategories.map((c) => (
                      <Link
                        key={c.id}
                        to={`/${c.groupSlug}/${c.subcategories[0]?.slug || c.slug}`}
                        onClick={closeMenus}
                        className="block text-xs text-slate-600 py-1"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/top/noi-chien-khong-dau"
                onClick={closeMenus}
                className="flex items-center gap-2.5 py-3 px-3 rounded-xl hover:bg-slate-50 font-semibold border-b border-slate-100"
              >
                <Award className="w-4 h-4 text-amber-500" />
                Bảng xếp hạng Top 10
              </Link>

              <Link
                to="/huong-dan/cach-chon-noi-chien-khong-dau"
                onClick={closeMenus}
                className="flex items-center gap-2.5 py-3 px-3 rounded-xl hover:bg-slate-50 font-semibold border-b border-slate-100"
              >
                <BookOpen className="w-4 h-4 text-emerald-500" />
                Hướng dẫn chọn mua
              </Link>

              <Link
                to="/admin"
                onClick={closeMenus}
                className="flex items-center justify-between py-3 px-3 rounded-xl bg-slate-900 text-white font-semibold mt-4"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  Khu vực Quản trị Admin
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
