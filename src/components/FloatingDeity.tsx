import { useState } from 'react';
import vinayakaLogo from "@/assets/vinayaka-logo.png";

const FloatingDeity = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block fixed bottom-10 left-8 z-[100] animate-float group cursor-pointer mobile-menu-hideable" onClick={() => setIsVisible(false)} title="Divine Blessings (Click to hide)">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[20px] group-hover:bg-primary/40 transition-all duration-700 animate-pulse" />

        {/* The Icon */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-primary/30 flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
          <img
            src={vinayakaLogo}
            alt="Divine Blessings"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingDeity;
