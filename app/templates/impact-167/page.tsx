"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2, Bath, Bed, Search, ArrowRight, ChevronRight } from "lucide-react";
import "../premium.css";

const PROPERTIES = [
  { price: "12,500,000", addr: "The Glass House, Kyoto", spec: "4 Bed · 5 Bath · 8,200 sqft", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", tag: "Exclusive" },
  { price: "8,250,000", addr: "Cliffside Villa, Amalfi", spec: "5 Bed · 6 Bath · 6,100 sqft", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", tag: "New" },
  { price: "18,900,000", addr: "Sky Penthouse, NY", spec: "3 Bed · 4 Bath · 5,500 sqft", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200", tag: "Signature" },
];

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`relative transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function PremiumRealEstate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#f8f9fa] text-[#1a1a1a] min-h-screen font-sans selection:bg-[#c9a84c] selection:text-white">
      
      {/* HEADER */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 md:py-8 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-[#1a1a1a]/5 transition-all">
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter uppercase">Luxe<span className="text-[#c9a84c]">.</span></Link>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] font-bold">
           <Link href="#" className="hover:text-[#c9a84c] transition-colors">Portfolio</Link>
           <Link href="#" className="hover:text-[#c9a84c] transition-colors">Off-Market</Link>
           <Link href="#" className="hover:text-[#c9a84c] transition-colors">Journal</Link>
        </div>
        <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#c9a84c] transition-colors">Private Client</button>
      </nav>

      {/* HERO PARALLAX */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
         <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2500" alt="Hero Architecture" fill className="object-cover opacity-60 mix-blend-luminosity" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/40 to-[#1a1a1a]" />
         </motion.div>
         
         <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full max-w-6xl px-6 text-center">
            <span className="text-[#c9a84c] text-[10px] uppercase font-bold tracking-[0.5em] mb-8 block">Curated Architecture</span>
            <h1 className="text-6xl md:text-[8vw] font-black tracking-tighter text-white leading-[0.85] mb-12 uppercase drop-shadow-2xl">
               Beyond <br /> <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Boundaries.</span>
            </h1>
            
            {/* Search Glass */}
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-2xl p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2">
               <div className="flex-1 flex items-center px-6 gap-4">
                  <Search className="w-5 h-5 text-white/50" />
                  <input type="text" placeholder="Location, Property ID, or Architect..." className="bg-transparent border-none text-white outline-none w-full placeholder:text-white/50 font-light" />
               </div>
               <button className="bg-[#c9a84c] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-colors">
                  Explore
               </button>
            </div>
         </motion.div>
         
         {/* Scroll Indicator */}
         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/50">
            <span className="text-[8px] uppercase tracking-[0.4em] font-bold">Scroll</span>
            <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
               <motion.div animate={{ y: [-50, 50] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-full h-full bg-[#c9a84c]" />
            </div>
         </div>
      </section>

      {/* HORIZONTAL MARQUEE */}
      <div className="py-8 bg-[#1a1a1a] border-y border-white/10 overflow-hidden flex whitespace-nowrap">
         <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex gap-16 text-white/20 text-4xl font-black uppercase tracking-tighter italic">
            <span>Global Presence</span> <span>•</span> <span>Bespoke Service</span> <span>•</span> <span>Discreet Transactions</span> <span>•</span>
            <span>Global Presence</span> <span>•</span> <span>Bespoke Service</span> <span>•</span> <span>Discreet Transactions</span> <span>•</span>
         </motion.div>
      </div>

      {/* PROPERTIES GRID (TILT CARDS) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">The Collection.</h2>
               <p className="text-gray-500 font-light text-xl max-w-md">Access to the world's most exceptional private residences.</p>
            </div>
            <button className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.3em] hover:text-[#c9a84c] transition-colors pb-4 border-b border-black">
               View Complete Portfolio <ArrowRight className="w-4 h-4" />
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {PROPERTIES.map((prop, i) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
               >
                  <TiltCard className="group cursor-pointer">
                     <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-8 shadow-2xl">
                        <Image src={prop.img} alt={prop.addr} fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-60 group-hover:opacity-80 transition-opacity" />
                        
                        <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold">
                           {prop.tag}
                        </div>
                        
                        <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           <div className="flex justify-between items-end">
                              <div className="text-3xl font-black text-white tracking-tighter">${prop.price}</div>
                              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                 <ArrowRight className="w-4 h-4 -rotate-45" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="px-2">
                        <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">{prop.addr}</h3>
                        <p className="text-gray-500 text-sm font-bold tracking-widest uppercase text-[10px] flex items-center gap-3">
                           <span className="w-1 h-1 rounded-full bg-[#c9a84c]" /> {prop.spec}
                        </p>
                     </div>
                  </TiltCard>
               </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] text-white pt-32 pb-12 px-6 rounded-t-[4rem]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-12 mb-12">
            <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-white/10 hover:text-white transition-colors cursor-pointer">Luxe.</h2>
            <div className="text-[10px] uppercase tracking-widest font-bold text-white/50 text-right">
               Global Headquarters <br /> 432 Park Ave, NY
            </div>
         </div>
      </footer>
    </div>
  );
}
