import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { Article, ArticleBlock } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { WordBlogEditor } from '../../components/admin/WordBlogEditor';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  BookOpen,
  Sparkles,
  ArrowLeft,
  Save,
  Send,
  ChevronDown,
  CheckCircle2,
  FileText,
  Star,
  Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toSlug } from '../../utils/formatters';

export const AdminArticlesPage: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const [search, setSearch] = useState('');
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<'guide' | 'review' | 'comparison'>('guide');
  const [productType, setProductType] = useState<'physical' | 'digital'>('physical');
  const [coverImage, setCoverImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [blocks, setBlocks] = useState<ArticleBlock[]>([]);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [isTopRanking, setIsTopRanking] = useState<boolean | number | undefined>(undefined);
  const [topRankOrder, setTopRankOrder] = useState<number | null | undefined>(undefined);

  // Auto top rank map by views with rank numbers
  const autoTopRankMap = React.useMemo(() => {
    const published = articles.filter((a) => a.status === 'published');
    const sorted = [...published].sort((a, b) => (b.views || 0) - (a.views || 0));
    const map = new Map<string, number>();
    sorted.forEach((art, idx) => {
      map.set(art.id, idx + 1);
    });
    return map;
  }, [articles]);

  // Open Full-Page Editor for new article
  const handleOpenCreate = () => {
    setEditingArticle(null);
    setTitle('');
    setSlug('');
    setType('guide');
    setProductType('physical');
    setCoverImage('');
    setExcerpt('');
    setContent('');
    setBlocks([]);
    setStatus('published');
    setIsFeatured(false);
    setIsTopRanking(undefined);
    setTopRankOrder(undefined);
    setCurrentView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Full-Page Editor for editing existing article
  const handleOpenEdit = (a: Article) => {
    setEditingArticle(a);
    setTitle(a.title);
    setSlug(a.slug);
    setType(a.type as any);
    setProductType(a.productType);
    setCoverImage(a.coverImage);
    setExcerpt(a.excerpt);
    setContent(a.content || '');
    setBlocks(a.blocks || []);
    setStatus(a.status || 'published');
    setIsFeatured(a.isFeatured ?? false);
    setIsTopRanking(a.isTopRanking);
    setTopRankOrder(a.topRankOrder ?? (typeof a.isTopRanking === 'number' ? a.isTopRanking : a.isTopRanking === true ? 1 : a.isTopRanking === false ? -1 : undefined));
    setCurrentView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = async () => {
    if (title.trim() || content.trim()) {
      const ok = await confirm({
        title: 'Thoát khỏi trang soạn thảo?',
        message: 'Các thay đổi chưa lưu có thể bị mất nếu bạn rời khỏi trang.',
        confirmText: 'Rời khỏi',
        cancelText: 'Tiếp tục soạn',
        type: 'warning'
      });
      if (!ok) return;
    }
    setCurrentView('list');
  };

  const handleSave = (targetStatus?: 'published' | 'draft') => {
    if (!title.trim()) {
      showToast('Vui lòng nhập tiêu đề bài viết!', { type: 'error' });
      return;
    }

    const saveStatus = targetStatus || status;
    const generatedSlug = toSlug(slug.trim()) || toSlug(title);

    if (editingArticle) {
      updateArticle(editingArticle.id, {
        title,
        slug: generatedSlug,
        type,
        productType,
        coverImage,
        excerpt: excerpt || title,
        content,
        blocks,
        status: saveStatus,
        isFeatured,
        isTopRanking: topRankOrder === -1 ? false : (typeof topRankOrder === 'number' ? topRankOrder : undefined),
        topRankOrder: topRankOrder ?? null
      });
      showToast(`Đã cập nhật bài viết "${title}"!`, { type: 'success' });
    } else {
      addArticle({
        title,
        slug: generatedSlug,
        type,
        productType,
        categorySlug: productType === 'physical' ? 'gia-dung' : 'ai',
        coverImage: coverImage || '',
        excerpt: excerpt || title,
        content,
        blocks,
        authorId: 'expert-1',
        readingTime: '5 phút đọc',
        tags: [type, productType],
        status: saveStatus,
        isFeatured,
        isTopRanking: topRankOrder === -1 ? false : (typeof topRankOrder === 'number' ? topRankOrder : undefined),
        topRankOrder: topRankOrder ?? null
      });
      showToast(`Đã ${saveStatus === 'published' ? 'xuất bản' : 'lưu nháp'} bài viết thành công!`, {
        type: 'success'
      });
    }

    setCurrentView('list');
  };

  const handleDelete = async (a: Article) => {
    const ok = await confirm({
      title: 'Xóa bài viết',
      message: `Bạn có chắc muốn xóa bài viết "${a.title}"?`,
      confirmText: 'Xác nhận xóa',
      cancelText: 'Hủy bỏ',
      type: 'danger'
    });
    if (ok) {
      deleteArticle(a.id);
      showToast('Đã xóa bài viết thành công!', { type: 'info' });
    }
  };

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Bài viết & Tiêu đề',
      className: 'min-w-[280px] sm:min-w-[340px] max-w-lg',
      accessor: (a: Article) => (
        <div className="flex items-center gap-3">
          <img
            src={a.coverImage}
            alt={a.title}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0 border border-slate-200/60"
          />
          <div className="min-w-0 flex-1">
            <span className="font-bold text-xs sm:text-sm text-slate-900 block leading-snug line-clamp-2">{a.title}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {a.readingTime} • {a.publishedAt}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Nhóm sản phẩm',
      className: 'whitespace-nowrap',
      accessor: (a: Article) => (
        <span className="text-xs font-semibold text-slate-600">
          {a.productType === 'physical' ? 'Vật lý' : 'Số & AI'}
        </span>
      )
    },
    {
      header: 'Trạng thái',
      className: 'whitespace-nowrap',
      accessor: (a: Article) => (
        <div className="relative inline-block">
          <select
            value={a.status || 'published'}
            onChange={(e) => updateArticle(a.id, { status: e.target.value as any })}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 transition-all ${
              a.status === 'published'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/70 focus:ring-emerald-400'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 focus:ring-slate-400'
            }`}
          >
            <option value="published">Xuất bản</option>
            <option value="draft">Bản nháp</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 text-slate-600" />
        </div>
      )
    },
    {
      header: 'Trang chính',
      className: 'text-center whitespace-nowrap',
      accessor: (a: Article) => {
        const isCurrentlyFeatured = a.isFeatured ?? false;
        return (
          <button
            type="button"
            onClick={() => {
              const next = !isCurrentlyFeatured;
              updateArticle(a.id, { isFeatured: next });
              showToast(
                next ? 'Đã chọn hiển thị bài viết trên trang chính!' : 'Đã bỏ hiển thị bài viết trên trang chính!',
                { type: next ? 'success' : 'info' }
              );
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              isCurrentlyFeatured
                ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                : 'bg-slate-100 text-slate-400 border border-slate-200/80 hover:bg-slate-200/70 hover:text-slate-600'
            }`}
            title={isCurrentlyFeatured ? 'Bấm để bỏ hiển thị trên trang chính' : 'Bấm để hiển thị trên trang chính'}
          >
            <Star className={`w-3.5 h-3.5 ${isCurrentlyFeatured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{isCurrentlyFeatured ? 'Trang chính' : 'Không'}</span>
          </button>
        );
      }
    },
    {
      header: 'Top Bảng Xếp Hạng',
      className: 'text-center whitespace-nowrap',
      accessor: (a: Article) => {
        const manualRank =
          typeof a.topRankOrder === 'number' && a.topRankOrder >= 1 && a.topRankOrder <= 10
            ? a.topRankOrder
            : typeof a.isTopRanking === 'number' && a.isTopRanking >= 1 && a.isTopRanking <= 10
            ? a.isTopRanking
            : a.isTopRanking === true
            ? 1
            : null;

        const isExcluded = a.isTopRanking === false || a.topRankOrder === -1;
        const autoRank = autoTopRankMap.get(a.id);
        const isAutoTop = manualRank === null && !isExcluded && autoRank !== undefined && autoRank <= 10;

        let selectVal = 'auto';
        if (manualRank !== null) selectVal = String(manualRank);
        else if (isExcluded) selectVal = 'excluded';

        return (
          <div className="relative inline-block text-left">
            <select
              value={selectVal}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'excluded') {
                  updateArticle(a.id, { isTopRanking: false, topRankOrder: -1 });
                  showToast('Đã ẩn bài viết khỏi Top Bảng Xếp Hạng!', { type: 'info' });
                } else if (val === 'auto') {
                  updateArticle(a.id, { isTopRanking: undefined, topRankOrder: null });
                  showToast('Đã đặt lại bài viết về Mặc định (Theo lượt xem)!', { type: 'success' });
                } else {
                  const num = parseInt(val, 10);
                  updateArticle(a.id, { isTopRanking: num, topRankOrder: num });
                  showToast(`Đã ghim bài viết vào vị trí Top #${num}!`, { type: 'success' });
                }
              }}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 transition-all ${
                manualRank !== null
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-600 focus:ring-orange-400 shadow-2xs'
                  : isExcluded
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 focus:ring-rose-400'
                  : isAutoTop
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 focus:ring-amber-400'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 focus:ring-slate-400'
              }`}
            >
              <option value="auto">
                {isAutoTop
                  ? `⚡ Top #${autoRank} (Mặc định lượt xem)`
                  : autoRank
                  ? `⚡ Hạng #${autoRank} (Theo lượt xem)`
                  : '⚡ Mặc định (Theo lượt xem)'}
              </option>
              <option value="1">🏆 Top 1</option>
              <option value="2">🏆 Top 2</option>
              <option value="3">🏆 Top 3</option>
              <option value="4">🏆 Top 4</option>
              <option value="5">🏆 Top 5</option>
              <option value="6">🏆 Top 6</option>
              <option value="7">🏆 Top 7</option>
              <option value="8">🏆 Top 8</option>
              <option value="9">🏆 Top 9</option>
              <option value="10">🏆 Top 10</option>
              <option value="excluded">🚫 Ẩn khỏi Top</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
          </div>
        );
      }
    },
    {
      header: 'Thao tác',
      className: 'text-right whitespace-nowrap',
      accessor: (a: Article) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleOpenEdit(a)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Soạn thảo & Chỉnh sửa"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(a)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Xóa bài viết"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // =========================================================================
  // VIEW 1: DEDICATED FULL-PAGE ARTICLE EDITOR
  // =========================================================================
  if (currentView === 'editor') {
    return (
      <div className="min-h-screen bg-slate-50/60 pb-20 space-y-6">
        {/* Sticky Editor Top Header Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 shadow-2xs">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBackToList}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="Quay lại danh sách bài viết"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>

              <div className="h-5 w-[1px] bg-slate-200" />

              <div>
                <h1 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span>{editingArticle ? 'Chỉnh Sửa Bài Viết' : 'Soạn Thảo Bài Viết Mới'}</span>
                </h1>
                <p className="text-[11px] text-slate-400">
                  Trình soạn thảo chuyên nghiệp theo chuẩn Word & Media blocks
                </p>
              </div>
            </div>

            {/* Top Action Buttons: Save Draft & Publish */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto flex-wrap">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-xs font-bold text-slate-700 cursor-pointer transition-colors border border-slate-200 select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer"
                />
                <Star className={`w-3.5 h-3.5 ${isFeatured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                <span>Hiển thị trang chính</span>
              </label>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-xs font-bold text-orange-800">
                <Flame className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                <span className="text-[11px] text-slate-500 font-medium">Bảng xếp hạng:</span>
                <select
                  value={
                    topRankOrder === -1 || isTopRanking === false
                      ? 'excluded'
                      : typeof topRankOrder === 'number' && topRankOrder >= 1 && topRankOrder <= 10
                      ? String(topRankOrder)
                      : typeof isTopRanking === 'number' && isTopRanking >= 1 && isTopRanking <= 10
                      ? String(isTopRanking)
                      : isTopRanking === true
                      ? '1'
                      : 'auto'
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'excluded') {
                      setTopRankOrder(-1);
                      setIsTopRanking(false);
                    } else if (val === 'auto') {
                      setTopRankOrder(null);
                      setIsTopRanking(undefined);
                    } else {
                      const num = parseInt(val, 10);
                      setTopRankOrder(num);
                      setIsTopRanking(num);
                    }
                  }}
                  className="bg-transparent font-bold text-xs outline-none cursor-pointer text-slate-900 pr-1"
                >
                  <option value="auto">⚡ Mặc định (Theo lượt xem)</option>
                  <option value="1">🏆 Top 1</option>
                  <option value="2">🏆 Top 2</option>
                  <option value="3">🏆 Top 3</option>
                  <option value="4">🏆 Top 4</option>
                  <option value="5">🏆 Top 5</option>
                  <option value="6">🏆 Top 6</option>
                  <option value="7">🏆 Top 7</option>
                  <option value="8">🏆 Top 8</option>
                  <option value="9">🏆 Top 9</option>
                  <option value="10">🏆 Top 10</option>
                  <option value="excluded">🚫 Ẩn khỏi Top</option>
                </select>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSave('draft')}
                leftIcon={<Save className="w-4 h-4 text-slate-600" />}
              >
                Lưu nháp
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => handleSave('published')}
                leftIcon={<Send className="w-4 h-4" />}
              >
                {editingArticle ? 'Lưu & Xuất bản' : 'Xuất bản bài viết'}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Editor Canvas Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Single Unified Card: Toolbar at top -> Metadata -> Word Document Content */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm">
            <WordBlogEditor
              value={content}
              blocks={blocks}
              slug={slug}
              title={title}
              onChange={(newHtml, newBlocks) => {
                setContent(newHtml);
                setBlocks(newBlocks);
              }}
              placeholder="Bắt đầu gõ nội dung bài viết, chèn ảnh, bảng, video..."
              minHeight="560px"
              embedded={true}
              headerContent={
                <div className="space-y-6">
                  {/* Cover Image (At the Top) */}
                  <div>
                    <ImageUpload
                      label="Ảnh bìa bài viết"
                      value={coverImage}
                      onChange={setCoverImage}
                      multiple={false}
                    />
                  </div>

                  {/* Title Input */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Tiêu đề bài viết:
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (!editingArticle) {
                          setSlug(toSlug(e.target.value));
                        }
                      }}
                      placeholder="Nhập tiêu đề bài viết cẩm nang, đánh giá sản phẩm..."
                      className="w-full text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 placeholder:text-slate-300 bg-transparent border-b-2 border-slate-200 focus:border-orange-500 outline-none pb-2 transition-colors"
                      autoFocus
                    />
                  </div>

                  {/* Custom Slug URL */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                    <span className="font-semibold text-slate-400">Đường dẫn:</span>
                    <span className="text-slate-400">/huong-dan/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="slug-url-bai-viet"
                      className="font-mono text-orange-600 font-semibold bg-transparent outline-none flex-1"
                    />
                  </div>

                  {/* 3-Column Attributes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                    <Select
                      label="Thể loại bài viết"
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      options={[
                        { value: 'guide', label: 'Hướng dẫn chọn mua' },
                        { value: 'review', label: 'Bài đánh giá chuyên sâu' },
                        { value: 'comparison', label: 'Bài so sánh đối đầu' }
                      ]}
                    />
                    <Select
                      label="Nhóm sản phẩm"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value as any)}
                      options={[
                        { value: 'physical', label: 'Sản phẩm vật lý (Gia dụng/Công nghệ)' },
                        { value: 'digital', label: 'Sản phẩm số & AI' }
                      ]}
                    />
                    <Select
                      label="Trạng thái xuất bản"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      options={[
                        { value: 'published', label: 'Xuất bản (Hiển thị ngay)' },
                        { value: 'draft', label: 'Bản nháp (Lưu tạm)' }
                      ]}
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Tóm tắt ngắn (Excerpt):
                    </label>
                    <textarea
                      rows={3}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Đoạn mô tả ngắn gọn nội dung bài viết hiển thị ở thẻ ngoài trang chủ..."
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </div>
              }
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <Button variant="outline" size="sm" onClick={handleBackToList} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Quay lại danh sách
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleSave('draft')}>
                Lưu nháp
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleSave('published')}>
                {editingArticle ? 'Lưu cập nhật' : 'Xuất bản ngay'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ARTICLE LIST & DATA TABLE
  // =========================================================================
  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Quản Lý Bài Viết & Cẩm Nang"
        description="Quản lý toàn bộ bài hướng dẫn chọn mua, bài đánh giá tổng hợp và cẩm nang người dùng."
        actions={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreate}
          >
            Viết bài mới
          </Button>
        }
      />

      <div className="px-6 space-y-6">
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(a) => a.id}
          searchPlaceholder="Tìm kiếm bài viết..."
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>
    </div>
  );
};
