import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getOptimizedImageUrl } from "@/utils/cloudinary";
import HeroCarousel from "@/components/HeroCarousel";
import Ashtothram from "@/components/Ashtothram";
import Donations from "@/components/Donations";
import Panchangam from "@/components/Panchangam";
const ganeshaImage = "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779092088/ChatGPT_Image_May_18_2026_01_44_24_PM_durfci.png";
import purohit1 from "@/assets/purohit-1.jpg";
import male1 from "@/assets/member-male-1.png";
import male2 from "@/assets/member-male-2.png";
import male3 from "@/assets/member-male-3.png";
import prasadRao from "@/assets/prasad-rao.jpg";


/* ─── Data ─── */
const services = [
  { icon: "🪔", title: "Daily Pooja", desc: "Morning and evening worship rituals performed by temple priests", timing: "6:00 AM & 7:00 PM", price: "Free" },
  { icon: "🔔", title: "Maha Aarti", desc: "Grand evening aarti ceremony with 108 lamps and devotional music", timing: "7:00 PM Daily", price: "Free" },
  { icon: "💐", title: "Abhishekam", desc: "Sacred bathing ritual of the deity with milk, honey, and holy water", timing: "7:00 AM – 8:30 AM Daily", price: "₹501" },
  { icon: "🎋", title: "Homam / Havan", desc: "Sacred fire ritual for prosperity, health, and spiritual growth", timing: "5:00 AM – 6:30 AM Daily", price: "₹1,001" },
  { icon: "🙏", title: "Special Darshan", desc: "VIP darshan with direct access to the sanctum sanctorum", timing: "All Day", price: "₹201" },
  { icon: "🎊", title: "Marriage Ceremony", desc: "Traditional temple wedding conducted by temple priests", timing: "Muhurtam Days", price: "₹5,001" },
  { icon: "📖", title: "Vedic Classes", desc: "Learn ancient scriptures, shlokas, and spiritual practices", timing: "Sat & Sun 8 AM", price: "Free" },
];

const timings = [
  { 
    period: "Sarva Darshanam (General Darshan)", 
    periodTe: "సర్వదర్శనం టైమింగ్స్",
    time: "6:00 AM – 11:00 AM & 5:30 PM – 8:00 PM", 
    timeTe: "ఉదయం 6:00 నుండి 11:00 వరకు & సాయంత్రం 5:30 నుండి 8:00 వరకు" 
  },
  { 
    period: "Abhishekam Ritual", 
    periodTe: "అభిషేకము టైమింగ్స్",
    time: "7:00 AM – 8:30 AM Daily", 
    timeTe: "ఉదయం 7:00 నుండి 8:30 వరకు మాత్రమే" 
  },
  { 
    period: "Homam / Havan", 
    periodTe: "హోమము టైమింగ్స్",
    time: "5:00 AM – 6:30 AM Daily", 
    timeTe: "ఉదయం 5:00 నుండి 6:30 వరకు మాత్రమే" 
  },
  { 
    period: "Vehicle Pooja", 
    periodTe: "వాహన పూజ",
    time: "6:30 AM – 10:30 AM & 4:30 PM – 8:00 PM", 
    timeTe: "ఉదయం 6:30 నుండి 10:30 వరకు & సాయంత్రం 4:30 నుండి 8:00 వరకు" 
  },
  { 
    period: "Special Abhishekam (Ganesha Navaratri Days Only)", 
    periodTe: "ప్రత్యేక అభిషేకం (గణేష్ నవరాత్రి రోజులలో మాత్రమే)",
    time: "7:00 AM – 12:00 PM", 
    timeTe: "ఉదయం 7:00 నుండి 12:00 వరకు" 
  },
];

const milestonesEn = [
  { year: "1962", title: "Temple Construction", desc: "Constructed in Asilmetta by Late S.G. Sambandan, Late T.S. Selvaganesan, and Late T.S. Rajeswaran for worship." },
  { year: "1967", title: "Kanchi Paramacharya", desc: "His Holiness Sri Chandrasekharendra Saraswathi reconsecrated the shrine by placing \"Ganapathi Yantram\" with his own hands." },
  { year: "1971", title: "Eastern Naval Victory", desc: "Admiral Krishnan broke 1001 coconuts before the Lord for saving Visakhapatnam from the Pakistani submarine attack." },
  { year: "Present", title: "Spiritual Landmark", desc: "One of the most famous city temples attracting daily a number of devotees seeking blessings and new vehicle poojas." },
];

