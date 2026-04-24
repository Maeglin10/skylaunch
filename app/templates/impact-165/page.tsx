"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, Zap, Shield, Play, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

function TiltPhone({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-[320px] h-[650px] md:w-[380px] md:h-[780px] perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-500 rounded-[3.5rem] shadow-2xl shadow-black/50 border-[6px] border-gray-900 overflow-hidden transform-gpu" style={{ transform: "translateZ(30px)" }}>
         {/* Notch */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-50" />
         {children}
      </div>
      {/* Floating 3D elements */}
      <motion.div style={{ transform: "translateZ(80px)" }} className="absolute -right-12 top-1/4 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl">
         <Activity className="w-8 h-8 text-[#00ffcc]" />
      </motion.div>
      <motion.div style={{ transform: "translateZ(100px)" }} className="absolute -left-12 bottom-1/4 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl">
         <Zap className="w-8 h-8 text-[#ff00cc]" />
      </motion.div>
    </motion.div>
  );
}

export default function VitalitySyncSPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
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
    <div ref={containerRef} className="premium-theme bg-[#050505] text-white min-h-screen font-sans selection:bg-[#00ffcc] selection:text-black overflow-hidden relative">
      
      {/* BIOMETRIC GLOW & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#00ffcc] opacity-[0.03] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-screen" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#050505]/50 backdrop-blur-3xl border-b border-white/5">
        <Link href="/" className="font-black text-2xl tracking-[0.2em] text-white flex items-center gap-4 italic uppercase">
           VITA<span className="text-[#00ffcc]">_SYNC</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-white/30">
            <Link href="#" className="hover:text-[#00ffcc] transition-colors group">
               Features<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#00ffcc] italic">_</span>
            </Link>
            <Link href="#" className="hover:text-[#00ffcc] transition-colors group">
               Ecosystem<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#00ffcc] italic">_</span>
            </Link>
            <Link href="#" className="hover:text-[#00ffcc] transition-colors group">
               Download<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#00ffcc] italic">_</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-white text-black px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#00ffcc] transition-all">
              Join_Waitlist
           </button>
           <Menu className="w-6 h-6 text-[#00ffcc] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2500" alt="Biometric" fill className="object-cover opacity-10 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-24">
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="text-left flex-1"
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-[#00ffcc]/50 mb-16 border-l-2 border-[#00ffcc] pl-10 italic font-mono">
                  Biometric_Sync // 0165_Alpha
               </div>
               
               <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter mb-20 text-white">
                  PURE.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #00ffcc" }}>SYNC.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-white/30 max-w-xl mb-24 leading-relaxed uppercase tracking-tight">
                  Structural allocation for biometric intent. Architecting the future of human optimization with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#00ffcc]/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#00ffcc]">Explore_Ecosystem</span>
                  </div>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.8, x: 100 }}
               animate={{ opacity: 1, scale: 1, x: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="flex-1 flex justify-center"
            >
               <TiltPhone>
                  <Image src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" alt="App UI" fill className="object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                  <div className="absolute bottom-16 inset-x-12 font-mono">
                     <div className="text-[10px] uppercase tracking-widest text-[#00ffcc] mb-4 font-black italic">Sync_Active // Phase_Shift</div>
                     <div className="text-6xl font-black tracking-tighter text-white italic italic">142<span className="text-xl ml-2 text-white/30">BPM</span></div>
                     <div className="w-full h-[2px] bg-white/10 rounded-none mt-8 overflow-hidden">
                        <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="h-full bg-[#00ffcc]" />
                     </div>
                  </div>
               </TiltPhone>
            </motion.div>
         </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#050505]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-white/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#00ffcc] mb-8 block italic font-mono">Platform_Manifest</span>
               <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-none">The <span className="text-[#00ffcc]/20">Vita_OS_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic font-mono">
               <span>Nodes: [03]</span>
               <span>Status: [Active]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
               { icon: <Activity className="w-8 h-8" />, t: "Neural Sync", d: "Connects directly with your biometric rhythm to provide actionable insights." },
               { icon: <Shield className="w-8 h-8" />, t: "Zero-Knowledge", d: "Your data never leaves your device. Military-grade encryption standard." },
               { icon: <Zap className="w-8 h-8" />, t: "Kinetic UI", d: "Interface adapts fluidly to your current state of motion and focus." },
            ].map((f, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[60vh] bg-neutral-900 border border-white/5 p-16 flex flex-col justify-between hover:border-[#00ffcc]/30 transition-all shadow-2xl"
                >
                    <div className="p-8 bg-white/5 border border-white/10 w-fit rounded-none group-hover:bg-[#00ffcc] group-hover:text-black transition-all">
                       {f.icon}
                    </div>
                    
                    <div>
                       <span className="text-[10px] uppercase tracking-[0.8em] text-[#00ffcc] mb-8 block italic font-black font-mono">Node_0x{i+165}</span>
                       <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-12 text-white leading-none">{f.t}</h3>
                       <p className="text-xl text-white/20 font-light leading-relaxed max-w-xs">{f.d}</p>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#050505]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-[#00ffcc] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Vita_Sync_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-white/20 uppercase tracking-tighter mb-20">
                  WE TREAT BIOMETRICS AS ARCHITECTURE. EVERY PULSE A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#00ffcc]/40 italic font-mono">
                  <span>Berlin</span>
                  <span>SF</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-white opacity-[0.02] leading-none mb-20">VITA</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-white/10">
                     <Link href="#" className="hover:text-[#00ffcc] transition-colors group">
                        Twitter<span className="text-[#00ffcc]/0 group-hover:text-[#00ffcc] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#00ffcc] transition-colors group">
                        Discord<span className="text-[#00ffcc]/0 group-hover:text-[#00ffcc] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#00ffcc] transition-colors group">
                        Legal<span className="text-[#00ffcc]/0 group-hover:text-[#00ffcc] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-white/5 mt-32 italic">
                  &copy; 2026 // VITALITY_SYNC_OS&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
