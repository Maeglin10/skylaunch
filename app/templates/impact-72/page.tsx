"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Search, Mail, Share2, MessageCircle, Maximize2, Plus, ArrowUpRight, Box, Compass, MoveDiagonal2 } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "UNIT_VOID_01", cat: "Structural", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of vertical tension and concrete shadows in the urban void." },
  { id: 2, name: "PLATE_LEVEL_04", cat: "Interface", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop", desc: "Fluid, organic interactions inspired by the movement of raw silk." },
  { id: 3, name: "CORE_AXIS_99", cat: "Compute", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of photonic processing and thermal inertia." },
];

export default function StructuralStackSPA() {
  const [view, setView] = useState<"stack" | "frame" | "unit">("stack");
  const [activeItem, setActiveItem] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="premium-theme bg-[#f4f4f4] text-[#1a1a1a] min-h-screen selection:bg-black selection:text-white font-mono overflow-x-hidden">
      
      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/40 backdrop-blur-3xl border-b border-black/5">
        <button onClick={() => setView("stack")} className="text-xl font-black uppercase tracking-tighter hover:scale-105 transition-transform">
           STACK_UNIT&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("stack")} className={`hover:opacity-100 transition-opacity ${view === 'stack' ? 'text-black opacity-100 underline decoration-black decoration-2 underline-offset-8' : ''}`}>THE_STACK</button>
           <button onClick={() => setView("unit")} className={`hover:opacity-100 transition-opacity ${view === 'unit' ? 'text-black opacity-100 underline decoration-black decoration-2 underline-offset-8' : ''}`}>THE_STUDIO</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* STACK VIEW (3D INTERACTIVE) */}
        {view === "stack" && (
          <motion.div key="stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full flex items-center justify-center pt-24">
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                <h1 className="text-[15vw] font-black uppercase italic tracking-tighter leading-none opacity-[0.03] select-none">
                   Geometric. <br /> Unity.
                </h1>
             </div>

             <main 
               className="relative perspective-[2000px] z-10"
               onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}
             >
                <div className="relative w-[30vh] h-[40vh] md:w-[45vh] md:h-[60vh]">
                   {PROJECTS.map((p, i) => (
                      <motion.div 
                        key={p.id}
                        animate={{ 
                           rotateY: hovered ? (i - 1) * 35 : 0,
                           rotateZ: hovered ? (i - 1) * 5 : 0,
                           x: hovered ? (i - 1) * 250 : 0,
                           z: hovered ? -200 : (i * -40),
                           scale: hovered ? 1 : (1 - i * 0.05)
                        }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="absolute inset-0 bg-white shadow-2xl rounded-[3.5rem] overflow-hidden border-8 border-white group cursor-crosshair"
                        onClick={() => { setActiveItem(i); setView("frame"); }}
                      >
                         <Image src={p.img} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-[2s] contrast-125" />
                         <div className="absolute inset-0 bg-black/10 transition-opacity opacity-40 group-hover:opacity-0" />
                         
                         <div className="absolute bottom-12 left-12 right-12 text-white mix-blend-difference">
                            <span className="text-[10px] font-black italic mb-4 block tracking-widest leading-none underline decoration-white decoration-2 underline-offset-8">NODE_0x0{i}</span>
                            <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">{p.name}</h3>
                         </div>
                      </motion.div>
                   ))}
                </div>
             </main>

             <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 font-black text-[10px] uppercase tracking-[1em] mix-blend-difference pointer-events-none italic">
                {hovered ? 'Select a node to establish uplink' : 'Hover to fan structural nodes'}
             </div>
          </motion.div>
        )}

        {/* FRAME VIEW (PROJECT DETAIL) */}
        {view === "frame" && (
          <motion.div key="frame" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("stack")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#ebebeb]">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vh] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter">
                      SCHEMATIC
                   </div>
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl group">
                         <Image src={PROJECTS[activeItem].img} alt="Frame" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" priority />
                         <div className="absolute top-12 left-12 p-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-black/5">
                            <Maximize2 className="w-6 h-6 text-black animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black decoration-4 underline-offset-8 italic">Archive_Sync // {PROJECTS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-black">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic">Verification: OPTIMAL_PASS</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-50 text-black">
                            {PROJECTS[activeItem].desc} An architectural study involving multi-axis tension and structural transparency in minimalist environments.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-black/10">
                            {[
                              { icon: <MoveDiagonal2 className="w-5 h-5" />, l: "Dimensions", v: "14,200 SQM" },
                              { icon: <Compass className="w-5 h-5" />, l: "Vector", v: "Polar_South" },
                              { icon: <Box className="w-5 h-5" />, l: "Integrity", v: "Class_A" },
                              { icon: <Plus className="w-5 h-5" />, l: "Material", v: "Concrete_V1" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center text-black">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("stack")} className="flex-grow py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] hover:bg-black/80 transition-all shadow-2xl">
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

        {/* UNIT VIEW (ABOUT) */}
        {view === "unit" && (
          <motion.div key="unit" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16 text-black">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-black decoration-2 underline-offset-8 italic">The_Structural_Core</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We treat architecture as an act of subtraction. We don't add; we reveal the structural truth of the space. 100% precision. Zero noise.
                   </p>
                   <div className="flex gap-12 pt-12 border-t border-black/10">
                      <Share2 className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                      <MessageCircle className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                      <Mail className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                   </div>
                </div>
                <div className="relative aspect-square bg-[#ddd] rounded-[4rem] p-12 overflow-hidden border border-black/5 group shadow-2xl">
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
            <span>Stack_Unit_Alpha</span>
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
