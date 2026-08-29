import { useState } from "react";
import Layout from "@/components/Layout";
import { getOptimizedImageUrl } from "@/utils/cloudinary";
import { MapPin, Train, Plane, Sparkles, Languages } from "lucide-react";
import founderImage from "@/assets/rajeswaran.jpg";

const History = () => {
  const [lang, setLang] = useState<"en" | "te" | "hi">("en");

  // English history content
  const englishHistory = {
    title: "Temple History",
    subtitle: "A Divine Legacy of Faith and Protection",
    paragraphs: [
      "The temple is located in the compound of M/s. S.G. Sambandan & Co., Asilmetta and it was constructed by Late. S.G. Sambandan, Late T.S. Selvaganesan and Late T.S. Rajeswaran with their funds in the year 1962 for their worship and as well as their family members. During the course of time, Jalaries (local fishermen) used to offer prayers and perform Deeparadhana every day before going to the market for their daily business. Five years later the Paramacharya of Kanchi His Holiness Sri Chandrasekharendra Saraswathi reconsecrated the shrine by placing \"Ganapathi Yantram\" with his own hands.",
      "Sri Sampath Vinayakagar Temple came into prominence from 1971 when Admiral Krishnan, Eastern Naval Commander, broke 1001 coconuts before the Lord for saving Vizag from the Pakistani attack when its submarine Ghazi sank off the coast. Here, most of the new vehicles come to perform vehicle pooja in front of the presiding deity. Presently it is organized by Sri T.S. Rajeswaran, Founder Trustee, Sri T.R. Cholan and Sri T.S. Chezhian as founder family members.",
      "Sri Sampath Vinayakagar Temple has become one of the most famous temples in Visakhapatnam city attracting daily a number of devotees. Sri Sampath Vinayakagar is a powerful deity in Visakhapatnam. There is a staunch belief among the devotees that their sins are washed off and desires fulfilled by offering prayers to the Deity. Sri Sampath Vinayakagar Temple has constructed with its funds Sri Vijaya Vinayagar Temple in the compound of Old Age Home at Gandigundam Village.",
      "The temple has also donated a sum of Rs. 1.20 Crores to Sri Sitaramachandra Swamy Temple, Ambicabagh for construction of Rajagophuram and Prakaram.",
      "The temple is located very near, almost walking distance from the R.T.C. Complex and about 2 kms. from the Visakhapatnam railway station. Public conveyance is available to reach this temple from every nook and corner of Visakhapatnam city. Thus it is easily reachable and accessible to all devotees."
    ],
    reachTitle: "How to Reach Sri Sampath Vinayakagar Temple",
    reach: [
      { type: "RTC Complex", value: "Walkable distance / 1/2 km", icon: <MapPin className="text-primary" size={20} /> },
      { type: "Railway Station", value: "2 kms away", icon: <Train className="text-primary" size={20} /> },
      { type: "Airport", value: "16 kms away", icon: <Plane className="text-primary" size={20} /> }
    ],
    blessing: "If you have the Lord's grace, you have everything."
  };

  // Telugu history content
  const teluguHistory = {
    title: "ఆలయ చరిత్ర",
    subtitle: "భక్తి మరియు రక్షణ యొక్క దైవిక వారసత్వం",
    paragraphs: [
      "1962 వ సం॥లో విశాఖలోని ఆశీలుమెట్ట వద్ద ఉన్న మెసర్స్ యస్.జి. సంబంధన్ అండ్ కో వారి ఆవరణలో కీ॥శే॥ యస్.జి. సంబంధన్, కీ॥శే॥ టి.యస్. సెల్వగణేశన్ మరియు కీ॥శే॥ టి.యస్. రాజేశ్వరన్ గారి ఆధ్వర్యంలో వారి కుటుంబ సభ్యులచే శ్రీ సంపత్ వినాయగర్ స్వామివారి దేవాలయము స్థాపించబడినది. సమీప జాలరులు ప్రతిరోజు స్వామిని అర్చించి, నమస్కరించి వారి వృత్తి వ్యాపారములను మొదలు పెట్టెడివారు. 5 సం॥ల తరువాత కంచి పీఠాధిపతులు శ్రీశ్రీశ్రీ చంద్రశేఖర సరస్వతి వారి స్వహస్తములతో \"గణపతి యంత్రము\" స్థాపన చేసినారు. శ్రీ టి.యస్.రాజేశ్వరన్ గారు వ్యవస్థాపక ధర్మకర్తగా మరియు వంశపారంపర్య ధర్మకర్తలుగా శ్రీ టి.ఆర్. చోళన్, శ్రీ టి.యస్.చెజియన్ వ్యవహరించు చున్నారు.",
      "1971 లో ఇండియా, పాకిస్తాన్ యుద్ద సమయమున సముద్రంలో ఘాజి అను వారి సబ్మెరైన్పై విజయం సాధించిన సమయములో విశాఖను రక్షించినందుకు ఈస్ట్రన్ నేవల్ కమాండర్ శ్రీ అడ్మిరల్ క్రిష్ణన్ 1001 కొబ్బరికాయలు కొట్టి స్వామిని వేడుకొన్నారు. అప్పటి నుండి దేవాలయము మరింత ప్రసిద్ధిగాంచినది. ఈ దేవాలయములో చాలమంది భక్తులు తమయొక్క నూతన వాహనములను స్వామివారి ముందు పూజలు చేయించుకుంటారు. శ్రీ సంపత్ వినాయగర్ దేవాలయం యొక్క నిధులతో గండిగుండం గ్రామంలో నిర్మాణం గావించబడిన ఓల్డ్ ఏజ్ హోమ్ నందు శ్రీ విజయ వినాయగర్ దేవాలయం నిర్मించబడినది.",
      "శ్రీ సీతారామచంద్ర స్వామి దేవాలయం, అంబికాబాగ్ నకు శ్రీ సంపత్ వినాయగర్ దేవాలయ నిధుల నుండి సుమారు కోటి 20 లక్షల రూపాయలు రాజగోపురం మరియు ప్రాకారం నిర్మాణం కొరకు విరాళం చెల్లించుట జరిగినది.",
      "విశాఖలో బహుళ ప్రచారమే గాక భక్తుల పాప ప్రక్షాళనతోబాటు కోర్కెలు తీర్చు ప్రభువు గణాధుడుగా ప్రసిద్ధికెక్కిన దేవాలయము. అభిషేక, అలంకారములకు ఈ దేవాలయము ఏకైక ప్రత్యేకత. శ్రీ సంపత్ వినాయగర్ దేవాలయమునకు భక్తులు వేల సంఖ్యలో దర్శించుకొందురు. వినాయక చవితి ఉత్సవములలో 9 రోజులు స్వామివారికి 9 రకములైన అలంకారములతో అవతరింపజేయుట జరుగును. ఆలయ ప్రధాన అర్చకులు శ్రీ పి. మోహన్ స్వామి గురుక్కల్ వారిచే సంప్రదాయ రీతిలో నిత్యాభిషేకములు జరుగును. ఈ 9 రోజులు అన్న సంతర్పణ విరివిగా జరుపబడుటయే గాక సాయం సమయములందు ఆధ్యాత్మిక కార్యక్రమములు నిర్వహించబడును."
    ],
    reachTitle: "శ్రీ సంపత్ వినాయగర్ దేవాలయమును చేరుటకు",
    reach: [
      { type: "ఆర్.టి.సి. కాంప్లెక్స్ నుండి", value: "నడవగలిగే దూరం (1/2 కి.మీ.)", icon: <MapPin className="text-primary" size={20} /> },
      { type: "రైల్వే స్టేషన్ నుండి", value: "2 కిలోమీటర్లు", icon: <Train className="text-primary" size={20} /> },
      { type: "విమానాశ్రయ కేంద్రము నుండి", value: "16 కిలోమీటర్లు", icon: <Plane className="text-primary" size={20} /> }
    ],
    blessing: "స్వామి దయ ఉంటే అన్నీ ఉన్నట్లే"
  };

  // Hindi history content
  const hindiHistory = {
    title: "मंदिर का इतिहास",
    subtitle: "श्रद्धा और सुरक्षा की एक दिव्य विरासत",
    paragraphs: [
      "यह मंदिर असीलमेट्टा में मेसर्स एस.जी. सम्बन्धन एंड कंपनी के परिसर में स्थित है। इसका निर्माण स्वर्गीय एस.जी. सम्बन्धन, स्वर्गीय टी.एस. सेल्वागणेशन और स्वर्गीय टी.एस. राजेश्वरन द्वारा 1962 में उनके और उनके परिवार के सदस्यों की पूजा-अर्चना के लिए अपने स्वयं के धन से कराया गया था। समय बीतने के साथ, स्थानीय मछुआरे (जलारी) अपने दैनिक व्यवसाय के लिए बाजार जाने से पहले हर दिन यहाँ प्रार्थना करते थे और दीपाराधना करते थे। पांच साल बाद, कांची के पीठाधिपति परम पावन श्री चन्द्रशेखरेन्द्र सरस्वती ने अपने कर-कमलों से 'गणपति यंत्र' की स्थापना करके मंदिर की पुनर्प्रतिष्ठा की थी।",
      "श्री संपत विनायकगर मंदिर 1971 से अत्यधिक प्रमुखता में आया जब पूर्वी नौसेना कमान के एडमिरल कृष्णन ने पाकिस्तानी नौसैनिक हमले से विशाखापत्तनम को सुरक्षित बचाने के लिए भगवान के सामने 1001 नारियल तोड़े, जब पाकिस्तानी पनडुब्बी गाजी तट के पास डूब गई थी। यहाँ अधिकांश नए वाहन पीठासीन देवता के सामने वाहन पूजा करने के लिए आते हैं। वर्तमान में इसका संचालन संस्थापक ट्रस्टी श्री टी.एस. राजेश्वरन, संस्थापक परिवार के सदस्य श्री टी.आर. चोलन और श्री टी.एस. चेझियान द्वारा किया जाता है।",
      "श्री संपत विनायकगर मंदिर विशाखापत्तनम शहर के सबसे प्रसिद्ध मंदिरों में से एक बन गया है, जो दैनिक रूप से बड़ी संख्या में भक्तों को आकर्षित करता है। श्री संपत विनायकगर विशाखापत्तनम में एक अत्यंत शक्तिशाली देवता हैं। भक्तों में यह दृढ़ विश्वास है कि भगवान की पूजा करने से उनके पाप धुल जाते हैं और मनोकामनाएं पूरी होती हैं। श्री संपत विनायकगर मंदिर ने अपने स्वयं के धन से गंदीगुंडम गांव में ओल्ड एज होम के परिसर में श्री विजय विनायगर मंदिर का निर्माण कराया है।",
      "मंदिर ने राजगोपुरम और प्राकार के निर्माण के लिए अम्बिकाबाग स्थित श्री सीतारामचंद्र स्वामी मंदिर को 1.20 करोड़ रुपये की राशि भी दान में दी है।",
      "यह मंदिर आर.टी.सी. कॉम्प्लेक्स से बहुत पास, लगभग पैदल दूरी पर स्थित है और विशाखापत्तनम रेलवे स्टेशन से लगभग 2 किमी दूर है। विशाखापत्तनम शहर के हर कोने से इस मंदिर तक पहुँचने के लिए सार्वजनिक वाहन आसानी से उपलब्ध हैं। इस प्रकार यह सभी भक्तों के लिए आसानी से सुलभ और पहुँच योग्य है।"
    ],
    reachTitle: "श्री संपत विनायकगर मंदिर कैसे पहुँचें",
    reach: [
      { type: "आर.टी.सी. कॉम्प्लेक्स से", value: "पैदल दूरी (1/2 किमी)", icon: <MapPin className="text-primary" size={20} /> },
      { type: "रेलवे स्टेशन से", value: "2 किमी दूर", icon: <Train className="text-primary" size={20} /> },
      { type: "हवाई अड्डे से", value: "16 किमी दूर", icon: <Plane className="text-primary" size={20} /> }
    ],
    blessing: "यदि आप पर भगवान की कृपा है, तो आपके पास सब कुछ है।"
  };

  const getHistory = () => {
    if (lang === "en") return englishHistory;
    if (lang === "te") return teluguHistory;
    return hindiHistory;
  };

  const current = getHistory();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 relative overflow-hidden text-center bg-gradient-to-b from-[#1C1917] to-background border-b border-primary/15 animate-fade-rise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(38,72%,50%,0.05)_0,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 px-4">
          <p className="text-primary text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-black">🙏 Sri Sampath Vinayakagar</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-wide leading-tight">
            {lang === "en" ? "Temple History" : lang === "te" ? "ఆలయ చరిత్ర" : "मंदिर का इतिहास"}
          </h1>
          <div className="h-1 w-24 bg-primary/40 rounded-full mx-auto mt-4 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="text-stone-300 mt-4 max-w-xl mx-auto text-xs sm:text-sm font-serif italic">
            {lang === "en" ? "A Divine Legacy of Faith and Protection" : lang === "te" ? "భక్తి మరియు రక్షణ యొక్క దైవిక వారసత్వం" : "श्रद्धा और सुरक्षा की एक दिव्य विरासत"}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-20 px-4 bg-background relative overflow-hidden">
        {/* Sacred Traditional Ornament Pattern Background */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container-custom relative z-10">
          
          {/* Elegant Language Selector Panel */}
          <div className="flex justify-end mb-8 sm:mb-12">
            <div className="bg-gradient-to-b from-[#1C1917] to-[#000000] p-1.5 rounded-2xl border border-primary/35 shadow-xl flex items-center gap-1">
              <div className="p-2 text-primary flex items-center justify-center shrink-0">
                <Languages size={18} className="animate-pulse" />
              </div>
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-black tracking-widest transition-all duration-300 ${
                  lang === "en"
                    ? "bg-primary text-primary-foreground shadow-md scale-102"
                    : "text-white/60 hover:text-white"
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => setLang("te")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-black tracking-widest transition-all duration-300 ${
                  lang === "te"
                    ? "bg-primary text-primary-foreground shadow-md scale-102"
                    : "text-white/60 hover:text-white"
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-black tracking-widest transition-all duration-300 ${
                  lang === "hi"
                    ? "bg-primary text-primary-foreground shadow-md scale-102"
                    : "text-white/60 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* History Core Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left side: Premium Deity Circular Plaque (matches screenshot concept) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-28">
              <div className="relative group">
                 {/* Traditional Decorative Borders */}
                <div className="absolute -inset-3 border border-primary/20 rounded-3xl pointer-events-none" />
                <div className="absolute -inset-1.5 border-2 border-primary/10 rounded-3xl pointer-events-none" />
                
                {/* Deity Image Holder */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-[6px] border-white shadow-[0_15px_45px_rgba(0,0,0,0.3)] bg-gradient-to-b from-primary/10 to-primary/5">
                  <img
                    src={founderImage}
                    alt="Founder and Chairman SRI. T.S. RAJESWARAN"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1500ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-45" />
                </div>
              </div>
              
              <div className="text-center mt-6">
                <h3 className="font-serif text-lg font-bold text-foreground tracking-wide">
                  {lang === "en"
                    ? "SRI. T.S. RAJESWARAN"
                    : lang === "te"
                    ? "శ్రీ టి.యస్. రాజేశ్వరన్"
                    : "श्री टी.एस. राजेश्वरन"}
                </h3>
                <p className="text-primary text-xs uppercase tracking-[0.2em] font-bold mt-1">
                  {lang === "en"
                    ? "Founder & Chairman"
                    : lang === "te"
                    ? "వ్యవస్థాపకుడు & చైర్మన్"
                    : "संस्थापक एवं अध्यक्ष"}
                </p>
              </div>
            </div>

            {/* Right side: Detailed narrative paragraphs */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-foreground leading-tight flex items-center gap-3">
                  <Sparkles className="text-primary shrink-0 animate-bounce" size={24} />
                  {current.title}
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm tracking-widest uppercase mt-2 font-bold font-serif">
                  {current.subtitle}
                </p>
                <div className="h-1 w-20 bg-primary/40 rounded-full mt-4 shadow-sm" />
              </div>

              {/* Narrative Texts */}
              <div className="space-y-5 text-sm sm:text-base text-muted-foreground leading-loose font-light font-sans text-justify">
                {current.paragraphs.map((p, idx) => (
                  <p key={idx} className="indent-4 sm:indent-8 first:indent-0 hover:text-foreground transition-colors duration-300">
                    {p}
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* Reach details / Transportation Options */}
          <div className="mt-16 sm:mt-24 pt-12 border-t border-primary/25">
            <div className="text-center mb-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                {current.reachTitle}
              </h3>
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {current.reach.map((r, i) => (
                <div 
                  key={i} 
                  className="bg-[#1C1917]/[0.02] border border-primary/15 hover:border-primary/40 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {r.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{r.type}</span>
                    <span className="text-sm sm:text-base font-serif font-bold text-foreground mt-1 tracking-wide">{r.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spiritual Blessing Card / Traditional Footer */}
          <div className="mt-16 text-center">
            <div className="inline-block relative px-8 py-6 rounded-2xl bg-gradient-to-b from-[#1C1917] to-[#000000] border-2 border-primary/45 shadow-xl">
              {/* Ornate corners */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary/60 rounded-tl" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary/60 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary/60 rounded-bl" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary/60 rounded-br" />

              <p className="text-primary text-xl sm:text-2xl font-serif italic font-black tracking-widest animate-pulse px-4">
                {current.blessing} 🙏
              </p>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default History;
