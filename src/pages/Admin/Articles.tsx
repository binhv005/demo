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
import {
  getManualArticleRank,
  isArticleExcludedFromTop,
  getArticleResolvedRankMap,
  getArticleNaturalViewRankMap
} from '../../utils/articleRank';

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
  const [isTopRanking, setIsTopRanking] = useState<boolean | number | null | undefined>(null);
  const [topRankOrder, setTopRankOrder] = useState<number | null | undefined>(null);

  // Accurately resolved ranking map (strictly 1 article per rank, aligned with Homepage)
  const resolvedRankMap = React.useMemo(() => {
    return getArticleResolvedRankMap(articles);
  }, [articles]);

  // Pure natural view ranking map (sorted purely by views descending without manual slot shifts)
  const naturalViewRankMap = React.useMemo(() => {
    return getArticleNaturalViewRankMap(articles);
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
    setIsTopRanking(null);
    setTopRankOrder(null);
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
    setIsTopRanking(a.isTopRanking ?? null);
    setTopRankOrder(a.topRankOrder ?? (typeof a.isTopRanking === 'number' ? a.isTopRanking : a.isTopRanking === true ? 1 : a.isTopRanking === false ? -1 : null));
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

  const handleRankChange = async (targetArticle: Article, val: string) => {
    if (targetArticle.status === 'draft') {
      showToast(
        'Bài viết đang ở trạng thái Bản nháp! Vui lòng chuyển sang "Xuất bản" trước khi ghim vào Bảng xếp hạng.',
        { type: 'error' }
      );
      return;
    }

    if (val === 'excluded') {
      await updateArticle(targetArticle.id, { isTopRanking: false, topRankOrder: -1 });
      showToast(`Đã ẩn bài viết "${targetArticle.title}" khỏi Top Bảng Xếp Hạng!`, { type: 'info' });
      return;
    }

    if (val === 'auto') {
      await updateArticle(targetArticle.id, { isTopRanking: null, topRankOrder: null });
      showToast(`Đã đặt lại bài viết "${targetArticle.title}" về Mặc định (Theo lượt xem)!`, { type: 'success' });
      return;
    }

    const newRank = parseInt(val, 10);
    if (isNaN(newRank) || newRank < 1 || newRank > 10) return;

    const currentTargetRank = getManualArticleRank(targetArticle);

    // Find any conflicting articles with this rank (strict uniqueness - no 2 articles at same rank)
    const conflictingArticles = articles.filter(
      (art) => art.id !== targetArticle.id && getManualArticleRank(art) === newRank
    );

    if (conflictingArticles.length > 0) {
      if (currentTargetRank !== null && currentTargetRank !== newRank) {
        // Swap rank with the first conflicting article
        const firstConflict = conflictingArticles[0];
        await updateArticle(firstConflict.id, { isTopRanking: currentTargetRank, topRankOrder: currentTargetRank });
        for (let i = 1; i < conflictingArticles.length; i++) {
          await updateArticle(conflictingArticles[i].id, { isTopRanking: null, topRankOrder: null });
        }
        await updateArticle(targetArticle.id, { isTopRanking: newRank, topRankOrder: newRank });
        showToast(
          `Đã chuyển "${targetArticle.title}" sang Top #${newRank} và hoán đổi vị trí với "${firstConflict.title}" (về Top #${currentTargetRank})!`,
          { type: 'success' }
        );
      } else {
        // Displace conflicting article(s) to auto default
        for (const conf of conflictingArticles) {
          await updateArticle(conf.id, { isTopRanking: null, topRankOrder: null });
        }
        await updateArticle(targetArticle.id, { isTopRanking: newRank, topRankOrder: newRank });
        showToast(
          `Đã ghim "${targetArticle.title}" vào Top #${newRank} (Bài viết "${conflictingArticles[0].title}" chuyển về Mặc định)!`,
          { type: 'success' }
        );
      }
    } else {
      await updateArticle(targetArticle.id, { isTopRanking: newRank, topRankOrder: newRank });
      showToast(`Đã ghim bài viết "${targetArticle.title}" vào vị trí Top #${newRank}!`, { type: 'success' });
    }
  };

  const handleSave = async (targetStatus?: 'published' | 'draft') => {
    if (!title.trim()) {
      showToast('Vui lòng nhập tiêu đề bài viết!', { type: 'error' });
      return;
    }

    const saveStatus = targetStatus || status || 'published';
    const generatedSlug = toSlug(slug.trim()) || toSlug(title);
    const isDraft = saveStatus === 'draft';
    const otherFeaturedCount = articles.filter(
      (a) => (!editingArticle || a.id !== editingArticle.id) && a.status === 'published' && a.isFeatured
    ).length;

    let finalIsFeatured = isDraft ? false : isFeatured;
    if (finalIsFeatured && otherFeaturedCount >= 3) {
      showToast(
        'Trang chính chỉ được hiển thị tối đa 3 bài viết! Bài viết đã được lưu nhưng không được ghim lên trang chính.',
        { type: 'info' }
      );
      finalIsFeatured = false;
    }

    const finalTopRankOrder = isDraft ? null : (topRankOrder ?? null);
    const finalIsTopRanking = isDraft
      ? false
      : topRankOrder === -1
      ? false
      : typeof topRankOrder === 'number'
      ? topRankOrder
      : null;

    // Resolve any rank conflict before saving
    if (!isDraft && typeof finalTopRankOrder === 'number' && finalTopRankOrder >= 1 && finalTopRankOrder <= 10) {
      const oldRank = editingArticle ? getManualArticleRank(editingArticle) : null;
      const conflicting = articles.filter(
        (a) => (!editingArticle || a.id !== editingArticle.id) && getManualArticleRank(a) === finalTopRankOrder
      );

      if (conflicting.length > 0) {
        if (oldRank !== null && oldRank !== finalTopRankOrder) {
          await updateArticle(conflicting[0].id, { isTopRanking: oldRank, topRankOrder: oldRank });
          for (let i = 1; i < conflicting.length; i++) {
            await updateArticle(conflicting[i].id, { isTopRanking: null, topRankOrder: null });
          }
        } else {
          for (const conf of conflicting) {
            await updateArticle(conf.id, { isTopRanking: null, topRankOrder: null });
          }
        }
      }
    }

    if (editingArticle) {
      await updateArticle(editingArticle.id, {
        title,
        slug: generatedSlug,
        type,
        productType,
        coverImage,
        excerpt: excerpt || title,
        content,
        blocks,
        status: saveStatus,
        isFeatured: finalIsFeatured,
        isTopRanking: finalIsTopRanking,
        topRankOrder: finalTopRankOrder
      });
      showToast(`Đã cập nhật bài viết "${title}"!`, { type: 'success' });
    } else {
      await addArticle({
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
        isFeatured: finalIsFeatured,
        isTopRanking: finalIsTopRanking,
        topRankOrder: finalTopRankOrder
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
            onChange={(e) => {
              const newStatus = e.target.value as 'published' | 'draft';
              const updates: Partial<Article> = { status: newStatus };
              if (newStatus === 'draft') {
                if (a.isFeatured) updates.isFeatured = false;
                if (a.topRankOrder !== null && a.topRankOrder !== -1) {
                  updates.topRankOrder = -1;
                  updates.isTopRanking = false;
                }
                showToast(
                  'Đã chuyển sang Bản nháp và tự động gỡ khỏi Trang chính & Top Bảng xếp hạng!',
                  { type: 'info' }
                );
              } else {
                showToast('Đã chuyển bài viết sang trạng thái Xuất bản!', { type: 'success' });
              }
              updateArticle(a.id, updates);
            }}
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
      header: `Trang chính (${articles.filter((art) => art.status === 'published' && art.isFeatured).length}/3)`,
      className: 'text-center whitespace-nowrap',
      accessor: (a: Article) => {
        const isDraft = a.status === 'draft';
        const isCurrentlyFeatured = !isDraft && (a.isFeatured ?? false);
        const otherFeaturedCount = articles.filter(
          (art) => art.id !== a.id && art.status === 'published' && art.isFeatured
        ).length;

        return (
          <button
            type="button"
            onClick={() => {
              if (isDraft) {
                showToast(
                  'Bài viết đang ở trạng thái Bản nháp! Vui lòng chuyển sang "Xuất bản" trước khi đưa lên trang chính.',
                  { type: 'error' }
                );
                return;
              }

              const next = !isCurrentlyFeatured;
              if (next && otherFeaturedCount >= 3) {
                showToast(
                  'Trang chính chỉ được chọn tối đa 3 bài viết! Vui lòng bỏ bớt bài viết khác trước khi ghim bài này.',
                  { type: 'error' }
                );
                return;
              }

              updateArticle(a.id, { isFeatured: next });
              showToast(
                next
                  ? `Đã chọn hiển thị bài viết trên trang chính (${otherFeaturedCount + 1}/3)!`
                  : `Đã bỏ hiển thị bài viết trên trang chính (${otherFeaturedCount}/3)!`,
                { type: next ? 'success' : 'info' }
              );
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
              isDraft
                ? 'bg-slate-50 text-slate-300 border border-slate-200/60 cursor-not-allowed opacity-70'
                : isCurrentlyFeatured
                ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 cursor-pointer'
                : otherFeaturedCount >= 3
                ? 'bg-slate-100 text-slate-400 border border-slate-200/80 hover:border-amber-300 hover:text-amber-700 cursor-pointer'
                : 'bg-slate-100 text-slate-400 border border-slate-200/80 hover:bg-slate-200/70 hover:text-slate-600 cursor-pointer'
            }`}
            title={
              isDraft
                ? 'Không thể đưa bài nháp lên trang chính. Vui lòng chuyển trạng thái sang Xuất bản trước.'
                : isCurrentlyFeatured
                ? 'Bấm để bỏ hiển thị trên trang chính'
                : otherFeaturedCount >= 3
                ? 'Đã đủ 3 bài trên trang chính. Bỏ bớt bài khác để thêm bài này.'
                : 'Bấm để hiển thị trên trang chính (Tối đa 3 bài)'
            }
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
        const isDraft = a.status === 'draft';
        const manualRank = getManualArticleRank(a);
        const isExcluded = isArticleExcludedFromTop(a);
        const rankInfo = resolvedRankMap.get(a.id);
        const resolvedRankNumber = rankInfo?.rank;
        const naturalRankNumber = naturalViewRankMap.get(a.id);
        const isAutoTop = !isDraft && manualRank === null && !isExcluded && resolvedRankNumber !== undefined && resolvedRankNumber <= 10;

        let selectVal = isDraft ? 'excluded' : 'auto';
        if (manualRank !== null) selectVal = String(manualRank);
        else if (isExcluded) selectVal = 'excluded';

        return (
          <div className="relative inline-block text-left">
            <select
              value={selectVal}
              disabled={isDraft}
              onChange={(e) => handleRankChange(a, e.target.value)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border appearance-none pr-8 transition-all [&>option]:bg-white [&>option]:text-slate-900 ${
                isDraft
                  ? 'bg-slate-50 text-slate-300 border-slate-200/60 cursor-not-allowed'
                  : manualRank !== null
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-600 focus:ring-orange-400 shadow-2xs cursor-pointer'
                  : isExcluded
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 focus:ring-rose-400 cursor-pointer'
                  : isAutoTop
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 focus:ring-amber-400 cursor-pointer'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 focus:ring-slate-400 cursor-pointer'
              }`}
            >
              <option value="auto" className="bg-white text-slate-900">
                {naturalRankNumber
                  ? `⚡ Hạng #${naturalRankNumber} (Theo lượt xem)`
                  : '⚡ Mặc định (Theo lượt xem)'}
              </option>
              <option value="1" className="bg-white text-slate-900">🏆 Top 1</option>
              <option value="2" className="bg-white text-slate-900">🏆 Top 2</option>
              <option value="3" className="bg-white text-slate-900">🏆 Top 3</option>
              <option value="4" className="bg-white text-slate-900">🏆 Top 4</option>
              <option value="5" className="bg-white text-slate-900">🏆 Top 5</option>
              <option value="6" className="bg-white text-slate-900">🏆 Top 6</option>
              <option value="7" className="bg-white text-slate-900">🏆 Top 7</option>
              <option value="8" className="bg-white text-slate-900">🏆 Top 8</option>
              <option value="9" className="bg-white text-slate-900">🏆 Top 9</option>
              <option value="10" className="bg-white text-slate-900">🏆 Top 10</option>
              <option value="excluded" className="bg-white text-slate-900">🚫 Ẩn khỏi Top</option>
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
                      setIsTopRanking(null);
                    } else {
                      const num = parseInt(val, 10);
                      setTopRankOrder(num);
                      setIsTopRanking(num);
                    }
                  }}
                  className="bg-transparent font-bold text-xs outline-none cursor-pointer text-slate-900 pr-1 [&>option]:bg-white [&>option]:text-slate-900"
                >
                  <option value="auto" className="bg-white text-slate-900">
                    {editingArticle && naturalViewRankMap.get(editingArticle.id)
                      ? `⚡ Hạng #${naturalViewRankMap.get(editingArticle.id)} (Theo lượt xem)`
                      : '⚡ Mặc định (Theo lượt xem)'}
                  </option>
                  <option value="1" className="bg-white text-slate-900">🏆 Top 1</option>
                  <option value="2" className="bg-white text-slate-900">🏆 Top 2</option>
                  <option value="3" className="bg-white text-slate-900">🏆 Top 3</option>
                  <option value="4" className="bg-white text-slate-900">🏆 Top 4</option>
                  <option value="5" className="bg-white text-slate-900">🏆 Top 5</option>
                  <option value="6" className="bg-white text-slate-900">🏆 Top 6</option>
                  <option value="7" className="bg-white text-slate-900">🏆 Top 7</option>
                  <option value="8" className="bg-white text-slate-900">🏆 Top 8</option>
                  <option value="9" className="bg-white text-slate-900">🏆 Top 9</option>
                  <option value="10" className="bg-white text-slate-900">🏆 Top 10</option>
                  <option value="excluded" className="bg-white text-slate-900">🚫 Ẩn khỏi Top</option>
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
                      onChange={(e) => {
                        const newStatus = e.target.value as any;
                        setStatus(newStatus);
                        if (newStatus === 'draft') {
                          setIsFeatured(false);
                        }
                      }}
                      options={[
                        { value: 'published', label: 'Xuất bản (Hiển thị ngay)' },
                        { value: 'draft', label: 'Bản nháp (Lưu tạm)' }
                      ]}
                    />
                  </div>

                  {/* Featured on Homepage Toggle (Max 3) */}
                  {(() => {
                    const otherFeaturedCount = articles.filter(
                      (a) => (!editingArticle || a.id !== editingArticle.id) && a.status === 'published' && a.isFeatured
                    ).length;
                    const isDraft = status === 'draft';
                    const isMaxReached = otherFeaturedCount >= 3 && !isFeatured;

                    return (
                      <div className={`p-3.5 rounded-2xl border transition-colors ${
                        isDraft
                          ? 'bg-slate-50/60 border-slate-200/60 opacity-60'
                          : isFeatured
                          ? 'bg-amber-50/80 border-amber-200'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}>
                        <label className={`flex items-center gap-2.5 text-xs font-bold ${
                          isDraft ? 'text-slate-400 cursor-not-allowed' : 'text-slate-800 cursor-pointer'
                        } select-none`}>
                          <input
                            type="checkbox"
                            disabled={isDraft || isMaxReached}
                            checked={!isDraft && isFeatured}
                            onChange={(e) => {
                              if (e.target.checked && otherFeaturedCount >= 3) {
                                showToast('Trang chính chỉ được hiển thị tối đa 3 bài viết!', { type: 'error' });
                                return;
                              }
                              setIsFeatured(e.target.checked);
                            }}
                            className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer disabled:cursor-not-allowed"
                          />
                          <Star className={`w-4 h-4 ${!isDraft && isFeatured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                          <span>Hiển thị trên Trang chính làm bài tiêu điểm (Tối đa 3 bài - Hiện tại: {otherFeaturedCount + (isFeatured ? 1 : 0)}/3)</span>
                        </label>
                        {isDraft ? (
                          <p className="text-[11px] text-amber-600 font-medium mt-1 ml-6.5">
                            * Bài nháp không thể đưa lên Trang chính. Vui lòng chuyển trạng thái sang "Xuất bản" để kích hoạt.
                          </p>
                        ) : isMaxReached ? (
                          <p className="text-[11px] text-amber-700 font-medium mt-1 ml-6.5">
                            * Đã đạt tối đa 3 bài viết trên Trang chính. Vui lòng bỏ bớt bài khác trong danh sách quản lý để ghim bài này.
                          </p>
                        ) : null}
                      </div>
                    );
                  })()}

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
