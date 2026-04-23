"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { title: "Nighthawks", dir: "J. Mercer", year: "2026", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000" },
  { title: "The Void", dir: "A. Lin", year: "2025", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=2000" },
  { title: "Ethereal", dir: "S. Costa", year: "2024", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=2000" }
];

export default function PremiumFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Transform vertical scroll into horizontal translation for the films
  const xFilms = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);
  
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-[#FAFAFA] min-h-[300vh] font-serif selection:bg-red-700 selection:text-white relative">
      
      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full px-8 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <div className="font-sans font-black text-xs uppercase tracking-[0.4em] pointer-events-auto">
           Cine<span className="text-red-600">ma</span>
        </div>
        <nav className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] flex gap-12 pointer-events-auto">
            <Link href="#" className="hover:text-red-500 transition-colors">Roster</Link>
            <Link href="#" className="hover:text-red-500 transition-colors">About</Link>
            <Link href="#" className="hover:text-red-500 transition-colors">Contact</Link>
        </nav>
      </header>

      {/* STICKY CONTAINER FOR HORIZONTAL SCROLL */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
         
         <motion.div style={{ x: xFilms }} className="flex h-full w-[300vw]">
            
            {/* INTRO SLIDE (100vw) */}
            <section className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-24 relative z-10 shrink-0">
                <div className="absolute inset-0 bg-[#050505] z-0 pointer-events-none" />
                
                <motion.div 
                   initial={{ opacity: 0, x: -50 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
                   className="relative z-10 max-w-4xl"
                >
                    <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-red-600 mb-8 flex items-center gap-4">
                       <span className="w-12 h-px bg-red-600" /> Est. 2020
                    </div>
                    
                    <h1 className="text-7xl md:text-[9vw] font-black tracking-tighter leading-[0.85] mb-12 uppercase">
                        Visual<br />
                        <span className="italic font-light text-white/80">Storytelling.</span>
                    </h1>
                    
                    <p className="font-sans font-light text-sm tracking-[0.2em] uppercase leading-loose text-white/50 max-w-md">
                        Award-winning production house specializing in cinematic commercials, short films, and transcendent visual experiences.
                    </p>
                </motion.div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-8 md:left-24 font-sans text-[10px] font-black uppercase tracking-[0.4em] text-white/30 flex items-center gap-4">
                   Scroll <div className="w-16 h-px bg-white/30 relative overflow-hidden">
                      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-white" />
                   </div>
                </div>
            </section>

            {/* PROJECT SLIDES */}
            {PROJECTS.map((proj, i) => (
                <section key={i} className="w-[100vw] h-full shrink-0 flex items-center justify-center p-8 md:p-24 relative group">
                    <div className="relative w-full h-[80vh] rounded-[2rem] overflow-hidden">
                       <Image src={proj.img} alt={proj.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 ease-[0.16,1,0.3,1]" />
                       
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                       
                       {/* Content overlay */}
                       <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                           <div className="flex justify-between items-end">
                              <div>
                                  <div className="font-sans font-black text-[10px] tracking-[0.4em] uppercase mb-6 text-red-500 overflow-hidden">
                                     <motion.div initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.2 }} className="flex items-center gap-4">
                                        Dir: {proj.dir} <span className="w-4 h-px bg-red-500" /> {proj.year}
                                     </motion.div>
                                  </div>
                                  <div className="overflow-hidden">
                                     <motion.h2 initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-none italic">
                                        {proj.title}
                                     </motion.h2>
                                  </div>
                              </div>
                              
                              {/* Play Button */}
                              <button 
                                 onClick={() => setActiveVideo(i)}
                                 className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500 hover:scale-110"
                              >
                                 <Play className="w-8 h-8 fill-current ml-2" />
                              </button>
                           </div>
                       </div>
                    </div>
                </section>
            ))}
         </motion.div>
      </div>

      {/* FULLSCREEN VIDEO MODAL */}
      {activeVideo !== null && (
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-12"
         >
            <button 
               onClick={() => setActiveVideo(null)}
               className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-red-600 transition-colors z-10"
            >
               <X className="w-6 h-6" />
            </button>
            
            <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
               {/* Faux Video Player */}
               <div className="absolute inset-0">
                  <Image src={PROJECTS[activeVideo].img} alt="Video Poster" fill className="object-cover opacity-50" />
               </div>
               <div className="relative z-10 text-center">
                  <Play className="w-24 h-24 text-white/50 mx-auto mb-8 animate-pulse" />
                  <div className="font-sans font-black text-xs uppercase tracking-[0.4em] text-white">Playing: {PROJECTS[activeVideo].title}</div>
               </div>
            </div>
         </motion.div>
      )}
      
    </div>
  );
}
