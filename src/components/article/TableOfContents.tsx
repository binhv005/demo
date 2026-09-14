import React, { useState, useEffect } from 'react';
import { TOCItem } from '../../types';
import { List, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, className = '' }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 font-bold text-slate-900 text-sm">
        <List className="w-4 h-4 text-indigo-600" />
        <span>Mục lục bài viết</span>
      </div>

      <nav className="space-y-1.5 text-xs sm:text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between gap-2 transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              <span className="truncate">{item.title}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
