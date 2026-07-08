import { MessageCircle, MapPin } from "lucide-react";
import BackgroundMusic from "./BackgroundMusic";

const StickyActions = () => {
  const whatsappNumber = "919704438668";
  const mapsLink = "https://www.google.com/maps/search/Sri+Sampath+Vinayakagar+Temple+Visakhapatnam";

  return (
    <div className="fixed bottom-8 right-6 md:bottom-10 md:right-8 z-50 flex flex-row md:flex-col gap-2.5 sm:gap-4 animate-fade-in mobile-menu-hideable">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 md:w-7 md:h-7" />
        <span className="absolute right-0 md:right-16 bottom-14 md:bottom-auto px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Us
        </span>
      </a>

      {/* Location Button */}
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-all duration-300 pointer-events-auto"
        aria-label="See Directions"
      >
        <MapPin className="w-5 h-5 md:w-7 md:h-7" />
        <span className="absolute right-0 md:right-16 bottom-14 md:bottom-auto px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Get Directions
        </span>
      </a>

      {/* Music Button */}
      <BackgroundMusic />
    </div>
  );
};

export default StickyActions;
