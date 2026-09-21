import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ScoreBadge } from '../../components/ui/ScoreBadge';
import { mockComparisons } from '../../data/comparisons';
import { formatPrice } from '../../utils/formatters';
import {
  Scale,
  Search,
  Flame,
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  X
} from 'lucide-react';

export const ComparisonsListPage: React.FC = () => {
  const { comparisons, products } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'physical' | 'digital'>('all');

  // Merge published comparisons from API context and fallback mocks
  const allComparisons = useMemo(() => {
    const published = comparisons.filter((c) => c.status !== 'draft');
    const combined = [...published];
    for (const m of mockComparisons) {
      if (!combined.some((c) => c.id === m.id || c.slug === m.slug)) {
        combined.push(m);
      }
    }
    return combined;
  }, [comparisons]);

  // Filtered comparisons
  const filteredComparisons = useMemo(() => {
    return allComparisons.filter((c) => {
      // Type filter
      if (selectedType !== 'all' && c.type !== selectedType) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const prodA = products.find((p) => p.id === c.productAId);
        const prodB = products.find((p) => p.id === c.productBId);

        const matchTitle = c.title.toLowerCase().includes(q);
        const matchVerdict = c.verdict.toLowerCase().includes(q);
        const matchProdA = prodA ? prodA.name.toLowerCase().includes(q) : false;
        const matchProdB = prodB ? prodB.name.toLowerCase().includes(q) : false;

        if (!matchTitle && !matchVerdict && !matchProdA && !matchProdB) {
          return false;
        }
      }

      return true;
    });
  }, [allComparisons, selectedType, searchQuery, products]);

  const typeTabs = [
    { id: 'all', label: 'Tất cả bài so sánh', icon: Scale, count: allComparisons.length },
    {
      id: 'physical',
      label: 'Sản phẩm vật lý',
      icon: Flame,
      count: allComparisons.filter((c) => c.type === 'physical').length
    },
    {
      id: 'digital',
      label: 'Sản phẩm số & AI',
      icon: Sparkles,
      count: allComparisons.filter((c) => c.type === 'digital').length
    }
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-orange-50/60 via-white to-slate-50 border-b border-slate-200/80 py-10 sm:py-14">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: 'Trang chủ', path: '/' },
              { label: 'So sánh đối đầu sản phẩm' }
            ]}
          />

          <div className="mt-6 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-700 text-xs font-black uppercase tracking-wider shadow-2xs">
              <Scale className="w-4 h-4 text-orange-600" />
              <span>Thử Nghiệm Đối Đầu Chuyên Sâu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Toàn Bộ Bài So Sánh Đối Đầu
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tổng hợp các bài đối đầu 1-1 trực diện giữa các thiết bị gia dụng hàng đầu và các mô hình trợ lý AI phổ biến nhất. Đánh giá khách quan dựa trên số liệu phòng Lab thực tế.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <Container size="xl">
        {/* Category Filter Tabs & Search Bar on 1 Single Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 mb-8 border-b border-slate-200 pb-5">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            {typeTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      isActive ? 'bg-orange-700/60 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar stretched to fill remaining space */}
          <div className="w-full md:flex-1">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài so sánh, model sản phẩm, công nghệ..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                  title="Xóa từ khóa tìm kiếm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filteredComparisons.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <Scale className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">Không tìm thấy bài so sánh phù hợp</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Không có bài viết nào khớp với từ khóa tìm kiếm hoặc bộ lọc hiện tại. Thử xóa từ khóa hoặc chọn nhóm sản phẩm khác.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          /* Comparisons Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredComparisons.map((comp) => {
              const prodA = products.find((p) => p.id === comp.productAId);
              const prodB = products.find((p) => p.id === comp.productBId);
              const winnerProd = products.find((p) => p.id === comp.winnerId);

              return (
                <div
                  key={comp.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Card Header Bar */}
                  <div className="p-5 bg-slate-900 text-white flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black bg-slate-800 text-slate-200">
                        {comp.type === 'physical' ? (
                          <>
                            <Flame className="w-3.5 h-3.5 text-orange-400" /> Vật lý
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Số & AI
                          </>
                        )}
                      </span>
                    </div>
                    {comp.updatedAt && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        {comp.updatedAt}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    {/* Title */}
                    <div>
                      <Link
                        to={`/so-sanh/${comp.slug}`}
                        className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug"
                      >
                        {comp.title}
                      </Link>
                    </div>

                    {/* Side-by-side Products Showcase */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 relative p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      {/* VS Center Badge */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow-md ring-4 ring-slate-50">
                        VS
                      </div>

                      {/* Product A */}
                      <div
                        className={`p-3 rounded-xl transition-all flex flex-col items-center text-center space-y-2 ${
                          comp.winnerId === comp.productAId
                            ? 'bg-amber-50/70 border border-amber-300/80 shadow-2xs'
                            : 'bg-white border border-slate-200'
                        }`}
                      >
                        {prodA?.image ? (
                          <div className="w-16 h-16 rounded-xl bg-white p-1 overflow-hidden border border-slate-100 flex-shrink-0">
                            <img
                              src={prodA.image}
                              alt={prodA.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 font-bold">
                            A
                          </div>
                        )}
                        <span className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">
                          {prodA?.name || 'Sản phẩm A'}
                        </span>
                        {prodA?.price && (
                          <span className="text-xs font-bold text-orange-600">
                            {formatPrice(prodA.price)}
                          </span>
                        )}
                        {comp.winnerId === comp.productAId && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-black shadow-2xs">
                            <Trophy className="w-3 h-3 text-amber-300" /> Thắng cuộc
                          </span>
                        )}
                      </div>

                      {/* Product B */}
                      <div
                        className={`p-3 rounded-xl transition-all flex flex-col items-center text-center space-y-2 ${
                          comp.winnerId === comp.productBId
                            ? 'bg-amber-50/70 border border-amber-300/80 shadow-2xs'
                            : 'bg-white border border-slate-200'
                        }`}
                      >
                        {prodB?.image ? (
                          <div className="w-16 h-16 rounded-xl bg-white p-1 overflow-hidden border border-slate-100 flex-shrink-0">
                            <img
                              src={prodB.image}
                              alt={prodB.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 font-bold">
                            B
                          </div>
                        )}
                        <span className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">
                          {prodB?.name || 'Sản phẩm B'}
                        </span>
                        {prodB?.price && (
                          <span className="text-xs font-bold text-orange-600">
                            {formatPrice(prodB.price)}
                          </span>
                        )}
                        {comp.winnerId === comp.productBId && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-black shadow-2xs">
                            <Trophy className="w-3 h-3 text-amber-300" /> Thắng cuộc
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expert Verdict Snippet */}
                    <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-slate-700 leading-relaxed line-clamp-2">
                      <span className="font-bold text-amber-900 inline-flex items-center gap-1 mr-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600 inline" /> Đánh giá:
                      </span>
                      {comp.verdict}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Link
                        to={`/so-sanh/${comp.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group-hover:bg-orange-600"
                      >
                        <span>Xem chi tiết cuộc đối đầu</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};
