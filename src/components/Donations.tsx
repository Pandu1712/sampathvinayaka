import { CreditCard, Landmark, ClipboardCheck, Heart, MapPin } from "lucide-react";
import { toast } from "sonner";

const Donations = () => {
  const bankDetails = {
    accountName: "Sri Sampath Vinayaka Temple Trust",
    bankName: "State Bank of India (SBI)",
    accountNumber: "1234567890", // Placeholder
    ifscCode: "SBIN000XXXX", // Placeholder
    branch: "Asilmetta, Visakhapatnam",
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <section id="donations" className="section-padding bg-primary/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
            <Heart size={16} className="animate-pulse" />
            Support the Temple
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif leading-tight">
            Contributions & <span className="gold-shimmer italic">Donations</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary/40 rounded-full mx-auto mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Your generous contributions help us maintain the temple's sacred traditions, perform daily rituals, and serve the community. Every offering counts towards building a stronger spiritual foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bank Details Card */}
          <div className="glass p-8 rounded-[3rem] border border-white/40 shadow-2xl relative overflow-hidden group animate-fade-in opacity-0 [animation-fill-mode:forwards]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Landmark size={32} />
              </div>
              <h3 className="text-2xl font-bold font-serif">Bank Account Details</h3>
            </div>

            <div className="space-y-6">
              {[
                { label: "Account Name", value: bankDetails.accountName, icon: <Landmark size={18} /> },
                { label: "Bank Name", value: bankDetails.bankName, icon: <CreditCard size={18} /> },
                { label: "Account Number", value: bankDetails.accountNumber, icon: <ClipboardCheck size={18} />, copyable: true },
                { label: "IFSC Code", value: bankDetails.ifscCode, icon: <ClipboardCheck size={18} />, copyable: true },
                { label: "Branch", value: bankDetails.branch, icon: <MapPin size={18} /> },
                // Dummy MapPin import not needed here as I'm using local icons, but I'll add it if needed.
                // Wait, I forgot to import MapPin in this file.
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/40 border border-primary/5 hover:border-primary/20 transition-all group/item shadow-sm">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <span className="text-primary/60">{item.icon}</span>
                    <span className="text-sm font-bold text-primary/80 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground font-semibold font-sans">{item.value}</span>
                    {item.copyable && (
                      <button 
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary/40 hover:text-primary transition-colors"
                        title="Copy to clipboard"
                      >
                        <ClipboardCheck size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 pt-6 border-t border-primary/10 text-xs text-muted-foreground italic text-center">
              Please include your name and purpose of donation in the transaction remarks. 
              Contact the temple office for a formal receipt.
            </p>
          </div>

          {/* Additional Info / Graphics */}
          <div className="space-y-8 animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:0.3s]">
            <div className="p-8 rounded-[2.5rem] glass-dark border border-white/10 relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-primary text-xl font-bold font-serif mb-4 flex items-center gap-3">
                <span className="text-2xl">🕉️</span> Seva Opportunities
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                Donations can be made for specific sevas such as:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Annadanam (Food Distribution)", "Temple Renovation", "Education & Vedic Classes", "Daily Pooja & Aarti", "Festival Celebrations", "Gaushala Support"].map((seva, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {seva}
                  </li>
                ))}
              </ul>
            </div>

            <div className="premium-card p-6 flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-4xl text-white shadow-xl shadow-primary/20 shrink-0">
                🙏
              </div>
              <div>
                <h4 className="text-foreground font-bold font-serif mb-1">Tax Benefits</h4>
                <p className="text-muted-foreground text-sm font-light">
                  All donations are eligible for tax exemption under section 80G of the Income Tax Act.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donations;