const milestonesTe = [
  { year: "1962", title: "ఆలయ నిర్మాణం", desc: "విశాఖలోని ఆశీలుమెట్ట వద్ద కీ॥శే॥ యస్.జి. సంబంధన్, కీ॥శే॥ టి.యస్. సెల్వగణేశన్, మరియు కీ॥శే॥ టి.యస్. రాజేశ్వరన్ గారి ఆధ్వర్యంలో స్థాపించబడింది." },
  { year: "1967", title: "కంచి పరమాచార్య", desc: "కంచి పీఠాధిపతులు శ్రీశ్రీశ్రీ చంద్రశేఖర సరస్వతి వారి స్వహస్తములతో \"గణపతి యంత్రము\" స్థాపన చేసినారు." },
  { year: "1971", title: "ఈస్ట్రన్ నేవల్ విజయం", desc: "విశాఖను రక్షించినందుకు ఈస్ట్రన్ నేవల్ కమాండర్ అడ్మిరల్ క్రిష్ణన్ 1001 కొబ్బరికాయలు కొట్టి స్వామిని వేడుకొన్నారు." },
  { year: "Present", title: "దైవిక క్షేత్రం", desc: "విశాఖపట్నం నగరంలో అత్యంత ప్రసిద్ధి చెందిన దేవాలయాలలో ఒకటిగా నిలిచి, నిత్యం వేలాది మంది భక్తులను ఆకర్షిస్తోంది." },
];

const milestonesHi = [
  { year: "1962", title: "मंदिर का निर्माण", desc: "असीलमेट्टा में स्वर्गीय एस.जी. सम्बन्धन, स्वर्गीय टी.एस. सेल्वागणेशन और स्वर्गीय टी.एस. राजेश्वरन द्वारा पूजा के लिए निर्मित किया गया।" },
  { year: "1967", title: "कांची परमाचार्य", desc: "कांची के पीठाधिपति परम पावन श्री चन्द्रशेखरेन्द्र सरस्वती ने अपने हाथों से \"गणपति यंत्र\" की स्थापना कर मंदिर की पुनर्प्रतिष्ठा की।" },
  { year: "1971", title: "पूर्वी नौसेना कमान की विजय", desc: "पाकिस्तानी पनडुब्बी गाजी के हमले से विशाखापत्तनम को बचाने के लिए एडमिरल कृष्णन ने भगवान के सामने 1001 नारियल तोड़े।" },
  { year: "Present", title: "दिव्य आध्यात्मिक स्थल", desc: "विशाखापत्तनम शहर के सबसे प्रसिद्ध मंदिरों में से एक, जहाँ प्रतिदिन हजारों भक्त दर्शन और नए वाहनों की पूजा के लिए आते हैं।" },
];

const galleryImages = [
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087509/IMG_5686_ixb1rc.jpg", title: "Lord Ganesha Deity Closeup", span: "col-span-2 row-span-2" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087511/DSC_2151_k72wsc.jpg", title: "Golden Gopuram Alankaram", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087511/DSC_2228_ktwsy9.jpg", title: "Evening Aarti Ceremony", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086046/DSC_1883_aelmrp.jpg", title: "Maha Abhishekam", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086839/DSC_2313_gdfw5g.jpg", title: "Devotional Lamp Ritual", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087507/IMG_5684_xxnzl6.jpg", title: "Shimmering Flower Decoration", span: "col-span-2 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086874/IMG_5634_fczm4z.jpg", title: "Sacred Pooja Offerings", span: "col-span-1 row-span-1" },
  { src: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086347/DSC_2262_patlba.jpg", title: "Inner Sanctum Bliss", span: "col-span-1 row-span-1" },
];

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

const aboutImages = [
  "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086048/DSC_2006_xlpxzy.jpg",
  "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086046/DSC_1426_elixeo.jpg",
  "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086046/DSC_1608_qtbone.jpg",
  "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086036/DSC_1291_q9sidq.jpg",
  "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086034/DSC_1190_li5vrt.jpg",
  "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779085980/DSC_1186_x046cn.jpg"
];

