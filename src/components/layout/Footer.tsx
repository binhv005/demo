import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {/* Cột 1: Brand & Bio */}
          <div className="sm:col-span-2 space-y-4">
            <button onClick={() => scrollToSection('hero')} className="inline-block group text-left">
              <Logo variant="dark" size="md" />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              Nền tảng đánh giá độc lập, bảng xếp hạng Top 10 và so sánh sản phẩm công nghệ, gia dụng và giải pháp số hàng đầu. Chúng tôi thử nghiệm thực tế để mang lại quyết định mua sắm tối ưu nhất cho bạn.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Đánh giá Độc lập &amp; Khách quan</span>
            </div>
          </div>

          {/* Cột 2: Khám phá các mục trên Landing page */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Khám phá nhanh</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('tinh-nang')} className="hover:text-white transition-colors cursor-pointer">
                  Tiêu chuẩn đánh giá
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('physical')} className="hover:text-white transition-colors cursor-pointer">
                  Sản phẩm vật lý
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('digital')} className="hover:text-white transition-colors cursor-pointer">
                  Sản phẩm số &amp; AI
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ranking')} className="hover:text-white transition-colors cursor-pointer">
                  Top 10 Bảng xếp hạng
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('so-sanh')} className="hover:text-white transition-colors cursor-pointer">
                  So sánh đối đầu
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('guides')} className="hover:text-white transition-colors cursor-pointer">
                  Cẩm nang chọn mua
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TOP 20 PRODUCT. Nền tảng đánh giá và xếp hạng sản phẩm độc lập số 1.</p>

        </div>
      </Container>
    </footer>
  );
};
