"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, Clock, MapPin, Menu, Search, ArrowRight, Layers, Activity, Zap } from "lucide-react";
import "../premium.css";

const EXHIBITIONS = [
  { icon: <Layers className="w-8 h-8" />, title: "FORM_CHAOS_SC", cat: "Sculpture", value: "Verified", img: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Activity className="w-8 h-8" />, title: "KINETIC_FLOW_V2", cat: "Installation", value: "Active", img: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Zap className="w-8 h-8" />, title: "LIGHT_VOID_CORE", cat: "Digital", value: "Locked", img: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=1500" },
];

export default function MoMASPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#E4E2DE] text-[#8B0000] min-h-screen font-serif selection:bg-[#8B0000] selection:text-[#E4E2DE] overflow-hidden relative">
      
      {/* MUSEUM GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,0,0,0.03)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent:100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#8B0000] opacity-[0.02] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#E4E2DE]/50 backdrop-blur-3xl border-b border-[#8B0000]/5">
        <Link href="/" className="font-black text-2xl tracking-tighter text-[#8B0000] flex items-center gap-4 italic uppercase">
           MOMA<span className="text-[#8B0000]/30">_MODERN_ART</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-sans font-black text-[10px] uppercase tracking-[0.6em] text-[#8B0000]/30">
            <Link href="#" className="hover:text-[#8B0000] transition-colors group">
               Exhibitions<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#8B0000] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#8B0000] transition-colors group">
               Collections<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#8B0000] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#8B0000] transition-colors group">
               Visit<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#8B0000] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-[#8B0000] text-[#E4E2DE] px-12 py-4 font-sans font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black transition-all">
              Book_Tickets
           </button>
           <Menu className="w-6 h-6 text-[#8B0000] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=2500" alt="Museum" fill className="object-cover opacity-20 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#E4E2DE] via-transparent to-[#E4E2DE]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-sans font-black text-[10px] uppercase tracking-[1em] text-[#8B0000] mb-16 border-l-2 border-[#8B0000] pl-10 italic font-mono">
                  Visual_Capture // 0184_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-[#8B0000]">
                  FORM.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #8B0000" }}>CHAOS.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-[#8B0000]/40 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest text-center">
                  Structural allocation for aesthetic intent. Architecting the future of art with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-sans font-mono text-[#8B0000]">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#8B0000]/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em]">Explore_Gallery</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-[#8B0000]/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-[#8B0000]/10 italic">
                     Established // 1929 // Manhattan
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-sans font-black text-[8px] uppercase tracking-[1em] text-[#8B0000]/20 hidden md:flex italic">
            <span>SYNC_STATUS: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#8B0000]" />)}
            </div>
         </div>
      </section>

      {/* EXHIBITIONS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#E4E2DE]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-[#8B0000]/10 pb-20 gap-16 font-sans">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#8B0000] mb-8 block italic font-mono">Exhibition_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#8B0000] leading-none">The <span className="text-[#8B0000]/20">Archive_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-[#8B0000]/20 italic font-mono">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-sans">
            {EXHIBITIONS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-stone-50 border border-[#8B0000]/5 overflow-hidden cursor-pointer hover:border-[#8B0000]/30 transition-all shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E4E2DE] via-transparent to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-[#E4E2DE]/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono text-[#8B0000]">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/5 border border-[#8B0000]/10 rounded-none group-hover:bg-[#8B0000] group-hover:text-[#E4E2DE] transition-all shadow-xl">
                              {p.icon}
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#8B0000] italic font-mono">Ref_0x{i+184}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-[#8B0000] mb-8 block italic font-black">{p.cat} // Verified</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-[#8B0000] group-hover:tracking-widest transition-all leading-[0.8]">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-[#8B0000]">
                              Report <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-[#8B0000]/5 relative z-10 bg-[#E4E2DE]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 font-sans">
            <div className="max-w-2xl">
               <div className="text-[#8B0000] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Museum_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-[#8B0000]/20 uppercase tracking-tighter mb-20">
                  WE TREAT ART AS ARCHITECTURE. EVERY PIECE A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#8B0000]/40 italic font-mono">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-[#8B0000]">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter opacity-[0.02] leading-none mb-20">MOMA</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-[#8B0000]/10">
                     <Link href="#" className="hover:text-[#8B0000] transition-colors group">
                        Instagram<span className="text-[#8B0000]/0 group-hover:text-[#8B0000] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#8B0000] transition-colors group">
                        Archive<span className="text-[#8B0000]/0 group-hover:text-[#8B0000] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#8B0000] transition-colors group">
                        Legal<span className="text-[#8B0000]/0 group-hover:text-[#8B0000] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-[#8B0000]/5 mt-32 italic">
                  &copy; 2026 // MUSEUM_OF_MODERN_ART_NYC&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
