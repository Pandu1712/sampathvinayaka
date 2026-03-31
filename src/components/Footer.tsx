import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-primary/10 relative overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-4 py-8 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Temple Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-6 font-serif">Sampath Vinayaka</h3>
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
              <li className="flex justify-between border-b border-border/50 pb-1"><span>Daily</span> <span className="text-foreground font-medium">6:00 AM – 8:00 PM</span></li>
              <li className="flex justify-between border-b border-border/50 pb-1"><span>Abhishekam</span> <span className="text-foreground font-medium">6:00 AM</span></li>
              <li className="flex justify-between border-b border-border/50 pb-1"><span>Vehicle Pooja</span> <span className="text-foreground font-medium">9:00 AM</span></li>
              <li className="flex justify-between pb-1"><span>Evening Aarti</span> <span className="text-foreground font-medium">6:00 PM</span></li>
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
                <span>(+91) 891-2755650</span>
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
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            © 2026 Sampath Vinayaka Temple. All rights reserved.
          </p>
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
