import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { Badge } from '../ui/Badge';
import { Clock, Calendar, ArrowRight, BookOpen, Scale, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'horizontal';
  className?: string;
  onClick?: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  className = '',
  onClick
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(article);
    }
  };

  const typeLabels = {
    guide: { label: 'Hướng dẫn chọn mua', variant: 'indigo' as const, icon: <BookOpen className="w-3 h-3" /> },
    comparison: { label: 'So sánh sản phẩm', variant: 'warning' as const, icon: <Scale className="w-3 h-3" /> },
    review: { label: 'Đánh giá chuyên sâu', variant: 'success' as const, icon: <Sparkles className="w-3 h-3" /> },
    news: { label: 'Tin công nghệ', variant: 'slate' as const, icon: null }
  };

  const typeInfo = typeLabels[article.type] || typeLabels.guide;

  const fallbackArticleImg = article.productType === 'digital'
    ? 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80'
    : 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80';

  if (variant === 'featured') {
    return (
      <div
        onClick={handleClick}
        className={`bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <div className="md:col-span-5 relative h-64 sm:h-80 md:h-full bg-slate-100 overflow-hidden min-h-[280px]">
          <img
            src={article.coverImage || fallbackArticleImg}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackArticleImg) target.src = fallbackArticleImg;
            }}
          />
          <div className="absolute top-4 left-4">
            <Badge variant={typeInfo.variant} className="bg-white/95 backdrop-blur-md shadow-xs font-bold text-xs">
              <span className="flex items-center gap-1.5">
                {typeInfo.icon}
                {typeInfo.label}
              </span>
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-xl flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Cập nhật mới nhất</span>
            </span>
            <span className="text-amber-200 font-bold">4.9 ★ (1.2k+ đọc)</span>
          </div>
        </div>

        <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 font-medium text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readingTime}
              </span>
            </div>

            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
              {article.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-2">
              {article.excerpt}
            </p>

            {/* Concise Key highlights */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-50/80 to-amber-50/50 border border-orange-200/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950">
                <Sparkles className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                <span>Nội dung chính:</span>
              </div>
              <ul className="space-y-1 text-[11.5px] text-slate-700">
                <li className="flex items-center gap-1.5">
                  <span className="text-orange-500 font-bold leading-none">✓</span>
                  <span>Tiêu chuẩn dung tích, công suất & an toàn thực phẩm.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-orange-500 font-bold leading-none">✓</span>
                  <span>Top 3 mẫu nồi chiên đáng mua theo từng phân khúc.</span>
                </li>
              </ul>
            </div>

            {/* Editorial attribution */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black flex items-center justify-center text-[9px] flex-shrink-0 shadow-xs">
                TR
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-slate-700 text-[11.5px]">Ban Biên Tập TechReview</span>
                <span>•</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Đã kiểm nghiệm
                </span>
              </div>
            </div>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap min-w-0">
              {article.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200/70 transition-colors px-2 py-0.5 rounded-lg truncate">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Horizontal variant
  if (variant === 'horizontal') {
    return (
      <div
        onClick={handleClick}
        className={`bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <div className="relative w-full sm:w-36 h-36 sm:h-28 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={article.coverImage || fallbackArticleImg}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackArticleImg) target.src = fallbackArticleImg;
            }}
          />
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>

          <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>

          <p className="text-xs text-slate-500 line-clamp-1">
            {article.excerpt}
          </p>
        </div>
      </div>
    );
  }

  // Standard Grid variant
  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={article.coverImage || fallbackArticleImg}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackArticleImg) target.src = fallbackArticleImg;
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge variant={typeInfo.variant} className="bg-white/95 backdrop-blur-md shadow-xs font-bold text-xs">
            {typeInfo.label}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>
          <h4 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-2">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="font-bold text-orange-600 group-hover:text-orange-700 flex items-center gap-1">
            <span>Xem bài viết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
