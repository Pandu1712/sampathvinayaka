import Layout from "@/components/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookOpen, ArrowRight, Calendar as CalendarIcon, FileText, Sparkles } from "lucide-react";
import TenderSection from "@/components/TenderSection";

const upcomingEvents = [
  { date: "Jan 01", month: "2026", title: "New Year's Day", time: "6:00 AM – 8:00 PM", desc: "Start the new year with divine blessings. Special prayers, archana, and aarti performed throughout the day.", type: "Auspicious" },
  { date: "Jan 14", month: "2026", title: "Makar Sankranti", time: "5:00 AM – 9:00 PM", desc: "Auspicious harvest festival celebrated with special abhishekam for Lord Ganesha and distribution of sweet pongal prasadam.", type: "Festival" },
  { date: "Mar 19", month: "2026", title: "Ugadi (Telugu New Year)", time: "5:00 AM – 10:00 PM", desc: "Welcoming the Telugu New Year with Panchanga Sravanam (recitation of the new almanac) and distribution of traditional Ugadi Pacchadi.", type: "Festival" },
  { date: "Sep 14", month: "2026", title: "Vinayaka Chavithi", time: "All Day & Night", desc: "The grandest festival of the temple! Magnificent floral decorations, special Maha Abhishekam, continuous Pujas, and cultural events.", type: "Festival" },
  { date: "Oct 20", month: "2026", title: "Vijayadashami", time: "5:00 AM – 10:00 PM", desc: "Celebrating the victory of good over evil. Special Shami Pooja and Ganesha blessings for success in new ventures.", type: "Festival" },
  { date: "Nov 08", month: "2026", title: "Diwali", time: "5:30 AM – 9:30 PM", desc: "Festival of Lights celebrated with 1008 oil lamps (Deepalankarana) surrounding the temple and special evening Lakshmi-Ganapathi pooja.", type: "Festival" },
];

