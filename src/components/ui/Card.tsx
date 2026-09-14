import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  bordered = true,
  padding = 'md',
  className,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-2xl transition-all duration-200',
          bordered && 'border border-slate-200/80 shadow-sm',
          hover && 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5',
          paddingStyles[padding],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
