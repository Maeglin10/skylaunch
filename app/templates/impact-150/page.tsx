"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cpu, Zap, Shield, Terminal, Activity, Menu, Search, ArrowRight } from "lucide-react";
import "../premium.css";

const GEAR = [
  { id: 1, title: "X-9_SHELL", cat: "Chassis", value: "Verified", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "NEURAL_SYNC", cat: "Interface", value: "Active", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "VOID_MESH", cat: "Fabric", value: "Locked", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1500" },
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

export default function NeonUnitCyberSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#050505] text-[#00FFCC] min-h-screen font-mono selection:bg-[#00FFCC] selection:text-black overflow-hidden relative uppercase">
      
      {/* HUD LAYERS & GLOW */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#00FFCC] opacity-[0.03] blur-[150px] rounded-full mix-blend-screen" 
        />
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,204,0.06),rgba(0,255,0,0.02),rgba(0,255,204,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-50 opacity-20" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 bg-[#050505]/50 backdrop-blur-xl border-b border-[#00FFCC]/20">
        <Link href="/" className="font-black text-2xl tracking-[0.2em] text-[#00FFCC] flex items-center gap-3 italic uppercase text-center md:text-left">
           <Terminal className="w-8 h-8 animate-pulse text-center md:text-left" />
           NEON_UNIT<span className="text-white">_v4</span>
        </Link>
        
        <nav className="hidden lg:flex gap-12 font-black text-[10px] uppercase tracking-[0.4em] text-[#00FFCC]/40 text-center">
            <Link href="#" className="hover:text-[#00FFCC] transition-colors group">
               System<span className="inline-block w-0 group-hover:w-2 transition-all overflow-hidden text-white">_</span>
            </Link>
            <Link href="#" className="hover:text-[#00FFCC] transition-colors group">
               Archive<span className="inline-block w-0 group-hover:w-2 transition-all overflow-hidden text-white">_</span>
            </Link>
            <Link href="#" className="hover:text-[#00FFCC] transition-colors group">
               Network<span className="inline-block w-0 group-hover:w-2 transition-all overflow-hidden text-white">_</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-6">
           <button className="bg-[#00FFCC] text-black px-8 py-3 font-black text-[10px] uppercase tracking-[0.2em] skew-x-[-15deg] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,204,0.4)]">
              <span className="block skew-x-[15deg]">Initialize</span>
           </button>
           <Menu className="w-6 h-6 text-[#00FFCC] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden text-center">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2500" alt="Tech" fill className="object-cover opacity-20 grayscale contrast-150 text-center" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
         </motion.div>
         
         <div className="relative z-10 max-w-6xl w-full text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="font-black text-[10px] uppercase tracking-[0.6em] text-[#00FFCC]/60 mb-8 border-l-2 border-[#00FFCC] pl-6 italic text-center">
                  Neural_Link Protocol // Active
               </div>
               
               <h1 className="text-7xl md:text-[12vw] font-black italic uppercase leading-[0.8] tracking-tighter mb-12 text-white text-center">
                  <TextScramble text="CORE." /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #00FFCC" }}>SIMULATION.</span>
               </h1>
               
               <p className="text-lg md:text-xl font-medium text-[#00FFCC]/40 max-w-2xl mx-auto mb-16 leading-relaxed uppercase tracking-[0.2em] italic text-center">
                  Hyper-integrated tectonic hardware designed for the next generation of neural architecture. Precision redefined.
               </p>
               
               <div className="flex flex-col md:flex-row gap-6 justify-center items-center font-mono text-center">
                  <button className="border border-[#00FFCC] text-[#00FFCC] px-12 py-5 font-black text-[10px] uppercase tracking-[0.4em] skew-x-[-15deg] hover:bg-[#00FFCC] hover:text-black transition-all group">
                     <span className="block skew-x-[15deg] flex items-center gap-3">
                        Enter_Void <Zap className="w-4 h-4 fill-current text-center" />
                     </span>
                  </button>
                  <div className="font-black text-[8px] uppercase tracking-[0.4em] opacity-20 text-center">
                     Ref_Code: 0x150_Alpha
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Neural HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-[#00FFCC]/20 hidden md:flex italic font-mono text-center">
            <span>NEURAL_SYNC: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#00FFCC]" />)}
            </div>
         </div>
         
         <div className="absolute left-12 bottom-12 hidden md:block text-center">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-[#00FFCC]/10 italic font-mono text-center">
               <span>NODES: 4096</span>
               <span>LATENCY: 0.1MS</span>
               <span>STATUS: OVERCLOCKED</span>
            </div>
         </div>
      </section>

      {/* GEAR GRID */}
      <section className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#050505]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[#00FFCC]/10 pb-12 gap-8 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white text-center md:text-left">Hardware<span className="text-[#00FFCC]">_Manifest</span></h2>
            <div className="font-black text-[10px] uppercase tracking-[0.4em] text-[#00FFCC]/30 italic font-mono text-center md:text-left">03 Active Modules</div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {GEAR.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[70vh] bg-neutral-900 border border-[#00FFCC]/10 overflow-hidden cursor-pointer hover:border-[#00FFCC]/40 transition-all text-center"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 text-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-95 text-center" />
                    
                    <div className="absolute inset-10 flex flex-col justify-between z-10 font-mono text-white text-center">
                        <div className="flex justify-between items-start text-center">
                           <div className="w-12 h-12 bg-[#00FFCC]/10 border border-[#00FFCC]/20 flex items-center justify-center group-hover:bg-[#00FFCC] group-hover:text-black transition-all text-center">
                              <Cpu className="w-5 h-5 text-center" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-30 italic font-mono text-center">Module_0{i+1}</div>
                        </div>
                        
                        <div className="text-center">
                           <span className="text-[10px] uppercase tracking-[0.4em] text-[#00FFCC] mb-4 block italic font-black text-center">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-8 group-hover:text-[#00FFCC] transition-colors text-center">{p.title}</h3>
                           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 text-white text-center justify-center">
                              View Specs <ArrowRight className="w-4 h-4 text-center" />
                           </div>
                        </div>
                    </div>

                    <motion.div 
                       animate={{ top: ['-100%', '200%'] }} 
                       transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                       className="absolute left-0 w-full h-[1px] bg-[#00FFCC] opacity-20 pointer-events-none text-center" 
                    />
                </motion.div>
            ))}
         </div>
      </section>

      {/* TERMINAL FOOTER */}
      <footer className="py-24 px-6 md:px-12 border-t border-[#00FFCC]/10 relative z-10 bg-[#050505]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 text-center md:text-left">
            <div className="text-center md:text-left">
               <div className="text-[#00FFCC] mb-8 flex items-center gap-3 font-black text-xl italic uppercase tracking-widest font-mono justify-center md:justify-start">
                  <Activity className="w-6 h-6 text-center md:text-left" /> System_Logs
               </div>
               <div className="space-y-4 font-black text-[10px] uppercase tracking-widest text-[#00FFCC]/30 font-mono text-center md:text-left">
                  <p>{`> Initializing handshake... [OK]`}</p>
                  <p>{`> Loading neural_net v4.0.150... [OK]`}</p>
                  <p>{`> Verifying biometric_key... [VERIFIED]`}</p>
                  <p className="text-[#00FFCC]">{`> Status: System online. Welcome back, Agent.`}</p>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-center md:text-right text-[#00FFCC]">
               <div className="w-full text-center md:text-right">
                  <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4 text-center md:text-right">Onix_Network</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FFCC]/20 leading-relaxed italic text-center md:text-right">
                     Global Architecture <br /> for Decentralized Realities
                  </p>
               </div>
               <div className="font-black text-[8px] uppercase tracking-[1em] text-[#00FFCC]/10 mt-12 text-center md:text-right">
                  &copy; 2026 // NEON_UNIT&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