const weeklySchedule = [
  { day: "Monday – Sunday", deity: "Lord Ganesha", special: "Homam / Havan", time: "5:00 AM – 6:30 AM" },
  { day: "Monday – Sunday", deity: "Lord Ganesha", special: "Abhishekam", time: "7:00 AM – 8:30 AM" },
  { day: "Monday – Sunday", deity: "Lord Ganesha", special: "Sarva Darshanam", time: "6:00 AM – 11:00 AM & 5:30 PM – 8:00 PM" },
  { day: "Monday – Sunday", deity: "New Vehicles", special: "Vehicle Pooja", time: "6:30 AM – 10:30 AM & 4:30 PM – 8:00 PM" },
  { day: "During Ganesha Navaratri", deity: "Lord Ganesha", special: "Special Abhishekam", time: "7:00 AM – 12:00 PM" },
];

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "tenders" ? "tenders" : "events";
  const [activeTab, setActiveTab] = useState<"events" | "tenders">(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "tenders") {
      setActiveTab("tenders");
    } else if (window.location.hash === "#tenders") {
      setActiveTab("tenders");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "events" | "tenders") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 relative overflow-hidden text-center bg-gradient-to-b from-[#1C1917] to-background border-b border-primary/15 animate-fade-rise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(38,72%,50%,0.05)_0,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 px-4">
          <p className="text-primary text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-black">🙏 Sacred Calendar & Notices</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-wide leading-tight">
            Events, Festivals & Tenders
          </h1>
          <div className="h-1 w-24 bg-primary/40 rounded-full mx-auto mt-4 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="text-stone-300 mt-4 max-w-xl mx-auto text-xs sm:text-sm font-serif italic">
            Participate in auspicious celebrations, annual festivals & view official temple tender notifications
          </p>

          {/* Tab Switcher Pills */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-black/60 border border-primary/30 backdrop-blur-md shadow-2xl">
            <button
              onClick={() => handleTabChange("events")}
              className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-serif font-black tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === "events"
                  ? "bg-primary text-primary-foreground shadow-lg scale-102"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <CalendarIcon size={16} />
              <span>Temple Events & Calendar</span>
            </button>
            <button
              onClick={() => handleTabChange("tenders")}
              className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-serif font-black tracking-wider transition-all duration-300 flex items-center gap-2 relative ${
                activeTab === "tenders"
                  ? "bg-primary text-primary-foreground shadow-lg scale-102"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <FileText size={16} />
              <span>e-Procurement Tenders</span>
              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black uppercase tracking-wider animate-pulse hidden sm:inline-block">
                New
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── TAB: TENDERS ─── */}
      {activeTab === "tenders" && (
        <section id="tenders" className="section-padding px-4 bg-transparent relative overflow-hidden">
          <div className="container-custom relative z-10">
            <TenderSection />
          </div>
        </section>
      )}

      {/* ─── TAB: EVENTS ─── */}
      {activeTab === "events" && (
        <>
          {/* Quick Notice Banner pointing to Tenders */}
          <section className="px-4 pt-8 pb-0 max-w-5xl mx-auto">
            <div 
              onClick={() => handleTabChange("tenders")}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-red-500/10 to-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:border-amber-500/60 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <Sparkles className="text-amber-400 animate-pulse" size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black tracking-widest text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      ⚡ Tender Notice (05-09-2026)
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold hidden sm:inline">
                      Rc. No. 16(2)/2026
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground font-serif mt-0.5 group-hover:text-primary transition-colors">
                    e-Procurement Tender Schedules Open Tomorrow: 06-09-2026 (10:00 AM)
                  </h4>
                  <p className="text-xs text-muted-foreground font-light">
                    Supply of Paditharam, Prasadam & Annaprasadam provisions for 7 months | Portal: <strong className="text-primary">e.www.ap.eprocurement.gov.in</strong>
                  </p>
                </div>
              </div>

              <button className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider font-serif shrink-0 flex items-center gap-1.5 transition-all">
                <span>View Tender Option</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="section-padding px-4 bg-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container-custom relative z-10 w-full">
              <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
                <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Divine Celebrations</p>
                <h2 className="text-4xl font-bold text-foreground font-serif">
                  Temple <span className="gold-shimmer italic">Events</span>
                </h2>
                <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
              </div>

              <div className="flex flex-col gap-4 w-full relative">
                <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 hidden md:block" />
                
                {upcomingEvents.map((e, i) => (
                  <div 
                    key={i} 
                    className="relative glass overflow-hidden flex flex-col md:flex-row gap-4 p-4 sm:p-5 rounded-3xl sm:rounded-[2.5rem] items-center md:items-stretch group cursor-pointer border border-white/40 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-md animate-fade-rise opacity-0 [animation-fill-mode:forwards]"
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

          {/* Event Book Callout Banner */}
          <section className="py-12 px-4 bg-[#1C0505] border-y border-amber-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(38,72%,50%,0.05)_0,transparent_75%)] pointer-events-none" />
            <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl border border-amber-500/35 bg-[#1C0505]/95 shadow-xl">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
                  <BookOpen className="text-amber-500 animate-pulse" size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-bold">Temple Publication</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">Sampath Book - 2026 Souvenir</h3>
                  <p className="text-stone-300/80 text-xs sm:text-sm max-w-xl font-light">
                    Discover the detailed chronicles of temple history, daily puja descriptions, and Ganesha Chaturthi celebrations.
                  </p>
                </div>
              </div>
              <Link
                to="/sampath-book-2026"
                className="w-full md:w-auto px-6 py-3 rounded-full text-stone-950 font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 shadow-md hover:shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-2 shrink-0 border border-amber-400/20"
              >
                <span>Read Souvenir Book</span>
                <ArrowRight size={14} />
              </Link>
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

              <div className="glass rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-white/40 shadow-2xl">
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
        </>
      )}
    </Layout>
  );
};

export default Events;

