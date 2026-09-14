import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ScoreBadge } from '../../components/ui/ScoreBadge';
import { ProsCons } from '../../components/product/ProsCons';
import { AuthorCard } from '../../components/article/AuthorCard';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { formatPrice } from '../../utils/formatters';
import { Trophy, Check, X, ArrowRight, ShieldCheck, Scale, Sparkles } from 'lucide-react';

export const ComparisonDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { comparisons, products, experts } = useData();

  const comparison = comparisons.find((c) => c.slug === slug) || comparisons[0];
  const prodA = products.find((p) => p.id === comparison.productAId) || products[0];
  const prodB = products.find((p) => p.id === comparison.productBId) || products[1];
  const winnerProd = products.find((p) => p.id === comparison.winnerId) || prodA;
  const author = experts.find((e) => e.id === comparison.authorId) || experts[0];

  const faqAccordionItems = comparison.faq.map((item, idx) => ({
    id: `comp-faq-${idx}`,
    title: item.q,
    content: item.a
  }));

  return (
    <div className="space-y-16 pb-20">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/60 py-10">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: comparison.type === 'physical' ? 'Sản phẩm vật lý' : 'Sản phẩm số', path: comparison.type === 'physical' ? '/san-pham-vat-ly' : '/san-pham-so' },
              { label: 'So sánh sản phẩm' },
              { label: `${prodA.name} vs ${prodB.name}` }
            ]}
          />

          <div className="mt-6 space-y-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                So Sánh Đối Đầu Thực Tế
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Cập nhật: {comparison.updatedAt}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {comparison.title}
            </h1>
          </div>

          {/* Versus Header Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Product A */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 flex items-center gap-5 shadow-sm">
              <img
                src={prodA.image}
                alt={prodA.name}
                className="w-24 h-24 rounded-2xl object-cover border border-slate-100 shadow-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ScoreBadge score={prodA.score} size="sm" />
                  <span className="text-xs font-semibold text-slate-500">{prodA.brand}</span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 line-clamp-1">{prodA.name}</h3>
                <span className="font-bold text-slate-900 text-sm block">
                  {formatPrice(prodA.price, prodA.priceUnit)}
                </span>
                <Link to={`/review/${prodA.slug}`} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-block">
                  Xem đánh giá riêng →
                </Link>
              </div>
            </div>

            {/* Product B */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 flex items-center gap-5 shadow-sm">
              <img
                src={prodB.image}
                alt={prodB.name}
                className="w-24 h-24 rounded-2xl object-cover border border-slate-100 shadow-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ScoreBadge score={prodB.score} size="sm" />
                  <span className="text-xs font-semibold text-slate-500">{prodB.brand}</span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 line-clamp-1">{prodB.name}</h3>
                <span className="font-bold text-slate-900 text-sm block">
                  {formatPrice(prodB.price, prodB.priceUnit)}
                </span>
                <Link to={`/review/${prodB.slug}`} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-block">
                  Xem đánh giá riêng →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Body */}
      <Container size="xl">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* OVERALL WINNER BANNER */}
          <div className="bg-gradient-to-r from-emerald-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Trophy className="w-3.5 h-3.5 text-amber-300" /> Chiến Thắng Chung Cuộc
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {winnerProd.name}
              </h3>
              <p className="text-xs sm:text-sm text-indigo-100 max-w-xl leading-relaxed">
                {comparison.verdict}
              </p>
            </div>
            <ScoreBadge score={winnerProd.score} size="lg" showLabel className="bg-white/20 backdrop-blur-md border border-white/30" />
          </div>

          {/* FEATURE COMPARISON TABLE (Horizontal Scroll on Mobile) */}
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Bảng So Sánh Tính Năng & Chi Tiết Đối Đầu
            </h2>
            <p className="text-xs text-slate-500">
              Vuốt ngang để so sánh chi tiết từng tiêu chí giữa 2 sản phẩm
            </p>

            <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="p-4 font-bold text-slate-900 w-1/3">Tiêu chí so sánh</th>
                    <th className="p-4 font-bold text-slate-900 w-1/3 text-center">{prodA.name}</th>
                    <th className="p-4 font-bold text-slate-900 w-1/3 text-center">{prodB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparison.features.map((feat, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-800 bg-slate-50/30">
                        {feat.feature}
                      </td>
                      <td
                        className={`p-4 text-center font-medium ${
                          feat.winner === 'A' ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span>{feat.productA}</span>
                          {feat.winner === 'A' && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                              Thắng thế ★
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className={`p-4 text-center font-medium ${
                          feat.winner === 'B' ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span>{feat.productB}</span>
                          {feat.winner === 'B' && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                              Thắng thế ★
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EXPERIENCE COMPARISON */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              So Sánh Trải Nghiệm Sử Dụng Thực Tế
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {comparison.experienceComparison}
            </p>
          </div>

          {/* PROS & CONS SIDE BY SIDE */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Ưu & Nhược Điểm Đối Chiếu
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  {prodA.name}
                </h3>
                <ProsCons pros={prodA.pros} cons={prodA.cons} />
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  {prodB.name}
                </h3>
                <ProsCons pros={prodB.pros} cons={prodB.cons} />
              </div>
            </div>
          </div>

          {/* FINAL RECOMMENDATION */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4 shadow-lg">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              Lời khuyên của chuyên gia
            </span>
            <h3 className="text-2xl font-bold tracking-tight">
              Bạn Nên Chọn Sản Phẩm Nào?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {comparison.finalRecommendation}
            </p>
          </div>

          {/* Author Card */}
          {author && <AuthorCard expert={author} />}

          {/* FAQ */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Câu Hỏi Thường Gặp Khi Phân Vân Giữa 2 Sản Phẩm
            </h2>
            <Accordion items={faqAccordionItems} />
          </div>
        </div>
      </Container>
    </div>
  );
};
