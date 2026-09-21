import React, { useState, useEffect } from 'react';
import { leadApi, Lead } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Mail, Phone, Globe, Trash2, Eye, Calendar, CheckCircle2, Clock, RotateCcw, ChevronDown } from 'lucide-react';

export const AdminLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await leadApi.getAll();
      if (Array.isArray(data) && data.length > 0) {
        setLeads(data);
        localStorage.setItem('techreview_leads_cache', JSON.stringify(data));
      } else {
        // Check local cache if server returned empty or is loading
        const cached = localStorage.getItem('techreview_leads_cache');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setLeads(parsed);
              return;
            }
          } catch {}
        }
        if (Array.isArray(data)) {
          setLeads(data);
        }
      }
    } catch (error: any) {
      // Fallback to local cache
      const cached = localStorage.getItem('techreview_leads_cache');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLeads(parsed);
            return;
          }
        } catch {}
      }
      showToast('Không thể tải danh sách leads từ máy chủ', { type: 'error', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    try {
      setLeads((prev) => {
        const updated = prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
        localStorage.setItem('techreview_leads_cache', JSON.stringify(updated));
        return updated;
      });
      await leadApi.update(id, { status: newStatus });
      showToast('Đã cập nhật trạng thái lead thành công!', { type: 'success' });
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (error: any) {
      showToast('Đã lưu trạng thái cục bộ!', { type: 'info' });
    }
  };

  const handleDelete = async (lead: Lead) => {
    const ok = await confirm({
      title: 'Xóa thông tin liên hệ',
      message: `Bạn có chắc chắn muốn xóa lead của "${lead.email}"? Thao tác này không thể hoàn tác.`,
      confirmText: 'Xóa ngay',
      cancelText: 'Hủy',
      type: 'danger'
    });

    if (ok) {
      try {
        setLeads((prev) => {
          const updated = prev.filter((l) => l.id !== lead.id);
          localStorage.setItem('techreview_leads_cache', JSON.stringify(updated));
          return updated;
        });
        await leadApi.delete(lead.id);
        showToast('Đã xóa lead thành công!', { type: 'info' });
        if (selectedLead?.id === lead.id) {
          setDetailModalOpen(false);
        }
      } catch (error: any) {
        showToast('Đã xóa khỏi danh sách!', { type: 'info' });
      }
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        l.email.toLowerCase().includes(q) ||
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.phone && l.phone.includes(q)) ||
        (l.service && l.service.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const columns = [
    {
      header: 'Khách hàng / Email',
      className: 'whitespace-nowrap min-w-[220px]',
      accessor: (l: Lead) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Mail className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
            <span className="font-semibold text-slate-900">{l.email}</span>
          </div>
          {l.name && <div className="text-xs text-slate-500 font-medium pl-5">{l.name}</div>}
        </div>
      )
    },
    {
      header: 'Số điện thoại',
      className: 'whitespace-nowrap min-w-[140px]',
      accessor: (l: Lead) => (
        <div className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
          {l.phone ? (
            <>
              <Phone className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>{l.phone}</span>
            </>
          ) : (
            <span className="text-slate-400 italic">Chưa cung cấp</span>
          )}
        </div>
      )
    },
    {
      header: 'Dịch vụ / Yêu cầu',
      className: 'whitespace-nowrap min-w-[220px]',
      accessor: (l: Lead) => (
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 whitespace-nowrap">
          {l.service || 'Nhận bản tin & Cẩm nang'}
        </span>
      )
    },
    {
      header: 'Trạng thái',
      className: 'whitespace-nowrap min-w-[190px]',
      accessor: (l: Lead) => (
        <div className="relative inline-block">
          <select
            value={l.status}
            onChange={(e) => handleStatusChange(l.id, e.target.value as any)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 transition-all ${
              l.status === 'new'
                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/70 focus:ring-amber-400'
                : l.status === 'contacted'
                ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100/70 focus:ring-sky-400'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/70 focus:ring-emerald-400'
            }`}
          >
            <option value="new">Chưa liên hệ</option>
            <option value="contacted">Đang tư vấn</option>
            <option value="resolved">Đã hoàn thành</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 text-slate-600" />
        </div>
      )
    },
    {
      header: 'Thời gian',
      className: 'whitespace-nowrap min-w-[120px]',
      accessor: (l: Lead) => (
        <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          {l.createdAt ? new Date(l.createdAt).toLocaleDateString('vi-VN') : 'Hôm nay'}
        </span>
      )
    },
    {
      header: 'Thao tác',
      className: 'whitespace-nowrap text-right min-w-[100px]',
      align: 'right' as const,
      accessor: (l: Lead) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setSelectedLead(l);
              setDetailModalOpen(true);
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Xem chi tiết"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(l)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Xóa lead"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Quản Lý Leads & Bản Tin"
        description="Theo dõi danh sách khách hàng gửi yêu cầu tư vấn và đăng ký nhận bản tin."
        actions={
          <Button variant="outline" size="sm" onClick={fetchLeads} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Làm mới
          </Button>
        }
      />

      <div className="px-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Tìm theo email, tên, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-44">
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { label: 'Tất cả trạng thái', value: 'all' },
                  { label: 'Chưa liên hệ', value: 'new' },
                  { label: 'Đang tư vấn', value: 'contacted' },
                  { label: 'Đã xử lý', value: 'resolved' }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredLeads}
          keyExtractor={(item) => item.id}
          emptyMessage="Chưa có khách hàng đăng ký nào."
        />
      </div>

      {/* Detail Modal */}
      {selectedLead && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title="Chi Tiết Yêu Cầu Liên Hệ / Đăng Ký"
        >
          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-semibold">Email:</span>
                <span className="font-bold text-slate-900">{selectedLead.email}</span>
              </div>
              {selectedLead.name && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-semibold">Họ tên:</span>
                  <span className="font-semibold text-slate-800">{selectedLead.name}</span>
                </div>
              )}
              {selectedLead.phone && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-semibold">Số điện thoại:</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-semibold text-emerald-600 hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
              )}
              {selectedLead.website && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-semibold">Website:</span>
                  <a href={selectedLead.website} target="_blank" rel="noreferrer" className="text-orange-600 hover:underline">
                    {selectedLead.website}
                  </a>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-semibold">Dịch vụ:</span>
                <span className="font-semibold text-slate-800">{selectedLead.service}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-semibold">Nguồn đăng ký:</span>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                  {selectedLead.source || 'homepage'}
                </span>
              </div>
            </div>

            {selectedLead.message && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Nội Dung Ghi Chú / Tin Nhắn:
                </span>
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700">Cập nhật trạng thái:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedLead.id, 'new')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedLead.status === 'new'
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Chưa liên hệ
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedLead.id, 'contacted')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedLead.status === 'contacted'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Đang tư vấn
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedLead.id, 'resolved')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedLead.status === 'resolved'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Đã hoàn thành
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => setDetailModalOpen(false)}>
                Đóng
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
