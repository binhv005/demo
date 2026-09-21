import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useData } from '../../context/DataContext';
import { Product, Ranking, Article } from '../../types';
import { ScoreBadge } from '../ui/ScoreBadge';
import { formatPrice } from '../../utils/formatters';
import {
  Search,
  X,
  Sparkles,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectRanking?: (ranking: Ranking) => void;
  onSelectArticle?: (article: Article) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectRanking,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'rankings' | 'articles'>('all');
  const [groupFilter, setGroupFilter] = useState<'all' | 'physical' | 'digital'>('all');

  const { products, rankings, articles } = useData();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const published = products.filter((p) => p.status !== 'draft');
    if (!query.trim() && groupFilter === 'all') return published.slice(0, 8);
    return published.filter((p) => {
      const matchQuery =
        !query.trim() ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase());
      const matchGroup = groupFilter === 'all' || p.type === groupFilter;
      return matchQuery && matchGroup;
    });
  }, [products, query, groupFilter]);

  // Filter rankings
  const filteredRankings = useMemo(() => {
    const published = rankings.filter((r) => r.status !== 'draft');
    if (!query.trim() && groupFilter === 'all') return published.slice(0, 4);
    return published.filter((r) => {
      const matchQuery =
        !query.trim() ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase());
      const matchGroup = groupFilter === 'all' || r.type === groupFilter;
      return matchQuery && matchGroup;
    });
  }, [rankings, query, groupFilter]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    const published = articles.filter((a) => a.status === 'published' || !a.status);
    if (!query.trim() && groupFilter === 'all') return published.slice(0, 4);
    return published.filter((a) => {
      const matchQuery =
        !query.trim() ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchGroup = groupFilter === 'all' || a.productType === groupFilter;
      return matchQuery && matchGroup;
    });
  }, [articles, query, groupFilter]);

  const totalResults =
    (activeTab === 'all' || activeTab === 'products' ? filteredProducts.length : 0) +
    (activeTab === 'all' || activeTab === 'rankings' ? filteredRankings.length : 0) +
    (activeTab === 'all' || activeTab === 'articles' ? filteredArticles.length : 0);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex flex-col bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto p-4 sm:p-6 flex flex-col max-h-[90vh]">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col flex-1 max-h-[85vh]">
          {/* Top Search Bar Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
            <Search className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm, bài đánh giá, bảng xếp hạng Top 10..."
              autoFocus
              className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-semibold focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="px-5 py-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'products' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sản phẩm ({filteredProducts.length})
              </button>
              <button
                onClick={() => setActiveTab('rankings')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'rankings' ? 'bg-white text-amber-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Top 10 ({filteredRankings.length})
              </button>
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'articles' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cẩm nang ({filteredArticles.length})
              </button>
            </div>

            {/* Type Pills */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setGroupFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  groupFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tất cả loại
              </button>
              <button
                onClick={() => setGroupFilter('physical')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  groupFilter === 'physical' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Flame className="w-3 h-3 text-orange-400" /> Vật lý
              </button>
              <button
                onClick={() => setGroupFilter('digital')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  groupFilter === 'digital' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3 text-indigo-400" /> Số &amp; AI
              </button>
            </div>
          </div>

          {/* Results Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {totalResults === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700 text-sm">Không tìm thấy kết quả phù hợp</p>
                <p className="text-xs text-slate-400">Hãy thử tìm với từ khóa chung hơn như "nồi chiên", "laptop", "AI"...</p>
              </div>
            ) : (
              <>
                {/* 1. Products Section */}
                {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Sản phẩm &amp; Đánh giá ({filteredProducts.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onClose();
                            if (onSelectProduct) onSelectProduct(product);
                          }}
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:border-orange-400 hover:bg-orange-50/40 transition-all cursor-pointer group bg-white shadow-xs"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase truncate">
                                {product.brand} • {product.category}
                              </span>
                              <ScoreBadge score={product.score} size="sm" />
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-orange-600 truncate transition-colors">
                              {product.name}
                            </h4>
                            <span className="text-xs font-extrabold text-orange-600">
                              {formatPrice(product.price, product.priceUnit)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Rankings Section */}
                {(activeTab === 'all' || activeTab === 'rankings') && filteredRankings.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Bảng xếp hạng Top 10 ({filteredRankings.length})</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {filteredRankings.map((ranking) => (
                        <div
                          key={ranking.id}
                          onClick={() => {
                            onClose();
                            if (onSelectRanking) onSelectRanking(ranking);
                          }}
                          className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all cursor-pointer group bg-white"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-black text-xs">
                              <Award className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 truncate">
                                {ranking.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 truncate">{ranking.subtitle}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Articles Section */}
                {(activeTab === 'all' || activeTab === 'articles') && filteredArticles.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Cẩm nang &amp; Bài viết ({filteredArticles.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredArticles.map((art) => (
                        <div
                          key={art.id}
                          onClick={() => {
                            onClose();
                            if (onSelectArticle) onSelectArticle(art);
                          }}
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all cursor-pointer group bg-white shadow-xs"
                        >
                          <img
                            src={art.coverImage}
                            alt={art.title}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase">
                              {art.readingTime} đọc
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2 transition-colors">
                              {art.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer of Search Modal */}
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-400">
            <span>Mẹo: Nhấn ESC để đóng</span>
            <span className="font-semibold text-slate-600">TechReview Search Engine</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
