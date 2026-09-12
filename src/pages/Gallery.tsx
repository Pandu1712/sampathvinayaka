import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { getOptimizedImageUrl } from "@/utils/cloudinary";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import deity1 from "@/assets/deity-1.jpg";
import deity2 from "@/assets/deity-2.jpg";
import priestPooja from "@/assets/priest-pooja.jpg";
import { Sparkles, Eye, Camera, RefreshCw } from "lucide-react";

const initialArchiveImages = [
  { src: priestPooja, title: "Sree Sampath Vinayagar Archana & Aarti", category: "Daily Pooja", span: "col-span-2 row-span-2" },
  { src: deity1, title: "Maha Ganapathi Sacred Darshan", category: "Alankaram", span: "col-span-1 row-span-1" },
  { src: deity2, title: "Lord Vinayaka Rajalankaram", category: "Alankaram", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087513/DSC_2942_zwtokt.jpg", title: "Temple Deity Swarna Alankaram", category: "Alankaram", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087512/DSC_2235_s6uwsk.jpg", title: "Inner Sanctum Special Pooja", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087510/DSC_2183_qwpfao.jpg", title: "Deeparadhana Ceremony", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087508/DSC_2084_xjxbov.jpg", title: "Devotee Darshan Gathering", category: "Festivals", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086841/IMG_5524_f8j84i.jpg", title: "Sacred Naivedyam Offering", category: "Annadanam", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086841/IMG_5547_qs5cey.jpg", title: "Maha Prasadam Preparation", category: "Annadanam", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086839/DSC_2313_gdfw5g.jpg", title: "Traditional Akhanda Jyoti", category: "Daily Pooja", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086350/DSC_2248_kxhnxf.jpg", title: "Temple Gopuram & Sanctum", category: "Architecture", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086349/DSC_2177_nfpbhe.jpg", title: "Vahana Pooja Mandapam", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086349/DSC_2149_g7qgov.jpg", title: "Ganesha Homam Rituals", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086349/DSC_2236_r2ucmy.jpg", title: "Temple Dhwajasthambham", category: "Architecture", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086348/DSC_2099_pdlfg1.jpg", title: "Special Floral Garland Decor", category: "Alankaram", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086347/DSC_2262_patlba.jpg", title: "Festival Procession Stage", category: "Festivals", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086053/DSC_2021_pryp6e.jpg", title: "Evening Pradosha Pooja", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086052/DSC_2027_vigaep.jpg", title: "Garuda Vahana Alankaram", category: "Alankaram", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086050/DSC_2024_osatqe.jpg", title: "Sacred Pushpalankaram", category: "Alankaram", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086051/DSC_2026_jlajkr.jpg", title: "Temple Sanctum Bell Ritual", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086047/DSC_1961_nswpiq.jpg", title: "Devotee Pradakshina Path", category: "Architecture", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086049/DSC_2022_mi1jdb.jpg", title: "Navaratri Celebrations", category: "Festivals", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086048/DSC_2006_xlpxzy.jpg", title: "Sahasra Modaka Pooja", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086046/DSC_1883_aelmrp.jpg", title: "Temple Main Entrance Arch", category: "Architecture", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086046/DSC_1608_qtbone.jpg", title: "Maha Harati to Lord Ganesha", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086045/DSC_1599_khxw9t.jpg", title: "Sacred Kumkumarchana", category: "Daily Pooja", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086044/DSC_1540_yav0er.jpg", title: "Vinayaka Chavithi Maha Utsavam", category: "Festivals", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086043/DSC_1519_t1hqnt.jpg", title: "Panchamrutha Abhishekam", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086040/DSC_1409_dwycnj.jpg", title: "Special Homam & Havanam", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086036/DSC_1232_fltdcz.jpg", title: "Temple Campus Courtyard", category: "Architecture", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086036/DSC_1291_q9sidq.jpg", title: "Devotional Chanting Hall", category: "Architecture", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086034/DSC_1212_exoc0d.jpg", title: "Golden Kavacham Darshan", category: "Alankaram", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082199/IMG_4588_fsfvbv.jpg", title: "Annadanam Hall Dining", category: "Annadanam", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082192/DSC_1788_cer6sw.jpg", title: "Modaka & Laddu Offerings", category: "Annadanam", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082181/DSC_1791_juw21f.jpg", title: "Brahmotsavam Grand Utsavam", category: "Festivals", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082141/DSC_1766_ogwdmg.jpg", title: "Silver Kireetam Alankaram", category: "Alankaram", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082094/IMG_4871_hlrpyw.jpg", title: "Prasadam Counter Area", category: "Annadanam", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082094/IMG_4894_kvyinh.jpg", title: "Traditional Nadaswaram Music", category: "Festivals", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082074/IMG_4592_gb6pvq.jpg", title: "Devotee Queues for Sarva Darshan", category: "Architecture", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082056/IMG_4608_kxpmwm.jpg", title: "Temple Night Illumination", category: "Architecture", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779080982/IMG_5753_kcykxr.jpg", title: "Vahana Pooja for New Cars", category: "Daily Pooja", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779080979/IMG_5751_laosq4.jpg", title: "Vahana Pooja Coconut Ritual", category: "Daily Pooja", span: "col-span-1 row-span-1" },

  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779081034/IMG_4894_uzlbfz.jpg", title: "Vijayadashami Shami Pooja", category: "Festivals", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779082085/IMG_4878_fswnee.jpg", title: "Ganesha Chaturthi Laddu Auction", category: "Festivals", span: "col-span-1 row-span-1" },
];

