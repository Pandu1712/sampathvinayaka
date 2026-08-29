import { useState } from "react";
import vinayakaLogo from "@/assets/vinayaka-logo.png";
import { Sparkles, Flower2 } from "lucide-react";

interface LaunchScreenProps {
  onLaunch: () => void;
}

export default function LaunchScreen({ onLaunch }: LaunchScreenProps) {
  const [isFading, setIsFading] = useState(false);

  // Play synthesized temple bell sound using browser's native Web Audio API
  const playBellSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // Base/fundamental frequency for a resonant temple bell
      const fund = 180; 
      
      // Inharmonic partials that create the metallic, musical chime of a bell
      // Ratio 2.4 creates a minor third, typical of classical bells
      const partials = [
        { ratio: 1.0, gain: 0.6, decay: 3.5 }, // Hum tone (fundamental)
        { ratio: 2.0, gain: 0.8, decay: 2.5 }, // Strike tone
        { ratio: 2.4, gain: 0.7, decay: 2.0 }, // Tierce (minor third)
        { ratio: 3.0, gain: 0.5, decay: 1.5 }, // Quint (fifth)
        { ratio: 4.0, gain: 0.4, decay: 1.2 }, // Nominal (octave)
        { ratio: 5.3, gain: 0.3, decay: 0.8 }, // Supernominal
        { ratio: 6.7, gain: 0.2, decay: 0.5 }  // High bell ring
      ];

      // Master output gain node for attack and overall decay
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.9, now + 0.01); // Sharp attack
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8); // Long reverberation
      masterGain.connect(ctx.destination);

      partials.forEach(p => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(fund * p.ratio, now);

        gainNode.gain.setValueAtTime(p.gain, now);
        // Exponential decay for each partial based on its decay time
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start(now);
        osc.stop(now + p.decay + 0.5);
      });
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by browser:", e);
    }
  };

  const handleLaunchClick = () => {
    // Play bell sound
    playBellSound();
    
    // Start fadeout transition
    setIsFading(true);
    
    // Call parent onLaunch after transition finishes (approx 800ms)
    setTimeout(() => {
      onLaunch();
    }, 850);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${
        isFading ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        background: `radial-gradient(circle at center, hsla(38, 72%, 40%, 0.18) 0%, hsla(10, 80%, 8%, 0.98) 60%, hsl(0, 0%, 3%) 100%)`,
        backgroundImage: `
          radial-gradient(circle at center, hsla(38, 72%, 35%, 0.15) 0%, hsla(10, 80%, 6%, 0.96) 65%, hsl(0, 0%, 2%) 100%),
          url("https://www.transparenttextures.com/patterns/natural-paper.png")
        `
      }}
    >
      {/* Background Decorative Temple Pillars/Arch silhouette */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-cover bg-center" 
           style={{ backgroundImage: `url('https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087511/DSC_2151_k72wsc.jpg')` }} />

      {/* Main Logo & Rotating Mandala Section */}
      <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] mb-8 animate-fade-rise">
        
        {/* Ornate Rotating Mandala (SVG) */}
        <svg
          className="absolute w-full h-full text-amber-500/20 animate-spin"
          style={{ animationDuration: "50s" }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 4" />
          
          {/* Radial Spokes */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 41 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={50 + 41 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.15"
              strokeDasharray="2 6"
            />
          ))}
          
          {/* Ornate Lotus Petals */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 50 + 22 * Math.cos(angle - 0.15);
            const y1 = 50 + 22 * Math.sin(angle - 0.15);
            const x2 = 50 + 38 * Math.cos(angle);
            const y2 = 50 + 38 * Math.sin(angle);
            const x3 = 50 + 22 * Math.cos(angle + 0.15);
            const y3 = 50 + 22 * Math.sin(angle + 0.15);
            return (
              <path
                key={i}
                d={`M 50 50 Q ${x1} ${y1} ${x2} ${y2} Q ${x3} ${y3} 50 50`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
            );
          })}
          
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </svg>

        {/* Inner Glowing Aura behind the Ganesha image */}
        <div className="absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full bg-amber-500/10 blur-2xl animate-pulse" />

        {/* Ganesha Deity Logo (Floating) */}
        <div className="relative w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] rounded-full border-2 border-amber-500/30 p-2 bg-[#1C0505]/95 shadow-[0_0_30px_rgba(217,119,6,0.3)] animate-float flex items-center justify-center">
          <img
            src={vinayakaLogo}
            alt="Sri Sampath Vinayaka"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(217,119,6,0.5)]"
          />
        </div>
      </div>

      {/* Welcome / Launch Titles */}
      <div className="text-center px-4 max-w-2xl z-10">
        <div className="flex items-center justify-center gap-2 text-amber-500 mb-2 animate-fade-rise-delay">
          <Flower2 size={16} className="text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-amber-500/80">Auspicious Website Launch</span>
          <Flower2 size={16} className="text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-wide leading-tight mb-2 animate-fade-rise-delay gold-shimmer">
          SRI SAMPATH VINAYAKA
        </h1>
        <h2 className="text-lg sm:text-xl font-medium text-amber-100/90 tracking-widest mb-4 animate-fade-rise-delay-2">
          TEMPLE • VISAKHAPATNAM
        </h2>

        {/* Telugu Translation/Title */}
        <p className="text-base sm:text-lg text-amber-400/90 font-medium tracking-wide mb-6 animate-fade-rise-delay-2 font-serif">
          శ్రీ సంపత్ వినాయక దేవస్థానం
        </p>

        {/* Golden Divider */}
        <div className="gold-divider w-48 mx-auto mb-8 animate-fade-rise-delay-2" />

        {/* Enter Temple / Launch Button */}
        <div className="animate-fade-rise-delay-3 flex flex-col items-center gap-3">
          <button
            onClick={handleLaunchClick}
            className="relative group overflow-hidden px-8 py-4 rounded-full font-bold text-white text-base tracking-wider uppercase bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] hover:scale-105 transition-all duration-300 active:scale-95 flex items-center gap-2 border border-amber-400/30"
          >
            {/* Shiny background hover sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <Sparkles size={18} className="text-yellow-100 animate-pulse" />
            <span>Launch Website</span>
            <Sparkles size={18} className="text-yellow-100 animate-pulse" />
          </button>
          
          <span className="text-[10px] text-amber-500/50 tracking-widest uppercase mt-2">
            Click to Enter Temple
          </span>
        </div>
      </div>

      {/* Decorative Bottom Border Pattern */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-3 opacity-20 flex pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-6 border-t-2 border-r-2 border-amber-500 rounded-tr-full flex-shrink-0"
            style={{ transform: "translateY(2px)" }}
          />
        ))}
      </div>
    </div>
  );
}
