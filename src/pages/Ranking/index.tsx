import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { QuickPick } from '../../components/ranking/QuickPick';
import { RankingItem } from '../../components/ranking/RankingItem';
import { ComparisonMatrix } from '../../components/ranking/ComparisonMatrix';
import { AuthorCard } from '../../components/article/AuthorCard';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Calendar, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const RankingDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { rankings, products, experts, categories } = useData();

  const ranking = rankings.find((r) => r.slug === slug) || rankings[0];
  const author = experts.find((e) => e.id === ranking.authorId) || experts[0];

  const bestOverallProd = products.find((p) => p.id === ranking.quickPicks.bestOverallId);
  const bestValueProd = products.find((p) => p.id === ranking.quickPicks.bestValueId);
  const bestPremiumProd = products.find((p) => p.id === ranking.quickPicks.bestPremiumId);

  const matchedCat = categories.find((c) => c.slug === ranking.categorySlug || c.groupSlug === ranking.groupSlug);

  // Products in this ranking
  const rankedProducts = ranking.items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter(Boolean) as typeof products;

  const faqAccordionItems = ranking.faq.map((item, idx) => ({
    id: `rank-faq-${idx}`,
    title: item.q,
    content: item.a
  }));

  return (
    <div className="space-y-16 pb-20">
      {/* Clean Compact Header Section with Warm Cream Background */}
      <section className="bg-[#FAF7F5] border-b border-stone-200/80 py-4 sm:py-8 w-full overflow-hidden">
        <Container size="xl">
          <div className="w-full max-w-full overflow-hidden mb-3">
            <div className="inline-block max-w-full px-2.5 py-1 rounded-lg bg-white/90 border border-stone-200/70 shadow-2xs overflow-hidden">
              <Breadcrumb
                items={[
                  { label: ranking.type === 'physical' ? 'Sản phẩm vật lý' : 'Sản phẩm số', path: ranking.type === 'physical' ? '/san-pham-vat-ly' : '/san-pham-so' },
                  { label: 'Bảng xếp hạng' },
                  { label: ranking.title }
                ]}
              />
            </div>
          </div>

          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
              <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-orange-100/90 text-orange-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-orange-200/60">
                <Award className="w-3 h-3 text-orange-600 flex-shrink-0" />
                BẢNG XẾP HẠNG TOP ĐÃ THỬ NGHIỆM
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-600 font-medium flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-md border border-stone-200/70">
                <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
                Cập nhật: <strong className="text-slate-800">{ranking.updatedAt}</strong>
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug break-words">
              {ranking.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {ranking.subtitle}
            </p>

            {/* Author quick preview */}
            {author && (
              <div className="flex items-center gap-2.5 pt-1">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-2xs flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                  }}
                />
                <div className="text-[11px] min-w-0">
                  <span className="font-bold text-slate-900 leading-none">{author.name}</span>
                  <span className="text-slate-500 ml-1.5">• {author.role}</span>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Main Ranking Layout */}
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full min-w-0">
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12 min-w-0 w-full">
            {/* Intro & Methodology with Featured Image */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
              {/* Featured Lab Testing Image */}
              <div className="w-full h-48 sm:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={
                    ranking.image ||
                    (ranking.type === 'physical'
                      ? '/airfryer-lab-testing.jpg'
                      : 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80')
                  }
                  alt={ranking.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 sm:left-4 text-[11px] sm:text-xs font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 sm:px-3 py-1 rounded-lg border border-white/20 flex items-center gap-1.5 max-w-[90%]">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span className="truncate">Quy trình thử nghiệm phòng lab & thực tế</span>
                </span>
              </div>

              <div className="p-4 sm:p-6 lg:p-8 space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Phương Pháp Thử Nghiệm & Đánh Giá
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {ranking.intro}
                </p>
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-orange-50/70 border border-orange-100/90 space-y-1.5">
                  <span className="text-[11px] sm:text-xs font-bold text-orange-800 uppercase tracking-wider block">
                    Tiêu chuẩn kiểm tra:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {ranking.methodology}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Picks */}
            <QuickPick
              bestOverall={bestOverallProd}
              bestValue={bestValueProd}
              bestPremium={bestPremiumProd}
            />

            {/* Comparison Matrix Table */}
            <ComparisonMatrix products={rankedProducts} />

            {/* Detailed Ranking List */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Chi Tiết Đánh Giá Từng Sản Phẩm Trong Bảng Xếp Hạng
              </h2>

              <div className="space-y-6 sm:space-y-8">
                {ranking.items.map((item) => {
                  const prod = products.find((p) => p.id === item.productId);
                  if (!prod) return null;
                  return <RankingItem key={item.rank} item={item} product={prod} />;
                })}
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-3 sm:space-y-4 shadow-lg">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Tổng kết từ ban biên tập
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Lời khuyên lựa chọn cuối cùng
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {ranking.conclusion}
              </p>
            </div>

            {/* Author Card */}
            {author && <AuthorCard expert={author} />}

            {/* FAQ */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Câu Hỏi Thường Gặp Về Bảng Xếp Hạng Này
              </h2>
              <Accordion items={faqAccordionItems} />
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Table of contents / Quick jump to rank */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Nhảy nhanh đến thứ hạng
              </h3>
              <div className="space-y-2">
                {ranking.items.map((item) => {
                  const prod = products.find((p) => p.id === item.productId);
                  if (!prod) return null;
                  return (
                    <a
                      key={item.rank}
                      href={`#rank-${item.rank}`}
                      className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors border border-transparent hover:border-slate-200"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="w-5 h-5 rounded-md bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                          #{item.rank}
                        </span>
                        <span className="truncate">{prod.name}</span>
                      </span>
                      <span className="text-indigo-600 font-bold ml-2">{prod.score}</span>
                    </a>
                  );
                })}
              </div>

              {/* Trust Box */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <ShieldCheck className="w-4 h-4" /> 100% Đánh giá khách quan
                </div>
                <p>Chúng tôi không nhận tài trợ quảng cáo để thay đổi thứ hạng sản phẩm.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
