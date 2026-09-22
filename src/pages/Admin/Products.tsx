import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { Product, ProductType } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { formatPrice, toSlug } from '../../utils/formatters';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Star,
  ChevronDown,
  Layers,
  DollarSign,
  Image as ImageIcon,
  FileText,
  Sliders,
  Link2,
  Award,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modal & Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'media' | 'review' | 'specs' | 'score'>('general');

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState<ProductType>('physical');
  const [categorySlug, setCategorySlug] = useState('noi-chien');
  const [categoryName, setCategoryName] = useState('Gia dụng');
  const [groupSlug, setGroupSlug] = useState('gia-dung');
  const [price, setPrice] = useState<number>(1000000);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [priceUnit, setPriceUnit] = useState<string>('₫');
  const [buyUrl, setBuyUrl] = useState('');
  const [score, setScore] = useState<number>(9.0);
  const [scoreDesign, setScoreDesign] = useState<number>(9.0);
  const [scorePerformance, setScorePerformance] = useState<number>(9.0);
  const [scoreValue, setScoreValue] = useState<number>(9.0);
  const [scoreUsability, setScoreUsability] = useState<number>(9.0);
  const [autoCalculateScore, setAutoCalculateScore] = useState<boolean>(true);
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [badge, setBadge] = useState('');
  const [bestFor, setBestFor] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [deepReview, setDeepReview] = useState('');
  const [prosText, setProsText] = useState('');
  const [consText, setConsText] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [specList, setSpecList] = useState<{ key: string; value: string }[]>([]);

  const applySpecTemplate = (templateType: 'kitchen' | 'tech' | 'software') => {
    if (templateType === 'kitchen') {
      setSpecList([
        { key: 'Dung tích', value: '6.2 Lít (Lòng nồi chống dính)' },
        { key: 'Công suất', value: '2000W' },
        { key: 'Nhiệt độ cài đặt', value: '40°C - 200°C' },
        { key: 'Công nghệ đốt nóng', value: 'Rapid Air xoay vòng nhiệt đối lưu' },
        { key: 'Chất liệu', value: 'Nhựa ABS nguyên sinh & Lòng nồi phủ Ceramic' },
        { key: 'Bảo hành', value: '24 tháng chính hãng' }
      ]);
      showToast('Đã nạp mẫu thông số Gia dụng / Nhà bếp!', { type: 'info' });
    } else if (templateType === 'tech') {
      setSpecList([
        { key: 'Màn hình', value: '6.7 inch Super Retina XDR OLED 120Hz' },
        { key: 'Vi xử lý', value: 'Apple A17 Pro (3nm)' },
        { key: 'RAM / Bộ nhớ', value: '8GB / 256GB' },
        { key: 'Camera', value: 'Chính 48MP + Tele 12MP (5x zoom) + Góc rộng 12MP' },
        { key: 'Pin & Sạc', value: '4422 mAh, Sạc nhanh Type-C' },
        { key: 'Kết nối', value: '5G, Wi-Fi 6E, Bluetooth 5.3' },
        { key: 'Bảo hành', value: '12 tháng chính hãng' }
      ]);
      showToast('Đã nạp mẫu thông số Điện tử / Công nghệ!', { type: 'info' });
    } else if (templateType === 'software') {
      setSpecList([
        { key: 'Nền tảng hỗ trợ', value: 'Web, iOS, Android, Windows, macOS' },
        { key: 'Mô hình AI', value: 'GPT-4o, Claude 3.5 Sonnet' },
        { key: 'Khả năng xử lý', value: 'Văn bản, hình ảnh, mã nguồn, phân tích dữ liệu' },
        { key: 'Ngôn ngữ hỗ trợ', value: 'Đa ngôn ngữ (Hỗ trợ tiếng Việt đầy đủ)' },
        { key: 'Hình thức bản quyền', value: 'Đăng ký định kỳ (Subscription)' }
      ]);
      showToast('Đã nạp mẫu thông số Phần mềm / AI!', { type: 'info' });
    }
  };

  const applyScorePreset = (preset: 'excellent' | 'recommended' | 'value' | 'standard') => {
    if (preset === 'excellent') {
      setScoreDesign(9.6);
      setScorePerformance(9.8);
      setScoreValue(9.2);
      setScoreUsability(9.5);
      showToast('Đã nạp mức điểm Đỉnh cao phân khúc (9.5+)', { type: 'info' });
    } else if (preset === 'recommended') {
      setScoreDesign(9.0);
      setScorePerformance(9.2);
      setScoreValue(8.8);
      setScoreUsability(9.0);
      showToast('Đã nạp mức điểm Khuyên dùng (8.8 - 9.2)', { type: 'info' });
    } else if (preset === 'value') {
      setScoreDesign(8.2);
      setScorePerformance(8.5);
      setScoreValue(9.6);
      setScoreUsability(8.8);
      showToast('Đã nạp mức điểm Giá trị cao P/P (9.6)', { type: 'info' });
    } else if (preset === 'standard') {
      setScoreDesign(8.0);
      setScorePerformance(8.0);
      setScoreValue(8.0);
      setScoreUsability(8.0);
      showToast('Đã nạp mức điểm Tiêu chuẩn (8.0)', { type: 'info' });
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setActiveTab('general');
    setName('');
    setSlug('');
    setBrand('');

    const firstCat = categories[0];
    if (firstCat) {
      setType(firstCat.group);
      setCategorySlug(firstCat.slug);
      setCategoryName(firstCat.name);
      setGroupSlug(firstCat.groupSlug);
    } else {
      setType('physical');
      setCategorySlug('noi-chien');
      setCategoryName('Gia dụng');
      setGroupSlug('gia-dung');
    }

    setPrice(2000000);
    setOriginalPrice(2490000);
    setPriceUnit('₫');
    setBuyUrl('');
    setScore(9.0);
    setScoreDesign(9.0);
    setScorePerformance(9.0);
    setScoreValue(9.0);
    setScoreUsability(9.0);
    setAutoCalculateScore(true);
    setImage('');
    setGallery([]);
    setBadge('Lựa chọn Mới');
    setBestFor('Gia đình 4-6 người hoặc người dùng thích tiện lợi');
    setShortDesc('Mô tả ngắn gọn về sản phẩm và các điểm mạnh nổi bật...');
    setDeepReview('Sau 30 ngày trải nghiệm thực tế trong điều kiện sử dụng hàng ngày, sản phẩm thể hiện sự bền bỉ, khả năng vận hành ổn định và tiết kiệm năng lượng tối ưu. Thiết kế hiện đại hòa hợp tốt với không gian gia đình.');
    setProsText('Thiết kế đẹp và bền bỉ\nHiệu năng cao\nTiết kiệm điện');
    setConsText('Giá thành hơi cao\nTrọng lượng nặng');
    setStatus('published');
    setSpecList([
      { key: 'Thương hiệu', value: '' },
      { key: 'Bảo hành', value: '12 tháng chính hãng' },
      { key: 'Xuất xứ', value: 'Chính hãng' }
    ]);
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setActiveTab('general');
    setName(p.name);
    setSlug(p.slug);
    setBrand(p.brand);
    setType(p.type);
    setCategorySlug(p.categorySlug);
    setCategoryName(p.category);
    setGroupSlug(p.groupSlug || (p.type === 'physical' ? 'gia-dung' : 'ai'));
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setPriceUnit(p.priceUnit || '₫');
    setBuyUrl(p.buyUrl || '');
    setScore(p.score || 9.0);

    const bd = p.scoreBreakdown || { design: 9.0, performance: 9.0, value: 9.0, usability: 9.0 };
    setScoreDesign(bd.design ?? 9.0);
    setScorePerformance(bd.performance ?? 9.0);
    setScoreValue(bd.value ?? 9.0);
    setScoreUsability(bd.usability ?? 9.0);
    setAutoCalculateScore(true);

    setImage(p.image);
    setGallery(p.gallery && p.gallery.length > 0 ? p.gallery : (p.image ? [p.image] : []));
    setBadge(p.badge || '');
    setBestFor(p.bestFor || '');
    setShortDesc(p.shortDescription || '');
    setDeepReview(p.deepReview || '');
    setProsText(p.pros ? p.pros.join('\n') : '');
    setConsText(p.cons ? p.cons.join('\n') : '');
    setStatus(p.status === 'archived' ? 'draft' : p.status);

    const loadedSpecs = p.specs && typeof p.specs === 'object'
      ? Object.entries(p.specs).map(([key, value]) => ({ key, value: String(value) }))
      : [];
    setSpecList(loadedSpecs.length > 0 ? loadedSpecs : [
      { key: 'Thương hiệu', value: p.brand },
      { key: 'Bảo hành', value: '12 tháng chính hãng' }
    ]);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Vui lòng nhập tên sản phẩm!', { type: 'error' });
      setActiveTab('general');
      return;
    }

    const generatedSlug = toSlug(slug.trim()) || toSlug(name);
    const pros = prosText.split('\n').map((s) => s.trim()).filter(Boolean);
    const cons = consText.split('\n').map((s) => s.trim()).filter(Boolean);

    const finalGallery = Array.from(new Set([image, ...gallery].filter(Boolean)));
    const primaryImage = image || finalGallery[0] || '';

    const specsObj: Record<string, string> = {};
    specList.forEach((s) => {
      const k = s.key.trim();
      const v = s.value.trim();
      if (k && v) {
        specsObj[k] = v;
      }
    });

    const calculatedScore = autoCalculateScore
      ? Number(((scoreDesign + scorePerformance + scoreValue + scoreUsability) / 4).toFixed(1))
      : Number(score);

    const breakdownData = {
      design: Number(scoreDesign),
      performance: Number(scorePerformance),
      value: Number(scoreValue),
      usability: Number(scoreUsability)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        slug: generatedSlug,
        brand,
        type,
        categorySlug,
        category: categoryName,
        groupSlug: groupSlug || (type === 'physical' ? 'gia-dung' : 'ai'),
        price,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        priceUnit,
        buyUrl: buyUrl.trim(),
        score: calculatedScore,
        scoreBreakdown: breakdownData,
        image: primaryImage,
        gallery: finalGallery,
        badge: badge || undefined,
        bestFor,
        shortDescription: shortDesc,
        deepReview,
        pros,
        cons,
        specs: specsObj,
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
        groupSlug: groupSlug || (type === 'physical' ? 'gia-dung' : 'ai'),
        price,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        priceUnit,
        buyUrl: buyUrl.trim(),
        score: calculatedScore,
        ratingCount: 100,
        image: primaryImage,
        gallery: finalGallery,
        badge: badge || undefined,
        bestFor,
        shortDescription: shortDesc,
        deepReview: deepReview || `${name} là sản phẩm mới được bổ sung vào cơ sở dữ liệu kiểm nghiệm của Top20Product.`,
        pros,
        cons,
        specs: specsObj,
        scoreBreakdown: breakdownData,
        status
      });
      showToast(`Đã thêm mới sản phẩm "${name}" thành công!`, { type: 'success' });
    }

    setModalOpen(false);
  };

  const handleDelete = async (p: Product) => {
    const ok = await confirm({
      title: 'Xóa sản phẩm',
      message: `Bạn có chắc muốn xóa sản phẩm "${p.name}"? Thao tác này sẽ xóa vĩnh viễn khỏi hệ thống.`,
      confirmText: 'Xác nhận xóa',
      cancelText: 'Hủy bỏ',
      type: 'danger'
    });
    if (ok) {
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
          <div className="min-w-0 max-w-md">
            <span className="font-bold text-xs text-slate-900 block leading-snug hover:text-indigo-600">
              {p.name}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {p.brand} • {p.category}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Loại',
      className: 'whitespace-nowrap',
      accessor: (p: Product) => (
        <Badge variant={p.type === 'physical' ? 'warning' : 'indigo'} size="sm">
          {p.type === 'physical' ? 'Vật lý' : 'Số & AI'}
        </Badge>
      )
    },
    {
      header: 'Giá tham khảo',
      className: 'whitespace-nowrap',
      accessor: (p: Product) => (
        <span className="font-bold text-xs text-slate-900">
          {formatPrice(p.price, p.priceUnit)}
        </span>
      )
    },
    {
      header: 'Trạng thái',
      className: 'whitespace-nowrap min-w-[140px]',
      accessor: (p: Product) => (
        <div className="relative inline-block">
          <select
            value={p.status === 'archived' ? 'draft' : p.status}
            onChange={(e) => {
              const newStatus = e.target.value as 'published' | 'draft';
              updateProduct(p.id, { status: newStatus });
              showToast(
                `Đã chuyển trạng thái sản phẩm sang "${newStatus === 'published' ? 'Xuất bản' : 'Bản nháp'}"`,
                { type: 'success' }
              );
            }}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border appearance-none pr-7 cursor-pointer focus:outline-none focus:ring-2 transition-all ${
              p.status === 'published'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/70 focus:ring-emerald-400'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70 focus:ring-slate-400'
            }`}
          >
            <option value="published">Xuất bản</option>
            <option value="draft">Bản nháp</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 text-slate-600" />
        </div>
      )
    },
    {
      header: 'Hành động',
      className: 'text-right whitespace-nowrap',
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
        title="Quản Lý Sản Phẩm"
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
        maxWidth="4xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'general'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              1. Cơ bản & Phân loại
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'pricing'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              2. Giá & Nơi bán
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'media'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              3. Hình ảnh & Gallery ({gallery.length > 0 ? gallery.length : image ? 1 : 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('review')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'review'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              4. Nội dung Đánh giá
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              5. Thông số KT ({specList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('score')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'score'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              6. Chấm điểm tiêu chí ({(autoCalculateScore ? (scoreDesign + scorePerformance + scoreValue + scoreUsability) / 4 : score).toFixed(1)})
            </button>
          </div>

          {/* TAB 1: THÔNG TIN CƠ BẢN & PHÂN LOẠI */}
          {activeTab === 'general' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Tên sản phẩm"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingProduct) {
                      setSlug(toSlug(e.target.value));
                    }
                  }}
                  placeholder="AirCook Pro 6L..."
                  required
                />
                <Input
                  label="Đường dẫn tĩnh (Slug)"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="aircook-pro-6l"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Thương hiệu (Brand)"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="AirCook, Apple, Philips..."
                  required
                />
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Danh mục hệ thống
                  </label>
                  <select
                    value={categorySlug}
                    onChange={(e) => {
                      const selectedSlug = e.target.value;
                      const found = categories.find((c) => c.slug === selectedSlug);
                      if (found) {
                        setCategorySlug(found.slug);
                        setCategoryName(found.name);
                        setGroupSlug(found.groupSlug);
                        setType(found.group);
                      }
                    }}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories
                      .filter((c) => c.group === type)
                      .map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name} ({cat.group === 'physical' ? 'Vật lý' : 'Số & AI'})
                        </option>
                      ))}
                  </select>
                </div>
                <Select
                  label="Loại sản phẩm"
                  value={type}
                  onChange={(e) => {
                    const newType = e.target.value as ProductType;
                    setType(newType);
                    const matchedCats = categories.filter((c) => c.group === newType);
                    if (matchedCats.length > 0) {
                      setCategorySlug(matchedCats[0].slug);
                      setCategoryName(matchedCats[0].name);
                      setGroupSlug(matchedCats[0].groupSlug);
                    }
                  }}
                  options={[
                    { value: 'physical', label: 'Sản phẩm vật lý' },
                    { value: 'digital', label: 'Sản phẩm số & AI' }
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Huy hiệu nổi bật (Badge)"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Lựa chọn Tốt nhất, Khuyên dùng, Đáng mua nhất..."
                />
                <Select
                  label="Trạng thái xuất bản"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  options={[
                    { value: 'published', label: 'Xuất bản (Hiển thị)' },
                    { value: 'draft', label: 'Bản nháp (Ẩn)' }
                  ]}
                />
              </div>
            </div>
          )}

          {/* TAB 2: GIÁ CẢ & NƠI BÁN */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Giá tham khảo (VNĐ)"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                  required
                />
                <Input
                  label="Giá niêm yết cũ / Giá gốc (nếu có)"
                  type="number"
                  value={originalPrice ?? ''}
                  onChange={(e) => setOriginalPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Gạch ngang giảm giá..."
                />
                <Input
                  label="Đơn vị tiền tệ"
                  value={priceUnit}
                  onChange={(e) => setPriceUnit(e.target.value)}
                  placeholder="₫, $, EUR..."
                />
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Link nơi bán chính hãng (Buy URL / Nơi mua hàng)
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={buyUrl}
                    onChange={(e) => setBuyUrl(e.target.value)}
                    placeholder="https://shopee.vn/... hoặc https://tiki.vn/..."
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Đường dẫn này sẽ tự động gắn vào nút "Xem nơi bán chính hãng" ở đầu trang chi tiết và ở thanh tiện ích bên phải.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: HÌNH ẢNH & GALLERY */}
          {activeTab === 'media' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <ImageUpload
                label="Hình ảnh sản phẩm & Bộ sưu tập ảnh (Tải lên nhiều ảnh, tự động tối ưu WebP Cloudinary)"
                value={image}
                onChange={setImage}
                values={gallery}
                onChangeMultiple={setGallery}
                multiple={true}
                required
              />
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-800 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span><strong>Mẹo:</strong> Ảnh đầu tiên sẽ làm ảnh bìa chính. Các ảnh tải lên cùng lúc sẽ hiển thị trong thanh cuộn thumbnail nhỏ và bộ sưu tập ảnh đầy đủ ở trang chi tiết sản phẩm.</span>
              </div>
            </div>
          )}

          {/* TAB 4: NỘI DUNG ĐÁNH GIÁ */}
          {activeTab === 'review' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <Input
                label="Phù hợp nhất cho (Best For)"
                value={bestFor}
                onChange={(e) => setBestFor(e.target.value)}
                placeholder="Gia đình 4-6 người, người ăn kiêng hạn chế dầu mỡ..."
                required
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mô tả ngắn gọn (Hero Summary)
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Tóm tắt ngắn gọn 1-2 câu về sản phẩm hiển thị ngay đầu trang chi tiết..."
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Đánh giá chi tiết sau 30 ngày sử dụng thực tế (Deep Review)
                </label>
                <textarea
                  rows={5}
                  value={deepReview}
                  onChange={(e) => setDeepReview(e.target.value)}
                  placeholder="Nhận định chuyên sâu của chuyên gia về độ bền, trải nghiệm sử dụng, cảm giác cầm nắm, tiếng ồn, hiệu năng... (xuống 2 dòng để tách đoạn mới)"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    placeholder="Thiết kế hiện đại và bền bỉ&#10;Khả năng tiết kiệm điện vượt trội&#10;Độ ồn hoạt động rất thấp"
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
                    placeholder="Giá thành tương đối cao&#10;Kích thước lớn chiếm diện tích bếp"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BẢNG THÔNG SỐ KỸ THUẬT (SPECS) */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Nạp nhanh mẫu thông số theo ngành:</span>
                  <span className="text-[11px] text-slate-500">Giúp tự động điền các trường thông số tiêu chuẩn</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => applySpecTemplate('kitchen')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    🍳 Gia dụng / Nhà bếp
                  </button>
                  <button
                    type="button"
                    onClick={() => applySpecTemplate('tech')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    📱 Điện tử / Công nghệ
                  </button>
                  <button
                    type="button"
                    onClick={() => applySpecTemplate('software')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    💻 Phần mềm / AI
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {specList.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tên thông số (VD: Dung tích, CPU...)"
                      value={spec.key}
                      onChange={(e) => {
                        const newList = [...specList];
                        newList[index].key = e.target.value;
                        setSpecList(newList);
                      }}
                      className="w-1/3 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Giá trị (VD: 6.2 Lít, Apple M3...)"
                      value={spec.value}
                      onChange={(e) => {
                        const newList = [...specList];
                        newList[index].value = e.target.value;
                        setSpecList(newList);
                      }}
                      className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSpecList(specList.filter((_, i) => i !== index));
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Xóa dòng thông số này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSpecList([...specList, { key: '', value: '' }])}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm dòng thông số
              </button>
            </div>
          )}

          {/* TAB 6: CHẤM ĐIỂM THEO TIÊU CHÍ */}
          {activeTab === 'score' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Top Overview Score Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-50 to-amber-50 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block">
                    Điểm đánh giá tổng kết (Overall Score)
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-indigo-600">
                      {(autoCalculateScore
                        ? (scoreDesign + scorePerformance + scoreValue + scoreUsability) / 4
                        : score
                      ).toFixed(1)}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800">
                      {(autoCalculateScore
                        ? (scoreDesign + scorePerformance + scoreValue + scoreUsability) / 4
                        : score
                      ) >= 9.0
                        ? 'Xuất Sắc (Editor Choice)'
                        : (autoCalculateScore
                            ? (scoreDesign + scorePerformance + scoreValue + scoreUsability) / 4
                            : score
                          ) >= 8.0
                        ? 'Rất Tốt (Khuyên Dùng)'
                        : 'Mức Khá / Tiêu Chuẩn'}
                    </span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={autoCalculateScore}
                      onChange={(e) => setAutoCalculateScore(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-slate-600 font-medium">
                      Tự động tính điểm tổng theo trung bình cộng 4 tiêu chí
                    </span>
                  </label>
                </div>

                {!autoCalculateScore && (
                  <div className="w-full sm:w-44">
                    <Input
                      label="Điểm tổng thủ công (0-10)"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={score}
                      onChange={(e) => setScore(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                )}
              </div>

              {/* Quick Presets */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-xs font-bold text-slate-700">Nạp nhanh mức điểm mẫu:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyScorePreset('excellent')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    🏆 Toàn diện (9.5+)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyScorePreset('recommended')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-700 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    ⭐ Rất tốt (8.8 - 9.2)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyScorePreset('value')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    💡 Giá trị cao P/P (9.6)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyScorePreset('standard')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    ⚖️ Tiêu chuẩn (8.0)
                  </button>
                </div>
              </div>

              {/* 4 Criteria Sliders & Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Design */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">1. Thiết kế & Hoàn thiện</span>
                      <span className="text-[11px] text-slate-500">Độ bền vật liệu, cảm giác cầm nắm, hoàn thiện</span>
                    </div>
                    <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {scoreDesign.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scoreDesign}
                      onChange={(e) => setScoreDesign(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scoreDesign}
                      onChange={(e) => setScoreDesign(Math.max(0, Math.min(10, parseFloat(e.target.value) || 0)))}
                      className="w-16 p-1.5 text-center text-xs font-bold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* 2. Performance */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">2. Hiệu năng & Trải nghiệm</span>
                      <span className="text-[11px] text-slate-500">Tốc độ xử lý, độ ồn, độ ổn định nhiệt độ</span>
                    </div>
                    <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {scorePerformance.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scorePerformance}
                      onChange={(e) => setScorePerformance(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scorePerformance}
                      onChange={(e) => setScorePerformance(Math.max(0, Math.min(10, parseFloat(e.target.value) || 0)))}
                      className="w-16 p-1.5 text-center text-xs font-bold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* 3. Value */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">3. Giá trị / Chi phí (P/P)</span>
                      <span className="text-[11px] text-slate-500">Tỷ suất giá bán trên tính năng nhận được</span>
                    </div>
                    <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {scoreValue.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scoreValue}
                      onChange={(e) => setScoreValue(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scoreValue}
                      onChange={(e) => setScoreValue(Math.max(0, Math.min(10, parseFloat(e.target.value) || 0)))}
                      className="w-16 p-1.5 text-center text-xs font-bold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* 4. Usability */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">4. Tính thực tế & Dễ sử dụng</span>
                      <span className="text-[11px] text-slate-500">Giao diện thân thiện, dễ bảo trì và vệ sinh</span>
                    </div>
                    <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {scoreUsability.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scoreUsability}
                      onChange={(e) => setScoreUsability(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scoreUsability}
                      onChange={(e) => setScoreUsability(Math.max(0, Math.min(10, parseFloat(e.target.value) || 0)))}
                      className="w-16 p-1.5 text-center text-xs font-bold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              * Vui lòng kiểm tra các tab trước khi lưu
            </span>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" variant="primary" size="sm">
                {editingProduct ? 'Lưu sản phẩm' : 'Tạo sản phẩm mới'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
