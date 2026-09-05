import { useState } from "react";
import { 
  FileText, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  Phone, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Eye,
  X
} from "lucide-react";

interface TenderSectionProps {
  embedded?: boolean;
  className?: string;
}

export const tenderItems = [
  {
    id: "01",
    titleTe: "పడితరం, ప్రసాదం, రసవర్గముల సరఫరా",
    titleEn: "Supply of Paditharam, Prasadam & Rasavargamul (Provisions & Ingredients)",
    durationTe: "సెప్టెంబర్ నెల నుండి 31-03-2027 వరకు (7 నెలల కాలమునకు)",
    durationEn: "September 2026 to 31-03-2027 (Period of 7 Months)",
    emd: "₹50,000/-",
    scheduleFee: "₹2,000/-",
    category: "Temple Pooja & Prasadam Supplies",
    categoryTe: "పూజా & ప్రసాద రసవర్గములు",
    badge: "Tender Item 01",
  },
  {
    id: "02",
    titleTe: "అన్నప్రసాద వితరణ కొరకు రసవర్గముల సరఫరా",
    titleEn: "Supply of Rasavargamul (Ingredients & Groceries) for Annaprasadam Distribution",
    durationTe: "సెప్టెంబర్ నెల నుండి 31-03-2027 వరకు (7 నెలల కాలమునకు)",
    durationEn: "September 2026 to 31-03-2027 (Period of 7 Months)",
    emd: "₹50,000/-",
    scheduleFee: "₹2,000/-",
    category: "Annadanam Daily Food Distribution Supplies",
    categoryTe: "నిత్య అన్నప్రసాద వితరణ సరుకులు",
    badge: "Tender Item 02",
  }
];

