import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { leadApi, Lead } from '../../services/api';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { StatCard } from '../../components/admin/StatCard';
import { Badge } from '../../components/ui/Badge';
import {
  Box,
  FolderTree,
  Award,
  FileText,
  Eye,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { products, categories, rankings, articles, comparisons } = useData();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoadingLeads(true);
        const data = await leadApi.getAll();
        if (Array.isArray(data) && data.length > 0) {
          setLeads(data);
          localStorage.setItem('techreview_leads_cache', JSON.stringify(data));
        } else {
          const cached = localStorage.getItem('techreview_leads_cache');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) setLeads(parsed);
          }
        }
      } catch {
        const cached = localStorage.getItem('techreview_leads_cache');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) setLeads(parsed);
          } catch {}
        }
      } finally {
        setLoadingLeads(false);
      }
    };
    fetchLeads();
  }, []);

  const totalViews = products.reduce((acc, p) => acc + p.views, 0) + articles.reduce((acc, a) => acc + a.views, 0);
  const draftsCount = products.filter((p) => p.status === 'draft').length + articles.filter((a) => a.status === 'draft').length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Tổng Quan Quản Trị"
        description="Theo dõi toàn bộ sản phẩm, danh mục, bảng xếp hạng, bài viết và yêu cầu tư vấn thời gian thực."
      />

      <div className="px-6 space-y-6">
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
            subtitle={`${categories.filter((c) => c.group === 'physical').length} vật lý · ${categories.filter((c) => c.group === 'digital').length} số`}
            icon={<FolderTree className="w-4 h-4" />}
            color="blue"
          />
          <StatCard
            title="Bài Viết & Cẩm Nang"
            value={articles.length}
            growth="+5 mới"
            icon={<FileText className="w-4 h-4 text-amber-500" />}
            color="amber"
          />
          <StatCard
            title="Khách Hàng & Leads"
            value={leads.length}
            growth={`${newLeadsCount} chờ tư vấn`}
            icon={<Mail className="w-4 h-4 text-rose-500" />}
            color="rose"
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
                  to="/admin/leads"
                  className="px-3 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 border border-orange-500/30 text-xs font-bold transition-colors block text-center"
                >
                  Xem Yêu Cầu Tư Vấn ({leads.length})
                </Link>
                <Link
                  to="/admin/categories"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors block text-center"
                >
                  Quản lý Danh Mục
                </Link>
                <Link
                  to="/admin/articles"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors block text-center"
                >
                  Quản lý Bài Viết
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Consultation Leads Table Widget */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>Yêu Cầu Tư Vấn &amp; Liên Hệ Khách Hàng Mới Nhất</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các lượt đăng ký nhận báo cáo kiểm nghiệm Lab và yêu cầu tư vấn từ cẩm nang
              </p>
            </div>
            <Link
              to="/admin/leads"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200/60"
            >
              <span>Xem tất cả ({leads.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {leads.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Chưa có yêu cầu tư vấn nào được ghi nhận.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3 font-semibold">Email &amp; Khách hàng</th>
                    <th className="py-2.5 px-3 font-semibold">Số điện thoại</th>
                    <th className="py-2.5 px-3 font-semibold">Dịch vụ / Bài viết</th>
                    <th className="py-2.5 px-3 font-semibold">Trạng thái</th>
                    <th className="py-2.5 px-3 font-semibold">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-xs flex-shrink-0">
                            {lead.email?.[0]?.toUpperCase() || 'K'}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block truncate max-w-[200px]">{lead.email}</span>
                            {lead.name && <span className="text-[11px] text-slate-400 block">{lead.name}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        {lead.phone ? (
                          <div className="flex items-center gap-1.5 font-semibold text-emerald-600">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{lead.phone}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Chưa có</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium truncate max-w-[240px]">
                          {lead.service || lead.message || 'Tư vấn cẩm nang'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            lead.status === 'new' ? 'warning' : lead.status === 'contacted' ? 'indigo' : 'success'
                          }
                          size="sm"
                        >
                          {lead.status === 'new' ? 'Chưa liên hệ' : lead.status === 'contacted' ? 'Đang tư vấn' : 'Đã hoàn thành'}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('vi-VN') : 'Mới đây'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
