"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, Zap, Shield, Play } from "lucide-react";
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

export default function UltimateAppPromo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const phoneY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0.8, 1, 1.1, 0.9]);
  const opacityText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-white min-h-[300vh] font-sans selection:bg-[#00ffcc] selection:text-black overflow-x-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-30">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00ffcc] blur-[150px] rounded-full mix-blend-screen opacity-20" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#ff00cc] blur-[150px] rounded-full mix-blend-screen opacity-20" />
         </motion.div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-screen" />
      </div>

      {/* Global Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference">
         <div className="text-2xl font-black tracking-tighter">VITA.</div>
         <div className="flex gap-8 items-center text-[10px] uppercase tracking-[0.3em] font-bold">
            <Link href="#" className="hidden md:block hover:text-[#00ffcc] transition-colors">Features</Link>
            <Link href="#" className="hidden md:block hover:text-[#00ffcc] transition-colors">Ecosystem</Link>
            <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-[#00ffcc] transition-colors">Download</button>
         </div>
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen relative flex flex-col items-center justify-center pt-24 px-6 z-10 sticky top-0">
         <motion.div style={{ opacity: opacityText }} className="text-center mb-12 relative z-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
               <h1 className="text-7xl md:text-[10vw] font-black tracking-tighter leading-[0.85] mb-6">
                  VITALITY <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#ff00cc]">SYNC.</span>
               </h1>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto font-light tracking-tight">
               Your biometric reality, visualized in real-time. We don't just track data, we synthesize your existence.
            </motion.p>
         </motion.div>

         {/* 3D Phone Container */}
         <motion.div style={{ y: phoneY, scale: phoneScale }} className="relative z-30">
            <TiltPhone>
               <Image src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" alt="App UI" fill className="object-cover opacity-90" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
               <div className="absolute bottom-12 inset-x-8">
                  <div className="text-[10px] uppercase tracking-widest text-[#00ffcc] mb-2 font-bold">Sync Active</div>
                  <div className="text-4xl font-black tracking-tighter">142 BPM</div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-4 overflow-hidden">
                     <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="h-full bg-gradient-to-r from-[#00ffcc] to-[#ff00cc]" />
                  </div>
               </div>
            </TiltPhone>
         </motion.div>
      </section>

      {/* FEATURES SECTION (Scroll Reveal) */}
      <section className="relative z-20 bg-[#050505] min-h-screen py-32 px-6 border-t border-white/10">
         <div className="max-w-7xl mx-auto">
            <div className="mb-32">
               <span className="text-[#ff00cc] text-sm font-bold uppercase tracking-widest mb-4 block">The Architecture</span>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Engineered for <br/> Human Optimization.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                  { icon: <Activity />, t: "Neural Sync", d: "Connects directly with your biometric rhythm to provide actionable insights." },
                  { icon: <Shield />, t: "Zero-Knowledge", d: "Your data never leaves your device. Military-grade encryption standard." },
                  { icon: <Zap />, t: "Kinetic UI", d: "Interface adapts fluidly to your current state of motion and focus." },
               ].map((f, i) => (
                  <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 50 }} 
                     whileInView={{ opacity: 1, y: 0 }} 
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.8, delay: i * 0.2 }}
                     className="group"
                  >
                     <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                        {f.icon}
                     </div>
                     <h3 className="text-2xl font-bold tracking-tight mb-4">{f.t}</h3>
                     <p className="text-white/40 leading-relaxed">{f.d}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* INTERACTIVE VIDEO MODAL SIMULATION */}
      <section className="relative z-20 py-32 px-6">
         <div className="max-w-7xl mx-auto relative aspect-video bg-white/5 rounded-[3rem] overflow-hidden border border-white/10 group cursor-pointer">
            <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000" alt="Video Cover" fill className="object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-8 h-8 fill-white ml-2" />
               </div>
            </div>
            <div className="absolute bottom-12 left-12">
               <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#00ffcc] mb-2">Watch Film</div>
               <div className="text-3xl font-black tracking-tighter">The Vita Philosophy</div>
            </div>
         </div>
      </section>

   </div>
  );
}
