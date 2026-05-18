import { useState } from 'react';

const FloatingDeity = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-float group cursor-pointer mobile-menu-hideable" onClick={() => setIsVisible(false)} title="Divine Blessings (Click to hide)">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[20px] group-hover:bg-primary/40 transition-all duration-700 animate-pulse" />

        {/* The Icon */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-primary/30 flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
          <img
            src="https://res.cloudinary.com/ddmzgotdd/image/upload/v1779092088/ChatGPT_Image_May_18_2026_01_44_24_PM_durfci.png"
            alt="Divine Blessings"
            className="w-[90%] h-[90%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingDeity;
