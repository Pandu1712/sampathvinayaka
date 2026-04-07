import React, { useState } from 'react';
import { Sparkles, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';

const FestivalList = () => {
  const [activeYear, setActiveYear] = useState('2026');

  const festivals2026 = [
    { month: 'January', events: [
      { name: "New Year's Day", date: 'Jan 1', type: 'Common' },
      { name: 'Makar Sankranti / Pongal', date: 'Jan 14', type: 'Harvest' },
      { name: 'Basant Panchami', date: 'Jan 23', type: 'Devotional' },
    ]},
    { month: 'March', events: [
      { name: 'Ugadi (Vishwavasu Nama Samvatsaram)', date: 'Mar 19', type: 'New Year' },
      { name: 'Sri Rama Navami', date: 'Mar 26', type: 'Grand' },
    ]},
    { month: 'August', events: [
      { name: 'Raksha Bandhan', date: 'Aug 28', type: 'Cultural' },
    ]},
    { month: 'September', events: [
      { name: 'Ganesh Chaturthi', date: 'Sep 14', type: 'Supreme' },
    ]},
    { month: 'October', events: [
      { name: 'Dussehra (Vijayadashami)', date: 'Oct 20', type: 'Grand' },
    ]},
    { month: 'November', events: [
      { name: 'Diwali (Deepavali)', date: 'Nov 8', type: 'Grand' },
    ]},
  ];

  const festivals2027 = [
    { month: 'January', events: [
      { name: 'Makar Sankranti / Pongal', date: 'Jan 14', type: 'Harvest' },
    ]},
    { month: 'March', events: [
      { name: 'Maha Shivaratri', date: 'Mar 6', type: 'Grand' },
      { name: 'Holi', date: 'Mar 23', type: 'Festival' },
    ]},
    { month: 'April', events: [
      { name: 'Ugadi (Parabhava Nama Samvatsaram)', date: 'Apr 7', type: 'New Year' },
      { name: 'Sri Rama Navami', date: 'Apr 15', type: 'Grand' },
    ]},
    { month: 'September', events: [
      { name: 'Ganesh Chaturthi', date: 'Sep 4', type: 'Supreme' },
    ]},
    { month: 'October', events: [
      { name: 'Dussehra (Vijayadashami)', date: 'Oct 11', type: 'Grand' },
      { name: 'Diwali (Deepavali)', date: 'Oct 29', type: 'Grand' },
    ]},
  ];

  const currentFestivals = activeYear === '2026' ? festivals2026 : festivals2027;

  return (
    <section id="festivals" className="section-padding bg-white py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/[0.02] pointer-events-none" />
      
      <div className="container-custom relative z-10 px-4">
        <div className="text-center mb-16 animate-fade-rise">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Spiritual Calendar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground font-serif leading-tight">
             Sacred <span className="gold-shimmer italic">Festivals</span>
          </h2>
          
          <div className="flex justify-center mt-12 mb-8">
            <div className="p-1 glass rounded-full flex border border-primary/10 shadow-inner">
               <button 
                 onClick={() => setActiveYear('2026')}
                 className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${activeYear === '2026' ? 'bg-primary text-white shadow-xl' : 'text-muted-foreground hover:text-primary'}`}
               >
                 2026 Calendar
               </button>
               <button 
                 onClick={() => setActiveYear('2027')}
                 className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${activeYear === '2027' ? 'bg-primary text-white shadow-xl' : 'text-muted-foreground hover:text-primary'}`}
               >
                 2027 Calendar
               </button>
            </div>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto text-sm font-light">
             Explore the upcoming auspicious days and major celebrations for {activeYear} at Sampath Vinayaka Temple.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {currentFestivals.map((m, idx) => (
            <div key={idx} className="glass rounded-[2rem] p-6 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/5">
                <CalendarIcon className="w-5 h-5 text-primary opacity-60" />
                <h3 className="font-bold text-foreground tracking-wide font-serif">{m.month} {activeYear}</h3>
              </div>
              
              <div className="space-y-4">
                {m.events.map((e, eIdx) => (
                  <div key={eIdx} className={`flex flex-col gap-1 p-3 rounded-2xl border border-transparent transition-colors ${e.name.includes('Ganesh') ? 'bg-primary/5 border-primary/20' : 'bg-primary/[0.02]'} group-hover:bg-primary/[0.04] hover:border-primary/5`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{e.date}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${e.name.includes('Ganesh') ? 'bg-primary text-white' : 'bg-white border border-primary/10 text-muted-foreground'}`}>{e.type}</span>
                    </div>
                    <p className="text-sm font-bold text-foreground/90 font-serif group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                       {e.name}
                       <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block glass px-8 py-6 rounded-[2rem] border border-primary/20 shadow-xl max-w-2xl">
             <p className="text-sm text-foreground/80 font-serif italic mb-4">
                "May Lord Vinayaka bless you with wisdom, prosperity, and the removal of all obstacles throughout {activeYear}."
             </p>
             <div className="flex items-center justify-center gap-3 text-xs font-bold text-primary tracking-[0.2em] uppercase">
                <div className="h-px w-8 bg-primary/20" />
                Om Gam Ganapataye Namaha
                <div className="h-px w-8 bg-primary/20" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestivalList;
