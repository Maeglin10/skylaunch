"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ticket, CalendarDays, MapPin } from "lucide-react";
import "../premium.css";

const SPEAKERS = [
  { name: "Elena Rostova", role: "Design Lead, Vercel", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
  { name: "Marcus Chen", role: "Founder, Frame", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
  { name: "Sophia Martinez", role: "Creative Dir, Studio", img: "https://images.unsplash.com/photo-1531123897727-8f129e1eb1df?auto=format&fit=crop&q=80&w=800" },
  { name: "David Kim", role: "Principal Engineer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" }
];

export default function PremiumEvent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotateGrid = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
    <div ref={containerRef} className="premium-theme bg-[#0F0F0F] text-[#FFFFFF] min-h-screen font-sans selection:bg-[#FF2E93] selection:text-white overflow-hidden">
      
      {/* 3D NEON GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center perspective-[1000px]">
         <motion.div 
            style={{ rotateX: 60, rotateZ: rotateGrid, y: yBg }}
            className="w-[200vw] h-[200vw] absolute top-1/4"
         >
            <div className="w-full h-full bg-[linear-gradient(rgba(255,46,147,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.2)_1px,transparent_1px)] bg-[size:100px_100px] shadow-[0_0_100px_rgba(255,46,147,0.5)_inset]" />
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
         <div className="font-black text-2xl tracking-tighter uppercase flex items-center gap-2 pointer-events-auto">
            SYNTHESE<span className="text-[#00FFCC]">26</span>
         </div>
         <nav className="hidden md:flex gap-12 text-[10px] uppercase font-black tracking-[0.3em] pointer-events-auto">
            <Link href="#" className="hover:text-[#FF2E93] transition-colors">Lineup</Link>
            <Link href="#" className="hover:text-[#FF2E93] transition-colors">Schedule</Link>
            <Link href="#" className="hover:text-[#FF2E93] transition-colors">Venue</Link>
         </nav>
         <button className="bg-[#00FFCC] text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#FF2E93] hover:text-white transition-all shadow-[0_0_20px_rgba(0,255,204,0.5)] pointer-events-auto">
            Get Passes
         </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center z-10 px-6">
         
         {/* Mouse-reactive floating gradient */}
         <motion.div 
            style={{ x: springX, y: springY }}
            className="absolute w-[60vw] h-[60vw] bg-[#FF2E93] rounded-full mix-blend-screen filter blur-[150px] opacity-30 pointer-events-none"
         />
         <motion.div 
            style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }}
            className="absolute w-[50vw] h-[50vw] bg-[#00FFCC] rounded-full mix-blend-screen filter blur-[150px] opacity-30 pointer-events-none"
         />

         <motion.div style={{ scale: scaleText, opacity: opacityText }} className="relative z-20">
            <div className="flex justify-center gap-6 mb-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/50">
               <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-[#FF2E93]" /> Oct 12-14, 2026</span>
               <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00FFCC]" /> Paris, FR</span>
            </div>
            
            <h1 className="text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-8 mix-blend-overlay drop-shadow-2xl text-white">
               THE <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>FUTURE</span> <br />
               OF DESIGN.
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed">
               Join 2,000+ creators, engineers, and visionaries for an immersive three-day exploration of digital convergence.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button className="bg-white text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-[#FF2E93] hover:text-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3">
                  <Ticket className="w-5 h-5" /> Secure Your Spot
               </button>
            </div>
         </motion.div>
      </section>

      {/* SPEAKERS MARQUEE */}
      <div className="py-12 bg-[#FF2E93] text-black overflow-hidden relative z-20 whitespace-nowrap flex border-y border-black">
         <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="text-6xl font-black uppercase tracking-tighter inline-flex gap-16">
            <span>Elena Rostova</span> <span>•</span> <span>Marcus Chen</span> <span>•</span> <span>Sophia Martinez</span> <span>•</span> <span>David Kim</span> <span>•</span>
            <span>Elena Rostova</span> <span>•</span> <span>Marcus Chen</span> <span>•</span> <span>Sophia Martinez</span> <span>•</span> <span>David Kim</span> <span>•</span>
         </motion.div>
      </div>

      {/* INTERACTIVE SPEAKERS GRID */}
      <section className="py-32 px-6 md:px-12 bg-[#0F0F0F] relative z-20">
         <div className="max-w-[1600px] mx-auto">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-24 text-center">Visionaries</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {SPEAKERS.map((speaker, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.6, delay: i * 0.1 }}
                     className="group cursor-pointer"
                  >
                     <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-8 bg-white/5 border border-white/10 group-hover:border-[#00FFCC]/50 transition-colors duration-500">
                        <Image src={speaker.img} alt={speaker.name} fill className="object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                        
                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           <div className="w-12 h-12 rounded-full bg-[#00FFCC] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-6">
                              <ArrowRight className="w-5 h-5 -rotate-45" />
                           </div>
                           <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 text-white">{speaker.name}</h3>
                           <p className="text-[10px] font-black uppercase tracking-widest text-[#00FFCC]">{speaker.role}</p>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
