import React, { useState, useEffect, useRef } from 'react';
import { TOCItem } from '../../types';
import { List, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  className = '',
  activeId: controlledActiveId,
  onItemClick
}) => {
  const [activeId, setActiveId] = useState<string>(controlledActiveId || items[0]?.id || '');
  const isUserScrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (controlledActiveId) {
      setActiveId(controlledActiveId);
    }
  }, [controlledActiveId]);

  // Scroll spy: automatically update active item based on scroll position
  useEffect(() => {
    if (!items || items.length === 0) return;

    const handleScroll = () => {
      if (isUserScrollingRef.current) return;

      const scrollPosition = window.scrollY + 130;
      let currentId = items[0]?.id;

      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPosition >= top) {
            currentId = items[i].id;
          }
        }
      }

      if (currentId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    if (onItemClick) onItemClick(id);

    const element = document.getElementById(id);
    if (element) {
      isUserScrollingRef.current = true;
      const yOffset = -96; // Offset for sticky navbar (80px header + 16px buffer)
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 700);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4 pb-2.5 border-b border-slate-100 font-bold text-slate-900 text-sm sm:text-base">
        <div className="flex items-center gap-2.5">
          <List className="w-5 h-5 text-orange-500 stroke-[2.5] flex-shrink-0" />
          <span>Mục lục bài viết</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
          {items.length} phần
        </span>
      </div>

      {/* List items */}
      <nav className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm max-h-[calc(100vh-11rem)] overflow-y-auto pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left py-2.5 px-3.5 rounded-xl sm:rounded-2xl flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-orange-50 text-orange-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              <span className="truncate">{item.title}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 text-orange-500 stroke-[2.5] flex-shrink-0" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
