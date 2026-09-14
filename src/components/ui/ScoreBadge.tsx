import React from 'react';
import { getScoreColor } from '../../utils/formatters';
import { Star } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  showLabel = false,
  size = 'md',
  className = ''
}) => {
  const colorInfo = getScoreColor(score);

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-xs text-white ${colorInfo.bg} ${className}`}>
        <Star className="w-3 h-3 fill-current" />
        <span>{score.toFixed(1)}</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`flex flex-col items-center justify-center p-3.5 rounded-2xl text-white shadow-lg ${colorInfo.bg} ${className}`}>
        <div className="flex items-baseline gap-0.5">
          <span className="text-3xl font-extrabold tracking-tight">{score.toFixed(1)}</span>
          <span className="text-xs font-semibold opacity-80">/10</span>
        </div>
        {showLabel && (
          <span className="text-xs font-semibold mt-0.5 uppercase tracking-wider opacity-95">
            {colorInfo.label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold text-sm text-white shadow-sm ${colorInfo.bg} ${className}`}>
      <Star className="w-3.5 h-3.5 fill-current" />
      <span>{score.toFixed(1)}</span>
      {showLabel && <span className="text-xs opacity-90 font-medium">({colorInfo.label})</span>}
    </div>
  );
};
