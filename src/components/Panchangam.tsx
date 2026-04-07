import React, { useState, useEffect } from 'react';
import { Sun, Moon, Info, Calendar as CalendarIcon } from 'lucide-react';

const Panchangam = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDay = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const teluguDays = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
    return { en: days[date.getDay()], te: teluguDays[date.getDay()] };
  };

  // Fixed Data for 2026-04-07 (Visakhapatnam, Prokerala)
  const getPanchangDetails = () => {
    return {
      masam: { en: 'Chaitra Masam', te: 'చైత్ర మాసం' },
      paksha: { en: 'Krishna Paksha', te: 'కృష్ణ పక్షం' },
      tithi: { en: 'Panchami (Until 04:34 PM)', te: 'పంచమి (సాయంత్రం 04:34 వరకు)' },
      nakshatra: { en: 'Jyeshta', te: 'జ్యేష్ఠ' },
      yoga: { en: 'Vyatipata (Until 04:16 PM)', te: 'వ్యతీపాత (సాయంత్రం 04:16 వరకు)' },
      karana: { en: 'Taitila (Until 04:35 PM)', te: 'తైతుల (సాయంత్రం 04:35 వరకు)' },
      sunrise: "05:50 AM",
      sunset: "06:07 PM",
      rahuKalam: "03:03 PM – 04:35 PM",
      yamagandam: "08:55 AM – 10:27 AM",
      gulika: "11:59 AM – 01:31 PM"
    };
  };

  const details = getPanchangDetails();
  const day = formatDay(date);

  return (
    <section id="panchangam" className="section-padding bg-gradient-to-b from-white to-primary/5 py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="container-custom relative z-10 px-4">
        <div className="text-center mb-12 animate-fade-rise">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Daily Panchangam</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground font-serif leading-tight">
            Sacred <span className="gold-shimmer italic">Daily Almanac</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Display */}
          <div className="lg:col-span-2 glass rounded-[2.5rem] p-8 sm:p-12 border border-white/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sun className="w-32 h-32 text-primary animate-spin-slow" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-primary/10">
                <div>
                  <h3 className="text-xl font-bold text-primary font-serif mb-1">{formatDate(date)}</h3>
                  <div className="text-muted-foreground tracking-widest uppercase text-sm font-bold flex items-center gap-2">
                    {day.en} <span className="w-1 h-1 bg-primary/40 rounded-full" /> {day.te}
                  </div>
                </div>
                <div className="px-6 py-3 bg-primary/10 rounded-2xl border border-primary/20 flex items-center gap-3">
                  <Moon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-primary">{details.masam.en} / {details.masam.te}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Tithi */}
                  <div className="p-6 rounded-3xl bg-primary/[0.03] border border-primary/10 hover:bg-white/50 transition-colors group/item">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-[10px]">T</div>
                       Tithi / తిథి
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-bold text-foreground font-serif">{details.tithi.en}</span>
                      <span className="text-sm text-primary font-serif font-bold">{details.tithi.te}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{details.paksha.en} ({details.paksha.te})</span>
                    </div>
                  </div>

                  {/* Nakshatra */}
                  <div className="p-6 rounded-3xl bg-primary/[0.03] border border-primary/10 hover:bg-white/50 transition-colors group/item">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-[10px]">N</div>
                       Nakshatra / నక్షత్రం
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-bold text-foreground font-serif">{details.nakshatra.en}</span>
                      <span className="text-sm text-primary font-serif font-bold">{details.nakshatra.te}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary/5 space-y-8">
                   {/* Yoga & Karana */}
                   <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Yoga / యోగం</p>
                        <p className="text-sm font-bold text-foreground">{details.yoga.en}</p>
                        <p className="text-xs text-primary font-serif">{details.yoga.te}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Karana / కరణం</p>
                        <p className="text-sm font-bold text-foreground">{details.karana.en}</p>
                        <p className="text-xs text-primary font-serif">{details.karana.te}</p>
                      </div>
                   </div>

                  <div className="space-y-6 pt-6 border-t border-primary/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        <span className="text-sm font-medium text-muted-foreground">Sunrise / సూర్యోదయం</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{details.sunrise}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                        <span className="text-sm font-medium text-muted-foreground">Sunset / సూర్యాస్తమయం</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{details.sunset}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timings Highlight */}
          <div className="glass rounded-[2.5rem] p-8 border border-white/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                   <Info className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-primary font-serif">Auspicious Timings</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Rahu Kalam', value: details.rahuKalam, sub: 'రాహు కాలం', color: 'bg-red-50 text-red-600' },
                  { label: 'Yamagandam', value: details.yamagandam, sub: 'యమగండం', color: 'bg-amber-50 text-amber-600' },
                  { label: 'Gulika Kalam', value: details.gulika, sub: 'గుళిక కాలం', color: 'bg-emerald-50 text-emerald-600' }
                ].map((item, idx) => (
                  <div key={idx} className="group/time">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                         <p className="text-sm font-bold text-foreground">{item.label}</p>
                         <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-60">{item.sub}</p>
                       </div>
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase ${item.color}`}>Daily</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground p-3 rounded-xl bg-muted/30 border border-muted group-hover/time:border-primary/20 group-hover/time:bg-white transition-all">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-primary/5 text-center px-4">
              <p className="text-[10px] text-muted-foreground/60 italic leading-relaxed">
                * Accurate calculations for Visakhapatnam region (Prokerala Reference).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Panchangam;
