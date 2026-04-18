"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, MoveUpRight, Zap, Terminal, Layers, Globe, Plus } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, title: "METRO_01", tag: "Identity", img: "https://images.unsplash.com/photo-1515163842435-411a3bd01d1c?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "RAW_TYPE", tag: "Specimen", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "NEON_HUD", tag: "UI/UX", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "GRID_99", tag: "Editorial", img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop" },
];

export default function TypoAgencySPA() {
  const [view, setView] = useState<"manifesto" | "gallery" | "lab">("manifesto");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 2.5]);
  const textBlur = useTransform(scrollYProgress, [0.2, 0.4], ["0px", "20px"]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-[#fdff00] min-h-screen selection:bg-[#fdff00] selection:text-black font-sans overflow-x-hidden">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference invert uppercase text-[10px] font-black tracking-[0.6em]">
        <button onClick={() => setView("manifesto")} className="text-2xl italic font-black">TYPO_UNIT&trade;</button>
        <div className="hidden md:flex gap-12">
           <button onClick={() => setView("manifesto")} className={`hover:opacity-40 transition-opacity ${view === 'manifesto' ? 'border-b border-[#fdff00]' : ''}`}>Manifesto</button>
           <button onClick={() => setView("gallery")} className={`hover:opacity-40 transition-opacity ${view === 'gallery' ? 'border-b border-[#fdff00]' : ''}`}>Gallery_Idx</button>
           <button onClick={() => setView("lab")} className={`hover:opacity-40 transition-opacity ${view === 'lab' ? 'border-b border-[#fdff00]' : ''}`}>Lab_Protocols</button>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-2 h-2 bg-[#fdff00] rounded-full animate-ping" />
           <span className="opacity-40">Live_Session</span>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* MANIFESTO VIEW */}
        {view === "manifesto" && (
          <motion.div key="manifesto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
             <section className="h-[200vh] w-full relative">
                <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                   {/* Background Elements */}
                   <div className="absolute inset-0 flex flex-col justify-center gap-6 pointer-events-none opacity-[0.03]">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="text-[20vh] font-black uppercase whitespace-nowrap leading-none border-y border-[#fdff00]/20 py-8 animate-marquee">
                           FORM FOLLOWS FEELING FORM FOLLOWS FEELING FORM FOLLOWS FEELING
                        </div>
                      ))}
                   </div>

                   <motion.div style={{ scale: textScale, filter: `blur(${textBlur})`, opacity: textOpacity }} className="text-center px-6 relative z-10">
                      <span className="text-xs uppercase tracking-[1em] mb-12 block font-black opacity-30">The First Protocol / 2026</span>
                      <h1 className="text-7xl md:text-[14vw] font-black uppercase italic leading-[0.75] tracking-tighter">
                         Think <br /> <span className="text-white">Bigger.</span>
                      </h1>
                      <div className="mt-24 h-32 w-[1px] bg-[#fdff00] mx-auto animate-bounce opacity-40" />
                   </motion.div>
                </div>
             </section>

             <section className="bg-[#fdff00] text-black py-48 px-12 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-end">
                   <div>
                      <h2 className="text-7xl md:text-[10vw] font-black uppercase italic leading-none mb-16 tracking-tighter">Pure <br /> Rigor.</h2>
                      <div className="space-y-12">
                         {[
                           { t: "The Machine", d: "We utilize industrial-grade procedural logic to generate typographic systems that cannot be designed by hand." },
                           { t: "The Message", d: "Visual noise is a failure of communication. We distill every project to its fundamental radical core." },
                         ].map((item, i) => (
                           <div key={i} className="border-t-4 border-black pt-8 group cursor-pointer">
                              <h3 className="text-3xl font-black uppercase mb-4 flex justify-between items-center group-hover:pl-4 transition-all tracking-tighter">
                                 {item.t} <ArrowRight className="w-6 h-6" />
                              </h3>
                              <p className="text-sm font-black uppercase leading-relaxed opacity-60 max-w-sm">{item.d}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="relative aspect-square glass-dark rounded-[4rem] overflow-hidden p-8">
                      <Image src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop" alt="Brutalist" fill className="object-cover opacity-80 mix-blend-multiply transition-transform duration-[4s] hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#fdff00] to-transparent opacity-40 mix-blend-overlay" />
                   </div>
                </div>
             </section>
          </motion.div>
        )}

        {/* GALLERY VIEW */}
        {view === "gallery" && (
          <motion.div key="gallery" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-[1800px] mx-auto min-h-screen">
             <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32 border-b border-white/5 pb-12">
                <h1 className="text-8xl md:text-[12vw] font-black italic tracking-tighter leading-none text-white">The_Archive.</h1>
                <div className="flex gap-4">
                   {['All', 'Identity', 'Experimental'].map((f, i) => (
                     <button key={i} className="px-8 py-3 glass-dark border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#fdff00] hover:text-black transition-all">{f}</button>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                {PROJECTS.map((p, i) => (
                   <motion.div 
                     key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                     className="group cursor-pointer"
                   >
                      <div className="relative aspect-video mb-8 overflow-hidden rounded-[2.5rem] bg-white/5">
                         <Image src={p.img} alt={p.title} fill className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-20 h-20 rounded-full bg-[#fdff00] text-black flex items-center justify-center">
                               <MoveUpRight className="w-8 h-8" />
                            </div>
                         </div>
                      </div>
                      <div className="flex justify-between items-end">
                         <div>
                            <span className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2 block">{p.tag}</span>
                            <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">{p.title}</h3>
                         </div>
                         <div className="text-[10px] font-black opacity-20 tracking-widest font-mono">NODE_0{i+1}</div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* LAB VIEW */}
        {view === "lab" && (
          <motion.div key="lab" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-5xl mx-auto min-h-screen">
             <div className="space-y-32">
                {[
                  { icon: <Terminal className="w-8 h-8" />, t: "Procedural_Logic", d: "We define rules, not shapes. Our engine generates rhythmic layouts that respond to content intensity in real-time." },
                  { icon: <Layers className="w-8 h-8" />, t: "Multi_Temporal", d: "Typography that changes over time. We focus on four-dimensional layouts where time is the primary axis of interaction." },
                  { icon: <Globe className="w-8 h-8" />, t: "Global_Mesh", d: "Distributed design generation across our agency network. Zero-latency collaboration on a global scale." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-12 group">
                     <div className="text-[#fdff00] flex-shrink-0 pt-4 opacity-40 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                     <div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">{item.t}</h2>
                        <p className="text-xl md:text-2xl font-light opacity-50 leading-relaxed uppercase tracking-widest">
                           {item.d}
                        </p>
                        <button className="mt-12 text-xs font-black border-b-4 border-[#fdff00] pb-2 tracking-[0.5em] hover:text-white transition-colors">INIT_PROTOCOL</button>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="relative z-10 py-32 bg-black px-8 mt-32 border-t border-[#fdff00]/10 overflow-hidden">
         <div className="absolute right-0 bottom-0 opacity-5 translate-y-1/2 translate-x-1/2 pointer-events-none">
            <div className="text-[80vh] font-black italic tracking-tighter leading-none font-sans">TYPO</div>
         </div>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="text-center md:text-left">
               <div className="text-4xl font-black italic tracking-tighter uppercase mb-6">Typo_Unit.Studio</div>
               <p className="text-[10px] uppercase tracking-[0.6em] font-black opacity-30">The algorithm for visual impact. &copy; 2026</p>
            </div>
            <button className="px-12 py-6 bg-[#fdff00] text-black font-black uppercase text-xs tracking-[0.8em] hover:scale-105 transition-transform rounded-sm">Initiate_Project</button>
         </div>
      </footer>

      <style>{`
        .glass-dark {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
