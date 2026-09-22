import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, Scale, ExternalLink } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 text-sm">
      <Container size="xl">

        {/* Multi-column navigation links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-14">
          {/* Cột 1: Brand & Bio */}
          <div className="sm:col-span-2 md:col-span-5 space-y-4">
            <button onClick={() => scrollToSection('hero')} className="inline-block group text-left">
              <Logo variant="dark" size="lg" />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed pr-0 md:pr-6">
              Nền tảng đánh giá độc lập, bảng xếp hạng Top 10 và so sánh sản phẩm công nghệ, gia dụng và giải pháp số hàng đầu. Chúng tôi thử nghiệm thực tế để mang lại quyết định mua sắm tối ưu nhất cho bạn.
            </p>
            <div className="flex items-center gap-2.5 pt-1 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Đánh giá Độc lập &amp; Thử nghiệm Phòng Lab</span>
            </div>
          </div>

          {/* Cột 2: Khám phá các mục trên Landing page */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Khám phá nhanh</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('tinh-nang')} className="hover:text-white transition-colors cursor-pointer">
                  Tiêu chuẩn kiểm nghiệm
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('physical')} className="hover:text-white transition-colors cursor-pointer">
                  Đồ gia dụng &amp; Thiết bị vật lý
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('digital')} className="hover:text-white transition-colors cursor-pointer">
                  Phần mềm &amp; Công cụ AI
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ranking')} className="hover:text-white transition-colors cursor-pointer">
                  Top 10 Bảng xếp hạng
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('so-sanh')} className="hover:text-white transition-colors cursor-pointer">
                  So sánh sản phẩm đối đầu
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('guides')} className="hover:text-white transition-colors cursor-pointer">
                  Cẩm nang chọn mua
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 3: Chính sách & Điều khoản */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Chính sách &amp; Pháp lý</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/chinh-sach-bao-mat"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chính sách bảo mật</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dieu-khoan-su-dung"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5 text-slate-500" />
                  <span>Điều khoản sử dụng</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tieu-chuan-danh-gia"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Tiêu chuẩn đánh giá</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tuyen-bo-mien-tru"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Miễn trừ &amp; Tiếp thị liên kết</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
          <p>© 2026 TOP 20 PRODUCT. Nền tảng đánh giá và xếp hạng sản phẩm độc lập số 1.</p>
        </div>
      </Container>
    </footer>
  );
};
