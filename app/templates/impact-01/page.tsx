"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Cpu, Zap, Box, Lock, MousePointer2, ChevronRight, Menu, X } from "lucide-react";
import "../premium.css";

export default function TechNoirSPA() {
  const [view, setView] = useState<"home" | "specs" | "order">("home");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  const specs = [
    { title: "Neural Sync", value: "0.2ms", desc: "Ultra-low latency quantum link." },
    { title: "Visual Core", value: "16K", desc: "Dual micro-OLED 120Hz displays." },
    { title: "Spatial OS", value: "Bio-v4", desc: "Neural-integrated operating layer." },
    { title: "Chassis", value: "Titan", desc: "Aerospace-grade composite shell." },
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen font-sans selection:bg-rose-500 overflow-x-hidden">
      
      {/* HUD Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8 md:px-12 flex justify-between items-center mix-blend-difference">
        <button onClick={() => setView("home")} className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2 group">
          <div className="w-8 h-8 bg-rose-600 rounded-sm flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
             <span className="text-xs">A</span>
          </div>
          <span>AEVIA<span className="text-rose-600 ml-1">L</span>ABS</span>
        </button>

        <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase font-bold tracking-[0.3em] opacity-40">
           <button onClick={() => setView("home")} className="hover:opacity-100 transition-opacity">Protocol</button>
           <button onClick={() => setView("specs")} className="hover:opacity-100 transition-opacity">Neural_Specs</button>
           <button className="hover:opacity-100 transition-opacity">Whitepaper</button>
        </div>

        <div className="flex items-center gap-6">
           <button onClick={() => setView("order")} className="px-6 py-2 border border-white/20 hover:border-rose-500 hover:text-rose-500 uppercase text-[10px] font-bold tracking-widest bg-black/40 backdrop-blur-md transition-all">
             Secure_Access
           </button>
           <Menu className="w-5 h-5 lg:hidden" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* HOMEPAGE VIEW */}
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             {/* Hero */}
             <div className="relative h-[120vh] w-full flex flex-col items-center justify-center overflow-hidden">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
                   <Image 
                     src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" 
                     fill 
                     className="object-cover opacity-20 mix-blend-luminosity grayscale scale-110" 
                     alt="Tech Background" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
                </motion.div>

                <div className="relative z-10 text-center px-6 pt-32">
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                     className="mb-8 font-mono text-rose-500 text-[10px] uppercase tracking-[0.5em] flex items-center justify-center gap-3"
                   >
                      <div className="h-[1px] w-8 bg-rose-500" /> System_Online <div className="h-[1px] w-8 bg-rose-500" />
                   </motion.div>
                   
                   <motion.h1 
                     initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                     className="text-7xl md:text-[14rem] font-black uppercase tracking-tighter leading-[0.8] mb-12 mix-blend-overlay"
                   >
                      ALPHA<br/>
                      <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>PROTOCOL</span>
                   </motion.h1>
                   
                   <motion.p 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                     className="text-zinc-500 text-sm md:text-lg max-w-xl mx-auto uppercase tracking-widest font-light mb-16 leading-relaxed"
                   >
                      Redefining human-machine interaction through quantum-neural bridging. Experience the void.
                   </motion.p>
                   
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <button onClick={() => setView("order")} className="w-full md:w-auto px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-rose-600 hover:text-white transition-all duration-300">
                         Initiate Uplink
                      </button>
                      <button onClick={() => setView("specs")} className="w-full md:text-left font-mono text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-3 transition-opacity">
                         <ChevronRight className="w-4 h-4 text-rose-500" /> View Architecture
                      </button>
                   </motion.div>
                </div>

                {/* Vertical HUD Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-[1px] bg-gradient-to-t from-rose-600 to-transparent" />
             </div>

             {/* Features Section */}
             <section className="py-40 px-8 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                   {[
                     { icon: <Cpu className="w-8 h-8 text-rose-500" />, title: "Bio-Processing", desc: "Integrated neural core for direct thought to data execution." },
                     { icon: <Shield className="w-8 h-8 text-rose-500" />, title: "Quantum Lock", desc: "Military grade lattice encryption for your sensory data." },
                     { icon: <Zap className="w-8 h-8 text-rose-500" />, title: "Sync Edge", desc: "Zero-latency edge computing integration for real-time visual logic." },
                   ].map((f, i) => (
                     <motion.div 
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        key={i} className="flex flex-col gap-6 group"
                     >
                        <div className="flex items-center gap-4">
                           {f.icon}
                           <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-rose-500/30 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tighter">{f.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed uppercase tracking-wider">{f.desc}</p>
                     </motion.div>
                   ))}
                </div>
             </section>

             {/* Dynamic Image Section */}
             <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1550741164-c0fa6e19e782?q=80&w=2000&auto=format&fit=crop" 
                  fill className="object-cover opacity-20 sepia hue-rotate-180" 
                  alt="Tech Detail" 
                />
                <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-sm" />
                <div className="relative z-10 text-center px-8">
                   <h2 className="text-5xl md:text-8xl font-black uppercase mb-12 strike-text">Dominance</h2>
                   <button onClick={() => setView("order")} className="group relative px-12 py-6 border border-white/10 hover:border-rose-500 transition-colors">
                      <span className="text-xs uppercase tracking-[0.5em] font-bold">Secure Unit_01</span>
                   </button>
                </div>
             </section>
          </motion.div>
        )}

        {/* SPECS VIEW */}
        {view === "specs" && (
          <motion.div key="specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-8 max-w-5xl mx-auto">
             <div className="mb-24">
                <span className="text-rose-500 font-mono text-[10px] uppercase tracking-widest mb-4 block">Hardware_Audit</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Architecture</h1>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12">
                {specs.map((s, i) => (
                   <div key={i} className="border-l border-rose-500/20 pl-8 py-4">
                      <div className="text-[10px] uppercase tracking-widest opacity-40 mb-2 font-bold">{s.title}</div>
                      <div className="text-4xl font-black italic mb-4">{s.value}</div>
                      <p className="text-zinc-500 text-sm uppercase tracking-wider">{s.desc}</p>
                   </div>
                ))}
             </div>

             <div className="mt-32 aspect-video w-full bg-white/5 flex items-center justify-center rounded-2xl relative overflow-hidden group">
                <Image 
                  src="https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=1500&auto=format&fit=crop" 
                  fill className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" 
                  alt="Detailed View" 
                />
                <div className="relative z-10 flex flex-col items-center gap-6">
                   <span className="text-[10px] uppercase tracking-[1em] font-black opacity-40">Internal_Optics</span>
                   <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 bg-rose-600 rounded-full" />
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* ORDER VIEW */}
        {view === "order" && (
          <motion.div key="order" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-8 max-w-3xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="text-center mb-16">
                <h2 className="text-6xl font-black uppercase mb-4 tracking-tighter italic">Secure_Uplink</h2>
                <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Select your priority unit configuration</p>
             </div>

             <div className="space-y-6 mb-16">
                {[
                  { name: "Dev_Proto", price: "4,200", tag: "Beta Access" },
                  { name: "Industrial_X", price: "12,500", tag: "Enterprise" },
                  { name: "Executive_Core", price: "24,000", tag: "VIP Limited" },
                ].map((tier, i) => (
                  <button key={i} className="w-full p-8 border border-white/5 hover:border-rose-500/50 hover:bg-rose-500/[0.02] flex items-center justify-between group transition-all">
                     <div className="text-left">
                        <div className="text-[9px] uppercase tracking-widest text-rose-500 font-bold mb-1">{tier.tag}</div>
                        <div className="text-2xl font-black uppercase">{tier.name}</div>
                     </div>
                     <div className="text-right">
                        <div className="text-2xl font-mono">${tier.price}</div>
                        <div className="text-[10px] opacity-40 uppercase group-hover:text-rose-500">Select_Unit</div>
                     </div>
                  </button>
                ))}
             </div>

             <div className="flex flex-col items-center gap-8">
                <button className="w-full py-6 bg-white text-black font-black uppercase text-sm tracking-[0.4em] hover:bg-rose-600 hover:text-white transition-all">
                   Finalize Order
                </button>
                <div className="flex items-center gap-3 opacity-20">
                   <Lock className="w-4 h-4" />
                   <span className="text-[9px] uppercase tracking-widest">Quantum_Encrypted_Link</span>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Persistent Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference pointer-events-none opacity-40">
         <div className="font-mono text-[9px] uppercase tracking-widest">Node_Alpha_8.2: Stable</div>
         <div className="font-mono text-[9px] uppercase tracking-widest">© 2026 Aevia Industrial</div>
      </footer>

      <style>{`
        .strike-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

