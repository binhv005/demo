import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  FolderTree,
  Award,
  FileText,
  Scale,
  Mail,
  ExternalLink,
  X,
  Shield
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const { products, categories, rankings, articles, comparisons } = useData();

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { to: '/admin/products', icon: Box, label: 'Quản lý sản phẩm', badge: products.length },
    { to: '/admin/categories', icon: FolderTree, label: 'Quản lý danh mục', badge: categories.length },
    { to: '/admin/articles', icon: FileText, label: 'Bài viết & Cẩm nang', badge: articles.length },
    { to: '/admin/comparisons', icon: Scale, label: 'So sánh đối đầu', badge: comparisons.length },
    { to: '/admin/leads', icon: Mail, label: 'Khách hàng & Leads', badge: null }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 h-screen max-h-screen bg-[#0d1527] text-slate-300 flex flex-col justify-between border-r border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out flex-shrink-0
          lg:static lg:translate-x-0 lg:h-screen lg:max-h-screen lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60 flex-shrink-0">
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
              <img src="/brand-logo.webp" alt="TechReview Icon" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5">
                <span>Tech<span className="text-orange-500">Review</span></span>
                <span className="text-[9px] font-bold text-orange-400 bg-orange-500/15 px-1.5 py-0.5 rounded border border-orange-500/30">CMS</span>
              </div>
              <span className="block text-[9.5px] text-slate-400 font-medium">Bảng Điều Khiển Quản Trị</span>
            </div>
          </Link>

          {/* Close Button on Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Đóng sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 px-3 py-4 space-y-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
              QUẢN LÝ DỮ LIỆU
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-950/50 ring-1 ring-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-900/80 text-orange-300 border border-orange-400/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-3.5 border-t border-slate-800/90 space-y-2 bg-[#090f1d] flex-shrink-0">
          {/* Return to Public Website */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-orange-600 border border-slate-700/80 hover:border-orange-500 rounded-xl transition-all duration-200 shadow-xs group"
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-400 group-hover:text-white transition-colors" />
            <span>Về website người dùng</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
