import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ScoreBadge } from '../../components/ui/ScoreBadge';
import { formatPrice } from '../../utils/formatters';
import { Trophy, Check, X, ArrowRight, ShieldCheck, Scale, Sparkles, ThumbsUp, ThumbsDown, BarChart3, SlidersHorizontal, Target, TrendingDown, CheckCircle2 } from 'lucide-react';

export const ComparisonDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { comparisons, products, experts } = useData();

  const comparison = comparisons.find((c) => c.slug === slug) || comparisons[0];
  const prodA =
    products.find((p) => p.id === comparison?.productAId || p.slug === comparison?.productAId) ||
    products[0];
  const prodB =
    products.find((p) => p.id === comparison?.productBId || p.slug === comparison?.productBId) ||
    products[1];
  const winnerProd =
    products.find((p) => p.id === comparison?.winnerId || p.slug === comparison?.winnerId) || prodA;
  const author = experts.find((e) => e.id === comparison?.authorId) || experts[0];

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

          {/* FEATURE COMPARISON TABLE (Dựa trên thông số thực tế của sản phẩm & Chuyên sâu) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <Scale className="w-6 h-6 text-indigo-600" />
                  Bảng So Sánh Tính Năng & Chi Tiết Đối Đầu
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tổng hợp đối đầu trực quan từ thông số kỹ thuật thực tế, điểm số chuyên gia và tính năng nổi bật
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm min-w-[650px] border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-slate-800">
                    <th className="p-4 sm:p-5 font-bold w-1/3 min-w-[180px]">Tiêu chí so sánh</th>
                    <th className="p-4 sm:p-5 font-bold w-1/3 text-center min-w-[220px]">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{prodA.brand}</span>
                        <span className="text-sm sm:text-base font-extrabold text-white line-clamp-1">{prodA.name}</span>
                        <span className="text-xs font-bold text-orange-400">{formatPrice(prodA.price, prodA.priceUnit)}</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 font-bold w-1/3 text-center min-w-[220px]">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{prodB.brand}</span>
                        <span className="text-sm sm:text-base font-extrabold text-white line-clamp-1">{prodB.name}</span>
                        <span className="text-xs font-bold text-orange-400">{formatPrice(prodB.price, prodB.priceUnit)}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* --- PHẦN 1: ĐIỂM SỐ & GIÁ BÁN THỰC TẾ --- */}
                  <tr className="bg-indigo-50/70 border-y border-indigo-100/80">
                    <td colSpan={3} className="px-4 py-2.5 font-black text-xs text-indigo-900 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-indigo-600" />
                        <span>Điểm Đánh Giá & Giá Bán</span>
                      </span>
                    </td>
                  </tr>

                  {/* Giá tham khảo */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">
                      Giá tham khảo
                    </td>
                    <td className={`p-4 text-center font-bold ${prodA.price <= prodB.price ? 'bg-emerald-50/60 text-emerald-900' : 'text-slate-700'}`}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm">{formatPrice(prodA.price, prodA.priceUnit)}</span>
                        {prodA.price < prodB.price && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" />
                            <span>Giá tốt hơn</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className={`p-4 text-center font-bold ${prodB.price <= prodA.price ? 'bg-emerald-50/60 text-emerald-900' : 'text-slate-700'}`}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm">{formatPrice(prodB.price, prodB.priceUnit)}</span>
                        {prodB.price < prodA.price && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" />
                            <span>Giá tốt hơn</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Điểm tổng quan */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">
                      Điểm tổng thể TechReview
                    </td>
                    <td className={`p-4 text-center font-bold ${prodA.score >= prodB.score ? 'bg-emerald-50/60 text-emerald-900' : 'text-slate-700'}`}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm">{prodA.score} / 10</span>
                        {prodA.score > prodB.score && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Thắng thế</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className={`p-4 text-center font-bold ${prodB.score >= prodA.score ? 'bg-emerald-50/60 text-emerald-900' : 'text-slate-700'}`}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm">{prodB.score} / 10</span>
                        {prodB.score > prodA.score && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Thắng thế</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Score Breakdown Rows */}
                  {prodA.scoreBreakdown && prodB.scoreBreakdown && (
                    <>
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">
                          Điểm Thiết kế & Hoàn thiện
                        </td>
                        <td className={`p-4 text-center font-medium ${prodA.scoreBreakdown.design >= prodB.scoreBreakdown.design ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span>{prodA.scoreBreakdown.design} / 10</span>
                            {prodA.scoreBreakdown.design > prodB.scoreBreakdown.design && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Thắng thế</span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={`p-4 text-center font-medium ${prodB.scoreBreakdown.design >= prodA.scoreBreakdown.design ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span>{prodB.scoreBreakdown.design} / 10</span>
                            {prodB.scoreBreakdown.design > prodA.scoreBreakdown.design && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Thắng thế</span>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">
                          Điểm Hiệu năng hoạt động
                        </td>
                        <td className={`p-4 text-center font-medium ${prodA.scoreBreakdown.performance >= prodB.scoreBreakdown.performance ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span>{prodA.scoreBreakdown.performance} / 10</span>
                            {prodA.scoreBreakdown.performance > prodB.scoreBreakdown.performance && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Thắng thế</span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={`p-4 text-center font-medium ${prodB.scoreBreakdown.performance >= prodA.scoreBreakdown.performance ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span>{prodB.scoreBreakdown.performance} / 10</span>
                            {prodB.scoreBreakdown.performance > prodA.scoreBreakdown.performance && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Thắng thế</span>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">
                          Độ đáng tiền (P/P)
                        </td>
                        <td className={`p-4 text-center font-medium ${prodA.scoreBreakdown.value >= prodB.scoreBreakdown.value ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span>{prodA.scoreBreakdown.value} / 10</span>
                            {prodA.scoreBreakdown.value > prodB.scoreBreakdown.value && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Thắng thế</span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={`p-4 text-center font-medium ${prodB.scoreBreakdown.value >= prodA.scoreBreakdown.value ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span>{prodB.scoreBreakdown.value} / 10</span>
                            {prodB.scoreBreakdown.value > prodA.scoreBreakdown.value && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Thắng thế</span>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">
                          Độ thân thiện & Dễ sử dụng
                        </td>
                        <td className={`p-4 text-center font-medium ${prodA.scoreBreakdown.usability >= prodB.scoreBreakdown.usability ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span>{prodA.scoreBreakdown.usability} / 10</span>
                            {prodA.scoreBreakdown.usability > prodB.scoreBreakdown.usability && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Thắng thế</span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={`p-4 text-center font-medium ${prodB.scoreBreakdown.usability >= prodA.scoreBreakdown.usability ? 'bg-emerald-50/60 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span>{prodB.scoreBreakdown.usability} / 10</span>
                            {prodB.scoreBreakdown.usability > prodA.scoreBreakdown.usability && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Thắng thế</span>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    </>
                  )}

                  {/* --- PHẦN 2: THÔNG SỐ KỸ THUẬT THỰC TẾ (SPECS) --- */}
                  {Object.keys(prodA.specs || prodB.specs || {}).length > 0 && (
                    <tr className="bg-indigo-50/70 border-y border-indigo-100/80">
                      <td colSpan={3} className="px-4 py-2.5 font-black text-xs text-indigo-900 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                          <span>Thông Số Kỹ Thuật Chi Tiết Của Sản Phẩm</span>
                        </span>
                      </td>
                    </tr>
                  )}

                  {Array.from(new Set([...Object.keys(prodA.specs || {}), ...Object.keys(prodB.specs || {})])).map((specKey) => (
                    <tr key={specKey} className="hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">
                        {specKey}
                      </td>
                      <td className="p-4 text-center text-slate-700 font-medium">
                        {prodA.specs?.[specKey] || '—'}
                      </td>
                      <td className="p-4 text-center text-slate-700 font-medium">
                        {prodB.specs?.[specKey] || '—'}
                      </td>
                    </tr>
                  ))}

                  {/* --- PHẦN 3: ĐỐI TƯỢNG PHÙ HỢP --- */}
                  <tr className="bg-indigo-50/70 border-y border-indigo-100/80">
                    <td colSpan={3} className="px-4 py-2.5 font-black text-xs text-indigo-900 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-indigo-600" />
                        <span>Đối Tượng Sử Dụng Phù Hợp Nhất</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">
                      Khuyên dùng cho
                    </td>
                    <td className="p-4 text-center text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {prodA.bestFor || 'Người dùng thông thường'}
                    </td>
                    <td className="p-4 text-center text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {prodB.bestFor || 'Người dùng thông thường'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


          {/* PROS & CONS SIDE BY SIDE */}
          {/* PROS & CONS COMBINED TABLE (Lấy trực tiếp từ dữ liệu sản phẩm) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <ThumbsUp className="w-6 h-6 text-emerald-600" />
                  Ưu & Nhược Điểm Đối Chiếu
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tổng hợp ưu điểm và điểm cần lưu ý thực tế của từng sản phẩm từ dữ liệu kiểm nghiệm
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm min-w-[700px] border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-slate-800">
                    <th className="p-4 sm:p-5 font-bold w-1/4 min-w-[200px]">Sản phẩm</th>
                    <th className="p-4 sm:p-5 font-bold text-emerald-300 bg-slate-900/90 w-3/8">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
                          <Check className="w-4 h-4" />
                        </span>
                        <span className="text-sm font-bold">Ưu điểm nổi bật</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 font-bold text-rose-300 bg-slate-900/90 w-3/8">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-rose-500/20 text-rose-300">
                          <X className="w-4 h-4" />
                        </span>
                        <span className="text-sm font-bold">Điểm cần lưu ý</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Product A */}
                  <tr className="hover:bg-slate-50/40">
                    <td className="p-5 font-bold text-slate-900 align-top bg-slate-50/30 border-r border-slate-100">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={prodA.image}
                            alt={prodA.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0 shadow-xs"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{prodA.brand}</span>
                            <span className="text-sm font-black text-slate-900 line-clamp-2 leading-snug">{prodA.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ScoreBadge score={prodA.score} size="sm" />
                          <span className="text-xs font-bold text-orange-600">{formatPrice(prodA.price, prodA.priceUnit)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 align-top bg-emerald-50/20 border-r border-slate-100">
                      {(prodA.pros && prodA.pros.length > 0) ? (
                        <ul className="space-y-2.5">
                          {prodA.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                              <span className="leading-snug">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Đang cập nhật ưu điểm sản phẩm...</p>
                      )}
                    </td>
                    <td className="p-5 align-top bg-rose-50/20">
                      {(prodA.cons && prodA.cons.length > 0) ? (
                        <ul className="space-y-2.5">
                          {prodA.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <span className="p-0.5 rounded-full bg-rose-100 text-rose-700 mt-0.5 flex-shrink-0">
                                <X className="w-3.5 h-3.5" />
                              </span>
                              <span className="leading-snug">{con}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Không có nhược điểm đáng kể.</p>
                      )}
                    </td>
                  </tr>

                  {/* Product B */}
                  <tr className="hover:bg-slate-50/40">
                    <td className="p-5 font-bold text-slate-900 align-top bg-slate-50/30 border-r border-slate-100">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={prodB.image}
                            alt={prodB.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0 shadow-xs"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{prodB.brand}</span>
                            <span className="text-sm font-black text-slate-900 line-clamp-2 leading-snug">{prodB.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ScoreBadge score={prodB.score} size="sm" />
                          <span className="text-xs font-bold text-orange-600">{formatPrice(prodB.price, prodB.priceUnit)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 align-top bg-emerald-50/20 border-r border-slate-100">
                      {(prodB.pros && prodB.pros.length > 0) ? (
                        <ul className="space-y-2.5">
                          {prodB.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                              <span className="leading-snug">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Đang cập nhật ưu điểm sản phẩm...</p>
                      )}
                    </td>
                    <td className="p-5 align-top bg-rose-50/20">
                      {(prodB.cons && prodB.cons.length > 0) ? (
                        <ul className="space-y-2.5">
                          {prodB.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <span className="p-0.5 rounded-full bg-rose-100 text-rose-700 mt-0.5 flex-shrink-0">
                                <X className="w-3.5 h-3.5" />
                              </span>
                              <span className="leading-snug">{con}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Không có nhược điểm đáng kể.</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
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
        </div>
      </Container>
    </div>
  );
};
