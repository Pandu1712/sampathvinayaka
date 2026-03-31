import { useState } from "react";
import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import templeHero1 from "@/assets/temple-hero-1.jpg";
import templeHero2 from "@/assets/temple-hero-2.jpg";
import templeHero3 from "@/assets/temple-hero-3.jpg";
import templeHero4 from "@/assets/temple-hero-4.jpg";
import templeHero5 from "@/assets/temple-hero-5.jpg";
import purohit1 from "@/assets/purohit-1.jpg";
import male1 from "@/assets/member-male-1.png";
import male2 from "@/assets/member-male-2.png";
import male3 from "@/assets/member-male-3.png";

/* ─── Data ─── */
const services = [
  { icon: "🪔", title: "Daily Pooja", desc: "Morning and evening worship rituals performed by temple priests", timing: "6:00 AM & 7:00 PM", price: "Free" },
  { icon: "🔔", title: "Maha Aarti", desc: "Grand evening aarti ceremony with 108 lamps and devotional music", timing: "7:00 PM Daily", price: "Free" },
  { icon: "📿", title: "Archana", desc: "Personalized pooja with recitation of 108 or 1008 sacred names", timing: "On Request", price: "₹101 / ₹251" },
  { icon: "💐", title: "Abhishekam", desc: "Sacred bathing ritual of the deity with milk, honey, and holy water", timing: "6:30 AM Daily", price: "₹501" },
  { icon: "🎋", title: "Homam / Havan", desc: "Sacred fire ritual for prosperity, health, and spiritual growth", timing: "By Appointment", price: "₹1,001" },
  { icon: "🙏", title: "Special Darshan", desc: "VIP darshan with direct access to the sanctum sanctorum", timing: "All Day", price: "₹201" },
  { icon: "🎊", title: "Marriage Ceremony", desc: "Traditional temple wedding conducted by temple priests", timing: "Muhurtam Days", price: "₹5,001" },
  { icon: "📖", title: "Vedic Classes", desc: "Learn ancient scriptures, shlokas, and spiritual practices", timing: "Sat & Sun 8 AM", price: "Free" },
];

const timings = [
  { period: "Daily Opening Hours", time: "6:00 AM – 8:00 PM" },
  { period: "Abhishekam Ritual", time: "6:00 AM – 7:30 AM" },
  { period: "Vehicle Pooja", time: "9:00 AM – 11:00 AM" },
  { period: "Archana Pooja", time: "6:00 PM – 7:00 PM" },
  { period: "Special Festival Pooja", time: "7:00 AM – 12:00 PM" },
  { period: "Vahana Pooja Details", time: "10:00 AM – 1:00 PM" },
];

const milestones = [
  { year: "Early 1960s", title: "Spiritual Foundation", desc: "Built by local devotees in Asilmetta, Visakhapatnam, who envisioned a serene sanctuary for peace and ancient Vedic traditions." },
  { year: "1971 AD", title: "Divine Protection", desc: "During the Indo-Pak war, it is widely believed the temple's divine blessings shielded the Vizag city and its vital coastline." },
  { year: "1980s-90s", title: "Cultural Pillar", desc: "Recognized as a central landmark for students seeking 'hall ticket blessings' and families performing new vehicle puja." },
  { year: "Present", title: "Global Attraction", desc: "A top Visakhapatnam attraction drawing thousands daily for spiritual guidance, safety, and prosperity." },
];

const galleryImages = [
  { src: templeHero1, title: "Temple at Golden Hour", span: "col-span-2 row-span-2" },
  { src: templeHero2, title: "Sacred Lamps", span: "col-span-1 row-span-1" },
  { src: templeHero5, title: "Temple Bell & Lamp", span: "col-span-1 row-span-1" },
  { src: templeHero3, title: "Lotus Pond", span: "col-span-1 row-span-1" },
  { src: templeHero4, title: "Ancient Corridor", span: "col-span-2 row-span-1" },
  { src: templeHero2, title: "Interior Light", span: "col-span-1 row-span-1" },
];

