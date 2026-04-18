"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Search, Mail, Share2, MessageCircle, Maximize2, Plus, ArrowUpRight, Globe, Zap } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "AETHEL_STUDIOS", cat: "Editorial", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop", desc: "A structural exploration of digital identity and presence. Built on the edge." },
  { id: 2, name: "SILK_OS", cat: "Interface", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop", desc: "Fluid, organic interactions inspired by the movement of raw silk and digital mesh." },
  { id: 3, name: "ORBIT_X", cat: "Branding", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", desc: "Next-gen computing cores forged in the heart of industrial minimalism." },
  { id: 4, name: "NEO_TYPE", cat: "Visual", img: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=1000&auto=format&fit=crop", desc: "Experimental typography systems designed for high-end editorial narratives." },
  { id: 5, name: "VOID_SHELL", cat: "Architecture", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "Minimalist hardware chassis forged in high-altitude environments for purity." },
  { id: 6, name: "CORE_PLATE", cat: "Hardware", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of photonic processing and thermal inertia. 4.8GHz stable." },
];

export default function FloatCanvasSPA() {
  const [view, setView] = useState<"grid" | "study" | "studio">("grid");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#f8f8f8] text-[#1a1a1a] min-h-screen selection:bg-black selection:text-white font-sans overflow-x-hidden">
      
      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/40 backdrop-blur-3xl border-b border-black/5">
        <button onClick={() => setView("grid")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform">
           FLOAT_UNIT&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("grid")} className={`hover:opacity-100 transition-opacity ${view === 'grid' ? 'text-black opacity-100 underline decoration-black underline-offset-8' : ''}`}>THE_CANVAS</button>
           <button onClick={() => setView("studio")} className={`hover:opacity-100 transition-opacity ${view === 'studio' ? 'text-black opacity-100 underline decoration-black underline-offset-8' : ''}`}>THE_STUDIO</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* GRID VIEW (PORTFOLIO) */}
        {view === "grid" && (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12 border-b-2 border-black pb-10">
                <h1 className="text-7xl md:text-[12vw] font-serif italic tracking-tighter leading-[0.75] text-black">
                   Silent. <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.2)' }}>Forms.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter uppercase text-black/10 italic">Unit_Series_029</div>
                   <div className="flex gap-4">
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Curating Excellence <br /> Through Subtraction</div>
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {PROJECTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group flex flex-col cursor-pointer"
                    onClick={() => { setActiveItem(i); setView("study"); }}
                  >
                     <div className="relative aspect-[4/5] bg-white overflow-hidden mb-12 rounded-[3rem] border border-black/5 shadow-2xi group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all">
                        <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s] grayscale group-hover:grayscale-0" />
                        <div className="absolute top-10 left-10 flex gap-4">
                           <div className="p-4 bg-white/80 backdrop-blur-xl rounded-full border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus className="w-5 h-5 text-black" />
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                     <div className="flex justify-between items-start flex-col">
                        <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30 mb-2 block">{p.cat}</span>
                        <div className="flex justify-between items-end w-full pr-4">
                           <h3 className="text-4xl font-serif italic tracking-tighter leading-none group-hover:text-black transition-colors">{p.name}</h3>
                           <div className="text-3xl font-black italic tracking-tighter opacity-10 group-hover:opacity-100 transition-all">/0{p.id}</div>
                        </div>
                     </div>
                     <p className="text-sm font-light italic opacity-40 uppercase tracking-tight max-w-xs mt-6">{p.desc}</p>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.6em] opacity-20 group-hover:opacity-100 transition-all group-hover:gap-12 border-t border-black/5 pt-10 mt-10">
                        VIEW_CASE_STUDY <ArrowUpRight className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* STUDY VIEW (DETAIL) */}
        {view === "study" && (
          <motion.div key="study" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("grid")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 h-screen overflow-hidden bg-white">
                   <div className="absolute inset-0 z-[-1]">
                      <Image src={PROJECTS[activeItem].img} alt="Background" fill className="object-cover opacity-5 grayscale" />
                   </div>
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl group">
                         <Image src={PROJECTS[activeItem].img} alt="Project" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" priority />
                         <div className="absolute top-12 left-12 p-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-black/5">
                            <Maximize2 className="w-6 h-6 text-black animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black decoration-4 underline-offset-8 italic">Archive_Sync // {PROJECTS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-[0.85] text-black uppercase">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic">Global_Allocation: Reserved</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-50 text-black">
                            {PROJECTS[activeItem].desc} Every angle was computed to maximize silence and minimize human interference with the landscape.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-black/10">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Global_East" },
                              { icon: <Zap className="w-5 h-5" />, l: "Processing", v: "Class_A" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "Phase_Shift" },
                              { icon: <Plus className="w-5 h-5" />, l: "Material", v: "Titanium" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center text-black">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("grid")} className="flex-grow py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] hover:bg-black/80 transition-all shadow-2xl">
                               Explore_Archive
                            </button>
                            <button className="px-12 py-8 border border-black/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-black">
                               PDF_Spec
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* STUDIO VIEW (ABOUT) */}
        {view === "studio" && (
          <motion.div key="studio" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-black decoration-2 underline-offset-8 italic">Since_2012</span>
                   <h2 className="text-7xl md:text-[10vw] font-serif italic tracking-tighter leading-none text-black uppercase">THE <br/> ORIGIN.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="flex gap-12 pt-12 border-t border-black/10">
                      <Share2 className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                      <MessageCircle className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                      <Mail className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                   </div>
                </div>
                <div className="relative aspect-square bg-[#ddd] rounded-[4rem] p-12 overflow-hidden border border-black/5 group">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Studio" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 bg-black text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-black/80 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-black">
         <div className="flex gap-12 text-black">
            <span>Float_Unit_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-black">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-black opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
