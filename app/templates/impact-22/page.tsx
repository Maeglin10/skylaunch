"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, TrendingUp, Shield, Activity, Plus, BarChart3, Globe, Compass, Cpu } from "lucide-react";
import "../premium.css";

const PORTFOLIO = [
  { id: 1, name: "ALPHA_CAPITAL", cat: "Deep_Tech", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", valuation: "1.2B" },
  { id: 2, name: "NEXUS_INFRA", cat: "Logistics", img: "https://images.unsplash.com/photo-1449156059431-789c6d4a90b5?q=80&w=1000&auto=format&fit=crop", valuation: "850M" },
  { id: 3, name: "QUANTUM_SEC", cat: "Defense", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", valuation: "2.4B" },
];

export default function ExecutiveStrategySPA() {
  const [view, setView] = useState<"slider" | "metrics" | "network">("slider");
  const [activeItem, setActiveItem] = useState(0);

  const next = () => setActiveItem((prev) => (prev + 1) % PORTFOLIO.length);

  return (
    <div className="premium-theme bg-[#050505] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-indigo-600">
      
      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <button onClick={() => setView("slider")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform pointer-events-auto">
           AETHER_STRATEGY&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30 pointer-events-auto">
           <button onClick={() => setView("slider")} className={`hover:opacity-100 transition-opacity ${view === 'slider' ? 'text-white opacity-100' : ''}`}>PORTFOLIO</button>
           <button onClick={() => setView("metrics")} className={`hover:opacity-100 transition-opacity ${view === 'metrics' ? 'text-white opacity-100' : ''}`}>METRICS</button>
           <button onClick={() => setView("network")} className={`hover:opacity-100 transition-opacity ${view === 'network' ? 'text-white opacity-100' : ''}`}>NETWORK</button>
        </div>
        <div className="flex items-center gap-8 pointer-events-auto">
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* SLIDER VIEW (TRIPLE COLUMN) */}
        {view === "slider" && (
          <motion.div key="slider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full">
             <div className="flex w-full h-full">
                
                {/* Left Column: Contextual Data */}
                <motion.div 
                   initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                   className="flex-1 relative hidden lg:flex flex-col justify-center p-12 border-r border-white/5 bg-black"
                >
                   <div className="absolute top-32 left-12 opacity-10">
                      <BarChart3 className="w-24 h-24" />
                   </div>
                   <div className="space-y-12 relative z-10">
                      <span className="text-[10px] uppercase font-black tracking-[0.5em] text-indigo-500 opacity-60 block">Strategy_Brief</span>
                      <p className="text-3xl font-serif italic text-white/50 leading-relaxed uppercase tracking-tight">
                         Securing the backbone of next-gen digital infrastructure.
                      </p>
                      <div className="space-y-4">
                         <div className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Asset_Valuation</div>
                         <div className="text-5xl font-black italic tracking-tighter">${PORTFOLIO[activeItem].valuation}</div>
                      </div>
                   </div>
                </motion.div>

                {/* Center Column: Core Visual */}
                <motion.div 
                   initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                   className="flex-[2] relative overflow-hidden group border-r border-white/5"
                >
                   <Image src={PORTFOLIO[activeItem].img} alt="Asset" fill className="object-cover brightness-50 contrast-125 saturate-50 group-hover:scale-110 transition-transform duration-[4s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="text-[10px] uppercase tracking-[1em] font-black mb-8">{PORTFOLIO[activeItem].cat}</motion.span>
                      <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-12 mix-blend-overlay">{PORTFOLIO[activeItem].name}</h2>
                      <button onClick={next} className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[1em] hover:bg-indigo-500 hover:text-white transition-all shadow-2xl skew-x-[-10deg]">
                         Next_Asset
                      </button>
                   </div>
                   <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center opacity-20 text-[9px] font-black tracking-widest">
                      <span>Ref: 0x442_A</span>
                      <span>Verified: 2026</span>
                   </div>
                </motion.div>

                {/* Right Column: Tactical Display */}
                <motion.div 
                   initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                   className="flex-1 relative hidden md:flex flex-col justify-center p-12 bg-black/40 backdrop-blur-xl"
                >
                   <div className="space-y-16">
                      {[
                        { icon: <Shield className="w-5 h-5" />, t: "Risk_Inertia", v: "Minimal_Exposure" },
                        { icon: <Compass className="w-5 h-5" />, t: "Growth_Vector", v: "+14.2%_YoY" },
                        { icon: <Cpu className="w-5 h-5" />, t: "Core_Module", v: "Distributed_Trust" },
                      ].map((s, i) => (
                        <div key={i} className="flex gap-6 items-start">
                           <div className="text-indigo-500 mt-1">{s.icon}</div>
                           <div>
                              <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.t}</div>
                              <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>

             </div>
          </motion.div>
        )}

        {/* METRICS VIEW */}
        {view === "metrics" && (
          <motion.div key="metrics" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen">
             <div className="flex justify-between items-end mb-32 border-b border-white/10 pb-12">
                <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none text-white">PERFORMANCE</h1>
                <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20 text-indigo-500 font-mono">Real_Time_Sync</div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                {[
                  { l: "Total Asset Value", v: "4.2B", i: <TrendingUp className="w-8 h-8" /> },
                  { l: "Global Network Nodes", v: "142", i: <Globe className="w-8 h-8" /> },
                  { l: "Operational Efficiency", v: "99.8%", i: <Activity className="w-8 h-8" /> },
                ].map((stat, i) => (
                  <div key={i} className="glass p-12 rounded-[3rem] border border-white/5 relative group overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">{stat.i}</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6 italic">{stat.l}</div>
                     <div className="text-6xl font-black italic tracking-tighter text-white group-hover:text-indigo-500 transition-colors">{stat.v}</div>
                     <div className="mt-8 flex gap-2 h-1 w-full bg-white/5">
                        <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 2, delay: i * 0.2 }} className="bg-indigo-500 h-full" />
                     </div>
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                   <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase">The <br/> Investment <br/> Thesis.</h2>
                   <p className="text-2xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We do not predict the future; we architect it through strategic placement in foundational technologies. Our portfolio is a blueprint for the coming decade.
                   </p>
                </div>
                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                   <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop" alt="Strategy" fill className="object-cover" />
                </div>
             </div>
          </motion.div>
        )}

        {/* NETWORK VIEW (CONTACT) */}
        {view === "network" && (
          <motion.div key="network" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-4xl mx-auto min-h-screen">
             <div className="glass p-12 md:p-24 rounded-[4rem] border border-white/5 text-center">
                <span className="text-[10px] uppercase tracking-[1.2em] text-indigo-500 font-black mb-12 block italic underline decoration-indigo-500 underline-offset-8">Confidential_Uplink</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-16 text-white leading-none uppercase">Join The <br/> Sovereignty.</h2>
                <div className="space-y-16 text-left">
                   <div className="space-y-12">
                      <div className="border-b border-white/10 pb-6 group">
                         <label className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-4 italic group-focus-within:text-indigo-500 transition-colors">Entity_ID</label>
                         <input type="text" placeholder="Designate_Organization" className="bg-transparent border-none text-2xl italic tracking-tighter w-full outline-none text-white/40 focus:text-white transition-colors" />
                      </div>
                      <div className="border-b border-white/10 pb-6 group">
                         <label className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-4 italic group-focus-within:text-indigo-500 transition-colors">Strategic_Intent</label>
                         <select className="bg-transparent border-none text-xl italic tracking-tighter w-full outline-none text-white/40 focus:text-white transition-colors appearance-none">
                            <option>Allocation_Inquiry</option>
                            <option>Strategic_Partnership</option>
                            <option>Infrastructure_Support</option>
                         </select>
                      </div>
                   </div>
                   <button className="w-full py-10 bg-indigo-600 text-white font-black uppercase text-xs tracking-[1.5em] hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(79,70,229,0.3)] italic">
                      Transmit_Signal
                   </button>
                </div>
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-20 text-[9px] font-black tracking-widest uppercase italic">
                   <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4" /> End-to-End Encryption
                   </div>
                   <div className="flex items-center gap-3 font-mono">
                      Timestamp: 2026.04.17.17.38
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Aether_Venture_Group</span>
            <span>Est. 1998</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Strategy_Portal <br /> Zurich_Node
            </div>
            <div className="flex gap-[1px] h-4">
               {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className={`w-[2px] h-full bg-indigo-500`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
