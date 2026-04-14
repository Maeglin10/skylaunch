"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import "../premium.css";

export default function KineticMonoTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(useTransform(scrollYProgress, [0, 1], [0, -500]), springConfig);

  return (
    <div ref={containerRef} className="premium-theme bg-white text-black min-h-[300vh] selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference invert">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase">Kinetics&trade;</Link>
        <div className="text-[10px] uppercase tracking-[0.4em] font-medium">Vol_01 / Movement</div>
      </nav>

      {/* Kinetic Hero */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Massive Animated Text Background */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-[0.03]">
           {[1, 2, 3, 4, 5].map((i) => (
             <motion.div 
               key={i}
               style={{ x: i % 2 === 0 ? smoothX : useTransform(smoothX, (v) => -v) }}
               className="text-[25vh] font-black uppercase whitespace-nowrap leading-tight"
             >
                MOTION DESIGN MOTION DESIGN MOTION DESIGN 
             </motion.div>
           ))}
        </div>

        {/* Foreground Kinetic Content */}
        <div className="relative z-10 text-center">
          <motion.h1 
            style={{ 
              skewX: useTransform(smoothX, (v) => v / 10),
              x: useTransform(smoothX, (v) => v / 5)
            }}
            className="text-[15vw] font-black leading-none uppercase italic tracking-tighter"
          >
            Move <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Faster.</span>
          </motion.h1>
          
          <div className="mt-12 flex justify-center gap-24">
             <div className="text-left max-w-xs">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-4 block">Execution</span>
                <p className="text-sm font-medium leading-relaxed">
                   High-performance animation logic optimized for 120fps smooth interaction. 
                   Real-time spring physics applied to every letter.
                </p>
             </div>
             <div className="text-left max-w-xs">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-4 block">Philosophy</span>
                <p className="text-sm font-medium leading-relaxed">
                   In a static world, motion is prestige. We don't just build websites; we choreograph digital ballets.
                </p>
             </div>
          </div>
        </div>

        {/* Mouse Follower Helper */}
        <motion.div 
           animate={{ 
             x: mousePos.x - 100, 
             y: mousePos.y - 100 
           }}
           transition={{ type: "spring", damping: 30, stiffness: 200 }}
           className="fixed top-0 left-0 w-[200px] h-[200px] border border-black rounded-full pointer-events-none z-0 flex items-center justify-center opacity-20"
        >
           <span className="text-[8px] uppercase tracking-widest font-black">Scroll Down</span>
        </motion.div>
      </section>

      {/* Kinetic Gallery Section */}
      <section className="relative z-10 bg-black text-white py-64 px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-8xl md:text-[12vw] font-black uppercase leading-none mb-32 tracking-tighter">The <br /> Rhythm.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
             {[
               { t: "Pulse", d: "Rhythmic scale transitions" },
               { t: "Momentum", d: "Inertia-based scroll effects" },
               { t: "Flow", d: "Organic bezier path motion" },
               { t: "Stark", d: "High-impact frame reveals" }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1 }}
                 className="group cursor-pointer"
               >
                  <div className="w-full aspect-video bg-white/5 border border-white/10 mb-8 flex items-center justify-center relative overflow-hidden">
                     <motion.div 
                        whileHover={{ scale: 1.5, rotate: 45 }}
                        className="w-32 h-32 border-2 border-white/20"
                     />
                     <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest font-black opacity-40">Prototype_{i+1}</div>
                  </div>
                  <h3 className="text-4xl font-black uppercase mb-2 tracking-tighter">{item.t}</h3>
                  <p className="opacity-40 uppercase text-xs tracking-widest">{item.d}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Vertical Scrolling Text */}
      <section className="h-screen bg-white flex items-center justify-center">
         <div className="flex gap-12">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                style={{ y: i % 2 === 0 ? smoothX : useTransform(smoothX, v => -v) }}
                className="flex flex-col gap-12"
              >
                 {[...Array(10)].map((_, j) => (
                   <span key={j} className="text-6xl font-black uppercase tracking-tighter mix-blend-difference">KINETIC</span>
                 ))}
              </motion.div>
            ))}
         </div>
      </section>

      <footer className="p-24 text-center border-t border-black/5">
         <div className="text-[10px] uppercase tracking-[1em] mb-12">Rhythm never sleeps</div>
         <div className="text-4xl font-black uppercase tracking-tighter">Kinetics.studio</div>
      </footer>
    </div>
  );
}
