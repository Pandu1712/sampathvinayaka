import Layout from "@/components/Layout";
import templeHero5 from "@/assets/temple-hero-5.jpg";

const allServices = [
  { icon: "💐", title: "Abhishekam", desc: "Sacred bathing ritual for the deity to seek blessings for health and success.", timing: "7:00 AM – 8:30 AM", price: "Free" },
  { icon: "🚗", title: "Vehicle Pooja", desc: "Traditional pooja for new vehicles to ensure safety and prosperity.", timing: "6:00 AM – 11:00 AM & 5:30 PM – 8:00 PM", price: "Free" },
  { icon: "🎊", title: "Special Abhishekam (Ganesha Navaratri)", desc: "Special bathing ritual performed for the deity during the auspicious days of Ganesha Navaratri.", timing: "7:00 AM – 12:00 PM", price: "Free" },
  { icon: "🪔", title: "Daily Pooja", desc: "Morning and evening worship rituals performed by head priests with vedic chanting.", timing: "6:00 AM & 7:00 PM", price: "Free" },
  { icon: "🎋", title: "Homam / Havan", desc: "Sacred fire ritual for prosperity, health, and spiritual growth.", timing: "5:00 AM – 6:30 AM", price: "Free" },
  { icon: "📖", title: "Vedic Classes", desc: "Learn ancient scriptures, shlokas, and spiritual practices for inner peace.", timing: "Sat & Sun 8 AM", price: "Free" },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 relative overflow-hidden text-center bg-gradient-to-b from-[#1C1917] to-background border-b border-primary/15 animate-fade-rise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(38,72%,50%,0.05)_0,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 px-4">
          <p className="text-primary text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-black">🙏 Sacred Offerings</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-wide leading-tight">
            Our Divine Services
          </h1>
          <div className="h-1 w-24 bg-primary/40 rounded-full mx-auto mt-4 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="text-stone-300 mt-4 max-w-xl mx-auto text-xs sm:text-sm font-serif italic">
            Devotional pujas and sevas performed regularly at the temple
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allServices.map((s, i) => (
              <div 
                key={i} 
                className="premium-card p-5 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-2 transition-all duration-500 animate-fade-rise"
                style={{ animationDelay: `${i * 100}ms`, opacity: 0, animationFillMode: "forwards" }}
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center text-4xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6">
                  {s.icon}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-4 font-serif group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 leading-relaxed font-light">{s.desc}</p>
                <div className="mt-4 pt-6 border-t border-primary/10 w-full">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      Daily Schedule
                    </div>
                    <span className="text-foreground font-semibold text-sm bg-primary/5 py-2 px-4 rounded-full border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">{s.timing}</span>
                    <div className="mt-2 text-primary font-black text-2xl drop-shadow-sm">{s.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section-padding px-4 bg-primary/[0.02]">
        <div className="container-custom text-center">
          <div className="glass p-6 sm:p-20 rounded-[3rem] border border-white/40 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
             <div className="relative z-10">
               <h2 className="text-2xl font-bold text-foreground mb-6 font-serif">Wish to Book a <span className="gold-shimmer italic">Special Pooja?</span></h2>
               <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-5 font-light">Contact our temple office for personalized rituals, marriage ceremonies, and homams.</p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="/contact" className="px-6 py-5 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-primary/40 hover:-translate-y-1 transition-all shadow-xl text-sm">Contact Us Now</a>
                  <div className="flex items-center gap-4 text-primary font-bold text-sm">
                    <span className="w-12 h-px bg-primary/40" />
                    Or Call: (+91) 891-2760740
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
