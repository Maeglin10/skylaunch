"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Search, Mail, Share2, MessageCircle, Maximize2, Plus, ArrowUpRight, Camera, MoveDiagonal2, Info } from "lucide-react";
import "../premium.css";

const PHOTOS = [
  { id: 1, name: "ASH_STRUCTURE_01", cat: "Brutalist", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of vertical tension and concrete shadows in the urban void." },
  { id: 2, name: "ORION_PORTRAIT", cat: "Human", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop", desc: "Exploring the intersection of silk texture and soft cinematic light on human profile." },
  { id: 3, name: "STEEL_VISION", cat: "Industrial", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", desc: "Sub-atomic signal stability for high-EMI zones in industrial transit cores." },
  { id: 4, name: "NEO_HABITAT", cat: "Habitat", img: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000&auto=format&fit=crop", desc: "Experimental habitat design for long-duration orbital deployment in deep space." },
];

export default function PhotographyArchiveSPA() {
  const [view, setView] = useState<"stack" | "insight" | "studio">("stack");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#0a0a0a] text-white min-h-screen selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/20 backdrop-blur-3xl border-b border-white/5">
        <button onClick={() => setView("stack")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform">
           STACK_ARCHIVE&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("stack")} className={`hover:opacity-100 transition-opacity ${view === 'stack' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_STACK</button>
           <button onClick={() => setView("studio")} className={`hover:opacity-100 transition-opacity ${view === 'studio' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_STUDIO</button>
        </div>
        <div className="flex items-center gap-8 text-white">
           <Camera className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* STACK VIEW (INTERACTIVE CARDS) */}
        {view === "stack" && (
          <motion.div key="stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/10 pb-10">
                <h1 className="text-7xl md:text-[12vw] font-serif italic tracking-tighter leading-[0.75] text-white">
                   Cinematic. <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Memories.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter uppercase text-white/10 italic">Archive_Alpha_026</div>
                   <div className="flex gap-4">
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-20 italic text-white">Capturing Light <br /> Through Subtraction</div>
                   </div>
                </div>
             </header>

             <div className="flex flex-col gap-32">
                {PHOTOS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                    className="group relative w-full h-[60vh] md:h-screen sticky top-24 md:top-32 rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,1)] bg-black cursor-pointer"
                    onClick={() => { setActiveItem(i); setView("insight"); }}
                  >
                     <Image src={p.img} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s] opacity-60 group-hover:opacity-100" />
                     <div className="absolute inset-x-12 bottom-12 md:inset-x-24 md:bottom-24 z-10 flex justify-between items-end">
                        <div className="max-w-2xl">
                           <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-white decoration-2 underline-offset-8">Sequence_0{p.id}</span>
                           <h2 className="text-5xl md:text-[8vw] font-serif italic tracking-tighter leading-none text-white uppercase">{p.name}</h2>
                        </div>
                        <div className="flex flex-col items-end gap-6 text-white">
                           <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                              <Maximize2 className="w-6 h-6" />
                           </div>
                        </div>
                     </div>
                     <div className="absolute top-12 right-12 text-[10px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity flex items-center gap-3 italic">
                        <Camera className="w-4 h-4" /> ISO_100 [Verified]
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* INSIGHT VIEW (IMAGE DETAILS) */}
        {view === "insight" && (
          <motion.div key="insight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("stack")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 h-screen overflow-hidden bg-black">
                   <div className="absolute inset-0 z-[-1]">
                      <Image src={PHOTOS[activeItem].img} alt="Background" fill className="object-cover opacity-20 grayscale brightness-50" />
                   </div>
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-2xl group">
                         <Image src={PHOTOS[activeItem].img} alt="Project" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" priority />
                         <div className="absolute top-12 left-12 p-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10">
                            <Plus className="w-6 h-6 text-white animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12 text-white">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic">Archive_Sync // {PHOTOS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-[0.85] uppercase">{PHOTOS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic">Verification: Phase_Shift_Clear</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-50">
                            {PHOTOS[activeItem].desc} An architectural study involving multi-axis tension and structural transparency.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-white/10">
                            {[
                              { icon: <MoveDiagonal2 className="w-5 h-5" />, l: "Dimensions", v: "8400 x 5600" },
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Global_East" },
                              { icon: <Info className="w-5 h-5" />, l: "Metadata", v: "Level_4_Enc" },
                              { icon: <Plus className="w-5 h-5" />, l: "Format", v: "Raw_Digital" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("stack")} className="flex-grow py-8 bg-white text-black font-black uppercase text-xs tracking-[1em] hover:bg-white/80 transition-all shadow-2xl">
                               Explore_Archive
                            </button>
                            <button className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-white">
                               Download_Raw
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
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-white decoration-2 underline-offset-8 italic text-white">The_Visual_Core</span>
                   <h2 className="text-7xl md:text-[10vw] font-serif italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60">
                      We treat photography as code. Every image is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="flex gap-12 pt-12 border-t border-white/10">
                      <Share2 className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity text-white" />
                      <MessageCircle className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity text-white" />
                      <Mail className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity text-white" />
                   </div>
                </div>
                <div className="relative aspect-square bg-white/5 rounded-[4rem] p-12 overflow-hidden border border-white/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Studio" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-white/80 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-white">
         <div className="flex gap-12">
            <span>Stack_Archive_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-white opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
