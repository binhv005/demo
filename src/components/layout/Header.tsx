import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { SearchOverlay } from '../search/SearchOverlay';
import { Product, Ranking, Article } from '../../types';
import {
  Menu,
  X,
  Award,
  BookOpen,
  Shield,
  ArrowRight,
  Scale,
  Zap,
  HelpCircle,
  Flame,
  Sparkles,
  Search
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const closeMenus = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenus();
    window.dispatchEvent(new CustomEvent('trigger-page-transition'));
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

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

  // Listen for open-search events
  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-search', handleOpenSearch);
    return () => window.removeEventListener('open-search', handleOpenSearch);
  }, []);

  // Track scroll position for header styling and active section tracking
  useEffect(() => {
    const sectionIds = ['hero', 'tinh-nang', 'physical', 'digital', 'ranking', 'so-sanh', 'guides', 'chuyen-gia', 'faq'];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Tiêu chuẩn', id: 'tinh-nang', icon: Zap },
    { label: 'Sản phẩm vật lý', id: 'physical', icon: Flame },
    { label: 'Sản phẩm số', id: 'digital', icon: Sparkles },
    { label: 'Bảng xếp hạng', id: 'ranking', icon: Award },
    { label: 'So sánh', id: 'so-sanh', icon: Scale },
    { label: 'Cẩm nang', id: 'guides', icon: BookOpen },
    { label: 'Hỏi đáp', id: 'faq', icon: HelpCircle }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/70 shadow-xs'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* LOGO */}
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 flex-shrink-0 group text-left cursor-pointer whitespace-nowrap"
          >
            <Logo variant="light" size="md" />
          </button>

          {/* DESKTOP SINGLE-PAGE NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 font-medium text-xs xl:text-sm text-slate-700 whitespace-nowrap flex-shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-2.5 xl:px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all font-semibold cursor-pointer whitespace-nowrap flex-shrink-0 ${isActive
                      ? 'bg-orange-50 text-orange-600 shadow-xs'
                      : 'text-slate-700 hover:text-orange-600 hover:bg-slate-100/80'
                    }`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ACTIONS: ADMIN */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
            <Link
              to="/admin/products"
              className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm whitespace-nowrap flex-shrink-0"
              title="Quản trị Sản phẩm"
            >
              <Shield className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <span className="whitespace-nowrap">Admin Demo</span>
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p: Product) => {
          window.dispatchEvent(new CustomEvent('select-product', { detail: p }));
        }}
        onSelectRanking={(r: Ranking) => {
          window.dispatchEvent(new CustomEvent('select-ranking', { detail: r }));
        }}
        onSelectArticle={(a: Article) => {
          window.dispatchEvent(new CustomEvent('select-article', { detail: a }));
        }}
      />

      {/* MOBILE DRAWER */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {mobileMenuOpen && (
            <div
              onClick={closeMenus}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[9998] lg:hidden transition-opacity duration-300"
            />
          )}

          <div
            className={`fixed inset-y-0 right-0 z-[9999] w-[86%] max-w-sm lg:hidden bg-white shadow-2xl flex flex-col border-l border-slate-200 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
              }`}
          >
            {/* Drawer Top Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 flex-shrink-0">
              <button onClick={() => scrollToSection('hero')} className="flex items-center">
                <Logo variant="light" size="sm" />
              </button>
              <button
                onClick={closeMenus}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <nav className="space-y-1 text-xs font-medium text-slate-800">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 py-3 px-3.5 rounded-xl font-bold border-b border-slate-100 transition-colors text-left cursor-pointer whitespace-nowrap ${isActive
                          ? 'bg-orange-50 text-orange-600'
                          : 'hover:bg-slate-50 text-slate-800'
                        }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-orange-500' : 'text-slate-400'}`} />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Action */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex-shrink-0">
              <Link
                to="/admin/products"
                onClick={closeMenus}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-md hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Shield className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span className="whitespace-nowrap">Khu vực Quản trị Admin</span>
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