const Gallery = () => {
  const [liveImages, setLiveImages] = useState<any[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGalleryPhotos = async () => {
      setIsLoadingLive(true);
      if (!db) {
        const localG = JSON.parse(localStorage.getItem("local_gallery") || "[]");
        setLiveImages(localG);
        setIsLoadingLive(false);
        return;
      }

      try {
        const galleryQuery = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snap = await getDocs(galleryQuery);
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLiveImages(list);
      } catch (err) {
        try {
          const snap = await getDocs(collection(db, "gallery"));
          const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          list.sort((a: any, b: any) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
          });
          setLiveImages(list);
        } catch (fallbackErr) {
          const localG = JSON.parse(localStorage.getItem("local_gallery") || "[]");
          setLiveImages(localG);
        }
      } finally {
        setIsLoadingLive(false);
      }
    };

    fetchGalleryPhotos();
  }, []);

  // Merge live uploaded images with initial archive images
  const allImages = [
    ...liveImages.map(img => ({
      src: img.src,
      title: img.title || "Temple Sacred Darshan",
      category: img.category || "Alankaram",
      span: img.span || "col-span-1 row-span-1",
      isLive: true
    })),
    ...initialArchiveImages.map(img => ({
      ...img,
      isLive: false
    }))
  ];

  // Filter based on active category
  const filteredImages = allImages.filter(img => {
    if (activeCategory === "all") return true;
    return img.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <Layout>
      <div className="pt-28 sm:pt-32 min-h-screen bg-zinc-950">
        {/* Gallery Title Header */}
        <div className="container-custom text-center mb-8 relative z-10 animate-fade-rise">
          <p className="text-primary text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-black flex items-center justify-center gap-2">
            <span>📸 Sacred Visual Journey</span>
            {liveImages.length > 0 && (
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-sans font-bold">
                {liveImages.length} New Live Uploads
              </span>
            )}
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-wide">
            Temple <span className="gold-shimmer italic">Gallery</span>
          </h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-4" />
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto mt-3 font-light">
            Explore divine alankarams, inner sanctum rituals, grand festivals, and temple architecture.
          </p>

          {/* Category Filter Navigation Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-4xl mx-auto">
            {[
              { id: "all", label: "All Sacred Photos", count: allImages.length },
              { id: "Alankaram", label: "Deity & Alankaram", count: allImages.filter(i => i.category === "Alankaram").length },
              { id: "Daily Pooja", label: "Sanctum & Daily Pooja", count: allImages.filter(i => i.category === "Daily Pooja").length },
              { id: "Festivals", label: "Festivals & Utsavam", count: allImages.filter(i => i.category === "Festivals").length },
              { id: "Architecture", label: "Temple Campus", count: allImages.filter(i => i.category === "Architecture").length },
              { id: "Annadanam", label: "Annaprasadam", count: allImages.filter(i => i.category === "Annadanam").length },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-black tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                    : "bg-zinc-900/80 border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-primary/30"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id
                    ? "bg-black/20 text-stone-950 font-black"
                    : "bg-white/10 text-muted-foreground"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="px-4 pb-16 sm:pb-24 bg-zinc-950 relative overflow-hidden">
          {/* Traditional background texture details */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-custom relative z-10">
            {filteredImages.length === 0 ? (
              <div className="p-16 rounded-3xl border border-white/10 bg-black/40 text-center max-w-md mx-auto space-y-3">
                <Camera className="w-10 h-10 text-muted-foreground mx-auto" />
                <p className="text-sm font-bold text-white">No photos in this category yet.</p>
                <p className="text-xs text-muted-foreground">Select another category or view All Sacred Photos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[280px] md:auto-rows-[320px]">
                {filteredImages.map((img, i) => (
                  <div
                    key={`${img.src}-${i}`}
                    className={`${img.span} relative group cursor-pointer shadow-xl hover:shadow-[0_15px_30px_rgba(251,191,36,0.18)] transition-all duration-500 animate-fade-rise p-2 sm:p-3 rounded-2xl sm:rounded-[1.5rem] bg-amber-950/20 border border-primary/25 backdrop-blur-sm overflow-hidden flex flex-col justify-end`}
                    style={{ animationDelay: `${(i % 12) * 50}ms`, opacity: 0, animationFillMode: "forwards" }}
                    onClick={() => openLightbox(i)}
                  >
                    {/* Thin Inner Gold Border Frame */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-primary/40">
                      <img
                        src={getOptimizedImageUrl(img.src, 700)}
                        alt={img.title || `Temple Gallery Photo ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                        loading="lazy"
                        width={700}
                        height={500}
                      />
                      
                      {/* Live Upload Badge if newly added by admin */}
                      {img.isLive && (
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-stone-950 font-black text-[9px] uppercase tracking-wider shadow-md backdrop-blur-sm flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            Latest Upload
                          </span>
                        </div>
                      )}

                      {/* Subtle warm overlay that reveals title on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 sm:p-4 z-10">
                        <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider font-sans">
                          {img.category}
                        </span>
                        <h4 className="text-white text-xs sm:text-sm font-serif font-bold line-clamp-2 mt-0.5">
                          {img.title}
                        </h4>
                      </div>

                      {/* Default bottom shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/30 via-transparent to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox / Full Screen Modal Viewer */}
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center transition-all duration-300 p-4">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg cursor-pointer"
              aria-label="Close Lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-3.5 rounded-full bg-white/10 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg cursor-pointer"
              aria-label="Previous Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Image Frame & Caption */}
            <div className="relative max-w-[92vw] max-h-[85vh] p-2 sm:p-4 bg-amber-950/30 border border-primary/40 rounded-2xl shadow-[0_0_50px_rgba(251,191,36,0.2)] flex flex-col items-center justify-center">
              <img
                src={getOptimizedImageUrl(filteredImages[lightboxIndex].src, 1400)}
                alt={filteredImages[lightboxIndex].title || `Temple Deity Darshan ${lightboxIndex + 1}`}
                className="max-w-full max-h-[72vh] object-contain rounded-lg border border-primary/20"
              />
              
              <div className="w-full text-center mt-3 px-4">
                <p className="text-white font-serif font-bold text-sm sm:text-base">
                  {filteredImages[lightboxIndex].title}
                </p>
                <span className="text-primary text-xs uppercase tracking-widest font-sans">
                  {filteredImages[lightboxIndex].category}
                </span>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-3.5 rounded-full bg-white/10 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg cursor-pointer"
              aria-label="Next Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicator text */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 glass-dark border border-primary/20 rounded-full text-primary font-bold tracking-widest text-xs">
              {lightboxIndex + 1} / {filteredImages.length}
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

