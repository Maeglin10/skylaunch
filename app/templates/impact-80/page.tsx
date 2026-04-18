"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Menu, Search, Droplets, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, FlaskConical, MousePointer2 } from "lucide-react";
import "../premium.css";

const LAB_REPORTS = [
  { id: 1, title: "LAVA_SYNC", cat: "Fluid_Motion", status: "Optimal", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "MERCURY_FLOW", cat: "Liquid_Metal", status: "Critical", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "PLASMA_GRID", cat: "Energy_Viz", status: "Active", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop" },
];

const TRAIL_COUNT = 12;

export default function LiquidTraceSPA() {
  const [view, setView] = useState<"trace" | "fluid" | "lab">("trace");
  const [activeItem, setActiveItem] = useState(0);
  const [points, setPoints] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPoints((prev) => {
        const newPoints = [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev];
        return newPoints.slice(0, TRAIL_COUNT);
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="premium-theme bg-[#050505] text-[#f43f5e] min-h-screen selection:bg-[#f43f5e] selection:text-white font-mono overflow-x-hidden">
      
      {/* Liquid Goo Filter Layer */}
      <div style={{ filter: 'url(#liquid-goo)' }} className="fixed inset-0 z-0 pointer-events-none opacity-20">
         <AnimatePresence>
            {points.map((p, i) => (
               <motion.div 
                  key={p.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5 - (i * 0.1), opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute w-24 h-24 bg-[#f43f5e] rounded-full"
                  style={{ left: p.x - 48, top: p.y - 48, zIndex: TRAIL_COUNT - i }}
               />
            ))}
         </AnimatePresence>
      </div>

      {/* SVG Liquid Filter Definition */}
      <svg className="hidden">
         <defs>
            <filter id="liquid-goo">
               <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
               <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
               <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
         </defs>
      </svg>

      {/* Global Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#f43f5e]/10">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("trace")} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors flex items-center gap-4">
              <FlaskConical className="w-6 h-6 animate-pulse" /> LAVA_LAB&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Fluid_Stable
              <span className="text-white">Ref: 0x80_L</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("trace")} className={`hover:opacity-100 transition-opacity ${view === 'trace' ? 'text-white opacity-100 underline decoration-rose-600 underline-offset-8 italic' : ''}`}>THE_TRACE</button>
           <button onClick={() => setView("lab")} className={`hover:opacity-100 transition-opacity ${view === 'lab' ? 'text-white opacity-100 underline decoration-rose-600 underline-offset-8 italic' : ''}`}>THE_LAB</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE TRACE VIEW (LANDING) */}
        {view === "trace" && (
          <motion.div key="trace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b-2 border-[#f43f5e]/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] text-[#f43f5e] opacity-40 mb-4 block underline decoration-[#f43f5e]/10 underline-offset-8 italic">Kinetic_Output // Series_080</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] text-white">LIQUID. <br/> <span className="text-[#f43f5e]">TRACE.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic">Core_Flow</div>
                   <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['10%', '70%', '30%', '50%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-[#f43f5e]" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {LAB_REPORTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-[3rem] overflow-hidden border border-[#f43f5e]/10 hover:border-[#f43f5e]/40 transition-all cursor-pointer shadow-2xl"
                    onClick={() => { setActiveItem(i); setView("fluid"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-[2s] group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-white/5 border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <MousePointer2 className="w-5 h-5 text-[#f43f5e]" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity text-[#f43f5e]">TRACE_0x{p.id}</div>
                        </div>
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest text-[#f43f5e]/40 mb-2 block italic">{p.cat}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white group-hover:text-[#f43f5e] transition-colors">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>

             <div className="mt-24 flex items-center gap-6 opacity-20 font-black text-[10px] uppercase tracking-[1em] italic text-[#f43f5e]">
                Interacting_With_Surface_Tension <MoveRight className="w-6 h-6 animate-pulse" />
             </div>
          </motion.div>
        )}

        {/* THE FLUID VIEW (DEEP DIVE) */}
        {view === "fluid" && (
          <motion.div key="fluid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("trace")} className="fixed top-12 left-12 z-[60] bg-rose-600 text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-black">
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.02] select-none pointer-events-none italic tracking-tighter text-center text-rose-600">
                      TRACE
                   </div>
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border border-[#f43f5e]/10 bg-white/5 shadow-2xl group">
                         <Image src={LAB_REPORTS[activeItem].img} alt="Fluid" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-2xl border border-white/10">
                            <Layers className="w-6 h-6 text-white animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-rose-500 mb-8 block underline decoration-rose-600 decoration-4 underline-offset-8 italic">Liquid_Sync // {LAB_REPORTS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[10vw] font-black italic uppercase tracking-tighter leading-none text-white">{LAB_REPORTS[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-[#f43f5e]">Allocation: SYNCHRONIZED</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed">
                            Dynamic trace for {LAB_REPORTS[activeItem].title}. System integrity at 100%. Surface tension nominal at 42mN/m. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-rose-600/10">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Class_A" },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "Sub_Atomic" },
                              { icon: <Activity className="w-5 h-5" />, l: "Throughput", v: LAB_REPORTS[activeItem].status },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center text-rose-500">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("trace")} className="flex-grow py-8 bg-rose-600 text-white font-black uppercase text-xs tracking-[1em] hover:bg-white hover:text-black transition-all shadow-2xl">
                               Return_to_Trace
                            </button>
                            <button className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-white">
                               PDF_Spec
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE LAB VIEW (INFO) */}
        {view === "lab" && (
          <motion.div key="lab" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-rose-500 opacity-60 block underline decoration-rose-600/20 underline-offset-8 italic">The_Experiment_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60">
                      We treat liquid dynamics as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-rose-600/20 text-rose-500">
                      {[
                        { icon: <Activity className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-rose-600 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-rose-600/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-white/5 rounded-[4rem] p-12 overflow-hidden border border-[#f43f5e]/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Lab" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-rose-600 text-rose-600 text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-rose-600 hover:text-black transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#f43f5e]">
         <div className="flex gap-12 text-rose-600">
            <span>Liquid_Trace_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-rose-600">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-rose-600 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
