import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { renderCategoryIcon } from '../../utils/icons';
import { ArrowRight, Star, Sparkles, Flame, CheckCircle } from 'lucide-react';
import { ScoreBadge } from '../ui/ScoreBadge';

interface MegaMenuProps {
  type: 'physical' | 'digital';
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, onClose }) => {
  const { categories, products, rankings, comparisons } = useData();

  const filteredCategories = categories.filter((c) => c.group === type && c.status !== 'inactive');
  const featuredRanking = rankings.find((r) => r.type === type);
  const featuredProduct = products.find((p) => p.type === type);
  const featuredComparison = comparisons.find((c) => c.type === type);

  return (
    <div
      className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-2xl z-40 transition-all duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
        {/* Cột 1 & 2: Danh sách danh mục chính (8 cols) */}
        <div className="col-span-8">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                {type === 'physical' ? (
                  <Flame className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </span>
              <h4 className="font-bold text-slate-900 text-sm tracking-wide uppercase">
                {type === 'physical' ? 'Danh mục Sản phẩm Vật lý' : 'Danh mục Sản phẩm Số & Phần mềm'}
              </h4>
            </div>
            <Link
              to={type === 'physical' ? '/san-pham-vat-ly' : '/san-pham-so'}
              onClick={onClose}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
            >
              Xem tất cả danh mục
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-2.5">
                <Link
                  to={`/${cat.groupSlug}/${cat.subcategories[0]?.slug || cat.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2.5 font-bold text-slate-900 hover:text-indigo-600 transition-colors group text-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-700 group-hover:text-indigo-600 transition-colors">
                    {renderCategoryIcon(cat.icon, 'w-4 h-4')}
                  </div>
                  <span>{cat.name}</span>
                </Link>
                <ul className="pl-10 space-y-1.5 text-xs text-slate-500">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <li key={sub.id}>
                      <Link
                        to={`/${cat.groupSlug}/${sub.slug}`}
                        onClick={onClose}
                        className="hover:text-indigo-600 transition-colors block py-0.5"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cột 3: Nổi bật & Top Picks (4 cols) */}
        <div className="col-span-4 border-l border-slate-100 pl-8 space-y-6">
          {/* Top 10 nổi bật */}
          {featuredRanking && (
            <div className="bg-gradient-to-br from-indigo-50/70 to-slate-50 p-4 rounded-2xl border border-indigo-100/80">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                Bảng xếp hạng nổi bật
              </span>
              <Link
                to={`/top/${featuredRanking.slug}`}
                onClick={onClose}
                className="font-bold text-slate-900 text-sm hover:text-indigo-600 line-clamp-2 transition-colors"
              >
                {featuredRanking.title}
              </Link>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Cập nhật: {featuredRanking.updatedAt}</span>
                <span className="text-indigo-600 font-semibold flex items-center gap-0.5">
                  Xem ngay <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}

          {/* Sản phẩm điểm cao nhất */}
          {featuredProduct && (
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 transition-all">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <ScoreBadge score={featuredProduct.score} size="sm" />
                  <span className="text-[11px] font-semibold text-slate-500 truncate">
                    {featuredProduct.category}
                  </span>
                </div>
                <Link
                  to={`/review/${featuredProduct.slug}`}
                  onClick={onClose}
                  className="font-bold text-xs text-slate-900 hover:text-indigo-600 line-clamp-1 transition-colors block"
                >
                  {featuredProduct.name}
                </Link>
                <span className="text-xs text-indigo-600 font-semibold mt-0.5 block">
                  Đọc đánh giá chi tiết
                </span>
              </div>
            </div>
          )}

          {/* So sánh phổ biến */}
          {featuredComparison && (
            <div className="text-xs text-slate-600 pt-1">
              <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1.5">
                So sánh được xem nhiều
              </span>
              <Link
                to={`/so-sanh/${featuredComparison.slug}`}
                onClick={onClose}
                className="font-medium text-slate-800 hover:text-indigo-600 flex items-center gap-1.5 transition-colors line-clamp-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                {featuredComparison.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
