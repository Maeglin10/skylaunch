"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Wind, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const SYSTEMS = [
  { id: 1, title: "SOLAR_GRID", cat: "Renewable", value: "Verified", img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "VERTICAL_BIOME", cat: "Ecological", value: "Active", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "LOOP_RECLAIM", cat: "Circular", value: "Locked", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1500" },
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

export default function BioFormSustainableSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#F2F4F1] text-[#2D3A2D] min-h-screen font-sans selection:bg-[#2D3A2D] selection:text-white overflow-hidden relative uppercase text-center">
      
      {/* ECO GLOW & TEXTURE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#F2F4F1_100%)] opacity-80" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-emerald-600 opacity-[0.03] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#F2F4F1]/30 backdrop-blur-3xl border-b border-[#2D3A2D]/10">
        <Link href="/" className="font-black text-2xl tracking-[0.2em] text-[#2D3A2D] flex items-center gap-4 italic uppercase text-center md:text-left">
           BIO<span className="text-emerald-700">_FORM</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-[#2D3A2D]/40 text-center">
            <Link href="#" className="hover:text-[#2D3A2D] transition-colors group">
               Ecology<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-emerald-700 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#2D3A2D] transition-colors group">
               Systems<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-emerald-700 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#2D3A2D] transition-colors group">
               Archives<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-emerald-700 italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-[#2D3A2D] text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#1A1A1A] transition-all shadow-xl">
              Initiate_Sync
           </button>
           <Menu className="w-6 h-6 text-[#2D3A2D] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden text-center">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2500" alt="Ecology" fill className="object-cover opacity-60 grayscale contrast-125 text-center" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F2F4F1] via-transparent to-[#F2F4F1]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-[#2D3A2D]/40 mb-16 border-l-2 border-[#2D3A2D]/10 pl-10 italic font-mono text-center">
                  Ecological_Capture // 0156_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[13vw] font-black italic uppercase leading-[0.8] tracking-tighter mb-24 text-[#2D3A2D] text-center">
                  <TextScramble text="DYNAMIC." /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(45,58,45,0.6)" }}>BIOMES.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-[#2D3A2D]/40 max-w-2xl mx-auto mb-28 leading-relaxed uppercase tracking-tight text-center">
                  Structural allocation for sustainable futures. Architecting biomes with tectonic precision and ecological intent.
               </p>
               
               <div className="flex flex-col md:flex-row gap-20 justify-center items-center font-mono text-center">
                  <div className="flex items-center gap-8 group cursor-pointer text-center">
                     <div className="w-20 h-px bg-[#2D3A2D]/10 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#2D3A2D]">Read_Manifesto</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-black/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-black/10 italic text-center">
                     Ecology_Sync // Established
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Eco HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[0.8em] text-[#2D3A2D]/20 hidden md:flex italic font-mono text-center">
            <span>ECO_SYNC: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#2D3A2D]" />)}
            </div>
         </div>
         
         <div className="absolute left-12 bottom-12 hidden md:block text-center">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-[#2D3A2D]/10 italic font-mono text-center">
               <span>O2_LEVELS: OPTIMAL</span>
               <span>CO2_SYNC: VERIFIED</span>
               <span>STATUS: REGENERATING</span>
            </div>
         </div>
      </section>

      {/* SYSTEMS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#F2F4F1]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-[#2D3A2D]/10 pb-20 gap-16 text-center md:text-left">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[1.5em] text-[#2D3A2D]/20 mb-8 block italic font-mono text-center md:text-left">Visual_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#2D3A2D] leading-[0.8] text-center md:text-left">The <br/> <span className="text-emerald-800/20">Bio_Form_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-[#2D3A2D]/30 italic font-mono text-center md:text-left">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {SYSTEMS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-stone-100 border border-black/5 overflow-hidden cursor-pointer hover:border-[#2D3A2D]/20 transition-all text-center shadow-sm"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 text-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F2F4F1] via-transparent to-transparent opacity-90 text-center" />
                    <div className="absolute inset-0 bg-[#2D3A2D]/5 group-hover:bg-transparent transition-colors duration-700 text-center" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono text-[#2D3A2D] text-center">
                        <div className="flex justify-between items-start text-center">
                           <div className="p-5 bg-white/40 backdrop-blur-xl border border-black/5 rounded-none group-hover:bg-[#2D3A2D] group-hover:text-white transition-all shadow-sm text-center">
                              <Leaf className="w-6 h-6 text-center" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#2D3A2D]/20 italic font-mono text-center">Unit_0x{i+156}</div>
                        </div>
                        
                        <div className="text-center">
                           <span className="text-[10px] uppercase tracking-[0.8em] text-emerald-800 mb-8 block italic font-black text-center">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-[#2D3A2D] group-hover:tracking-widest transition-all leading-[0.8] text-center">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-[#2D3A2D] text-center justify-center">
                              Open_Module <ArrowRight className="w-6 h-6 text-center" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-black/5 relative z-10 bg-[#F2F4F1]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 text-center md:text-left">
            <div className="text-center md:text-left">
               <div className="text-[#2D3A2D] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono justify-center md:justify-start">
                  <Wind className="w-10 h-10 text-emerald-700 text-center md:text-left" /> Bio_Form_v4
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-[#2D3A2D]/20 uppercase tracking-tighter mb-20 text-center md:text-left">
                  WE TREAT ECOLOGY AS ARCHITECTURE. EVERY BIOME A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#2D3A2D]/30 italic font-mono justify-center md:justify-start">
                  <span>Oslo</span>
                  <span>Vancouver</span>
                  <span>Kyoto</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-center md:text-right text-[#2D3A2D]">
               <div className="w-full text-center md:text-right">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-[#2D3A2D] opacity-[0.02] leading-none mb-20 text-center md:text-right">BIOFORM</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-[#2D3A2D]/20 text-center md:text-right">
                     <Link href="#" className="hover:text-[#2D3A2D] transition-colors group">Instagram</Link>
                     <Link href="#" className="hover:text-[#2D3A2D] transition-colors group">Lab_Notes</Link>
                     <Link href="#" className="hover:text-[#2D3A2D] transition-colors group">Ecology</Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-black/5 mt-32 italic text-center md:text-right">
                  &copy; 2026 // BIO_FORM&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
