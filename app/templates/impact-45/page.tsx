"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowRight, X, Menu, Search, Filter, Crosshair, Zap, Shield, Plus, MousePointer2 } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "ORBIT_X1", price: 1250, tag: "Optics", img: "https://images.unsplash.com/photo-1511499767350-a1590fdb7318?q=80&w=1000&auto=format&fit=crop", desc: "Polarized neural-link eyewear with integrated HUD projection. Ultra-light titanium frame." },
  { id: 2, name: "VISION_Z", price: 890, tag: "Minimal", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop", desc: "Minimalist carbon-fiber structure. Photochromic lenses with 100% UV protection." },
  { id: 3, name: "TITAN_H", price: 2100, tag: "Elite", img: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1000&auto=format&fit=crop", desc: "Rugged aerospace-grade titanium for tactical applications. Ballistic-rated lenses." },
  { id: 4, name: "NEO_SHADE", price: 640, tag: "Boutique", img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1000&auto=format&fit=crop", desc: "The intersection of avant-garde design and optical precision. Matte finish." },
];

export default function EliteOpticsSPA() {
  const [view, setView] = useState<"ring" | "focus" | "optics">("ring");
  const [activeItem, setActiveItem] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [cart, setCart] = useState(0);

  return (
    <div className="premium-theme bg-[#030303] text-white h-screen w-full overflow-hidden relative font-mono selection:bg-cyan-500 selection:text-black">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-10">
         <div className="w-[80vw] h-[80vw] border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-[60vw] h-[60vw] border border-dashed border-white/20 rounded-full" />
            <div className="w-[40vw] h-[40vw] border border-white/10 rounded-full" />
         </div>
         <div className="absolute w-full h-[1px] bg-white/5" />
         <div className="absolute h-full w-[1px] bg-white/5" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_100%)] opacity-80" />
      </div>

      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <button onClick={() => setView("ring")} className="text-xl font-black uppercase tracking-[0.4em] text-cyan-400 hover:text-white transition-colors">
           AETHER_OPTICS&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("ring")} className={`hover:opacity-100 transition-opacity ${view === 'ring' ? 'text-white opacity-100' : ''}`}>THE_RING</button>
           <button onClick={() => setView("optics")} className={`hover:opacity-100 transition-opacity ${view === 'optics' ? 'text-white opacity-100' : ''}`}>OPTICS_LAB</button>
        </div>
        <div className="flex items-center gap-8">
           <button className="flex items-center gap-4 group">
              <ShoppingBag className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[10px] font-black opacity-30 group-hover:opacity-100 font-mono">[{cart}]</span>
           </button>
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* RING VIEW (3D CAROUSEL) */}
        {view === "ring" && (
          <motion.div key="ring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full flex items-center justify-center perspective-[2000px] cursor-grab active:cursor-grabbing">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter">
                EYE_TECH
             </div>

             <motion.div 
               drag="x"
               onDrag={(e, info) => setRotation(prev => prev + info.delta.x * 0.15)}
               className="relative w-full h-full flex items-center justify-center"
             >
                <motion.div 
                   animate={{ rotateY: rotation }}
                   transition={{ type: "spring", damping: 40, stiffness: 120 }}
                   className="relative w-[320px] md:w-[400px] aspect-[3/4]"
                   style={{ transformStyle: 'preserve-3d' }}
                >
                   {PRODUCTS.map((p, i) => {
                      const angle = (i / PRODUCTS.length) * 360;
                      return (
                         <div 
                            key={p.id}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ 
                               transform: `rotateY(${angle}deg) translateZ(450px)`,
                               backfaceVisibility: 'visible'
                            }}
                            onClick={() => { setActiveItem(i); setView("focus"); }}
                         >
                            <motion.div 
                               whileHover={{ scale: 1.05 }}
                               className="relative w-full h-full glass border border-white/5 rounded-[3rem] p-8 md:p-12 group hover:border-cyan-400/30 transition-all flex flex-col justify-between"
                            >
                               <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-100 group-hover:text-cyan-400">
                                  <Crosshair className="w-6 h-6" />
                                </div>
                               
                               <div className="relative aspect-video scale-125 mb-12">
                                  <Image src={p.img} alt={p.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-[2s]" />
                               </div>

                               <div>
                                  <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400 mb-2 block">{p.tag}</span>
                                  <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none mb-4">{p.name}</h2>
                                  <div className="flex justify-between items-center pr-2">
                                     <span className="text-2xl font-bold italic tracking-tighter opacity-20 group-hover:opacity-100">${p.price}</span>
                                     <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                                  </div>
                               </div>
                            </motion.div>
                         </div>
                      );
                   })}
                </motion.div>
             </motion.div>

             <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 font-black text-[10px] uppercase tracking-[0.5em] mix-blend-difference pointer-events-none">
                <MousePointer2 className="w-4 h-4" /> Drag to rotate collection
             </div>
          </motion.div>
        )}

        {/* FOCUS VIEW (PRODUCT DETAIL) */}
        {view === "focus" && (
          <motion.div key="focus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("ring")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center bg-[#050505] p-12 lg:p-32 h-screen">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vh] font-black opacity-[0.02] select-none pointer-events-none italic">
                      {PRODUCTS[activeItem].tag}
                   </div>
                   
                   <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative aspect-[3/2] w-full">
                         <Image src={PRODUCTS[activeItem].img} alt="Optic" fill className="object-contain drop-shadow-[0_0_100px_rgba(34,211,238,0.2)]" priority />
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-cyan-400 mb-8 block underline decoration-cyan-400 underline-offset-8">Spectral_Analysis</span>
                            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">{PRODUCTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-40">${PRODUCTS[activeItem].price}</div>
                         </div>

                         <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-60">
                            {PRODUCTS[activeItem].desc} Designed for long-duration data visualization without optical fatigue.
                         </p>

                         <div className="grid grid-cols-3 gap-8 py-10 border-y border-white/5 opacity-40 uppercase text-[10px] font-black tracking-widest text-center">
                            <div>Weight: 42g</div>
                            <div>Lens: Ph-04</div>
                            <div>Sync: BLE_02</div>
                         </div>

                         <div className="flex gap-6">
                            <button onClick={() => { setCart(c => c + 1); setView("ring"); }} className="flex-grow py-8 bg-cyan-400 text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl">
                               Process_Acquisition
                            </button>
                            <button className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                               Inquire
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* OPTICS VIEW */}
        {view === "optics" && (
          <motion.div key="optics" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 p-12 md:p-32 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block">The_Visual_Core</span>
                   <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none text-white uppercase">Optics <br/> Rebuilt.</h2>
                   <p className="text-2xl md:text-3xl font-light italic opacity-60 leading-relaxed uppercase tracking-widest">
                      We treat light as data. Every lens we forge is calibrated to match the neural patterns of its owner. 100% precision. Zero distortion.
                   </p>
                   <div className="space-y-12 pt-12">
                      {[
                        { t: "Neural Sync", d: "Integrated HUD connects directly to your biometric stream." },
                        { t: "Cold Forged", d: "Titanium frames forged in high-altitude environments for purity." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full bg-cyan-400 group-hover:bg-white transition-all flex items-center justify-center text-black font-black italic shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                              0{i+1}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black mt-2 leading-relaxed">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square glass rounded-full p-12 overflow-hidden border border-white/10">
                   <Image src="https://images.unsplash.com/photo-1574621100236-d25b6ec3400e?q=80&w=1000&auto=format&fit=crop" alt="Optics" fill className="object-cover opacity-30 grayscale saturate-0 hover:grayscale-0 hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_100%)] opacity-60" />
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Spectral_Verified</span>
            <span>Ref_0x442_A</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Aether_Optics <br /> Zurich_Node
            </div>
            <div className="flex gap-[2px] h-3">
               {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className={`w-[2px] h-full bg-cyan-400 opacity-${i*15}`}></div>)}
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
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
