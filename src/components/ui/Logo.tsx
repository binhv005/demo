import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  useImageOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  className = '',
  useImageOnly = false
}) => {
  const isDark = variant === 'dark';

  // Size configurations
  const dimensions = {
    sm: { imgH: 'h-7', iconSize: 'w-7 h-7', textMain: 'text-base', textSub: 'text-[8.5px]' },
    md: { imgH: 'h-9', iconSize: 'w-9 h-9', textMain: 'text-lg sm:text-xl', textSub: 'text-[9.5px]' },
    lg: { imgH: 'h-11', iconSize: 'w-11 h-11', textMain: 'text-2xl', textSub: 'text-[11px]' }
  }[size];

  if (useImageOnly) {
    return (
      <img
        src={isDark ? '/logo-dark.png' : '/logo.png'}
        alt="Tech Review - Đánh giá & So sánh"
        className={`${dimensions.imgH} w-auto object-contain transition-transform ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon Image from 29c88610362fb8c8c9091d37ff0b1ebf.jpg */}
      <div
        className={`${dimensions.iconSize} rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-sm`}
      >
        <img
          src="/brand-logo.png"
          alt="TechReview Icon"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Typography: Tech Review + Subtitle */}
      <div className="flex flex-col justify-center leading-none">
        <div
          className={`${dimensions.textMain} font-black tracking-tight flex items-center`}
        >
          <span className={isDark ? 'text-white' : 'text-[#1e1c1b]'}>Tech</span>
          <span className="text-[#f26522] ml-1">Review</span>
        </div>
        {showSubtitle && (
          <span
            className={`${dimensions.textSub} font-extrabold tracking-wider uppercase mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-[#a69c90]'
            }`}
          >
            ĐÁNH GIÁ &amp; SO SÁNH
          </span>
        )}
      </div>
    </div>
  );
};
