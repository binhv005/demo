import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ScoreBadge } from '../ui/ScoreBadge';
import { formatPrice } from '../../utils/formatters';
import { Award, Zap, Gem, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuickPickProps {
  bestOverall?: Product;
  bestValue?: Product;
  bestPremium?: Product;
}

export const QuickPick: React.FC<QuickPickProps> = ({
  bestOverall,
  bestValue,
  bestPremium
}) => {
  const cards = [
    {
      type: 'TỐT NHẤT TỔNG THỂ',
      icon: <Award className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50/70 border-indigo-200/80',
      badgeColor: 'bg-indigo-600 text-white',
      product: bestOverall
    },
    {
      type: 'GIÁ TRỊ TỐT NHẤT (P/P)',
      icon: <Zap className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50/70 border-emerald-200/80',
      badgeColor: 'bg-emerald-600 text-white',
      product: bestValue
    },
    {
      type: 'LỰA CHỌN CAO CẤP',
      icon: <Gem className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50/70 border-amber-200/80',
      badgeColor: 'bg-amber-600 text-white',
      product: bestPremium
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
        <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
          Lựa Chọn Nhanh (Quick Picks)
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-500">
        Dành cho bạn cần đưa ra quyết định nhanh chóng mà không cần đọc hết toàn bộ bài phân tích chi tiết.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {cards.map((card, idx) => {
          if (!card.product) return null;
          return (
            <div
              key={idx}
              className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 shadow-sm transition-all hover:shadow-md ${card.bg}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide uppercase whitespace-nowrap flex-shrink-0 ${card.badgeColor}`}>
                    {card.type}
                  </span>
                  <ScoreBadge score={card.product.score} size="sm" />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={card.product.image}
                    alt={card.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/80 shadow-sm flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-500 block truncate">
                      {card.product.brand}
                    </span>
                    <Link
                      to={`/review/${card.product.slug}`}
                      className="font-bold text-sm text-slate-900 hover:text-indigo-600 line-clamp-2 transition-colors"
                    >
                      {card.product.name}
                    </Link>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {card.product.bestFor}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Giá từ</span>
                  <span className="font-extrabold text-sm text-slate-900">
                    {formatPrice(card.product.price, card.product.priceUnit)}
                  </span>
                </div>
                <Link to={`/review/${card.product.slug}`}>
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Xem review
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
