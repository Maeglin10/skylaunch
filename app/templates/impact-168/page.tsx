"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search, Menu, ArrowRight, Activity, Zap, Shield, Layers } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { name: "HEAVYWEIGHT BOX TEE", price: 45, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1500", imgHover: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1500" },
  { name: "STRUCTURED OVERSHIRT", price: 120, img: "https://images.unsplash.com/photo-1593998066526-65fcab3021a2?auto=format&fit=crop&q=80&w=1500", imgHover: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1500" },
  { name: "EVERYDAY TOTE", price: 65, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1500", imgHover: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1500" },
  { name: "MINIMAL SNEAKER", price: 150, img: "https://images.unsplash.com/photo-1560769623-688fd61376d2?auto=format&fit=crop&q=80&w=1500", imgHover: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1500" },
];

export default function BasicsEcommerceSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#e5e5e5] text-black min-h-screen font-sans selection:bg-black selection:text-white overflow-hidden relative">
      
      {/* BASICS GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-black opacity-[0.02] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#e5e5e5]/30 backdrop-blur-3xl border-b border-black/5">
        <Link href="/" className="font-black text-2xl tracking-[0.2em] text-black flex items-center gap-4 italic uppercase">
           BASICS<span className="text-black/20">_</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-black/30">
            <Link href="#" className="hover:text-black transition-colors group">
               Shop<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">.</span>
            </Link>
            <Link href="#" className="hover:text-black transition-colors group">
               Archive<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">.</span>
            </Link>
            <Link href="#" className="hover:text-black transition-colors group">
               Journal<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-black text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-stone-800 transition-all">
              Cart_[02]
           </button>
           <Menu className="w-6 h-6 text-black cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1445205170230-053b830160b0?auto=format&fit=crop&q=80&w=2500" alt="Collection" fill className="object-cover opacity-20 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#e5e5e5] via-transparent to-[#e5e5e5]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-black/20 mb-16 border-l-2 border-black pl-10 italic font-mono">
                  Visual_Capture // 0168_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-black">
                  LESS.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #000" }}>BETTER.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-black/30 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest">
                  Structural allocation for aesthetic intent. Architecting the future of essentials with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-black/10 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-black">View_Collection</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-black/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-black/10 italic">
                     Berlin // London // NYC
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-black/20 hidden md:flex italic font-mono">
            <span>SYNC_STATUS: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-black/40" />)}
            </div>
         </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#e5e5e5]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-black/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-black/40 mb-8 block italic font-mono">Visual_Manifest</span>
               <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-black leading-none">The <span className="text-black/10">Basics_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-black/20 italic font-mono">
               <span>Records: [04]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PRODUCTS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[70vh] bg-stone-100 border border-black/5 overflow-hidden cursor-pointer hover:border-black/30 transition-all shadow-sm"
                >
                    <Image src={p.img} alt={p.name} fill className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#e5e5e5] via-transparent to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-12 flex flex-col justify-between z-10 font-mono">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-white/40 backdrop-blur-xl border border-black/5 rounded-none group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                              <ShoppingBag className="w-5 h-5" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-black/20 italic">Ref_0x{i+168}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-black mb-6 block italic font-black">Essential // Verified</span>
                           <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-12 text-black group-hover:tracking-widest transition-all leading-[0.8]">{p.name}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-black">
                              ${p.price} // Buy <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-black/5 relative z-10 bg-[#e5e5e5]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-black mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Basics_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-black/20 uppercase tracking-tighter mb-20">
                  WE TREAT ESSENTIALS AS ARCHITECTURE. EVERY PIECE A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-black/40 italic font-mono">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-black opacity-[0.02] leading-none mb-20">BASICS</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-black/10">
                     <Link href="#" className="hover:text-black transition-colors group">
                        Instagram<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-black transition-colors group">
                        Journal<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-black transition-colors group">
                        Legal<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-black/5 mt-32 italic">
                  &copy; 2026 // BASICS_CLOTHING_STUDIO&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
