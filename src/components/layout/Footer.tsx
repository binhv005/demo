import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Mail, ArrowRight, Heart } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Vui lòng nhập địa chỉ email hợp lệ!', { type: 'error' });
      return;
    }
    showToast('Đăng ký thành công!', {
      type: 'success',
      description: 'Cảm ơn bạn đã đăng ký nhận bản tin công nghệ TechReview.'
    });
    setEmail('');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 text-sm">
      <Container size="xl">
        {/* Top Newsletter banner */}
        <div className="bg-gradient-to-r from-orange-950/60 via-slate-800 to-orange-950/60 p-8 rounded-3xl border border-slate-700/60 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Bản tin Công nghệ &amp; Đánh giá
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Nhận bảng xếp hạng và so sánh mới nhất mỗi tuần
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Không quảng cáo rác. Chỉ gửi bài phân tích chuyên sâu, mẹo mua sắm tiết kiệm và top deal chất lượng từ ban biên tập.
            </p>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-orange-500 placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Đăng ký</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Multi-column navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Cột 1: Brand & Bio */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
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

          {/* Cột 3: Về chúng tôi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Về chúng tôi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('chuyen-gia')} className="hover:text-white transition-colors cursor-pointer">
                  Quy trình kiểm nghiệm Lab
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('chuyen-gia')} className="hover:text-white transition-colors cursor-pointer">
                  Đội ngũ chuyên gia
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('danh-gia')} className="hover:text-white transition-colors cursor-pointer">
                  Đánh giá từ độc giả
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Câu hỏi thường gặp
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 4: Hỗ trợ & Liên hệ */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hệ thống</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/admin/products" className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">
                  Quản trị Admin CMS →
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">
                  Gửi yêu cầu đánh giá
                </button>
              </li>
              <li>
                <span className="text-slate-500">Phiên bản 2.0 (Single Page)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 TechReview. Nền tảng đánh giá và xếp hạng sản phẩm độc lập số 1.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Thiết kế &amp; Phát triển với</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>cho người tiêu dùng Việt Nam</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
