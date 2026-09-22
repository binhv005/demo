import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { FileText, ShieldAlert, Scale, ChevronRight, ArrowLeft } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-screen">
      <Container size="lg">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Điều khoản sử dụng</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200/60">
            <Scale className="w-3.5 h-3.5" />
            <span>Quy định &amp; Pháp lý</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Điều Khoản &amp; Điều Kiện Sử Dụng
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Chào mừng bạn đến với <strong>TOP 20 PRODUCT</strong>. Bằng việc truy cập và sử dụng dịch vụ thông tin trên trang web này, bạn đồng ý tuân thủ các điều khoản và quy định dưới đây.
          </p>
          <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-400">
            <span>Phiên bản: 2.0</span>
            <span>•</span>
            <span>Áp dụng từ: 2026</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">1</span>
              Quyền Sở Hữu Trí Tuệ &amp; Bản Quyền Nội Dung
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Toàn bộ nội dung bài viết, cấu trúc bảng xếp hạng, hình ảnh thử nghiệm phòng lab, tiêu chí đánh giá và nhãn thương hiệu thuộc quyền sở hữu của <strong>TOP 20 PRODUCT</strong>.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm pl-4 list-disc text-slate-600">
              <li>Bạn được quyền trích dẫn nội dung cho mục đích cá nhân, phi thương mại với điều kiện ghi rõ nguồn và gắn link trực tiếp về bài viết gốc.</li>
              <li>Nghiêm cấm hành vi sao chép hàng loạt, sử dụng bot tự động cào dữ liệu (scraping) hoặc sử dụng cho mục đích thương mại mà chưa có sự đồng ý bằng văn bản.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">2</span>
              Tính Độc Lập &amp; Mục Đích Tham Khảo
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Các bài đánh giá, điểm số và thứ tự xếp hạng được xây dựng dựa trên dữ liệu đo kiểm thực tế và ý kiến chuyên môn của đội ngũ thẩm định viên. Mọi thông tin trên website mang tính chất khuyến nghị và tham khảo nhằm hỗ trợ người tiêu dùng ra quyết định mua sắm tối ưu.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">3</span>
              Quy Định Về Liên Kết Ngoài &amp; Giá Bán Thị Trường
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">
                Lưu ý về biến động giá sản phẩm:
              </p>
              <p className="leading-relaxed">
                Mức giá hiển thị trên website là giá tham khảo tại thời điểm bài viết được cập nhật. Giá bán thực tế có thể thay đổi tùy thuộc vào chính sách của các sàn thương mại điện tử hoặc nhà bán lẻ tại thời điểm bạn đặt mua.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">4</span>
              Thay Đổi Điều Khoản
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Chúng tôi có quyền cập nhật hoặc điều chỉnh các điều khoản này theo thời gian để phù hợp với quy định pháp luật và sự phát triển của nền tảng. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
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
