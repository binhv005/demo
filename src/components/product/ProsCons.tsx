import React from 'react';
import { Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProsConsProps {
  pros: string[];
  cons: string[];
  className?: string;
  title?: boolean;
}

export const ProsCons: React.FC<ProsConsProps> = ({
  pros,
  cons,
  className = '',
  title = true
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 ${className}`}>
      {/* ƯU ĐIỂM */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5">
        {title && (
          <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-sm">
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <span>Ưu điểm nổi bật</span>
          </div>
        )}
        <ul className="space-y-2.5">
          {pros.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <span className="w-5 h-5 rounded-full bg-emerald-200/70 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* NHƯỢC ĐIỂM */}
      <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5">
        {title && (
          <div className="flex items-center gap-2 mb-3 text-rose-800 font-bold text-sm">
            <ThumbsDown className="w-4 h-4 text-rose-600" />
            <span>Điểm cần lưu ý</span>
          </div>
        )}
        <ul className="space-y-2.5">
          {cons.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <span className="w-5 h-5 rounded-full bg-rose-200/70 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3 h-3 stroke-[3]" />
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
