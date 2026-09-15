import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { ScoreBadge } from '../ui/ScoreBadge';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ComparisonMatrixProps {
  products: Product[];
  className?: string;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ products, className = '' }) => {
  if (products.length === 0) return null;

  // Extract common specs keys
  const allSpecKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs || {})))
  ).slice(0, 5);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Bảng So Sánh Thông Số Đối Đầu
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Vuốt ngang để xem toàn bộ các sản phẩm trong danh sách
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Table Container */}
      <div className="relative w-full max-w-full overflow-x-auto rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-sm scrollbar-thin">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="p-3 sm:p-5 font-bold text-slate-900 min-w-[120px] sm:min-w-[160px] sticky left-0 bg-slate-50/95 backdrop-blur z-10 border-r border-slate-200/60 shadow-xs">
                Sản phẩm
              </th>
              {products.map((p) => (
                <th key={p.id} className="p-3 sm:p-5 font-bold text-slate-900 min-w-[170px] sm:min-w-[220px] text-center align-top">
                  <div className="space-y-2">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover mx-auto border border-slate-200/80 shadow-sm"
                    />
                    <Link
                      to={`/review/${p.slug}`}
                      className="block font-bold text-xs sm:text-sm text-slate-900 hover:text-indigo-600 line-clamp-2"
                    >
                      {p.name}
                    </Link>
                    <div className="flex justify-center">
                      <ScoreBadge score={p.score} size="sm" />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Row: Price */}
            <tr className="border-b border-slate-100 bg-white">
              <td className="p-3 sm:p-5 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200/60 shadow-xs">
                Giá tham khảo
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-3 sm:p-5 text-center font-bold text-indigo-600 whitespace-nowrap">
                  {formatPrice(p.price, p.priceUnit)}
                </td>
              ))}
            </tr>

            {/* Dynamic Spec Rows */}
            {allSpecKeys.map((key, idx) => (
              <tr
                key={key}
                className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-slate-50/40' : 'bg-white'}`}
              >
                <td className="p-3 sm:p-5 font-semibold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200/60 shadow-xs">
                  {key}
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 sm:p-5 text-center text-slate-600 font-medium text-xs sm:text-sm">
                    {p.specs[key] || '—'}
                  </td>
                ))}
              </tr>
            ))}

            {/* Row: Best For */}
            <tr className="border-b border-slate-100 bg-white">
              <td className="p-3 sm:p-5 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200/60 shadow-xs">
                Phù hợp cho
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-3 sm:p-5 text-center text-xs text-slate-600">
                  {p.bestFor}
                </td>
              ))}
            </tr>

            {/* Row: CTA */}
            <tr className="bg-slate-50/70">
              <td className="p-3 sm:p-5 font-bold text-slate-700 sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200/60 shadow-xs">
                Xem đánh giá
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-3 sm:p-5 text-center">
                  <Link to={`/review/${p.slug}`}>
                    <Button variant="primary" size="sm" className="w-full">
                      Chi tiết
                    </Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
