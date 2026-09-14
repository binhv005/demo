import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ScoreBadge } from '../../components/ui/ScoreBadge';
import { ProductCard } from '../../components/product/ProductCard';
import { RankingCard } from '../../components/ranking/RankingCard';
import { ArticleCard } from '../../components/article/ArticleCard';
import { Accordion } from '../../components/ui/Accordion';
import { renderCategoryIcon } from '../../utils/icons';
import {
  Search,
  ArrowRight,
  Flame,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
  Star,
  Users,
  BookOpen,
  TrendingUp,
  Tag,
  Truck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  const { categories, products, rankings, articles } = useData();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  const handleSuggestionClick = (query: string) => {
    navigate(`/tim-kiem?q=${encodeURIComponent(query)}`);
  };

  const searchSuggestions = [
    'Nồi chiên không dầu tốt nhất',
    'Laptop cho sinh viên',
    'Công cụ AI tốt nhất',
    'Phần mềm quản lý công việc'
  ];

  const editorsPicks = products.filter((p) => p.status === 'published').slice(0, 4);
  const featuredRankings = rankings.filter((r) => r.status === 'published').slice(0, 3);
  const featuredArticle = articles.find((a) => a.type === 'guide') || articles[0];
  const otherArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 2);

  const faqItems = [
    {
      id: 'faq-1',
      title: 'Các bài đánh giá và bảng xếp hạng trên TechReview có thực sự độc lập không?',
      content: 'Hoàn toàn độc lập. Đội ngũ chuyên gia của chúng tôi tự mua hoặc mượn sản phẩm kiểm nghiệm theo bộ tiêu chuẩn đo lường nghiêm ngặt. Chúng tôi không nhận tiền quảng cáo để thay đổi thứ tự xếp hạng hoặc nâng điểm số của bất kỳ thương hiệu nào.'
    },
    {
      id: 'faq-2',
      title: 'Điểm số của sản phẩm được tính toán dựa trên những yếu tố nào?',
      content: 'Điểm tổng hợp (thang điểm 10) được tính dựa trên 4 trụ cột cốt lõi: Thiết kế & Độ hoàn thiện (25%), Hiệu năng & Trải nghiệm thực tế (35%), Tỷ lệ Giá trị/Chi phí P/P (25%) và Tính dễ sử dụng/Độ bền bỉ (15%).'
    },
    {
      id: 'faq-3',
      title: 'Bao lâu thì bảng xếp hạng Top 10 được cập nhật một lần?',
      content: 'Chúng tôi rà soát và cập nhật liên tục hàng tháng khi có các sản phẩm mới ra mắt hoặc khi giá thành thị trường có biến động đáng kể làm thay đổi mức độ đáng mua của sản phẩm.'
    },
    {
      id: 'faq-4',
      title: 'Làm thế nào để yêu cầu TechReview đánh giá một sản phẩm cụ thể?',
      content: 'Bạn có thể gửi đề xuất qua trang Tìm kiếm hoặc liên hệ với Ban biên tập. Các sản phẩm nhận được nhiều bình chọn từ độc giả sẽ được ưu tiên đưa vào lộ trình kiểm nghiệm phòng lab tiếp theo.'
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* SECTION 1 — HERO FULL WIDTH (SCALED +5% TO FILL VIEWPORT) */}
      <section className="relative w-full bg-[#0b2419] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#143e2d] via-[#0b2419] to-[#06140e] text-white overflow-hidden border-b border-emerald-950/80 py-9 sm:py-12 lg:py-14">
        
        {/* Shopping & Tech Doodle Pattern Overlay (Reference Pattern) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.09] select-none">
          <svg className="w-full h-full text-white" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-shopping-pattern"
                x="0"
                y="0"
                width="380"
                height="280"
                patternUnits="userSpaceOnUse"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* 1. DISC Badge (Top Left) */}
                  <g transform="translate(30, 20)">
                    <path d="M12 0 L15 5 L21 4 L21 10 L26 13 L23 18 L26 23 L21 26 L21 32 L15 31 L12 36 L9 31 L3 32 L3 26 L-2 23 L1 18 L-2 13 L3 10 L3 4 L9 5 Z" />
                    <text x="12" y="21" fill="currentColor" stroke="none" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">DISC</text>
                  </g>

                  {/* 2. Gift Box with Bow */}
                  <g transform="translate(95, 25)">
                    <rect x="0" y="8" width="26" height="22" rx="2" />
                    <line x1="13" y1="8" x2="13" y2="30" />
                    <line x1="0" y1="18" x2="26" y2="18" />
                    <path d="M13 8 C10 4 4 4 5 7 C6 10 13 8 13 8 C13 8 20 10 21 7 C22 4 16 4 13 8 Z" />
                  </g>

                  {/* 3. Location Pin */}
                  <g transform="translate(145, 28)">
                    <path d="M10 0 C4.5 0 0 4.5 0 10 C0 16 10 24 10 24 C10 24 20 16 20 10 C20 4.5 15.5 0 10 0 Z" />
                    <circle cx="10" cy="10" r="3.5" />
                  </g>

                  {/* 4. Overlapping Credit Cards */}
                  <g transform="translate(195, 18)">
                    <rect x="6" y="8" width="36" height="22" rx="3" strokeDasharray="1 0" />
                    <rect x="0" y="0" width="36" height="22" rx="3" fill="#0b2419" fillOpacity="0.4" />
                    <line x1="4" y1="5" x2="14" y2="5" />
                    <circle cx="30" cy="15" r="2.5" />
                  </g>

                  {/* 5. SALE Tag (Top Right) */}
                  <g transform="translate(265, 15) rotate(35)">
                    <path d="M0 0 H22 L34 12 L18 28 L0 28 Z" />
                    <circle cx="6" cy="14" r="2.5" />
                    <text x="17" y="17" fill="currentColor" stroke="none" fontSize="7.5" fontWeight="bold" textAnchor="middle">SALE</text>
                  </g>

                  {/* 6. Megaphone */}
                  <g transform="translate(325, 35) rotate(-15)">
                    <path d="M0 8 L16 2 V20 L0 14 Z" />
                    <line x1="6" y1="16" x2="4" y2="24" />
                    <path d="M19 6 C22 8 22 14 19 16" />
                  </g>

                  {/* 7. Monitor / Laptop */}
                  <g transform="translate(30, 85)">
                    <rect x="0" y="0" width="36" height="24" rx="2" />
                    <line x1="18" y1="24" x2="18" y2="29" />
                    <line x1="10" y1="29" x2="26" y2="29" />
                    <line x1="6" y1="6" x2="10" y2="6" strokeWidth="1" />
                  </g>

                  {/* 8. Smartphone */}
                  <g transform="translate(90, 85)">
                    <rect x="0" y="0" width="16" height="28" rx="3" />
                    <line x1="6" y1="3" x2="10" y2="3" />
                    <circle cx="8" cy="24" r="1.5" />
                  </g>

                  {/* 9. HOT SALE Badge */}
                  <g transform="translate(130, 80)">
                    <circle cx="16" cy="16" r="14" strokeDasharray="3 2" />
                    <text x="16" y="14" fill="currentColor" stroke="none" fontSize="5.5" fontWeight="bold" textAnchor="middle">HOT</text>
                    <text x="16" y="21" fill="currentColor" stroke="none" fontSize="5.5" fontWeight="bold" textAnchor="middle">SALE</text>
                  </g>

                  {/* 10. Delivery Scooter */}
                  <g transform="translate(185, 75)">
                    <rect x="0" y="2" width="12" height="12" rx="1" />
                    <path d="M12 12 H22 L26 4 H30" />
                    <circle cx="10" cy="18" r="4" />
                    <circle cx="28" cy="18" r="4" />
                  </g>

                  {/* 11. Shopping Bags */}
                  <g transform="translate(255, 75)">
                    {/* Big bag */}
                    <path d="M6 8 H28 L32 36 H2 Z" />
                    <path d="M12 8 C12 2 22 2 22 8" />
                    {/* Small bag */}
                    <path d="M26 18 H42 L45 36 H23 Z" fill="#0b2419" fillOpacity="0.4" />
                    <path d="M30 18 C30 13 38 13 38 18" />
                  </g>

                  {/* 12. Shopping Cart */}
                  <g transform="translate(320, 85)">
                    <path d="M0 0 H6 L12 18 H32 L36 6 H10" />
                    <circle cx="15" cy="22" r="2.5" />
                    <circle cx="29" cy="22" r="2.5" />
                  </g>

                  {/* 13. Delivery Truck */}
                  <g transform="translate(25, 150)">
                    <rect x="0" y="0" width="32" height="22" rx="2" />
                    <path d="M32 8 H42 L48 15 V22 H32 Z" />
                    <circle cx="10" cy="24" r="3.5" />
                    <circle cx="40" cy="24" r="3.5" />
                    <text x="16" y="14" fill="currentColor" stroke="none" fontSize="4.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.3">DELIVERY</text>
                  </g>

                  {/* 14. 24/7 Bubble */}
                  <g transform="translate(100, 150)">
                    <path d="M0 4 C0 1.8 1.8 0 4 0 H26 C28.2 0 30 1.8 30 4 V16 C30 18.2 28.2 20 26 20 H12 L6 25 V20 H4 C1.8 20 0 18.2 0 16 Z" />
                    <text x="15" y="13" fill="currentColor" stroke="none" fontSize="7" fontWeight="bold" textAnchor="middle">24/7</text>
                  </g>

                  {/* 15. Wallet */}
                  <g transform="translate(165, 150)">
                    <rect x="0" y="0" width="28" height="20" rx="3" />
                    <path d="M20 5 H28 V15 H20 C17.8 15 16 13.2 16 11 C16 8.8 17.8 7 20 7 Z" />
                    <circle cx="23" cy="10" r="1.5" />
                  </g>

                  {/* 16. Shopping Basket */}
                  <g transform="translate(225, 150)">
                    <path d="M4 8 H28 L24 24 H8 Z" />
                    <line x1="16" y1="8" x2="8" y2="0" />
                    <line x1="16" y1="8" x2="24" y2="0" />
                    <line x1="11" y1="12" x2="9" y2="20" />
                    <line x1="16" y1="12" x2="16" y2="20" />
                    <line x1="21" y1="12" x2="23" y2="20" />
                  </g>

                  {/* 17. Store Front / Shop */}
                  <g transform="translate(285, 145)">
                    <path d="M2 10 H34 V28 H2 Z" />
                    <path d="M0 10 L4 0 H32 L36 10 Z" />
                    <path d="M0 10 Q3 14 6 10 Q9 14 12 10 Q15 14 18 10 Q21 14 24 10 Q27 14 30 10 Q33 14 36 10" />
                    <rect x="14" y="16" width="8" height="12" />
                    <rect x="6" y="16" width="5" height="6" />
                    <rect x="25" y="16" width="5" height="6" />
                  </g>

                  {/* 18. Clothes Hanger */}
                  <g transform="translate(340, 160)">
                    <path d="M12 0 C9 0 9 4 12 5 L0 14 H24 L12 5" />
                  </g>

                  {/* 19. High Heel Shoe */}
                  <g transform="translate(35, 225)">
                    <path d="M0 16 H8 L16 8 C20 4 24 4 26 4 V14 L24 16 H20 L16 16" />
                    <line x1="25" y1="14" x2="25" y2="20" />
                  </g>

                  {/* 20. Magnifying Glass / Search */}
                  <g transform="translate(95, 225)">
                    <circle cx="8" cy="8" r="6" />
                    <line x1="13" y1="13" x2="19" y2="19" strokeWidth="2" />
                  </g>

                  {/* 21. Percentage Star % */}
                  <g transform="translate(150, 220)">
                    <circle cx="12" cy="12" r="11" strokeDasharray="2 2" />
                    <text x="12" y="16" fill="currentColor" stroke="none" fontSize="9" fontWeight="bold" textAnchor="middle">%</text>
                  </g>

                  {/* 22. 2nd SALE Tag */}
                  <g transform="translate(210, 220) rotate(-25)">
                    <path d="M0 0 H18 L28 10 L14 24 L0 24 Z" />
                    <circle cx="5" cy="12" r="2" />
                    <text x="14" y="14" fill="currentColor" stroke="none" fontSize="6.5" fontWeight="bold" textAnchor="middle">SALE</text>
                  </g>

                  {/* 23. 2nd Monitor */}
                  <g transform="translate(280, 215)">
                    <rect x="0" y="0" width="30" height="20" rx="2" />
                    <line x1="15" y1="20" x2="15" y2="25" />
                    <line x1="8" y1="25" x2="22" y2="25" />
                  </g>

                  {/* 24. Gift mini */}
                  <g transform="translate(345, 220)">
                    <rect x="0" y="5" width="18" height="16" rx="1.5" />
                    <line x1="9" y1="5" x2="9" y2="21" />
                    <line x1="0" y1="12" x2="18" y2="12" />
                  </g>

                  {/* Tiny Accents & Symbols (+, %, dots, sparkles) */}
                  <g fill="currentColor" stroke="none" opacity="0.6">
                    <circle cx="20" cy="70" r="1" />
                    <circle cx="170" cy="20" r="1.5" />
                    <circle cx="360" cy="65" r="1.2" />
                    <circle cx="80" cy="130" r="1.5" />
                    <circle cx="215" cy="135" r="1" />
                    <circle cx="270" cy="195" r="1.5" />
                    <circle cx="135" cy="265" r="1" />
                    
                    {/* Tiny plus symbols */}
                    <text x="75" y="65" fontSize="8" fontFamily="sans-serif">+</text>
                    <text x="235" y="60" fontSize="8" fontFamily="sans-serif">+</text>
                    <text x="30" y="205" fontSize="8" fontFamily="sans-serif">+</text>
                    <text x="180" y="200" fontSize="8" fontFamily="sans-serif">+</text>
                    <text x="325" y="270" fontSize="8" fontFamily="sans-serif">+</text>
                    
                    {/* Tiny percentage % symbols */}
                    <text x="135" y="60" fontSize="7" fontWeight="bold">%</text>
                    <text x="285" y="60" fontSize="7" fontWeight="bold">%</text>
                    <text x="65" y="195" fontSize="7" fontWeight="bold">%</text>
                    <text x="245" y="270" fontSize="7" fontWeight="bold">%</text>

                    {/* Tiny sparkles ✦ */}
                    <text x="175" y="115" fontSize="6">✦</text>
                    <text x="345" y="125" fontSize="6">✦</text>
                    <text x="15" y="130" fontSize="6">✦</text>
                    <text x="115" y="210" fontSize="6">✦</text>
                  </g>
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-shopping-pattern)" />
          </svg>
        </div>

        {/* Ambient Glows for Depth */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-11 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-5.5 max-w-xl">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white/10 border border-white/10 backdrop-blur-xs text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                NỀN TẢNG ĐÁNH GIÁ ĐỘC LẬP 2024
              </div>

              {/* Main Two-Tone Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[47px] font-black text-white tracking-tight leading-[1.1]">
                Đánh Giá Chuẩn,<br />
                <span className="text-[#FF5722]">Chọn Thông Minh!</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-[14px] text-slate-300 font-normal leading-relaxed max-w-lg">
                Khám phá đánh giá chuyên sâu từ phòng lab, bảng xếp hạng Top 10 độc lập và so sánh trực quan giúp bạn đưa ra quyết định mua sắm tối ưu và chính xác nhất.
              </p>

              {/* 3 Trust Badges in a Row (Responsive Grid) */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-4 pt-1.5">
                <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-white text-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] sm:text-xs font-bold text-white truncate">100% Độc Lập</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-300 truncate">Không tài trợ</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-white text-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] sm:text-xs font-bold text-white truncate">Thử Nghiệm Lab</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-300 truncate">Đo lường thực tế</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-white text-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] sm:text-xs font-bold text-white truncate">Top 10 Đề Cử</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-300 truncate">Cập nhật hàng tháng</div>
                  </div>
                </div>
              </div>

              {/* CTA Button & Search Box on Same Row */}
              <div className="space-y-2.5 pt-1 max-w-xl">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  {/* Explore Button */}
                  <Link to="/top/noi-chien-khong-dau" className="flex-shrink-0">
                    <button className="w-full sm:w-auto h-11 sm:h-11.5 bg-[#FF5722] hover:bg-[#F4511E] text-white font-extrabold uppercase text-xs sm:text-[13px] px-4.5 sm:px-5.5 py-2.5 rounded-xl shadow-md shadow-orange-950/40 flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 tracking-wide whitespace-nowrap">
                      <span>KHÁM PHÁ BẢNG XẾP HẠNG</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                  {/* Search Box on same row */}
                  <form
                    onSubmit={handleSearch}
                    className="flex-1 h-11 sm:h-11.5 p-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 flex items-center gap-2 hover:border-white/30 transition-all min-w-0"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-300 ml-2.5 flex-shrink-0" />
                    <input
                      type="text"
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      placeholder="Tìm kiếm sản phẩm, danh mục..."
                      className="w-full text-xs text-white placeholder:text-slate-300/80 bg-transparent focus:outline-none pr-1"
                    />
                    <button
                      type="submit"
                      className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold px-3.5 rounded-lg transition-colors flex-shrink-0 h-full flex items-center justify-center"
                    >
                      Tìm kiếm
                    </button>
                  </form>
                </div>

                {/* Suggestion tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs text-slate-300">
                  <span className="text-emerald-300/80 text-[10px] font-semibold">Gợi ý:</span>
                  {searchSuggestions.slice(0, 3).map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors text-[10px]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Multi-Card Spotlight Showcase & Floating Badge (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center min-h-[390px] select-none">
              
              {/* Floating Orange Ranking Badge */}
              <div className="absolute -top-3 right-0 sm:right-2 z-30 w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#FF5722] text-white flex flex-col items-center justify-center shadow-2xl ring-4 ring-[#0b2419]/80 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <span className="text-[8px] sm:text-[10px] font-extrabold tracking-wider uppercase opacity-90">TOP 10</span>
                <span className="text-lg sm:text-2xl font-black leading-none my-0.5 tracking-tight">2024</span>
                <span className="text-[8px] sm:text-[10px] font-extrabold tracking-wider uppercase opacity-90">CHUẨN XÁC</span>
              </div>

              {/* Multi-Card Floating Composition */}
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] flex flex-col gap-3.5 z-10 mx-auto">
                
                {/* Floating Top Card (Digital AI #1) */}
                <div className="self-start -mb-1 z-20 bg-slate-900/90 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-white/15 shadow-xl flex items-center gap-2.5 sm:gap-3 transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 w-[240px] sm:w-68 text-white">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80"
                      alt="Claude 3.5 Sonnet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-extrabold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-400" /> AI #1
                      </span>
                      <span className="text-[9px] font-black text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">★ 9.8</span>
                    </div>
                    <h5 className="font-bold text-white text-xs truncate">Claude 3.5 Sonnet</h5>
                    <p className="text-[10px] text-slate-300 truncate">Artifacts & Code thông minh</p>
                  </div>
                </div>

                {/* Primary Spotlight Card (Physical Appliance #1) */}
                <div className="self-end z-10 w-[270px] sm:w-76 bg-white p-3.5 sm:p-4 rounded-3xl border border-white shadow-2xl space-y-2.5 transform hover:-translate-y-1 transition-all duration-300 text-slate-900">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200/80 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-500" /> #1 Gia Dụng
                    </span>
                    <ScoreBadge score={9.4} size="sm" />
                  </div>

                  <div className="rounded-2xl overflow-hidden h-28 sm:h-30 bg-slate-100 border border-slate-100 relative group">
                    <img
                      src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80"
                      alt="AirCook Pro 6L"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      AirCook Pro 6L Smart
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1">AirCook Pro 6L Smart Fryer</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">Chín giòn 360° • Men gốm Ceramic</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">2.490.000 đ</span>
                    <Link to="/review/aircook-pro-6l" className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                      <span>Xem review</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Floating Bottom Card (Tech Laptop #1) */}
                <div className="self-start -mt-1 z-20 bg-slate-900/90 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-white/15 shadow-xl flex items-center gap-2.5 sm:gap-3 transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 w-[240px] sm:w-68 text-white">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=120&q=80"
                      alt="ProBook Laptop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-extrabold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-400" /> Laptop #1
                      </span>
                      <span className="text-[9px] font-black text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">★ 9.3</span>
                    </div>
                    <h5 className="font-bold text-white text-xs truncate">ProBook 14 Ultra OLED</h5>
                    <p className="text-[10px] text-slate-300 truncate">Pin 14h • OLED 2.8K 120Hz</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 4 — BẢNG XẾP HẠNG NỔI BẬT */}
      <section className="bg-slate-100/60 py-16 border-y border-slate-200/80">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Award className="w-4 h-4" /> Bảng Xếp Hạng Tuyển Chọn
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Top Bảng Xếp Hạng Được Xem Nhiều Nhất
              </h2>
            </div>
            <Link to="/top/noi-chien-khong-dau">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem kho bảng xếp hạng
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRankings.map((ranking) => (
              <RankingCard key={ranking.id} ranking={ranking} />
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 5 — LỰA CHỌN CỦA BIÊN TẬP VIÊN */}
      <section>
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Star className="w-4 h-4 fill-indigo-600" /> Editor's Choice 2024
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Lựa Chọn Của Ban Biên Tập
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Các sản phẩm đạt điểm số xuất sắc trên 9.0 và mang lại giá trị sử dụng cao nhất.
              </p>
            </div>
            <Link to="/tim-kiem">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem tất cả sản phẩm
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorsPicks.map((product) => (
              <ProductCard key={product.id} product={product} variant="grid" />
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 6 — BÀI VIẾT & HƯỚNG DẪN MỚI */}
      <section>
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <BookOpen className="w-4 h-4" /> Cẩm Nang & Phân Tích
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Bài Viết & Hướng Dẫn Chọn Mua Mới
              </h2>
            </div>
            <Link to="/huong-dan/cach-chon-noi-chien-khong-dau">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem toàn bộ bài viết
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {featuredArticle && (
              <div className="lg:col-span-7">
                <ArticleCard article={featuredArticle} variant="featured" className="h-full" />
              </div>
            )}
            <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
              {otherArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="horizontal" className="flex-1" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 7 — TRUST & METHODOLOGY */}
      <section id="trust" className="relative bg-[#160c07] bg-gradient-to-br from-[#1c110b] via-[#160c07] to-[#0d0704] text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden shadow-xl border border-amber-950/40">
        
        {/* Organic Fluid Art Motif Background (Matching Reference Artwork) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top-Right Mustard / Warm Yellow Blob */}
            <g opacity="0.38">
              <path
                d="M 520 0 C 510 110, 650 160, 770 120 C 850 90, 860 190, 830 290 C 810 360, 920 440, 1000 460 L 1000 0 Z"
                fill="#ebb15b"
              />
              <path
                d="M 540 0 C 530 95, 655 145, 765 105 C 835 75, 845 180, 815 280 C 795 350, 905 425, 985 440"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>

            {/* Left Sage / Slate-Teal Blob */}
            <g opacity="0.35">
              <path
                d="M 0 0 L 20 60 C 130 90, 190 120, 180 230 C 170 340, 260 390, 230 500 C 205 560, 150 590, 0 600 Z"
                fill="#8da8a9"
              />
              <path
                d="M 10 50 C 115 80, 175 110, 165 230 C 155 340, 245 390, 215 500 C 190 550, 140 580, 20 590"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              {/* Cursive loop doodle accent */}
              <path
                d="M 85 470 C 80 460, 95 450, 100 465 C 105 480, 90 485, 100 470 C 110 455, 120 475, 110 480 C 100 485, 115 470, 125 465"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>

            {/* Bottom-Right Coral / Pastel Pink Blob */}
            <g opacity="0.38">
              <path
                d="M 400 600 C 530 510, 600 410, 720 340 C 840 270, 950 300, 1000 340 L 1000 600 Z"
                fill="#f3b5b5"
              />
              <path
                d="M 420 600 C 540 520, 610 425, 725 360 C 835 295, 935 320, 985 355"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          </svg>
        </div>

        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-full inline-block">
                Quy trình & Tiêu chuẩn
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Chúng tôi đánh giá sản phẩm như thế nào?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Mỗi bài đánh giá tại TechReview không đơn thuần là bảng thông số từ nhà sản xuất. Chúng tôi trực tiếp mua, trải nghiệm trong điều kiện đời thực và đo lường theo quy trình 4 bước chuẩn mực:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                  <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 1. Nghiên cứu kỹ lưỡng
                  </div>
                  <p className="text-xs text-slate-400">
                    Phân tích phản hồi của hàng nghìn người mua trước khi chọn mẫu thử nghiệm.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                  <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 2. Chấm điểm minh bạch
                  </div>
                  <p className="text-xs text-slate-400">
                    Công khai tiêu chí và công thức tính điểm từng phần rõ ràng.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                  <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 3. Cập nhật thường xuyên
                  </div>
                  <p className="text-xs text-slate-400">
                    Tái đánh giá khi firmware nâng cấp hoặc thị trường có thay đổi giá.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                  <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 4. Chuyên gia biên tập
                  </div>
                  <p className="text-xs text-slate-400">
                    Thực hiện bởi các chuyên gia giàu kinh nghiệm trên 6 năm chuyên môn.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Statistics Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-indigo-950/80 border border-slate-700/80 text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white block">500+</span>
                <span className="text-xs font-semibold text-slate-300">Sản phẩm thử nghiệm</span>
              </div>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-indigo-950/80 border border-slate-700/80 text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-400 block">100+</span>
                <span className="text-xs font-semibold text-slate-300">Bài đánh giá chuyên sâu</span>
              </div>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-indigo-950/80 border border-slate-700/80 text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 block">50+</span>
                <span className="text-xs font-semibold text-slate-300">Bảng xếp hạng Top 10</span>
              </div>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-indigo-950/80 border border-slate-700/80 text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block">20+</span>
                <span className="text-xs font-semibold text-slate-300">Chuyên gia & Reviewers</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 8 — FAQ */}
      <section>
        <Container size="md">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
              Giải đáp thắc mắc
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Những điều độc giả hay hỏi nhất về cách chúng tôi xếp hạng và thử nghiệm sản phẩm.
            </p>
          </div>

          <Accordion items={faqItems} defaultOpenId="faq-1" />
        </Container>
      </section>
    </div>
  );
};
