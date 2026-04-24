"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Utensils, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const ITEMS = [
  { id: 1, title: "SIGNATURE_ROAST", cat: "Espresso", value: "Verified", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "CELESTIAL_POUR", cat: "Single Origin", value: "Active", img: "https://images.unsplash.com/photo-1541173109020-9c5d8a48e169?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "VOID_BREW", cat: "Cold Steep", value: "Locked", img: "https://images.unsplash.com/photo-1442512595331-e89e73bf53f2?auto=format&fit=crop&q=80&w=1500" },
];

export default function TheRoastCafeSPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
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
    <div ref={containerRef} className="premium-theme bg-[#FAF8F5] text-[#3E2723] min-h-screen font-sans selection:bg-[#3E2723] selection:text-white overflow-hidden relative">
      
      {/* COFFEE GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(62,39,35,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(62,39,35,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#3E2723] opacity-[0.02] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#FAF8F5]/30 backdrop-blur-3xl border-b border-[#3E2723]/5">
        <Link href="/" className="font-black text-2xl tracking-[0.2em] text-[#3E2723] flex items-center gap-4 italic uppercase">
           THE<span className="text-[#3E2723]/30">_ROAST</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-[#3E2723]/30">
            <Link href="#" className="hover:text-[#3E2723] transition-colors group">
               Brew<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#3E2723] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#3E2723] transition-colors group">
               Origin<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#3E2723] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#3E2723] transition-colors group">
               Shop<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#3E2723] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-[#3E2723] text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#5E4743] transition-all">
              Order_Now
           </button>
           <Menu className="w-6 h-6 text-[#3E2723] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2500" alt="Cafe" fill className="object-cover opacity-30 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-[#3E2723]/30 mb-16 border-l-2 border-[#3E2723]/20 pl-10 italic font-mono">
                  Artisan_Sync // 0162_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[13vw] font-black italic uppercase leading-[0.8] tracking-tighter mb-24 text-[#3E2723]">
                  PURE.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #3E2723" }}>BREW.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-[#3E2723]/40 max-w-2xl mx-auto mb-28 leading-relaxed uppercase tracking-tight">
                  Structural allocation for artisan intent. Architecting the future of coffee with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-20 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#3E2723]/10 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#3E2723]">View_Menu</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-[#3E2723]/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-[#3E2723]/10 italic">
                     Established // NYC // 2026
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[0.8em] text-[#3E2723]/10 hidden md:flex italic font-mono">
            <span>TEMP: 92.5C</span>
            <div className="flex gap-[2px] w-32 h-1 items-center bg-[#3E2723]/5 overflow-hidden">
               <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-[#3E2723]/40" />
            </div>
         </div>
      </section>

      {/* ITEMS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#FAF8F5]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-[#3E2723]/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#3E2723]/20 mb-8 block italic font-mono">Artisan_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#3E2723] leading-[0.8]">The <br/> <span className="text-[#3E2723]/5">Roast_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-[#3E2723]/30 italic font-mono">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {ITEMS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-stone-50 border border-[#3E2723]/5 overflow-hidden cursor-pointer hover:border-[#3E2723]/20 transition-all shadow-sm"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-[#3E2723]/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/40 backdrop-blur-xl border border-[#3E2723]/5 rounded-none group-hover:bg-[#3E2723] group-hover:text-white transition-all shadow-sm">
                              <Coffee className="w-6 h-6" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#3E2723]/20 italic">Ref_0x{i+162}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-[#3E2723] mb-8 block italic font-black">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-[#3E2723] group-hover:tracking-widest transition-all leading-[0.8]">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-[#3E2723]">
                              View_Details <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-[#3E2723]/5 relative z-10 bg-[#FAF8F5]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-[#3E2723] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Roast_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-[#3E2723]/20 uppercase tracking-tighter mb-20">
                  WE TREAT COFFEE AS ARCHITECTURE. EVERY BREW A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#3E2723]/30 italic font-mono">
                  <span>NYC</span>
                  <span>London</span>
                  <span>Tokyo</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-[#3E2723] opacity-[0.02] leading-none mb-20">ROAST</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-[#3E2723]/10">
                     <Link href="#" className="hover:text-[#3E2723] transition-colors group">
                        Instagram<span className="text-[#3E2723]/0 group-hover:text-[#3E2723] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#3E2723] transition-colors group">
                        Journal<span className="text-[#3E2723]/0 group-hover:text-[#3E2723] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#3E2723] transition-colors group">
                        Stockists<span className="text-[#3E2723]/0 group-hover:text-[#3E2723] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-[#3E2723]/5 mt-32 italic">
                  &copy; 2026 // THE_ROAST_CAFE&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
