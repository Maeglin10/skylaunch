"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { title: "The Vertex", loc: "Oslo, Norway", cat: "Cultural", img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1500" },
  { title: "Lumina Pavilion", loc: "Tokyo, Japan", cat: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1500" },
  { title: "Nordic Museum", loc: "Stockholm, Sweden", cat: "Civic", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1500" },
  { title: "Aura Skyscraper", loc: "Dubai, UAE", cat: "Residential", img: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1500" }
];

export default function PremiumArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#E5E5E5] text-[#111] min-h-screen font-sans selection:bg-[#111] selection:text-[#E5E5E5] uppercase overflow-hidden">
      
      {/* HEADER */}
      <motion.header style={{ opacity: headerOpacity }} className="fixed top-0 left-0 w-full px-8 py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <div className="font-black tracking-tighter text-3xl pointer-events-auto">
           ARCHI<span className="opacity-40">TECTURA</span>
        </div>
        <nav className="flex gap-12 font-bold text-[10px] tracking-[0.3em] pointer-events-auto">
            <Link href="#" className="hover:opacity-50 transition-opacity">Projects</Link>
            <Link href="#" className="hover:opacity-50 transition-opacity">Studio</Link>
            <Link href="#" className="hover:opacity-50 transition-opacity">Contact</Link>
        </nav>
      </motion.header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-end p-4 md:p-8">
         <motion.div 
            initial={{ height: "0%" }} 
            animate={{ height: "100%" }} 
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} 
            className="absolute inset-4 md:inset-8 bg-[#111] z-0 overflow-hidden"
         >
             <motion.div style={{ y: heroImgY }} className="absolute inset-[-10%]">
                <Image src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2500" alt="Architecture" fill className="object-cover opacity-60 mix-blend-luminosity" priority />
             </motion.div>
         </motion.div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end p-8 md:p-12 text-[#E5E5E5] pointer-events-none">
             <motion.h1 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 1, duration: 1 }} 
                className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter mix-blend-overlay drop-shadow-2xl mb-8 md:mb-0"
             >
                Space &<br/><span className="text-transparent" style={{ WebkitTextStroke: "2px #E5E5E5" }}>Structure.</span>
             </motion.h1>
             
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1.5 }} 
                className="text-[10px] font-bold tracking-[0.4em] max-w-xs md:text-right opacity-70 leading-loose"
             >
                 Award-winning architectural design studio based in Copenhagen. Redefining modern brutalism.
             </motion.div>
         </div>
      </section>

      {/* PROJECT GRID */}
      <section className="px-4 md:px-8 py-32 bg-[#111]">
         <div className="flex justify-between items-end mb-24 px-4 md:px-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#E5E5E5]">Selected Works</h2>
            <div className="hidden md:block text-[10px] font-bold tracking-[0.4em] text-[#E5E5E5]/50">2022 — 2026</div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {PROJECTS.map((proj, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8, delay: i * 0.1 }}
                   className="group relative aspect-[4/5] md:aspect-[3/4] bg-[#1A1A1A] overflow-hidden cursor-pointer flex flex-col justify-between p-8 md:p-12"
                >
                    <div className="absolute inset-0 z-0">
                        <Image src={proj.img} alt={proj.title} fill className="object-cover opacity-40 group-hover:opacity-80 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] grayscale group-hover:grayscale-0 group-hover:scale-110 transform" />
                    </div>
                    
                    <div className="relative z-10 flex justify-between items-start text-[#E5E5E5]">
                        <div className="font-black text-[10px] tracking-[0.4em] opacity-50 group-hover:opacity-100 transition-opacity duration-500">0{i+1}</div>
                        <div className="font-bold text-[10px] tracking-[0.3em] opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                           View Project <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                    
                    <div className="relative z-10 text-[#E5E5E5]">
                        <div className="font-bold text-[10px] tracking-[0.4em] opacity-50 mb-4 flex gap-4">
                           <span>{proj.cat}</span> <span className="opacity-30">/</span> <span>{proj.loc}</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">{proj.title}</h3>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#E5E5E5] text-[#111] py-32 px-8 flex flex-col items-center justify-center text-center">
         <h2 className="text-[12vw] font-black tracking-tighter leading-none mb-12">ARCHI<span className="opacity-20">TECTURA</span></h2>
         <div className="flex gap-12 font-bold text-[10px] tracking-[0.4em] opacity-50">
            <Link href="#" className="hover:opacity-100 transition-opacity">Instagram</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">LinkedIn</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Behance</Link>
         </div>
      </footer>
    </div>
  );
}
