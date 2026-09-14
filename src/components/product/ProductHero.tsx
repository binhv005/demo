import React from 'react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { ScoreBadge } from '../ui/ScoreBadge';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ExternalLink, CheckCircle2, ShieldCheck, Heart, Share2 } from 'lucide-react';

interface ProductHeroProps {
  product: Product;
}

export const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Image & Gallery preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 h-80 sm:h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md">
                  {product.badge}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" /> Đã kiểm nghiệm độc lập bởi TechReview
            </span>
            <span>Cập nhật: {product.updatedAt}</span>
          </div>
        </div>

        {/* Right: Product Details, Score & CTA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">{product.brand}</Badge>
              <Badge variant="slate">{product.category}</Badge>
              <span className="text-xs text-slate-400">ID: {product.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Quick Score & Best For Callout */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Phù hợp nhất cho:
              </span>
              <p className="text-sm font-semibold text-slate-900">
                {product.bestFor}
              </p>
            </div>
            <ScoreBadge score={product.score} size="lg" showLabel className="flex-shrink-0" />
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Giá thị trường tham khảo</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {formatPrice(product.price, product.priceUnit)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice, product.priceUnit)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ExternalLink className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-indigo-200"
              >
                Xem nơi bán chính hãng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
