import Layout from "@/components/Layout";
import templeHero1 from "@/assets/temple-hero-1.jpg";
import templeHero4 from "@/assets/temple-hero-4.jpg";

const milestones = [
  { year: "Early 1960s", title: "Humble Beginnings", desc: "Built by local devotees in Asilmetta, Visakhapatnam, who envisioned a serene sanctuary for peace and ancient Vedic traditions in the growing city." },
  { year: "1971 AD", title: "The Protector of Vizag", desc: "During the Indo-Pak war, it is widely believed the temple's divine blessings shielded Visakhapatnam and its vital coastline from naval threats." },
  { year: "1980s-90s", title: "A Student's Beacon", desc: "Became famous as the 'Hall Ticket Ganesha', where thousands of students seek blessings for academic success and clarity before exams." },
  { year: "Present Day", title: "Vibrant Tradition", desc: "A thriving spiritual hub in Asilmetta, attracting thousands daily and standing as a testament to Vizag's deep-rooted faith." },
];

const History = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src={templeHero1} 
          alt="Temple exterior" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-ken-burns scale-110" 
          width={1920} 
          height={1080} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="relative z-10 text-center px-4">
          <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold drop-shadow-lg">Our Sacred Legacy</p>
            <h1 className="hero-title !font-serif !italic drop-shadow-2xl">Temple History</h1>
            <div className="h-1 w-24 bg-primary/60 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding px-4 bg-transparent relative">
        <div className="container-custom max-w-5xl mx-auto relative">
          <div className="absolute left-[31px] sm:left-[47px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/5 via-primary/40 to-primary/5" />
          
          <div className="space-y-10 relative">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 items-start group animate-fade-rise" style={{ animationDelay: `${i * 150}ms`, opacity: 0, animationFillMode: "forwards" }}>
                <div className="flex-shrink-0 w-16 sm:w-24 text-right pt-2">
                  <span className="text-primary font-black text-sm tracking-tighter opacity-50 group-hover:opacity-100 transition-all duration-500">{m.year}</span>
                </div>
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass border border-primary/30 flex items-center justify-center shadow-xl group-hover:scale-125 group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:rotate-[360deg]">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary group-hover:bg-white shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
                  </div>
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-4 font-serif group-hover:text-primary transition-colors leading-tight">{m.title}</h3>
                  <div className="p-5 rounded-3xl glass-dark border border-white/10 group-hover:border-primary/20 transition-all duration-500 shadow-lg group-hover:shadow-primary/5">
                    <p className="text-white/80 text-sm leading-relaxed font-light">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section-padding px-4 bg-primary/[0.02] relative translate-y-0">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border-2 border-primary/10 rounded-[2.5rem] -rotate-3 transition-transform group-hover:rotate-0 duration-700" />
            <div className="absolute -inset-4 border-2 border-primary/5 rounded-[2.5rem] rotate-2 transition-transform group-hover:rotate-0 duration-700" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src={templeHero4} 
                alt="Temple pillars" 
                className="w-full h-[400px] sm:h-[600px] object-cover transition-transform duration-[5s] group-hover:scale-110" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-overlay" />
            </div>
          </div>
          
          <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Divine Architecture</p>
            <h2 className="text-4xl font-bold text-foreground font-serif leading-tight">
              Dravidian <span className="gold-shimmer italic">Masterpiece</span>
            </h2>
            <div className="h-1 w-20 bg-primary/40 rounded-full my-4" />
            <div className="space-y-4 text-sm text-muted-foreground font-light leading-relaxed">
              <p>
                The temple showcases the finest Dravidian architecture with its towering gopuram rising <strong className="text-foreground font-bold">65 feet</strong>, 
                adorned with hundreds of sculpted deities and celestial beings that tell a silent story of divine craftsmanship.
              </p>
              <p>
                The mandapam features <strong className="text-foreground font-bold">96 intricately carved stone pillars</strong>, each telling a unique story from Hindu mythology. 
                The sanctum is designed to channel natural light during specific times of the year, creating a divine spectacle that awes every devotee.
              </p>
              <div className="premium-card p-5 border-l-4 border-l-primary bg-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-all" />
                <p className="text-primary text-sm font-serif italic font-bold mb-3">"A spiritual comfort in a calm and welcoming space. The vibrations here are truly transformative."</p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-primary/40" />
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-bold">Devotee Feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Guide */}
      <section className="section-padding px-4">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Visitor Guide</p>
            <h2 className="text-4xl font-bold text-foreground font-serif">
              Plan Your <span className="gold-shimmer italic">Journey</span>
            </h2>
            <div className="gold-divider max-w-[200px] mx-auto mt-4 opacity-60" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Travel Tips */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground font-serif flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shadow-inner">💡</span> 
                Travel Wisely
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Best Time to Visit", desc: "Visit early morning (6:00 AM) to avoid crowds and witness the peaceful morning rituals in their full glory." },
                  { title: "Dress Code", desc: "Dress modestly and follow the temple dress code, respecting ancient customs and traditional vibes." },
                  { title: "Photography", desc: "Photography is generally not allowed inside the sanctum sanctorum. Please respect the sanctity of the shrine." },
                ].map((tip, i) => (
                  <div key={i} className="premium-card p-4 border border-primary/10 hover:border-primary transition-all duration-500 group">
                    <h4 className="font-bold text-foreground text-sm mb-2 font-serif group-hover:text-primary transition-colors">{tip.title}</h4>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground font-serif flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shadow-inner">🏖️</span> 
                Nearby Wonders
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Kailasagiri", desc: "Scenic hill park with panoramic city views and ropeway." },
                  { name: "RK Beach", desc: "Famous beach for evening strolls and spiritual sunsets." },
                  { name: "INS Kursura", desc: "Submarine museum showcasing India's rich naval history." },
                  { name: "Dolphin's Nose", desc: "Breathtaking coastal views and a historic lighthouse." },
                ].map((place, i) => (
                  <div key={i} className="premium-card p-4 border border-primary/5 hover:border-primary/40 transition-all duration-500 group">
                    <h4 className="font-bold text-primary text-sm mb-2 font-serif group-hover:scale-105 transition-transform origin-left">{place.name}</h4>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">{place.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default History;
