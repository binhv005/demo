import React from 'react';
import { Link } from 'react-router-dom';
import { Product, RankingItemDetail } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { ScoreBadge } from '../ui/ScoreBadge';
import { ProsCons } from '../product/ProsCons';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, Star, ExternalLink, ShieldCheck } from 'lucide-react';

interface RankingItemProps {
  item: RankingItemDetail;
  product: Product;
}

export const RankingItem: React.FC<RankingItemProps> = ({ item, product }) => {
  const isTop1 = item.rank === 1;

  return (
    <div
      id={`rank-${item.rank}`}
      className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-200 p-4 sm:p-6 lg:p-8 scroll-mt-24 w-full min-w-0 ${
        isTop1
          ? 'border-indigo-200 ring-2 ring-indigo-500/10 shadow-lg'
          : 'border-slate-200/80 shadow-sm hover:border-slate-300'
      }`}
    >
      {/* Top Banner: Rank Number & Highlight Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-extrabold text-base sm:text-xl shadow-sm flex-shrink-0 ${
              isTop1
                ? 'bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white shadow-indigo-200'
                : 'bg-slate-900 text-white'
            }`}
          >
            #{item.rank}
          </div>
          <div className="min-w-0 flex-1">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider block truncate ${
                isTop1 ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              {item.highlight}
            </span>
            <Link
              to={`/review/${product.slug}`}
              className="font-extrabold text-lg sm:text-xl lg:text-2xl text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2"
            >
              {product.name}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
          <ScoreBadge score={product.score} size="md" showLabel />
        </div>
      </div>

      {/* Main Content: Product Preview & Verdict */}
      <div className="py-5 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        <div className="lg:col-span-4 space-y-3 min-w-0 w-full">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 h-48 sm:h-56">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 flex-wrap gap-1">
            <span>Thương hiệu: <strong className="text-slate-800">{product.brand}</strong></span>
            <span>Giá: <strong className="text-slate-900">{formatPrice(product.price, product.priceUnit)}</strong></span>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4 min-w-0 w-full">
          <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-100">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Nhận định của ban biên tập:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {item.verdict}
            </p>
          </div>

          {/* Pros & Cons custom for this ranking */}
          <ProsCons
            pros={item.customPros || product.pros.slice(0, 3)}
            cons={item.customCons || product.cons.slice(0, 2)}
          />
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="pt-4 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="text-[11px] sm:text-xs">Sản phẩm đạt chuẩn chứng nhận kiểm nghiệm chất lượng</span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Link to={`/review/${product.slug}`} className="flex-1 sm:flex-none">
            <Button variant="outline" size="sm" className="w-full sm:w-auto justify-center" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Đọc review chi tiết
            </Button>
          </Link>
          <Button variant="primary" size="sm" className="flex-1 sm:flex-none justify-center" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
            Xem giá tốt nhất
          </Button>
        </div>
      </div>
    </div>
  );
};
