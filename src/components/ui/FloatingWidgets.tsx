import React, { useState, useEffect } from 'react';
import { ChevronUp, Phone, MessageCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const FloatingWidgets: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePhoneClick = () => {
    showToast('Hotline tư vấn độc lập Top20Product: 1900 6868 (8:00 - 21:00)', {
      type: 'info'
    });
  };

  const handleZaloClick = () => {
    showToast('Đang mở cổng tư vấn Zalo Official Account Top20Product...', {
      type: 'info'
    });
    window.open('https://zalo.me', '_blank');
  };

  return (
    <aside aria-label="Nút liên hệ và cuộn trang" className="fixed right-4 sm:right-6 bottom-6 z-50 flex flex-col items-center gap-3 select-none">
      {/* 1. SCROLL TO TOP BUTTON */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Cuộn lên đầu trang"
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 text-white hover:bg-slate-800 shadow-xl border border-slate-700/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        title="Lên đầu trang"
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* 2. PHONE / HOTLINE BUTTON */}
      <button
        type="button"
        onClick={handlePhoneClick}
        aria-label="Gọi hotline hỗ trợ"
        className="relative group w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
        title="Hotline: 1900 6868"
      >
        {/* Pulsing Ring Animation */}
        <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping pointer-events-none" />
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 animate-bounce" />
      </button>

      {/* 3. ZALO BUTTON */}
      <button
        type="button"
        onClick={handleZaloClick}
        aria-label="Chat qua Zalo"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0068ff] hover:bg-[#0055d4] text-white shadow-2xl flex items-center justify-center font-black text-sm sm:text-base tracking-tighter transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/20"
        title="Chat Zalo hỗ trợ"
      >
        <span>Zalo</span>
      </button>
    </aside>
  );
};
