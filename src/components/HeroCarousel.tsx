import { useState, useEffect } from "react";
import ganeshaImage from "/logo.png";

const slides = [
  { image: ganeshaImage, title: "Sampath Vinayaka Temple", subtitle: "Seek divine blessings from the Lord of Obstacles" },
  { image: ganeshaImage, title: "Sacred Darshan", subtitle: "Experience the peace and power of Lord Ganesha" },
  { image: ganeshaImage, title: "Timeless Devotion", subtitle: "A legacy of faith for generations" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative w-full h-[100svh] overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-contain mix-blend-screen transition-transform duration-[10000ms] ease-linear ${
              index === current ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-4 z-20">
        <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
          <p className="text-primary text-sm tracking-[0.4em] uppercase mb-6 drop-shadow-lg font-bold flex items-center gap-3 justify-center">
            <span className="h-px w-8 bg-primary/40 hidden sm:block" />
            Sacred Abode of Lord Ganesha
            <span className="h-px w-8 bg-primary/40 hidden sm:block" />
          </p>
        </div>
        
        <h1 className="hero-title max-w-5xl !font-serif !italic drop-shadow-2xl mb-2">
          {slides[current].title}
        </h1>
        
        <div className="animate-fade-rise-delay opacity-0 [animation-fill-mode:forwards] flex flex-col items-center">
          <div className="h-1 w-24 bg-primary/60 rounded-full mb-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="hero-subtitle max-w-2xl px-4 !text-white/95 !font-sans !tracking-wide !leading-relaxed text-sm ">
            {slides[current].subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-rise-delay-2 opacity-0 [animation-fill-mode:forwards] w-full sm:w-auto px-5 sm:px-0">
          <button
            onClick={() => scrollTo("services")}
            className="group relative px-5 py-4 sm:py-5 rounded-full text-sm font-bold bg-primary text-primary-foreground transition-all shadow-[0_10px_30px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_40px_rgba(var(--primary),0.5)] hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Explore Services</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button
            onClick={() => scrollTo("events")}
            className="group px-5 py-4 sm:py-5 rounded-full text-sm font-bold border-2 border-white/30 text-white hover:border-primary hover:text-primary transition-all shadow-xl hover:-translate-y-1 active:scale-95 bg-white/5 backdrop-blur-md"
          >
            Upcoming Events
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              index === current ? "glass w-12 bg-primary" : "bg-white/30 w-3 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
