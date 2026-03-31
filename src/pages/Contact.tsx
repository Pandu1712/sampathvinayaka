import { useState } from "react";
import Layout from "@/components/Layout";
import templeHero1 from "@/assets/temple-hero-1.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon. 🙏");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src={templeHero1} alt="Temple" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,15,10,0.5), rgba(20,15,10,0.8))" }} />
        <div className="hero-text-container">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 animate-fade-rise">Get in Touch</p>
          <h1 className="hero-title">Contact Us</h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 lg:py-28 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Info */}
          <div>
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Reach Us</p>
            <h2 className="text-2xl font-bold text-foreground">
              We're Here to <span className="text-primary">Help</span>
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Have questions about services, events, or wish to make a special prayer request? We'd love to hear from you.
            </p>

            <div className="mt-5 space-y-3">
              {[
                { icon: "📍", label: "Address", value: "Asilmetta, Visakhapatnam, Andhra Pradesh 530020" },
                { icon: "📞", label: "General", value: "(+91) 891-2755650 / 891-2760740" },
                { icon: "🆘", label: "Helpline", value: "+91 97044 38668" },
                { icon: "🕐", label: "Darshan Timings", value: "Daily: 6:00 AM – 8:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm text-primary font-medium">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 p-5 rounded-xl bg-card border border-border">
            <div>
              <label className="text-sm text-foreground font-medium block mb-2">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-sm text-foreground font-medium block mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-foreground font-medium block mb-2">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label className="text-sm text-foreground font-medium block mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Write your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Send Message 🙏
            </button>
          </form>
        </div>
      </section>
      {/* How to Reach */}
      <section className="py-20 lg:py-28 px-4 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Travel Info</p>
            <h2 className="text-2xl font-bold text-foreground">
              How to <span className="text-primary">Reach Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { icon: "🚌", title: "By Road", desc: "Well-connected via city roads. Buses and taxis are available from Visakhapatnam bus stand." },
              { icon: "🚂", title: "By Rail", desc: "Just a short drive from Vizag railway station. Auto-rickshaws and cabs are readily available." },
              { icon: "✈️", title: "By Air", desc: "Visakhapatnam Airport is ~15 km away. App-based cabs (Uber/Ola) provide a hassle-free journey." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all shadow-sm">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-sm font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations */}
      <section className="py-20 lg:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-secondary text-sm tracking-[0.2em] uppercase mb-3 text-primary font-semibold">Stay Near Us</p>
            <h2 className="text-2xl font-bold text-foreground">
              Hotels & <span className="text-primary">Accommodations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Budget Friendly", desc: "Clean rooms and basic amenities near Visakhapatnam bus stand. Ideal for students and pilgrims." },
              { title: "Mid-Range Hotels", desc: "Modern facilities and dining options near the railway station. Perfect for easy exploration." },
              { title: "Luxury Hotels", desc: "Premium services, spacious suites, and world-class amenities close to major city attractions." },
              { title: "Guesthouses", desc: "Homely atmosphere with personal attention. Quiet stays perfect for families and long-term visits." },
            ].map((hotel, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all">
                <h3 className="text-sm font-bold text-foreground mb-3">{hotel.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{hotel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
