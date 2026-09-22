import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck, Bell, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, description, actions }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        </div>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0 whitespace-nowrap">
        {actions}

        {/* User Info Capsule */}
        <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
          <div className="text-left">
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              {user?.name || 'Quản Trị Viên'}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {user?.email || 'admin@top20product.vn'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
