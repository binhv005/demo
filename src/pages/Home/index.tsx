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
  TrendingUp
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

  const physicalCategories = categories.filter((c) => c.group === 'physical' && c.status !== 'inactive');
  const digitalCategories = categories.filter((c) => c.group === 'digital' && c.status !== 'inactive');
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
      {/* SECTION 1 — HERO */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200/60">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Nền tảng Đánh giá & So sánh Sản phẩm Độc lập</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Tìm sản phẩm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600">
                  phù hợp nhất với bạn.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Khám phá đánh giá chuyên sâu, bảng xếp hạng Top 10 và so sánh sản phẩm vật lý & số để đưa ra lựa chọn mua sắm thông minh, tiết kiệm thời gian và tiền bạc.
              </p>

              {/* Big Search Box */}
              <div className="pt-2">
                <form
                  onSubmit={handleSearch}
                  className="p-2 bg-white rounded-2xl shadow-xl shadow-indigo-100/60 border border-slate-200/90 flex flex-col sm:flex-row items-center gap-2"
                >
                  <div className="relative flex-1 w-full">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      placeholder="Bạn đang tìm sản phẩm, bảng xếp hạng hoặc công cụ gì?"
                      className="w-full pl-12 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto px-6 py-3 font-bold">
                    Tìm kiếm
                  </Button>
                </form>

                {/* Suggestions Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-400">Gợi ý:</span>
                  {searchSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-2xs font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/san-pham-vat-ly">
                  <Button variant="secondary" size="lg" leftIcon={<Flame className="w-4 h-4 text-orange-500" />}>
                    Khám phá sản phẩm vật lý
                  </Button>
                </Link>
                <Link to="/san-pham-so">
                  <Button variant="outline" size="lg" leftIcon={<Sparkles className="w-4 h-4 text-indigo-500" />}>
                    Khám phá sản phẩm số
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual UI Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative space-y-4">
                {/* Floating Card 1: Top 1 Highlight */}
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 transform lg:-rotate-1 hover:rotate-0 transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold uppercase">
                      #1 Top Nồi chiên không dầu
                    </span>
                    <ScoreBadge score={9.4} size="sm" />
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=200&q=80"
                      alt="AirCook Pro"
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">AirCook Pro 6L Smart Fryer</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Chín giòn 360° • Men gốm Ceramic an toàn</p>
                      <span className="text-xs font-extrabold text-indigo-600 mt-1 block">2.490.000 đ</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2: AI Tool Pick */}
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 ml-0 sm:ml-8 transform lg:rotate-2 hover:rotate-0 transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold uppercase">
                      #1 Trợ lý Lập trình AI
                    </span>
                    <ScoreBadge score={9.6} size="sm" />
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=200&q=80"
                      alt="Claude 3.5 Sonnet"
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Claude 3.5 Sonnet (Pro)</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Tính năng Artifacts • Code chính xác 93.7%</p>
                      <span className="text-xs font-extrabold text-emerald-600 mt-1 block">499.000 đ/tháng</span>
                    </div>
                  </div>
                </div>

                {/* Trust stats pill */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold">Tiêu chuẩn thử nghiệm phòng Lab</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-400">100% Khách quan</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — DANH MỤC SẢN PHẨM VẬT LÝ */}
      <section>
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> Trực quan & Thực tế
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Danh Mục Sản Phẩm Vật Lý
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Thiết bị gia đình, công nghệ đời sống và phụ kiện chăm sóc sức khỏe đã qua kiểm nghiệm thực tế.
              </p>
            </div>
            <Link to="/san-pham-vat-ly">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem tất cả ({physicalCategories.length} danh mục)
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {physicalCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.groupSlug}/${cat.subcategories[0]?.slug || cat.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-orange-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderCategoryIcon(cat.icon, 'w-6 h-6')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {cat.count}+ bài đánh giá
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-orange-600">
                  <span>Khám phá</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 3 — DANH MỤC SẢN PHẨM SỐ */}
      <section>
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Năng suất & Chuyển đổi số
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Danh Mục Sản Phẩm Số & Công Cụ AI
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Mô hình AI, giải pháp phần mềm SaaS, hosting, VPN và công cụ tối ưu hóa công việc.
              </p>
            </div>
            <Link to="/san-pham-so">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem tất cả ({digitalCategories.length} danh mục)
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {digitalCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.groupSlug}/${cat.subcategories[0]?.slug || cat.slug}`}
                className="bg-gradient-to-b from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderCategoryIcon(cat.icon, 'w-6 h-6')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {cat.count}+ giải pháp
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-indigo-600">
                  <span>Xem ngay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {featuredArticle && (
              <div className="lg:col-span-7">
                <ArticleCard article={featuredArticle} variant="featured" className="h-full" />
              </div>
            )}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {otherArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 7 — TRUST & METHODOLOGY */}
      <section id="trust" className="bg-slate-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <Container size="xl">
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
