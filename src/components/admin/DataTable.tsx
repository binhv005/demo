import React from 'react';
import { Search } from 'lucide-react';
import { Pagination } from '../ui/Pagination';

interface Column<T> {
  header: string;
  accessor?: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  filterSlots?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  searchPlaceholder = 'Tìm kiếm dữ liệu...',
  searchValue,
  onSearchChange,
  filterSlots,
  currentPage,
  totalPages,
  onPageChange,
  emptyMessage = 'Không tìm thấy dữ liệu nào phù hợp.'
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Search and Filters bar */}
      {(onSearchChange || filterSlots) && (
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          {onSearchChange && (
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          )}

          {filterSlots && <div className="flex flex-wrap items-center gap-2">{filterSlots}</div>}
        </div>
      )}

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
              {columns.map((col, idx) => (
                <th key={idx} className={`py-3.5 px-4 sm:px-6 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-400 text-xs sm:text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-slate-50/60 transition-colors">
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className={`py-4 px-4 sm:px-6 text-slate-700 ${col.className || ''}`}>
                      {typeof col.accessor === 'function'
                        ? col.accessor(item)
                        : col.accessor
                        ? (item[col.accessor] as React.ReactNode)
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages && totalPages > 1 && onPageChange && currentPage && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-center sm:justify-between bg-slate-50/30">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Trang <strong>{currentPage}</strong> trên <strong>{totalPages}</strong> ({data.length} kết quả)
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
