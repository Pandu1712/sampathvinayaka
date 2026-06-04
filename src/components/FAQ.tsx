import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What are the Sampath Vinayakagar Temple timings?",
    answer: "The temple is open daily for Sarva Darshanam (General Darshan) from 6:00 AM to 11:00 AM and 5:30 PM to 8:00 PM. Key rituals include Homam (5:00 AM – 6:30 AM), Abhishekam (7:00 AM – 8:30 AM), and Vehicle Pooja (6:30 AM – 10:30 AM & 4:30 PM – 8:00 PM). During Ganesha Navaratri, Special Abhishekam is performed from 7:00 AM to 12:00 PM.",
  },
  {
    question: "How to reach Sampath Vinayakagar Temple in Vizag?",
    answer: "The temple is located in Asilmetta, Visakhapatnam. You can reach the temple easily by cab, bus, or personal vehicle from all major city areas. It is well-connected to the Vizag Railway Station and Bus Stand.",
  },
  {
    question: "Is there parking available at Sampath Vinayakagar Temple?",
    answer: "Yes, visitors can find organized parking spaces near the entrance, making it convenient for cars and two-wheelers alike, especially for those visiting for vehicle poojas.",
  },
  {
    question: "What is special about Sampath Vinayakagar Temple?",
    answer: "The temple is known for its serene atmosphere, spiritual rituals, beautiful architecture, and peaceful environment attracting many devotees. It is famous for 'hall ticket blessings' for students and its protective role during the 1971 war.",
  },
  {
    question: "Are there any festivals celebrated at Sampath Vinayakagar Temple?",
    answer: "Major Ganesh festivals like Vinayaka Chavithi and Ganesh Chaturthi, as well as Navaratri and other special poojas, are celebrated here every year with devotion and large gatherings.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-transparent relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-left mb-8 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
          <p className="text-primary text-sm tracking-[0.4em] uppercase mb-4 font-bold">Frequently Asked</p>
          <h2 className="text-4xl font-bold text-foreground font-serif">
            Questions & <span className="gold-shimmer italic">Answers</span>
          </h2>
          <div className="h-1 w-24 bg-primary/40 rounded-full mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
        </div>

        <div className="w-full space-y-3">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`premium-card group transition-all duration-500 hover:scale-[1.01] ${activeIndex === index ? 'shadow-xl ring-1 ring-primary/20' : 'shadow-sm'}`}
            >
              <button
                className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4"
                onClick={() => toggleAccordion(index)}
              >
                <span className={`text-sm  font-bold leading-tight transition-colors duration-300 font-serif ${activeIndex === index ? 'text-primary' : 'text-foreground group-hover:text-primary/80'}`}>
                  {item.question}
                </span>
                <div className={`p-3 rounded-full transition-all duration-500 border border-primary/20 shrink-0 ${activeIndex === index ? 'bg-primary text-primary-foreground rotate-180 shadow-primary/30 shadow-lg' : 'bg-white text-primary group-hover:bg-primary/5'}`}>
                  <ChevronDown size={24} />
                </div>
              </button>
              <div 
                className={`transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 px-0 overflow-hidden'}`}
              >
                <div className="px-5 pb-8 text-muted-foreground text-sm leading-relaxed font-sans font-light">
                  <div className="pt-6 border-t border-primary/10">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
