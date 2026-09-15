import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip-up';
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, show immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const getInitialStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'opacity, transform'
    };

    if (isVisible) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: 'none'
      };
    }

    switch (animation) {
      case 'fade-up':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translateY(40px)'
        };
      case 'fade-left':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translateX(45px)'
        };
      case 'fade-right':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translateX(-45px)'
        };
      case 'zoom-in':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'scale(0.93) translateY(20px)'
        };
      case 'flip-up':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'perspective(1000px) rotateX(14deg) translateY(30px)'
        };
      default:
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translateY(40px)'
        };
    }
  };

  return (
    <div ref={domRef} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
};

