"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowRight, X, Phone, Globe, Shield, Calendar, Clock, Crown, Compass } from "lucide-react";
import "../premium.css";

const COLLECTION = [
  { 
    id: 1, 
    name: "Aether Era Chrono", 
    price: 48200, 
    series: "Rose Gold Edition", 
    img: "https://images.unsplash.com/photo-1547996160-81ebf62c933b?q=80&w=1000&auto=format&fit=crop", 
    desc: "18K Rose Gold case with Charcoal dial and Calibre 324 S C Automatic mechanical movement." 
  },
  { 
    id: 2, 
    name: "Obsidian Tourbillon", 
    price: 125000, 
    series: "Heritage Masterpiece", 
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", 
    desc: "Black ceramic skeleton dial with manual winding tourbillon. Limited to 10 units globally." 
  },
  { 
    id: 3, 
    name: "Platinum Horizon", 
    price: 64000, 
    series: "Voyager Series", 
    img: "https://images.unsplash.com/photo-1508685096489-775b19114622?q=80&w=1000&auto=format&fit=crop", 
    desc: "950 Platinum case with deep blue sunburst dial. Dual time zone functionality." 
  },
];

export default function LuxuryHorologySPA() {
  const [view, setView] = useState<"collection" | "heritage" | "detail">("collection");
  const [activeItem, setActiveItem] = useState(0);
  const [cart, setCart] = useState(0);

  return (
    <div className="premium-theme bg-[#070707] text-[#e5e5e5] min-h-screen selection:bg-[#c2a05e] selection:text-black font-sans font-light overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#c2a05e15_0%,_transparent_70%)] opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-10 md:px-12 flex justify-between items-center mix-blend-difference">
        <button onClick={() => setView("collection")} className="text-2xl md:text-3xl font-serif italic tracking-tighter text-[#c2a05e]">Gold.Heritage</button>
        <div className="hidden md:flex gap-12 text-[10px] uppercase font-black tracking-[0.5em] opacity-40">
           <button onClick={() => setView("collection")} className={`hover:text-[#c2a05e] transition-colors ${view === 'collection' ? 'text-[#c2a05e] opacity-100' : ''}`}>COLLECTION</button>
           <button onClick={() => setView("heritage")} className={`hover:text-[#c2a05e] transition-colors ${view === 'heritage' ? 'text-[#c2a05e] opacity-100' : ''}`}>HERITAGE</button>
        </div>
        <div className="flex gap-8 items-center">
           <button className="flex items-center gap-4 group">
              <ShoppingBag className="w-5 h-5 group-hover:text-[#c2a05e] transition-colors" />
              <span className="text-[10px] font-black opacity-30 group-hover:opacity-100 font-mono">[{cart}]</span>
           </button>
           <Crown className="w-5 h-5 opacity-40 text-[#c2a05e]" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* COLLECTION VIEW (SLIDER) */}
        {view === "collection" && (
          <motion.div key="collection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
             <main className="h-screen flex items-center justify-center pt-24">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                   <h2 className="text-[25vw] font-serif italic font-black whitespace-nowrap">TIMELESS_ERA</h2>
                </div>

                <div className="relative w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-12 gap-12 items-center px-12">
                   <div className="hidden md:block col-span-3 space-y-24">
                      <div className="border-l border-[#c2a05e]/20 pl-8">
                         <span className="text-[10px] uppercase font-black tracking-[0.4em] text-[#c2a05e] mb-4 block">Exclusivity</span>
                         <p className="text-xl font-serif italic opacity-60">Limited to 50 items <br/> globally.</p>
                      </div>
                      <div className="border-l border-[#c2a05e]/20 pl-8">
                         <span className="text-[10px] uppercase font-black tracking-[0.4em] text-[#c2a05e] mb-4 block">Craftsmanship</span>
                         <p className="text-xl font-serif italic opacity-60">Hand-finished in <br/> Geneva.</p>
                      </div>
                   </div>

                   <div className="col-span-12 md:col-span-6 flex flex-col items-center">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="relative w-[300px] md:w-[450px] aspect-square">
                         <Image src={COLLECTION[activeItem].img} alt="Watch" fill className="object-contain drop-shadow-[0_35px_60px_rgba(194,160,94,0.3)] transition-all duration-[3s]" />
                      </motion.div>
                      <div className="mt-8 text-center">
                         <h1 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter leading-none mb-4 uppercase">{COLLECTION[activeItem].name}</h1>
                         <div className="text-[10px] uppercase tracking-[1em] opacity-30 font-black">{COLLECTION[activeItem].series}</div>
                      </div>
                      <div className="flex gap-4 mt-12">
                         {COLLECTION.map((_, i) => (
                           <button key={i} onClick={() => setActiveItem(i)} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activeItem ? 'bg-[#c2a05e] scale-150 w-8' : 'bg-white/10 hover:bg-white/40'}`} />
                         ))}
                      </div>
                   </div>

                   <div className="col-span-12 md:col-span-3 flex flex-col items-end">
                      <div className="text-right mb-12">
                         <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 font-black block mb-4">Starting At</span>
                         <div className="text-5xl md:text-6xl font-serif italic text-[#c2a05e] tracking-tighter">${COLLECTION[activeItem].price.toLocaleString()}</div>
                      </div>
                      <button onClick={() => setView("detail")} className="w-full py-8 bg-[#c2a05e] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-4">
                         Secure_Purchase <ArrowRight className="w-4 h-4" />
                      </button>
                      <div className="mt-8 text-right text-[8px] uppercase tracking-widest opacity-20 font-black leading-loose">
                         Personalized Consultation <br /> Insured World-Wide Transport
                      </div>
                   </div>
                </div>
             </main>
          </motion.div>
        )}

        {/* HERITAGE VIEW */}
        {view === "heritage" && (
          <motion.div key="heritage" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="relative aspect-[3/4] border border-[#c2a05e]/20 p-4 rounded-[4rem]">
                   <Image src="https://images.unsplash.com/photo-1594533051023-50957dc9f66a?q=80&w=1000&auto=format&fit=crop" alt="Heritage" fill className="object-cover rounded-[3.5rem] opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#070707] to-transparent" />
                </div>
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] text-[#c2a05e] mb-12 block underline decoration-[#c2a05e]/40 underline-offset-8">Legacy // Geneve 1892</span>
                   <h2 className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-none mb-12 text-white">The <br/> Origin.</h2>
                   <p className="text-xl md:text-2xl font-light italic opacity-50 leading-relaxed uppercase tracking-widest mb-16">
                      For generations, we have mastered time. Not as a metric, but as an art form. Every movement is a heartbeat of mechanical perfection.
                   </p>
                   <div className="space-y-12">
                      {[
                        { t: "Mechanical Soul", d: "Zero batteries. Only gravity, springs, and human movement." },
                        { t: "Exquisite Finish", d: "Hand-polished components under 40x magnification." },
                      ].map((s, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full bg-[#c2a05e]/10 border border-[#c2a05e]/20 flex items-center justify-center text-[#c2a05e]">
                              <Clock className="w-6 h-6" />
                           </div>
                           <div>
                              <h4 className="text-xl font-serif italic text-white uppercase">{s.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black mt-2 leading-relaxed">{s.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* DETAIL VIEW */}
        {view === "detail" && (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("collection")} className="fixed top-12 left-12 z-[60] bg-[#c2a05e] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <main className="grid grid-cols-1 lg:grid-cols-12 h-screen">
                <div className="lg:col-span-8 relative bg-black h-[60vh] lg:h-full">
                   <Image src={COLLECTION[activeItem].img} alt="Product" fill className="object-cover opacity-80 mix-blend-lighten" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute bottom-12 left-12">
                      <span className="text-[10px] uppercase tracking-[0.8em] font-black text-[#c2a05e] mb-4 block underline decoration-[#c2a05e]/40 underline-offset-8">Asset_Acquisition</span>
                      <h1 className="text-6xl md:text-[10vw] font-serif italic font-black uppercase tracking-tighter leading-none">{COLLECTION[activeItem].name}</h1>
                   </div>
                </div>
                
                <div className="lg:col-span-4 p-12 lg:p-24 bg-[#0a0a0a] flex flex-col justify-center space-y-16 overflow-y-auto">
                   <div className="space-y-8">
                      <h3 className="text-xs uppercase tracking-[0.5em] font-black opacity-20">The_Narrative</h3>
                      <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-70">
                         {COLLECTION[activeItem].desc} An investment in horological history, crafted for those who value the silence of perfection.
                      </p>
                   </div>

                   <div className="space-y-12">
                      {[
                        { icon: <Shield className="w-6 h-6" />, l: "5-Year Global Warranty" },
                        { icon: <Compass className="w-6 h-6" />, l: "Geneva Seal of Quality" },
                        { icon: <Activity className="w-6 h-6" />, l: "Individually Tested / 400H" },
                      ].map((m, i) => (
                        <div key={i} className="flex gap-8 items-center border-t border-white/5 pt-8 first:border-none first:pt-0">
                           <div className="text-[#c2a05e]">{m.icon}</div>
                           <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">{m.l}</span>
                        </div>
                      ))}
                   </div>

                   <div className="pt-12">
                      <div className="text-4xl font-serif italic text-[#c2a05e] mb-8">${COLLECTION[activeItem].price.toLocaleString()}</div>
                      <button onClick={() => { setCart(c => c + 1); setView("collection"); }} className="w-full py-8 bg-[#c2a05e] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-xl">
                         Process_Allocation
                      </button>
                   </div>
                </div>
             </main>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Persistence Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Swiss Craft</span>
            <span>Est. 1892</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Heritage_Vault <br /> Geneve_Node
            </div>
            <div className="flex gap-[1px] h-3">
               {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className={`w-[1px] h-full bg-[#c2a05e]`}></div>)}
            </div>
         </div>
      </footer>

    </div>
  );
}
