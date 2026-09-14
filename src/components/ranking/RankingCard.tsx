import React from 'react';
import { Link } from 'react-router-dom';
import { Ranking } from '../../types';
import { Award, ArrowRight, Calendar, Sparkles, Flame } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface RankingCardProps {
  ranking: Ranking;
  className?: string;
}

export const RankingCard: React.FC<RankingCardProps> = ({ ranking, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group ${className}`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant={ranking.type === 'physical' ? 'warning' : 'indigo'} size="sm">
            {ranking.type === 'physical' ? (
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-500" /> Sản phẩm vật lý
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" /> Sản phẩm số
              </span>
            )}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{ranking.updatedAt}</span>
          </div>
        </div>

        <Link
          to={`/top/${ranking.slug}`}
          className="block font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug"
        >
          {ranking.title}
        </Link>

        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {ranking.subtitle}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          Đã kiểm nghiệm {ranking.items.length} sản phẩm hàng đầu
        </span>
        <Link
          to={`/top/${ranking.slug}`}
          className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 group/btn"
        >
          <span>Xem bảng xếp hạng</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
