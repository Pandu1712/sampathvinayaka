import { Flower2, Search } from "lucide-react";
import { useState } from "react";

const names = [
  { en: "Gajanana", te: "గజానన" },
  { en: "Ganadhyaksha", te: "గణాధ్యక్ష" },
  { en: "Vighnaraja", te: "విఘ్నరాజ" },
  { en: "Vinayaka", te: "వినాయక" },
  { en: "Dvaimatura", te: "ద్వైమాతుర" },
  { en: "Dwimukha", te: "ద్విముఖ" },
  { en: "Pramukha", te: "ప్రముఖ" },
  { en: "Sumukha", te: "సుముఖ" },
  { en: "Kriti", te: "కృతి" },
  { en: "Supradipa", te: "సుప్రదీప" },
  { en: "Sukhanidhi", te: "సుఖనిధి" },
  { en: "Suradhyaksha", te: "సురాధ్యక్ష" },
  { en: "Surarighna", te: "సురారిఘ్న" },
  { en: "Mahaganapati", te: "మహా గణపతి" },
  { en: "Manya", te: "మాన్య" },
  { en: "Mahakala", te: "మహాకాల" },
  { en: "Mahabala", te: "మహాబల" },
  { en: "Heramba", te: "హేరంబ" },
  { en: "Lambajathara", te: "లంబజఠర" },
  { en: "Haswagriva", te: "హ్రస్వగ్రీవ" },
  { en: "Mahodara", te: "మహోదర" },
  { en: "Madotkata", te: "మదోత్కట" },
  { en: "Mahavira", te: "మహావీర" },
  { en: "Mantrine", te: "మంత్రిణే" },
  { en: "Mangala Swarupa", te: "మంగళ స్వరూప" },
  { en: "Pramadha", te: "ప్రమధ" },
  { en: "Prathama", te: "ప్రథమ" },
  { en: "Prajna", te: "ప్రజ్ఞ" },
  { en: "Vighnakarta", te: "విఘ్నకర్త" },
  { en: "Vighnaharta", te: "విఘ్నహర్త" },
  { en: "Vishwanetra", te: "విశ్వనేత్ర" },
  { en: "Viratpati", te: "విరాట్ పతి" },
  { en: "Shripati", te: "శ్రీపతి" },
  { en: "Vakpati", te: "వాక్పతి" },
  { en: "Shringarin", te: "శృంగారిన్" },
  { en: "Ashritavatsala", te: "ఆశ్రితవత్సల" },
  { en: "Shivapriya", te: "శివప్రియ" },
  { en: "Shighrakarina", te: "శీఘ్రకారిణ" },
  { en: "Shashwata", te: "శాశ్వత" },
  { en: "Bala", te: "బాలా" },
  { en: "Balotthitaya", te: "బలోత్థితాయ" },
  { en: "Bhavatmajaya", te: "భవాత్మజాయ" },
  { en: "Purana Purusha", te: "పురాణ పురుష" },
  { en: "Pushne", te: "పూష్ణే" },
  { en: "Pushkarotshipta Varine", te: "పుష్కరోక్షిప్త వారిణే" },
  { en: "Agraganyaya", te: "అగ్రగణ్యాయ" },
  { en: "Agrapujyaya", te: "అగ్రపూజ్యాయ" },
  { en: "Agragamine", te: "అగ్రగామినే" },
  { en: "Mantrakrite", te: "మంత్రకృతే" },
  { en: "Chamikaraprabhaya", te: "చమీకరప్రభాయ" },
  { en: "Sarvaya", te: "సర్వాయ" },
  { en: "Sarvopasyaya", te: "సర్వోపాస్యాయ" },
  { en: "Sarvakartre", te: "సర్వకర్త్రే" },
  { en: "Sarvanetre", te: "సర్వనేత్రే" },
  { en: "Sarvasiddhipradaya", te: "సర్వసిద్ధిప్రదాయ" },
  { en: "Siddhaye", te: "సిద్ధయే" },
  { en: "Panchahastaya", te: "పంచహస్తాయ" },
  { en: "Parvatinandanaya", te: "పార్వతీనందనాయ" },
  { en: "Prabhave", te: "ప్రభవే" },
  { en: "Kumaragurave", te: "కుమారగురవే" },
  { en: "Akshobhyaya", te: "అక్షోభ్యాయ" },
  { en: "Aprakrita Parakramaya", te: "అప్రాకృత పరాక్రమాయ" },
  { en: "Satyadharmine", te: "సత్యధర్మిణే" },
  { en: "Sakhaye", te: "సఖయే" },
  { en: "Sarasambunidhaye", te: "సరసంబునిధయే" },
  { en: "Maheshaya", te: "మహేశాయ" },
  { en: "Divyangaya", te: "దివ్యాంగాయ" },
  { en: "Manikinkini Mekhalaya", te: "మణికించిణీ మేఖలాయ" },
  { en: "Samasta Devata Murtaye", te: "సమస్త దేవతా మూర్తయే" },
  { en: "Sahishnave", te: "సహిష్ణవే" },
  { en: "Satatotthitaya", te: "సతతోత్థితాయ" },
  { en: "Vighatakarine", te: "విఘాతకారిణే" },
  { en: "Vishwagdrishe", te: "విశ్వదృశే" },
  { en: "Vishwarakshakrite", te: "విశ్వరక్షకృతే" },
  { en: "Kalyanaguru", te: "కళ్యాణగురు" },
  { en: "Unmattaya", te: "ఉన్మత్తాయ" },
  { en: "Aparajita", te: "అపరాజిత" },
  { en: "Nityaya", te: "నిత్యాయ" },
  { en: "Sasanghata", te: "ససంఘాత" },
  { en: "Vidhaye", te: "విధయే" },
  { en: "Vishwadhara", te: "విశ్వధర" },
  { en: "Divya", te: "దివ్య" },
  { en: "Visargasthaya", te: "విసర్గస్థాయ" },
  { en: "Kashtahartre", te: "కష్టహర్త్రే" },
  { en: "Parashurama", te: "పరశురామ" },
  { en: "Vanapradaya", te: "వనప్రదాయ" },
  { en: "Sarvavighna Hartre", te: "సర్వవిఘ్నహర్త్రే" },
  { en: "Panchapapa Vinashana", te: "పంచపాప వినాశన" },
  { en: "Ekadantaya", te: "ఏకదంతాయ" },
  { en: "Lambodaraya", te: "లంబోదరాయ" },
  { en: "Shurpakarnaya", te: "శూర్పకర్ణాయ" },
  { en: "Gajananaya", te: "గజాననాయ" },
  { en: "Guhagrajaya", te: "గుహాగ్రజాయ" },
  { en: "Siddhivinayakaya", te: "సిద్ధి వినాయకాయ" },
  { en: "Surasevitaya", te: "సుర సేవితాయ" },
  { en: "Kapiltanave", te: "కపిలతానవే" },
  { en: "Shaktisutaya", te: "శక్తిసుతాయ" },
  { en: "Ganadhipaya", te: "గణాధిపాయ" },
  { en: "Aksharamurtaye", te: "అక్షరమూర్తయే" },
  { en: "Varapradaya", te: "వరప్రదాయ" },
  { en: "Vachaspataye", te: "వాచస్పతయే" },
  { en: "Shrutinutaya", te: "శ్రుతినుతాయ" },
  { en: "Bhaktavatsalaya", te: "భక్తవత్సలాయ" },
  { en: "Shivanandanaya", te: "శివనందనాయ" },
  { en: "Siddhipradaya", te: "సిద్ధిప్రదాయ" },
  { en: "Buddhipradaya", te: "బుద్ధిప్రదాయ" },
  { en: "Avighnaya", te: "అవిఘ్నాయ" },
  { en: "Sarvaya", te: "సర్వాయ" },
];

