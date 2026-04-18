"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, MoveUpRight, Zap, Terminal, Plus, X, ArrowLeft, MoreHorizontal, MousePointer2 } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, title: "LUMINA_STUDIO", tag: "Identity", year: "2025", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop", content: "A radical approach to digital presence for a cutting-edge AI research studio. Focus on procedural aesthetics." },
  { id: 2, title: "VEIL_EDITORIAL", tag: "Fashion", year: "2024", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop", content: "Conceptual editorial for a high-end textile house in Paris. Exploring the tension between fabric and skin." },
  { id: 3, title: "KRYPT_WALLET", tag: "Web3", year: "2025", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop", content: "Reimagining the security interface for the next generation of decentralized finance. Dark HUD focus." },
  { id: 4, title: "DRIFT_RECORDS", tag: "Music", year: "2023", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop", content: "Sound and visual synthesis for an underground techno label based in Berlin. High-contrast monochromatic design." },
  { id: 5, title: "VOX_AI", tag: "Technology", year: "2026", img: "https://images.unsplash.com/photo-1531746790731-6c087fdec69a?q=80&w=1000&auto=format&fit=crop", content: "Designing the personality for a sentient vocal interface. Focus on fluid motion and organic waveforms." },
];

export default function CreativeDirectorSPA() {
  const [view, setView] = useState<"catalog" | "project" | "info">("catalog");
  const [activeProject, setActiveProject] = useState(0);
  const constraintsRef = useRef(null);

  return (
    <div className="premium-theme bg-[#030303] text-white min-h-screen overflow-hidden selection:bg-white selection:text-black font-mono">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-start mix-blend-difference uppercase text-[10px] font-black tracking-[0.5em]">
        <button onClick={() => setView("catalog")} className="text-2xl font-black italic tracking-tighter hover:opacity-100 transition-opacity">
           LIQUID_DRIVE&trade;
        </button>
        <div className="hidden md:flex flex-col items-end gap-2 opacity-30 group hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setView("info")}>
           <span>Info / Expertise</span>
           <div className="w-16 h-[1px] bg-white group-hover:w-24 transition-all"></div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* CATALOG VIEW (HORIZONTAL DRAG) */}
        {view === "catalog" && (
          <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex items-center">
             <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden lg:block">
                <div className="text-[25vh] font-black italic opacity-[0.02] tracking-tighter leading-none select-none">
                   CREATIVE_DIRECTOR_2026
                </div>
             </div>

             <motion.div 
               ref={constraintsRef}
               className="px-[15vw] flex gap-12 md:gap-24 cursor-grab active:cursor-grabbing h-[60vh] relative z-10"
               drag="x"
               dragConstraints={{ left: -1800, right: 0 }}
               transition={{ type: "spring", damping: 40, stiffness: 150 }}
             >
                {PROJECTS.map((p, i) => (
                  <motion.div 
                    key={p.id}
                    onClick={() => { setActiveProject(i); setView("project"); }}
                    className="relative min-w-[70vw] md:min-w-[45vw] h-full group bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden p-8 md:p-12 flex flex-col justify-between transition-colors hover:bg-white/10"
                  >
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vh] font-black italic opacity-[0.03] pointer-events-none select-none group-hover:opacity-[0.08] transition-opacity">
                        0{i + 1}
                     </div>

                     <div className="relative z-10 flex justify-between items-start">
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-2">{p.tag}</span>
                           <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">{p.title}</h2>
                        </div>
                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                           <MoveUpRight className="w-6 h-6" />
                        </div>
                     </div>

                     <div className="relative z-10 flex justify-between items-end">
                        <div className="max-w-[250px] text-[10px] uppercase font-bold tracking-widest opacity-30 leading-relaxed group-hover:opacity-60 transition-opacity">
                           {p.content}
                        </div>
                        <div className="text-right">
                           <div className="text-xl font-black italic opacity-20 transition-all group-hover:opacity-100">REV_0{i+1}</div>
                        </div>
                     </div>

                     {/* Partial Floating Image */}
                     <div className="absolute right-[-20%] bottom-[-10%] w-[120%] aspect-square opacity-[0.05] group-hover:opacity-100 transition-all duration-[1.5s] grayscale group-hover:grayscale-0 pointer-events-none">
                        <Image src={p.img} alt={p.title} fill className="object-contain" />
                     </div>
                  </motion.div>
                ))}
             </motion.div>

             <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 font-black text-[10px] uppercase tracking-[0.5em]">
                <MousePointer2 className="w-4 h-4" /> Drag to explore
             </div>
          </motion.div>
        )}

        {/* PROJECT DETAIL VIEW */}
        {view === "project" && (
          <motion.div key="project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <div className="fixed top-12 left-12 z-[60] flex gap-4">
                <button onClick={() => setView("catalog")} className="bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                   <ArrowLeft className="w-6 h-6" />
                </button>
             </div>

             <main className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-8 relative h-[60vh] lg:h-screen bg-[#111]">
                   <Image src={PROJECTS[activeProject].img} alt="Hero" fill className="object-cover" priority />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                   <div className="absolute bottom-12 left-12">
                      <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">{PROJECTS[activeProject].title}</h1>
                   </div>
                </div>
                
                <div className="lg:col-span-4 p-12 lg:p-24 bg-black flex flex-col justify-center gap-16">
                   <div>
                      <span className="text-[10px] uppercase tracking-[0.8em] font-black opacity-30 mb-8 block">Project_Overview</span>
                      <p className="text-2xl leading-relaxed italic opacity-80 uppercase tracking-tight">
                         {PROJECTS[activeProject].content}
                      </p>
                   </div>

                   <div className="space-y-8 opacity-40">
                      {[
                        { l: "Year", v: PROJECTS[activeProject].year },
                        { l: "Service", v: PROJECTS[activeProject].tag },
                        { l: "Protocol", v: "AES_SYNTH_09" },
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between border-b border-white/10 pb-4">
                           <span className="text-[10px] uppercase font-black">{s.l}</span>
                           <span className="text-[10px] uppercase font-black">{s.v}</span>
                        </div>
                      ))}
                   </div>

                   <button onClick={() => setView("catalog")} className="w-full py-8 border border-white/20 text-[10px] font-black uppercase tracking-[1em] hover:bg-white hover:text-black transition-all">
                      Browse_Next
                   </button>
                </div>
             </main>
          </motion.div>
        )}

        {/* INFO VIEW */}
        {view === "info" && (
          <motion.div key="info" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 p-12 md:p-32 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-32">
                <div>
                   <h1 className="text-8xl md:text-[12vw] font-black italic uppercase italic tracking-tighter leading-[0.85] mb-12">System_Error <br /> Design.</h1>
                   <p className="text-2xl md:text-3xl font-light opacity-60 leading-relaxed uppercase tracking-widest">
                      We operate at the fringe of visual logic. We design for the future that refuses to follow the grid.
                   </p>
                </div>
                <div className="text-right">
                   <div className="text-8xl font-black italic opacity-10">404</div>
                   <div className="text-[10px] uppercase font-black tracking-widest opacity-40">Protocols established since 2012</div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-12">
                {['Direction', 'Execution', 'Annihilation'].map((t, i) => (
                  <div key={i} className="group cursor-pointer">
                     <span className="text-[10px] font-black opacity-20 block mb-4">0{i+1}</span>
                     <h3 className="text-4xl font-black uppercase italic tracking-tighter group-hover:text-red-500 transition-colors mb-4">{t}</h3>
                     <p className="text-[10px] opacity-30 uppercase font-black leading-relaxed tracking-widest">Procedural generation combined with human intuition to create undeniable impact.</p>
                  </div>
                ))}
             </div>

             <button onClick={() => setView("catalog")} className="mt-24 self-start flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                   <ArrowLeft className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[1em]">Back_to_catalog</span>
             </button>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global HUD Data Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em]">
         <div className="flex gap-12">
            <span>Lat: 35.6762 | Long: 139.6503</span>
            <span>Flux: Stable</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight">
               Aeon System <br /> v4.0.21
            </div>
            <div className="flex gap-[2px] h-3">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-white`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
      `}</style>
    </div>
  );
}