export const tenderTermsTe = [
  {
    num: "1",
    title: "టెండరు షెడ్యూల్స్ పొందు విధానం & తేదీలు (Schedule Issue Dates)",
    text: "పైన పేర్కొన్న రెండు టెండరు షెడ్యూల్స్ తేది 06-09-2026 ఉదయం 10.00 నుండి తేది 21-9-2026 సాయంత్రం 4.00 గం.ల వరకు దేవస్థానం కార్యాలయం నందు టెండర్ షెడ్యూళ్లు ధర చెల్లించి పొందగలరు.",
    highlight: "రేపటి నుండి (06-09-2026 10:00 AM) షెడ్యూల్స్ జారీ ప్రారంభం!"
  },
  {
    num: "2",
    title: "సీల్డు టెండర్ల సమర్పణ & తెరుచు సమయం (Submission & Opening)",
    text: "సీల్డు టెండర్లు తేది 24-9-2026 ఉదయం 10.00 గంటల నుండి మధ్యాహ్నం 2.00 గం.ల వరకు స్వీకరించబడి అదే రోజు సాయంత్రం 3.00 గం॥లకు హాజరైన టెండరుదారుల సమక్షములో తెరవబడును.",
    highlight: "24-09-2026 మధ్యాహ్నం 2:00 PM లోపు టెండరు బాక్స్‌లో సమర్పించాలి."
  },
  {
    num: "3",
    title: "ఇ-ప్రొక్యూర్మెంట్ ద్వారా పిలుపు (e-Procurement Portal)",
    text: "శ్రీ సంపత్ వినాయగర్ ఆలయమునకు కావలసిన రసవర్గములకు, పడితరం, ప్రసాదం, అన్నదాన సప్లై చేయు కొరకు ఈ టెండర్ e.www.ap.eprocurement.gov.in ద్వారా టెండర్లు పిలవడమైనది.",
    highlight: "అధికారిక పోర్టల్: e.www.ap.eprocurement.gov.in"
  },
  {
    num: "4",
    title: "డి.డి (Demand Draft) సమర్పణ నిబంధన",
    text: "సీరియల్ నెం. 1 నుండి 2 వరకు ఉన్న టెండర్ షెడ్యూల్ తో పాటు టెండరుదారుడు ప్రథమధరావత్తు (రూ. 50,000/-) తో పాటు మరియు షెడ్యూల్ ధర (రూ. 2,000/-) కూడా డి.డి. రూపంలో 'శ్రీ సంపత్ వినాయగర్ టెంపుల్ ట్రస్ట్' వారి పేరున ఏదైనా జాతీయ బ్యాంకు నుండి తీసి టెండర్ కు జత పరచవలెను.",
    highlight: "DD in favor of: Sri Sampath Vinayagar Temple Trust (Nationalized Bank)"
  },
  {
    num: "5",
    title: "సామగ్రి నాణ్యత & టెండర్ బాక్స్ దాఖలు నిబంధన",
    text: "రసవర్గాలు ఏ సామాగ్రీ అయిన దేవస్థానం వారు కోరిన విధంగా సరఫరా చేయవలెను. పూర్తి చేసిన టెండరు షెడ్యూల్ను తేది: 24-09-2026 ఉదయం 10:00 గం॥ల నుండి మధ్యాహ్నం 2:00 గం॥ల వరకు స్వీకరించబడును (టెండరు బాక్స్ నందు సీల్డు కవరు వేయవలెను). అదే రోజు సాయంత్రం 03:00 గం॥లకు హాజరయిన టెండరుదారుల సమక్షంలో తెరువబడును.",
  },
  {
    num: "6",
    title: "జి.యస్.టి (GST) రిజిస్ట్రేషన్ అర్హత",
    text: "ప్రతి టెండరుదారుడు ప్రభుత్వ వాణిజ్య పన్నుల శాఖ (జి.యస్.టి / GST) వారిచే గుర్తింపు పొందిన ధృవీకరణ పత్రాలను జతపరచిన సరఫరాదారులు మాత్రమే అర్హులు.",
    highlight: "చెల్లుబాటు అయ్యే GST రిజిస్ట్రేషన్ సర్టిఫికేట్ తప్పనిసరి."
  },
  {
    num: "7",
    title: "7 నెలల కాలపరిమితి & ధరల స్థిరత్వం",
    text: "పై టెండరు ప్రకటన ప్రకారం 7 నెలలకు అనగా తేది: సెప్టెంబర్ 2026 నుండి 31-03-2027 వరకు పై సూచించిన ధరలకు అంచనా పరిమాణము కన్నా ఎక్కువ లేదా తక్కువ అవసరమైనా గాని అదే ధరకు సరఫరా చేయవలెను.",
  },
  {
    num: "8",
    title: "శాంపిల్స్ (Samples) తప్పనిసరి సమర్పణ",
    text: "ప్రతి టెండరుదారుడు టెండరులు తెరుచు సమయంలో విధిగా శాంపిల్స్ (Samples) సమర్పించవలెను. అలా సమర్పించని టెండర్లు నిరాకరించబడును.",
  },
  {
    num: "9",
    title: "ఆలయం సూచించిన బ్రాండ్ సరుకులు మాత్రమే",
    text: "సరఫరాదారుడు విధిగా పై దేవస్థానము వారు కోరిన బ్రాండ్ సరుకులనే సరఫరా చేయవలెను. వాటికి ధరలు స్పష్టంగా సూచించవలెను.",
  },
  {
    num: "10",
    title: "అన్ని పన్నులు & రవాణా ఖర్చులు చేరిక",
    text: "టెండరుదారుడు అన్ని రకాల పన్నులు మరియు రవాణా, లోడింగ్/అన్‌లోడింగ్ ఖర్చులతో సహా ధర సూచించవలెను.",
  },
  {
    num: "11",
    title: "కార్యనిర్వహణాధికారి వారి తుది నిర్ణయాధికారం",
    text: "ఏ కారణము తెలుపకనే టెండరును ఆమోదించుటకు గాని, తిరస్కరించుటకు గాని, తక్కువ టెండరుదారునికి బదులు మరొకరిని ఎన్నుకొను పూర్తి అధికారం కార్యనిర్వహణాధికారి (Executive Officer) వారికి కలదు.",
  },
  {
    num: "12",
    title: "పరిమాణం/నాణ్యత లోపం పై అపరాధ రుసుము & రద్దు",
    text: "టెండరుదారుడు దేవస్థానమునకు సరఫరా చేయు సామగ్రీ పరిమాణంలో తేడా వచ్చిన యెడల సదరు టెండరుదారుని యొక్క ప్రథమ ధరావత్తు (EMD) అపరాధ రుసుముగా జమకట్టి సదరు టెండరు రద్దుపరచబడును. అందువలన కలిగిన నష్టమును టెండరుదారు నుండి వసూలు చేయబడును.",
  },
  {
    num: "13",
    title: "బయట కొనుగోలు నష్ట పరిహార వసూలు",
    text: "అంతయే గాక సరఫరా చేయని సామగ్రీని దేవస్థానం వారు మరోచోట బహిరంగ మార్కెట్లో కొనుగోలు చేయడం ద్వారా వచ్చిన నష్టమును కూడా టెండరుదారుని నుండి చట్టబద్ధంగా వసూలు చేయబడును.",
  }
];

