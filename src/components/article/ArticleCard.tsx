import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { Badge } from '../ui/Badge';
import { Clock, Calendar, ArrowRight, BookOpen, Scale, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'horizontal';
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  className = ''
}) => {
  const getArticleUrl = (art: Article) => {
    if (art.type === 'guide') return `/huong-dan/${art.slug}`;
    if (art.type === 'comparison') return `/so-sanh/${art.slug}`;
    return `/huong-dan/${art.slug}`;
  };

  const typeLabels = {
    guide: { label: 'Hướng dẫn chọn mua', variant: 'indigo' as const, icon: <BookOpen className="w-3 h-3" /> },
    comparison: { label: 'So sánh sản phẩm', variant: 'warning' as const, icon: <Scale className="w-3 h-3" /> },
    review: { label: 'Đánh giá chuyên sâu', variant: 'success' as const, icon: <Sparkles className="w-3 h-3" /> },
    news: { label: 'Tin công nghệ', variant: 'slate' as const, icon: null }
  };

  const typeInfo = typeLabels[article.type] || typeLabels.guide;

  if (variant === 'featured') {
    return (
      <div
        className={`bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group ${className}`}
      >
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full bg-slate-100 overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <Badge variant={typeInfo.variant} className="bg-white/95 backdrop-blur-md shadow-sm font-bold">
              <span className="flex items-center gap-1.5">
                {typeInfo.icon}
                {typeInfo.label}
              </span>
            </Badge>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime}
              </span>
            </div>

            <Link
              to={getArticleUrl(article)}
              className="block font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight"
            >
              {article.title}
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
            <Link
              to={getArticleUrl(article)}
              className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Đọc ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard vertical card
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col group ${className}`}
    >
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={typeInfo.variant} size="sm" className="bg-white/95 backdrop-blur-md shadow-sm font-semibold">
            {typeInfo.label}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>

          <Link
            to={getArticleUrl(article)}
            className="font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2 text-base leading-snug"
          >
            {article.title}
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">
            {article.views.toLocaleString('vi-VN')} lượt đọc
          </span>
          <Link
            to={getArticleUrl(article)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
