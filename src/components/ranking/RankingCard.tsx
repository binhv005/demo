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
  const fallbackImage = ranking.type === 'physical'
    ? 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';

  const imageUrl = ranking.image || fallbackImage;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group ${className}`}
    >
      {/* CARD IMAGE CONTAINER */}
      <Link to={`/top/${ranking.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={ranking.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackImage) {
              target.src = fallbackImage;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
        
        {/* BADGES OVERLAY */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant={ranking.type === 'physical' ? 'warning' : 'indigo'} size="sm" className="backdrop-blur-md bg-white/90 shadow-xs">
            {ranking.type === 'physical' ? (
              <span className="flex items-center gap-1 font-bold">
                <Flame className="w-3 h-3 text-orange-500" /> Vật lý
              </span>
            ) : (
              <span className="flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-indigo-500" /> Sản phẩm số
              </span>
            )}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-white/95 backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
            <Calendar className="w-3 h-3" />
            <span>{ranking.updatedAt}</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-indigo-600/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md shadow-xs">
            <Award className="w-3 h-3" /> Top Xếp Hạng
          </span>
        </div>
      </Link>

      {/* CARD BODY */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <Link
            to={`/top/${ranking.slug}`}
            className="block font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug"
          >
            {ranking.title}
          </Link>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {ranking.subtitle}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Đã kiểm nghiệm {ranking.items.length} sản phẩm
          </span>
          <Link
            to={`/top/${ranking.slug}`}
            className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 group/btn"
          >
            <span>Xem chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
