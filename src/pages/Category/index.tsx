import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ProductCard } from '../../components/product/ProductCard';
import { RankingCard } from '../../components/ranking/RankingCard';
import { ArticleCard } from '../../components/article/ArticleCard';
import { Accordion } from '../../components/ui/Accordion';
import { Select } from '../../components/ui/Select';
import { renderCategoryIcon } from '../../utils/icons';
import { SlidersHorizontal, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CategoryDetailPage: React.FC = () => {
  const { group, category } = useParams<{ group: string; category: string }>();
  const { categories, products, rankings, comparisons, articles } = useData();

  const [sortBy, setSortBy] = useState<'score' | 'price-asc' | 'price-desc'>('score');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Find matching category or subcategory
  const matchedCategory = categories.find((c) => c.groupSlug === group || c.slug === group);
  const matchedSubcategory = matchedCategory?.subcategories.find((s) => s.slug === category);

  const categoryName = matchedSubcategory?.name || matchedCategory?.name || 'Danh mục';
  const groupName = matchedCategory?.group === 'physical' ? 'Sản phẩm vật lý' : 'Sản phẩm số';
  const groupPath = matchedCategory?.group === 'physical' ? '/san-pham-vat-ly' : '/san-pham-so';

  // Filter products by categorySlug or groupSlug
  const categoryProducts = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.categorySlug === category ||
        p.groupSlug === group ||
        p.category.toLowerCase().includes(categoryName.toLowerCase())
    );

    // If specific subcategory has few products, also include other products in same group for demo
    if (list.length === 0) {
      list = products.filter((p) => p.groupSlug === group || p.type === matchedCategory?.group);
    }

    return list.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [products, category, group, categoryName, matchedCategory, sortBy]);

  // Rankings in this category
  const categoryRankings = rankings.filter(
    (r) => r.categorySlug === category || r.groupSlug === group
  );

  // Comparisons in this category
  const categoryComparisons = comparisons.filter(
    (c) => c.categorySlug === category || c.type === matchedCategory?.group
  );

  // Buying guides in this category
  const categoryArticles = articles.filter(
    (a) => a.categorySlug === category || a.productType === matchedCategory?.group
  );

  const faqItems = [
    {
      id: 'cat-faq-1',
      title: `Làm thế nào để chọn được sản phẩm ${categoryName} phù hợp nhất?`,
      content: 'Hãy xác định rõ ngân sách dự kiến, nhu cầu cốt lõi và số lượng người dùng thực tế. Đọc kỹ phần Ưu/Nhược điểm và Bảng thông số kỹ thuật trong các bài đánh giá để chọn đúng sản phẩm tối ưu nhất.'
    },
    {
      id: 'cat-faq-2',
      title: 'Các thương hiệu nào uy tín nhất trong ngành hàng này?',
      content: 'Chúng tôi liên tục cập nhật danh sách thương hiệu đạt chuẩn chứng nhận an toàn, có chính sách bảo hành chính hãng từ 12-24 tháng minh bạch tại Việt Nam.'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Category Header */}
      <section className="bg-gradient-to-b from-slate-100/70 via-white to-slate-50 border-b border-slate-200/60 py-8">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: groupName, path: groupPath },
              { label: matchedCategory?.name || 'Danh mục', path: `/${group}/${matchedCategory?.subcategories[0]?.slug || ''}` },
              { label: categoryName }
            ]}
          />

          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  {matchedCategory ? renderCategoryIcon(matchedCategory.icon, 'w-5 h-5') : <Sparkles className="w-5 h-5" />}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {groupName}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {categoryName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {matchedCategory?.description || `Tổng hợp các bài đánh giá, so sánh và xếp hạng ${categoryName} được kiểm nghiệm thực tế bởi chuyên gia.`}
              </p>
            </div>

            {/* Quick trust metric */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3 self-start md:self-auto">
              <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Đã kiểm nghiệm {categoryProducts.length} sản phẩm</span>
                <span className="text-[11px] text-slate-400">Dữ liệu cập nhật mới nhất</span>
              </div>
            </div>
          </div>

          {/* Subcategory Pills */}
          {matchedCategory && matchedCategory.subcategories.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200/60 mt-6">
              {matchedCategory.subcategories.map((sub) => {
                const isActive = sub.slug === category;
                return (
                  <Link
                    key={sub.id}
                    to={`/${matchedCategory.groupSlug}/${sub.slug}`}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {sub.name}
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Featured Rankings in this Category */}
      {categoryRankings.length > 0 && (
        <section>
          <Container size="xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Bảng Xếp Hạng Tuyển Chọn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryRankings.map((r) => (
                <RankingCard key={r.id} ranking={r} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Product List with Sorting */}
      <section>
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Sản Phẩm Đánh Giá Hàng Đầu
              </h2>
              <span className="text-xs text-slate-500">
                Hiển thị {categoryProducts.length} sản phẩm
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="w-48">
                <Select
                  options={[
                    { value: 'score', label: 'Điểm đánh giá cao nhất' },
                    { value: 'price-asc', label: 'Giá từ thấp đến cao' },
                    { value: 'price-desc', label: 'Giá từ cao đến thấp' }
                  ]}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                />
              </div>

              {/* View mode toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Lưới
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Danh sách
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid / List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {categoryProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} variant="list" />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Comparisons */}
      {categoryComparisons.length > 0 && (
        <section>
          <Container size="xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              So Sánh Trực Diện Sản Phẩm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryComparisons.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 hover:shadow-md transition-all">
                  <span className="text-xs font-bold text-indigo-600 uppercase">So Sánh Tiêu Biểu</span>
                  <Link to={`/so-sanh/${c.slug}`} className="block font-bold text-slate-900 text-base hover:text-indigo-600 transition-colors">
                    {c.title}
                  </Link>
                  <p className="text-xs text-slate-600 line-clamp-2">{c.verdict}</p>
                  <Link to={`/so-sanh/${c.slug}`} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                    Đọc so sánh <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Buying Guides */}
      {categoryArticles.length > 0 && (
        <section>
          <Container size="xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Hướng Dẫn Mua Sắm & Tư Vấn Chọn Lựa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section>
        <Container size="md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Câu Hỏi Thường Gặp Về {categoryName}</h2>
          </div>
          <Accordion items={faqItems} defaultOpenId="cat-faq-1" />
        </Container>
      </section>
    </div>
  );
};
