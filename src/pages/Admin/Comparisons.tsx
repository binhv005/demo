import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Comparison } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Plus, Edit2, Trash2, Eye, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminComparisonsPage: React.FC = () => {
  const { comparisons, products, addComparison, updateComparison, deleteComparison } = useData();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingComp, setEditingComp] = useState<Comparison | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [productAId, setProductAId] = useState(products[0]?.id || '');
  const [productBId, setProductBId] = useState(products[1]?.id || '');
  const [winnerId, setWinnerId] = useState(products[0]?.id || '');
  const [verdict, setVerdict] = useState('');
  const [finalRec, setFinalRec] = useState('');

  const openAddModal = () => {
    setEditingComp(null);
    setTitle('');
    setSlug('');
    setProductAId(products[0]?.id || '');
    setProductBId(products[1]?.id || '');
    setWinnerId(products[0]?.id || '');
    setVerdict('Nhận định tổng quan về người chiến thắng...');
    setFinalRec('Khuyến nghị lựa chọn phù hợp theo từng đối tượng...');
    setModalOpen(true);
  };

  const openEditModal = (c: Comparison) => {
    setEditingComp(c);
    setTitle(c.title);
    setSlug(c.slug);
    setProductAId(c.productAId);
    setProductBId(c.productBId);
    setWinnerId(c.winnerId);
    setVerdict(c.verdict);
    setFinalRec(c.finalRecommendation);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const generatedSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const selectedProdA = products.find((p) => p.id === productAId);

    if (editingComp) {
      updateComparison(editingComp.id, {
        title,
        slug: generatedSlug,
        productAId,
        productBId,
        winnerId,
        verdict,
        finalRecommendation: finalRec
      });
      showToast('Đã cập nhật bài so sánh đối đầu!', { type: 'success' });
    } else {
      addComparison({
        title,
        slug: generatedSlug,
        type: selectedProdA?.type || 'physical',
        categorySlug: selectedProdA?.categorySlug || 'noi-chien',
        productAId,
        productBId,
        winnerId,
        verdict,
        priceComparison: 'So sánh mức giá tham khảo giữa 2 dòng sản phẩm.',
        features: [
          { feature: 'Thiết kế & Vật liệu', productA: 'Cao cấp', productB: 'Hiện đại', winner: 'A' },
          { feature: 'Hiệu năng', productA: 'Mạnh mẽ', productB: 'Rất tốt', winner: 'A' },
          { feature: 'Giá trị P/P', productA: 'Hợp lý', productB: 'Rất đáng tiền', winner: 'B' }
        ],
        experienceComparison: 'Cả hai đều đem lại trải nghiệm hoàn thiện trong điều kiện sử dụng thực tế.',
        finalRecommendation: finalRec,
        authorId: 'expert-1',
        faq: [{ q: 'Sản phẩm nào phù hợp hơn cho người mới?', a: 'Sản phẩm A có giao diện thân thiện hơn.' }],
        status: 'published'
      });
      showToast('Đã tạo bài so sánh mới thành công!', { type: 'success' });
    }

    setModalOpen(false);
  };

  const handleDelete = (c: Comparison) => {
    if (window.confirm(`Bạn có chắc muốn xóa bài so sánh "${c.title}"?`)) {
      deleteComparison(c.id);
      showToast('Đã xóa bài so sánh thành công!', { type: 'info' });
    }
  };

  const filtered = comparisons.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.verdict.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Tiêu đề so sánh',
      accessor: (c: Comparison) => (
        <div className="space-y-1">
          <span className="font-bold text-xs text-slate-900 block">{c.title}</span>
          <span className="text-[11px] text-slate-400 block line-clamp-1">{c.verdict}</span>
        </div>
      )
    },
    {
      header: 'Sản phẩm A vs B',
      accessor: (c: Comparison) => {
        const pA = products.find((p) => p.id === c.productAId);
        const pB = products.find((p) => p.id === c.productBId);
        return (
          <span className="text-xs text-slate-700 font-medium">
            {pA?.name || 'Sản phẩm A'} <strong className="text-indigo-600">vs</strong> {pB?.name || 'Sản phẩm B'}
          </span>
        );
      }
    },
    {
      header: 'Người chiến thắng',
      accessor: (c: Comparison) => {
        const winner = products.find((p) => p.id === c.winnerId);
        return (
          <Badge variant="success" size="sm">
            {winner?.name || 'Sản phẩm A'}
          </Badge>
        );
      }
    },
    {
      header: 'Cập nhật',
      accessor: (c: Comparison) => <span className="text-xs text-slate-400">{c.updatedAt}</span>
    },
    {
      header: 'Hành động',
      className: 'text-right',
      accessor: (c: Comparison) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/so-sanh/${c.slug}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            title="Xem trên web"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => openEditModal(c)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
            title="Sửa"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(c)}
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
        title="Quản Lý Bài So Sánh (Comparisons)"
        description="Quản lý các bài so sánh trực diện hai sản phẩm A và B cùng bảng tính năng đối đầu."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
            Tạo bài so sánh mới
          </Button>
        }
      />

      <div className="px-6 space-y-6">
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(c) => c.id}
          searchPlaceholder="Tìm kiếm bài so sánh..."
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingComp ? 'Chỉnh Sửa Bài So Sánh' : 'Tạo Bài So Sánh Mới'}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Tiêu đề bài so sánh"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!editingComp) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }
            }}
            placeholder="So sánh Product A vs Product B..."
            required
          />

          <Input
            label="Slug URL"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="aircook-vs-homechef"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Sản phẩm A"
              value={productAId}
              onChange={(e) => setProductAId(e.target.value)}
              options={products.map((p) => ({ value: p.id, label: p.name }))}
            />
            <Select
              label="Sản phẩm B"
              value={productBId}
              onChange={(e) => setProductBId(e.target.value)}
              options={products.map((p) => ({ value: p.id, label: p.name }))}
            />
          </div>

          <Select
            label="Sản phẩm chiến thắng chung cuộc (Overall Winner)"
            value={winnerId}
            onChange={(e) => setWinnerId(e.target.value)}
            options={[
              { value: productAId, label: `Sản phẩm A (${products.find((p) => p.id === productAId)?.name || 'A'})` },
              { value: productBId, label: `Sản phẩm B (${products.find((p) => p.id === productBId)?.name || 'B'})` }
            ]}
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nhận định chiến thắng (Verdict)
            </label>
            <textarea
              rows={3}
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Khuyến nghị cuối cùng (Final Recommendation)
            </label>
            <textarea
              rows={3}
              value={finalRec}
              onChange={(e) => setFinalRec(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingComp ? 'Lưu thay đổi' : 'Tạo bài so sánh'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
