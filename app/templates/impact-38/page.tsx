"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Utensils, Droplets, Wind, Sparkles, Calendar, Clock, MapPin, Hash } from "lucide-react";
import "../premium.css";

const DISHES = [
  { id: 1, name: "NEURAL_DASH_01", price: 120, tag: "Starter", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop", desc: "A singular bite of kelp-infused foam and liquid nitrogen. Resets the palate." },
  { id: 2, name: "ASH_SALMON", price: 240, tag: "Main", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop", desc: "Slow-cooled wild salmon served on a plate of volcanic ash. Texture study." },
  { id: 3, name: "VOID_TEMPURA", price: 180, tag: "Middle", img: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?q=80&w=1000&auto=format&fit=crop", desc: "Light-speed battered seasonal vegetables. A study of transparency and crunch." },
  { id: 4, name: "SILK_TEA_CAKE", price: 95, tag: "Ending", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop", desc: "Whipped matcha and raw honey. Collapses on the tongue like a digital dream." },
];

export default function KaisekiAtelierSPA() {
  const [view, setView] = useState<"menu" | "space" | "seat">("menu");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#fcfcfc] text-[#111] min-h-screen selection:bg-rose-950 selection:text-white font-sans overflow-x-hidden">
      
      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <button onClick={() => setView("menu")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform">
           ZEN_GSTRNM&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("menu")} className={`hover:opacity-100 transition-opacity ${view === 'menu' ? 'text-black opacity-100 underline decoration-black underline-offset-8' : ''}`}>THE_PROTOCOLS</button>
           <button onClick={() => setView("space")} className={`hover:opacity-100 transition-opacity ${view === 'space' ? 'text-black opacity-100 underline decoration-black underline-offset-8' : ''}`}>THE_VOID</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest italic">
              Verification: Michelin_3_Sync
           </div>
           <button onClick={() => setView("seat")} className="px-8 py-3 bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#1a1a1a] transition-all italic">
              Reserve_Void
           </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* MENU VIEW (PROTOCOLS) */}
        {view === "menu" && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-12">
                <h1 className="text-[12vw] font-serif italic font-black uppercase tracking-tighter leading-[0.8] text-black">
                   Atomic. <br /> <span className="not-italic text-transparent" style={{ WebkitTextStroke: '1px black' }}>Senses.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter uppercase text-black/10">Kaiseki_Protocol_v4</div>
                   <div className="flex gap-4">
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Curating Flavor <br /> Through Silence</div>
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {DISHES.map((d, i) => (
                  <motion.div 
                    key={d.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="group flex flex-col cursor-pointer"
                    onClick={() => { setActiveItem(i); setView("space"); }}
                  >
                     <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-12 rounded-[3.5rem] border border-black/5 shadow-2xi group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all">
                        <Image src={d.img} alt={d.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" />
                        <div className="absolute top-8 left-8 text-[8px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                           <Hash className="w-3 h-3" /> SEQ_0{d.id}
                        </div>
                     </div>
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30 block mb-2">{d.tag}</span>
                           <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none hover:text-rose-950 transition-colors">{d.name}</h3>
                        </div>
                        <div className="text-2xl font-black italic tracking-tighter opacity-10 group-hover:opacity-100 transition-all font-mono">${d.price}</div>
                     </div>
                     <p className="text-sm font-light italic opacity-40 uppercase tracking-tight max-w-xs">{d.desc}</p>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.6em] opacity-20 group-hover:opacity-100 transition-all group-hover:gap-12 border-t border-black/5 pt-8 mt-10">
                        ANALYZE_DISH <Plus className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* SPACE VIEW (INFO/GALLERY) */}
        {view === "space" && (
          <motion.div key="space" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-black decoration-2 underline-offset-8 italic">The_Philosophical_Void</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-black uppercase">Silent <br/> Space.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We removed the noise. We removed the clutter. What remains is a curated dialogue between your senses and the essence of the ingredient.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/5">
                      {[
                        { icon: <Droplets className="w-6 h-6" />, t: "Pure Mineral", v: "High-Altitude Sourcing" },
                        { icon: <Sparkles className="w-6 h-6" />, t: "Zen Flow", v: "Zero-Latency Service" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-black mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-white rounded-[4rem] p-12 overflow-hidden border border-black/5 shadow-2xi group">
                   <Image src="https://images.unsplash.com/photo-196645?w=800&q=80" alt="The Void" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s]" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 bg-black text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce">
                         View_Full_Gallery
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* SEAT VIEW (RESERVATION) */}
        {view === "seat" && (
          <motion.div key="seat" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-4xl mx-auto min-h-screen">
             <div className="glass p-12 md:p-24 rounded-[4rem] border border-black/5 text-center relative overflow-hidden bg-white/80 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                   <Utensils className="w-64 h-64" />
                </div>
                <span className="text-[10px] uppercase tracking-[1em] text-black opacity-40 mb-12 block italic underline decoration-black underline-offset-8 decoration-2">Protocol_Activation</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-16 text-black leading-none uppercase">Claim Your <br/> Allocation.</h2>
                <div className="space-y-12 text-left relative z-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="border-b border-black/20 pb-6 group">
                         <label className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-4 italic group-focus-within:text-black transition-colors">Seat_Availability</label>
                         <div className="flex justify-between items-center cursor-pointer">
                            <span className="text-2xl italic tracking-tighter text-black font-black">2026.12.24</span>
                            <Calendar className="w-5 h-5 opacity-40" />
                         </div>
                      </div>
                      <div className="border-b border-black/20 pb-6 group">
                         <label className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-4 italic group-focus-within:text-black transition-colors">Session_Time</label>
                         <div className="flex justify-between items-center cursor-pointer">
                            <span className="text-2xl italic tracking-tighter text-black font-black">19:30_PST</span>
                            <Clock className="w-5 h-5 opacity-40" />
                         </div>
                      </div>
                   </div>
                   <button className="w-full py-10 bg-black text-white font-black uppercase text-[10px] tracking-[1.5em] hover:bg-rose-950 transition-all shadow-2xl rounded-full italic">
                      Finalize_Allocation
                   </button>
                </div>
                <div className="mt-24 pt-12 border-t border-black/5 flex justify-center gap-12 opacity-20 text-[9px] font-black tracking-widest uppercase italic">
                   <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4" /> Secure Deposit Required
                   </div>
                   <div className="flex items-center gap-3 font-mono">
                      <MapPin className="w-4 h-4" /> Iceland_Node_01
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Zen_Atelier_NYC</span>
            <span>Flux: Stable</span>
         </div>
         <div className="flex gap-4 items-end">
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
