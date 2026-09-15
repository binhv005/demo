import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { useData } from '../../context/DataContext';
import { useConfirm } from '../../context/ConfirmContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { RotateCcw, Save, ShieldCheck, Globe, Bell, Sliders } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { resetData } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const [siteName, setSiteName] = useState('TechReview & Choice Platform');
  const [siteTagline, setSiteTagline] = useState('Đánh giá, So sánh & Lựa chọn Sản phẩm');
  const [contactEmail, setContactEmail] = useState('editorial@techreview.vn');
  const [itemsPerPage, setItemsPerPage] = useState('12');
  const [enableComments, setEnableComments] = useState(true);
  const [autoApproveReviews, setAutoApproveReviews] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Đã lưu cấu hình hệ thống thành công!', { type: 'success' });
  };

  const handleResetData = async () => {
    const ok = await confirm({
      title: 'Khôi phục toàn bộ dữ liệu',
      message: 'Khôi phục toàn bộ cơ sở dữ liệu Demo về trạng thái ban đầu? Tất cả thay đổi sẽ bị hoàn tác.',
      confirmText: 'Xác nhận khôi phục',
      cancelText: 'Hủy bỏ',
      type: 'warning'
    });
    if (ok) {
      resetData();
      showToast('Đã khôi phục dữ liệu gốc thành công!', { type: 'info' });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Thiết Lập Hệ Thống (Settings)"
        description="Cấu hình thông số website, thương hiệu và quản lý bộ nhớ đệm Mock Data."
      />

      <div className="px-6 max-w-4xl space-y-8">
        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">Thông Tin Chung Website</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Tên nền tảng (Site Title)"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
            />
            <Input
              label="Slogan thương hiệu"
              value={siteTagline}
              onChange={(e) => setSiteTagline(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Email liên hệ ban biên tập"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              type="email"
              required
            />
            <Input
              label="Số sản phẩm mỗi trang"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              type="number"
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Tùy chọn nâng cao</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableComments}
                  onChange={(e) => setEnableComments(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Cho phép độc giả gửi bình luận và đánh giá trải nghiệm thực tế</span>
              </label>
              <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoApproveReviews}
                  onChange={(e) => setAutoApproveReviews(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Tự động duyệt bài đánh giá từ người dùng đã xác minh</span>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Lưu cấu hình
            </Button>
          </div>
        </form>

        {/* Mock Data Reset Section */}
        <div className="bg-white rounded-3xl border border-rose-200/80 p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
            <RotateCcw className="w-5 h-5" />
            <span>Khôi Phục Dữ Liệu Demo (Reset Mock Data)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nếu bạn đã thử nghiệm thêm, sửa, xóa nhiều sản phẩm/danh mục và muốn khôi phục lại toàn bộ dữ liệu mẫu chuẩn ban đầu, nhấn nút bên dưới.
          </p>
          <div>
            <Button variant="danger" size="sm" onClick={handleResetData}>
              Khôi phục toàn bộ Mock Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
