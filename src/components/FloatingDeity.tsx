import { useState } from 'react';

const FloatingDeity = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-float group cursor-pointer" onClick={() => setIsVisible(false)} title="Divine Blessings (Click to hide)">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[20px] group-hover:bg-primary/40 transition-all duration-700 animate-pulse" />

        {/* The Icon */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-primary/20 glass flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
          <img
            src="/logo-circular.png"
            alt="Divine Blessings"
            className="w-[75%] h-[75%] object-contain drop-shadow-[0_2px_10px_rgba(var(--primary),0.8)] filter brightness-110 contrast-125 saturate-150 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingDeity;
