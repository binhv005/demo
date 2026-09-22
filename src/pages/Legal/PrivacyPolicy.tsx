import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Shield, Lock, Eye, CheckCircle2, ChevronRight, FileText, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-screen">
      <Container size="lg">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Chính sách bảo mật</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Bảo mật dữ liệu cá nhân</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Chính Sách Bảo Mật Thông Tin
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Tại <strong>TOP 20 PRODUCT</strong>, chúng tôi coi trọng sự riêng tư và bảo mật thông tin của độc giả. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu khi bạn truy cập website.
          </p>
          <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-400">
            <span>Cập nhật lần cuối: 2026</span>
            <span>•</span>
            <span>Hiệu lực: Toàn cầu</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">1</span>
              Thông Tin Chúng Tôi Thu Thập
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Chúng tôi chỉ thu thập các thông tin tối thiểu cần thiết để cung cấp trải nghiệm tốt nhất cho người dùng:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm pl-4 list-disc text-slate-600">
              <li><strong>Thông tin bạn cung cấp chủ động:</strong> Địa chỉ email và số điện thoại khi bạn tự nguyện đăng ký nhận bản tin Top 10 sản phẩm hoặc liên hệ tư vấn.</li>
              <li><strong>Dữ liệu phân tích ẩn danh:</strong> Lượt xem trang, sản phẩm được quan tâm, loại trình duyệt và thời gian đọc bài để tối ưu hóa hiệu năng website (thông qua Cookies ẩn danh, không chứa danh tính cá nhân).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">2</span>
              Mục Đích Sử Dụng Dữ Liệu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Gửi Bản Tin Độc Quyền
                </div>
                <p className="text-xs text-slate-500">
                  Gửi các bài đánh giá mới nhất, cẩm nang chọn mua và các khuyến mãi đáng tin cậy.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Cải Thiện Trải Nghiệm
                </div>
                <p className="text-xs text-slate-500">
                  Phát hiện lỗi kỹ thuật, đo tốc độ tải trang và hiển thị bài viết phù hợp với nhu cầu bạn tìm kiếm.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">3</span>
              Cam Kết Bảo Mật &amp; Không Bán Dữ Liệu
            </h2>
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs sm:text-sm text-amber-900 space-y-2">
              <p className="font-bold flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                Cam kết tuyệt đối không bán hoặc chia sẻ thông tin cá nhân
              </p>
              <p className="text-amber-800 leading-relaxed font-normal">
                Chúng tôi cam kết không bao giờ bán, cho thuê hoặc chia sẻ danh sách email/SĐT của bạn cho bất kỳ bên thứ ba hay mạng lưới quảng cáo nào vì mục đích thương mại phi pháp.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">4</span>
              Quyền Lợi Của Độc Giả
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Bạn có toàn quyền yêu cầu chúng tôi xóa hoặc cập nhật thông tin email/SĐT bất cứ lúc nào bằng cách nhấn nút "Hủy đăng ký" ở chân mỗi email bản tin hoặc gửi yêu cầu trực tiếp qua ban quản trị.
            </p>
          </section>

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
