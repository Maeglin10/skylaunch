"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hexagon, Activity, Shield, Coins, Menu, Search, ArrowRight, Layers, Zap, Compass } from "lucide-react";
import "../premium.css";

const PROTOCOLS = [
  { icon: <Coins className="w-8 h-8" />, title: "LIQUID_SYNX", cat: "Aggregator", value: "Verified", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Shield className="w-8 h-8" />, title: "SECURE_VAULT", cat: "Custodian", value: "Active", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1500" },
  { icon: <Activity className="w-8 h-8" />, title: "ORACLE_FLOW", cat: "Infrastructure", value: "Locked", img: "https://images.unsplash.com/photo-1642104704074-907c0698bcd9?auto=format&fit=crop&q=80&w=1500" },
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

export default function NexusFiSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#050505] text-white min-h-screen font-sans selection:bg-[#8B5CF6] selection:text-white overflow-hidden relative uppercase">
      
      {/* PROTOCOL GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#8B5CF6] opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-screen" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#050505]/50 backdrop-blur-3xl border-b border-white/5">
        <Link href="/" className="font-black text-2xl tracking-[0.3em] text-white flex items-center gap-4 italic uppercase text-center md:text-left">
           NEXUS<span className="text-[#8B5CF6]">.FI</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-white/30 text-center">
            <Link href="#" className="hover:text-[#8B5CF6] transition-colors group">
               Protocol<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#8B5CF6] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#8B5CF6] transition-colors group">
               Ecosystem<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#8B5CF6] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#8B5CF6] transition-colors group">
               Governance<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#8B5CF6] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-white text-black px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#8B5CF6] hover:text-white transition-all shadow-[0_0_40px_rgba(139,92,246,0.3)]">
              Launch_App
           </button>
           <Menu className="w-6 h-6 text-[#8B5CF6] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden text-center">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-[#8B5CF6] mb-16 border-l-2 border-[#8B5CF6] pl-10 italic font-mono text-center">
                  Network_Capture // 0181_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-white text-center">
                  <TextScramble text="MATRIX." /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.6)" }}>LIQUIDITY.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-white/30 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest text-center">
                  Structural allocation for protocol intent. Architecting the future of finance with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono text-center">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#8B5CF6]/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white">Connect_Wallet</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-white/10 italic text-center">
                     $4.2B TVL // 124K Traders // Nexus Protocol
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Protocol HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-[#8B5CF6]/20 hidden md:flex italic font-mono text-center">
            <span>NETWORK_SYNC: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#8B5CF6]" />)}
            </div>
         </div>
         
         <div className="absolute left-12 bottom-12 hidden md:block">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-white/10 italic font-mono text-center">
               <span>GAS: 12 GWEI</span>
               <span>BLOCK: 18.4M</span>
               <span>STATUS: SYNCED</span>
            </div>
         </div>
      </section>

      {/* PROTOCOL GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#050505]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-white/10 pb-20 gap-16 text-center md:text-left">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#8B5CF6] mb-8 block italic font-mono text-center md:text-left">Protocol_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-white leading-none text-center md:text-left">The <span className="text-[#8B5CF6]/20">Ecosystem_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic font-mono text-center md:text-left">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {PROTOCOLS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-white/5 border border-white/5 overflow-hidden cursor-pointer hover:border-[#8B5CF6]/30 transition-all shadow-2xl text-center"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 text-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-95 text-center" />
                    <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-700 text-center" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono text-white text-center">
                        <div className="flex justify-between items-start text-center">
                           <div className="p-5 bg-white/5 border border-white/10 rounded-none group-hover:bg-[#8B5CF6] group-hover:text-white transition-all shadow-xl text-center">
                              {p.icon}
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#8B5CF6] italic font-mono text-center">Ref_0x{i+181}</div>
                        </div>
                        
                        <div className="text-center">
                           <span className="text-[10px] uppercase tracking-[0.8em] text-[#8B5CF6] mb-8 block italic font-black text-center">{p.cat} // Verified</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-white group-hover:tracking-widest transition-all leading-[0.8] text-center">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-white text-center justify-center">
                              Details <ArrowRight className="w-6 h-6 text-center" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#050505]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 text-center md:text-left">
            <div className="max-w-2xl text-center md:text-left">
               <div className="text-[#8B5CF6] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono justify-center md:justify-start text-center md:text-left">
                  <Activity className="w-10 h-10 text-center md:text-left" /> Nexus_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-white/20 uppercase tracking-tighter mb-20 text-center md:text-left">
                  WE TREAT PROTOCOLS AS ARCHITECTURE. EVERY BYTE A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#8B5CF6]/40 italic font-mono justify-center md:justify-start text-center md:text-left">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-center md:text-right">
               <div className="w-full text-center md:text-right">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-white opacity-[0.02] leading-none mb-20 text-center md:text-right">NEXUS</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-white/10 text-center md:text-right">
                     <Link href="#" className="hover:text-[#8B5CF6] transition-colors group">
                        Instagram<span className="text-[#8B5CF6]/0 group-hover:text-[#8B5CF6] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#8B5CF6] transition-colors group">
                        Ecosystem<span className="text-[#8B5CF6]/0 group-hover:text-[#8B5CF6] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#8B5CF6] transition-colors group">
                        Legal<span className="text-[#8B5CF6]/0 group-hover:text-[#8B5CF6] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-white/5 mt-32 italic text-center md:text-right">
                  &copy; 2026 // NEXUS_FINANCE_GROUP&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
