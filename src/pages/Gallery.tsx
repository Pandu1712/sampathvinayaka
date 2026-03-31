import Layout from "@/components/Layout";
import templeHero1 from "@/assets/temple-hero-1.jpg";
import templeHero2 from "@/assets/temple-hero-2.jpg";
import templeHero3 from "@/assets/temple-hero-3.jpg";
import templeHero4 from "@/assets/temple-hero-4.jpg";
import templeHero5 from "@/assets/temple-hero-5.jpg";

const images = [
  { src: templeHero1, title: "Temple at Golden Hour", span: "col-span-2 row-span-2" },
  { src: templeHero2, title: "Sacred Lamps", span: "col-span-1 row-span-1" },
  { src: templeHero5, title: "Temple Bell & Lamp", span: "col-span-1 row-span-1" },
  { src: templeHero3, title: "Lotus Pond", span: "col-span-1 row-span-1" },
  { src: templeHero4, title: "Ancient Corridor", span: "col-span-2 row-span-1" },
  { src: templeHero2, title: "Interior Light", span: "col-span-1 row-span-1" },
  { src: templeHero3, title: "Morning Prayers", span: "col-span-1 row-span-1" },
  { src: templeHero1, title: "Gopuram Detail", span: "col-span-1 row-span-1" },
];

const Gallery = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src={templeHero3} 
          alt="Temple pond" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-ken-burns scale-110" 
          width={1920} 
          height={1080} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        <div className="relative z-10 text-center px-4">
          <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold drop-shadow-lg">Sacred Visual Journey</p>
            <h1 className="hero-title !font-serif !italic drop-shadow-2xl">Temple Gallery</h1>
            <div className="h-1 w-24 bg-primary/60 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding px-4 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] sm:auto-rows-[300px] md:auto-rows-[350px]">
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`${img.span} relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 animate-fade-rise`}
                style={{ animationDelay: `${i * 100}ms`, opacity: 0, animationFillMode: "forwards" }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Sacred Perspective</span>
                    <h4 className="text-white text-sm font-bold font-serif">{img.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="section-padding px-4 bg-primary/[0.02]">
        <div className="container-custom text-center">
          <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Follow Our Journey</p>
          <h2 className="text-4xl font-bold text-foreground font-serif mb-5">Stay <span className="gold-shimmer italic">Connected</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
             {["Instagram", "Facebook", "YouTube"].map((social) => (
               <a 
                 key={social}
                 href="#" 
                 className="group flex items-center gap-3 px-5 py-4 rounded-2xl glass border border-white hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
               >
                 <span className="text-primary font-bold tracking-widest uppercase text-sm">{social}</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:scale-150 transition-transform" />
               </a>
             ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
