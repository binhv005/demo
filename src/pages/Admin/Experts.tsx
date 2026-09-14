import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Expert } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Edit2, Trash2, Award, CheckCircle2, Users } from 'lucide-react';

export const AdminExpertsPage: React.FC = () => {
  const { experts, addExpert, updateExpert, deleteExpert } = useData();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpert, setEditingExpert] = useState<Expert | null>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [credentialsText, setCredentialsText] = useState('');

  const openAddModal = () => {
    setEditingExpert(null);
    setName('');
    setRole('Chuyên gia Đánh giá');
    setAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
    setBio('Kinh nghiệm đánh giá các sản phẩm tiêu dùng và giải pháp công nghệ.');
    setExperienceYears(5);
    setCredentialsText('Cử nhân Công nghệ\nChuyên viên kiểm định');
    setModalOpen(true);
  };

  const openEditModal = (exp: Expert) => {
    setEditingExpert(exp);
    setName(exp.name);
    setRole(exp.role);
    setAvatar(exp.avatar);
    setBio(exp.bio);
    setExperienceYears(exp.experienceYears);
    setCredentialsText(exp.credentials.join('\n'));
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const credentials = credentialsText.split('\n').map((s) => s.trim()).filter(Boolean);

    if (editingExpert) {
      updateExpert(editingExpert.id, {
        name,
        role,
        avatar,
        bio,
        experienceYears,
        credentials
      });
      showToast(`Đã cập nhật hồ sơ chuyên gia "${name}"!`, { type: 'success' });
    } else {
      addExpert({
        name,
        role,
        avatar,
        bio,
        articlesCount: 1,
        experienceYears,
        credentials
      });
      showToast(`Đã thêm chuyên gia "${name}" thành công!`, { type: 'success' });
    }

    setModalOpen(false);
  };

  const handleDelete = (exp: Expert) => {
    if (window.confirm(`Bạn có chắc muốn xóa chuyên gia "${exp.name}"?`)) {
      deleteExpert(exp.id);
      showToast('Đã xóa chuyên gia thành công!', { type: 'info' });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Quản Lý Đội Ngũ Chuyên Gia (Experts)"
        description="Quản lý hồ sơ ban biên tập, chuyên gia kiểm nghiệm và chứng chỉ chuyên môn."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
            Thêm chuyên gia
          </Button>
        }
      />

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img
                    src={exp.avatar}
                    alt={exp.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-slate-900 text-base truncate">{exp.name}</h4>
                    <span className="text-xs text-indigo-600 font-semibold block truncate">{exp.role}</span>
                    <span className="text-[11px] text-slate-400 block">{exp.experienceYears} năm kinh nghiệm</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{exp.bio}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Chứng chỉ & Kinh nghiệm:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {exp.credentials.map((cred, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{exp.articlesCount} bài đã viết</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(exp)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                    title="Sửa"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingExpert ? 'Chỉnh Sửa Hồ Sơ Chuyên Gia' : 'Thêm Chuyên Gia Mới'}
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hoàng Nam..."
            required
          />

          <Input
            label="Chức danh / Vai trò"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Trưởng ban Đánh giá Công nghệ..."
            required
          />

          <Input
            label="Ảnh đại diện (Avatar URL)"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />

          <Input
            label="Số năm kinh nghiệm"
            type="number"
            value={experienceYears}
            onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
            required
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Tiểu sử tóm tắt (Bio)
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Chứng chỉ & Thành tựu (mỗi dòng 1 mục)
            </label>
            <textarea
              rows={3}
              value={credentialsText}
              onChange={(e) => setCredentialsText(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingExpert ? 'Lưu hồ sơ' : 'Thêm chuyên gia'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
