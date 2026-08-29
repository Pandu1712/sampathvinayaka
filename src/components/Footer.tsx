import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-primary/10 relative overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Temple Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-6 font-serif">Sampath Vinayakagar</h3>
            <p className="text-muted-foreground text-sm leading-loose max-w-sm">
              A sacred abode of Lord Ganesha — the remover of obstacles. Serving devotees with divine blessings and spiritual guidance for generations.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6 border-b border-primary/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "History", path: "/history" },
                { name: "Services", path: "/services" },
                { name: "Gallery", path: "/gallery" },
                { name: "Admin Portal", path: "/admin" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Temple Timings */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6 border-b border-primary/20 pb-2 inline-block">Temple Timings</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex justify-between border-b border-border/50 pb-1"><span>Darshan (Morning)</span> <span className="text-foreground font-medium text-right">6:00 AM – 11:00 AM</span></li>
              <li className="flex justify-between border-b border-border/50 pb-1"><span>Darshan (Evening)</span> <span className="text-foreground font-medium text-right">5:30 PM – 8:00 PM</span></li>
              <li className="flex justify-between border-b border-border/50 pb-1"><span>Homam</span> <span className="text-foreground font-medium text-right">5:00 AM – 6:30 AM</span></li>
              <li className="flex justify-between border-b border-border/50 pb-1"><span>Abhishekam</span> <span className="text-foreground font-medium text-right">7:00 AM – 8:30 AM</span></li>
              <li className="flex justify-between border-b border-border/50 pb-1"><span>Vehicle Pooja</span> <span className="text-foreground font-medium text-right">6:00 AM – 11:00 AM & 5:30 PM – 8:00 PM</span></li>
              <li className="flex justify-between pb-1"><span>Evening Aarti</span> <span className="text-foreground font-medium text-right">6:00 PM</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6 border-b border-primary/20 pb-2 inline-block">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">📍</span>
                <span>Asilmetta, Visakhapatnam, AP 530020</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">📞</span>
                <span>(+91) 891-2760740</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">🆘</span>
                <span className="font-semibold text-foreground">+91 97044 38668</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-8 sm:mt-10 mb-4" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 opacity-80">
          <div className="order-2 sm:order-1 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              © 2026 Sampath Vinayakagar Temple. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
              <span>Website designed by</span>
              <a
                href="https://wa.me/917675852618"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-bold transition-all"
              >
                Ascend Media Labs
              </a>
              <span className="opacity-30">|</span>
              <span>Contact:</span>
              <a href="tel:+917675852618" className="hover:text-primary transition-colors font-medium">
                7675852618
              </a>
              <a
                href="https://wa.me/917675852618"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors inline-flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-[10px] px-1.5 py-0.5 rounded border border-green-500/30"
              >
                <svg className="w-2.5 h-2.5 fill-current text-green-400 inline" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.489 5.358 1.49 5.404 0 9.8-4.386 9.803-9.789.002-2.618-1.01-5.078-2.861-6.93-1.85-1.851-4.31-2.864-6.924-2.865-5.417 0-9.817 4.39-9.82 9.795-.001 2.03.525 4.021 1.524 5.768L2.57 21.13l4.077-1.976zm11.59-5.185c-.303-.151-1.793-.883-2.073-.984-.28-.102-.484-.152-.688.152-.204.304-.79.983-.969 1.186-.179.203-.357.229-.66.077-1.155-.58-1.96-1.015-2.736-2.348-.3-.518.3-.481.857-1.597.09-.18.044-.337-.023-.472-.067-.136-.583-1.406-.8-1.928-.21-.508-.444-.439-.6-.447-.145-.007-.312-.009-.479-.009s-.439.062-.669.312c-.23.25-1.793 1.756-1.793 4.28 0 2.525 1.839 4.968 2.093 5.308.255.34 3.619 5.525 8.764 7.747 1.224.528 2.18.843 2.925 1.079 1.23.39 2.35.334 3.234.202.986-.147 2.073-.847 2.366-1.63.292-.782.292-1.452.204-1.597-.088-.146-.324-.229-.627-.38z"/>
                </svg>
                WhatsApp
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm font-serif italic text-primary order-1 sm:order-2">
            <div className="h-px w-8 bg-primary/30" />
            🙏 Om Gam Ganapataye Namaha 🙏
            <div className="h-px w-8 bg-primary/30" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
