import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Mail, ArrowRight, Heart } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 text-sm">
      <Container size="xl">
        {/* Top Newsletter / Editorial mission banner */}
        <div className="bg-gradient-to-r from-indigo-950/80 via-slate-800/80 to-indigo-950/80 p-8 rounded-3xl border border-slate-700/60 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Bản tin Công nghệ & Đánh giá
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Nhận bảng xếp hạng và so sánh mới nhất mỗi tuần
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Không quảng cáo rác. Chỉ gửi bài phân tích chuyên sâu, mẹo mua sắm tiết kiệm và top deal chất lượng từ ban biên tập.
            </p>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 flex-shrink-0"
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
            <Link to="/" className="inline-block group">
              <Logo variant="dark" size="md" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              Nền tảng đánh giá độc lập, bảng xếp hạng Top 10 và so sánh sản phẩm công nghệ, gia dụng và giải pháp số hàng đầu. Chúng tôi thử nghiệm thực tế để mang lại quyết định mua sắm tối ưu nhất cho bạn.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Đánh giá Độc lập & Khách quan</span>
            </div>
          </div>

          {/* Cột 2: Khám phá */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Khám phá</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/san-pham-vat-ly" className="hover:text-white transition-colors">
                  Sản phẩm vật lý
                </Link>
              </li>
              <li>
                <Link to="/san-pham-so" className="hover:text-white transition-colors">
                  Sản phẩm số & AI
                </Link>
              </li>
              <li>
                <Link to="/top/noi-chien-khong-dau" className="hover:text-white transition-colors">
                  Top 10 Bảng xếp hạng
                </Link>
              </li>
              <li>
                <Link to="/so-sanh/aircook-vs-homechef" className="hover:text-white transition-colors">
                  So sánh đối đầu
                </Link>
              </li>
              <li>
                <Link to="/huong-dan/cach-chon-noi-chien-khong-dau" className="hover:text-white transition-colors">
                  Hướng dẫn chọn mua
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Về chúng tôi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Về chúng tôi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#trust" className="hover:text-white transition-colors">
                  Quy trình kiểm nghiệm
                </a>
              </li>
              <li>
                <Link to="/huong-dan/cach-chon-noi-chien-khong-dau" className="hover:text-white transition-colors">
                  Đội ngũ chuyên gia
                </Link>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors">
                  Tiêu chuẩn chấm điểm
                </a>
              </li>
              <li>
                <Link to="/admin/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Cổng Quản Trị Viên (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Pháp lý & Minh bạch */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pháp lý & Minh bạch</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Chính sách bảo mật
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Điều khoản dịch vụ
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Tuyên bố miễn trừ
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Nguyên tắc biên tập
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 TechReview Editorial Platform. All rights reserved. Xây dựng cho trải nghiệm người dùng tối ưu.</p>
          <p className="flex items-center gap-1">
            Thiết kế với <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> bởi Senior Frontend Team
          </p>
        </div>
      </Container>
    </footer>
  );
};
