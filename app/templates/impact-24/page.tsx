"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Globe, Zap, Shield, Activity, Plus, Radio, Satellite, Compass } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "NEBULA_CORE", cat: "Infrastructure", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop", desc: "A distributed compute network synchronized via quantum-entangled nodes." },
  { id: 2, name: "ORION_PULSE", cat: "Communication", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop", desc: "Sub-atomic signal stability for high-EMI zones in deep space transit." },
  { id: 3, name: "VOID_GATE", cat: "Security", img: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000&auto=format&fit=crop", desc: "Encryption layer that treat light as a cryptographic key. Zero-latency." },
  { id: 4, name: "STAR_LAB_01", cat: "Research", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop", desc: "Experimental habitat design for long-duration orbital deployment." },
  { id: 5, name: "SOLAR_DRIFT", cat: "Energy", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1000&auto=format&fit=crop", desc: "Next-gen solar harvesting mesh with 99.8% capture efficiency." },
];

export default function OrbitalArchiveSPA() {
  const [view, setView] = useState<"orbit" | "transmission" | "satellite">("orbit");
  const [activeItem, setActiveItem] = useState(0);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="premium-theme bg-[#020205] text-[#b3c7ff] h-screen w-full overflow-hidden relative font-sans selection:bg-[#4d79ff] selection:text-white">
      
      {/* Background Deep Space Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-20%] left-[-20%] w-[140vw] h-[140vw] bg-[radial-gradient(circle_at_center,_#1a2d5e_0%,_transparent_70%)] blur-[100px]"
        />
        
        {/* Orbit Grid Rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
           <div className="w-[85vh] h-[85vh] border border-[#b3c7ff] rounded-full" />
           <div className="w-[70vh] h-[70vh] border border-dashed border-[#b3c7ff] rounded-full animate-spin-slow" />
           <div className="w-[50vh] h-[50vh] border border-[#b3c7ff]/20 rounded-full" />
        </div>
      </div>

      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference pointer-events-none uppercase text-[10px] font-black tracking-[0.5em]">
        <button onClick={() => setView("orbit")} className="text-xl font-black italic tracking-tighter pointer-events-auto">ORBITAL_CORP&trade;</button>
        <div className="hidden md:flex gap-12 pointer-events-auto">
           <button onClick={() => setView("orbit")} className={`hover:opacity-40 transition-opacity ${view === 'orbit' ? 'text-white underline underline-offset-8' : ''}`}>THE_ORBIT</button>
           <button onClick={() => setView("satellite")} className={`hover:opacity-40 transition-opacity ${view === 'satellite' ? 'text-white underline underline-offset-8' : ''}`}>THE_SATELLITE</button>
        </div>
        <div className="flex items-center gap-8 pointer-events-auto">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] font-mono">
              UPLINK: ACTIVE_0x442
           </div>
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* ORBIT VIEW (CIRCULAR GRID) */}
        {view === "orbit" && (
          <motion.div key="orbit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center"
                >
                   <span className="text-[10px] uppercase tracking-[1em] opacity-20 mb-4 block">Deep_Space_Archive</span>
                   <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-4 mix-blend-overlay">
                      G_VOID.
                   </h1>
                   <div className="flex justify-center gap-8 opacity-20">
                      <Compass className="w-4 h-4 animate-spin-slow" />
                      <div className="text-[8px] font-black uppercase tracking-widest">Scanning Perpetual Perimeter</div>
                   </div>
                </motion.div>
             </div>

             <motion.div 
                drag="x"
                onDrag={(e, info) => setRotation(prev => prev + info.delta.x * 0.15)}
                className="relative w-full h-full flex items-center justify-center"
             >
                <motion.div 
                   animate={{ rotate: rotation }}
                   transition={{ type: "spring", damping: 40, stiffness: 120 }}
                   className="relative w-[30vh] h-[30vh]"
                >
                   {PROJECTS.map((p, i) => {
                      const angle = (i / PROJECTS.length) * 360;
                      return (
                         <div 
                            key={p.id}
                            className="absolute inset-0 flex items-center justify-center group"
                            style={{ transform: `rotate(${angle}deg) translateY(-42vh)` }}
                            onClick={() => { setActiveItem(i); setView("transmission"); }}
                         >
                            <motion.div 
                               animate={{ rotate: -rotation - angle }}
                               whileHover={{ scale: 1.1, y: -20 }}
                               className="relative w-40 h-56 md:w-48 md:h-64 bg-white/5 border border-white/10 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl group-hover:border-[#b3c7ff]/40 transition-all"
                            >
                               <Image src={p.img} alt={p.name} fill className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                               <div className="absolute bottom-4 left-4 right-4 text-left">
                                  <div className="text-[8px] uppercase font-black tracking-widest text-[#b3c7ff]/40 mb-1">{p.cat}</div>
                                  <div className="text-lg font-black uppercase italic tracking-tighter text-white">{p.name}</div>
                               </div>
                               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Radio className="w-4 h-4 text-[#b3c7ff]" />
                               </div>
                            </motion.div>
                         </div>
                      );
                   })}
                </motion.div>
             </motion.div>

             <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 font-black text-[10px] uppercase tracking-[0.5em] mix-blend-difference pointer-events-none">
                <Plus className="w-4 h-4" /> Drag to cycle Perimeter nodes
             </div>
          </motion.div>
        )}

        {/* TRANSMISSION VIEW (PROJECT DETAIL) */}
        {view === "transmission" && (
          <motion.div key="transmission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("orbit")} className="fixed top-12 left-12 z-[60] bg-[#b3c7ff] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-black">
                   <div className="absolute inset-0 opacity-20">
                      <Image src={PROJECTS[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
                   
                   <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative aspect-[3/4] w-full rounded-[3rem] overflow-hidden border border-[#b3c7ff]/20 shadow-2xl">
                         <Image src={PROJECTS[activeItem].img} alt="Asset" fill className="object-cover grayscale" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                         <div className="absolute top-8 left-8 flex gap-4">
                            <div className="p-4 bg-black/60 backdrop-blur-3xl rounded-xl border border-white/10">
                               <Satellite className="w-6 h-6 animate-pulse text-[#b3c7ff]" />
                            </div>
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#b3c7ff]/40 mb-8 block underline decoration-[#b3c7ff]/20 underline-offset-8 italic">Transmission_Ref // 0x442_D</span>
                            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10">Verification: ENCRYPTED</div>
                         </div>

                         <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-[#b3c7ff]">
                            {PROJECTS[activeItem].desc} Every coordinate was computed to ensure maximum signal integrity amidst the silence of the void.
                         </p>

                         <div className="grid grid-cols-2 gap-8 py-10 border-y border-[#b3c7ff]/10">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Deep_Space_Alpha" },
                              { icon: <Zap className="w-5 h-5" />, l: "Latency", v: "0.2ms_Verified" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "Phase_Shift_Core" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: "Protocol_059" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-4 items-center text-[#b3c7ff]">
                                 <div className="opacity-40">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-xs font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6">
                            <button onClick={() => setView("orbit")} className="flex-grow py-8 bg-[#b3c7ff] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl">
                               Initiate_Uplink
                            </button>
                            <button className="px-12 py-8 border border-[#b3c7ff]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                               Data_Sheet
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* SATELLITE VIEW (INFO) */}
        {view === "satellite" && (
          <motion.div key="satellite" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-[#b3c7ff] opacity-30 block underline decoration-[#b3c7ff]/40 decoration-2 underline-offset-8 italic">The_Structural_Void</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#b3c7ff]/60">
                      We treat architecture as an act of subtraction. We don't add; we reveal the structural truth of the space. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#b3c7ff]/20">
                      {[
                        { icon: <Activity className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Layers className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#b3c7ff] flex items-center justify-center text-[#b3c7ff] group-hover:bg-[#b3c7ff] group-hover:text-black transition-all shadow-[0_0_30px_rgba(179,199,255,0.2)]">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#b3c7ff]">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-[#b3c7ff]/10 group">
                   <Image src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1000&auto=format&fit=crop" alt="The Void" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-[#b3c7ff] text-[#b3c7ff] text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-[#b3c7ff] hover:text-black transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#b3c7ff]">
         <div className="flex gap-12">
            <span>Uptime: 99.999%</span>
            <span>Batch_0x42</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Orbital_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#b3c7ff] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(179, 199, 255, 0.02);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(179, 199, 255, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
        .animate-spin-slow {
          animation: spin 60s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
