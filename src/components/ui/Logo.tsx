import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  useImageOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  useImageOnly = false
}) => {
  const isDark = variant === 'dark';

  // Size configurations
  const dimensions = {
    sm: { imgH: 'h-8', iconSize: 'w-8 h-8', textMain: 'text-sm sm:text-base' },
    md: { imgH: 'h-10', iconSize: 'w-10 h-10', textMain: 'text-base sm:text-lg' },
    lg: { imgH: 'h-13', iconSize: 'w-13 h-13', textMain: 'text-xl sm:text-2xl' },
    xl: { imgH: 'h-15', iconSize: 'w-15 h-15', textMain: 'text-2xl sm:text-3xl' }
  }[size];

  if (useImageOnly) {
    return (
      <img
        src="/brand-logo.webp"
        alt="TOP 20 PRODUCT"
        className={`${dimensions.imgH} w-auto object-contain transition-transform ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon Image */}
      <div
        className={`${dimensions.iconSize} rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-sm border border-sky-400/30 bg-slate-950`}
      >
        <img
          src="/brand-logo.webp"
          alt="TOP 20 PRODUCT Logo"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Typography: TOP 20 PRODUCT */}
      <div
        className={`${dimensions.textMain} font-black tracking-tight flex items-center gap-1.5 leading-none`}
      >
        <span className={isDark ? 'text-white' : 'text-slate-900'}>TOP 20</span>
        <span className="text-sky-500 font-black">PRODUCT</span>
      </div>
    </div>
  );
};
