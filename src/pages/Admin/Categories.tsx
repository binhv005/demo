import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { Category, ProductType } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { renderCategoryIcon } from '../../utils/icons';
import { toSlug } from '../../utils/formatters';
import { Plus, Edit2, Trash2, Search, Power, CheckCircle, FolderTree, ChevronDown } from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, toggleCategoryStatus } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

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

    const generatedSlug = toSlug(slug.trim()) || toSlug(name);

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

  const handleDelete = async (cat: Category) => {
    const ok = await confirm({
      title: 'Xóa danh mục',
      message: `Bạn có chắc chắn muốn xóa danh mục "${cat.name}"? Các sản phẩm thuộc danh mục này có thể bị ảnh hưởng.`,
      confirmText: 'Xác nhận xóa',
      cancelText: 'Hủy bỏ',
      type: 'danger'
    });
    if (ok) {
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
        title="Quản Lý Danh Mục"
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
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
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
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="relative inline-block">
                  <select
                    value={cat.status || 'active'}
                    onChange={(e) => {
                      const newStatus = e.target.value as 'active' | 'inactive';
                      updateCategory(cat.id, { status: newStatus });
                      showToast(
                        `Đã chuyển trạng thái danh mục "${cat.name}" sang "${newStatus === 'active' ? 'Đang bật' : 'Tạm ngưng'}"`,
                        { type: 'info' }
                      );
                    }}
                    className={`text-xs font-bold px-3 py-1 rounded-xl border appearance-none pr-7 cursor-pointer focus:outline-none focus:ring-2 transition-all ${
                      cat.status !== 'inactive'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/70 focus:ring-emerald-400'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70 focus:ring-slate-400'
                    }`}
                  >
                    <option value="active">Đang bật</option>
                    <option value="inactive">Tạm ngưng</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 text-slate-600" />
                </div>

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
                setSlug(toSlug(e.target.value));
              }
            }}
            placeholder="Ví dụ: Thiết bị nhà bếp"
            required
          />

          <Input
            label="Slug đường dẫn (URL)"
            value={slug}
            onChange={(e) => setSlug(toSlug(e.target.value))}
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
            label="Icon đại diện"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            options={[
              // Gia dụng & Đời sống
              { value: 'Utensils', label: 'Bếp & Gia dụng (Utensils)' },
              { value: 'Home', label: 'Nhà cửa & Đời sống (Home)' },
              { value: 'Tv', label: 'Thiết bị Nghe nhìn / Tivi (Tv)' },
              { value: 'Coffee', label: 'Cà phê & Đồ uống (Coffee)' },
              { value: 'Armchair', label: 'Nội thất & Bàn ghế (Armchair)' },
              { value: 'Fan', label: 'Quạt & Điều hòa (Fan)' },
              { value: 'Bed', label: 'Phòng ngủ & Chăn ga (Bed)' },
              { value: 'Bath', label: 'Phòng tắm & Vệ sinh (Bath)' },

              // Điện tử & Công nghệ
              { value: 'Laptop', label: 'Laptop & Máy tính (Laptop)' },
              { value: 'Smartphone', label: 'Điện thoại & Di động (Smartphone)' },
              { value: 'Headphones', label: 'Tai nghe & Âm thanh (Headphones)' },
              { value: 'Camera', label: 'Máy ảnh & Quay phim (Camera)' },
              { value: 'Watch', label: 'Đồng hồ thông minh (Watch)' },
              { value: 'Gamepad2', label: 'Gaming & Máy chơi game (Gamepad)' },
              { value: 'Printer', label: 'Máy in & Thiết bị văn phòng (Printer)' },
              { value: 'Wifi', label: 'Thiết bị Mạng & Wifi (Wifi)' },

              // Sức khỏe & Thể thao
              { value: 'HeartPulse', label: 'Sức khỏe & Y tế (HeartPulse)' },
              { value: 'Dumbbell', label: 'Gym & Thể hình (Dumbbell)' },
              { value: 'Trophy', label: 'Thể thao & Thi đấu (Trophy)' },
              { value: 'Bike', label: 'Xe đạp & Vận động ngoài trời (Bike)' },
              { value: 'Activity', label: 'Theo dõi thể lực (Activity)' },

              // Thời trang & Làm đẹp
              { value: 'ShoppingBag', label: 'Thời trang & Mua sắm (ShoppingBag)' },
              { value: 'Shirt', label: 'Quần áo & Trang phục (Shirt)' },
              { value: 'Scissors', label: 'Chăm sóc tóc & Spa (Scissors)' },
              { value: 'Sparkles', label: 'Mỹ phẩm & Làm đẹp (Sparkles)' },
              { value: 'Glasses', label: 'Mắt kính & Phụ kiện (Glasses)' },
              { value: 'Crown', label: 'Hàng cao cấp / Luxury (Crown)' },

              // Mẹ & Bé, Gia đình
              { value: 'Baby', label: 'Mẹ & Bé (Baby)' },
              { value: 'Smile', label: 'Đồ chơi & Trẻ em (Smile)' },
              { value: 'Heart', label: 'Gia đình & Tình cảm (Heart)' },

              // Phương tiện & Du lịch
              { value: 'Car', label: 'Ô tô & Phụ kiện xe (Car)' },
              { value: 'Plane', label: 'Du lịch & Vé máy bay (Plane)' },
              { value: 'Luggage', label: 'Vali & Hành lý (Luggage)' },

              // Phần mềm, AI & Dịch vụ số
              { value: 'Bot', label: 'Trí tuệ nhân tạo / AI (Bot)' },
              { value: 'AppWindow', label: 'Phần mềm & Ứng dụng (AppWindow)' },
              { value: 'Code', label: 'Lập trình & Công cụ Dev (Code)' },
              { value: 'Cloud', label: 'Điện toán đám mây / Cloud (Cloud)' },
              { value: 'Server', label: 'Máy chủ & Hosting (Server)' },
              { value: 'ShieldCheck', label: 'Bảo mật, Antivirus & VPN (ShieldCheck)' },
              { value: 'Database', label: 'Cơ sở dữ liệu & Lưu trữ (Database)' },
              { value: 'Cpu', label: 'Phần cứng & Vi xử lý (Cpu)' },

              // Kinh doanh & Marketing
              { value: 'TrendingUp', label: 'Marketing & SEO (TrendingUp)' },
              { value: 'CreditCard', label: 'Tài chính & Thanh toán (CreditCard)' },
              { value: 'Briefcase', label: 'Doanh nghiệp & B2B (Briefcase)' },
              { value: 'DollarSign', label: 'Đầu tư & Kiếm tiền (DollarSign)' },

              // Giáo dục & Sáng tạo
              { value: 'GraduationCap', label: 'Khóa học & Đào tạo (GraduationCap)' },
              { value: 'BookOpen', label: 'Sách & Tri thức (BookOpen)' },
              { value: 'Lightbulb', label: 'Ý tưởng & Đổi mới (Lightbulb)' },
              { value: 'Palette', label: 'Thiết kế & Đồ họa (Palette)' },
              { value: 'Music', label: 'Âm nhạc & Nhạc cụ (Music)' },

              // Thú cưng & Sân vườn
              { value: 'Dog', label: 'Thú cưng & Chăm sóc thú nuôi (Dog)' },
              { value: 'Trees', label: 'Cây cảnh & Sân vườn (Trees)' },
              { value: 'Flower2', label: 'Hoa tươi & Quà tặng (Flower2)' }
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
