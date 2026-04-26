"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Wind, Coffee, Menu, Search, ArrowRight, Layers, Activity, Zap } from "lucide-react";
import "../premium.css";

const ROOMS = [
  { icon: <Compass className="w-8 h-8" />, title: "PANORAMA_SUITE", cat: "Luxury", value: "Verified", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Wind className="w-8 h-8" />, title: "HERITAGE_ROOM", cat: "Classic", value: "Active", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Coffee className="w-8 h-8" />, title: "CULINARY_VUE", cat: "Dining", value: "Locked", img: "https://images.unsplash.com/photo-1542314831-c6a4d42171ae?auto=format&fit=crop&q=80&w=1500" },
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

export default function TheGrandSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-sans selection:bg-[#B5A48B] selection:text-white overflow-hidden relative uppercase">
      
      {/* HOSPITALITY GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(181,164,139,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(181,164,139,0.05)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#B5A48B] opacity-[0.05] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#FAF9F6]/50 backdrop-blur-3xl border-b border-[#B5A48B]/5">
        <Link href="/" className="font-black text-2xl tracking-[0.3em] text-[#1A1A1A] flex items-center gap-4 italic uppercase text-center md:text-left">
           THE<span className="text-[#B5A48B]">_GRAND</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-[#1A1A1A]/30 text-center">
            <Link href="#" className="hover:text-[#B5A48B] transition-colors group">
               Suites<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#B5A48B] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#B5A48B] transition-colors group">
               Spa<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#B5A48B] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#B5A48B] transition-colors group">
               History<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#B5A48B] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-[#1A1A1A] text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#B5A48B] transition-all shadow-xl">
              Reserve_Stay
           </button>
           <Menu className="w-6 h-6 text-[#B5A48B] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden text-center">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1542314831-c6a4d42171ae?auto=format&fit=crop&q=80&w=2500" alt="Hotel" fill className="object-cover opacity-20 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-[#B5A48B] mb-16 border-l-2 border-[#B5A48B] pl-10 italic font-mono text-center">
                  Hospitality_Capture // 0182_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-[#1A1A1A] text-center">
                  <TextScramble text="REFINED." /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #1A1A1A" }}>ELEGANCE.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-[#1A1A1A]/30 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest text-center">
                  Structural allocation for hospitality intent. Architecting the future of luxury with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono text-center text-[#1A1A1A]">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#B5A48B]/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em]">Explore_Suites</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-[#1A1A1A]/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-[#1A1A1A]/10 italic text-center">
                     Michelin Dining // Thermal Spa // Concierge
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Concierge HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-[#B5A48B]/20 hidden md:flex italic font-mono text-center">
            <span>CONCIERGE_SYNC: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#B5A48B]" />)}
            </div>
         </div>
         
         <div className="absolute left-12 bottom-12 hidden md:block">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-[#1A1A1A]/10 italic font-mono text-center">
               <span>AVAILABILITY: 84%</span>
               <span>TEMP: 22&deg;C</span>
               <span>STATUS: REFINED</span>
            </div>
         </div>
      </section>

      {/* ROOMS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#FAF9F6]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-[#1A1A1A]/10 pb-20 gap-16 text-center md:text-left">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#B5A48B] mb-8 block italic font-mono text-center md:text-left">Hospitality_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#1A1A1A] leading-none text-center md:text-left">The <span className="text-[#B5A48B]/20">Suites_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-[#1A1A1A]/20 italic font-mono text-center md:text-left">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {ROOMS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-white border border-[#1A1A1A]/5 overflow-hidden cursor-pointer hover:border-[#B5A48B]/30 transition-all shadow-2xl text-center"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 text-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-95 text-center" />
                    <div className="absolute inset-0 bg-[#B5A48B]/5 group-hover:bg-transparent transition-colors duration-700 text-center" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono text-[#1A1A1A] text-center">
                        <div className="flex justify-between items-start text-center">
                           <div className="p-5 bg-white/5 border border-[#1A1A1A]/10 rounded-none group-hover:bg-[#B5A48B] group-hover:text-white transition-all shadow-xl text-center">
                              {p.icon}
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#B5A48B] italic font-mono text-center">Ref_0x{i+182}</div>
                        </div>
                        
                        <div className="text-center">
                           <span className="text-[10px] uppercase tracking-[0.8em] text-[#B5A48B] mb-8 block italic font-black text-center">{p.cat} // Verified</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-[#1A1A1A] group-hover:tracking-widest transition-all leading-[0.8] text-center">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-[#1A1A1A] text-center justify-center">
                              Details <ArrowRight className="w-6 h-6 text-center" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-[#1A1A1A]/5 relative z-10 bg-[#FAF9F6]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 text-center md:text-left">
            <div className="max-w-2xl text-center md:text-left">
               <div className="text-[#B5A48B] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono justify-center md:justify-start text-center md:text-left">
                  <Activity className="w-10 h-10 text-center md:text-left" /> Grand_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-[#1A1A1A]/20 uppercase tracking-tighter mb-20 text-center md:text-left">
                  WE TREAT HOTELS AS ARCHITECTURE. EVERY STAY A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#B5A48B]/40 italic font-mono justify-center md:justify-start text-center md:text-left">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-center md:text-right text-[#1A1A1A]">
               <div className="w-full text-center md:text-right">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-[#1A1A1A] opacity-[0.02] leading-none mb-20 text-center md:text-right">GRAND</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-[#1A1A1A]/10 text-center md:text-right">
                     <Link href="#" className="hover:text-[#B5A48B] transition-colors group">
                        Instagram<span className="text-[#B5A48B]/0 group-hover:text-[#B5A48B] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#B5A48B] transition-colors group">
                        Suites<span className="text-[#B5A48B]/0 group-hover:text-[#B5A48B] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#B5A48B] transition-colors group">
                        Legal<span className="text-[#B5A48B]/0 group-hover:text-[#B5A48B] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-[#1A1A1A]/5 mt-32 italic text-center md:text-right">
                  &copy; 2026 // THE_GRAND_HOTEL_GROUP&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
