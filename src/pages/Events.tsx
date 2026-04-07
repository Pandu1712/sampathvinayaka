import Layout from "@/components/Layout";
import ganeshaImage from "/logo.png";

const upcomingEvents = [
  { date: "Sep 14", month: "2026", title: "Vinayaka Chavithi", time: "All Day", desc: "The grandest festival of the year! Celebrated with exquisite decorations, special poojas, and community prayers for prosperity.", type: "Festival" },
  { date: "Oct 11", month: "2026", title: "Ganesha Navaratri", time: "5:00 AM – 10:00 PM", desc: "Nine nights of traditional rituals, music, and festive spiritual practices highlighting various forms of Ganesha.", type: "Festival" },
  { date: "Sep 04", month: "2027", title: "Vinayaka Chavithi", time: "All Day & Night", desc: "Witness grand decorations and special poojas that attract thousands of devotees from across the city.", type: "Festival" },
  { date: "Sep 30", month: "2027", title: "Ganesha Navaratri", time: "5:00 AM – 10:00 PM", desc: "Nine nights of sacred celebrations and community spiritual gatherings.", type: "Festival" },
  { date: "Ongoing", month: "Daily", title: "Hall Ticket Blessings", time: "6:00 AM – 8:00 PM", desc: "Special guidance and blessings for students during exam seasons before their important tests.", type: "Devotion" },
];

const weeklySchedule = [
  { day: "Monday – Sunday", deity: "Lord Ganesha", special: "Abhishekam", time: "6:00 AM – 7:30 AM" },
  { day: "Monday – Sunday", deity: "New Vehicles", special: "Vehicle Pooja", time: "9:00 AM – 11:00 AM" },
  { day: "Monday – Sunday", deity: "Lord Ganesha", special: "Archana Pooja", time: "6:00 PM – 7:00 PM" },
  { day: "Daily", deity: "New Vehicles", special: "Vahana Pooja Details", time: "10:00 AM – 1:00 PM" },
  { day: "During Festivals", deity: "Lord Ganesha", special: "Special Festival Pooja", time: "7:00 AM - 1:00 PM" },
];

const Events = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src={ganeshaImage} 
          alt="Temple festival" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-ken-burns scale-110" 
          width={1920} 
          height={1080} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        <div className="relative z-10 container-custom">
          <div className="text-left animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold drop-shadow-lg">Sacred Calendar</p>
            <h1 className="hero-title !font-serif !italic drop-shadow-2xl">Events & Festivals</h1>
            <div className="h-1 w-24 bg-primary/60 mt-4 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding px-4 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10 w-full">
          <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Divine Celebrations</p>
            <h2 className="text-4xl font-bold text-foreground font-serif">
              Upcoming <span className="gold-shimmer italic">Events</span>
            </h2>
            <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>

          <div className="flex flex-col gap-4 w-full relative">
            <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 hidden md:block" />
            
            {upcomingEvents.map((e, i) => (
              <div 
                key={i} 
                className="relative glass overflow-hidden flex flex-col md:flex-row gap-4 p-5 sm:p-5 rounded-[2.5rem] items-center md:items-stretch group cursor-pointer border border-white/40 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-md animate-fade-rise opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/15 transition-colors duration-700 pointer-events-none" />
                
                <div className="flex-shrink-0 w-36 flex flex-col items-center justify-center bg-background rounded-3xl p-4 border-4 border-primary/10 group-hover:border-primary transition-all duration-500 shadow-inner relative z-10 group-hover:scale-105">
                  <div className="text-4xl font-black text-primary transition-colors leading-none drop-shadow-sm">{e.date.split(' ')[1]}</div>
                  <div className="text-sm font-bold text-primary/80 uppercase tracking-[0.2em] mt-3">{e.date.split(' ')[0]}</div>
                  <div className="text-sm font-black text-primary/50 mt-1">{e.month}</div>
                </div>
                
                <div className="flex-1 text-center md:text-left py-2 relative z-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-5">
                    <h3 className="text-2xl font-bold text-foreground font-serif group-hover:text-primary transition-colors duration-500">{e.title}</h3>
                    <span className="text-sm px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black border border-primary/20 uppercase tracking-[0.2em] shadow-sm">{e.type}</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-4xl">{e.desc}</p>
                </div>
                
                <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-white/40 rounded-3xl border border-white/60 min-w-[220px] shadow-sm group-hover:shadow-md transition-shadow relative z-10 backdrop-blur-sm self-center md:self-stretch">
                  <div className="text-primary mb-3 flex items-center gap-2">
                    <div className="h-px w-4 bg-primary/40" />
                    <span className="text-sm font-black uppercase tracking-[0.3em] opacity-80">Divine Timing</span>
                    <div className="h-px w-4 bg-primary/40" />
                  </div>
                  <div className="text-foreground font-black text-sm flex items-center gap-3">
                    <span className="text-primary text-2xl group-hover:scale-125 transition-transform duration-500">🕐</span>
                    {e.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="section-padding px-4 bg-primary/[0.02] relative">
        <div className="container-custom">
          <div className="text-left mb-8">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Sacred Daily Rhythms</p>
            <h2 className="text-4xl font-bold text-foreground font-serif">
              Weekly <span className="gold-shimmer italic">Schedule</span>
            </h2>
            <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>

          <div className="glass rounded-[2.5rem] overflow-hidden border border-white/40 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/5 border-b border-primary/10">
                    <th className="py-5 px-5 text-left text-sm font-bold text-primary uppercase tracking-[0.2em]">Ritual Day</th>
                    <th className="py-5 px-5 text-left text-sm font-bold text-primary uppercase tracking-[0.2em]">Presiding Deity</th>
                    <th className="py-5 px-5 text-left text-sm font-bold text-primary uppercase tracking-[0.2em]">Sacred Practice</th>
                    <th className="py-5 px-5 text-left text-sm font-bold text-primary uppercase tracking-[0.2em]">Auspicious Time</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((s, i) => (
                    <tr key={i} className="border-b border-primary/5 hover:bg-white/60 transition-all duration-300 group">
                      <td className="py-5 px-5">
                        <span className="text-foreground font-bold text-sm font-serif group-hover:text-primary transition-colors">{s.day}</span>
                      </td>
                      <td className="py-5 px-5">
                        <span className="text-muted-foreground font-light text-sm">{s.deity}</span>
                      </td>
                      <td className="py-5 px-5">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-all" />
                          <span className="text-foreground font-medium text-sm">{s.special}</span>
                        </div>
                      </td>
                      <td className="py-5 px-5">
                        <span className="text-primary font-black text-sm tracking-tight">{s.time}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
