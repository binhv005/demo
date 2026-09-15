import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startTransition = () => {
    setIsNavigating(true);
    setProgress(30);

    const timer1 = setTimeout(() => setProgress(75), 80);
    const timer2 = setTimeout(() => setProgress(100), 220);
    const timer3 = setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 380);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  useEffect(() => {
    return startTransition();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleCustomTransition = () => startTransition();
    window.addEventListener('trigger-page-transition', handleCustomTransition);
    return () => window.removeEventListener('trigger-page-transition', handleCustomTransition);
  }, []);

  return (
    <>
      {/* Sleek Glowing Top Navigation Progress Bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#FF5722] via-[#FFD46C] to-[#22c55e] shadow-[0_0_14px_rgba(255,87,34,0.9)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Main Content with Smooth Fade-in */}
      <div key={location.pathname} className="w-full animate-page-fade">
        {children}
      </div>
    </>
  );
};



