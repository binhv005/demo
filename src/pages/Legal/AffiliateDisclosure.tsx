import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Shield, ExternalLink, HelpCircle, ChevronRight, ArrowLeft } from 'lucide-react';

export const AffiliateDisclosurePage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-screen">
      <Container size="lg">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Tuyên bố miễn trừ &amp; Liên kết</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Minh bạch tài chính</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Tuyên Bố Miễn Trừ &amp; Tiếp Thị Liên Kết
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Sự minh bạch là tôn chỉ cao nhất tại <strong>TOP 20 PRODUCT</strong>. Dưới đây là cách chúng tôi duy trì hoạt động của phòng kiểm nghiệm và chi phí vận hành website.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">1</span>
              Tiếp Thị Liên Kết (Affiliate Links) Hoạt Động Như Thế Nào?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Một số liên kết trên website có thể là liên kết tiếp thị. Điều này có nghĩa là nếu bạn nhấn vào liên kết và mua sản phẩm trên sàn thương mại điện tử (Shopee, Lazada, Tiki, v.v.), chúng tôi có thể nhận được một khoản hoa hồng nhỏ mà <strong>không làm tăng thêm bất kỳ chi phí nào đối với bạn</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">2</span>
              Hoa Hồng Có Ảnh Hưởng Đến Thứ Hạng Xếp Hạng Không?
            </h2>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              <strong>Tuyệt đối không:</strong> Vị trí Top 1 đến Top 10 và điểm số sản phẩm hoàn toàn do kết quả thử nghiệm thực tế quyết định. Chúng tôi đưa ra đánh giá khen/chê khách quan bất kể sản phẩm đó có chương trình hoa hồng hay không.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">3</span>
              Miễn Trừ Trách Nhiệm Sản Phẩm
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Các giao dịch mua bán, bảo hành và vận chuyển được thực hiện trực tiếp giữa bạn và nhà bán lẻ bên thứ ba. TOP 20 PRODUCT không chịu trách nhiệm đối với các vấn đề phát sinh từ khâu vận chuyển hoặc dịch vụ hậu mãi của người bán.
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
