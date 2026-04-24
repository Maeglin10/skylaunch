"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Activity, Zap, Shield, Menu, Layers, MapPin, Coffee, Utensils } from "lucide-react";
import "../premium.css";

const PROPERTIES = [
  { price: "12,500,000", addr: "The Glass House, Kyoto", spec: "4 Bed · 5 Bath · 8,200 sqft", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1500", tag: "Exclusive" },
  { price: "8,250,000", addr: "Cliffside Villa, Amalfi", spec: "5 Bed · 6 Bath · 6,100 sqft", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1500", tag: "New" },
  { price: "18,900,000", addr: "Sky Penthouse, NY", spec: "3 Bed · 4 Bath · 5,500 sqft", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1500", tag: "Signature" },
];

export default function LuxeRealEstateSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#f8f9fa] text-[#1a1a1a] min-h-screen font-sans selection:bg-[#c9a84c] selection:text-white overflow-hidden relative">
      
      {/* LUXURY GLOW & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#c9a84c] opacity-[0.03] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-white/40 backdrop-blur-3xl border-b border-[#1a1a1a]/5">
        <Link href="/" className="font-black text-2xl tracking-tighter text-[#1a1a1a] flex items-center gap-4 italic uppercase">
           LUXE<span className="text-[#c9a84c]">.</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-[#1a1a1a]/30">
            <Link href="#" className="hover:text-[#c9a84c] transition-colors group">
               Portfolio<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#c9a84c] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#c9a84c] transition-colors group">
               Off-Market<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#c9a84c] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#c9a84c] transition-colors group">
               Journal<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#c9a84c] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-[#1a1a1a] text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#c9a84c] transition-all shadow-[0_0_40px_rgba(201,168,76,0.1)]">
              Private_Client
           </button>
           <Menu className="w-6 h-6 text-[#c9a84c] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2500" alt="Architecture" fill className="object-cover opacity-20 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-transparent to-[#f8f9fa]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1.2em] text-[#c9a84c] mb-16 border-l-2 border-[#c9a84c] pl-10 italic font-mono">
                  Visual_Archive // 0167_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-[#1a1a1a]">
                  BEYOND<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #1a1a1a" }}>BOUNDARIES.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-[#1a1a1a]/40 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest">
                  Structural allocation for aesthetic intent. Architecting the future of living with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#c9a84c]/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#c9a84c]">Explore_Collection</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-[#1a1a1a]/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-[#1a1a1a]/10 italic">
                     Paris // Milan // NYC
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-[#c9a84c]/20 hidden md:flex italic font-mono">
            <span>SYNC_STATUS: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#c9a84c]" />)}
            </div>
         </div>
      </section>

      {/* PROPERTIES GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#f8f9fa]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-[#1a1a1a]/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#c9a84c] mb-8 block italic font-mono">Visual_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#1a1a1a] leading-none">The <span className="text-[#c9a84c]/20">Collection_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-[#1a1a1a]/20 italic font-mono">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {PROPERTIES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-stone-50 border border-[#1a1a1a]/5 overflow-hidden cursor-pointer hover:border-[#c9a84c]/30 transition-all shadow-sm"
                >
                    <Image src={p.img} alt={p.addr} fill className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-[#c9a84c]/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono text-[#1a1a1a]">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/40 backdrop-blur-xl border border-[#1a1a1a]/5 rounded-none group-hover:bg-[#c9a84c] group-hover:text-white transition-all shadow-sm">
                              <Layers className="w-6 h-6" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#c9a84c] italic font-mono">Ref_0x{i+167}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-[#c9a84c] mb-8 block italic font-black">{p.tag} // Verified</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-[#1a1a1a] group-hover:tracking-widest transition-all leading-[0.8]">{p.addr}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-[#1a1a1a]">
                              View_Property <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-[#1a1a1a]/5 relative z-10 bg-[#f8f9fa]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-[#c9a84c] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Luxe_Archives
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-[#1a1a1a]/20 uppercase tracking-tighter mb-20">
                  WE TREAT ARCHITECTURE AS ART. EVERY RESIDENCE A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#c9a84c]/40 italic font-mono">
                  <span>Paris</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-[#1a1a1a] opacity-[0.02] leading-none mb-20">LUXE</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-[#1a1a1a]/10">
                     <Link href="#" className="hover:text-[#c9a84c] transition-colors group">
                        Instagram<span className="text-[#c9a84c]/0 group-hover:text-[#c9a84c] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#c9a84c] transition-colors group">
                        Archives<span className="text-[#c9a84c]/0 group-hover:text-[#c9a84c] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#c9a84c] transition-colors group">
                        Legal<span className="text-[#c9a84c]/0 group-hover:text-[#c9a84c] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-[#1a1a1a]/5 mt-32 italic">
                  &copy; 2026 // LUXE_REAL_ESTATE&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
