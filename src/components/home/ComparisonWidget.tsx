import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ScoreBadge } from '../ui/ScoreBadge';
import { formatPrice } from '../../utils/formatters';
import {
  Scale,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Eye,
  ListFilter
} from 'lucide-react';

export const ComparisonWidget: React.FC = () => {
  const { comparisons, products } = useData();

  // Filter published comparisons, prioritizing single featured one
  const publishedComparisons = useMemo(() => {
    return comparisons.filter((c) => c.status !== 'draft');
  }, [comparisons]);

  const activeComparison = useMemo(() => {
    return publishedComparisons.find((c) => c.isFeatured) || publishedComparisons[0];
  }, [publishedComparisons]);

  if (!activeComparison) return null;

  const productA = products.find(
    (p) => p.id === activeComparison.productAId || p.slug === activeComparison.productAId
  );
  const productB = products.find(
    (p) => p.id === activeComparison.productBId || p.slug === activeComparison.productBId
  );

  const isWinnerA =
    productA &&
    (activeComparison.winnerId === productA.id ||
      activeComparison.winnerId === productA.slug ||
      activeComparison.winnerId === activeComparison.productAId ||
      activeComparison.winnerId === 'A');

  const isWinnerB =
    productB &&
    (activeComparison.winnerId === productB.id ||
      activeComparison.winnerId === productB.slug ||
      activeComparison.winnerId === activeComparison.productBId ||
      activeComparison.winnerId === 'B');

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-orange-600/90 text-[11px] font-black uppercase tracking-wider text-white mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Đối Đầu Tiêu Điểm</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
            {activeComparison.title}
          </h3>
        </div>

        <Link
          to={`/so-sanh/${activeComparison.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-xs flex-shrink-0 cursor-pointer"
        >
          <span>Xem chi tiết đối đầu</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Comparison Area */}
      <div className="p-5 sm:p-8 pt-7 sm:pt-9 space-y-6 sm:space-y-8">
        {/* Two Products Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-6 relative pt-2">
          {/* VS Center Badge for Desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-orange-500 text-white font-black text-sm items-center justify-center shadow-xl ring-4 ring-white">
            VS
          </div>

          {/* PRODUCT A */}
          {productA && (
            <div
              className={`relative rounded-2xl p-5 sm:p-6 pt-6 sm:pt-6 border transition-all ${
                isWinnerA
                  ? 'bg-gradient-to-b from-orange-50/50 to-white border-orange-300 ring-2 ring-orange-400/30'
                  : 'bg-white border-slate-200'
              }`}
            >
              {isWinnerA && (
                <div className="absolute -top-3 left-4 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-orange-600 text-white text-[11px] font-black shadow-md">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  SẢN PHẨM KHUYÊN DÙNG #1
                </div>
              )}

              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                  <img
                    src={productA.image}
                    alt={productA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {productA.brand}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                    {productA.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <ScoreBadge score={productA.score} size="sm" />
                    <span className="text-xs sm:text-sm font-black text-orange-600">
                      {formatPrice(productA.price, productA.priceUnit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlights & Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <p className="text-slate-600 line-clamp-1 flex-1">
                  <strong className="text-slate-800">Điểm mạnh:</strong> {productA.shortDescription}
                </p>
                <Link
                  to={`/danh-gia/${productA.slug}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-600 font-bold text-[11px] text-slate-700 transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* PRODUCT B */}
          {productB && (
            <div
              className={`relative rounded-2xl p-5 sm:p-6 pt-6 sm:pt-6 border transition-all ${
                isWinnerB
                  ? 'bg-gradient-to-b from-orange-50/50 to-white border-orange-300 ring-2 ring-orange-400/30'
                  : 'bg-white border-slate-200'
              }`}
            >
              {isWinnerB && (
                <div className="absolute -top-3 left-4 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-orange-600 text-white text-[11px] font-black shadow-md">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  SẢN PHẨM KHUYÊN DÙNG #1
                </div>
              )}

              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                  <img
                    src={productB.image}
                    alt={productB.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {productB.brand}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                    {productB.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <ScoreBadge score={productB.score} size="sm" />
                    <span className="text-xs sm:text-sm font-black text-orange-600">
                      {formatPrice(productB.price, productB.priceUnit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlights & Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <p className="text-slate-600 line-clamp-1 flex-1">
                  <strong className="text-slate-800">Điểm mạnh:</strong> {productB.shortDescription}
                </p>
                <Link
                  to={`/danh-gia/${productB.slug}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-600 font-bold text-[11px] text-slate-700 transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Expert Verdict Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
          <div className="space-y-1">
            <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Kết Luận Chuyên Gia
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeComparison.verdict}
            </p>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <Link
            to={`/so-sanh/${activeComparison.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer group"
          >
            <span>Đọc bài phân tích đối đầu chi tiết</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/so-sanh"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline transition-colors"
          >
            <span>Xem toàn bộ các bài so sánh</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
