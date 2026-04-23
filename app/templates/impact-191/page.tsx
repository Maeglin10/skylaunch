"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { title: "The Alpine Retreat", cat: "Residential", loc: "Swiss Alps", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1500" },
  { title: "Maison V", cat: "Commercial", loc: "Milan", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1500" },
  { title: "Gallery 04", cat: "Cultural", loc: "Paris", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1500" }
];

export default function PremiumInterior() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#EAE8E3] text-[#2C2C2A] min-h-screen font-serif selection:bg-[#BCAAA4] selection:text-white">
      
      {/* NOISE TEXTURE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-color-burn" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-8 py-8 flex justify-between items-center z-50 mix-blend-difference text-[#EAE8E3] pointer-events-none">
        <Link href="/" className="text-3xl font-normal tracking-[0.2em] uppercase pointer-events-auto">Vela.</Link>
        <nav className="hidden md:flex gap-16 font-sans font-bold text-[10px] tracking-[0.3em] uppercase pointer-events-auto">
            <Link href="#" className="hover:opacity-50 transition-opacity">Projects</Link>
            <Link href="#" className="hover:opacity-50 transition-opacity">Studio</Link>
            <Link href="#" className="hover:opacity-50 transition-opacity">Journal</Link>
        </nav>
        <button className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase border-b border-current pb-1 hover:opacity-50 transition-opacity pointer-events-auto">
            Inquire
        </button>
      </header>

      {/* SPLIT HERO SECTION */}
      <section className="relative h-screen flex flex-col lg:flex-row overflow-hidden border-b border-[#2C2C2A]/10">
         
         {/* Text Side */}
         <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 pt-32 lg:pt-0 relative z-10 bg-[#EAE8E3]">
            <motion.div style={{ opacity: heroOpacity }} className="max-w-2xl">
               <div className="font-sans font-bold text-[10px] tracking-[0.4em] uppercase text-[#BCAAA4] mb-12 flex items-center gap-4">
                  <span className="w-12 h-px bg-[#BCAAA4]" /> Est. 2018
               </div>
               
               <h1 className="text-6xl md:text-[7vw] font-light leading-[0.9] mb-12 tracking-tighter">
                  Curating<br/><span className="italic">quiet spaces.</span>
               </h1>
               
               <p className="font-sans text-sm tracking-[0.2em] max-w-sm mb-16 uppercase leading-[2] text-[#2C2C2A]/60">
                   A multi-disciplinary interior architecture studio based in Milan, focusing on raw materials, natural light, and brutalist elegance.
               </p>
               
               <Link href="#" className="inline-flex items-center gap-6 font-sans font-bold text-[10px] tracking-[0.3em] uppercase border-b-2 border-[#2C2C2A] pb-2 hover:gap-10 hover:text-[#BCAAA4] hover:border-[#BCAAA4] transition-all group">
                   View Portfolio <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
               </Link>
            </motion.div>
         </div>
         
         {/* Image Parallax Side */}
         <div className="flex-1 relative min-h-[50vh] lg:min-h-screen overflow-hidden">
            <motion.div style={{ scale: heroScale }} className="absolute inset-0">
               <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" alt="Interior Architecture" fill className="object-cover" priority />
            </motion.div>
         </div>
         
      </section>

      {/* SELECTED WORKS MASONRY */}
      <section className="py-32 px-8 max-w-[1800px] mx-auto relative z-10">
         <div className="flex justify-between items-end mb-24 lg:mb-32">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">Selected Works</h2>
            <Link href="#" className="hidden md:flex font-sans font-bold text-[10px] tracking-[0.3em] uppercase underline underline-offset-8 hover:text-[#BCAAA4] transition-colors">
               All Projects
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 lg:gap-x-24 lg:gap-y-48">
            {PROJECTS.map((proj, i) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group cursor-pointer ${i === 1 ? 'md:mt-48' : ''}`}
               >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#DCD8D0] mb-8">
                     <Image src={proj.img} alt={proj.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[0.16,1,0.3,1]" />
                     <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="text-3xl font-normal group-hover:italic transition-all duration-500 mb-2">{proj.title}</h3>
                        <div className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-[#2C2C2A]/50">
                           {proj.loc}
                        </div>
                     </div>
                     <div className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase text-[#BCAAA4] border border-[#BCAAA4]/30 px-3 py-1 rounded-full">
                        {proj.cat}
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* STUDIO PHILOSOPHY */}
      <section className="py-32 px-8 bg-[#2C2C2A] text-[#EAE8E3] relative z-10">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-light leading-snug tracking-tight mb-16">
               "We believe in spaces that breathe. Where every texture tells a story and emptiness is treated as an active design element."
            </h2>
            <div className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase opacity-50">The Vela Philosophy</div>
         </div>
      </section>

    </div>
  );
}
