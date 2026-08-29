import { useState } from "react";
import Layout from "@/components/Layout";
import { getOptimizedImageUrl } from "@/utils/cloudinary";
import deity1 from "@/assets/deity-1.jpg";
import deity2 from "@/assets/deity-2.jpg";
import priestPooja from "@/assets/priest-pooja.jpg";

const images = [
  { src: priestPooja, span: "col-span-2 row-span-2" },
  { src: deity1, span: "col-span-1 row-span-1" },
  { src: deity2, span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087513/DSC_2942_zwtokt.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087512/DSC_2235_s6uwsk.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087510/DSC_2183_qwpfao.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087508/DSC_2084_xjxbov.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086841/IMG_5524_f8j84i.jpg", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086841/IMG_5547_qs5cey.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086839/DSC_2313_gdfw5g.jpg", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086350/DSC_2248_kxhnxf.jpg", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086349/DSC_2177_nfpbhe.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086349/DSC_2149_g7qgov.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086349/DSC_2236_r2ucmy.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086348/DSC_2099_pdlfg1.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086347/DSC_2262_patlba.jpg", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086053/DSC_2021_pryp6e.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086052/DSC_2027_vigaep.jpg", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086050/DSC_2024_osatqe.jpg", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086051/DSC_2026_jlajkr.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086047/DSC_1961_nswpiq.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086049/DSC_2022_mi1jdb.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086048/DSC_2006_xlpxzy.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086046/DSC_1883_aelmrp.jpg", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086046/DSC_1608_qtbone.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086045/DSC_1599_khxw9t.jpg", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086044/DSC_1540_yav0er.jpg", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086043/DSC_1519_t1hqnt.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086040/DSC_1409_dwycnj.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086036/DSC_1232_fltdcz.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086036/DSC_1291_q9sidq.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086034/DSC_1212_exoc0d.jpg", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082199/IMG_4588_fsfvbv.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082192/DSC_1788_cer6sw.jpg", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082181/DSC_1791_juw21f.jpg", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082141/DSC_1766_ogwdmg.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082094/IMG_4871_hlrpyw.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082094/IMG_4894_kvyinh.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082074/IMG_4592_gb6pvq.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082056/IMG_4608_kxpmwm.jpg", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779080982/IMG_5753_kcykxr.jpg", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779080979/IMG_5751_laosq4.jpg", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779081034/IMG_4894_uzlbfz.jpg", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082085/IMG_4878_fswnee.jpg", span: "col-span-1 row-span-1" },
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <Layout>
      <div className="pt-28 sm:pt-32 min-h-screen bg-zinc-950">
        {/* Gallery Title Header */}
        <div className="container-custom text-center mb-10 relative z-10 animate-fade-rise">
          <p className="text-primary text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-black">📸 Sacred Visual Journey</p>
          <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-wide">
            Temple <span className="gold-shimmer italic">Gallery</span>
          </h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-4" />
        </div>

        {/* Gallery Grid */}
        <section className="px-4 pb-16 sm:pb-24 bg-zinc-950 relative overflow-hidden">
        {/* Traditional background texture details */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px] sm:auto-rows-[300px] md:auto-rows-[350px]">
            {images.map((img, i) => (
              <div
                key={i}
                className={`${img.span} relative group cursor-pointer shadow-xl hover:shadow-[0_15px_30px_rgba(251,191,36,0.15)] transition-all duration-500 animate-fade-rise p-2.5 sm:p-3.5 rounded-[1.5rem] bg-amber-950/20 border border-primary/25 backdrop-blur-sm`}
                style={{ animationDelay: `${i * 80}ms`, opacity: 0, animationFillMode: "forwards" }}
                onClick={() => openLightbox(i)}
              >
                {/* Thin Inner Gold Border Frame */}
                <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden border border-primary/40">
                  <img
                    src={getOptimizedImageUrl(img.src, 600)}
                    alt={`Temple Gallery ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                  {/* Subtle warm overlay that fades on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent opacity-80 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Full Screen Modal Viewer */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center transition-all duration-300">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg"
            aria-label="Close Lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/5 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg"
            aria-label="Previous Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Main Image Frame */}
          <div className="relative max-w-[90vw] max-h-[80vh] sm:max-h-[85vh] p-3 sm:p-4 bg-amber-950/30 border border-primary/40 rounded-2xl shadow-[0_0_50px_rgba(251,191,36,0.2)] flex items-center justify-center">
            <img
              src={getOptimizedImageUrl(images[lightboxIndex].src, 1200)}
              alt={`Temple Deity Darshan ${lightboxIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-primary/20"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/5 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg"
            aria-label="Next Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicator text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 glass-dark border border-primary/20 rounded-full text-primary font-bold tracking-widest text-xs">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Social CTA */}
      <section className="section-padding px-4 bg-zinc-950 border-t border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.01] bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
        <div className="container-custom text-center relative z-10">
          <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Follow Our Journey</p>
          <h2 className="text-4xl font-bold text-foreground font-serif mb-6">Stay <span className="gold-shimmer italic">Connected</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Instagram", "Facebook", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl glass-dark border border-white/5 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
              >
                <span className="text-primary font-bold tracking-widest uppercase text-sm">{social}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:scale-150 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  </Layout>
);
};

export default Gallery;
