import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ArticleCard } from '../../components/article/ArticleCard';
import { Article } from '../../types';
import { mockArticles } from '../../data/articles';
import {
  BookOpen,
  Search,
  Sparkles,
  Scale,
  FileText,
  Flame,
  CheckCircle2,
  X,
  Filter
} from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  const { articles } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedProductType, setSelectedProductType] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Published articles with fallback if empty
  const allArticles = useMemo(() => {
    const published = articles.filter((a) => a.status === 'published');
    if (published.length > 0) return published;
    return mockArticles;
  }, [articles]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allArticles.forEach((art) => {
      if (art.tags && Array.isArray(art.tags)) {
        art.tags.forEach((t) => tags.add(t));
      }
    });
    return Array.from(tags);
  }, [allArticles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      // Type filter
      if (selectedType !== 'all' && art.type !== selectedType) return false;

      // Product type filter
      if (selectedProductType !== 'all' && art.productType !== selectedProductType) return false;

      // Tag filter
      if (selectedTag !== 'all' && (!art.tags || !art.tags.includes(selectedTag))) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = art.title.toLowerCase().includes(query);
        const matchExcerpt = art.excerpt.toLowerCase().includes(query);
        const matchTag = art.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchTitle && !matchExcerpt && !matchTag) return false;
      }

      return true;
    });
  }, [allArticles, selectedType, selectedProductType, selectedTag, searchQuery]);

  const typeTabs = [
    { id: 'all', label: 'Tất cả bài viết', icon: FileText, count: allArticles.length },
    { id: 'guide', label: 'Hướng dẫn chọn mua', icon: BookOpen, count: allArticles.filter((a) => a.type === 'guide').length },
    { id: 'review', label: 'Đánh giá chuyên sâu', icon: Sparkles, count: allArticles.filter((a) => a.type === 'review').length },
    { id: 'comparison', label: 'So sánh sản phẩm', icon: Scale, count: allArticles.filter((a) => a.type === 'comparison').length }
  ];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedProductType('all');
    setSelectedTag('all');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedType !== 'all' ||
    selectedProductType !== 'all' ||
    selectedTag !== 'all';

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-orange-50/70 via-white to-slate-50 border-b border-slate-200/70 py-10 sm:py-14">
        <Container size="xl">
          <Breadcrumb items={[{ label: 'Cẩm nang & Bài viết' }]} />

          <div className="mt-6 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-orange-600" />
              <span>Cẩm Nang &amp; Hướng Dẫn Chọn Mua Chuyên Gia</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Toàn Bộ Bài Viết &amp; Cẩm Nang
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tổng hợp cẩm nang mua sắm, tiêu chuẩn kỹ thuật phòng Lab và kinh nghiệm kiểm nghiệm thực tế từ các chuyên gia hàng đầu.
            </p>
          </div>

          {/* Search bar inside hero */}
          <div className="mt-8 max-w-2xl relative">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm cẩm nang, tiêu chí chọn mua, công nghệ..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <Container size="xl">
        <div className="space-y-8">
          {/* Controls Bar */}
          <div className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            {/* Type tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {typeTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = selectedType === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedType(tab.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub Filters: Product Type & Tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
                  <Filter className="w-3.5 h-3.5" /> Phân loại:
                </span>
                {[
                  { id: 'all', label: 'Tất cả lĩnh vực' },
                  { id: 'physical', label: 'Sản phẩm vật lý' },
                  { id: 'digital', label: 'Sản phẩm số & AI' }
                ].map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setSelectedProductType(pt.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedProductType === pt.id
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Xóa bộ lọc</span>
                </button>
              )}
            </div>

            {/* Popular Tags */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap mr-1">Tags:</span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      selectedTag === tag
                        ? 'bg-orange-100 text-orange-800 font-bold border border-orange-300'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-slate-500">
              Hiển thị <span className="font-bold text-slate-900">{filteredArticles.length}</span> bài viết
            </p>
          </div>

          {/* Article Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="standard" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Không tìm thấy bài viết nào</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Không có bài viết nào khớp với từ khóa hoặc bộ lọc đã chọn. Hãy thử tìm kiếm bằng từ khóa khác hoặc xóa bộ lọc.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors cursor-pointer"
              >
                Xem tất cả bài viết
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
