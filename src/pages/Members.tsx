import Layout from "@/components/Layout";
import prasadRao from "@/assets/prasad-rao.jpg";

const membersList = [
  {
    name: "D. V. V. Prasad Rao",
    role: "Assistant Commissioner & Executive Officer",
    desc: "Overseeing the temple administration, strategic governance, and major spiritual development initiatives in coordination with the Endowments Department.",
    img: prasadRao,
    category: "Administration"
  },
  {
    name: "Sri T. R. Cholan",
    role: "Founder Family Member",
    desc: "Upholding and preserving the sacred legacy, traditions, and spiritual heritage established by the founding family since the temple's inception in 1962.",
    img: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087514/DSC_5404_osvkzt.jpg",
    category: "Founder Family"
  },
  {
    name: "Pandit P. Mohan Swamy",
    role: "Mukya Archaka",
    desc: "Chief Priest leading the sacred daily rituals, special alankarams, and performing divine archana, homam, and vehicle poojas for the devotees.",
    img: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086840/DSC_5466_qteecl.jpg",
    category: "Spiritual Services"
  }
];

const Members = () => (
  <Layout>
    <div className="pt-24 sm:pt-28 min-h-screen bg-gradient-to-b from-background via-amber-50/[0.02] to-background">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-black">🙏 Devoted Service</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-serif leading-tight">
            Temple <span className="gold-shimmer italic">Members</span>
          </h1>
          <div className="h-1 w-24 bg-primary/40 rounded-full mx-auto mt-6 mb-4 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Meet the administration, founding family, and spiritual leadership who serve Sri Sampath Vinayagar Temple with utmost devotion.
          </p>
        </div>
      </section>

      {/* Members Grid Section */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membersList.map((m, idx) => (
            <div 
              key={m.name} 
              className="premium-card group hover:-translate-y-3 transition-all duration-500 flex flex-col justify-between h-full bg-white border border-border/65 rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl relative"
            >
              <div>
                {/* Image Wrap */}
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                  <img 
                    src={m.img} 
                    alt={m.name} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
                  />
                  {/* Premium gold overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <span className="text-primary text-xs tracking-[0.3em] font-bold uppercase mb-2">Sri Sampath Vinayaka Temple</span>
                    <h4 className="text-white text-base font-bold font-serif">{m.name}</h4>
                  </div>
                </div>

                {/* Metadata & Description */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-widest border border-primary/20">
                      {m.category}
                    </span>
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase text-primary font-black block mb-2">{m.role}</span>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors font-serif mb-4 leading-tight">
                    {m.name}
                  </h3>
                  <div className="h-px w-12 bg-primary/20 my-3 group-hover:w-20 transition-all duration-500" />
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer Accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50 group-hover:via-primary transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Quote / Seva Message */}
      <section className="py-12 sm:py-16 px-4 text-center max-w-4xl mx-auto">
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-primary/[0.02] border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <p className="text-primary text-2xl font-serif italic font-bold tracking-wider mb-4">
            \"Kayena Vacha Manasendriyairva Budhyatmanava Prakriteh Swabhavat\"
          </p>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Serving the divine and the devotees with body, mind, speech, and soul. Every endeavor is dedicated to the ultimate glory of Lord Vinayaka.
          </p>
        </div>
      </section>
    </div>
  </Layout>
);

export default Members;
