import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Article } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Plus, Edit2, Trash2, Eye, BookOpen, Sparkles, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminArticlesPage: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle } = useData();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<'guide' | 'review' | 'comparison'>('guide');
  const [productType, setProductType] = useState<'physical' | 'digital'>('physical');
  const [coverImage, setCoverImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  const openAddModal = () => {
    setEditingArticle(null);
    setTitle('');
    setSlug('');
    setType('guide');
    setProductType('physical');
    setCoverImage('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80');
    setExcerpt('Tóm tắt ngắn về bài hướng dẫn lựa chọn sản phẩm...');
    setContent('Nội dung chi tiết bài viết...');
    setModalOpen(true);
  };

  const openEditModal = (a: Article) => {
    setEditingArticle(a);
    setTitle(a.title);
    setSlug(a.slug);
    setType(a.type as any);
    setProductType(a.productType);
    setCoverImage(a.coverImage);
    setExcerpt(a.excerpt);
    setContent(a.content);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const generatedSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingArticle) {
      updateArticle(editingArticle.id, {
        title,
        slug: generatedSlug,
        type,
        productType,
        coverImage,
        excerpt,
        content
      });
      showToast(`Đã cập nhật bài viết "${title}"!`, { type: 'success' });
    } else {
      addArticle({
        title,
        slug: generatedSlug,
        type,
        productType,
        categorySlug: 'noi-chien',
        coverImage,
        excerpt,
        content,
        authorId: 'expert-1',
        readingTime: '5 phút đọc',
        tags: ['Cẩm nang', 'Mẹo hay'],
        status: 'published'
      });
      showToast(`Đã đăng bài viết mới thành công!`, { type: 'success' });
    }

    setModalOpen(false);
  };

  const handleDelete = (a: Article) => {
    if (window.confirm(`Bạn có chắc muốn xóa bài viết "${a.title}"?`)) {
      deleteArticle(a.id);
      showToast('Đã xóa bài viết thành công!', { type: 'info' });
    }
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Bài viết & Tiêu đề',
      accessor: (a: Article) => (
        <div className="flex items-center gap-3">
          <img
            src={a.coverImage}
            alt={a.title}
            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
          />
          <div className="min-w-0 max-w-sm">
            <span className="font-bold text-xs text-slate-900 block truncate">{a.title}</span>
            <span className="text-[11px] text-slate-400 block truncate">{a.readingTime} • {a.publishedAt}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Thể loại',
      accessor: (a: Article) => (
        <Badge variant={a.type === 'guide' ? 'indigo' : 'warning'} size="sm">
          {a.type === 'guide' ? 'Hướng dẫn' : a.type === 'comparison' ? 'So sánh' : 'Đánh giá'}
        </Badge>
      )
    },
    {
      header: 'Nhóm',
      accessor: (a: Article) => (
        <Badge variant={a.productType === 'physical' ? 'warning' : 'indigo'} size="sm">
          {a.productType === 'physical' ? 'Vật lý' : 'Số'}
        </Badge>
      )
    },
    {
      header: 'Lượt xem',
      accessor: (a: Article) => (
        <span className="font-semibold text-xs text-slate-700">
          {a.views.toLocaleString('vi-VN')}
        </span>
      )
    },
    {
      header: 'Hành động',
      className: 'text-right',
      accessor: (a: Article) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/huong-dan/${a.slug}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            title="Xem"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => openEditModal(a)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
            title="Sửa"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(a)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
            title="Xóa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Quản Lý Bài Viết & Cẩm Nang (Articles)"
        description="Quản lý toàn bộ bài hướng dẫn chọn mua, bài đánh giá tổng hợp và cẩm nang người dùng."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingArticle ? 'Chỉnh Sửa Bài Viết' : 'Soạn Thảo Bài Viết Mới'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Tiêu đề bài viết"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!editingArticle) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }
            }}
            placeholder="Hướng dẫn chọn mua..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Thể loại bài viết"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              options={[
                { value: 'guide', label: 'Hướng dẫn chọn mua (Guide)' },
                { value: 'review', label: 'Bài đánh giá (Review)' },
                { value: 'comparison', label: 'Bài so sánh (Comparison)' }
              ]}
            />
            <Select
              label="Nhóm sản phẩm"
              value={productType}
              onChange={(e) => setProductType(e.target.value as any)}
              options={[
                { value: 'physical', label: 'Sản phẩm vật lý' },
                { value: 'digital', label: 'Sản phẩm số & AI' }
              ]}
            />
          </div>

          <Input
            label="Ảnh bìa bài viết (URL)"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Đoạn tóm tắt (Excerpt)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nội dung bài viết (Markdown / Text)
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingArticle ? 'Lưu cập nhật' : 'Xuất bản bài viết'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
