import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Product, ProductType } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { ScoreBadge } from '../../components/ui/ScoreBadge';
import { formatPrice } from '../../utils/formatters';
import { Plus, Edit2, Trash2, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modal & Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState<ProductType>('physical');
  const [categorySlug, setCategorySlug] = useState('noi-chien');
  const [categoryName, setCategoryName] = useState('Gia dụng');
  const [price, setPrice] = useState<number>(1000000);
  const [score, setScore] = useState<number>(9.0);
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('');
  const [bestFor, setBestFor] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [prosText, setProsText] = useState('');
  const [consText, setConsText] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setSlug('');
    setBrand('');
    setType('physical');
    setCategorySlug('noi-chien');
    setCategoryName('Gia dụng');
    setPrice(2000000);
    setScore(9.0);
    setImage('https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80');
    setBadge('Lựa chọn Mới');
    setBestFor('Người dùng cần thiết bị chất lượng cao');
    setShortDesc('Mô tả ngắn gọn về sản phẩm và các điểm mạnh nổi bật...');
    setProsText('Thiết kế đẹp và bền bỉ\nHiệu năng cao\nTiết kiệm điện');
    setConsText('Giá thành hơi cao\nTrọng lượng nặng');
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setSlug(p.slug);
    setBrand(p.brand);
    setType(p.type);
    setCategorySlug(p.categorySlug);
    setCategoryName(p.category);
    setPrice(p.price);
    setScore(p.score);
    setImage(p.image);
    setBadge(p.badge || '');
    setBestFor(p.bestFor);
    setShortDesc(p.shortDescription);
    setProsText(p.pros.join('\n'));
    setConsText(p.cons.join('\n'));
    setStatus(p.status === 'archived' ? 'draft' : p.status);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const generatedSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const pros = prosText.split('\n').map((s) => s.trim()).filter(Boolean);
    const cons = consText.split('\n').map((s) => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        slug: generatedSlug,
        brand,
        type,
        categorySlug,
        category: categoryName,
        price,
        score,
        image,
        badge: badge || undefined,
        bestFor,
        shortDescription: shortDesc,
        pros,
        cons,
        status
      });
      showToast(`Đã cập nhật thông tin sản phẩm "${name}"!`, { type: 'success' });
    } else {
      addProduct({
        name,
        slug: generatedSlug,
        brand,
        type,
        categorySlug,
        category: categoryName,
        groupSlug: type === 'physical' ? 'gia-dung' : 'ai',
        price,
        score,
        ratingCount: 1,
        image,
        badge: badge || undefined,
        bestFor,
        shortDescription: shortDesc,
        deepReview: `${name} là sản phẩm mới được bổ sung vào cơ sở dữ liệu kiểm nghiệm của TechReview.`,
        specs: {
          'Thương hiệu': brand,
          'Phân khúc': 'Chính hãng',
          'Bảo hành': '12 tháng'
        },
        scoreBreakdown: {
          design: Math.min(10, score + 0.1),
          performance: score,
          value: Math.max(7, score - 0.2),
          usability: score
        },
        pros,
        cons,
        status
      });
      showToast(`Đã thêm mới sản phẩm "${name}" thành công!`, { type: 'success' });
    }

    setModalOpen(false);
  };

  const handleDelete = (p: Product) => {
    if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${p.name}"?`)) {
      deleteProduct(p.id);
      showToast(`Đã xóa sản phẩm "${p.name}"!`, { type: 'info' });
    }
  };

  // Filtering & Pagination
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'all' || p.type === filterType;
      const matchStatus = filterStatus === 'all' || p.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [products, search, filterType, filterStatus]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedData = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    {
      header: 'Sản phẩm',
      accessor: (p: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={p.image}
            alt={p.name}
            className="w-11 h-11 rounded-xl object-cover border border-slate-200/80 shadow-xs flex-shrink-0"
          />
          <div className="min-w-0 max-w-xs">
            <span className="font-bold text-xs text-slate-900 block truncate hover:text-indigo-600">
              {p.name}
            </span>
            <span className="text-[11px] text-slate-400 block truncate">
              {p.brand} • {p.category}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Loại',
      accessor: (p: Product) => (
        <Badge variant={p.type === 'physical' ? 'warning' : 'indigo'} size="sm">
          {p.type === 'physical' ? 'Vật lý' : 'Số & AI'}
        </Badge>
      )
    },
    {
      header: 'Điểm số',
      accessor: (p: Product) => <ScoreBadge score={p.score} size="sm" />
    },
    {
      header: 'Giá tham khảo',
      accessor: (p: Product) => (
        <span className="font-bold text-xs text-slate-900">
          {formatPrice(p.price, p.priceUnit)}
        </span>
      )
    },
    {
      header: 'Trạng thái',
      accessor: (p: Product) => (
        <Badge variant={p.status === 'published' ? 'success' : 'slate'} size="sm">
          {p.status === 'published' ? 'Xuất bản' : 'Bản nháp'}
        </Badge>
      )
    },
    {
      header: 'Cập nhật',
      accessor: (p: Product) => <span className="text-xs text-slate-400">{p.updatedAt}</span>
    },
    {
      header: 'Hành động',
      className: 'text-right',
      accessor: (p: Product) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/review/${p.slug}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Xem trang Review thật"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => openEditModal(p)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Chỉnh sửa"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(p)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
        title="Quản Lý Sản Phẩm (Products)"
        description="Quản lý toàn bộ danh sách sản phẩm vật lý & số, điểm số kiểm nghiệm, thông số và ưu nhược điểm."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
            Thêm sản phẩm mới
          </Button>
        }
      />

      <div className="px-6 space-y-6">
        <DataTable
          columns={columns}
          data={paginatedData}
          keyExtractor={(p) => p.id}
          searchPlaceholder="Tìm kiếm tên sản phẩm, thương hiệu..."
          searchValue={search}
          onSearchChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          filterSlots={
            <>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Tất cả loại</option>
                <option value="physical">Sản phẩm vật lý</option>
                <option value="digital">Sản phẩm số & AI</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
              </select>
            </>
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tên sản phẩm"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingProduct) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }
              }}
              placeholder="AirCook Pro 6L..."
              required
            />
            <Input
              label="Thương hiệu (Brand)"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="AirCook, Apple, OpenAI..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Nhóm sản phẩm"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              options={[
                { value: 'physical', label: 'Sản phẩm vật lý' },
                { value: 'digital', label: 'Sản phẩm số & AI' }
              ]}
            />
            <Input
              label="Tên danh mục"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Gia dụng, AI, Laptop..."
              required
            />
            <Input
              label="Điểm đánh giá (0-10)"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={score}
              onChange={(e) => setScore(parseFloat(e.target.value) || 0)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Giá tham khảo (VNĐ)"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
              required
            />
            <Input
              label="Huy hiệu nổi bật (Badge)"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Lựa chọn Tốt nhất, Editor Choice..."
            />
          </div>

          <Input
            label="Link hình ảnh (URL)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />

          <Input
            label="Phù hợp nhất cho (Best For)"
            value={bestFor}
            onChange={(e) => setBestFor(e.target.value)}
            placeholder="Gia đình 4-6 người..."
            required
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mô tả ngắn gọn
            </label>
            <textarea
              rows={2}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Ưu điểm (mỗi dòng 1 ý)
              </label>
              <textarea
                rows={3}
                value={prosText}
                onChange={(e) => setProsText(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nhược điểm (mỗi dòng 1 ý)
              </label>
              <textarea
                rows={3}
                value={consText}
                onChange={(e) => setConsText(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingProduct ? 'Lưu sản phẩm' : 'Tạo sản phẩm mới'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