const upcomingEvents = [
  { date: "Apr 14", month: "2025", title: "Vishu / Tamil New Year", time: "5:00 AM – 10:00 PM", desc: "Grand celebration with special Ganapathi pooja, cultural programs, and prasadam distribution.", type: "Festival" },
  { date: "May 12", month: "2025", title: "Akshaya Tritiya", time: "5:30 AM – 8:00 PM", desc: "Auspicious day for new beginnings. Special Lakshmi-Ganapathi pooja and gold offering ceremony.", type: "Auspicious" },
  { date: "Jun 15", month: "2025", title: "Maha Ganapathi Homam", time: "6:00 AM – 2:00 PM", desc: "Grand fire ritual for Lord Ganesha with 1008 chants for prosperity and obstacle removal.", type: "Homam" },
  { date: "Aug 27", month: "2025", title: "Vinayaka Chaturthi", time: "All Day & Night", desc: "Grand celebration of Lord Ganesha's birth with elaborate decorations, special abhishekam, and cultural programs.", type: "Festival" },
  { date: "Sep 22", month: "2025", title: "Navaratri Begins", time: "5:00 AM – 10:00 PM", desc: "Nine nights of worship with daily special alankaram and cultural events at the temple.", type: "Festival" },
];

const weeklySchedule = [
  { day: "Monday – Sunday", deity: "Lord Ganesha", special: "Abhishekam", time: "6:00 AM – 7:30 AM" },
  { day: "Monday – Sunday", deity: "New Vehicles", special: "Vehicle Pooja", time: "9:00 AM – 11:00 AM" },
  { day: "Monday – Sunday", deity: "Lord Ganesha", special: "Archana Pooja", time: "6:00 PM – 7:00 PM" },
  { day: "Daily", deity: "New Vehicles", special: "Vahana Pooja Details", time: "10:00 AM – 1:00 PM" },
  { day: "During Festivals", deity: "Lord Ganesha", special: "Special Festival Pooja", time: "7:00 AM – 12:00 PM" },
];

