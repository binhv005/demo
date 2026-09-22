import React, { useState } from 'react';
import { Product } from '../../types';
import { formatPrice, getOfficialBuyUrl } from '../../utils/formatters';
import { ScoreBadge } from '../ui/ScoreBadge';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ExternalLink, ShieldCheck, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ProductHeroProps {
  product: Product;
}

export const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  const allImages = Array.from(
    new Set([product.image, ...(product.gallery || [])].filter(Boolean))
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const officialBuyUrl = getOfficialBuyUrl(product);

  const currentImage = allImages[activeImageIndex] || product.image;

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Image & Gallery preview */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Display Image */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 h-80 sm:h-96 cursor-zoom-in"
          >
            <img
              src={currentImage}
              alt={`${product.name} - Ảnh ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Badge on top-left */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Image counter on top-right (if multiple) */}
            {allImages.length > 1 && (
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-xl bg-slate-900/70 backdrop-blur-md text-white font-bold text-xs shadow-sm">
                  {activeImageIndex + 1} / {allImages.length}
                </span>
              </div>
            )}

            {/* Next / Previous arrows (if multiple) */}
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-110 z-10 cursor-pointer"
                  title="Ảnh trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-110 z-10 cursor-pointer"
                  title="Ảnh kế tiếp"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Zoom hint on bottom-right */}
            <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="p-2 rounded-xl bg-white/90 text-slate-800 shadow-sm flex items-center gap-1 text-xs font-semibold">
                <Maximize2 className="w-3.5 h-3.5" /> Phóng to
              </span>
            </div>
          </div>

          {/* Thumbnail Strip (Show all added images) */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 cursor-pointer ${
                    idx === activeImageIndex
                      ? 'border-indigo-600 ring-2 ring-indigo-600/30 scale-105 shadow-sm opacity-100'
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" /> Đã kiểm nghiệm độc lập bởi Top20Product
            </span>
          </div>
        </div>

        {/* Right: Product Details, Score & CTA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">{product.brand}</Badge>
              <Badge variant="slate">{product.category}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Quick Score & Best For Callout */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 block">
                Phù hợp nhất cho:
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                {product.bestFor}
              </p>
            </div>
            <ScoreBadge score={product.score} size="compact" showLabel className="flex-shrink-0 self-start sm:self-center" />
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Giá thị trường tham khảo</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  {formatPrice(product.price, product.priceUnit)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.originalPrice, product.priceUnit)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={officialBuyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-block"
              >
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  className="w-full sm:w-auto font-bold text-xs sm:text-sm py-2 px-4 shadow-sm"
                >
                  Xem nơi bán chính hãng
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-10 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image & Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
          >
            <img
              src={currentImage}
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* Prev / Next controls in Lightbox */}
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute -left-12 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute -right-12 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}

            {/* Bottom thumbnail strip in Lightbox */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar max-w-full py-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      idx === activeImageIndex
                        ? 'border-indigo-400 ring-2 ring-indigo-400/50 scale-105'
                        : 'border-white/30 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
