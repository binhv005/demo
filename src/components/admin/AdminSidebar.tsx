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
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar: React.FC = () => {
  const { logout } = useAuth();

  const navItems = [
    { label: 'Bảng điều khiển (Dashboard)', to: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Danh mục sản phẩm', to: '/admin/categories', icon: FolderTree },
    { label: 'Quản lý sản phẩm', to: '/admin/products', icon: Box },
    { label: 'Bảng xếp hạng Top', to: '/admin/rankings', icon: Award },
    { label: 'Bài viết & Review', to: '/admin/articles', icon: FileText },
    { label: 'Bài so sánh đối đầu', to: '/admin/comparisons', icon: Scale },
    { label: 'Chuyên gia biên tập', to: '/admin/experts', icon: Users },
    { label: 'Cài đặt hệ thống', to: '/admin/settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800 flex-shrink-0 z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">Admin CMS</span>
            <span className="block text-[10px] text-indigo-400 uppercase font-semibold">TechReview Demo</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Quản trị nội dung
        </span>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang người dùng</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất Demo</span>
        </button>
      </div>
    </aside>
  );
};
