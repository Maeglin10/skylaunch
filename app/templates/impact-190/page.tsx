"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gamepad2, ArrowRight, Play, Terminal } from "lucide-react";
import "../premium.css";

const GAMES = [
  { title: "Neon Shift", cat: "Action RPG", desc: "Open-world cybernetic rebellion in a dystopian megalopolis.", year: "2026" },
  { title: "Void Walker", cat: "Survival Horror", desc: "Zero-gravity psychological terror aboard a derelict station.", year: "2025" },
  { title: "Aether Strike", cat: "Tactical FPS", desc: "Class-based competitive shooter with hyper-fluid movement.", year: "2024" }
];

export default function PremiumGamingStudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-[#F3F4F6] min-h-screen font-sans selection:bg-[#FF003C] selection:text-white overflow-hidden relative">
      
      {/* CYBERPUNK GRID & GLOW */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <motion.div style={{ y: yBg }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,60,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,60,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_110%)]" />
         </motion.div>
         {/* Mouse reactive glow */}
         <motion.div 
            style={{ x: springX, y: springY }}
            className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-[#FF003C] rounded-full mix-blend-screen filter blur-[150px] opacity-20" 
         />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 bg-[#050505]/50 backdrop-blur-xl border-b border-[#FF003C]/20">
        <Link href="/" className="font-black text-2xl tracking-[0.2em] text-white flex items-center gap-2">
           <Gamepad2 className="w-8 h-8 text-[#FF003C]" />
           NEXUS<span className="text-[#FF003C] animate-pulse">_</span>
        </Link>
        
        <nav className="hidden md:flex gap-12 font-black text-[10px] uppercase tracking-[0.3em] text-white/50">
            <Link href="#" className="hover:text-[#FF003C] transition-colors">Games</Link>
            <Link href="#" className="hover:text-[#FF003C] transition-colors">Studio</Link>
            <Link href="#" className="hover:text-[#FF003C] transition-colors">Careers</Link>
        </nav>
        
        <button className="bg-[#FF003C] text-black px-8 py-3 font-black text-[10px] uppercase tracking-[0.2em] skew-x-[-15deg] hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,0,60,0.4)]">
            <span className="block skew-x-[15deg] flex items-center gap-2"><Play className="w-3 h-3" /> Play Now</span>
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 z-10 pt-20">
         <motion.div style={{ scale: scaleHero }} className="absolute inset-4 md:inset-8 z-0 rounded-[2rem] overflow-hidden border border-[#FF003C]/20 shadow-[0_0_50px_rgba(255,0,60,0.1)]">
            <Image src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2500" alt="Cyberpunk City" fill className="object-cover opacity-40 mix-blend-luminosity grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
            
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
         </motion.div>
         
         <div className="relative z-10 max-w-4xl px-4 md:px-8">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-px bg-[#FF003C]" />
                   <div className="font-sans font-black text-[10px] uppercase tracking-[0.4em] text-[#FF003C] flex items-center gap-2">
                      <Terminal className="w-3 h-3" /> Protocol Initiated
                   </div>
               </div>
               
               <h1 className="text-7xl md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter mb-8 drop-shadow-2xl">
                   Enter The<br/>
                   <span className="text-transparent" style={{ WebkitTextStroke: "1px #FFF" }}>
                       Simulation.
                   </span>
               </h1>
               
               <p className="text-lg md:text-xl font-medium text-white/50 max-w-xl mb-12 leading-relaxed uppercase tracking-widest text-[10px] border-l border-[#FF003C]/50 pl-6">
                   AAA studio developing hyper-realistic immersive experiences for the next generation of hardware.
               </p>
               
               <div className="flex gap-6">
                   <button className="border border-[#FF003C] bg-[#FF003C]/10 backdrop-blur-md text-[#FF003C] px-12 py-5 font-black text-[10px] uppercase tracking-[0.3em] skew-x-[-15deg] hover:bg-[#FF003C] hover:text-black transition-all group shadow-[0_0_30px_rgba(255,0,60,0.2)] hover:shadow-[0_0_50px_rgba(255,0,60,0.5)]">
                       <span className="block skew-x-[15deg] flex items-center gap-3">
                          Watch Trailer <Play className="w-4 h-4 fill-current" />
                       </span>
                   </button>
               </div>
            </motion.div>
         </div>
         
         {/* Decorative Side Elements */}
         <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 font-sans font-black text-[8px] uppercase tracking-[0.5em] text-[#FF003C]/30 [writing-mode:vertical-lr] rotate-180 hidden lg:flex">
            <span>SYS.VER_4.0</span>
            <span className="w-px h-24 bg-[#FF003C]/30 mx-auto" />
            <span>ONLINE</span>
         </div>
      </section>

      {/* GAMES GRID */}
      <section className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10">
         <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Current <span className="text-[#FF003C]">Projects</span></h2>
            <div className="font-sans font-black text-[10px] uppercase tracking-[0.4em] text-white/30 hidden md:block">03 Active Titles</div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GAMES.map((game, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.6, delay: i * 0.1 }}
                   className="group relative bg-white/5 border border-white/10 p-8 md:p-12 overflow-hidden hover:border-[#FF003C]/50 transition-colors cursor-pointer min-h-[400px] flex flex-col justify-end"
                >
                    {/* Hover Glow & Glitch */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF003C] to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl" />
                    
                    <div className="absolute inset-0 bg-[#FF003C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                           <div className="font-sans font-black text-[10px] uppercase tracking-[0.3em] text-[#FF003C] bg-[#FF003C]/10 px-3 py-1 rounded-sm border border-[#FF003C]/20">{game.cat}</div>
                           <div className="font-sans font-black text-[10px] uppercase tracking-[0.3em] text-white/30">{game.year}</div>
                        </div>
                        
                        <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6 group-hover:text-[#FF003C] transition-colors">{game.title}</h3>
                        
                        <p className="text-sm font-medium text-white/50 uppercase tracking-widest mb-12 leading-relaxed">{game.desc}</p>
                        
                        <div className="flex items-center gap-4 font-sans font-black text-[10px] uppercase tracking-[0.3em] text-white/70 group-hover:text-white transition-colors">
                           Explore World <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                        
                        {/* Decorative line */}
                        <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#FF003C] group-hover:w-full transition-all duration-500 ease-out" />
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

    </div>
  );
}