export const tenderTermsEn = [
  {
    num: "1",
    title: "Tender Schedule Issue Mode & Dates",
    text: "The tender schedules for both items can be obtained from the Temple Office by paying the tender schedule fee from 06-09-2026 (10:00 AM) to 21-09-2026 (4:00 PM).",
    highlight: "Schedules open tomorrow: 06-09-2026 at 10:00 AM!"
  },
  {
    num: "2",
    title: "Submission of Sealed Tenders & Bid Opening",
    text: "Sealed tenders will be accepted on 24-09-2026 from 10:00 AM to 2:00 PM and will be opened on the same day at 3:00 PM in the presence of attending tenderers/bidders.",
    highlight: "Submission Deadline: 24-09-2026 between 10:00 AM & 2:00 PM"
  },
  {
    num: "3",
    title: "Call via Government e-Procurement Portal",
    text: "Tenders are invited through the official Andhra Pradesh e-Procurement domain e.www.ap.eprocurement.gov.in for the supply of Paditharam, Prasadam, Rasavargamul and Annadanam provisions.",
    highlight: "Official Portal: e.www.ap.eprocurement.gov.in"
  },
  {
    num: "4",
    title: "Demand Draft (DD) & EMD Requirements",
    text: "For Serial Nos. 1 & 2, the tenderer must enclose EMD (₹50,000/-) and Schedule Fee (₹2,000/-) via Demand Draft (DD) drawn in favor of 'Sri Sampath Vinayagar Temple Trust' from any Nationalized Bank.",
    highlight: "DD in favor of: Sri Sampath Vinayagar Temple Trust"
  },
  {
    num: "5",
    title: "Specification Quality & Tender Box Submission",
    text: "Supplies must strictly adhere to the quality and brands requested by the Devasthanam. Completed tender schedules must be deposited in the sealed Tender Box at the Temple on 24-09-2026 between 10:00 AM and 2:00 PM, opened at 3:00 PM.",
  },
  {
    num: "6",
    title: "Mandatory GST Registration",
    text: "Only suppliers holding valid registration certificates issued by the Government Commercial Taxes Department (GST) are eligible to participate.",
    highlight: "Valid GST Registration Certificate is mandatory."
  },
  {
    num: "7",
    title: "7-Month Contract Duration & Price Stability",
    text: "The contract is valid for 7 months from September 2026 to 31-03-2027. The quoted rates shall remain fixed and valid even if the estimated quantity increases or decreases as per temple requirements.",
  },
  {
    num: "8",
    title: "Mandatory Sample Submission",
    text: "Every tenderer must mandatorily present physical samples of the provisions at the time of tender opening. Tenders without submitted samples will be summarily rejected.",
  },
  {
    num: "9",
    title: "Specific High-Grade Brands",
    text: "Suppliers must supply only the specific reputed brands designated by the Devasthanam, quoting clear competitive prices.",
  },
  {
    num: "10",
    title: "Inclusive Price Quotation",
    text: "All quoted prices must be all-inclusive, covering applicable taxes, transport, handling, loading, and unloading up to the temple premises.",
  },
  {
    num: "11",
    title: "Discretionary Authority of Executive Officer",
    text: "The Executive Officer reserves the right to accept, reject, or select any tender or tenderer without assigning any reason whatsoever.",
  },
  {
    num: "12",
    title: "Penalties for Deficit Supply & Forfeiture",
    text: "In case of deficit quantity or inferior quality, the EMD will be forfeited as penalty and the tender will be cancelled. Resulting financial losses will be recovered from the supplier.",
  },
  {
    num: "13",
    title: "Loss Recovery for Open Market Purchases",
    text: "Furthermore, if non-supplied provisions are purchased by the temple from the open market, any excess cost or loss will be recovered directly from the defaulting tenderer.",
  }
];

