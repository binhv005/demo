import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Award, ShieldCheck, Sparkles, CheckCircle2, ChevronRight, ArrowLeft, Target, Microscope } from 'lucide-react';

export const EditorialStandardsPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-screen">
      <Container size="lg">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Tiêu chuẩn đánh giá</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Độc lập &amp; Khách quan</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Tiêu Chuẩn Đánh Giá &amp; Quy Trình Kiểm Nghiệm
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Tìm hiểu quy trình 4 bước kiểm nghiệm nghiêm ngặt từ phòng thí nghiệm của <strong>TOP 20 PRODUCT</strong> để tạo nên những bảng xếp hạng Top 10 chuẩn xác và đáng tin cậy nhất.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">1. Đo Kiểm Thiết Bị Thực Tế</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Sử dụng trang thiết bị đo đạc chuyên dụng: máy đo độ ồn, camera nhiệt hồng ngoại, thiết bị đo công suất tiêu thụ điện và benchmark chuẩn mực.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">2. Trải Nghiệm Đời Thực 14-60 Ngày</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mỗi sản phẩm đều được các chuyên gia và độc giả trải nghiệm trong điều kiện sinh hoạt gia đình hoặc làm việc thực tế hàng ngày để phát hiện các lỗi phát sinh theo thời gian.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">3. Chấm Điểm 4 Trọng Số Minh Bạch</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Điểm tổng hợp (Thang 10) tính theo: Thiết kế &amp; Hoàn thiện (25%), Hiệu năng (35%), Giá trị trên chi phí P/P (25%), Độ bền &amp; Tiện dụng (15%).
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">4. Không Nhận Tiền Mua Thứ Hạng</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tuyệt đối nói KHÔNG với việc nhận tài trợ từ các nhãn hàng để can thiệp vào thứ hạng hoặc sửa đổi điểm đánh giá sản phẩm.
            </p>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Trang Chủ</span>
          </Link>
        </div>
      </Container>
    </div>
  );
};
