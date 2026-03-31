import Layout from "@/components/Layout";
import purohit1 from "@/assets/purohit-1.jpg";
import purohit2 from "@/assets/purohit-2.jpg";
import purohit3 from "@/assets/purohit-3.jpg";
import purohit4 from "@/assets/purohit-4.jpg";
import male1 from "@/assets/member-male-1.png";
import male2 from "@/assets/member-male-2.png";
import male3 from "@/assets/member-male-3.png";
import male4 from "@/assets/member-male-4.png";
import male5 from "@/assets/member-male-5.png";
import male6 from "@/assets/member-male-6.png";
import male7 from "@/assets/member-male-7.png";
import male8 from "@/assets/member-male-8.png";
import male9 from "@/assets/member-male-9.png";
import male10 from "@/assets/member-male-10.png";
import male11 from "@/assets/member-male-11.png";
import female1 from "@/assets/member-female-1.png";
import female2 from "@/assets/member-female-2.png";
import female3 from "@/assets/member-female-3.png";
import female4 from "@/assets/member-female-4.png";

const committeeMembers = [
  { name: "Sri Ramachandra Sharma", role: "President", desc: "Leading the temple administration for over 15 years with dedication and devotion.", img: male1 },
  { name: "Sri Venkatesh Murthy", role: "Vice President", desc: "Overseeing temple development projects and community outreach programs.", img: male2 },
  { name: "Sri Narayana Bhat", role: "Secretary", desc: "Managing temple operations, correspondence, and administrative affairs.", img: male3 },
  { name: "Sri Ganesh Hegde", role: "Treasurer", desc: "Handling temple finances, donations, and budget planning with transparency.", img: male4 },
  { name: "Smt. Lakshmi Devi", role: "Women's Wing Head", desc: "Organizing women's spiritual programs, festivals, and cultural events.", img: female1 },
  { name: "Sri Suresh Acharya", role: "Cultural Secretary", desc: "Coordinating cultural events, music programs, and festival celebrations.", img: male5 },
];

const purohits = [
  { name: "Pandit Vishwanath Sharma", role: "Head Purohit", desc: "Chief priest with 30+ years of Vedic expertise. Performs all major temple rituals and ceremonies.", speciality: "Maha Abhishekam, Homam", img: purohit1 },
  { name: "Pandit Raghunath Bhat", role: "Senior Purohit", desc: "Specialist in Ganapati Atharvashirsha and sacred fire rituals.", speciality: "Archana, Ganapati Homam", img: purohit2 },
  { name: "Pandit Keshav Joshi", role: "Purohit", desc: "Expert in marriage ceremonies and Navagraha poojas.", speciality: "Vivah, Navagraha Pooja", img: purohit3 },
  { name: "Pandit Aditya Sharma", role: "Junior Purohit", desc: "Trained in daily rituals, Abhishekam, and devotional services.", speciality: "Daily Pooja, Abhishekam", img: purohit4 },
];

const trustees = [
  { name: "Sri Madhav Rao", role: "Chief Trustee", img: male6 },
  { name: "Sri Prakash Shetty", role: "Managing Trustee", img: male7 },
  { name: "Sri Dinesh Kumar", role: "Trustee", img: male8 },
  { name: "Smt. Saraswati Devi", role: "Trustee", img: female2 },
  { name: "Sri Harish Patel", role: "Trustee", img: male9 },
];

const volunteers = [
  { name: "Sri Karthik Reddy", role: "Head Volunteer", img: male10 },
  { name: "Smt. Anjali Sharma", role: "Festival Coordinator", img: female3 },
  { name: "Sri Manoj Kumar", role: "Youth Wing Leader", img: male11 },
  { name: "Smt. Priya Nair", role: "Education Program Lead", img: female4 },
];

const Members = () => (
  <Layout>
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <section className="py-6 sm:py-8 lg:py-20 px-4 sm:px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">🙏 Our Team</p>
          <h1 className="text-2xl font-bold text-foreground">
            Temple <span className="text-primary">Members</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            Meet the devoted individuals who serve Sampath Vinayaka Temple — from our revered purohits to dedicated committee members and volunteers.
          </p>
        </div>
      </section>

      {/* Purohits */}
      <section className="py-14 sm:py-20 px-4 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5 sm:mb-14">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2">🪔 Spiritual Guides</p>
            <h2 className="text-2xl font-bold text-foreground">Our Purohits</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm ">
              Learned Vedic scholars who conduct sacred rituals and guide devotees on their spiritual journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {purohits.map((p) => (
              <div key={p.name} className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={p.img} alt={p.name} loading="lazy" width={512} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-sm tracking-[0.15em] uppercase text-primary font-medium">{p.role}</span>
                  <h3 className="text-sm font-bold text-foreground mt-1">{p.name}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{p.desc}</p>
                  <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide">
                    {p.speciality}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider max-w-xs mx-auto" />

      {/* Committee Members */}
      <section className="py-14 sm:py-20 px-4 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5 sm:mb-14">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2">🏛️ Administration</p>
            <h2 className="text-2xl font-bold text-foreground">Committee Members</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm ">
              The dedicated team managing temple operations and driving community initiatives.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {committeeMembers.map((m) => (
              <div key={m.name} className="bg-card rounded-2xl border border-border/60 p-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                  <img src={m.img} alt={m.name} loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-sm tracking-[0.15em] uppercase text-primary font-medium">{m.role}</span>
                  <h3 className="text-sm font-bold text-foreground mt-0.5">{m.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider max-w-xs mx-auto" />

      {/* Trustees */}
      <section className="py-14 sm:py-20 px-4 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5 sm:mb-14">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2">⚖️ Governance</p>
            <h2 className="text-2xl font-bold text-foreground">Board of Trustees</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustees.map((t) => (
              <div key={t.name} className="bg-card rounded-xl border border-border/60 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                  <img src={t.img} alt={t.name} loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{t.name}</h3>
                  <p className="text-primary text-sm font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider max-w-xs mx-auto" />

      {/* Volunteers */}
      <section className="py-14 sm:py-20 px-4 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5 sm:mb-14">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2">🤝 Seva</p>
            <h2 className="text-2xl font-bold text-foreground">Volunteers & Coordinators</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {volunteers.map((v) => (
              <div key={v.name} className="bg-card rounded-xl border border-border/60 p-5 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary/20">
                  <img src={v.img} alt={v.name} loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{v.name}</h3>
                <p className="text-primary text-sm font-medium mt-0.5">{v.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export default Members;