const TenderSection = ({ embedded = false, className = "" }: TenderSectionProps) => {
  const [lang, setLang] = useState<"te" | "en">("en");
  const [activeItemTab, setActiveItemTab] = useState<string>("01");
  const [showAllTerms, setShowAllTerms] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const termsList = lang === "te" ? tenderTermsTe : tenderTermsEn;
  const displayedTerms = showAllTerms ? termsList : termsList.slice(0, 5);

  return (
    <div id="tender-details" className={`relative ${className}`}>
      {/* ─── Urgent Announcement Banner ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2A0808] via-[#1F0A0A] to-[#2A0808] border-2 border-amber-500/40 shadow-2xl p-6 sm:p-8 mb-10 group">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <Sparkles className="text-amber-400 animate-pulse" size={28} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-[11px] font-black tracking-widest uppercase animate-pulse">
                  ⚡ {lang === "te" ? "కొత్త నోటిఫికేషన్" : "New Notification"}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                  {lang === "te" ? "ఆర్.సి. నెం. 16(2)/2026" : "Rc. No. 16(2)/2026"} (05-09-2026)
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white leading-snug">
                {lang === "te" 
                  ? "శ్రీ సంపత్ వినాయగర్ దేవస్థానం ఇ-ప్రొక్యూర్మెంట్ టెండర్ ప్రకటన - 2026" 
                  : "Sri Sampath Vinayagar Devasthanam e-Procurement Tender Notification - 2026"}
              </h3>
              <p className="text-amber-200/80 text-xs sm:text-sm mt-1 max-w-2xl font-light">
                {lang === "te"
                  ? "టెండరు షెడ్యూల్స్ జారీ ప్రారంభ తేదీ: తేది 06-09-2026 (రేపటి నుండి ఉదయం 10:00 గం.లకు). అధికారిక పోర్టల్ e.www.ap.eprocurement.gov.in ద్వారా ఆహ్వానించడమైనది."
                  : "Tender Schedules Issue Opening Date: 06-09-2026 (Tomorrow at 10:00 AM). Invited via Government Portal e.www.ap.eprocurement.gov.in."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 font-serif"
            >
              <Eye size={16} />
              <span>{lang === "te" ? "అసలు నోటీస్ చూడండి" : "View Notice"}</span>
            </button>
            <a
              href="/Sri-Sampath-Tender-Notice-2026.pdf"
              download="Sri-Sampath-Tender-Notice-2026.pdf"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2 font-serif"
            >
              <Download size={16} />
              <span>{lang === "te" ? "PDF డౌన్‌లోడ్" : "Download PDF"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="glass p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] border border-white/40 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-gradient-to-b from-primary/10 to-transparent blur-3xl pointer-events-none" />

        {/* ─── Header & Controls ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-primary/15 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs tracking-[0.3em] font-bold uppercase mb-2">
              <Building2 size={16} className="text-primary" />
              <span>{lang === "te" ? "ఆశీలు మెట్ట, విశాఖపట్నం" : "Asilmetta, Visakhapatnam"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-foreground">
              {lang === "te" ? (
                <>ఇప్రొక్యూర్మెంట్ <span className="gold-shimmer italic">టెండర్ ప్రకటన</span></>
              ) : (
                <>e-Procurement <span className="gold-shimmer italic">Tender Notice</span></>
              )}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-light">
              {lang === "te"
                ? "ఆర్.సి. నెం. 16(2)/2026 | కాలపరిమితి: సెప్టెంబర్ 2026 నుండి 31-03-2027 (7 నెలల కాలమునకు)"
                : "Rc. No. 16(2)/2026 | Contract Period: September 2026 to 31-03-2027 (7 Months)"}
            </p>
          </div>

          {/* Language Switcher: English (Default) & Telugu */}
          <div className="bg-gradient-to-b from-[#1C1917] to-[#000000] p-1.5 rounded-2xl border border-primary/35 shadow-lg flex items-center gap-1.5 self-start sm:self-center shrink-0">
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 rounded-xl text-xs font-serif font-black tracking-wider transition-all duration-300 ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-md scale-102"
                  : "text-white/60 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("te")}
              className={`px-4 py-2 rounded-xl text-xs font-serif font-black tracking-wider transition-all duration-300 ${
                lang === "te"
                  ? "bg-primary text-primary-foreground shadow-md scale-102"
                  : "text-white/60 hover:text-white"
              }`}
            >
              తెలుగు (Telugu)
            </button>
          </div>
        </div>

        {/* ─── Key Dates Timeline Stepper ─── */}
        <div className="my-8 relative z-10">
          <h3 className="text-xs uppercase tracking-[0.25em] font-black text-primary mb-4 flex items-center gap-2">
            <Calendar size={16} />
            <span>{lang === "te" ? "ముఖ్యమైన తేదీల కాలపట్టిక (Important Dates)" : "Critical Timeline & Dates"}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex flex-col justify-between gap-3 shadow-md relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-black text-[9px] uppercase tracking-wider">
                {lang === "te" ? "రేపటి నుండి!" : "Tomorrow!"}
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500 flex items-center gap-1.5">
                  <Clock size={12} /> {lang === "te" ? "స్టెప్ 1: షెడ్యూల్స్ ప్రారంభం" : "Step 1: Schedules Open"}
                </span>
                <h4 className="text-lg font-black text-foreground font-serif mt-1">06-09-2026</h4>
                <p className="text-xs text-muted-foreground mt-0.5">10:00 AM {lang === "te" ? "నుండి దేవస్థానం కార్యాలయంలో" : "at Temple Office"}</p>
              </div>
              <div className="text-[11px] font-medium text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                {lang === "te" ? "టెండర్ షెడ్యూల్స్ ఖరీదు చెల్లించి పొందవచ్చు" : "Obtain schedules by paying fee"}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 flex flex-col justify-between gap-3 shadow-sm group hover:scale-[1.02] transition-transform">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                  <Clock size={12} /> {lang === "te" ? "స్టెప్ 2: షెడ్యూల్స్ ముగింపు" : "Step 2: Schedules Close"}
                </span>
                <h4 className="text-lg font-black text-foreground font-serif mt-1">21-09-2026</h4>
                <p className="text-xs text-muted-foreground mt-0.5">4:00 PM {lang === "te" ? "వరకు మాత్రమే" : "Cutoff time"}</p>
              </div>
              <div className="text-[11px] font-medium text-muted-foreground bg-muted/40 p-2 rounded-lg">
                {lang === "te" ? "టెండర్ ఫారాల జారీ చివరి సమయం" : "Last date to obtain schedule"}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 flex flex-col justify-between gap-3 shadow-sm group hover:scale-[1.02] transition-transform">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-primary flex items-center gap-1.5">
                  <FileText size={12} /> {lang === "te" ? "స్టెప్ 3: టెండర్ల దాఖలు" : "Step 3: Tender Submission"}
                </span>
                <h4 className="text-lg font-black text-foreground font-serif mt-1">24-09-2026</h4>
                <p className="text-xs text-muted-foreground mt-0.5">10:00 AM – 2:00 PM</p>
              </div>
              <div className="text-[11px] font-medium text-muted-foreground bg-muted/40 p-2 rounded-lg">
                {lang === "te" ? "సీల్డు కవరును టెండరు బాక్స్‌లో వేయాలి" : "Deposit in sealed Tender Box"}
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-green-500/10 border border-green-500/30 flex flex-col justify-between gap-3 shadow-sm group hover:scale-[1.02] transition-transform">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-green-500 flex items-center gap-1.5">
                  <CheckCircle2 size={12} /> {lang === "te" ? "స్టెప్ 4: టెండర్లు తెరుచు సమయం" : "Step 4: Bid Opening"}
                </span>
                <h4 className="text-lg font-black text-foreground font-serif mt-1">24-09-2026</h4>
                <p className="text-xs text-muted-foreground mt-0.5">3:00 PM {lang === "te" ? "సాయంత్రం" : "Evening"}</p>
              </div>
              <div className="text-[11px] font-medium text-green-300 bg-green-950/40 p-2 rounded-lg border border-green-500/20">
                {lang === "te" ? "టెండరుదారుల సమక్షములో తెరువబడును" : "Opened before bidders"}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Official Domain / Government Portal Box ─── */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-background to-blue-950/40 border border-blue-500/30 shadow-md my-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Globe className="text-blue-400" size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                {lang === "te" ? "అధికారిక ఇ-ప్రొక్యూర్మెంట్ పోర్టల్" : "Official e-Procurement Portal"}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
                e.www.ap.eprocurement.gov.in
              </h4>
              <p className="text-xs text-stone-300/80 mt-0.5">
                {lang === "te"
                  ? "శ్రీ సంపత్ వినాయగర్ దేవస్థాన రసవర్గముల సప్లై కొరకు ప్రభుత్వ ఇ-ప్రొక్యూర్మెంట్ ద్వారా పిలువబడిన టెండర్లు."
                  : "Official Andhra Pradesh Government e-Procurement portal designated for Sri Sampath Vinayagar Devasthanam tenders."}
              </p>
            </div>
          </div>

          <a
            href="https://tender.apeprocurement.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-md transition-all active:scale-95"
          >
            <span>{lang === "te" ? "పోర్టల్ ఓపెన్ చేయండి" : "Visit Portal"}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* ─── Tender Items Table / Cards ─── */}
        <div className="my-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-black text-primary flex items-center gap-2">
              <FileText size={16} />
              <span>{lang === "te" ? "టెండర్ ఐటెమ్స్ & వివరములు" : "Tender Schedules & Categories"}</span>
            </h3>

            {/* Item switcher pills */}
            <div className="flex items-center gap-2">
              {tenderItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() => setActiveItemTab(it.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-serif transition-all ${
                    activeItemTab === it.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Item {it.id}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tenderItems.map((item) => {
              const isSelected = activeItemTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItemTab(item.id)}
                  className={`p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between gap-6 ${
                    isSelected
                      ? "bg-gradient-to-b from-primary/[0.08] to-background border-primary shadow-xl scale-[1.01]"
                      : "bg-card/70 border-border/70 hover:border-primary/40 hover:bg-card shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-3">
                        {item.badge}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold font-serif text-foreground leading-snug">
                        {lang === "te" ? item.titleTe : item.titleEn}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-2 font-light">
                        {lang === "te" ? item.categoryTe : item.category}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-background border border-primary/20 flex flex-col items-center justify-center shrink-0 shadow-inner">
                      <span className="text-[10px] text-muted-foreground uppercase font-black">No.</span>
                      <span className="text-lg font-black text-primary leading-none">{item.id}</span>
                    </div>
                  </div>

                  {/* Financial & Duration Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-border/60">
                    <div className="p-3 rounded-xl bg-background/80 border border-border/60">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                        {lang === "te" ? "ప్రథమ ధరావత్తు (EMD)" : "EMD Deposit"}
                      </span>
                      <span className="text-base sm:text-lg font-black text-primary mt-0.5 block">{item.emd}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-background/80 border border-border/60">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                        {lang === "te" ? "షెడ్యూలు ఖరీదు" : "Schedule Fee"}
                      </span>
                      <span className="text-base sm:text-lg font-black text-foreground mt-0.5 block">{item.scheduleFee}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-background/80 border border-border/60 col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                        {lang === "te" ? "కాలపరిమితి" : "Duration"}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground mt-1 block">7 {lang === "te" ? "నెలలు (31-03-2027)" : "Months (till 31-03-2027)"}</span>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-light bg-muted/30 p-2.5 rounded-xl">
                    <ShieldCheck size={14} className="text-green-500 shrink-0" />
                    <span>{lang === "te" ? "డీడీ: 'శ్రీ సంపత్ వినాయగర్ టెంపుల్ ట్రస్ట్' పేరిట జతపరచాలి" : "DD in favor of: Sri Sampath Vinayagar Temple Trust"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Terms & Conditions Section ─── */}
        <div className="my-8 pt-8 border-t border-primary/15 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-foreground flex items-center gap-2">
                <AlertCircle className="text-primary" size={22} />
                <span>{lang === "te" ? "టెండర్ ముఖ్య నిబంధనలు & షరతులు (13 అంశాలు)" : "Tender Terms & Conditions (13 Key Clauses)"}</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-1 font-light">
                {lang === "te" ? "టెండరుదారులు విధిగా పాటించవలసిన సమగ్ర నిబంధనలు" : "Mandatory operational guidelines and legal conditions for all bidders"}
              </p>
            </div>

            <button
              onClick={() => setShowAllTerms(!showAllTerms)}
              className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-bold font-serif flex items-center gap-2 self-start sm:self-center transition-all"
            >
              <span>{showAllTerms ? (lang === "te" ? "తక్కువగా చూపు" : "Show Fewer") : (lang === "te" ? "అన్ని 13 షరతులు చూడండి" : "View All 13 Conditions")}</span>
              {showAllTerms ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          <div className="space-y-3">
            {displayedTerms.map((term) => (
              <div 
                key={term.num}
                className="p-4 sm:p-5 rounded-2xl bg-card/60 border border-border/70 hover:border-primary/30 transition-all flex items-start gap-4 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-xs font-black text-primary shrink-0 mt-0.5">
                  {term.num}
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-foreground font-serif">{term.title}</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mt-1">
                    {term.text}
                  </p>
                  {term.highlight && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                      <Sparkles size={12} className="text-amber-400" />
                      <span>{term.highlight}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!showAllTerms && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAllTerms(true)}
                className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>{lang === "te" ? `మరిన్ని 8 షరతులు చూడండి (+8 more)` : `Expand remaining 8 conditions (+8 more)`}</span>
                <ChevronDown size={14} />
              </button>
            </div>
          )}
        </div>

        {/* ─── Signatories & Authority Card ─── */}
        <div className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1C1917] to-[#0A0908] border border-primary/30 text-white relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                {lang === "te" ? "దేవస్థాన అధికార యంత్రాంగం" : "Devasthanam Administration"}
              </span>
              <h4 className="text-lg sm:text-xl font-bold font-serif mt-1">
                {lang === "te" ? "శ్రీ సంపత్ వినాయగర్ దేవాలయం" : "Sri Sampath Vinayagar Devalayam"}
              </h4>
              <p className="text-xs text-stone-300/80 mt-1">
                {lang === "te" ? "ఆశీలు మెట్ట, విశాఖపట్నం | ఫోన్: 0891-2760740" : "Asilmetta, Visakhapatnam | Phone: 0891-2760740"}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 min-w-[180px]">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                  {lang === "te" ? "ఫౌండర్ ఫ్యామిలీ మెంబర్" : "Founder Family Member"}
                </span>
                <h5 className="text-sm font-bold text-amber-400 font-serif mt-1">
                  {lang === "te" ? "టి.ఆర్. చోళన్" : "T.R. Cholan"}
                </h5>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 min-w-[200px]">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                  {lang === "te" ? "సహాయ కమిషనర్ & కార్యనిర్వాహణ అధికారి" : "Assistant Commissioner & Executive Officer"}
                </span>
                <h5 className="text-sm font-bold text-amber-400 font-serif mt-1">
                  {lang === "te" ? "డి.వి.వి. ప్రసాద రావు" : "D.V.V. Prasada Rao"}
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Bottom Actions ─── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-primary/15">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone size={14} className="text-primary" />
            <span>{lang === "te" ? "సహాయం / వివరాల కొరకు దేవస్థానం నంబర్: 0891-2760740" : "For queries, contact Temple Office: (+91) 0891-2760740"}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-card hover:bg-muted border border-border text-foreground font-serif font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Eye size={14} className="text-primary" />
              <span>{lang === "te" ? "నోటీస్ ప్రివ్యూ" : "Preview PDF"}</span>
            </button>

            <a
              href="/Sri-Sampath-Tender-Notice-2026.pdf"
              download="Sri-Sampath-Tender-Notice-2026.pdf"
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Download size={14} />
              <span>{lang === "te" ? "అధికారిక PDF డౌన్‌లోడ్" : "Download Official PDF"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── PDF Modal Previewer ─── */}
      {isPdfModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setIsPdfModalOpen(false)}
        >
          <div 
            className="bg-card w-full max-w-4xl max-h-[90vh] rounded-3xl border border-primary/30 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={22} />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground font-serif">
                    Sri Sampath Vinayagar Devalayam - e-Procurement Tender Notice 2026
                  </h4>
                  <span className="text-[10px] text-muted-foreground">Rc. No. 16(2)/2026 (05-09-2026)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/Sri-Sampath-Tender-Notice-2026.pdf"
                  download="Sri-Sampath-Tender-Notice-2026.pdf"
                  className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs flex items-center gap-1.5 transition-all font-bold"
                  title="Download PDF"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="w-9 h-9 rounded-xl bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-all"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body / Embedded PDF */}
            <div className="flex-1 bg-stone-900 overflow-hidden relative min-h-[500px]">
              <iframe
                src="/Sri-Sampath-Tender-Notice-2026.pdf#toolbar=0"
                className="w-full h-full min-h-[500px] sm:min-h-[650px] border-0"
                title="Tender Notice PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderSection;
