import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export type TransitionType = 'fade-slide' | 'scale-blur' | 'slide-right' | 'curtain' | 'flip-elevate';

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Determine transition type based on current route path
  const getTransitionClass = (pathname: string): string => {
    if (pathname === '/') {
      return 'animate-page-scale-in';
    }
    if (pathname.startsWith('/top/')) {
      return 'animate-page-slide-right';
    }
    if (pathname.startsWith('/review/')) {
      return 'animate-page-fade-slide';
    }
    if (pathname.startsWith('/so-sanh/')) {
      return 'animate-page-flip-elevate';
    }
    if (pathname.startsWith('/huong-dan/')) {
      return 'animate-page-curtain';
    }
    if (pathname.startsWith('/san-pham-')) {
      return 'animate-page-fade-slide';
    }
    if (pathname.startsWith('/tim-kiem')) {
      return 'animate-page-scale-in';
    }
    if (pathname.startsWith('/admin')) {
      return 'animate-page-fade-slide';
    }
    return 'animate-page-fade-slide';
  };

  useEffect(() => {
    // Trigger smooth top progress bar on every route change
    setIsNavigating(true);
    setProgress(30);

    const timer1 = setTimeout(() => {
      setProgress(80);
    }, 100);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 300);

    const timer3 = setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Sleek Glowing Top Navigation Progress Bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Main Page Content with Route-Specific Keyframe Transition */}
      <div
        key={location.pathname}
        className={`w-full ${getTransitionClass(location.pathname)}`}
      >
        {children}
      </div>
    </>
  );
};
