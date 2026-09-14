import React from 'react';
import { Expert } from '../../types';
import { Badge } from '../ui/Badge';
import { Calendar, Clock, Eye, Share2, Sparkles } from 'lucide-react';

interface ArticleHeaderProps {
  title: string;
  category: string;
  expert?: Expert;
  publishedAt: string;
  readingTime: string;
  views?: number;
  badge?: string;
  className?: string;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  category,
  expert,
  publishedAt,
  readingTime,
  views,
  badge = 'Hướng dẫn chuyên sâu',
  className = ''
}) => {
  return (
    <div className={`space-y-4 pb-8 border-b border-slate-200 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="indigo" size="sm">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            {badge}
          </span>
        </Badge>
        <span className="text-xs font-semibold text-slate-500">{category}</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-snug">
        {title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-500">
        {expert && (
          <div className="flex items-center gap-3">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <span className="font-bold text-slate-900 block text-sm">{expert.name}</span>
              <span className="text-slate-500 text-xs">{expert.role}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {publishedAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readingTime}
          </span>
          {views && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {views.toLocaleString('vi-VN')}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
