import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";


const sectionIds = ["home", "history", "services", "gallery", "events", "members", "contact"];

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
      // Scroll-spy: find the section currently in view
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const navLinks = isHome
    ? [
      { name: "Home", href: "#home" },
      { name: "History", href: "#history" },
      { name: "Services", href: "#services" },
      { name: "Gallery", href: "#gallery" },
      { name: "Events", href: "#events" },
      { name: "Members", href: "#members" },
      { name: "Contact Us", href: "#contact" },
    ]
    : [
      { name: "Home", href: "/" },
      { name: "History", href: "/history" },
      { name: "Services", href: "/services" },
      { name: "Gallery", href: "/gallery" },
      { name: "Events", href: "/events" },
      { name: "Members", href: "/members" },
      { name: "Contact Us", href: "/contact" },
    ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full glass p-1.5 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.2)] group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
              <div className="absolute inset-0 animate-pulse bg-primary/5 blur-xl" />
              <img src="/logo-circular.png" alt="Sampath Vinayaka" className="w-[95%] h-[95%] object-contain relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-700 rounded-full" />
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
                    className={`px-3 xl:px-4 py-1.5 xl:py-2 whitespace-nowrap rounded-full text-sm  transition-all duration-300 cursor-pointer ${isActive
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
                    className={`px-3 xl:px-4 py-1.5 xl:py-2 whitespace-nowrap rounded-full text-sm  transition-all duration-300 ${isActive
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
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <a href="tel:+918912755650" className="hidden 2xl:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone size={14} />
              <span>(+91) 891-2755650</span>
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

      {/* Mobile Menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="glass-dark mx-4 my-2 rounded-2xl overflow-hidden border border-white/20">
          <nav className="flex flex-col px-4 py-4 gap-2">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith("#")
                ? activeSection === link.href.replace("#", "")
                : location.pathname === link.href;

              return link.href.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(link.href, e)}
                  className={`px-4 py-3.5 rounded-xl text-sm transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-lg scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3.5 rounded-xl text-sm transition-all duration-300 ${isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-lg scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="h-px bg-white/10 my-4 mx-4" />

            <div className="flex flex-col gap-4 px-4">
              <a href="tel:+918912755650" className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone size={18} className="text-primary" />
                </div>
                <span className="font-medium underline decoration-primary/30 underline-offset-4">(+91) 891-2755650</span>
              </a>

              <a
                href={isHome ? "#contact" : "/contact"}
                onClick={(e) => {
                  if (isHome) handleClick("#contact", e);
                  else setMobileOpen(false);
                }}
                className="w-full py-4 rounded-xl text-sm font-bold bg-primary text-primary-foreground text-center hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/30 cursor-pointer active:scale-95"
              >
                Visit Temple →
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
