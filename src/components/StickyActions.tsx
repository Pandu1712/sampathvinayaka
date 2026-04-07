import { MessageCircle, MapPin } from "lucide-react";

const StickyActions = () => {
  const whatsappNumber = "919704438668";
  const mapsLink = "https://www.google.com/maps/search/Sri+Sampath+Vinayaka+Temple+Visakhapatnam";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 animate-fade-in">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="absolute right-16 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Us
        </span>
      </a>

      {/* Location Button */}
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-all duration-300 pointer-events-auto"
        aria-label="See Directions"
      >
        <MapPin size={28} />
        <span className="absolute right-16 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Get Directions
        </span>
      </a>
    </div>
  );
};

export default StickyActions;
