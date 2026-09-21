import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { PageTransition } from '../layout/PageTransition';
import { Menu, ExternalLink } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen max-h-screen w-full overflow-hidden bg-[#0d1527] font-sans text-slate-800">
      {/* Responsive Admin Sidebar (Drawer on mobile, Static full-height 100vh on desktop) */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area with independent scrollbar */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50">
        {/* Mobile Top Navbar (Visible only on < lg screens) */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#0d1527] text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between shadow-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="Mở menu quản trị"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 shadow-xs">
                <img src="/brand-logo.webp" alt="TechReview Icon" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-sm tracking-tight">Admin <span className="text-orange-400">CMS</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Xem website"
            >
              <ExternalLink className="w-4 h-4 text-orange-400" />
            </Link>
          </div>
        </header>

        {/* Scrollable Content View */}
        <main className="flex-1 overflow-y-auto w-full custom-scrollbar">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
};
