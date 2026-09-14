import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { renderCategoryIcon } from '../../utils/icons';
import { ArrowRight, Star, Sparkles, Flame, CheckCircle, ChevronRight, Award, TrendingUp } from 'lucide-react';
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

  const isPhysical = type === 'physical';
  const themeColor = isPhysical ? 'orange' : 'indigo';

  return (
    <div
      className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] z-50 transition-all duration-200"
      onMouseLeave={onClose}
    >
      {/* Top Accent Gradient Line */}
      <div
        className={`h-1.5 w-full ${
          isPhysical
            ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400'
            : 'bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-400'
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
        {/* Cột 1 & 2: Danh sách danh mục chính (8 cols) */}
        <div className="col-span-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span
                className={`p-2 rounded-xl flex items-center justify-center ${
                  isPhysical
                    ? 'bg-orange-100 text-orange-700 shadow-sm'
                    : 'bg-indigo-100 text-indigo-700 shadow-sm'
                }`}
              >
                {isPhysical ? <Flame className="w-5 h-5 text-orange-600" /> : <Sparkles className="w-5 h-5 text-indigo-600" />}
              </span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base tracking-tight uppercase flex items-center gap-2">
                  {isPhysical ? 'Danh mục Sản phẩm Vật lý' : 'Danh mục Sản phẩm Số & Phần mềm'}
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isPhysical
                        ? 'bg-orange-50 text-orange-700 border border-orange-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {filteredCategories.length} nhóm ngành
                  </span>
                </h4>
                <p className="text-xs text-slate-500 font-normal">
                  {isPhysical ? 'Gia dụng, công nghệ, mẹ & bé và đời sống' : 'Công cụ AI, phần mềm SaaS và dịch vụ số'}
                </p>
              </div>
            </div>

            <Link
              to={isPhysical ? '/san-pham-vat-ly' : '/san-pham-so'}
              onClick={onClose}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                isPhysical
                  ? 'text-orange-700 bg-orange-50 border-orange-200/80 hover:bg-orange-100 hover:border-orange-300'
                  : 'text-indigo-700 bg-indigo-50 border-indigo-200/80 hover:bg-indigo-100 hover:border-indigo-300'
              }`}
            >
              <span>Xem tất cả danh mục</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-3 gap-5">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-white hover:shadow-md hover:border-slate-200/90 border border-slate-100/90 transition-all duration-200 space-y-2 group"
              >
                <Link
                  to={`/${cat.groupSlug}/${cat.subcategories[0]?.slug || cat.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2.5 font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-sm"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isPhysical
                        ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white shadow-xs'
                        : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white shadow-xs'
                    }`}
                  >
                    {renderCategoryIcon(cat.icon, 'w-4 h-4')}
                  </div>
                  <span className="truncate group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                </Link>

                <ul className="pl-2 space-y-1.5 text-xs text-slate-500">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <li key={sub.id}>
                      <Link
                        to={`/${cat.groupSlug}/${sub.slug}`}
                        onClick={onClose}
                        className="hover:text-slate-900 transition-colors flex items-center gap-1.5 py-0.5 font-medium group/sub"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/sub:bg-orange-500 transition-colors flex-shrink-0" />
                        <span className="truncate group-hover/sub:text-orange-600 transition-colors">{sub.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cột 3: Nổi bật & Top Picks (4 cols) */}
        <div className="col-span-4 bg-slate-50/80 p-5 rounded-3xl border border-slate-200/70 space-y-5">
          {/* Top 10 nổi bật */}
          {featuredRanking && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-2.5 group">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isPhysical ? 'bg-orange-100 text-orange-800' : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  <Award className="w-3 h-3 inline-block mr-1 -mt-0.5" /> Bảng xếp hạng nổi bật
                </span>
                <span className="text-[11px] text-slate-400 font-medium">{featuredRanking.updatedAt}</span>
              </div>

              <Link
                to={`/top/${featuredRanking.slug}`}
                onClick={onClose}
                className="font-bold text-slate-900 text-sm group-hover:text-orange-600 line-clamp-2 transition-colors block leading-snug"
              >
                {featuredRanking.title}
              </Link>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Top 10 đề cử</span>
                <span className="text-xs font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Xem ngay <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}

          {/* Sản phẩm điểm cao nhất */}
          {featuredProduct && (
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 group">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-slate-100 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <ScoreBadge score={featuredProduct.score} size="sm" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {featuredProduct.category}
                  </span>
                </div>
                <Link
                  to={`/review/${featuredProduct.slug}`}
                  onClick={onClose}
                  className="font-bold text-xs text-slate-900 group-hover:text-orange-600 line-clamp-1 transition-colors block"
                >
                  {featuredProduct.name}
                </Link>
                <Link
                  to={`/review/${featuredProduct.slug}`}
                  onClick={onClose}
                  className="text-[11px] text-orange-600 font-bold mt-1 inline-flex items-center gap-1"
                >
                  <span>Đọc đánh giá</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* So sánh phổ biến */}
          {featuredComparison && (
            <div className="bg-white/80 p-3 rounded-2xl border border-slate-200/60">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">
                <TrendingUp className="w-3 h-3 inline-block mr-1 text-slate-400" /> So sánh được quan tâm
              </span>
              <Link
                to={`/so-sanh/${featuredComparison.slug}`}
                onClick={onClose}
                className="text-xs font-semibold text-slate-800 hover:text-orange-600 flex items-center gap-1.5 transition-colors line-clamp-1"
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

