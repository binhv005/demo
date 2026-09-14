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
      {/* Header Section */}
      <section className="bg-gradient-to-b from-slate-100/80 via-white to-slate-50 border-b border-slate-200/60 py-10">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: ranking.type === 'physical' ? 'Sản phẩm vật lý' : 'Sản phẩm số', path: ranking.type === 'physical' ? '/san-pham-vat-ly' : '/san-pham-so' },
              { label: 'Bảng xếp hạng' },
              { label: ranking.title }
            ]}
          />

          <div className="mt-6 space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                Bảng Xếp Hạng Top Đã Thử Nghiệm
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Cập nhật lần cuối: <strong className="text-slate-700">{ranking.updatedAt}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {ranking.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {ranking.subtitle}
            </p>

            {/* Author quick preview */}
            {author && (
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">{author.name}</span>
                  <span className="text-slate-500">{author.role}</span>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Main Ranking Layout */}
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Intro & Methodology */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Phương Pháp Thử Nghiệm & Đánh Giá
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {ranking.intro}
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                  Tiêu chuẩn kiểm tra:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {ranking.methodology}
                </p>
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
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Chi Tiết Đánh Giá Từng Sản Phẩm Trong Bảng Xếp Hạng
              </h2>

              <div className="space-y-8">
                {ranking.items.map((item) => {
                  const prod = products.find((p) => p.id === item.productId);
                  if (!prod) return null;
                  return <RankingItem key={item.rank} item={item} product={prod} />;
                })}
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4 shadow-lg">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Tổng kết từ ban biên tập
              </span>
              <h3 className="text-2xl font-bold tracking-tight">
                Lời khuyên lựa chọn cuối cùng
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {ranking.conclusion}
              </p>
            </div>

            {/* Author Card */}
            {author && <AuthorCard expert={author} />}

            {/* FAQ */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
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
