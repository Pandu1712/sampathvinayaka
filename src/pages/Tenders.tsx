import Layout from "@/components/Layout";
import TenderSection from "@/components/TenderSection";

const Tenders = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 relative overflow-hidden text-center bg-gradient-to-b from-[#1C1917] to-background border-b border-primary/15 animate-fade-rise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(38,72%,50%,0.05)_0,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 px-4">
          <p className="text-primary text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-black">🏛️ Official Public Notices</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-wide leading-tight">
            e-Procurement Tenders
          </h1>
          <div className="h-1 w-24 bg-primary/40 rounded-full mx-auto mt-4 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="text-stone-300 mt-4 max-w-xl mx-auto text-xs sm:text-sm font-serif italic">
            Sri Sampath Vinayagar Devasthanam, Asilmetta, Visakhapatnam — Official Tender Notifications & Guidelines
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding px-4 bg-transparent relative overflow-hidden">
        <div className="container-custom relative z-10">
          <TenderSection />
        </div>
      </section>
    </Layout>
  );
};

export default Tenders;
