import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Flower2, Sparkles, MapPin, Home, BookOpen, Image, Calendar as CalendarIcon, Users, Heart, Clock } from "lucide-react";


const sectionIds = ["home", "history", "services", "gallery", "events", "members", "panchangam", "donations", "contact"];

const getLinkIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "home":
      return <Home size={18} />;
    case "history":
      return <BookOpen size={18} />;
    case "services":
      return <Sparkles size={18} />;
    case "gallery":
      return <Image size={18} />;
    case "events":
      return <CalendarIcon size={18} />;
    case "members":
      return <Users size={18} />;
    case "calendar":
      return <Clock size={18} />;
    case "donations":
      return <Heart size={18} />;
    case "contact us":
      return <Phone size={18} />;
    default:
      return <Flower2 size={18} />;
  }
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHome) return;
      // Scroll-spy: identify the section occupying the active viewport zone
      let bestMatch = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section occupies the critical viewing zone of the viewport
          if (rect.top <= 160 && rect.bottom >= 160) {
            bestMatch = id;
            break;
          }
        }
      }
      setActiveSection(bestMatch);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [mobileOpen]);

  const navLinks = isHome
    ? [
      { name: "Home", href: "#home" },
      { name: "History", href: "#history" },
      { name: "Services", href: "#services" },
      { name: "Gallery", href: "#gallery" },
      { name: "Events", href: "#events" },
      { name: "Members", href: "#members" },
      { name: "Calendar", href: "#panchangam" },

      { name: "Donations", href: "#donations" },
      { name: "Contact Us", href: "#contact" },
    ]
    : [
      { name: "Home", href: "/" },
      { name: "History", href: "/history" },
      { name: "Services", href: "/services" },
      { name: "Gallery", href: "/gallery" },
      { name: "Calendar", href: "/#panchangam" },
      { name: "Events", href: "/events" },
      { name: "Members", href: "/members" },
      { name: "Donations", href: "/#donations" },
      { name: "Contact Us", href: "/contact" },
    ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    if (el) {
      const headerHeight = window.innerWidth >= 640 ? 112 : 96; // match the layout header heights
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 16; // subtract header height plus a small gap

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileOpen(false);
  };

  const handleClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollTo(href);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white border-b border-border ${scrolled ? "shadow-md" : "shadow-sm"
          }`}
      >
      {/* Top accent bar */}
      <div className="h-[4px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-4">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 flex-shrink-0 group">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center border-2 border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.2)] group-hover:border-primary/50 transition-all duration-500 overflow-hidden">
              <img src="https://res.cloudinary.com/ddmzgotdd/image/upload/v1779092088/ChatGPT_Image_May_18_2026_01_44_24_PM_durfci.png" alt="Sampath Vinayaka" className="w-[90%] h-[90%] object-contain relative z-10 group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-foreground leading-tight font-serif italic text-shadow-sm">
                Sampath Vinayaka
              </span>
              <div className="flex items-center gap-2">
                <div className="h-px w-4 bg-primary/40" />
                <span className="text-sm tracking-[0.4em] uppercase text-primary font-bold leading-tight">
                  Temple
                </span>
                <div className="h-px w-4 bg-primary/40" />
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex flex-1 justify-center items-center px-4">
            <div className="flex items-center gap-0.5 xl:gap-1 bg-muted/80 rounded-full px-1.5 xl:px-2 py-1 xl:py-1.5 border border-border/50">
              {navLinks.map((link) => {
                const isActive = link.href.startsWith("#")
                  ? activeSection === link.href.replace("#", "")
                  : location.pathname === link.href;

                return link.href.startsWith("#") ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(link.href, e)}
                    className={`px-2 xl:px-3 py-1.5 xl:py-2 whitespace-nowrap rounded-full text-xs xl:text-sm transition-all duration-300 cursor-pointer ${isActive
                      ? "bg-primary text-primary-foreground font-medium shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background"
                      }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-2 xl:px-3 py-1.5 xl:py-2 whitespace-nowrap rounded-full text-xs xl:text-sm transition-all duration-300 ${isActive
                      ? "bg-primary text-primary-foreground font-medium shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* CTA Desktop */}
          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <a href="tel:+918912755650" className="hidden 2xl:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone size={14} />
              <span>(+91) 891-2755650</span>
            </a>
            <div className="hidden 2xl:block w-px h-6 bg-border" />
            <a href="https://wa.me/919491000712" target="_blank" rel="noopener noreferrer" className="hidden 2xl:flex items-center gap-2 text-sm text-muted-foreground hover:text-green-500 transition-colors">
              <svg className="w-3.5 h-3.5 fill-current text-green-500" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.489 5.358 1.49 5.404 0 9.8-4.386 9.803-9.789.002-2.618-1.01-5.078-2.861-6.93-1.85-1.851-4.31-2.864-6.924-2.865-5.417 0-9.817 4.39-9.82 9.795-.001 2.03.525 4.021 1.524 5.768L2.57 21.13l4.077-1.976zm11.59-5.185c-.303-.151-1.793-.883-2.073-.984-.28-.102-.484-.152-.688.152-.204.304-.79.983-.969 1.186-.179.203-.357.229-.66.077-1.155-.58-1.96-1.015-2.736-2.348-.3-.518.3-.481.857-1.597.09-.18.044-.337-.023-.472-.067-.136-.583-1.406-.8-1.928-.21-.508-.444-.439-.6-.447-.145-.007-.312-.009-.479-.009s-.439.062-.669.312c-.23.25-1.793 1.756-1.793 4.28 0 2.525 1.839 4.968 2.093 5.308.255.34 3.619 5.525 8.764 7.747 1.224.528 2.18.843 2.925 1.079 1.23.39 2.35.334 3.234.202.986-.147 2.073-.847 2.366-1.63.292-.782.292-1.452.204-1.597-.088-.146-.324-.229-.627-.38z"/>
              </svg>
              <span>WhatsApp: 9491000712</span>
            </a>
            <div className="hidden 2xl:block w-px h-6 bg-border" />
            {isHome ? (
              <a
                href="#contact"
                onClick={(e) => handleClick("#contact", e)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
              >
                Visit Temple
                <span className="text-sm">→</span>
              </a>
            ) : (
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20"
              >
                Visit Temple
                <span className="text-sm">→</span>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:bg-primary/10 transition-all duration-300 shadow-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 xl:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sliding Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-[290px] sm:w-[320px] bg-gradient-to-b from-[#2E200C] via-[#1E1408] to-[#120B02] border-r border-primary/45 z-[60] xl:hidden flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-2xl`}
      >
        {/* Subtle Decorative Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_right,hsla(38,72%,50%,0.06)_0,transparent_60%)] pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10 flex-1 overflow-y-auto pr-1">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-primary/20 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-primary/30 overflow-hidden shrink-0">
                <img 
                  src="https://res.cloudinary.com/ddmzgotdd/image/upload/v1779092088/ChatGPT_Image_May_18_2026_01_44_24_PM_durfci.png" 
                  alt="Logo" 
                  className="w-[90%] h-[90%] object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-sm text-primary tracking-wider leading-none">Sampath Vinayaka</span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-px w-2 bg-primary/40" />
                  <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Temple</span>
                  <div className="h-px w-2 bg-primary/40" />
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-primary transition-colors active:scale-95 shrink-0"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 py-2">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith("#")
                ? activeSection === link.href.replace("#", "")
                : location.pathname === link.href;

              return link.href.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(link.href, e)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-gradient-to-r from-primary/25 via-primary/5 to-transparent border border-primary/40 text-primary font-serif font-black tracking-widest shadow-inner scale-[1.01]"
                    : "text-white/80 hover:text-white hover:bg-white/5 font-serif tracking-wider"
                    }`}
                >
                  <span className={`shrink-0 transition-transform duration-500 ${isActive ? "text-primary scale-110" : "text-primary/40"}`}>
                    {getLinkIcon(link.name)}
                  </span>
                  <span className="text-sm font-semibold">{link.name}</span>
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                    ? "bg-gradient-to-r from-primary/25 via-primary/5 to-transparent border border-primary/40 text-primary font-serif font-black tracking-widest shadow-inner scale-[1.01]"
                    : "text-white/80 hover:text-white hover:bg-white/5 font-serif tracking-wider"
                    }`}
                >
                  <span className={`shrink-0 transition-transform duration-500 ${isActive ? "text-primary scale-110" : "text-primary/40"}`}>
                    {getLinkIcon(link.name)}
                  </span>
                  <span className="text-sm font-semibold">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-4 pt-6 border-t border-primary/20 relative z-10 shrink-0">
          <a href="tel:+918912755650" className="flex items-center gap-4 text-white/80 hover:text-primary transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Phone size={16} className="text-primary animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Temple Contact</span>
              <span className="text-sm font-medium tracking-wide">(+91) 891-2755650</span>
            </div>
          </a>

          <a href="https://wa.me/919491000712" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/80 hover:text-green-500 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-4 h-4 fill-current text-green-500" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.489 5.358 1.49 5.404 0 9.8-4.386 9.803-9.789.002-2.618-1.01-5.078-2.861-6.93-1.85-1.851-4.31-2.864-6.924-2.865-5.417 0-9.817 4.39-9.82 9.795-.001 2.03.525 4.021 1.524 5.768L2.57 21.13l4.077-1.976zm11.59-5.185c-.303-.151-1.793-.883-2.073-.984-.28-.102-.484-.152-.688.152-.204.304-.79.983-.969 1.186-.179.203-.357.229-.66.077-1.155-.58-1.96-1.015-2.736-2.348-.3-.518.3-.481.857-1.597.09-.18.044-.337-.023-.472-.067-.136-.583-1.406-.8-1.928-.21-.508-.444-.439-.6-.447-.145-.007-.312-.009-.479-.009s-.439.062-.669.312c-.23.25-1.793 1.756-1.793 4.28 0 2.525 1.839 4.968 2.093 5.308.255.34 3.619 5.525 8.764 7.747 1.224.528 2.18.843 2.925 1.079 1.23.39 2.35.334 3.234.202.986-.147 2.073-.847 2.366-1.63.292-.782.292-1.452.204-1.597-.088-.146-.324-.229-.627-.38z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-green-500 uppercase tracking-widest font-black">WhatsApp Support</span>
              <span className="text-sm font-medium tracking-wide">(+91) 94910-00712</span>
            </div>
          </a>

          <a
            href={isHome ? "#contact" : "/contact"}
            onClick={(e) => {
              if (isHome) handleClick("#contact", e);
              else setMobileOpen(false);
            }}
            className="group relative w-full py-4 rounded-xl text-sm font-bold bg-primary text-primary-foreground text-center shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95 transition-all overflow-hidden flex items-center justify-center gap-2 cursor-pointer border border-primary/30"
          >
            <Sparkles size={16} className="text-primary-foreground group-hover:animate-pulse" />
            <span className="font-serif tracking-widest uppercase">Visit Temple</span>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
