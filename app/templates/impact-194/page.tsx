"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircleDot } from "lucide-react";
import "../premium.css";

const WORKS = [
  { title: "Lumina", cat: "Fintech", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1500" },
  { title: "Vortex", cat: "Web3", img: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=1500" },
  { title: "Aura", cat: "E-Commerce", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1500" }
];

export default function PremiumWebAgency() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const xMarquee = useTransform(springScroll, [0, 1], ["0%", "-50%"]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="premium-theme bg-[#E5E5E5] text-[#111] min-h-screen font-sans selection:bg-[#111] selection:text-[#E5E5E5] overflow-hidden cursor-none">
      
      {/* CUSTOM CURSOR */}
      <motion.div 
         animate={{ 
            x: mousePosition.x - (isHovering ? 40 : 10), 
            y: mousePosition.y - (isHovering ? 40 : 10),
            scale: isHovering ? 1 : 1
         }}
         transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
         className={`fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center mix-blend-difference ${isHovering ? 'w-20 h-20 bg-white' : 'w-5 h-5 bg-black'}`}
      >
         {isHovering && <ArrowUpRight className="w-6 h-6 text-black" />}
      </motion.div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <div className="font-black text-2xl tracking-tighter uppercase pointer-events-auto hover:opacity-50 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            Onix Studio.
        </div>
        <nav className="hidden md:flex gap-12 font-bold text-[10px] uppercase tracking-[0.3em] pointer-events-auto">
            <Link href="#" className="hover:opacity-50 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Work</Link>
            <Link href="#" className="hover:opacity-50 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Studio</Link>
        </nav>
        <button 
           onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
           className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg hover:scale-110 transition-transform pointer-events-auto"
        >
            M
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-24">
        <motion.div style={{ y: yHero }} className="max-w-6xl">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="inline-flex items-center gap-3 px-5 py-2 border border-[#111]/20 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-12 bg-white"
            >
               <CircleDot className="w-3 h-3 text-green-500 animate-pulse" /> Taking new projects
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.8] mb-12 uppercase"
            >
                Digital<br/>
                <span className="text-[#111]/20" style={{ WebkitTextStroke: "2px #111" }}>Craftsmanship.</span>
            </motion.h1>
            
            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="text-lg md:text-2xl font-medium text-[#111]/60 max-w-2xl leading-relaxed"
            >
                An independent design and development studio pushing the boundaries of web experiences. We build digital flagships.
            </motion.p>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="py-24 border-y border-[#111]/10 bg-white overflow-hidden flex items-center">
         <motion.div style={{ x: xMarquee }} className="flex whitespace-nowrap text-[12vw] font-black uppercase tracking-tighter text-[#111]/5">
            <span>SELECTED WORKS — SELECTED WORKS — SELECTED WORKS — SELECTED WORKS — </span>
         </motion.div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto">
         <div className="space-y-32">
            {WORKS.map((work, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}
               >
                  <div 
                     className="w-full md:w-[60%] relative aspect-[4/3] overflow-hidden bg-[#D1D1D1] group"
                     onMouseEnter={() => setIsHovering(true)} 
                     onMouseLeave={() => setIsHovering(false)}
                  >
                     <Image src={work.img} alt={work.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 ease-[0.16,1,0.3,1]" />
                     <div className="absolute inset-0 bg-[#111]/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  </div>
                  
                  <div className="w-full md:w-[40%]">
                     <div className="font-bold text-[10px] uppercase tracking-[0.4em] text-[#111]/50 mb-6">0{i+1} — {work.cat}</div>
                     <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none hover:opacity-50 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        {work.title}
                     </h2>
                     <div className="w-12 h-1 bg-[#111]" />
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-32 bg-[#111] text-[#E5E5E5] text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
         <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase mb-12 relative z-10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            Let's Talk.
         </h2>
         <Link href="#" className="relative z-10 inline-flex items-center gap-4 font-bold text-[10px] uppercase tracking-[0.3em] border-b border-[#E5E5E5] pb-2 hover:opacity-50 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            hello@onixstudio.com <ArrowUpRight className="w-4 h-4" />
         </Link>
      </footer>
    </div>
  );
}
