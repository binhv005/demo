import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Category, ProductType } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { renderCategoryIcon } from '../../utils/icons';
import { Plus, Edit2, Trash2, Search, Power, CheckCircle, FolderTree } from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, toggleCategoryStatus } = useData();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState<'all' | 'physical' | 'digital'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [group, setGroup] = useState<ProductType>('physical');
  const [icon, setIcon] = useState('Utensils');
  const [description, setDescription] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setGroup('physical');
    setIcon('Utensils');
    setDescription('');
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setGroup(cat.group);
    setIcon(cat.icon);
    setDescription(cat.description);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const generatedSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name,
        slug: generatedSlug,
        group,
        groupSlug: group === 'physical' ? 'gia-dung' : 'ai',
        icon,
        description
      });
      showToast(`Đã cập nhật danh mục "${name}" thành công!`, { type: 'success' });
    } else {
      addCategory({
        name,
        slug: generatedSlug,
        group,
        groupSlug: group === 'physical' ? 'gia-dung' : 'ai',
        icon,
        description,
        count: 0,
        subcategories: [
          { id: `sub-${Date.now()}`, name: `${name} Phổ Biến`, slug: `${generatedSlug}-pho-bien`, count: 0 }
        ],
        status: 'active'
      });
      showToast(`Đã thêm mới danh mục "${name}" thành công!`, { type: 'success' });
    }

    setModalOpen(false);
  };

  const handleDelete = (cat: Category) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat.name}"?`)) {
      deleteCategory(cat.id);
      showToast(`Đã xóa danh mục "${cat.name}" thành công!`, { type: 'info' });
    }
  };

  const filteredCategories = categories.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchGroup = filterGroup === 'all' || c.group === filterGroup;
    return matchSearch && matchGroup;
  });

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Quản Lý Danh Mục (Categories)"
        description="Thêm mới, chỉnh sửa thông tin, cấu hình icon và bật tắt hiển thị các danh mục trên website."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
            Thêm danh mục mới
          </Button>
        }
      />

      <div className="px-6 space-y-6">
        {/* Search & Filter Bar */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'physical', label: 'Vật lý' },
              { id: 'digital', label: 'Sản phẩm số' }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setFilterGroup(g.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterGroup === g.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                cat.status === 'inactive' ? 'opacity-60 border-slate-200 bg-slate-50' : 'border-slate-200/80 hover:border-indigo-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      {renderCategoryIcon(cat.icon, 'w-5 h-5')}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                      <span className="text-[11px] text-slate-400">slug: /{cat.slug}</span>
                    </div>
                  </div>
                  <Badge variant={cat.group === 'physical' ? 'warning' : 'indigo'} size="sm">
                    {cat.group === 'physical' ? 'Vật lý' : 'Số'}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{cat.description}</p>

                {/* Subcategories list */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Danh mục con ({cat.subcategories.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.map((sub) => (
                      <span key={sub.id} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    toggleCategoryStatus(cat.id);
                    showToast(`Đã chuyển trạng thái danh mục "${cat.name}"`, { type: 'info' });
                  }}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    cat.status === 'inactive'
                      ? 'bg-slate-200 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-slate-200 hover:text-slate-800'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{cat.status === 'inactive' ? 'Kích hoạt' : 'Đang bật'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCategory ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Tên danh mục"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!editingCategory) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }
            }}
            placeholder="Ví dụ: Thiết bị nhà bếp"
            required
          />

          <Input
            label="Slug đường dẫn (URL)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="thiet-bi-nha-bep"
          />

          <Select
            label="Nhóm sản phẩm"
            value={group}
            onChange={(e) => setGroup(e.target.value as any)}
            options={[
              { value: 'physical', label: 'Sản phẩm vật lý' },
              { value: 'digital', label: 'Sản phẩm số & AI' }
            ]}
          />

          <Select
            label="Icon đại diện (Lucide)"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            options={[
              { value: 'Utensils', label: 'Utensils (Gia dụng/Bếp)' },
              { value: 'Laptop', label: 'Laptop (Điện tử)' },
              { value: 'HeartPulse', label: 'HeartPulse (Sức khỏe)' },
              { value: 'ShoppingBag', label: 'ShoppingBag (Thời trang)' },
              { value: 'Baby', label: 'Baby (Mẹ & Bé)' },
              { value: 'Trophy', label: 'Trophy (Thể thao)' },
              { value: 'Sparkles', label: 'Sparkles (AI/Đặc biệt)' },
              { value: 'AppWindow', label: 'AppWindow (Phần mềm)' },
              { value: 'Server', label: 'Server (Hosting)' },
              { value: 'ShieldCheck', label: 'ShieldCheck (Bảo mật/VPN)' },
              { value: 'TrendingUp', label: 'TrendingUp (Marketing)' },
              { value: 'GraduationCap', label: 'GraduationCap (Khóa học)' }
            ]}
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mô tả ngắn danh mục
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              placeholder="Mô tả về nhóm sản phẩm này..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingCategory ? 'Lưu thay đổi' : 'Thêm mới danh mục'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
