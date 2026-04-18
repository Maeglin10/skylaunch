"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Menu, Box, Layers, Shield, Activity, Plus, Maximize2, MoveRight, Compass, MoveDiagonal2 } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "CLUST_VOID_01", tag: "Structural", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "A nexus study of overlapping volumes and structural tension." },
  { id: 2, name: "NEXUS_LEVEL_04", tag: "Interface", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop", desc: "Fluid, organic interactions inspired by the movement of raw silk." },
  { id: 3, name: "CORE_PLATE_99", tag: "Compute", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of photonic processing and thermal inertia." },
  { id: 4, name: "STRUCT_VOID_05", tag: "Housing", img: "https://images.unsplash.com/photo-1518005020251-582c7eb8365d?q=80&w=1000&auto=format&fit=crop", desc: "Zero-threshold living in volcanic terrain." },
];

export default function NexusClusterSPA() {
  const [view, setView] = useState<"cluster" | "node" | "network">("cluster");
  const [activeItem, setActiveItem] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.05);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.05);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="premium-theme bg-[#f8fcfb] text-[#004d40] min-h-screen selection:bg-[#004d40] selection:text-white font-mono overflow-x-hidden">
      
      {/* Background HUD Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 77, 64, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 77, 64, 0.2) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-[#004d40]/10">
        <button onClick={() => setView("cluster")} className="text-xl font-black uppercase tracking-tighter hover:opacity-100 transition-opacity">
           NEXUS_CLUSTER&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("cluster")} className={`hover:opacity-100 transition-opacity ${view === 'cluster' ? 'text-[#004d40] opacity-100 underline decoration-[#004d40] decoration-2 underline-offset-8' : ''}`}>THE_CLUSTER</button>
           <button onClick={() => setView("network")} className={`hover:opacity-100 transition-opacity ${view === 'network' ? 'text-[#004d40] opacity-100 underline decoration-[#004d40] decoration-2 underline-offset-8' : ''}`}>THE_NETWORK</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest italic">
              Verification: Level_4_Pass
           </div>
           <button onClick={() => setView("network")} className="px-8 py-3 bg-[#004d40] text-white font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all italic">
              Sync_Node
           </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* CLUSTER VIEW (PARALLAX INDEX) */}
        {view === "cluster" && (
          <motion.div key="cluster" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full flex items-center justify-center">
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <header className="text-center mb-12">
                   <h1 className="text-[12vw] font-black uppercase italic tracking-tighter leading-[0.8] mix-blend-multiply opacity-10 select-none">
                      Archive. <br /> <span className="not-italic">MultiD.</span>
                   </h1>
                </header>
             </div>

             <div className="relative w-full h-full">
                {PROJECTS.map((p, i) => (
                   <motion.div 
                    key={p.id}
                    style={{ 
                       left: `${20 + i * 20}%`, 
                       top: `${30 + (i % 2) * 20}%`,
                       x: smoothX,
                       y: smoothY
                    }}
                    className="absolute group w-64 h-80 md:w-80 md:h-[30rem] bg-white border border-[#004d40]/10 rounded-3xl overflow-hidden shadow-2xl hover:z-50 transition-all cursor-pointer"
                    onClick={() => { setActiveItem(i); setView("node"); }}
                   >
                      <Image src={p.img} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#004d40]/80 to-transparent p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] uppercase font-black tracking-widest text-white/60 mb-2 block">{p.tag}</span>
                         <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">{p.name}</h3>
                      </div>
                      <div className="absolute top-6 left-6 p-3 bg-white/80 backdrop-blur-xl rounded-full text-[#004d40] border border-[#004d40]/10 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Maximize2 className="w-4 h-4" />
                      </div>
                   </motion.div>
                ))}
             </div>

             <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 font-black text-[10px] uppercase tracking-[0.5em] mix-blend-difference pointer-events-none">
                <Plus className="w-4 h-4" /> Hover to Distort Nexus Perimeter
             </div>
          </motion.div>
        )}

        {/* NODE VIEW (PROJECT DETAIL) */}
        {view === "node" && (
          <motion.div key="node" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("cluster")} className="fixed top-12 left-12 z-[60] bg-[#004d40] text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 h-screen overflow-hidden">
                   <div className="absolute inset-0 bg-[#f0f5f4] z-[-1]" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vh] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-[#004d40]">
                      STRUCTURE
                   </div>
                   
                   <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl group">
                         <Image src={PROJECTS[activeItem].img} alt="Detail" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" priority />
                         <div className="absolute top-12 left-12 p-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-[#004d40]/10">
                            <Layers className="w-6 h-6 text-[#004d40] animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-[#004d40] decoration-4 underline-offset-8">Node_Sync // 0x442_B</span>
                            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-[#004d40]">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic">Global_Allocation: Reserved</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-50 text-[#004d40]">
                            {PROJECTS[activeItem].desc} Every angle was computed to maximize silence and minimize human interference with the landscape.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-[#004d40]/10">
                            {[
                              { icon: <Compass className="w-5 h-5" />, l: "Coordinates", v: "52.52 / 13.40" },
                              { icon: <MoveDiagonal2 className="w-5 h-5" />, l: "Dimensions", v: "14,200 SQM" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "Military_Grade" },
                              { icon: <Box className="w-5 h-5" />, l: "Core", v: "Concrete_V1" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center text-[#004d40]">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("network")} className="flex-grow py-8 bg-[#004d40] text-white font-black uppercase text-xs tracking-[1em] hover:bg-black transition-all shadow-2xl">
                               Establish_Link
                            </button>
                            <button className="px-12 py-8 border border-[#004d40]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-[#004d40]">
                               Data_Sheet
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* NETWORK VIEW (INFO/ABOUT) */}
        {view === "network" && (
          <motion.div key="network" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block text-[#004d40] underline decoration-[#004d40] decoration-2 underline-offset-8 italic">The_Philosophical_Void</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-[#004d40] uppercase">The <br/> Nexus.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#004d40]/60">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#004d40]/20">
                      {[
                        { icon: <Activity className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#004d40] flex items-center justify-center text-[#004d40] group-hover:bg-[#004d40] group-hover:text-white transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-[#004d40] leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#004d40]">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-[#004d40]/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Void" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s]" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-[#004d40] text-[#004d40] text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-[#004d40] hover:text-white transition-all">
                         Handshake_Protocol
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#004d40]">
         <div className="flex gap-12 text-[#004d40]">
            <span>Nexus_Node // alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-[#004d40]">
            <div className="text-right leading-tight italic">
               Cluster_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#004d40] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
