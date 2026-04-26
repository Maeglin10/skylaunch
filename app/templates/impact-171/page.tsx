"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartPulse, Brain, Baby, Activity, Shield, Calendar, Phone, Menu, Search, ArrowRight, Layers, Compass, Zap } from "lucide-react";
import "../premium.css";

const SERVICES = [
  { icon: <HeartPulse className="w-8 h-8" />, title: "CARDIOLOGY_SYNC", cat: "Cardiac", value: "Verified", img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Brain className="w-8 h-8" />, title: "NEURAL_LINK", cat: "Neurology", value: "Active", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Activity className="w-8 h-8" />, title: "KINETIC_CARE", cat: "Orthopedics", value: "Locked", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1500" },
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

export default function NovaMedicalSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#050B09] text-[#E5E5E5] min-h-screen font-sans selection:bg-[#059669] selection:text-white overflow-x-hidden relative uppercase">
      
      {/* MEDICAL GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(5,150,105,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(5,150,105,0.05)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#059669] opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-screen" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#050B09]/50 backdrop-blur-3xl border-b border-white/5">
        <Link href="/" className="font-black text-2xl tracking-[0.3em] text-white flex items-center gap-4 italic uppercase">
           NOVA<span className="text-[#059669]">_MEDICAL</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-white/30">
            <Link href="#" className="hover:text-[#059669] transition-colors group">
               Specialties<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#059669] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#059669] transition-colors group">
               Portal<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#059669] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#059669] transition-colors group">
               Research<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#059669] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-white text-black px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#059669] hover:text-white transition-all shadow-[0_0_40px_rgba(5,150,105,0.2)]">
              Book_Consultation
           </button>
           <Menu className="w-6 h-6 text-[#059669] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2500" alt="Medical" fill className="object-cover opacity-20 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B09] via-transparent to-[#050B09]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-[#059669] mb-16 border-l-2 border-[#059669] pl-10 italic font-mono">
                  Medical_Sync // 0171_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-white">
                  <TextScramble text="PURE." /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #FFF" }}>CARE.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-white/40 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest">
                  Structural allocation for clinical intent. Architecting the future of health with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#059669]/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#059669]">Explore_Specialties</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-white/10 italic">
                     Global // Health // Standards
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Biological Scan HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-[#059669]/20 hidden md:flex italic font-mono">
            <span>BIO_SYNC: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#059669]" />)}
            </div>
         </div>
         
         <div className="absolute left-12 bottom-12 hidden md:block">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-white/10 italic font-mono">
               <span>PULSE: 72 BPM</span>
               <span>O2: 99%</span>
               <span>TEMP: 36.6°C</span>
            </div>
         </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#050B09]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-white/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#059669] mb-8 block italic font-mono">Clinical_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-white leading-none text-center md:text-left">The <span className="text-[#059669]/20">Centers_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic font-mono">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {SERVICES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-white/5 border border-white/5 overflow-hidden cursor-pointer hover:border-[#059669]/30 transition-all shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B09] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-[#059669]/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono text-white">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-none group-hover:bg-[#059669] group-hover:text-white transition-all shadow-xl">
                              {p.icon}
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#059669] italic font-mono">Ref_0x{i+171}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-[#059669] mb-8 block italic font-black">{p.cat} // Verified</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-white group-hover:tracking-widest transition-all leading-[0.8]">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-white">
                              Learn_More <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#050B09]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-[#059669] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono justify-center md:justify-start">
                  <Activity className="w-10 h-10" /> Nova_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-white/20 uppercase tracking-tighter mb-20 text-center md:text-left">
                  WE TREAT CARE AS ARCHITECTURE. EVERY CLINIC A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#059669]/40 italic font-mono justify-center md:justify-start">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-white opacity-[0.02] leading-none mb-20">NOVA</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-white/10">
                     <Link href="#" className="hover:text-[#059669] transition-colors group">
                        Portal<span className="text-[#059669]/0 group-hover:text-[#059669] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#059669] transition-colors group">
                        Directory<span className="text-[#059669]/0 group-hover:text-[#059669] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#059669] transition-colors group">
                        Legal<span className="text-[#059669]/0 group-hover:text-[#059669] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-white/5 mt-32 italic text-center md:text-right">
                  &copy; 2026 // NOVA_MEDICAL_INSTITUTE&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
