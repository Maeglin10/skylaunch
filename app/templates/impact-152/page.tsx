"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, MapPin, Globe, Menu, Search, ArrowRight, Layers, MoveVertical, Activity } from "lucide-react";
import "../premium.css";

const STORIES = [
  { id: 1, title: "CORE_SVALBARD", cat: "Arctic", value: "Verified", img: "https://images.unsplash.com/photo-1517090504586-3bf49cf204e3?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "VOID_BOLIVIA", cat: "Desert", value: "Active", img: "https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "NEON_TOKYO", cat: "Urban", value: "Locked", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1500" },
];

function TextScramble({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1/3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
}

export default function WandererJournalSPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
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
    <div ref={containerRef} className="premium-theme bg-[#FDFDFC] text-[#1A1A1A] min-h-screen font-sans selection:bg-black selection:text-white overflow-hidden relative uppercase">
      
      {/* NOISE & GRAIN OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#FDFDFC_100%)] opacity-80" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#FDFDFC]/30 backdrop-blur-3xl border-b border-black/5">
        <Link href="/" className="font-black text-2xl tracking-tighter text-black flex items-center gap-3 italic uppercase text-center md:text-left">
           WANDERER<span className="text-[#1A1A1A]/20">_0152</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-black/30 text-center">
            <Link href="#" className="hover:text-black transition-colors group">
               Journal<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">.</span>
            </Link>
            <Link href="#" className="hover:text-black transition-colors group">
               Archive<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">.</span>
            </Link>
            <Link href="#" className="hover:text-black transition-colors group">
               Coordinates<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-black text-white px-10 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#1A1A1A] transition-all shadow-xl">
              Establish_Sync
           </button>
           <Menu className="w-6 h-6 text-black cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden text-center">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2500" alt="Travel" fill className="object-cover opacity-80 grayscale contrast-125 text-center" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFC] via-transparent to-[#FDFDFC]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-6xl w-full text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-black/30 mb-16 border-l-2 border-black/10 pl-10 italic font-mono text-center">
                  Visual_Record // Series_0152
               </div>
               
               <h1 className="text-7xl md:text-[12vw] font-black italic uppercase leading-[0.8] tracking-tighter mb-20 text-black drop-shadow-sm text-center">
                  <TextScramble text="EXPLORE." /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(0,0,0,0.6)" }}>UNFOLD.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-black/40 max-w-2xl mx-auto mb-24 leading-relaxed uppercase tracking-tight text-center">
                  A tectonic approach to visual storytelling. Every frame a function of its tectonic intent.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono text-center">
                  <div className="flex items-center gap-6 group cursor-pointer text-center">
                     <div className="w-20 h-px bg-black/10 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black">Read_Archive</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-black/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-black/10 italic text-center">
                     Coordinates_Sync // Established
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Visual HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-black/20 hidden md:flex italic font-mono text-center">
            <span>VISUAL_SYNC: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-black" />)}
            </div>
         </div>
         
         <div className="absolute left-12 bottom-12 hidden md:block text-center">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-black/10 italic font-mono text-center">
               <span>LAT: 78.2232 N</span>
               <span>LONG: 15.6267 E</span>
               <span>STATUS: ARCHIVING</span>
            </div>
         </div>
      </section>

      {/* STORY GRID */}
      <section className="py-40 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#FDFDFC]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-black/10 pb-20 gap-16 text-center md:text-left">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[1.5em] text-black/20 mb-8 block italic font-mono text-center md:text-left">Visual_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-black leading-[0.8] text-center md:text-left">The <br/> <span className="text-stone-300">Archive_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-black/30 italic font-mono text-center md:text-left">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {STORIES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-stone-100 border border-black/5 overflow-hidden cursor-pointer hover:border-black/20 transition-all text-center shadow-sm"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 text-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFC] via-transparent to-transparent opacity-90 text-center" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono text-black text-center">
                        <div className="flex justify-between items-start text-center">
                           <div className="p-5 bg-white/40 backdrop-blur-xl border border-black/5 rounded-none group-hover:bg-black group-hover:text-white transition-all text-center">
                              <Compass className="w-6 h-6 text-center" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-black/20 italic font-mono text-center">Unit_0x{i+152}</div>
                        </div>
                        
                        <div className="text-center">
                           <span className="text-[10px] uppercase tracking-[0.8em] text-black/40 mb-8 block italic font-black text-center">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-black group-hover:tracking-widest transition-all leading-[0.8] text-center">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-black text-center justify-center">
                              Open_Entry <ArrowRight className="w-6 h-6 text-center" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-black/5 relative z-10 bg-[#FDFDFC]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 text-center md:text-left">
            <div className="max-w-2xl text-center md:text-left">
               <div className="text-black mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono justify-center md:justify-start">
                  <MoveVertical className="w-10 h-10 text-center md:text-left" /> Wanderer_v4
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-black/10 uppercase tracking-tighter mb-20 text-center md:text-left">
                  A TECTONIC APPROACH TO VISUAL STORYTELLING. EVERY FRAME A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-black/20 italic font-mono justify-center md:justify-start">
                  <span>Arctic</span>
                  <span>Desert</span>
                  <span>Urban</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-center md:text-right text-black">
               <div className="w-full text-center md:text-right">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-black opacity-[0.02] leading-none mb-20 text-center md:text-right">WANDERER</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-black/20 text-center md:text-right">
                     <Link href="#" className="hover:text-black transition-colors group">
                        Instagram<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-black transition-colors group">
                        Journal<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-black transition-colors group">
                        Newsletter<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-black/5 mt-32 italic text-center md:text-right">
                  &copy; 2026 // WANDERER_OS&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
