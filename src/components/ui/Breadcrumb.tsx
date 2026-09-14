import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center text-xs sm:text-sm text-slate-500 py-3 overflow-x-auto no-scrollbar ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 sm:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Trang chủ</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1 flex-shrink-0" />
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="text-slate-500 hover:text-indigo-600 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
