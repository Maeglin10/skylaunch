"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, HardHat, Ruler, Building2 } from "lucide-react";
import "../premium.css";

export default function PremiumConstruction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const clipPath = useTransform(scrollYProgress, [0, 0.3], ["inset(10% 10% 10% 10%)", "inset(0% 0% 0% 0%)"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#E5E5E5] text-[#111] min-h-screen font-sans selection:bg-[#FFB800] selection:text-black">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-10 mix-blend-difference text-white pointer-events-none">
        <div className="font-black text-3xl tracking-tighter uppercase pointer-events-auto">IRONCLAD.</div>
        <nav className="hidden md:flex gap-12 font-bold text-[10px] uppercase tracking-[0.3em] pointer-events-auto opacity-50">
            <Link href="#" className="hover:text-white transition">Projects</Link>
            <Link href="#" className="hover:text-white transition">Services</Link>
            <Link href="#" className="hover:text-white transition">About</Link>
        </nav>
        <button className="bg-[#FFB800] text-black px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-colors pointer-events-auto">
           Get a Quote
        </button>
      </header>

      {/* HERO SECTION WITH MASKING */}
      <section className="relative h-[150vh] bg-[#111]">
         <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <motion.div style={{ clipPath }} className="absolute inset-0 z-0">
               <motion.div style={{ y: yImage }} className="absolute inset-0">
                  <Image src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2500" alt="Construction Site" fill className="object-cover opacity-60 mix-blend-luminosity grayscale" priority />
               </motion.div>
            </motion.div>
            
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-32">
               <div className="w-24 h-4 bg-[#FFB800] mb-8" />
               <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-[10vw] font-black text-white uppercase leading-[0.85] tracking-tighter mix-blend-difference"
               >
                  Building <br/>
                  The Future, <br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #FFB800" }}>On Solid Ground.</span>
               </motion.h1>
            </div>
         </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-32 px-6 md:px-12 bg-[#E5E5E5] relative z-20">
         <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-8 border-b-4 border-[#111] pb-12">
               <div className="max-w-3xl">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB800] mb-6 block bg-[#111] w-fit px-4 py-2">Core Capabilities</span>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#111]">Engineering <br/> Excellence.</h2>
               </div>
               <p className="text-xl font-medium text-[#111]/60 max-w-md">
                  We bring decades of uncompromising experience to every phase of commercial and industrial development.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { icon: <Building2 className="w-12 h-12" />, title: "General Contracting", desc: "Full-service project management from concept to completion." },
                  { icon: <Ruler className="w-12 h-12" />, title: "Design-Build", desc: "Integrated architecture and construction for faster, cost-effective delivery." },
                  { icon: <Hammer className="w-12 h-12" />, title: "Heavy Civil", desc: "Infrastructure, mass earthwork, and foundational engineering." }
               ].map((serv, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.8, delay: i * 0.2 }}
                     className="bg-white p-12 hover:bg-[#111] hover:text-white transition-colors duration-500 group border-b-8 border-[#E5E5E5] hover:border-[#FFB800] cursor-pointer"
                  >
                     <div className="text-[#111]/10 group-hover:text-[#FFB800] transition-colors mb-12">
                        {serv.icon}
                     </div>
                     <div className="text-6xl font-black text-[#E5E5E5] group-hover:text-white/10 transition-colors mb-6">0{i+1}</div>
                     <h3 className="text-3xl font-black uppercase tracking-tight mb-6">{serv.title}</h3>
                     <p className="text-lg font-medium text-[#111]/60 group-hover:text-white/60 transition-colors leading-relaxed mb-12">{serv.desc}</p>
                     
                     <div className="w-12 h-12 rounded-full bg-[#E5E5E5] flex items-center justify-center group-hover:bg-[#FFB800] text-[#111] transition-colors">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] text-white pt-32 pb-12 px-6 md:px-12">
         <div className="max-w-[1600px] mx-auto text-center">
            <h2 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter text-[#FFB800] mb-12 mix-blend-screen">IRONCLAD.</h2>
            <div className="flex justify-center gap-12 font-black text-[10px] uppercase tracking-[0.3em] text-white/40">
               <span>Est. 1998</span>
               <span>Industrial Build</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
