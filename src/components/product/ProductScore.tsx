import React from 'react';
import { ScoreBreakdown } from '../../types';
import { ScoreBadge } from '../ui/ScoreBadge';

interface ProductScoreProps {
  score: number;
  breakdown: ScoreBreakdown;
  className?: string;
}

export const ProductScore: React.FC<ProductScoreProps> = ({
  score,
  breakdown,
  className = ''
}) => {
  const metrics = [
    { label: 'Thiết kế & Hoàn thiện', value: breakdown.design },
    { label: 'Hiệu năng & Trải nghiệm', value: breakdown.performance },
    { label: 'Giá trị / Chi phí (P/P)', value: breakdown.value },
    { label: 'Tính thực tế & Dễ sử dụng', value: breakdown.usability }
  ];

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Đánh giá Chuyên gia</h4>
          <p className="text-xs text-slate-500 mt-0.5">Dựa trên tiêu chuẩn kiểm nghiệm độc lập</p>
        </div>
        <ScoreBadge score={score} size="lg" showLabel />
      </div>

      <div className="space-y-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>{m.label}</span>
              <span className="font-bold text-slate-900">{m.value.toFixed(1)} / 10</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(m.value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
