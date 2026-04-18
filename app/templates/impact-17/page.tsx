"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Maximize2, Layers, Shield, Activity, Plus, Box, Compass, Ruler } from "lucide-react";
import "../premium.css";

const WORKS = [
  { id: 1, title: "STAIRCASE_01", class: "col-span-12 lg:col-span-8 h-[60vh]", img: "https://images.unsplash.com/photo-1518005020251-582c7eb8365d?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of vertical tension." },
  { id: 2, title: "ABSTRACT_02", class: "col-span-12 lg:col-span-4 h-[40vh] self-end", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "Minimalist geometry in urban space." },
  { id: 3, title: "VISION_03", class: "col-span-12 lg:col-span-4 h-[50vh]", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop", desc: "Monolithic presence in the Highlands." },
  { id: 4, title: "SILK_04", class: "col-span-12 lg:col-span-8 h-[80vh]", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", desc: "Glass and steel synthesis." },
];

export default function StructuralMasonrySPA() {
  const [view, setView] = useState<"grid" | "blueprint" | "narrative">("grid");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#fcfcfc] text-[#111] min-h-screen selection:bg-black selection:text-white font-mono overflow-x-hidden">
      
      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <button onClick={() => setView("grid")} className="text-xl font-black uppercase tracking-tighter hover:opacity-100 transition-opacity">
           CONCRETE_VISIONS&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("grid")} className={`hover:opacity-100 transition-opacity ${view === 'grid' ? 'text-black opacity-100 underline decoration-black decoration-2 underline-offset-8' : ''}`}>THE_GRID</button>
           <button onClick={() => setView("blueprint")} className={`hover:opacity-100 transition-opacity ${view === 'blueprint' ? 'text-black opacity-100 underline decoration-black decoration-2 underline-offset-8' : ''}`}>BLUEPRINTS</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest italic">
              Archived: Series_V1
           </div>
           <button onClick={() => setView("narrative")} className="px-8 py-3 bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#1a1a1a] transition-all italic">
              Contact_Studio
           </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE GRID VIEW (MASONRY) */}
        {view === "grid" && (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-12">
                <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] text-black">
                   STARK. <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>FORMS.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter uppercase opacity-10 italic">Portfolio_Index_44</div>
                   <div className="flex gap-4">
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Structural Truth <br /> Through Material</div>
                   </div>
                </div>
             </header>

             <main className="grid grid-cols-12 gap-12">
                {WORKS.map((w, i) => (
                  <motion.div 
                    key={w.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className={`${w.class} group relative flex flex-col cursor-pointer bg-white overflow-hidden rounded-[2rem] border border-black/5 shadow-2xi`}
                    onClick={() => { setActiveItem(i); setView("blueprint"); }}
                  >
                     <Image src={w.img} alt={w.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" />
                     <div className="absolute top-8 left-8 p-3 bg-black/80 backdrop-blur-xl rounded-full text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                     </div>
                     <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-12 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2 font-mono">ID_0x0{w.id}</div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic">{w.title}</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mt-4 leading-relaxed">{w.desc}</p>
                     </div>
                  </motion.div>
                ))}
             </main>
          </motion.div>
        )}

        {/* THE BLUEPRINT VIEW (DETAIL) */}
        {view === "blueprint" && (
          <motion.div key="blueprint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("grid")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 h-screen overflow-hidden">
                   <div className="absolute inset-0 bg-[#ebebeb] z-[-1]" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vh] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter">
                      SCHEMATIC
                   </div>
                   
                   <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.2 }} className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl group">
                         <Image src={WORKS[activeItem].img} alt="Detail" fill className="object-cover grayscale" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black decoration-4 underline-offset-8">Blueprint_Sync // {WORKS[activeItem].title}</span>
                            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-black">{WORKS[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10">Verification: 100%_PASS</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-50 text-black">
                            {WORKS[activeItem].desc} Every angle was computed to maximize silence and minimize human interference with the landscape.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-black/10">
                            {[
                              { icon: <Ruler className="w-5 h-5" />, l: "Dimensions", v: "14,200 SQM" },
                              { icon: <Compass className="w-5 h-5" />, l: "Vector", v: "Polar_South" },
                              { icon: <Shield className="w-5 h-5" />, l: "Integrity", v: "Class_A_Core" },
                              { icon: <Box className="w-5 h-5" />, l: "Material", v: "Raw_Concrete" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center text-black">
                                 <div className="text-black/20">{s.icon}</div>
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("narrative")} className="flex-grow py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] hover:bg-white hover:text-black transition-all">
                               Start_Dialogue
                            </button>
                            <button className="px-12 py-8 border border-black/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-black">
                               PDF_Manifesto
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE NARRATIVE VIEW (ABOUT/CONTACT) */}
        {view === "narrative" && (
          <motion.div key="narrative" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 p-12 md:p-32 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-black decoration-2 underline-offset-8 italic">The_Philosophical_Void</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-black uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We treat architecture as an act of subtraction. We don't add; we reveal the structural truth of the space. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/5">
                      {[
                        { icon: <Activity className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Layers className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-black leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#f5f5f5] rounded-[4rem] p-12 overflow-hidden border border-black/5 group">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Studio" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s]" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 bg-black text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce">
                         View_Full_Archive
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
            <span>Concrete_Visions_Node</span>
            <span>Est. 2026.04</span>
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
