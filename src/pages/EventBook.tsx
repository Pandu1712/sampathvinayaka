import { useState } from "react";
import Layout from "@/components/Layout";
import { BookOpen, Download, ShieldCheck, Clock, Award, Sparkles, ExternalLink, FileText } from "lucide-react";

export default function EventBook() {
  const pdfUrl = "/Sampath-Book-2026.pdf";
  const coverUrl = "/sampath-book-cover.jpg";

  const bookHighlights = [
    {
      title: "Divine Messages & Blessings",
      pages: "Pages 1-15",
      desc: "Auspicious blessings and messages from Founder Family Trustees, Chief Pujari, and Temple Priests.",
      icon: <Sparkles className="text-amber-500" size={20} />
    },
    {
      title: "The Historical Miracle of 1971",
      pages: "Pages 16-35",
      desc: "The sacred story of Admiral Krishnan's vow of 1001 coconuts and the divine protection of Visakhapatnam from the Ghazi submarine attack.",
      icon: <ShieldCheck className="text-amber-500" size={20} />
    },
    {
      title: "Daily Pujas & Special Rituals",
      pages: "Pages 36-60",
      desc: "Detailed guidelines and timings of daily Abhishekam, weekly Alankarams, and special festive poojas.",
      icon: <Clock className="text-amber-500" size={20} />
    },
    {
      title: "Charitable Trust & Community Outreach",
      pages: "Pages 61-80",
      desc: "Highlights of the Gandigundam Old Age Home construction and the temple's donation of Rs. 1.20 Crores to Sri Sitaramachandra Swamy Temple.",
      icon: <Award className="text-amber-500" size={20} />
    },
    {
      title: "Annual Ganesha Chaturthi Festival",
      pages: "Pages 81-110",
      desc: "Visual journey and descriptions of the 9-day grand celebrations, 9 unique forms/alankarams, and public Annadanam.",
      icon: <BookOpen className="text-amber-500" size={20} />
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 relative overflow-hidden text-center bg-gradient-to-b from-[#1C1917] to-background border-b border-amber-500/15 animate-fade-rise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(38,72%,50%,0.05)_0,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 px-4">
          <p className="text-amber-500 text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-black">🙏 Divine Souvenir</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-wide leading-tight">
            Sampath Book - 2026
          </h1>
          <div className="h-1 w-24 bg-amber-500/40 rounded-full mx-auto mt-4 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
          <p className="text-stone-300 mt-4 max-w-xl mx-auto text-xs sm:text-sm font-serif italic">
            "A Solemn Souvenir of Devotion, Protection, and Spiritual Legacy of Sri Sampath Vinayaka"
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12 px-4 bg-background relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          {/* Main Layout: Split on desktop, single column on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Side: Cover, Info and Downloads (Mobile Friendly & Desktop Left panel) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:sticky lg:top-40">
              
              {/* Premium Book Cover Card */}
              <div className="relative group w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 bg-[#1C0505] p-2 hover:shadow-[0_0_35px_rgba(217,119,6,0.35)] transition-all duration-500">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <img 
                    src={coverUrl} 
                    alt="Sampath Book 2026 Cover" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                    <span className="text-xs text-amber-300 font-serif tracking-widest uppercase bg-[#1C0505]/80 px-3 py-1.5 rounded-full border border-amber-500/40">
                      View Book Below
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Metadata details */}
              <div className="flex flex-col gap-2 w-full max-w-sm px-4 lg:px-0">
                <h3 className="text-xl font-bold font-serif text-foreground">Souvenir Overview</h3>
                <div className="h-[2px] w-20 bg-amber-500/60 mx-auto lg:mx-0 mb-2" />
                
                <div className="flex justify-between py-2 border-b border-border text-sm">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-semibold text-foreground">Digital PDF / Print</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border text-sm">
                  <span className="text-muted-foreground">File Size</span>
                  <span className="font-semibold text-foreground">27.3 MB (High Quality)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border text-sm">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-semibold text-foreground">English, Telugu, Hindi</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border text-sm">
                  <span className="text-muted-foreground">Publication Year</span>
                  <span className="font-semibold text-foreground">2026</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full max-w-sm px-4 lg:px-0 mt-4">
                <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <ExternalLink size={18} />
                  <span>Open in Tab</span>
                </a>
                <a 
                  href={pdfUrl} 
                  download="Sampath-Book-2026.pdf" 
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-transparent border-2 border-primary text-primary hover:bg-primary/5 transition-all active:scale-95"
                >
                  <Download size={18} />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Right Side: PDF Viewer (Desktop Only) / Book Chapters & Highlights (Mobile companion) */}
            <div className="lg:col-span-8 flex flex-col gap-8 w-full mt-6 lg:mt-0">
              
              {/* Desktop view: Embedded PDF viewer */}
              <div className="hidden lg:flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="text-amber-500" size={24} />
                    <h2 className="text-2xl font-bold font-serif text-foreground">Digital Reader</h2>
                  </div>
                  <span className="text-xs text-muted-foreground italic">Scroll to read, or use the panel actions to zoom/print</span>
                </div>
                
                {/* PDF iframe viewport */}
                <div className="w-full h-[75vh] rounded-2xl overflow-hidden border border-border bg-stone-900 shadow-xl relative">
                  <iframe 
                    src={`${pdfUrl}#toolbar=1&navpanes=0`}
                    title="Sampath Book 2026 PDF Viewer"
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Mobile Companion View / Highlights (Visible on all, but serves as main reader helper on mobile) */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-amber-500" size={24} />
                  <h2 className="text-2xl font-bold font-serif text-foreground">Highlights & Table of Contents</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Delve into the sacred archives, spiritual history, and daily activities of Sri Sampath Vinayaka Temple. Below are the key sections covered in this comprehensive souvenir book:
                </p>

                {/* Chapters List */}
                <div className="grid grid-cols-1 gap-4 mt-2">
                  {bookHighlights.map((item, index) => (
                    <div 
                      key={index} 
                      className="group flex gap-4 p-5 rounded-2xl bg-muted/40 border border-border/50 hover:bg-muted/80 hover:border-amber-500/20 transition-all duration-300 shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {item.icon}
                      </div>
                      
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <h4 className="font-serif font-bold text-foreground group-hover:text-primary transition-colors text-base sm:text-lg">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-amber-500/80 bg-amber-500/10 px-2.5 py-1 rounded-md self-start sm:self-auto whitespace-nowrap">
                          {item.pages}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
