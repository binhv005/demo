import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  growth?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'blue' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  growth,
  color = 'indigo'
}) => {
  const colorStyles = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${colorStyles[color]}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</span>
        {growth && (
          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {growth}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
};