const Index = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [aboutImageIndex, setAboutImageIndex] = useState(0);
  const [homeLightboxIndex, setHomeLightboxIndex] = useState<number | null>(null);
  const [timelineLang, setTimelineLang] = useState<"en" | "te" | "hi">("en");

  useEffect(() => {
    const timer = setInterval(() => {
      setAboutImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
            
            <div className="mt-6 flex justify-start">
              <Link
                to="/history"
                className="group relative px-6 py-3.5 rounded-full text-sm font-bold bg-primary text-primary-foreground tracking-widest uppercase shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95 transition-all overflow-hidden inline-flex items-center gap-2 border border-primary/30 cursor-pointer"
              >
                <span>Read Full History</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
          <div className="relative animate-fade-in opacity-0 [animation-fill-mode:forwards] flex justify-center items-center py-4 lg:py-8">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] aspect-[3/4]">
              {/* Decorative Borders */}
              <div className="absolute -inset-4 border-2 border-primary/10 rounded-3xl -rotate-3 pointer-events-none" />
              <div className="absolute -inset-4 border-2 border-primary/5 rounded-3xl rotate-2 pointer-events-none" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group">
                <div className="relative w-full h-full overflow-hidden group-hover:scale-105 transition-transform duration-[2000ms] ease-out">
                  {aboutImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={getOptimizedImageUrl(img, 600)}
                      alt="Temple interior with sacred lamps"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        idx === aboutImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 p-4 glass-dark rounded-2xl border border-white/10 shadow-2xl animate-fade-rise flex flex-col gap-1 z-20">
                  <span className="text-primary text-2xl animate-bounce w-fit">🙏</span>
                  <span className="text-white font-serif font-bold tracking-wider text-sm leading-tight">Sri Sampath<br />Vinayakagar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="container-custom mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <div className="text-left">
              <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">
                {timelineLang === "en" ? "Temple History" : timelineLang === "te" ? "ఆలయ చరిత్ర" : "मंदिर का इतिहास"}
              </p>
              <h3 className="text-4xl font-bold text-foreground font-serif">
                {timelineLang === "en" ? (
                  <>Our <span className="gold-shimmer italic">Sacred Journey</span></>
                ) : timelineLang === "te" ? (
                  <>మా <span className="gold-shimmer italic">దైవిక ప్రయాణం</span></>
                ) : (
                  <>हमारी <span className="gold-shimmer italic">दिव्य यात्रा</span></>
                )}
              </h3>
              <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            </div>

            {/* Premium Small Bilingual Toggle */}
            <div className="bg-gradient-to-b from-[#1C1917] to-[#000000] p-1 rounded-xl border border-primary/35 shadow-lg flex items-center gap-1 w-fit">
              <button
                onClick={() => setTimelineLang("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-black tracking-widest transition-all duration-300 ${
                  timelineLang === "en"
                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setTimelineLang("te")}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-black tracking-widest transition-all duration-300 ${
                  timelineLang === "te"
                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                    : "text-white/60 hover:text-white"
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setTimelineLang("hi")}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-black tracking-widest transition-all duration-300 ${
                  timelineLang === "hi"
                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                    : "text-white/60 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
          <div className="relative border-l-2 border-primary/20 ml-4 sm:ml-8 space-y-6 sm:space-y-8">
            {(timelineLang === "en" ? milestonesEn : timelineLang === "te" ? milestonesTe : milestonesHi).map((m, i) => (
              <div key={i} className="relative pl-6 sm:pl-16 group animate-fade-rise opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: `${i * 150}ms` }}>
                {/* Dot */}
                <div className="absolute left-0 top-6 -translate-x-[13px] sm:-translate-x-[17px] w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-background border-[3px] sm:border-[4px] border-primary/20 flex items-center justify-center group-hover:border-primary transition-all duration-500 shadow-xl group-hover:scale-110">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary group-hover:scale-[1.3] transition-transform duration-500" />
                </div>

                {/* Content Card */}
                <div className="glass p-4 sm:p-6 rounded-3xl sm:rounded-[2.5rem] border border-white/40 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />

                  <div className="inline-flex px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-black tracking-widest uppercase mb-4 sm:mb-6 border border-primary/20 shadow-inner">
                    {m.year}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 font-serif group-hover:text-primary transition-colors duration-500">{m.title}</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TIMINGS ═══════ */}
      <section id="services" className="section-padding px-4 sm:px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
        <div className="container-custom relative z-10">
          {/* Header Block at the top left of the entire section */}
          <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Temple Timings</p>
            <h2 className="text-4xl font-bold text-foreground leading-tight font-serif">
              Plan Your <span className="gold-shimmer italic">Visit</span>
            </h2>
            <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>

          {/* Grid Layout for Image & List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: Image */}
            <div className="animate-fade-in opacity-0 [animation-fill-mode:forwards]">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src={getOptimizedImageUrl("https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086046/DSC_1883_aelmrp.jpg", 800)}
                  alt="Temple corridor"
                  className="w-full h-[400px] sm:h-[550px] object-cover transition-transform duration-[5s] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>

            {/* Right Column: Timings List */}
            <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards] text-left">
              <div className="space-y-4">
                {timings.map((t, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row justify-between sm:items-center p-5 rounded-2xl glass border border-white/40 hover:border-primary/20 hover:scale-[1.02] transition-all duration-300 group shadow-sm hover:shadow-lg gap-2 text-left"
                  >
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm font-bold font-serif group-hover:text-primary transition-colors">{t.period}</span>
                      {t.periodTe && (
                        <span className="text-muted-foreground text-xs font-sans mt-1 opacity-85">{t.periodTe}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
                      <div className="h-px w-8 bg-primary/20 group-hover:w-12 transition-all hidden sm:block" />
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="text-primary text-sm font-black tracking-tight">{t.time}</span>
                        {t.timeTe && (
                          <span className="text-muted-foreground text-xs mt-1 text-left sm:text-right font-sans opacity-85">{t.timeTe}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <section id="gallery" className="section-padding px-4 sm:px-4 bg-zinc-950 relative overflow-hidden">
        {/* Traditional background texture details */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
        
        <div className="container-custom relative z-10">
          <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Visual Journey</p>
            <h2 className="text-4xl font-bold text-white font-serif">
              Temple <span className="gold-shimmer italic">Gallery</span>
            </h2>
            <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px] sm:auto-rows-[300px]">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`${img.span} relative group cursor-pointer shadow-xl hover:shadow-[0_15px_30px_rgba(251,191,36,0.15)] transition-all duration-500 p-2.5 sm:p-3.5 rounded-[1.5rem] bg-amber-950/20 border border-primary/25 backdrop-blur-sm`}
                onClick={() => setHomeLightboxIndex(i)}
              >
                {/* Thin Inner Gold Border Frame */}
                <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden border border-primary/40">
                  <img
                    src={getOptimizedImageUrl(img.src, 600)}
                    alt={`Temple Gallery ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle warm overlay that fades on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent opacity-80 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shadow-md group"
            >
              <span>View Full Gallery</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60 group-hover:scale-150 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Homepage Lightbox / Full Screen Modal Viewer */}
      {homeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center transition-all duration-300">
          {/* Close button */}
          <button 
            onClick={() => setHomeLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg"
            aria-label="Close Lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Arrow */}
          <button 
            onClick={() => setHomeLightboxIndex((homeLightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/5 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg"
            aria-label="Previous Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Main Image Frame */}
          <div className="relative max-w-[90vw] max-h-[80vh] sm:max-h-[85vh] p-3 sm:p-4 bg-amber-950/30 border border-primary/40 rounded-2xl shadow-[0_0_50px_rgba(var(--primary),0.2)] flex items-center justify-center">
            <img 
              src={getOptimizedImageUrl(galleryImages[homeLightboxIndex].src, 1200)} 
              alt={`Temple Deity Darshan ${homeLightboxIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-primary/20"
            />
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => setHomeLightboxIndex((homeLightboxIndex + 1) % galleryImages.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/5 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all hover:scale-110 shadow-lg"
            aria-label="Next Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicator text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 glass-dark border border-primary/20 rounded-full text-primary font-bold tracking-widest text-xs">
            {homeLightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* ═══════ EVENTS ═══════ */}
      <section id="events" className="section-padding px-4 sm:px-4">
        <div className="container-custom">
          <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Sacred Calendar</p>
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
            <p className="text-muted-foreground max-w-4xl text-sm font-light leading-relaxed">
              Meet the devoted purohits, committee members, and volunteers who serve our temple with unconditional devotion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "D. V. V. Prasad Rao", role: "Assistant Commissioner & Executive Officer", img: prasadRao },
              { name: "Sri T. R. Cholan", role: "Founder Family Member", img: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779087514/DSC_5404_osvkzt.jpg" },
              { name: "Pandit P. Mohan Swamy", role: "Mukya Archaka", img: "https://res.cloudinary.com/ddmzgotdd/image/upload/v1779086840/DSC_5466_qteecl.jpg" },
            ].map((m) => (
              <div key={m.name} className="premium-card group hover:-translate-y-3">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={getOptimizedImageUrl(m.img, 600)} alt={m.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                    <span className="text-primary text-sm tracking-[0.3em] font-bold uppercase mb-2">Sacred Service</span>
                    <h4 className="text-white text-sm font-bold font-serif">{m.name}</h4>
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
        </div>
      </section>

      {/* ═══════ ASHTOTHRAM ═══════ */}
      <Ashtothram />

      <Panchangam />

      {/* ═══════ DONATIONS ═══════ */}
      <Donations />

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
            <p className="text-muted-foreground max-w-4xl text-sm font-light leading-relaxed">
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
                { icon: "💬", label: "WhatsApp", value: "+91 94910 00712" },
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
    </Layout>
  );
};

export default Index;
