import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ScoreBadge } from '../../components/ui/ScoreBadge';
import { Modal } from '../../components/ui/Modal';
import { ProductCard } from '../../components/product/ProductCard';
import { RankingCard } from '../../components/ranking/RankingCard';
import { ArticleCard } from '../../components/article/ArticleCard';
import { Accordion } from '../../components/ui/Accordion';
import { ComparisonWidget } from '../../components/home/ComparisonWidget';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { RevealOnScroll } from '../../components/ui/RevealOnScroll';
import { renderCategoryIcon } from '../../utils/icons';
import { formatPrice } from '../../utils/formatters';
import { Product, Ranking, Article, Category } from '../../types';
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
  Truck,
  Zap,
  Scale,
  Cpu,
  Tv,
  Smartphone,
  Check,
  Mail,
  HelpCircle,
  BarChart3,
  ThumbsUp,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
  CheckCircle,
  XCircle,
  Box,
  Share2,
  ShoppingCart,
  Lock,
  Lightbulb,
  X,
  Laptop,
  Code,
  Globe
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const [selectedPhysicalCategorySlug, setSelectedPhysicalCategorySlug] = useState<string>('all');
  const [physicalSearchVal, setPhysicalSearchVal] = useState('');
  const [selectedDigitalCategorySlug, setSelectedDigitalCategorySlug] = useState<string>('all');
  const [digitalSearchVal, setDigitalSearchVal] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Modals for Single Page Experience
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedRanking, setSelectedRanking] = useState<Ranking | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const physicalCategoryScrollRef = useRef<HTMLDivElement>(null);
  const digitalCategoryScrollRef = useRef<HTMLDivElement>(null);
  const physicalProductScrollRef = useRef<HTMLDivElement>(null);
  const digitalProductScrollRef = useRef<HTMLDivElement>(null);

  const handleScrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', amount = 260) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  const { showToast } = useToast();
  const { categories, products, rankings, articles, experts } = useData();

  // Listen for custom events dispatched from SearchOverlay or Header
  useEffect(() => {
    const handleSelectProduct = (e: Event) => {
      const customEvent = e as CustomEvent<Product>;
      if (customEvent.detail) setSelectedProduct(customEvent.detail);
    };
    const handleSelectRanking = (e: Event) => {
      const customEvent = e as CustomEvent<Ranking>;
      if (customEvent.detail) setSelectedRanking(customEvent.detail);
    };
    const handleSelectArticle = (e: Event) => {
      const customEvent = e as CustomEvent<Article>;
      if (customEvent.detail) setSelectedArticle(customEvent.detail);
    };

    window.addEventListener('select-product', handleSelectProduct);
    window.addEventListener('select-ranking', handleSelectRanking);
    window.addEventListener('select-article', handleSelectArticle);

    return () => {
      window.removeEventListener('select-product', handleSelectProduct);
      window.removeEventListener('select-ranking', handleSelectRanking);
      window.removeEventListener('select-article', handleSelectArticle);
    };
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      window.dispatchEvent(new CustomEvent('open-search'));
    }
  };

  const handleSuggestionClick = (query: string) => {
    setSearchVal(query);
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Vui lòng nhập địa chỉ email hợp lệ!', { type: 'error' });
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setNewsletterEmail('');
      showToast('Đăng ký thành công!', {
        type: 'success',
        description: 'Bản tin Top 10 sản phẩm tốt nhất sẽ được gửi đến hòm thư của bạn hàng tuần.'
      });
    }, 500);
  };

  const scrollToSection = (id: string) => {
    window.dispatchEvent(new CustomEvent('trigger-page-transition'));
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.classList.remove('animate-section-highlight');
      void el.offsetWidth;
      el.classList.add('animate-section-highlight');
    }
  };

  const searchSuggestions = [
    'Nồi chiên không dầu',
    'Laptop sinh viên',
    'Claude 3.5 Sonnet',
    'ChatGPT Plus'
  ];

  // Physical & Digital Category splits
  const physicalCategories = useMemo(
    () => categories.filter((c) => c.group === 'physical' && c.status !== 'inactive'),
    [categories]
  );
  const digitalCategories = useMemo(
    () => categories.filter((c) => c.group === 'digital' && c.status !== 'inactive'),
    [categories]
  );

  const physicalProducts = useMemo(
    () => products.filter((p) => p.type === 'physical' && p.status === 'published'),
    [products]
  );
  const digitalProducts = useMemo(
    () => products.filter((p) => p.type === 'digital' && p.status === 'published'),
    [products]
  );

  // Filtered Physical Products
  const filteredPhysicalProducts = useMemo(() => {
    return physicalProducts.filter((p) => {
      const matchSearch =
        !physicalSearchVal.trim() ||
        p.name.toLowerCase().includes(physicalSearchVal.toLowerCase()) ||
        p.brand.toLowerCase().includes(physicalSearchVal.toLowerCase()) ||
        p.category.toLowerCase().includes(physicalSearchVal.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(physicalSearchVal.toLowerCase());

      const matchCategory =
        selectedPhysicalCategorySlug === 'all' ||
        p.categorySlug === selectedPhysicalCategorySlug ||
        p.groupSlug === selectedPhysicalCategorySlug ||
        categories.some(
          (c) =>
            c.slug === selectedPhysicalCategorySlug &&
            (c.subcategories.some((s) => s.slug === p.categorySlug) || c.name.toLowerCase() === p.category.toLowerCase())
        );

      return matchSearch && matchCategory;
    });
  }, [physicalProducts, physicalSearchVal, selectedPhysicalCategorySlug, categories]);

  // Filtered Digital & AI Products
  const filteredDigitalProducts = useMemo(() => {
    return digitalProducts.filter((p) => {
      const matchSearch =
        !digitalSearchVal.trim() ||
        p.name.toLowerCase().includes(digitalSearchVal.toLowerCase()) ||
        p.brand.toLowerCase().includes(digitalSearchVal.toLowerCase()) ||
        p.category.toLowerCase().includes(digitalSearchVal.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(digitalSearchVal.toLowerCase());

      const matchCategory =
        selectedDigitalCategorySlug === 'all' ||
        p.categorySlug === selectedDigitalCategorySlug ||
        p.groupSlug === selectedDigitalCategorySlug ||
        categories.some(
          (c) =>
            c.slug === selectedDigitalCategorySlug &&
            (c.subcategories.some((s) => s.slug === p.categorySlug) || c.name.toLowerCase() === p.category.toLowerCase())
        );

      return matchSearch && matchCategory;
    });
  }, [digitalProducts, digitalSearchVal, selectedDigitalCategorySlug, categories]);

  const filteredRankings = useMemo(
    () => rankings.filter((r) => r.status === 'published'),
    [rankings]
  );

  const featuredArticle = articles.find((a) => a.type === 'guide') || articles[0];
  const otherArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  const digitalUseCases = [
    { title: 'Dành cho Lập trình viên', desc: 'AI coding, Hosting VPS, Git & Task Management', tag: 'Lập trình' },
    { title: 'Dành cho Designer & Creator', desc: 'Figma Pro, Midjourney AI, Video Editing Tools', tag: 'Thiết kế' },
    { title: 'Dành cho Marketer & SEO', desc: 'Ahrefs, Copywriting AI, Email Marketing Suite', tag: 'Marketing' },
    { title: 'Dành cho Bảo mật & Cá nhân', desc: 'NordVPN, Quản lý mật khẩu, Anti-tracking Cloud', tag: 'Bảo mật' },
    { title: 'Dành cho Quản lý & Doanh nghiệp', desc: 'Notion Workspace, Slack Pro, CRM & ERP Cloud', tag: 'Doanh nghiệp' },
    { title: 'Dành cho Nghiên cứu & Học tập', desc: 'Perplexity Pro, ChatGPT Plus, Kho tài liệu AI', tag: 'Học tập' }
  ];

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
      content: 'Bạn có thể gửi đề xuất qua hộp thư hoặc liên hệ với Ban biên tập. Các sản phẩm nhận được nhiều bình chọn từ độc giả sẽ được ưu tiên đưa vào lộ trình kiểm nghiệm phòng lab tiếp theo.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      {/* ========================================================================= */}
      {/* SECTION 1 — HERO SECTION (FULL WIDTH WITH RICH DOODLE PATTERN) */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative w-full text-white overflow-hidden border-b border-emerald-950/80 py-10 sm:py-14 lg:py-18 scroll-mt-24"
        style={{
          backgroundColor: '#0b2419',
          backgroundImage: 'radial-gradient(ellipse at top right, #143e2d 0%, #0b2419 55%, #06140e 100%)'
        }}
      >

        {/* Shopping & Tech Doodle Pattern Overlay */}
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
                  {/* 1. DISC Badge */}
                  <g transform="translate(30, 20)">
                    <path d="M12 0 L15 5 L21 4 L21 10 L26 13 L23 18 L26 23 L21 26 L21 32 L15 31 L12 36 L9 31 L3 32 L3 26 L-2 23 L1 18 L-2 13 L3 10 L3 4 L9 5 Z" />
                    <text x="12" y="21" fill="currentColor" stroke="none" fontSize="7" fontWeight="bold" textAnchor="middle">DISC</text>
                  </g>
                  {/* 2. Gift Box */}
                  <g transform="translate(95, 25)">
                    <rect x="0" y="8" width="26" height="22" rx="2" />
                    <line x1="13" y1="8" x2="13" y2="30" />
                    <line x1="0" y1="18" x2="26" y2="18" />
                  </g>
                  {/* 3. Cards */}
                  <g transform="translate(195, 18)">
                    <rect x="6" y="8" width="36" height="22" rx="3" strokeDasharray="1 0" />
                    <rect x="0" y="0" width="36" height="22" rx="3" fill="#0b2419" fillOpacity="0.4" />
                  </g>
                  {/* 4. SALE Tag */}
                  <g transform="translate(265, 15) rotate(35)">
                    <path d="M0 0 H22 L34 12 L18 28 L0 28 Z" />
                    <text x="17" y="17" fill="currentColor" stroke="none" fontSize="7.5" fontWeight="bold" textAnchor="middle">SALE</text>
                  </g>
                  {/* 5. Smartphone */}
                  <g transform="translate(90, 85)">
                    <rect x="0" y="0" width="16" height="28" rx="3" />
                  </g>
                  {/* 6. Shopping Cart */}
                  <g transform="translate(320, 85)">
                    <path d="M0 0 H6 L12 18 H32 L36 6 H10" />
                    <circle cx="15" cy="22" r="2.5" />
                    <circle cx="29" cy="22" r="2.5" />
                  </g>
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-shopping-pattern)" />
          </svg>
        </div>

        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7 space-y-6 max-w-2xl">
              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.12]">
                Đánh Giá Chuẩn,<br />
                <span className="text-[#FF5722]">Chọn Thông Minh!</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                Khám phá đánh giá chuyên sâu từ phòng lab, bảng xếp hạng Top 10 độc lập và so sánh trực quan giúp bạn đưa ra quyết định mua sắm tối ưu và chính xác nhất.
              </p>

            </div>

            {/* Right Column - Multi-Card Spotlight Showcase */}
            <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center min-h-[420px] select-none">
              <div className="absolute -top-4 right-2 z-30 w-22 h-22 rounded-full bg-[#FF5722] text-white flex flex-col items-center justify-center shadow-2xl ring-4 ring-[#0b2419]/80 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-90">TOP 10</span>
                <span className="text-2xl font-black leading-none my-0.5 tracking-tight">2024</span>
                <span className="text-[9px] font-extrabold tracking-wider uppercase opacity-90">CHUẨN XÁC</span>
              </div>

              <div className="relative w-full max-w-[380px] flex flex-col gap-4 z-10 mx-auto">
                {/* Spotlight 2: Physical */}
                <div
                  onClick={() => setSelectedProduct(products.find((p) => p.slug === 'aircook-pro-6l') || products[0])}
                  className="self-end z-10 w-80 bg-white p-4 rounded-3xl border border-white shadow-2xl space-y-3 transform hover:-translate-y-1 transition-all duration-300 text-slate-900 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200/80 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-500" /> #1 Gia Dụng
                    </span>
                    <ScoreBadge score={9.4} size="sm" />
                  </div>

                  <div className="rounded-2xl overflow-hidden h-32 bg-slate-100 border border-slate-100 relative group">
                    <img
                      src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80"
                      alt="AirCook Pro 6L"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    <span className="absolute bottom-2 left-2.5 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                      AirCook Pro 6L Smart
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">AirCook Pro 6L Smart Fryer</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Chín giòn 360° • Men gốm Ceramic</p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black text-slate-900">2.490.000 đ</span>
                    <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                      <span>Xem review chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Spotlight 3: Laptop */}
                <div
                  onClick={() => setSelectedProduct(products.find((p) => p.slug === 'probook-14-oled') || products[0])}
                  className="self-start -mt-2 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-3 transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 w-72 text-white cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=120&q=80"
                      alt="ProBook Laptop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-400" /> Laptop #1
                      </span>
                      <span className="text-[10px] font-black text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">★ 9.3</span>
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

      {/* ========================================================================= */}
      {/* SECTION 2 — 4 CORE PILLARS & VALUE PROPOSITION */}
      {/* ========================================================================= */}
      <section id="tinh-nang" className="scroll-mt-24">
        <RevealOnScroll animation="fade-up">
          <Container size="xl">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Tại Sao Hơn 1.2 Triệu Người Chọn TechReview?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Khác biệt hoàn toàn với các trang tổng hợp thông tin, chúng tôi đánh giá dựa trên thiết bị đo kiểm và trải nghiệm đời thực.
              </p>
            </div>

            {/* 4 Template-Inspired Cards with Clean Borderless Style, Organic Fluid Wave Badges & Botanical Motifs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
              {/* CARD 1 — 100% ĐỘC LẬP (Coral Tangerine) */}
              <div className="group relative bg-[#fff7f2] rounded-t-[32px] rounded-bl-[40px] rounded-br-[28px] p-6 pt-7 pb-16 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
                {/* Botanical & Organic Background Motif */}
                <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none select-none opacity-30 group-hover:opacity-45 transition-opacity duration-300">
                  <svg viewBox="0 0 140 140" fill="none" className="w-full h-full text-[#ff9951]">
                    {/* Organic Warm Blob */}
                    <path
                      d="M 140 0 C 100 0, 70 30, 80 80 C 90 120, 130 130, 140 140 Z"
                      fill="#ffd46c"
                      opacity="0.55"
                    />
                    {/* Botanical Leaf Sprig */}
                    <path
                      d="M 120 15 Q 95 45 90 90"
                      stroke="#ea580c"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path d="M 112 28 C 102 24 100 32 108 36 C 114 38 116 32 112 28 Z" fill="#ea580c" />
                    <path d="M 98 46 C 90 40 88 48 94 54 C 100 58 102 52 98 46 Z" fill="#ea580c" />
                    <path d="M 92 68 C 82 64 82 72 88 78 C 94 82 96 76 92 68 Z" fill="#ea580c" />
                    {/* Squiggle Accent */}
                    <path
                      d="M 60 25 Q 70 20 65 35 T 75 45"
                      stroke="#ff9951"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.7"
                    />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Centered Minimalist Icon */}
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-orange-100 shadow-xs text-[#ea580c] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-7 h-7" />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#ea580c] transition-colors">
                      100% Độc Lập
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Nói KHÔNG với nhận tiền tài trợ để nâng hạng hoặc ưu ái thương hiệu. Mọi thứ hạng phản ánh đúng chất lượng sản phẩm thực tế.
                    </p>
                  </div>
                </div>

                {/* Organic Fluid Wavy Badge (Bottom Right) */}
                <div className="absolute bottom-0 right-0 z-20 pointer-events-none select-none">
                  <div className="relative w-24 h-20 flex items-end justify-end">
                    <svg
                      viewBox="0 0 100 80"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="none"
                    >
                      {/* Soft Yellow Secondary Organic Wave */}
                      <path
                        d="M 5 60 C 25 35, 45 55, 65 25 C 80 8, 92 16, 100 0 L 100 80 L 5 80 Z"
                        fill="#ffd46c"
                        opacity="0.5"
                      />
                      {/* Primary Coral Organic Wave */}
                      <path
                        d="M 18 65 C 32 40, 52 58, 70 30 C 82 12, 94 20, 100 10 L 100 80 L 18 80 Z"
                        fill="#ea580c"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CARD 2 — THỬ NGHIỆM PHÒNG LAB (Mint & Sage Aqua) */}
              <div className="group relative bg-[#eff8f7] rounded-t-[32px] rounded-bl-[40px] rounded-br-[28px] p-6 pt-7 pb-16 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
                {/* Botanical & Organic Background Motif */}
                <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none select-none opacity-30 group-hover:opacity-45 transition-opacity duration-300">
                  <svg viewBox="0 0 140 140" fill="none" className="w-full h-full text-[#319d9b]">
                    {/* Organic Sage Blob */}
                    <path
                      d="M 140 0 C 95 10, 80 40, 85 85 C 90 120, 125 135, 140 140 Z"
                      fill="#a5e2e1"
                      opacity="0.6"
                    />
                    {/* Botanical Leaf Sprig */}
                    <path
                      d="M 125 15 Q 100 50 95 95"
                      stroke="#227f7e"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path d="M 115 30 C 105 26 102 34 110 38 C 118 40 120 34 115 30 Z" fill="#227f7e" />
                    <path d="M 102 52 C 92 46 90 54 98 60 C 104 64 106 58 102 52 Z" fill="#227f7e" />
                    <path d="M 96 74 C 86 70 86 78 92 84 C 98 88 100 82 96 74 Z" fill="#227f7e" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Centered Minimalist Icon */}
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-teal-100 shadow-xs text-[#227f7e] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-7 h-7" />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#227f7e] transition-colors">
                      Thử Nghiệm Phòng Lab
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Đo đạc độ ồn, kiểm tra nhiệt độ, benchmark hiệu năng và đo mức tiêu thụ điện năng bằng trang thiết bị chuyên dụng chuẩn mực.
                    </p>
                  </div>
                </div>

                {/* Organic Fluid Wavy Badge (Bottom Right) */}
                <div className="absolute bottom-0 right-0 z-20 pointer-events-none select-none">
                  <div className="relative w-24 h-20 flex items-end justify-end">
                    <svg
                      viewBox="0 0 100 80"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="none"
                    >
                      {/* Soft Aqua Secondary Organic Wave */}
                      <path
                        d="M 5 60 C 25 35, 45 55, 65 25 C 80 8, 92 16, 100 0 L 100 80 L 5 80 Z"
                        fill="#a5e2e1"
                        opacity="0.6"
                      />
                      {/* Primary Teal Organic Wave */}
                      <path
                        d="M 18 65 C 32 40, 52 58, 70 30 C 82 12, 94 20, 100 10 L 100 80 L 18 80 Z"
                        fill="#227f7e"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CARD 3 — BẢNG XẾP HẠNG ĐỘNG (Golden Sun Amber) */}
              <div className="group relative bg-[#fdf8ec] rounded-t-[32px] rounded-bl-[40px] rounded-br-[28px] p-6 pt-7 pb-16 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
                {/* Botanical & Organic Background Motif */}
                <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none select-none opacity-30 group-hover:opacity-45 transition-opacity duration-300">
                  <svg viewBox="0 0 140 140" fill="none" className="w-full h-full text-[#f5a623]">
                    {/* Organic Golden Blob */}
                    <path
                      d="M 140 0 C 105 0, 75 35, 80 75 C 85 115, 120 130, 140 140 Z"
                      fill="#ffd46c"
                      opacity="0.65"
                    />
                    {/* Botanical Leaf Sprig */}
                    <path
                      d="M 120 15 Q 95 45 90 90"
                      stroke="#d97706"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path d="M 112 28 C 102 24 100 32 108 36 C 114 38 116 32 112 28 Z" fill="#d97706" />
                    <path d="M 98 46 C 90 40 88 48 94 54 C 100 58 102 52 98 46 Z" fill="#d97706" />
                    <path d="M 92 68 C 82 64 82 72 88 78 C 94 82 96 76 92 68 Z" fill="#d97706" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Centered Minimalist Icon */}
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-amber-100 shadow-xs text-[#d97706] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-7 h-7" />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#d97706] transition-colors">
                      Bảng Xếp Hạng Động
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Cập nhật liên tục hàng tháng khi có phiên bản mới hoặc khi biến động giá thị trường làm thay đổi độ đáng mua (P/P) của sản phẩm.
                    </p>
                  </div>
                </div>

                {/* Organic Fluid Wavy Badge (Bottom Right) */}
                <div className="absolute bottom-0 right-0 z-20 pointer-events-none select-none">
                  <div className="relative w-24 h-20 flex items-end justify-end">
                    <svg
                      viewBox="0 0 100 80"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="none"
                    >
                      {/* Soft Peach Secondary Organic Wave */}
                      <path
                        d="M 5 60 C 25 35, 45 55, 65 25 C 80 8, 92 16, 100 0 L 100 80 L 5 80 Z"
                        fill="#ffd46c"
                        opacity="0.6"
                      />
                      {/* Primary Amber Organic Wave */}
                      <path
                        d="M 18 65 C 32 40, 52 58, 70 30 C 82 12, 94 20, 100 10 L 100 80 L 18 80 Z"
                        fill="#d97706"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CARD 4 — SO SÁNH TRỰC QUAN (Warm Espresso & Vibrant Terracotta) */}
              <div className="group relative bg-[#fef3f0] rounded-t-[32px] rounded-bl-[40px] rounded-br-[28px] p-6 pt-7 pb-16 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
                {/* Botanical & Organic Background Motif */}
                <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none select-none opacity-30 group-hover:opacity-45 transition-opacity duration-300">
                  <svg viewBox="0 0 140 140" fill="none" className="w-full h-full text-[#ea580c]">
                    {/* Organic Terracotta Blob */}
                    <path
                      d="M 140 0 C 95 0, 75 35, 80 80 C 85 125, 125 135, 140 140 Z"
                      fill="#fca5a5"
                      opacity="0.5"
                    />
                    {/* Botanical Leaf Sprig */}
                    <path
                      d="M 125 15 Q 98 48 92 92"
                      stroke="#c2410c"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path d="M 115 30 C 105 26 102 34 110 38 C 118 40 120 34 115 30 Z" fill="#c2410c" />
                    <path d="M 102 52 C 92 46 90 54 98 60 C 104 64 106 58 102 52 Z" fill="#c2410c" />
                    <path d="M 94 74 C 84 70 84 78 90 84 C 96 88 98 82 94 74 Z" fill="#c2410c" />
                    {/* Dotted Pebbles */}
                    <circle cx="65" cy="35" r="2.5" fill="#ea580c" opacity="0.6" />
                    <circle cx="76" cy="44" r="3" fill="#ea580c" opacity="0.6" />
                    <circle cx="68" cy="54" r="2" fill="#ea580c" opacity="0.6" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Centered Minimalist Icon */}
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-rose-100 shadow-xs text-[#c2410c] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Scale className="w-7 h-7" />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#c2410c] transition-colors">
                      So Sánh Trực Quan
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Ma trận so sánh thông số, trải nghiệm thực tế và đưa ra kết luận rõ ràng: sản phẩm nào phù hợp nhất với túi tiền và nhu cầu của bạn.
                    </p>
                  </div>
                </div>

                {/* Organic Fluid Wavy Badge (Bottom Right) */}
                <div className="absolute bottom-0 right-0 z-20 pointer-events-none select-none">
                  <div className="relative w-24 h-20 flex items-end justify-end">
                    <svg
                      viewBox="0 0 100 80"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="none"
                    >
                      {/* Soft Terracotta Rose Secondary Organic Wave */}
                      <path
                        d="M 5 60 C 25 35, 45 55, 65 25 C 80 8, 92 16, 100 0 L 100 80 L 5 80 Z"
                        fill="#fca5a5"
                        opacity="0.5"
                      />
                      {/* Primary Deep Terracotta Organic Wave */}
                      <path
                        d="M 18 65 C 32 40, 52 58, 70 30 C 82 12, 94 20, 100 10 L 100 80 L 18 80 Z"
                        fill="#c2410c"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </RevealOnScroll>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — SẢN PHẨM VẬT LÝ (#physical) */}
      {/* ========================================================================= */}
      <section id="physical" className="scroll-mt-24 w-full">
        <RevealOnScroll animation="fade-up">
          {/* Full-width Edge-to-Edge Dark Forest Green Categories Box with Botanical & Organic Background Motifs */}
          <div className="relative w-full bg-[#0b2419] bg-gradient-to-br from-[#0e2c1e] via-[#0b2419] to-[#071710] text-white py-8 sm:py-10 border-y border-emerald-950/40 shadow-inner overflow-hidden">
            {/* Organic Botanical & Fluid Wave Background SVG Motifs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
              <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
                {/* Top-Right Soft Tan & Golden Organic Fluid Wavy Patches */}
                <path
                  d="M 980 0 C 1080 80, 1220 30, 1320 120 C 1380 170, 1420 130, 1440 100 L 1440 0 Z"
                  fill="#ebb15b"
                  opacity="0.3"
                />
                <path
                  d="M 1160 0 C 1230 100, 1340 60, 1440 160 L 1440 0 Z"
                  fill="#8da8a9"
                  opacity="0.25"
                />
                {/* Top-Right Delicate Curved Contour Line */}
                <path
                  d="M 900 0 C 1040 140, 1220 90, 1390 190"
                  stroke="#ebb15b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />

                {/* Top-Left Fluid Wavy Organic Curve */}
                <path
                  d="M 0 0 C 120 40, 180 130, 140 220 C 100 300, 40 330, 0 360 Z"
                  fill="#8da8a9"
                  opacity="0.22"
                />

                {/* Bottom-Left Sage Organic Wave Blob */}
                <path
                  d="M 0 350 C 130 370, 220 430, 200 520 C 180 580, 130 600, 0 600 Z"
                  fill="#8da8a9"
                  opacity="0.3"
                />

                {/* Center-Left Organic Botanical Fern Frond */}
                <g opacity="0.35" transform="translate(60, 320) rotate(-15) scale(0.9)">
                  <path d="M 50 120 Q 45 60 50 0" stroke="#a5e2e1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 50 110 C 60 105 62 115 52 120 C 44 122 42 115 50 110 Z" fill="#a5e2e1" />
                  <path d="M 33 90 C 45 85 48 96 36 102 C 28 104 26 95 33 90 Z" fill="#a5e2e1" />
                  <path d="M 35 70 C 22 65 19 76 31 82 C 39 84 41 75 35 70 Z" fill="#a5e2e1" />
                  <path d="M 40 60 C 52 55 55 66 43 72 C 35 74 33 65 40 60 Z" fill="#a5e2e1" />
                  <path d="M 42 40 C 29 35 26 46 38 52 C 46 54 48 45 42 40 Z" fill="#a5e2e1" />
                  <path d="M 47 30 C 59 25 62 36 50 42 C 42 44 40 35 47 30 Z" fill="#a5e2e1" />
                </g>

                {/* Bottom-Right Organic Fluid Wave */}
                <path
                  d="M 1240 600 C 1270 510, 1360 480, 1440 460 L 1440 600 Z"
                  fill="#ebb15b"
                  opacity="0.25"
                />
              </svg>
            </div>

            <Container size="xl" className="relative z-10">
              <div className="space-y-6">
                {/* Compact Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Đánh Giá Đồ Gia Dụng, Công Nghệ &amp; Thiết Bị
                    </h2>
                    <p className="text-xs text-emerald-100/75 max-w-2xl font-normal">
                      Khám phá danh mục sản phẩm vật lý được kiểm nghiệm thực tế từ 14 đến 60 ngày trước khi xuất bản báo cáo.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPhysicalCategorySlug('all');
                      setPhysicalSearchVal('');
                      const el = document.getElementById('physical-explorer');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 self-start md:self-auto cursor-pointer flex-shrink-0"
                  >
                    <span>Xem tất cả ({physicalProducts.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Compact Physical Categories Grid (6 Categories) - High-Contrast Warm Cream/Ivory Theme */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {physicalCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="group bg-[#faf6ee] rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3 text-slate-900 border border-[#ebdccb]"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#f0e4d4] border border-[#decaba] text-[#854d0e] flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                            {renderCategoryIcon(cat.icon, 'w-5 h-5')}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug truncate group-hover:text-amber-800 transition-colors">{cat.name}</h3>
                            <span className="text-[11px] font-medium text-slate-500">{cat.count}+ bài đánh giá</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 font-normal leading-relaxed">
                          {cat.description}
                        </p>
                        {/* Subcategories pills - 3 items in 1 single row, no line breaks */}
                        <div className="grid grid-cols-3 gap-1.5 pt-0.5 w-full">
                          {cat.subcategories.slice(0, 3).map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setSelectedPhysicalCategorySlug(cat.slug);
                                const el = document.getElementById('physical-explorer');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              title={sub.name}
                              className="text-[10px] sm:text-[11px] font-semibold text-amber-900 bg-[#f3eae0] hover:bg-[#ead7c3] hover:text-amber-950 border border-[#e2d2be] px-1.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center truncate block w-full"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-[#eddcd0] flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedPhysicalCategorySlug(cat.slug);
                            const el = document.getElementById('physical-explorer');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Lọc danh mục này</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>

          {/* Physical Products Explorer & Filter (Light Container) */}
          <Container size="xl" className="pt-8 sm:pt-10">
            <div id="physical-explorer" className="space-y-6 scroll-mt-24">
              {/* Explorer Section Header */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  <span>Khám Phá &amp; Lọc Toàn Bộ</span>{' '}
                  <span className="block sm:inline whitespace-nowrap">Sản Phẩm Vật Lý</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Nhấn vào bất kỳ sản phẩm nào để xem bảng thông số, điểm số kiểm nghiệm phòng lab và bài review chuyên sâu.
                </p>
              </div>

              {/* Category Filter Pills on 1 Single Line with Slide Arrows & Search */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-500 flex-shrink-0 ml-1 whitespace-nowrap">Danh mục:</span>

                  {/* Left Arrow Button */}
                  <button
                    type="button"
                    onClick={() => handleScrollContainer(physicalCategoryScrollRef, 'left')}
                    className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer shadow-xs active:scale-95"
                    title="Trượt sang trái"
                    aria-label="Trượt sang trái"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* 1-Line Scrollable Pills Container */}
                  <div
                    ref={physicalCategoryScrollRef}
                    className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 flex-1 select-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <button
                      onClick={() => setSelectedPhysicalCategorySlug('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                        selectedPhysicalCategorySlug === 'all'
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Tất cả ({physicalProducts.length})
                    </button>
                    {physicalCategories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedPhysicalCategorySlug(c.slug)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                          selectedPhysicalCategorySlug === c.slug
                            ? 'bg-orange-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>

                  {/* Right Arrow Button */}
                  <button
                    type="button"
                    onClick={() => handleScrollContainer(physicalCategoryScrollRef, 'right')}
                    className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer shadow-xs active:scale-95"
                    title="Trượt sang phải"
                    aria-label="Trượt sang phải"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Search inside Physical Products */}
                <div className="relative w-full lg:w-60 flex-shrink-0">
                  <input
                    type="text"
                    placeholder="Lọc nhanh sản phẩm vật lý..."
                    value={physicalSearchVal}
                    onChange={(e) => setPhysicalSearchVal(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-100 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Physical Product Cards 1-Line Slider with Navigation */}
                {filteredPhysicalProducts.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">
                        Hiển thị {filteredPhysicalProducts.length} sản phẩm vật lý phù hợp
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleScrollContainer(physicalProductScrollRef, 'left', 320)}
                          className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                          title="Trượt sang trái"
                          aria-label="Trượt sang trái"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleScrollContainer(physicalProductScrollRef, 'right', 320)}
                          className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                          title="Trượt sang phải"
                          aria-label="Trượt sang phải"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div
                      key={`${selectedPhysicalCategorySlug}-${physicalSearchVal}`}
                      ref={physicalProductScrollRef}
                      className="flex items-stretch gap-5 overflow-x-auto scroll-smooth py-2 select-none animate-grid-filter"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {filteredPhysicalProducts.map((p) => (
                        <div
                          key={p.id}
                          className="w-[280px] sm:w-[300px] flex-shrink-0"
                        >
                          <ProductCard product={p} variant="grid" className="h-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                    <Box className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="font-bold text-slate-800 text-sm">Không tìm thấy sản phẩm vật lý phù hợp</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc để xem toàn bộ danh mục sản phẩm.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPhysicalSearchVal('');
                        setSelectedPhysicalCategorySlug('all');
                      }}
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                )}
              </div>
            </Container>
          </RevealOnScroll>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4 — SẢN PHẨM SỐ & AI (#digital) */}
        {/* ========================================================================= */}
        <section id="digital" className="scroll-mt-24">
          <RevealOnScroll animation="fade-up">
            <Container size="xl">
              {/* Digital & AI Products Explorer & Filter */}
              <div id="digital-explorer" className="space-y-6 scroll-mt-24">
                {/* Explorer Section Header */}
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    <span>Khám Phá &amp; Lọc Toàn Bộ</span>{' '}
                    <span className="block sm:inline whitespace-nowrap">Sản Phẩm Số &amp; AI</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Nhấn vào bất kỳ công cụ nào để xem bảng tính năng, đánh giá hiệu năng phòng lab và bài review chuyên sâu.
                  </p>
                </div>

                {/* Category Filter Pills on 1 Single Line with Slide Arrows & Search */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-xs font-bold text-slate-500 flex-shrink-0 ml-1 whitespace-nowrap">Danh mục:</span>

                    {/* Left Arrow Button */}
                    <button
                      type="button"
                      onClick={() => handleScrollContainer(digitalCategoryScrollRef, 'left')}
                      className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer shadow-xs active:scale-95"
                      title="Trượt sang trái"
                      aria-label="Trượt sang trái"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* 1-Line Scrollable Pills Container */}
                    <div
                      ref={digitalCategoryScrollRef}
                      className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 flex-1 select-none"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <button
                        onClick={() => setSelectedDigitalCategorySlug('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                          selectedDigitalCategorySlug === 'all'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Tất cả ({digitalProducts.length})
                      </button>
                      {digitalCategories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedDigitalCategorySlug(c.slug)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                            selectedDigitalCategorySlug === c.slug
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>

                    {/* Right Arrow Button */}
                    <button
                      type="button"
                      onClick={() => handleScrollContainer(digitalCategoryScrollRef, 'right')}
                      className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer shadow-xs active:scale-95"
                      title="Trượt sang phải"
                      aria-label="Trượt sang phải"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Search inside Digital Products */}
                  <div className="relative w-full lg:w-60 flex-shrink-0">
                    <input
                      type="text"
                      placeholder="Lọc nhanh công cụ số & AI..."
                      value={digitalSearchVal}
                      onChange={(e) => setDigitalSearchVal(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-100 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Digital Product Cards 1-Line Slider with Navigation */}
                {filteredDigitalProducts.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">
                        Hiển thị {filteredDigitalProducts.length} giải pháp số &amp; AI phù hợp
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleScrollContainer(digitalProductScrollRef, 'left', 320)}
                          className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                          title="Trượt sang trái"
                          aria-label="Trượt sang trái"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleScrollContainer(digitalProductScrollRef, 'right', 320)}
                          className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                          title="Trượt sang phải"
                          aria-label="Trượt sang phải"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div
                      key={`${selectedDigitalCategorySlug}-${digitalSearchVal}`}
                      ref={digitalProductScrollRef}
                      className="flex items-stretch gap-5 overflow-x-auto scroll-smooth py-2 select-none animate-grid-filter"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {filteredDigitalProducts.map((p) => (
                        <div
                          key={p.id}
                          className="w-[280px] sm:w-[300px] flex-shrink-0"
                        >
                          <ProductCard product={p} variant="grid" className="h-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                    <Box className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="font-bold text-slate-800 text-sm">Không tìm thấy công cụ số &amp; AI phù hợp</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc để xem toàn bộ danh mục sản phẩm.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDigitalSearchVal('');
                        setSelectedDigitalCategorySlug('all');
                      }}
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                )}
              </div>
            </Container>
          </RevealOnScroll>
        </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — BẢNG XẾP HẠNG TOP 10 (#ranking) */}
      {/* ========================================================================= */}
      <section id="ranking" className="bg-slate-100/70 py-16 border-y border-slate-200/80 scroll-mt-24">
        <RevealOnScroll animation="zoom-in">
          <Container size="xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Top 10 Bảng Xếp Hạng Được Xem Nhiều Nhất
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Tổng hợp các bảng xếp hạng uy tín nhất theo từng nhóm sản phẩm và công cụ.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-grid-filter">
              {filteredRankings.slice(0, 3).map((ranking) => (
                <div key={ranking.id}>
                  <RankingCard ranking={ranking} />
                </div>
              ))}
            </div>
          </Container>
        </RevealOnScroll>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — LIVE COMPARISON WIDGET (#so-sanh) */}
      {/* ========================================================================= */}
      <section id="so-sanh" className="scroll-mt-24">
        <RevealOnScroll animation="fade-up">
          <Container size="xl">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                <span>So Sánh Sản Phẩm Đối Đầu</span>{' '}
                <span className="block sm:inline whitespace-nowrap">Trực Quan</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Trải nghiệm công cụ so sánh trực tiếp để thấy rõ sự chênh lệch về hiệu năng, tính năng và giá bán.
              </p>
            </div>

            <ComparisonWidget />
          </Container>
        </RevealOnScroll>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — CẨM NANG & BÀI VIẾT HƯỚNG DẪN (#guides) */}
      {/* ========================================================================= */}
      <section id="guides" className="scroll-mt-24">
        <RevealOnScroll animation="fade-up">
          <Container size="xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-[17px] xs:text-xl sm:text-3xl font-black text-slate-900 tracking-tight whitespace-nowrap">
                  Bài Viết &amp; Hướng Dẫn Chọn Mua Mới
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {featuredArticle && (
                <div className="lg:col-span-7">
                  <ArticleCard article={featuredArticle} variant="featured" className="h-full" />
                </div>
              )}
              <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
                {otherArticles.map((art) => (
                  <div key={art.id} className="flex-1">
                    <ArticleCard article={art} variant="horizontal" className="h-full" />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </RevealOnScroll>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9 — QUY TRÌNH LAB & CHUYÊN GIA (#chuyen-gia) */}
      {/* ========================================================================= */}
      <section id="chuyen-gia" className="relative bg-[#160c07] bg-gradient-to-br from-[#1c110b] via-[#160c07] to-[#0d0704] text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden shadow-2xl border border-amber-950/40 scroll-mt-24">
        <RevealOnScroll animation="flip-up">
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <path d="M 520 0 C 510 110, 650 160, 770 120 C 850 90, 860 190, 830 290 L 1000 0 Z" fill="#ebb15b" opacity="0.4" />
              <path d="M 0 0 L 20 60 C 130 90, 190 120, 180 230 C 170 340, 260 390, 230 500 L 0 600 Z" fill="#8da8a9" opacity="0.4" />
            </svg>
          </div>

          <Container size="xl" className="relative z-10">
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    Chúng tôi đánh giá sản phẩm như thế nào?
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Mỗi bài đánh giá tại TechReview không đơn thuần là bảng thông số từ nhà sản xuất. Chúng tôi trực tiếp mua, trải nghiệm trong điều kiện đời thực và đo lường theo quy trình 4 bước chuẩn mực:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                      <div className="text-orange-400 font-bold text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> 1. Nghiên cứu kỹ lưỡng
                      </div>
                      <p className="text-xs text-slate-400">
                        Phân tích phản hồi của hàng nghìn người mua trước khi chọn mẫu thử nghiệm.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                      <div className="text-orange-400 font-bold text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> 2. Chấm điểm minh bạch
                      </div>
                      <p className="text-xs text-slate-400">
                        Công khai tiêu chí và công thức tính điểm từng phần rõ ràng.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                      <div className="text-orange-400 font-bold text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> 3. Cập nhật thường xuyên
                      </div>
                      <p className="text-xs text-slate-400">
                        Tái đánh giá khi firmware nâng cấp hoặc thị trường có thay đổi giá.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                      <div className="text-orange-400 font-bold text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> 4. Chuyên gia biên tập
                      </div>
                      <p className="text-xs text-slate-400">
                        Thực hiện bởi các chuyên gia giàu kinh nghiệm trên 6 năm chuyên môn.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics Grid */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white block">500+</span>
                    <span className="text-xs font-semibold text-slate-300">Sản phẩm thử nghiệm</span>
                  </div>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-orange-400 block">100+</span>
                    <span className="text-xs font-semibold text-slate-300">Bài đánh giá chuyên sâu</span>
                  </div>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 block">50+</span>
                    <span className="text-xs font-semibold text-slate-300">Bảng xếp hạng Top 10</span>
                  </div>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block">20+</span>
                    <span className="text-xs font-semibold text-slate-300">Chuyên gia &amp; Reviewers</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </RevealOnScroll>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — TESTIMONIALS & SOCIAL PROOF (#danh-gia) */}
      {/* ========================================================================= */}
      <div id="danh-gia" className="scroll-mt-24">
        <RevealOnScroll animation="zoom-in">
          <TestimonialsSection />
        </RevealOnScroll>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 11 — FAQ ACCORDION (#faq) */}
      {/* ========================================================================= */}
      <section id="faq" className="scroll-mt-24">
        <RevealOnScroll animation="fade-up">
          <Container size="md">
            <div className="text-center space-y-2 mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                Những điều độc giả hay hỏi nhất về cách chúng tôi xếp hạng và thử nghiệm sản phẩm.
              </p>
            </div>

            <Accordion items={faqItems} defaultOpenId="faq-1" />
          </Container>
        </RevealOnScroll>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — FINAL CALL TO ACTION (#lien-he) */}
      {/* ========================================================================= */}
      <section id="lien-he" className="px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <RevealOnScroll animation="zoom-in">
          <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#f59e0b] text-white px-4 py-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Ambient Glows */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

            {/* Left Boho Organic Abstract Art Decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-40 sm:w-60 pointer-events-none select-none z-0 overflow-hidden opacity-85">
              <svg viewBox="0 0 200 500" preserveAspectRatio="none" className="w-full h-full">
                {/* Horizontal Ribs / Lines at Top */}
                <g stroke="#fcd3ba" strokeWidth="4" strokeLinecap="round" opacity="0.85">
                  <line x1="0" y1="20" x2="60" y2="20" />
                  <line x1="0" y1="32" x2="65" y2="32" />
                  <line x1="0" y1="44" x2="62" y2="44" />
                  <line x1="0" y1="56" x2="66" y2="56" />
                  <line x1="0" y1="68" x2="60" y2="68" />
                  <line x1="0" y1="80" x2="64" y2="80" />
                  <line x1="0" y1="92" x2="58" y2="92" />
                  <line x1="0" y1="104" x2="52" y2="104" />
                  <line x1="0" y1="116" x2="48" y2="116" />
                </g>

                {/* Upper-Middle Peach Blob */}
                <path
                  d="M 0 100 C 50 100, 110 130, 110 180 C 110 220, 60 250, 0 260 Z"
                  fill="#ffbe98"
                  opacity="0.75"
                />

                {/* Middle Ochre Shape */}
                <path
                  d="M 0 180 C 70 180, 100 230, 70 280 C 45 310, 20 330, 0 350 Z"
                  fill="#d8a47f"
                  opacity="0.65"
                />

                {/* Central Teal Organic Wave */}
                <path
                  d="M 0 210 C 60 220, 105 240, 100 280 C 95 320, 20 325, 20 355 C 20 385, 75 410, 70 450 C 65 480, 25 500, 0 500 Z"
                  fill="#245e59"
                  opacity="0.85"
                />

                {/* Dotted Pebble Pattern at Bottom */}
                <g fill="#5c3826" opacity="0.75">
                  <circle cx="15" cy="420" r="3.5" />
                  <circle cx="28" cy="415" r="3" />
                  <circle cx="40" cy="425" r="4" />
                  <circle cx="22" cy="435" r="3.5" />
                  <circle cx="35" cy="442" r="4.5" />
                  <circle cx="52" cy="436" r="3" />
                  <circle cx="65" cy="448" r="4" />
                  <circle cx="18" cy="455" r="4" />
                  <circle cx="32" cy="460" r="3.5" />
                  <circle cx="48" cy="468" r="4.5" />
                  <circle cx="62" cy="475" r="3" />
                  <circle cx="24" cy="480" r="4" />
                  <circle cx="38" cy="490" r="3.5" />
                  <circle cx="54" cy="492" r="4" />
                  <circle cx="12" cy="495" r="3" />
                </g>

                {/* Bottom Peach Shape */}
                <path
                  d="M 90 500 C 90 460, 140 440, 190 470 C 200 480, 200 500, 200 500 Z"
                  fill="#ffa97a"
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* Right Boho Organic Abstract Art Decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-40 sm:w-60 pointer-events-none select-none z-0 overflow-hidden opacity-85 transform scale-x-[-1]">
              <svg viewBox="0 0 200 500" preserveAspectRatio="none" className="w-full h-full">
                {/* Horizontal Ribs / Lines at Top */}
                <g stroke="#fcd3ba" strokeWidth="4" strokeLinecap="round" opacity="0.85">
                  <line x1="0" y1="20" x2="60" y2="20" />
                  <line x1="0" y1="32" x2="65" y2="32" />
                  <line x1="0" y1="44" x2="62" y2="44" />
                  <line x1="0" y1="56" x2="66" y2="56" />
                  <line x1="0" y1="68" x2="60" y2="68" />
                  <line x1="0" y1="80" x2="64" y2="80" />
                  <line x1="0" y1="92" x2="58" y2="92" />
                </g>

                {/* Upper-Middle Peach Blob */}
                <path
                  d="M 0 100 C 50 100, 110 130, 110 180 C 110 220, 60 250, 0 260 Z"
                  fill="#ffbe98"
                  opacity="0.75"
                />

                {/* Middle Ochre Shape */}
                <path
                  d="M 0 180 C 70 180, 100 230, 70 280 C 45 310, 20 330, 0 350 Z"
                  fill="#d8a47f"
                  opacity="0.65"
                />

                {/* Central Teal Organic Wave */}
                <path
                  d="M 0 210 C 60 220, 105 240, 100 280 C 95 320, 20 325, 20 355 C 20 385, 75 410, 70 450 C 65 480, 25 500, 0 500 Z"
                  fill="#245e59"
                  opacity="0.85"
                />

                {/* Dotted Pebble Pattern at Bottom */}
                <g fill="#5c3826" opacity="0.75">
                  <circle cx="15" cy="420" r="3.5" />
                  <circle cx="28" cy="415" r="3" />
                  <circle cx="40" cy="425" r="4" />
                  <circle cx="22" cy="435" r="3.5" />
                  <circle cx="35" cy="442" r="4.5" />
                  <circle cx="52" cy="436" r="3" />
                  <circle cx="65" cy="448" r="4" />
                  <circle cx="18" cy="455" r="4" />
                  <circle cx="32" cy="460" r="3.5" />
                  <circle cx="48" cy="468" r="4.5" />
                  <circle cx="62" cy="475" r="3" />
                  <circle cx="24" cy="480" r="4" />
                  <circle cx="38" cy="490" r="3.5" />
                  <circle cx="54" cy="492" r="4" />
                  <circle cx="12" cy="495" r="3" />
                </g>

                {/* Bottom Peach Shape */}
                <path
                  d="M 90 500 C 90 460, 140 440, 190 470 C 200 480, 200 500, 200 500 Z"
                  fill="#ffa97a"
                  opacity="0.8"
                />
              </svg>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                <span>Nhận Bảng Xếp Hạng</span>{' '}
                <span className="block xs:inline whitespace-nowrap">&amp; Deal Tốt Nhất Mỗi Tuần</span>
              </h2>

              <p className="text-[11.5px] min-[390px]:text-xs sm:text-sm md:text-base text-orange-100 max-w-xl mx-auto font-normal leading-relaxed">
                <span className="block whitespace-nowrap">Đăng ký ngay để nhận cẩm nang chọn mua độc quyền</span>
                <span className="block whitespace-nowrap">và danh sách Top 10 sản phẩm giảm giá thực chất nhất</span>
                <span className="block whitespace-nowrap">được lọc bởi chuyên gia.</span>
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto pt-2"
              >
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-md"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubscribing ? 'Đang gửi...' : 'Đăng ký ngay'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="text-[11px] text-orange-100/80 inline-flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-orange-200" />
                <span>Chúng tôi tôn trọng quyền riêng tư. Không spam. Huỷ đăng ký bất cứ lúc nào.</span>
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE SINGLE-PAGE MODALS */}
      {/* ========================================================================= */}

      {/* 1. PRODUCT DETAIL / REVIEW MODAL */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name || 'Chi Tiết Sản Phẩm'}
        maxWidth="4xl"
      >
        {selectedProduct && (
          <div className="space-y-6">
            {/* Header Product Info */}
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-full sm:w-48 h-44 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded-full">
                    {selectedProduct.brand} • {selectedProduct.category}
                  </span>
                  <ScoreBadge score={selectedProduct.score} size="md" />
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {selectedProduct.name}
                </h3>

                <div className="text-xl font-black text-orange-600">
                  {formatPrice(selectedProduct.price, selectedProduct.priceUnit)}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProduct.shortDescription}
                </p>
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Điểm Đánh Giá Chi Tiết Theo Trụ Cột (Thang Điểm 10)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Thiết Kế</div>
                  <div className="text-base font-black text-slate-900">{selectedProduct.scoreBreakdown.design}/10</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Hiệu Năng</div>
                  <div className="text-base font-black text-slate-900">{selectedProduct.scoreBreakdown.performance}/10</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Giá Trị P/P</div>
                  <div className="text-base font-black text-slate-900">{selectedProduct.scoreBreakdown.value}/10</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Độ Tiện Dụng</div>
                  <div className="text-base font-black text-slate-900">{selectedProduct.scoreBreakdown.usability}/10</div>
                </div>
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Ưu Điểm Nổi Bật
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedProduct.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Nhược Điểm Cần Lưu Ý
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedProduct.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deep Review Paragraph */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Đánh Giá Từ Phòng Lab TechReview
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedProduct.deepReview}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="hidden sm:inline text-xs text-slate-500 max-w-sm">
                Phù hợp nhất: <strong>{selectedProduct.bestFor}</strong>
              </span>
              <Button
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => {
                  showToast(`Đang chuyển hướng tới gian hàng chính hãng cho ${selectedProduct.name}`, { type: 'info' });
                  setSelectedProduct(null);
                }}
                leftIcon={<ShoppingCart className="w-4 h-4" />}
              >
                Xem nơi bán chính hãng
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 2. RANKING DETAIL MODAL */}
      <Modal
        isOpen={!!selectedRanking}
        onClose={() => setSelectedRanking(null)}
        title={selectedRanking?.title || 'Bảng Xếp Hạng Top 10'}
        maxWidth="4xl"
      >
        {selectedRanking && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Cập nhật: {selectedRanking.updatedAt}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedRanking.intro}
              </p>
            </div>

            {/* List of ranked items */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Danh Sách Xếp Hạng Chi Tiết
              </h4>

              <div className="space-y-3">
                {selectedRanking.items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <div
                      key={item.rank}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${item.rank === 1
                          ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/20'
                          : 'bg-white border-slate-200'
                        }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl font-black flex items-center justify-center text-sm shadow-xs flex-shrink-0 ${item.rank === 1
                              ? 'bg-amber-500 text-white ring-2 ring-amber-200'
                              : item.rank === 2
                                ? 'bg-slate-300 text-slate-800'
                                : item.rank === 3
                                  ? 'bg-amber-700 text-white'
                                  : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                          #{item.rank}
                        </div>

                        {product && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                          />
                        )}

                        <div className="min-w-0">
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                            {product?.name || item.productId}
                          </h5>
                          <p className="text-[11px] text-orange-600 font-semibold">{item.highlight}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                        {product && <ScoreBadge score={product.score} size="sm" />}
                        {product && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedRanking(null);
                              setSelectedProduct(product);
                            }}
                          >
                            Chi tiết
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conclusion */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <strong className="text-slate-900 block uppercase">Kết Luận Chung:</strong>
              <p>{selectedRanking.conclusion}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. ARTICLE / GUIDE DETAIL MODAL */}
      <Modal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        title={selectedArticle?.title || 'Cẩm Nang Chọn Mua'}
        maxWidth="4xl"
      >
        {selectedArticle && (
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden h-52 bg-slate-100 border border-slate-200">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{selectedArticle.publishedAt}</span>
                <span>•</span>
                <span>{selectedArticle.readingTime} đọc</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {selectedArticle.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {selectedArticle.excerpt}
              </p>
            </div>

            {/* Article Body Content */}
            <div className="space-y-4 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {selectedArticle.tags.map((tag, idx) => (
                <span key={idx} className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200/60">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
