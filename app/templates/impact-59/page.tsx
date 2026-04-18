"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, Terminal, Cpu, Zap, Shield, Activity, Share2, Plus, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const HARDWARE = [
  { id: 1, name: "ORION_CORE_V1", price: 4850, tag: "Compute", img: "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=1000&auto=format&fit=crop", desc: "4.8GHz photonic processor with integrated neural tensor cores. 128GB unified optical memory." },
  { id: 2, name: "FLUX_DRIVE_0", price: 1200, tag: "Storage", img: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000&auto=format&fit=crop", desc: "Cold storage lattice with zero-latency retrieval. 10TB holographic projection density." },
  { id: 3, name: "NEXUS_LINK_4", price: 2900, tag: "Network", img: "https://images.unsplash.com/photo-1558483265-27a3a9106093?q=80&w=1000&auto=format&fit=crop", desc: "Quantum-entangled communication bridge. Sub-atomic signal stability in high-EMI zones." },
];

export default function HardwareInterfaceSPA() {
  const [view, setView] = useState<"spec" | "schematic" | "infra">("spec");
  const [activeItem, setActiveItem] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [cart, setCart] = useState(0);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 200);
  };

  return (
    <div className={`premium-theme bg-[#020202] text-[#00ffcc] min-h-screen selection:bg-[#00ffcc] selection:text-black font-mono overflow-x-hidden ${glitch ? 'grayscale invert' : ''}`}>
      
      {/* HUD Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00ffcc]/10 shadow-[0_0_20px_#00ffcc]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00ffcc08_0%,_transparent_70%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-[#00ffcc]/20 blur-sm z-10"
        />
      </div>

      {/* Global Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#00ffcc]/10">
        <button onClick={() => { setView("spec"); triggerGlitch(); }} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors">
           SPEC_PROTOCOL&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("spec")} className={`hover:opacity-100 transition-opacity ${view === 'spec' ? 'text-white opacity-100' : ''}`}>THE_SPEC</button>
           <button onClick={() => setView("infra")} className={`hover:opacity-100 transition-opacity ${view === 'infra' ? 'text-white opacity-100' : ''}`}>INFRASTRUCTURE</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest text-[#00ffcc]">
              Status: Uplink_Verified
           </div>
           <button className="flex items-center gap-4 group">
              <ShoppingCart className="w-5 h-5 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black opacity-30 group-hover:opacity-100 font-mono">[{cart}]</span>
           </button>
           <Terminal className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* SPEC VIEW (CATALOG) */}
        {view === "spec" && (
          <motion.div key="spec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8 md:px-12 max-w-[1800px] mx-auto">
             <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-[#00ffcc]/20 pb-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] text-[#00ffcc] opacity-40 mb-4 block">Hardware_Stack // Series_059</span>
                   <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">THE_SPEC</h1>
                </div>
                <div className="flex gap-12 items-end text-right">
                   <div className="space-y-2">
                      <div className="text-[9px] font-black opacity-20 uppercase tracking-widest leading-tight">CPU_LOAD: 12%</div>
                      <div className="w-32 h-1 bg-[#00ffcc]/10 rounded-full overflow-hidden">
                         <motion.div animate={{ width: ['20%', '60%', '40%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-[#00ffcc]" />
                      </div>
                   </div>
                   <Activity className="w-10 h-10 opacity-20 text-[#00ffcc] animate-pulse" />
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {HARDWARE.map((h, i) => (
                  <motion.div 
                    key={h.id} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="group relative flex flex-col border border-[#00ffcc]/10 p-8 hover:bg-[#00ffcc]/5 transition-all cursor-pointer rounded-2xl"
                    onClick={() => { setActiveItem(i); setView("schematic"); triggerGlitch(); }}
                  >
                     <div className="absolute top-8 left-8 z-10 opacity-20 group-hover:opacity-100 group-hover:text-white transition-opacity font-black text-[10px]">
                        ID_00{h.id}
                     </div>
                     <div className="relative aspect-video mb-12 rounded-xl overflow-hidden border border-[#00ffcc]/5">
                        <Image src={h.img} alt={h.name} fill className="object-cover opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[3s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent opacity-60" />
                     </div>
                     <div>
                        <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-40 mb-2 block">{h.tag}</span>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6 group-hover:text-[#00ffcc] transition-colors">{h.name}</h2>
                        <div className="flex justify-between items-center border-t border-[#00ffcc]/10 pt-6">
                           <span className="text-xl font-bold italic text-[#00ffcc] opacity-40 group-hover:opacity-100 transition-all">${h.price}</span>
                           <Plus className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-90" />
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* SCHEMATIC VIEW (PRODUCT DETAIL) */}
        {view === "schematic" && (
          <motion.div key="schematic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => { setView("spec"); triggerGlitch(); }} className="fixed top-12 left-12 z-[60] bg-[#00ffcc] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-[0_0_30px_#00ffcc]">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-24 overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00ffcc05_0%,_transparent_70%)]" />
                   
                   <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative aspect-[3/2] w-full rounded-3xl overflow-hidden border border-[#00ffcc]/10 group">
                         <Image src={HARDWARE[activeItem].img} alt="Hardware" fill className="object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[3s]" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 shadow-xl backdrop-blur-md rounded-xl border border-[#00ffcc]/20">
                            <Layers className="w-6 h-6 animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#00ffcc] mb-8 block underline decoration-[#00ffcc]/40 underline-offset-8">Schematic_Verification</span>
                            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-white">{HARDWARE[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-40">${HARDWARE[activeItem].price}</div>
                         </div>

                         <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-60">
                            {HARDWARE[activeItem].desc} Verified for industrial-grade deployments in high-stress computational environments.
                         </p>

                         <div className="grid grid-cols-2 gap-8 py-10 border-y border-[#00ffcc]/10">
                            {[
                              { icon: <Cpu className="w-5 h-5" />, l: "Architecture", v: "Optic_Gate_04" },
                              { icon: <Zap className="w-5 h-5" />, l: "Power_Draw", v: "4.2W_TDP" },
                              { icon: <Shield className="w-5 h-5" />, l: "Encryption", v: "Sub_Atomic" },
                              { icon: <Activity className="w-5 h-5" />, l: "Latency", v: "0.2ms_Verified" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-4 items-center">
                                 <div className="text-[#00ffcc] opacity-40">{s.icon}</div>
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest">{s.l}</div>
                                    <div className="text-xs font-black uppercase italic tracking-tighter mt-1 text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6">
                            <button onClick={() => { setCart(c => c + 1); setView("spec"); triggerGlitch(); }} className="flex-grow py-8 bg-[#00ffcc] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-[0_0_50px_rgba(0,255,204,0.3)]">
                               Initiate_Uplink
                            </button>
                            <button className="px-12 py-8 border border-[#00ffcc]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all text-[#00ffcc]">
                               Data_Sheet
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* INFRASTRUCTURE VIEW */}
        {view === "infra" && (
          <motion.div key="infra" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen">
             <div className="flex justify-between items-end mb-32 border-b border-[#00ffcc]/20 pb-12">
                <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none text-white">INFRASTRUCTURE</h1>
                <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20 text-[#00ffcc]">Core_Node_Synthesis</div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-48">
                <div className="relative aspect-square glass rounded-3xl p-12 overflow-hidden border border-[#00ffcc]/10">
                   <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop" alt="Server" fill className="object-cover opacity-30 grayscale hover:scale-110 transition-transform duration-[5s]" />
                   <div className="absolute inset-0 bg-[#00ffcc]/5 animate-pulse pointer-events-none" />
                </div>
                <div className="space-y-12">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-[#00ffcc] opacity-30 block">Stability_v_Core</span>
                   <p className="text-2xl md:text-3xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white">
                      We dismantle the boundary between biological intent and mechanical execution. Our infrastructure provides the backbone for next-generation intelligence.
                   </p>
                   <div className="space-y-12 pt-12">
                      {[
                        { t: "Photonic Switching", d: "Zero-loss data routing across optical lattice backplanes." },
                        { t: "Thermal Inertia", d: "Cryogenic stabilization for ultra-high clock cycles." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#00ffcc]/40 flex items-center justify-center font-black italic text-[#00ffcc] group-hover:bg-[#00ffcc] group-hover:text-black transition-all text-xl shadow-[0_0_20px_rgba(0,255,204,0.2)]">
                              0{i+1}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black mt-2 leading-relaxed text-[#00ffcc]">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="border-t border-[#00ffcc]/10 pt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all text-[#00ffcc]">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex flex-col items-center">
                     <Share2 className="w-8 h-8 mb-4 animate-pulse" />
                     <span className="text-[8px] font-black uppercase tracking-[0.6em]">NODE_UPLINK_0{i}</span>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Uptime: 99.999%</span>
            <span>Batch_042</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Protocol_059 <br /> Iceland_Node
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#00ffcc] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(0, 255, 204, 0.02);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(0, 255, 204, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
