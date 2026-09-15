import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { Ranking } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, Award, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminRankingsPage: React.FC = () => {
  const { rankings, products, updateRanking, deleteRanking, addRanking } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRanking, setEditingRanking] = useState<Ranking | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [type, setType] = useState<'physical' | 'digital'>('physical');
  const [categorySlug, setCategorySlug] = useState('noi-chien');

  const openAddModal = () => {
    setEditingRanking(null);
    setTitle('');
    setSlug('');
    setSubtitle('');
    setType('physical');
    setCategorySlug('noi-chien');
    setModalOpen(true);
  };

  const openEditModal = (r: Ranking) => {
    setEditingRanking(r);
    setTitle(r.title);
    setSlug(r.slug);
    setSubtitle(r.subtitle);
    setType(r.type);
    setCategorySlug(r.categorySlug);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const generatedSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingRanking) {
      updateRanking(editingRanking.id, {
        title,
        slug: generatedSlug,
        subtitle,
        type,
        categorySlug
      });
      showToast(`Đã cập nhật bảng xếp hạng "${title}"!`, { type: 'success' });
    } else {
      const topProducts = products.filter((p) => p.type === type).slice(0, 3);
      addRanking({
        title,
        slug: generatedSlug,
        type,
        groupSlug: type === 'physical' ? 'gia-dung' : 'ai',
        categorySlug,
        subtitle,
        authorId: 'expert-1',
        intro: `Đánh giá và so sánh thực tế các sản phẩm ${title} tốt nhất năm nay.`,
        methodology: 'Quy trình thử nghiệm tiêu chuẩn theo quy chuẩn chất lượng phòng thí nghiệm TechReview.',
        quickPicks: {
          bestOverallId: topProducts[0]?.id || 'prod-aircook-6l',
          bestValueId: topProducts[1]?.id || topProducts[0]?.id || 'prod-aircook-6l',
          bestPremiumId: topProducts[2]?.id || topProducts[0]?.id || 'prod-aircook-6l'
        },
        items: topProducts.map((p, idx) => ({
          rank: idx + 1,
          productId: p.id,
          highlight: idx === 0 ? 'Tốt nhất tổng thể' : idx === 1 ? 'Giá trị cao' : 'Lựa chọn cao cấp',
          verdict: p.deepReview.slice(0, 150) + '...'
        })),
        conclusion: 'Lựa chọn sản phẩm phù hợp nhất với điều kiện ngân sách và nhu cầu của bạn.',
        faq: [{ q: 'Sản phẩm nào bền nhất?', a: 'Sản phẩm đạt vị trí số 1 là lựa chọn cân bằng nhất.' }],
        status: 'published'
      });
      showToast(`Đã tạo bảng xếp hạng "${title}"!`, { type: 'success' });
    }

    setModalOpen(false);
  };

  const moveRankItem = (ranking: Ranking, index: number, direction: 'up' | 'down') => {
    const newItems = [...ranking.items];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    // Swap items
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    // Re-assign rank numbers
    const updatedWithRanks = newItems.map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));

    updateRanking(ranking.id, { items: updatedWithRanks });
    showToast(`Đã đổi thứ tự hạng #${index + 1} và #${targetIdx + 1}!`, { type: 'info' });
  };

  const handleDelete = async (r: Ranking) => {
    const ok = await confirm({
      title: 'Xóa bảng xếp hạng',
      message: `Bạn có chắc muốn xóa bảng xếp hạng "${r.title}"?`,
      confirmText: 'Xác nhận xóa',
      cancelText: 'Hủy bỏ',
      type: 'danger'
    });
    if (ok) {
      deleteRanking(r.id);
      showToast(`Đã xóa bảng xếp hạng thành công!`, { type: 'info' });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Quản Lý Bảng Xếp Hạng (Rankings)"
        description="Quản lý danh sách Top 5 / Top 10, thay đổi thứ tự sản phẩm và cập nhật Quick Picks."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
            Tạo bảng xếp hạng mới
          </Button>
        }
      />

      <div className="px-6 space-y-6">
        <div className="space-y-6">
          {rankings.map((ranking) => (
            <div
              key={ranking.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6"
            >
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={ranking.type === 'physical' ? 'warning' : 'indigo'} size="sm">
                      {ranking.type === 'physical' ? 'Sản phẩm vật lý' : 'Sản phẩm số'}
                    </Badge>
                    <span className="text-xs text-slate-400">Cập nhật: {ranking.updatedAt}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{ranking.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{ranking.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/top/${ranking.slug}`}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    title="Xem trên website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => openEditModal(ranking)}
                    className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(ranking)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Reordering Matrix (Drag & Drop Simulated via Up/Down) */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Thứ hạng sản phẩm trong danh sách ({ranking.items.length} sản phẩm):
                </span>

                <div className="space-y-2">
                  {ranking.items.map((item, idx) => {
                    const prod = products.find((p) => p.id === item.productId);
                    if (!prod) return null;
                    return (
                      <div
                        key={item.rank}
                        className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60 hover:bg-white hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                            #{item.rank}
                          </div>
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-slate-900 truncate">{prod.name}</h5>
                            <span className="text-[11px] text-indigo-600 font-semibold">{item.highlight}</span>
                          </div>
                        </div>

                        {/* Order Re-arranging Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveRankItem(ranking, idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Tăng thứ hạng (Lên trên)"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveRankItem(ranking, idx, 'down')}
                            disabled={idx === ranking.items.length - 1}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Giảm thứ hạng (Xuống dưới)"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Ranking Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingRanking ? 'Chỉnh Sửa Bảng Xếp Hạng' : 'Tạo Bảng Xếp Hạng Mới'}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Tiêu đề bảng xếp hạng"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!editingRanking) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }
            }}
            placeholder="Top 10 Nồi Chiên Không Dầu..."
            required
          />

          <Input
            label="Slug URL"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="top-noi-chien-khong-dau"
          />

          <Select
            label="Loại sản phẩm"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            options={[
              { value: 'physical', label: 'Sản phẩm vật lý' },
              { value: 'digital', label: 'Sản phẩm số & AI' }
            ]}
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mô tả phụ (Subtitle)
            </label>
            <textarea
              rows={3}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingRanking ? 'Lưu thay đổi' : 'Tạo bảng xếp hạng'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
