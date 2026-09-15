import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { ScoreBadge } from '../ui/ScoreBadge';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Check, ArrowRight, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list' | 'compact';
  rank?: number;
  className?: string;
  onClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'grid',
  rank,
  className = '',
  onClick
}) => {
  const fallbackImg = product.type === 'physical'
    ? 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    : 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80';

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(product);
    }
  };

  if (variant === 'list') {
    return (
      <div
        onClick={handleClick}
        className={`bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 hover:shadow-md hover:border-slate-300 transition-all flex flex-col md:flex-row gap-6 items-start ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {/* Left: Image & Rank Badge */}
        <div className="relative w-full md:w-56 h-48 md:h-44 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 group">
          <img
            src={product.image || fallbackImg}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImg) target.src = fallbackImg;
            }}
          />
          {rank && (
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-slate-900/90 backdrop-blur-md text-white font-bold flex items-center justify-center text-sm shadow">
              #{rank}
            </div>
          )}
          {product.badge && (
            <div className="absolute bottom-3 left-3 right-3">
              <Badge variant="indigo" className="bg-white/95 backdrop-blur-md shadow-sm font-semibold truncate max-w-full">
                {product.badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Middle: Info & Specs */}
        <div className="flex-1 space-y-3 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="slate" size="sm">
              {product.type === 'physical' ? 'Sản phẩm vật lý' : 'Sản phẩm số'}
            </Badge>
            <span className="text-xs font-semibold text-slate-500">{product.brand}</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">{product.category}</span>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-slate-900 hover:text-orange-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Key Pros */}
          <div className="space-y-1.5 pt-1">
            {product.pros.slice(0, 2).map((pro, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Score, Price & CTA */}
        <div className="w-full md:w-44 flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-4 flex-shrink-0">
          <div className="flex items-center md:flex-col md:items-end gap-2 w-full justify-between md:justify-start">
            <ScoreBadge score={product.score} size="md" showLabel />
            <div className="text-right">
              <span className="text-lg font-bold text-slate-900 block">
                {formatPrice(product.price, product.priceUnit)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through block">
                  {formatPrice(product.originalPrice, product.priceUnit)}
                </span>
              )}
            </div>
          </div>

          <div className="w-full space-y-2">
            <Button variant="primary" size="sm" className="w-full">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default: Grid Card
  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={product.image || fallbackImg}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackImg) target.src = fallbackImg;
          }}
        />
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {rank ? (
            <span className="w-7 h-7 rounded-full bg-slate-900/90 backdrop-blur-md text-white font-bold flex items-center justify-center text-xs shadow">
              #{rank}
            </span>
          ) : (
            <Badge variant="slate" size="sm" className="bg-slate-900/80 text-white backdrop-blur-md">
              {product.brand}
            </Badge>
          )}
          <ScoreBadge score={product.score} size="sm" />
        </div>

        {product.badge && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-orange-700 text-xs font-bold shadow-sm">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            {product.category}
          </span>
          <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 text-base leading-snug">
            {product.name}
          </h4>
          <p className="hidden sm:block text-xs text-slate-500 line-clamp-2">
            {product.bestFor}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Giá tham khảo</span>
            <span className="font-bold text-slate-900 text-sm sm:text-base">
              {formatPrice(product.price, product.priceUnit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
