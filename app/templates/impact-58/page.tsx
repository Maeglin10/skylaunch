"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Search, Mail, Share2, MessageCircle, Maximize2, Plus, ArrowUpRight, Globe, Zap, MoveUpRight, FastForward } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "V_MOTION_01", cat: "Performance", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of kinetic energy and visual momentum." },
  { id: 2, name: "KINETIC_GRID", cat: "Interface", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop", desc: "Fluid, organic interactions inspired by the movement of raw silk." },
  { id: 3, name: "ORBIT_PULSE", cat: "Branding", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", desc: "Next-gen computing cores forged in the heart of industrial minimalism." },
  { id: 4, name: "NEO_TYPE_M", cat: "Visual", img: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=1000&auto=format&fit=crop", desc: "Experimental typography systems designed for high-end narratives." },
  { id: 5, name: "BRUTAL_CORE", cat: "Architecture", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "Minimalist hardware chassis forged in high-altitude environments." },
];

export default function KineticMotionSPA() {
  const [view, setView] = useState<"motion" | "focus" | "bio">("motion");
  const [activeItem, setActiveItem] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const smoothX = useSpring(xTranslate, { damping: 50, stiffness: 200 });

  return (
    <div className="premium-theme bg-black text-white min-h-screen selection:bg-white selection:text-black font-mono overflow-x-hidden">
      
      {/* Background HUD Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/10">
        <button onClick={() => setView("motion")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform text-white">
           SKEW_OS&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("motion")} className={`hover:opacity-100 transition-opacity ${view === 'motion' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_MOTION</button>
           <button onClick={() => setView("bio")} className={`hover:opacity-100 transition-opacity ${view === 'bio' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_IDENTITY</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest italic text-white">
              Velocity: OPTIMAL
           </div>
           <FastForward className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer text-white" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer text-white" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* MOTION VIEW (animated grid) */}
        {view === "motion" && (
          <motion.div key="motion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end border-b-2 border-white pb-10">
                <h1 className="text-7xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-[0.75]">
                   Kinetic. <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Impact.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter uppercase opacity-10 italic">Unit_Series_0x58</div>
                   <div className="flex gap-4">
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Structural Truth <br /> Through Velocity</div>
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, x: -30, skewX: 10 }} animate={{ opacity: 1, x: 0, skewX: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative flex flex-col cursor-pointer border-l-4 border-white/5 hover:border-white transition-all pl-8"
                    onClick={() => { setActiveItem(i); setView("focus"); }}
                  >
                     <div className="relative aspect-[3/4] bg-white/5 overflow-hidden mb-12 rounded-3xl border border-white/10 group-hover:skew-x-[-2deg] transition-all duration-700">
                        <Image src={p.img} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] font-black uppercase tracking-widest italic text-white/40">Launch_Protocol</span>
                           <MoveUpRight className="w-5 h-5 text-white" />
                        </div>
                     </div>
                     <div className="flex justify-between items-start flex-col">
                        <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30 mb-2 block">{p.cat}</span>
                        <div className="flex justify-between items-end w-full pr-4">
                           <h3 className="text-5xl font-black italic tracking-tighter leading-none group-hover:text-white transition-colors">{p.name}</h3>
                           <div className="text-3xl font-black italic tracking-tighter opacity-10 group-hover:opacity-100 transition-all">/0{p.id}</div>
                        </div>
                     </div>
                     <p className="text-sm font-light italic opacity-40 uppercase tracking-tight max-w-xs mt-6">{p.desc}</p>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* FOCUS VIEW (DETAIL) */}
        {view === "focus" && (
          <motion.div key="focus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("motion")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 h-screen overflow-hidden bg-black">
                   <div className="absolute inset-0 z-[-1] opacity-20">
                      <Image src={PROJECTS[activeItem].img} alt="Background" fill className="object-cover grayscale brightness-50" />
                   </div>
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ x: -100, opacity: 0, skewX: 20 }} animate={{ x: 0, opacity: 1, skewX: 0 }} transition={{ duration: 1.2 }} className="relative aspect-[3/4] w-full rounded-[4rem] overflow-hidden border border-white/10 group shadow-2xl">
                         <Image src={PROJECTS[activeItem].img} alt="Project" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                            <Plus className="w-6 h-6 text-white animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic">Archive_Sync // {PROJECTS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10">State: SYNCHRONIZED</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white">
                            {PROJECTS[activeItem].desc} An architectural study involving multi-axis tension and structural transparency.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-white/10">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Global_East" },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Class_A_Core" },
                              { icon: <Shield className="w-5 h-5" />, l: "Stability", v: "High_Impact" },
                              { icon: <Plus className="w-5 h-5" />, l: "Material", v: "Titanium" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center text-white">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <button onClick={() => setView("motion")} className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[1em] hover:bg-white hover:text-black transition-all">
                            Next_Movement
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* BIO VIEW (ABOUT) */}
        {view === "bio" && (
          <motion.div key="bio" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-white decoration-2 underline-offset-8 italic text-white">The_Identity_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Pulse.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="flex gap-12 pt-12 border-t border-white/10">
                      <Share2 className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                      <MessageCircle className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                      <Mail className="w-8 h-8 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                   </div>
                </div>
                <div className="relative aspect-square bg-white/5 rounded-[4rem] p-12 overflow-hidden border border-white/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Studio" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-black/80 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Skew_Velocity_Unit</span>
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
