import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Tabs } from '../../components/ui/Tabs';
import { ProductCard } from '../../components/product/ProductCard';
import { RankingCard } from '../../components/ranking/RankingCard';
import { ArticleCard } from '../../components/article/ArticleCard';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, SlidersHorizontal, X, ArrowRight, Sparkles, Scale, BookOpen } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'rankings' | 'reviews' | 'comparisons' | 'guides'>('all');
  const [productType, setProductType] = useState<'all' | 'physical' | 'digital'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minScore, setMinScore] = useState<number>(0);

  const { products, rankings, comparisons, articles, categories } = useData();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setQuery(q);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const clearFilters = () => {
    setQuery('');
    setProductType('all');
    setSelectedCategory('all');
    setMinScore(0);
    setSearchParams({});
  };

  // Filter Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.status === 'draft') return false;
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase());

      const matchType = productType === 'all' || p.type === productType;
      const matchCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory || p.groupSlug === selectedCategory;
      const matchScore = p.score >= minScore;

      return matchQuery && matchType && matchCategory && matchScore;
    });
  }, [products, query, productType, selectedCategory, minScore]);

  // Filter Rankings
  const filteredRankings = useMemo(() => {
    return rankings.filter((r) => {
      if (r.status === 'draft') return false;
      const matchQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase());
      const matchType = productType === 'all' || r.type === productType;
      return matchQuery && matchType;
    });
  }, [rankings, query, productType]);

  // Filter Comparisons
  const filteredComparisons = useMemo(() => {
    return comparisons.filter((c) => {
      if (c.status === 'draft') return false;
      const matchQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.verdict.toLowerCase().includes(query.toLowerCase());
      const matchType = productType === 'all' || c.type === productType;
      return matchQuery && matchType;
    });
  }, [comparisons, query, productType]);

  // Filter Guides & Articles
  const filteredGuides = useMemo(() => {
    return articles.filter((a) => {
      if (a.status === 'draft') return false;
      const matchQuery =
        !query ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchType = productType === 'all' || a.productType === productType;
      return matchQuery && matchType;
    });
  }, [articles, query, productType]);

  const totalResults =
    filteredProducts.length +
    filteredRankings.length +
    filteredComparisons.length +
    filteredGuides.length;

  const tabsConfig = [
    { id: 'all', label: 'Tất cả kết quả', count: totalResults },
    { id: 'products', label: 'Sản phẩm', count: filteredProducts.length },
    { id: 'rankings', label: 'Top 10 / Bảng xếp hạng', count: filteredRankings.length },
    { id: 'comparisons', label: 'So sánh đối đầu', count: filteredComparisons.length },
    { id: 'guides', label: 'Cẩm nang & Hướng dẫn', count: filteredGuides.length }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Search Header */}
      <section className="bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 border-b border-slate-200/60 py-10">
        <Container size="xl">
          <Breadcrumb items={[{ label: 'Tìm kiếm tổng hợp' }]} />

          <div className="mt-4 max-w-3xl space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tìm Kiếm & Lọc Toàn Diện
            </h1>

            {/* Main Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tên sản phẩm, thương hiệu, bảng xếp hạng..."
                className="w-full pl-12 pr-28 py-4 bg-white border border-slate-300 rounded-2xl text-sm sm:text-base text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setSearchParams({});
                    }}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <Button type="submit" variant="primary" size="sm" className="px-4 py-2 font-bold">
                  Tìm
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </section>

      {/* Main Search Content Layout */}
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filters Sidebar (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                Bộ lọc tìm kiếm
              </span>
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Đặt lại
              </button>
            </div>

            {/* Product Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Loại sản phẩm
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'Tất cả loại' },
                  { id: 'physical', label: 'Sản phẩm vật lý' },
                  { id: 'digital', label: 'Sản phẩm số & AI' }
                ].map((t) => (
                  <label key={t.id} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="prodType"
                      checked={productType === t.id}
                      onChange={() => setProductType(t.id as any)}
                      className="text-indigo-600 focus:ring-indigo-500 rounded-full"
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Danh mục
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Score Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-700">Điểm tối thiểu</span>
                <span className="font-extrabold text-indigo-600">≥ {minScore.toFixed(1)} / 10</span>
              </div>
              <input
                type="range"
                min="0"
                max="9.5"
                step="0.5"
                value={minScore}
                onChange={(e) => setMinScore(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>0.0</span>
                <span>8.0+</span>
                <span>9.0+</span>
                <span>9.5</span>
              </div>
            </div>
          </div>

          {/* Right Results Area (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Tabs */}
            <Tabs
              tabs={tabsConfig}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id as any)}
              variant="pills"
            />

            {/* Results Output */}
            {totalResults === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Không tìm thấy kết quả phù hợp</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Hãy thử tìm bằng từ khóa chung hơn, hoặc xóa các bộ lọc danh mục và điểm số bên trái.
                </p>
                <Button variant="secondary" size="sm" onClick={clearFilters}>
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Products Section */}
                {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        Sản phẩm ({filteredProducts.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((p) => (
                        <ProductCard key={p.id} product={p} variant="grid" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Rankings Section */}
                {(activeTab === 'all' || activeTab === 'rankings') && filteredRankings.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="font-extrabold text-lg text-slate-900">
                        Top 10 / Bảng Xếp Hạng ({filteredRankings.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredRankings.map((r) => (
                        <RankingCard key={r.id} ranking={r} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Comparisons Section */}
                {(activeTab === 'all' || activeTab === 'comparisons') && filteredComparisons.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                        <Scale className="w-4 h-4 text-amber-500" />
                        So Sánh Đối Đầu ({filteredComparisons.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredComparisons.map((c) => (
                        <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 hover:shadow-md transition-all">
                          <Link to={`/so-sanh/${c.slug}`} className="block font-bold text-slate-900 text-base hover:text-indigo-600 transition-colors">
                            {c.title}
                          </Link>
                          <p className="text-xs text-slate-600 line-clamp-2">{c.verdict}</p>
                          <Link to={`/so-sanh/${c.slug}`} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                            Xem so sánh <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guides Section */}
                {(activeTab === 'all' || activeTab === 'guides') && filteredGuides.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        Cẩm Nang & Hướng Dẫn ({filteredGuides.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredGuides.map((g) => (
                        <ArticleCard key={g.id} article={g} variant="standard" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
