import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderTree,
  Box,
  Award,
  FileText,
  Scale,
  Users,
  Settings,
  Sparkles,
  ExternalLink,
  LogOut,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  end?: boolean;
  count?: number | null;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const { user, logout } = useAuth();
  const { products, categories, rankings, articles, comparisons, experts } = useData();

  const navGroups: NavGroup[] = [
    {
      group: 'TỔNG QUAN',
      items: [
        { label: 'Bảng điều khiển', to: '/admin', icon: LayoutDashboard, end: true, count: null }
      ]
    },
    {
      group: 'QUẢN LÝ NỘI DUNG',
      items: [
        { label: 'Danh mục sản phẩm', to: '/admin/categories', icon: FolderTree, count: categories.length },
        { label: 'Quản lý sản phẩm', to: '/admin/products', icon: Box, count: products.length },
        { label: 'Bảng xếp hạng Top', to: '/admin/rankings', icon: Award, count: rankings.length },
        { label: 'Bài viết & Cẩm nang', to: '/admin/articles', icon: FileText, count: articles.length },
        { label: 'Bài so sánh đối đầu', to: '/admin/comparisons', icon: Scale, count: comparisons.length }
      ]
    },
    {
      group: 'HỆ THỐNG & ĐỘI NGŨ',
      items: [
        { label: 'Chuyên gia biên tập', to: '/admin/experts', icon: Users, count: experts.length },
        { label: 'Cài đặt hệ thống', to: '/admin/settings', icon: Settings, count: null }
      ]
    }
  ];

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

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
          fixed top-0 bottom-0 right-0 z-50 w-72 bg-[#0d1527] text-slate-300 flex flex-col border-l border-slate-800/80 shadow-2xl transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-screen lg:z-30 lg:shadow-none lg:border-r lg:border-l-0 flex-shrink-0
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
              <img src="/brand-logo.png" alt="TechReview Icon" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5">
                <span>Tech<span className="text-orange-500">Review</span></span>
                <span className="text-[10px] font-bold text-orange-400 bg-orange-500/15 px-1.5 py-0.5 rounded border border-orange-500/30">CMS</span>
              </div>
              <span className="block text-[9.5px] text-slate-400 font-medium">Bảng quản trị hệ thống</span>
            </div>
          </Link>

          {/* Close Button on Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Đóng sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 px-3.5 py-5 space-y-6 overflow-y-auto custom-scrollbar">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                {group.group}
              </span>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-900/40 ring-1 ring-white/10'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.count !== null && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 flex-shrink-0">
                          {item.count}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions & User Profile Card */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/30">
          {/* User Mini Profile */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-500/30 flex-shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">
                  {user?.name || 'Quản Trị Viên'}
                </span>
                <span className="text-[10px] text-emerald-400 block truncate font-medium">
                  ● Đang hoạt động
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors flex-shrink-0"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Return to Public Website */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/90 rounded-xl transition-all border border-slate-700/60 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            <span>Về website người dùng</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