const Ashtothram = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNames = names.filter(
    (n) =>
      n.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.te.includes(searchTerm)
  );

  return (
    <section id="ashtotram" className="section-padding px-4 sm:px-4 bg-primary/[0.01]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Divine Chants</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif leading-tight">
              Ganesha <span className="gold-shimmer italic">Ashtothram</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            <p className="text-muted-foreground mt-6 max-w-xl text-sm font-light leading-relaxed">
              The Ganesha Ashtottara Sata Namavali consists of the 108 names of Lord Ganesha. Each name represents a unique attribute and divine power of the elephant-headed deity.
            </p>
          </div>

          <div className="relative group w-full md:w-80 animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:0.3s]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-serif italic"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar p-1">
          {filteredNames.map((n, i) => (
            <div 
              key={i} 
              className="premium-card p-6 flex items-center gap-5 group hover:-translate-y-1 transition-all duration-300 border border-primary/5 hover:border-primary/20 hover:shadow-xl group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary text-xs font-black shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-foreground font-serif tracking-tight truncate group-hover:text-primary transition-colors">
                  Om {n.en} Namah
                </div>
                <div className="text-xs text-muted-foreground font-sans mt-0.5 truncate opacity-80 group-hover:opacity-100 transition-opacity">
                   ఓం {n.te} నమః
                </div>
              </div>
              <Flower2 className="text-primary/10 group-hover:text-primary/30 transition-colors shrink-0" size={16} />
            </div>
          ))}
          {filteredNames.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-40 italic">
              No matching names found. 🙏
            </div>
          )}
        </div>

        <div className="mt-12 text-center animate-fade-rise opacity-0 [animation-fill-mode:forwards] [animation-delay:0.6s]">
          <div className="inline-block p-6 rounded-[2rem] glass border border-white/40 shadow-inner">
            <p className="text-primary text-xl font-serif italic font-bold">
              "Om Gam Ganapataye Namaha"
            </p>
            <p className="text-muted-foreground text-xs mt-2 uppercase tracking-[0.2em]">Chant with devotion for prosperity and wisdom</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ashtothram;
