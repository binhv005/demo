import React, { useState } from 'react';
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
  const [selectedCompId, setSelectedCompId] = useState<string>(
    comparisons[0]?.id || ''
  );
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const activeComparison =
    comparisons.find((c) => c.id === selectedCompId) || comparisons[0];

  if (!activeComparison) return null;

  const productA = products.find((p) => p.id === activeComparison.productAId);
  const productB = products.find((p) => p.id === activeComparison.productBId);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header / Comparison Selector Tabs */}
      <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800">
        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-black text-white line-clamp-1">
            {activeComparison.title}
          </h3>
        </div>

        {/* Quick Comparison Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-1 md:pt-0">
          {comparisons.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCompId(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCompId === c.id
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {c.type === 'physical' ? (
                <span className="inline-flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" /> Gia Dụng
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Trợ Lý AI
                </span>
              )}
            </button>
          ))}
        </div>
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
                activeComparison.winnerId === productA.id
                  ? 'bg-gradient-to-b from-orange-50/50 to-white border-orange-300 ring-2 ring-orange-400/30'
                  : 'bg-white border-slate-200'
              }`}
            >
              {activeComparison.winnerId === productA.id && (
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

              {/* Highlights */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <p className="line-clamp-2">
                  <strong className="text-slate-800">Điểm mạnh:</strong> {productA.shortDescription}
                </p>
              </div>
            </div>
          )}

          {/* PRODUCT B */}
          {productB && (
            <div
              className={`relative rounded-2xl p-5 sm:p-6 pt-6 sm:pt-6 border transition-all ${
                activeComparison.winnerId === productB.id
                  ? 'bg-gradient-to-b from-orange-50/50 to-white border-orange-300 ring-2 ring-orange-400/30'
                  : 'bg-white border-slate-200'
              }`}
            >
              {activeComparison.winnerId === productB.id && (
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

              {/* Highlights */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <p className="line-clamp-2">
                  <strong className="text-slate-800">Điểm mạnh:</strong> {productB.shortDescription}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Feature Comparison Matrix Rows (Collapsible / Toggleable) */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                  Bảng Tiêu Chí So Sánh Trực Tiếp
                </h4>
                <p className="text-[11px] text-slate-500">
                  {showDetails
                    ? 'Hiển thị đầy đủ thông số đo lường đối đầu giữa 2 sản phẩm'
                    : 'Nhấn "Hiện chi tiết" để xem toàn bộ bảng thông số đối đầu'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#FF5722] hover:bg-[#F4511E] text-white transition-all cursor-pointer shadow-sm active:scale-95 self-start sm:self-auto"
            >
              {showDetails ? (
                <>
                  <span>Ẩn chi tiết</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Hiện chi tiết</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Collapsible Content */}
          {showDetails && (
            <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50 animate-grid-filter">
              {activeComparison.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 p-3.5 sm:p-4 gap-2 sm:gap-4 items-center hover:bg-white transition-colors text-xs"
                >
                  <div className="md:col-span-4 font-bold text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                    <span>{feat.feature}</span>
                  </div>
                  <div className="md:col-span-4 text-slate-600 flex items-start gap-1.5">
                    <span
                      className={`font-semibold ${
                        feat.winner === 'A' ? 'text-emerald-700 font-bold' : ''
                      }`}
                    >
                      {feat.productA}
                    </span>
                    {feat.winner === 'A' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                  <div className="md:col-span-4 text-slate-600 flex items-start gap-1.5">
                    <span
                      className={`font-semibold ${
                        feat.winner === 'B' ? 'text-emerald-700 font-bold' : ''
                      }`}
                    >
                      {feat.productB}
                    </span>
                    {feat.winner === 'B' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </div>
              ))}
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
      </div>
    </div>
  );
};
