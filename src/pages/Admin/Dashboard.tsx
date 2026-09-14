import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { StatCard } from '../../components/admin/StatCard';
import { Badge } from '../../components/ui/Badge';
import { ScoreBadge } from '../../components/ui/ScoreBadge';
import { Button } from '../../components/ui/Button';
import {
  Box,
  FolderTree,
  Award,
  FileText,
  Eye,
  Plus,
  ArrowUpRight,
  Sparkles,
  RotateCcw,
  TrendingUp,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { products, categories, rankings, articles, comparisons, resetData } = useData();
  const { showToast } = useToast();

  const totalViews = products.reduce((acc, p) => acc + p.views, 0) + articles.reduce((acc, a) => acc + a.views, 0);
  const draftsCount = products.filter((p) => p.status === 'draft').length + articles.filter((a) => a.status === 'draft').length;

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ mock data về mặc định?')) {
      resetData();
      showToast('Đã khôi phục dữ liệu gốc thành công!', { type: 'info' });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Tổng Quan Quản Trị (Dashboard)"
        description="Theo dõi toàn bộ sản phẩm, danh mục, bảng xếp hạng và bài viết thời gian thực."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Đặt lại dữ liệu gốc"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <Link to="/admin/products">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Thêm sản phẩm
              </Button>
            </Link>
          </div>
        }
      />

      <div className="px-6 space-y-6">
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Tổng Sản Phẩm"
            value={products.length}
            growth="+12% tháng này"
            icon={<Box className="w-4 h-4" />}
            color="indigo"
          />
          <StatCard
            title="Danh Mục Hoạt Động"
            value={categories.filter((c) => c.status !== 'inactive').length}
            subtitle={`${categories.reduce((acc, c) => acc + c.subcategories.length, 0)} danh mục con`}
            icon={<FolderTree className="w-4 h-4" />}
            color="blue"
          />
          <StatCard
            title="Bảng Xếp Hạng Top"
            value={rankings.length}
            growth="+4 mới"
            icon={<Award className="w-4 h-4" />}
            color="amber"
          />
          <StatCard
            title="Lượt Xem Nội Dung"
            value={totalViews.toLocaleString('vi-VN')}
            growth="+28%"
            icon={<Eye className="w-4 h-4" />}
            color="emerald"
          />
        </div>

        {/* 2-Column Grid: Recent Content & Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Recent Products & Articles (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Sản Phẩm & Bài Viết Mới Thêm</h3>
              <Link to="/admin/products" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                Xem tất cả ({products.length})
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {products.slice(0, 5).map((p) => (
                <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{p.name}</h4>
                      <span className="text-[11px] text-slate-400 block">{p.category} • {p.brand}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <ScoreBadge score={p.score} size="sm" />
                    <Badge variant={p.status === 'published' ? 'success' : 'warning'} size="sm">
                      {p.status === 'published' ? 'Xuất bản' : 'Bản nháp'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Publication Status Breakdown (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Trạng Thái Nội Dung</h3>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đã xuất bản (Live)</span>
                  </div>
                  <span className="font-bold text-emerald-900 text-sm">
                    {products.filter((p) => p.status === 'published').length}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Bản nháp chờ duyệt</span>
                  </div>
                  <span className="font-bold text-amber-900 text-sm">{draftsCount}</span>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-800">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Bài so sánh & review</span>
                  </div>
                  <span className="font-bold text-indigo-900 text-sm">{comparisons.length + articles.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Thao tác nhanh
              </span>
              <h4 className="font-bold text-base">Quản lý hệ thống</h4>
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/admin/categories"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors block text-center"
                >
                  Quản lý Danh Mục
                </Link>
                <Link
                  to="/admin/rankings"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors block text-center"
                >
                  Sắp xếp Bảng Xếp Hạng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
