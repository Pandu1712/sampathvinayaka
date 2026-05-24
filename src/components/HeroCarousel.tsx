import { useEffect, useState } from "react";
import { getOptimizedImageUrl } from "@/utils/cloudinary";

const slides = [
  { image: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086041/DSC_1411_cobm4f.jpg" },
  { image: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087513/DSC_2942_zwtokt.jpg" },
  { image: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087512/DSC_2235_s6uwsk.jpg" },
  { image: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779085953/DSC_1119_r57m1m.jpg" },
  { image: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779085946/DSC_1125_xvfnht.jpg" },
  { image: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086049/DSC_2022_mi1jdb.jpg" },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="mt-4 sm:mt-6 lg:mt-8 max-w-7xl mx-auto px-2 sm:px-4">
      {/* HERO CONTAINER */}
      <div
        className="
        relative w-full overflow-hidden bg-zinc-950 rounded-2xl
        h-[280px] sm:h-[400px] md:h-[480px] lg:h-[75vh]
        shadow-2xl
        "
      >
        {/* Dynamic Blurred Background for depth */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 transition-all duration-1000 scale-110"
          style={{ backgroundImage: `url(${getOptimizedImageUrl(slides[active].image, 200)})` }}
        />

        {/* Cards Wrapper */}
        <div className="relative w-full h-full flex items-center justify-center">
          {slides.map((slide, index) => {
            const diff = (index - active + slides.length) % slides.length;
            
            let positionClass = "opacity-0 z-0 scale-75 translate-x-0 pointer-events-none";
            if (diff === 0) {
              positionClass = "opacity-100 z-30 scale-100 translate-x-0 cursor-default shadow-[0_0_40px_rgba(0,0,0,0.6)]";
            } else if (diff === 1) {
              positionClass = "opacity-60 z-20 scale-[0.85] translate-x-[65%] sm:translate-x-[65%] md:translate-x-[60%] cursor-pointer hover:opacity-80";
            } else if (diff === slides.length - 1) {
              positionClass = "opacity-60 z-20 scale-[0.85] -translate-x-[65%] sm:-translate-x-[65%] md:-translate-x-[60%] cursor-pointer hover:opacity-80";
            }

            return (
              <div
                key={index}
                className={`absolute w-[75%] sm:w-[60%] md:w-[50%] h-[80%] sm:h-[85%] transition-all duration-700 ease-in-out ${positionClass} rounded-xl sm:rounded-2xl`}
                onClick={() => {
                  if (diff !== 0) setActive(index);
                }}
              >
                <img
                  src={getOptimizedImageUrl(slide.image, 1200)}
                  alt={`Temple Darshan ${index + 1}`}
                  className="w-full h-full object-cover object-top origin-top rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white/10"
                />
                
                {/* Light Glass/Blur Overlay for inactive cards */}
                <div 
                  className={`absolute inset-0 bg-white/10 backdrop-blur-[3px] rounded-xl sm:rounded-2xl transition-opacity duration-700 pointer-events-none
                  ${diff === 0 ? "opacity-0" : "opacity-100"}`}
                />
              </div>
            );
          })}
        </div>

        {/* DOT INDICATOR */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3 md:gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`transition-all duration-500 h-1.5 md:h-2 rounded-full
              ${active === index
                  ? "w-10 md:w-16 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]"
                  : "w-4 md:w-6 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
