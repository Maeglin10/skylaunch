"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function ArchitectureStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const curtainY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-100%"]);
  const imageScale = useTransform(scrollYProgress, [0.4, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="premium-theme bg-white text-black min-h-[300vh] selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all bg-white/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black tracking-widest uppercase">Aether.Arch</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-bold opacity-40">
           <a href="#about" className="hover:opacity-100">About</a>
           <a href="#projects" className="hover:opacity-100">Projects</a>
           <a href="#contact" className="hover:opacity-100 font-black italic text-black">Inquire</a>
        </div>
      </nav>

      {/* Hero Section with Curtain Effect */}
      <section className="h-screen relative flex items-center justify-center p-12 overflow-hidden">
         <motion.div 
           style={{ y: curtainY }}
           className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-white"
         >
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
               Silent <br /> Space.
            </h1>
            <div className="w-1 px-12 h-24 bg-white/20 animate-bounce" />
            <span className="text-[10px] uppercase tracking-[1em] font-black italic mt-12 opacity-40">Scroll to Enter</span>
         </motion.div>

         <div className="absolute inset-0 z-0">
            <Image src="/templates/brutalist_staircase.png" alt="Architecture 1" fill className="object-cover grayscale" />
            <div className="absolute inset-0 bg-white/20" />
         </div>

         <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
               Concrete <br /> Philosophy.
            </h2>
            <p className="max-w-md mx-auto text-sm uppercase tracking-widest leading-relaxed opacity-60 font-bold">
               We don't build structures; we curate the intersection of light, shadow, and heavy mass.
            </p>
         </div>
      </section>

      {/* Content Stream */}
      <section className="py-64 px-12 bg-[#f5f5f5]">
         <div className="max-w-7xl mx-auto space-y-64">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="relative aspect-[4/5] overflow-hidden rounded-3xl"
               >
                  <motion.div style={{ scale: imageScale }}>
                     <Image src="/templates/portal_frame.png" alt="Project 1" fill className="object-cover grayscale" />
                  </motion.div>
               </motion.div>
               <div className="space-y-12">
                  <span className="text-xs uppercase font-black tracking-widest opacity-20 block">Case_Study_01</span>
                  <h3 className="text-7xl font-black uppercase italic tracking-tighter leading-none">The <br /> Threshold.</h3>
                  <p className="max-w-md text-xl font-light opacity-60 leading-relaxed uppercase tracking-wider">
                     A minimal intervention in the desert landscape, designed to frame the horizon.
                  </p>
                  <button className="px-12 py-6 border border-black uppercase text-[10px] tracking-[0.6em] font-black hover:bg-black hover:text-white transition-all">View Detail</button>
               </div>
            </div>

            <div className="text-center py-48">
               <div className="text-[15vw] font-black uppercase italic tracking-tighter opacity-5 select-none leading-none mb-12">Rhythm.</div>
               <p className="max-w-2xl mx-auto text-2xl font-black uppercase tracking-tighter leading-tight italic">
                  Light is the only material that is free. We use it to carve our spaces and define our boundaries.
               </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-24">
               <div className="max-w-md">
                   <h3 className="text-6xl font-black uppercase tracking-tighter leading-none mb-8 italic">Precision <br /> Mastery.</h3>
                   <p className="text-sm opacity-40 leading-relaxed uppercase tracking-widest font-bold">
                      Our process is governed by mathematical rigor and an obsessive attention to material honesty.
                   </p>
               </div>
               <div className="relative w-full md:w-1/2 aspect-video bg-black overflow-hidden rounded-[4rem]">
                   <Image src="/templates/agency_hero.png" alt="Detail" fill className="object-cover grayscale invert contrast-200" />
               </div>
            </div>

         </div>
      </section>

      <footer className="h-screen flex flex-col items-center justify-center bg-black text-white p-12 text-center">
         <h2 className="text-8xl md:text-[10vw] font-black uppercase italic tracking-tighter leading-none mb-12">Start <br /> Project.</h2>
         <div className="flex flex-col gap-4 text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-24">
            <span>London</span>
            <span>Paris</span>
            <span>New York</span>
         </div>
         <button className="px-12 py-8 bg-white text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">Get In Touch</button>
      </footer>
    </div>
  );
}
