"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PenTool, Layout, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const SERVICES = [
  { id: 1, title: "BRAND_IDENTITY", cat: "Visual", value: "Verified", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "WEB_ARCHITECTURE", cat: "Core", value: "Active", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "DIGITAL_CRAFT", cat: "Experience", value: "Locked", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1500" },
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

export default function ObliqStudioSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#0D0D0D] text-rose-400 min-h-screen font-sans selection:bg-rose-600 selection:text-white overflow-hidden relative uppercase">
      
      {/* ROSE GLOW & TEXTURE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0D0D0D_100%)] opacity-90" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-rose-600 opacity-[0.03] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#0D0D0D]/50 backdrop-blur-2xl border-b border-rose-500/10">
        <Link href="/" className="font-black text-2xl tracking-[0.3em] text-white flex items-center gap-4 italic uppercase text-center md:text-left">
           OBLIQ<span className="text-rose-500">_STUDIO</span>
        </Link>
        
        <nav className="hidden lg:flex gap-12 font-black text-[10px] uppercase tracking-[0.6em] text-white/30 text-center">
            <Link href="#" className="hover:text-rose-400 transition-colors group">
               Craft<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-rose-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-rose-400 transition-colors group">
               Visuals<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-rose-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-rose-400 transition-colors group">
               Archives<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-rose-500 italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-8">
           <button className="bg-rose-600 text-white px-10 py-3 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-xl">
              Start_Project
           </button>
           <Menu className="w-6 h-6 text-rose-500 cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden text-center">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2500" alt="Design" fill className="object-cover opacity-20 grayscale contrast-150 text-center" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
         </motion.div>
         
         <div className="relative z-10 max-w-6xl w-full text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-rose-500/50 mb-16 border-l-2 border-rose-600 pl-10 italic font-mono text-center">
                  Studio_Sync // 0154_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[12vw] font-black italic uppercase leading-[0.8] tracking-tighter mb-20 text-white text-center">
                  <TextScramble text="VISUAL." /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(244,63,94,0.6)" }}>RESONANCE.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light text-white/30 max-w-2xl mx-auto mb-24 leading-relaxed uppercase tracking-[0.2em] italic text-center">
                  Architectural intent meets visual precision. We don't just design; we synthesize digital experiences.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono text-center">
                  <div className="flex items-center gap-8 group cursor-pointer text-center">
                     <div className="w-20 h-px bg-rose-600/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-rose-500">Read_Manifesto</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-white/10 italic text-center">
                     Established_2026 // NYC
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Resonance HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-rose-500/20 hidden md:flex italic font-mono text-center">
            <span>RESONANCE_SYNC: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-rose-500" />)}
            </div>
         </div>
         
         <div className="absolute left-12 bottom-12 hidden md:block text-center">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-white/10 italic font-mono text-center">
               <span>NODES: 1024</span>
               <span>STATE: RESONATING</span>
               <span>STATUS: HARMONIZED</span>
            </div>
         </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#0D0D0D]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-rose-500/10 pb-20 gap-16 text-center md:text-left">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[1.5em] text-rose-600 mb-8 block italic font-mono text-center md:text-left">Studio_Manifest</span>
               <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-none text-center md:text-left">The <span className="text-rose-500">Obliq_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic font-mono text-center md:text-left">
               <span>Capacity: 100%</span>
               <span>Records: 03</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 text-center">
            {SERVICES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer hover:border-rose-500/40 transition-all text-center shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 text-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-95 text-center" />
                    <div className="absolute inset-0 bg-rose-600/5 group-hover:bg-transparent transition-colors duration-700 text-center" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-sans text-white text-center">
                        <div className="flex justify-between items-start text-center">
                           <div className="p-5 bg-white/5 border border-white/10 rounded-none group-hover:bg-rose-600 group-hover:text-black transition-all text-center">
                              <Layers className="w-6 h-6 text-center" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-rose-500/30 italic font-mono text-center">Ref_0x{i+154}</div>
                        </div>
                        
                        <div className="text-center">
                           <span className="text-[10px] uppercase tracking-[0.8em] text-rose-500 mb-8 block italic font-black font-mono text-center">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-white group-hover:text-rose-500 transition-colors leading-[0.85] text-center">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-8 group-hover:translate-y-0 text-white text-center justify-center">
                              Specifications <ArrowRight className="w-6 h-6 text-center" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#0D0D0D]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40 text-center md:text-left">
            <div className="text-center md:text-left">
               <div className="text-rose-500 mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono justify-center md:justify-start">
                  <Activity className="w-10 h-10 text-center md:text-left" /> Studio_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-tight text-white/20 uppercase tracking-tighter mb-20 text-center md:text-left">
                  WE TREAT ARCHITECTURE AS CODE. EVERY STRUCTURE IS A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-rose-500/40 italic font-mono justify-center md:justify-start">
                  <span>New York</span>
                  <span>Paris</span>
                  <span>London</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-center md:text-right text-rose-500">
               <div className="w-full text-center md:text-right">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-white opacity-[0.02] leading-none mb-20 text-center md:text-right">OBLIQ</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-white/10 font-mono text-center md:text-right">
                     <Link href="#" className="hover:text-rose-400 transition-colors group">Instagram</Link>
                     <Link href="#" className="hover:text-rose-400 transition-colors group">Behance</Link>
                     <Link href="#" className="hover:text-rose-400 transition-colors group">Manifesto</Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-white/5 mt-32 italic text-center md:text-right">
                  &copy; 2026 // OBLIQ_STUDIO&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