const Index = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon. 🙏");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* ═══════ HERO ═══════ */}
      <HeroCarousel />

      {/* ═══════ ABOUT / HISTORY ═══════ */}
      <section id="history" className="section-padding px-4 sm:px-4 relative">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">About the Temple</p>
            <h2 className="text-4xl font-bold text-foreground leading-tight font-serif">
              A Sacred Legacy of <span className="gold-shimmer italic">Lord Ganesha</span>
            </h2>
            <div className="h-1 w-20 bg-primary/40 rounded-full my-4" />
            <div className="space-y-3 text-sm text-muted-foreground leading-loose font-sans font-light">
              <p>
                The temple stands in the heart of <strong className="text-foreground font-semibold">Asilmetta, Visakhapatnam</strong>, where thousands visit daily for peace and guidance. 
                Many believe the shrine supports students during exams and brings luck, especially when they come for <strong className="text-primary/80 font-medium">hall ticket blessings</strong> before important tests.
              </p>
              <p>
                You'll often see families arriving with new vehicles for the traditional <strong className="text-foreground font-semibold">vehicle puja in Vizag</strong>, a ritual believed to bring safety and prosperity. 
                The temple remains a top Visakhapatnam attraction, drawing both locals and travelers seeking spiritual comfort.
              </p>
            </div>
            <div className="mt-5 p-5 rounded-2xl glass-dark border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
              <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                <span className="h-px w-4 bg-primary/40" />
                Cultural Importance
              </p>
              <p className="text-white/80 text-sm leading-relaxed font-light italic">
                "As a cultural landmark of Vizag, it becomes a hub of devotion during festivals like <span className="text-primary font-bold">Vinayaka Chavithi</span>. 
                It represents centuries of faith and is considered a protective force for the city."
              </p>
            </div>
          </div>
          <div className="relative animate-fade-in opacity-0 [animation-fill-mode:forwards]">
            <div className="absolute -inset-4 border-2 border-primary/10 rounded-3xl -rotate-3 pointer-events-none" />
            <div className="absolute -inset-4 border-2 border-primary/5 rounded-3xl rotate-2 pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={templeHero2}
                alt="Temple interior with sacred lamps"
                className="w-full h-[400px] sm:h-[500px] lg:h-[650px] object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 p-4 glass rounded-2xl border border-white/20 shadow-2xl animate-fade-rise opacity-0 [animation-fill-mode:forwards] [animation-delay:0.5s]">
                <span className="text-primary text-2xl mb-2 block animate-bounce">🙏</span>
                <span className="text-foreground font-serif font-bold text-sm block leading-tight">Sri Sampath<br />Vinayaka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="container-custom mt-12 sm:mt-16">
          <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Temple History</p>
            <h3 className="text-4xl font-bold text-foreground font-serif">
              Our <span className="gold-shimmer italic">Sacred Journey</span>
            </h3>
            <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>
          <div className="relative border-l-2 border-primary/20 ml-4 sm:ml-8 space-y-6 sm:space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="relative pl-8 sm:pl-16 group animate-fade-rise opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: `${i * 150}ms` }}>
                {/* Dot */}
                <div className="absolute left-0 top-6 -translate-x-[17px] w-8 h-8 rounded-full bg-background border-[4px] border-primary/20 flex items-center justify-center group-hover:border-primary transition-all duration-500 shadow-xl group-hover:scale-110">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary group-hover:scale-[1.3] transition-transform duration-500" />
                </div>
                
                {/* Content Card */}
                <div className="glass p-5 sm:p-5 rounded-[2.5rem] border border-white/40 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
                  
                  <div className="inline-flex px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-black tracking-widest uppercase mb-6 border border-primary/20 shadow-inner">
                    {m.year}
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-4 font-serif group-hover:text-primary transition-colors duration-500">{m.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="section-padding px-4 sm:px-4 bg-primary/[0.02] relative">
        <div className="container-custom text-left relative z-10">
          <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Our Services</p>
          <h2 className="text-4xl font-bold text-foreground font-serif">
            Sacred <span className="gold-shimmer italic">Offerings</span>
          </h2>
          <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 mb-4 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="text-muted-foreground max-w-2xl text-sm font-light leading-relaxed">
            Experience divine rituals and ceremonies that connect your soul to Lord Ganesha's celestial grace.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {services.map((s, i) => (
              <div 
                key={i} 
                className="premium-card p-5 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-2"
              >
                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-4xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                  {s.icon}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-3 font-serif group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 leading-relaxed font-light">{s.desc}</p>
                <div className="mt-6 pt-6 border-t border-primary/10 w-full">
                  <div className="flex flex-col gap-2">
                    <span className="text-primary text-sm font-bold tracking-widest uppercase">Timing</span>
                    <span className="text-foreground font-semibold text-sm">{s.timing}</span>
                    <div className="mt-2 text-primary font-black text-sm">{s.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TIMINGS ═══════ */}
      <section className="section-padding px-4 sm:px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="order-2 lg:order-1 animate-fade-in opacity-0 [animation-fill-mode:forwards]">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={templeHero4}
                alt="Temple corridor"
                className="w-full h-[400px] sm:h-[550px] object-cover transition-transform duration-[5s] group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
          <div className="order-1 lg:order-2 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Temple Timings</p>
            <h2 className="text-4xl font-bold text-foreground leading-tight font-serif">
              Plan Your <span className="gold-shimmer italic">Visit</span>
            </h2>
            <div className="h-1 w-20 bg-primary/40 rounded-full my-4" />
            <div className="space-y-4">
              {timings.map((t, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-center p-5 rounded-2xl glass border border-white/40 hover:border-primary/20 hover:scale-[1.02] transition-all duration-300 group shadow-sm hover:shadow-lg"
                >
                  <span className="text-foreground text-sm font-bold font-serif group-hover:text-primary transition-colors">{t.period}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-primary/20 group-hover:w-12 transition-all" />
                    <span className="text-primary text-sm font-black tracking-tight">{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <section id="gallery" className="section-padding px-4 sm:px-4 bg-primary/[0.01]">
        <div className="container-custom">
          <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Visual Journey</p>
            <h2 className="text-4xl font-bold text-foreground font-serif">
              Temple <span className="gold-shimmer italic">Gallery</span>
            </h2>
            <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] sm:auto-rows-[300px]">
            {galleryImages.map((img, i) => (
              <div 
                key={i} 
                className={`${img.span} relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Sacred Architecture</span>
                    <h4 className="text-white text-sm font-bold font-serif shadow-sm">{img.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EVENTS ═══════ */}
      <section id="events" className="section-padding px-4 sm:px-4">
        <div className="container-custom">
          <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Sacred Calendar</p>
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
                    <span className="text-sm font-black uppercase tracking-[0.3em] opacity-80">Timing</span>
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

          {/* Weekly Schedule */}
          <div className="mt-10 sm:mt-14">
            <h3 className="text-left text-2xl font-bold text-foreground font-serif mb-5 sm:mb-14">
              Weekly <span className="text-primary">Schedule</span>
            </h3>
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Ritual / Category</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Days</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Specific Ritual</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((s, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-foreground">{s.deity}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{s.day}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{s.special}</td>
                      <td className="py-4 px-4 text-sm text-primary font-semibold">{s.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
              {weeklySchedule.map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-primary font-bold">{s.special}</h4>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{s.day}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-0.5">Category</p>
                      <p className="text-foreground font-medium">{s.deity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-0.5">Time</p>
                      <p className="text-foreground font-medium">{s.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Members Preview ═══════ */}
      <section id="members" className="section-padding px-4 sm:px-4 bg-primary/[0.02] relative">
        <div className="container-custom relative z-10">
          <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">🙏 Our Team</p>
            <h2 className="text-4xl font-bold text-foreground font-serif">
              Temple <span className="gold-shimmer italic">Members</span>
            </h2>
            <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 mb-4 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            <p className="text-muted-foreground max-w-2xl text-sm font-light leading-relaxed">
              Meet the devoted purohits, committee members, and volunteers who serve our temple with unconditional devotion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Pandit Vishwanath Sharma", role: "Head Purohit", img: purohit1 },
              { name: "Sri Ramachandra Sharma", role: "President", img: male1 },
              { name: "Sri Venkatesh Murthy", role: "Vice President", img: male2 },
              { name: "Sri Narayana Bhat", role: "Secretary", img: male3 },
            ].map((m) => (
              <div key={m.name} className="premium-card group hover:-translate-y-3">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                    <span className="text-primary text-sm tracking-[0.3em] font-bold uppercase mb-2">Sacred Service</span>
                    <h4 className="text-white text-sm font-bold font-serif">{m.name}</h4>
                  </div>
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm font-bold text-primary uppercase tracking-widest border border-white/20">
                    {m.role}
                  </div>
                </div>
                <div className="p-4 text-center bg-white">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors font-serif">{m.name}</h3>
                  <div className="h-0.5 w-8 bg-primary/20 mx-auto my-3 group-hover:w-16 transition-all" />
                  <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-bold">{m.role}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-left mt-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards] [animation-delay:0.5s]">
            <a href="/members" className="group relative inline-flex items-center gap-3 px-5 py-5 rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all overflow-hidden">
              <span className="relative z-10">View All Members</span>
              <span className="relative z-10 text-sm group-hover:translate-x-1 transition-transform">→</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="section-padding px-4 sm:px-4 relative">
        <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none" />
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Get in Touch</p>
            <h2 className="text-4xl font-bold text-foreground font-serif">
              Contact <span className="gold-shimmer italic">Us</span>
            </h2>
            <div className="h-1 w-20 bg-primary/40 rounded-full my-4" />
            <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-lg mb-5">
              Have questions about services, events, or wish to make a special prayer request? We'd love to hear from you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "📍", label: "Address", value: "Asilmetta, Visakhapatnam, Andhra Pradesh 530020" },
                { icon: "📞", label: "General", value: "(+91) 891-2755650 / 2760740" },
                { icon: "🆘", label: "Helpline", value: "+91 97044 38668" },
                { icon: "🕐", label: "Timings", value: "Daily: 6:00 AM – 8:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm text-primary font-bold uppercase tracking-widest mb-1">{item.label}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:0.3s]">
            <form onSubmit={handleSubmit} className="glass p-5 sm:p-6 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      placeholder="Devotee name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="How can we assist you?"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    Deep Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                    placeholder="Describe your prayer or inquiry here..."
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full py-5 rounded-2xl text-sm font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all overflow-hidden"
                >
                  <span className="relative z-10">Send Sacred Request 🙏</span>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="section-padding px-4 sm:px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-right scale-110" />
        <div className="container-custom text-left relative z-10">
          <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-6 font-black">🙏 Seek Blessings</p>
            <h2 className="text-4xl font-bold text-foreground font-serif leading-tight">
              Begin Your <span className="gold-shimmer italic">Spiritual Journey</span>
            </h2>
            <div className="h-1 w-24 bg-primary/40 rounded-full mt-4 mb-5 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            <p className="text-muted-foreground max-w-2xl text-sm font-light leading-relaxed">
              Step into the divine presence of Lord Ganesha. The temple doors are always open for you to find peace and prosperity.
            </p>
            <div className="mt-6 animate-pulse">
              <p className="text-primary text-2xl font-serif italic font-bold tracking-wider">
                Om Gam Ganapataye Namaha 🙏
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
