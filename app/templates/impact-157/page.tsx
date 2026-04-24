"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Origami, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const PIECES = [
  { id: 1, title: "CELESTIAL_BAND", cat: "18K Gold", value: "Verified", img: "https://images.unsplash.com/photo-1598560943141-8f566498ec00?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "VOID_PENDANT", cat: "Diamond", value: "Active", img: "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "NEON_CUFF", cat: "Platinum", value: "Locked", img: "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?auto=format&fit=crop&q=80&w=1500" },
];

export default function AurumJewelrySPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#0D0A09] text-amber-500 min-h-screen font-serif selection:bg-amber-800 selection:text-white overflow-hidden relative">
      
      {/* GOLD GLOW & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0D0A09_100%)] opacity-80" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-amber-600 opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-soft-light" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#0D0A09]/50 backdrop-blur-3xl border-b border-amber-500/10 font-mono">
        <Link href="/" className="font-light text-2xl tracking-[0.4em] text-white flex items-center gap-4 italic uppercase">
           AURUM<span className="text-amber-500 font-black">_OS</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-white/30">
            <Link href="#" className="hover:text-amber-500 transition-colors group">
               Atelier<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-amber-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-amber-500 transition-colors group">
               Boutique<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-amber-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-amber-500 transition-colors group">
               Heritage<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-amber-500 italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <div className="hidden md:flex flex-col items-end opacity-20">
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 italic">Vault_Sync</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white italic">Active_Ref_157</span>
           </div>
           <button className="bg-amber-600 text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(217,119,6,0.2)]">
              Reserve_Piece
           </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?auto=format&fit=crop&q=80&w=2500" alt="Jewelry" fill className="object-cover opacity-30 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A09] via-transparent to-[#0D0A09]/60" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-amber-500/50 mb-16 border-l-2 border-amber-600 pl-10 italic font-mono">
                  Luxury_Sync // 0157_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[12vw] font-light italic uppercase leading-[0.8] tracking-tighter mb-20 text-white drop-shadow-2xl">
                  ETERNAL.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(245,158,11,0.6)" }}>REFINED.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-white/30 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest">
                  Structural elegance meets tectonic intent. Architecting the future of high jewelry with precision and gold.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-amber-600/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-amber-500">Explore_Atelier</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-white/10 italic">
                     Geneva // New York // Tokyo
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[0.8em] text-amber-500/20 hidden md:flex italic font-mono">
            <span>SYNC_LOAD: 0.003ms</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['30%', '100%', '50%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-amber-500" />)}
            </div>
         </div>
      </section>

      {/* PIECES GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#0D0A09]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-amber-500/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-amber-600 mb-8 block italic">Jewelry_Manifest</span>
               <h2 className="text-6xl md:text-9xl font-light italic uppercase tracking-tighter text-white leading-none font-serif">The <span className="text-amber-500">Aurum_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic font-mono">
               <span>Purity: [24K]</span>
               <span>Records: [03]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {PIECES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer hover:border-amber-500/40 transition-all shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A09] via-transparent to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-amber-600/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/5 border border-white/10 rounded-none group-hover:bg-amber-600 group-hover:text-black transition-all shadow-xl">
                              <Origami className="w-6 h-6" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-amber-500/30 italic">Ref_0x{i+157}</div>
                        </div>
                        
                        <div className="font-serif">
                           <span className="text-[10px] uppercase tracking-[0.8em] text-amber-500 mb-8 block italic font-black font-mono">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-light italic uppercase tracking-tighter mb-16 text-white group-hover:tracking-widest transition-all leading-[0.8]">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-white font-mono">
                              View_Specs <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#0D0A09]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-amber-500 mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Atelier_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-white/20 uppercase tracking-tighter mb-20 font-serif">
                  WE TREAT JEWELRY AS ARCHITECTURE. EVERY PIECE A FUNCTION OF TECTONIC INTENT.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-amber-500/40 italic font-mono">
                  <span>Geneva</span>
                  <span>Paris</span>
                  <span>London</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right">
               <div className="w-full">
                  <h4 className="text-[12vw] font-light italic uppercase tracking-tighter text-white opacity-[0.02] leading-none mb-20 font-serif">AURUM</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-white/10 font-mono">
                     <Link href="#" className="hover:text-amber-500 transition-colors group">
                        Instagram<span className="text-amber-500/0 group-hover:text-amber-500 transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-amber-500 transition-colors group">
                        Atelier<span className="text-amber-500/0 group-hover:text-amber-500 transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-amber-500 transition-colors group">
                        Concierge<span className="text-amber-500/0 group-hover:text-amber-500 transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-white/5 mt-32 italic font-mono font-serif">
                  &copy; 2026 // AURUM_JEWELRY&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
