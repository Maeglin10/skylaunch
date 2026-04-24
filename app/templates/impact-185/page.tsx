"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Menu, Search, Activity, Zap, Layers } from "lucide-react";
import "../premium.css";

const LOOKS = [
  { icon: <ShoppingBag className="w-8 h-8" />, title: "STRUCTURED_COAT", cat: "Outerwear", value: "Verified", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Activity className="w-8 h-8" />, title: "SILK_DRAPED_V3", cat: "Gowns", value: "Active", img: "https://images.unsplash.com/photo-1550614000-4b95d4151745?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Zap className="w-8 h-8" />, title: "BLAZER_OVER_CORE", cat: "Tailoring", value: "Locked", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1500" },
];

export default function VelmaFashionSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#EBE9E4] text-[#1D1D1B] min-h-screen font-serif selection:bg-[#1D1D1B] selection:text-[#EBE9E4] overflow-hidden relative">
      
      {/* FASHION GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(29,29,27,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(29,29,27,0.03)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#1D1D1B] opacity-[0.02] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#EBE9E4]/50 backdrop-blur-3xl border-b border-[#1D1D1B]/5">
        <Link href="/" className="font-black text-2xl tracking-tighter text-[#1D1D1B] flex items-center gap-4 italic uppercase">
           VELMA<span className="text-[#1D1D1B]/30">_COLLECTIVE</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-sans font-black text-[10px] uppercase tracking-[0.6em] text-[#1D1D1B]/30">
            <Link href="#" className="hover:text-[#1D1D1B] transition-colors group">
               Lookbook<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#1D1D1B] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#1D1D1B] transition-colors group">
               Runway<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#1D1D1B] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#1D1D1B] transition-colors group">
               Atelier<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#1D1D1B] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-[#1D1D1B] text-[#EBE9E4] px-12 py-4 font-sans font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
              Shop_The_Look
           </button>
           <Menu className="w-6 h-6 text-[#1D1D1B] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2500" alt="Fashion" fill className="object-cover opacity-20 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#EBE9E4] via-transparent to-[#EBE9E4]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-sans font-black text-[10px] uppercase tracking-[1em] text-[#1D1D1B]/50 mb-16 border-l-2 border-[#1D1D1B] pl-10 italic">
                  Visual_Capture // 0185_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-[#1D1D1B]">
                  SPRING.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #1D1D1B" }}>SUMMER_26.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-[#1D1D1B]/40 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest text-center">
                  Structural allocation for aesthetic intent. Architecting the future of couture with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-sans font-mono text-[#1D1D1B]">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#1D1D1B]/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em]">Explore_Collection</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-[#1D1D1B]/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-[#1D1D1B]/10 italic">
                     Paris // Milan // NYC // London
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-sans font-black text-[8px] uppercase tracking-[1em] text-[#1D1D1B]/20 hidden md:flex italic">
            <span>SYNC_STATUS: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#1D1D1B]" />)}
            </div>
         </div>
      </section>

      {/* LOOKS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#EBE9E4]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-[#1D1D1B]/10 pb-20 gap-16 font-sans">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#1D1D1B] mb-8 block italic font-mono">Fashion_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#1D1D1B] leading-none">The <span className="text-[#1D1D1B]/20">Looks_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-[#1D1D1B]/20 italic font-mono">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-sans">
            {LOOKS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-stone-50 border border-[#1D1D1B]/5 overflow-hidden cursor-pointer hover:border-[#1D1D1B]/30 transition-all shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#EBE9E4] via-transparent to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-[#EBE9E4]/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono text-[#1D1D1B]">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/5 border border-[#1D1D1B]/10 rounded-none group-hover:bg-[#1D1D1B] group-hover:text-[#EBE9E4] transition-all shadow-xl">
                              {p.icon}
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#1D1D1B] italic font-mono">Ref_0x{i+185}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-[#1D1D1B] mb-8 block italic font-black">{p.cat} // Verified</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-[#1D1D1B] group-hover:tracking-widest transition-all leading-[0.8]">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-[#1D1D1B]">
                              Details <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-[#1D1D1B]/5 relative z-10 bg-[#EBE9E4]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 font-sans">
            <div className="max-w-2xl">
               <div className="text-[#1D1D1B] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Fashion_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-[#1D1D1B]/20 uppercase tracking-tighter mb-20">
                  WE TREAT LOOKS AS ARCHITECTURE. EVERY STITCH A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#1D1D1B]/40 italic font-mono">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-[#1D1D1B]">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter opacity-[0.02] leading-none mb-20 text-[#1D1D1B]">VELMA</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-[#1D1D1B]/10">
                     <Link href="#" className="hover:text-[#1D1D1B] transition-colors group">
                        Instagram<span className="text-[#1D1D1B]/0 group-hover:text-[#1D1D1B] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#1D1D1B] transition-colors group">
                        Lookbook<span className="text-[#1D1D1B]/0 group-hover:text-[#1D1D1B] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#1D1D1B] transition-colors group">
                        Legal<span className="text-[#1D1D1B]/0 group-hover:text-[#1D1D1B] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-[#1D1D1B]/5 mt-32 italic">
                  &copy; 2026 // VELMA_FASHION_HOUSE&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
