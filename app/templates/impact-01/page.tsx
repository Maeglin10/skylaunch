"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import "../premium.css";

export default function TechNoirTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const productScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const productRotate = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={containerRef} className="premium-theme bg-black text-white selection:bg-rose-500 overflow-x-hidden">
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-2xl font-bold tracking-tighter uppercase group">
          <span className="inline-block group-hover:skew-x-12 transition-transform">Aevia</span>
          <span className="text-premium-accent ml-1">L</span>
        </Link>
        <div className="flex gap-12 text-sm uppercase tracking-[0.3em] font-medium opacity-60">
          <a href="#" className="hover:opacity-100 transition-opacity">Protocol</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Neural</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Specs</a>
        </div>
        <button className="px-6 py-2 border border-white/20 uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
          Initialize
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[200vh] flex flex-col items-center">
        {/* Cinematic Backdrop */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background Text */}
          <motion.h2 
            style={{ opacity: 0.05, scale: 1.5 }}
            className="absolute text-[30vw] font-black uppercase whitespace-nowrap pointer-events-none select-none"
          >
            AETHER
          </motion.h2>

          {/* Product Image */}
          <motion.div 
            style={{ scale: productScale, rotateZ: productRotate }}
            className="relative z-10 w-[70vw] max-w-[800px] aspect-square"
          >
             <Image
              src="/templates/tech_noir.png"
              alt="Aether VR Glasses"
              fill
              className="object-contain drop-shadow-[0_0_50px_rgba(255,45,85,0.3)]"
              priority
            />
          </motion.div>

          {/* Floating UI Elements */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
             <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-[15%] glass p-6 max-w-[200px]"
            >
              <div className="text-[10px] uppercase tracking-widest text-premium-accent mb-2">Neural Link</div>
              <div className="text-xs font-light leading-relaxed">Latency reduced to 0.4ms via quantum tunneling protocols.</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-[15%] glass p-6 max-w-[200px]"
            >
              <div className="text-[10px] uppercase tracking-widest text-premium-accent mb-2">Display tech</div>
              <div className="text-xs font-light leading-relaxed">8K Micro-OLED with 240Hz refresh rate. Perfection redefined.</div>
            </motion.div>
          </div>
        </div>

        {/* Foreground Content */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-end pb-32 z-30 pointer-events-none"
        >
          <div className="max-w-4xl text-center px-8 pointer-events-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-8xl md:text-[12rem] font-black uppercase leading-[0.8] mb-8"
            >
              The New <br />
              <span className="text-transparent border-text text-glow" style={{ WebkitTextStroke: '2px white' }}>Reality</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto opacity-70"
            >
              Experience the convergence of technology and aesthetics. <br />
              Beyond vision. Beyond limits.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Detail Section */}
      <section className="relative z-40 bg-black min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="p-20 flex flex-col justify-center border-r border-white/5">
          <h2 className="text-6xl uppercase font-black mb-8 italic">Engineered for <br /><span className="text-premium-accent">Dominance</span></h2>
          <p className="text-xl opacity-60 font-light leading-relaxed mb-12">
            Every component of the Aether headset is crafted with precision. 
            The aerospace-grade titanium chassis provides unparalleled durability while maintaining weightless comfort for extended neural sessions.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-bold mb-1 tracking-tighter">0.4MS</div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-40">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1 tracking-tighter">240HZ</div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-40">Refresh Rate</div>
            </div>
          </div>
        </div>
        <div className="bg-[#111] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-premium-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="flex items-center justify-center h-full p-20">
             <div className="relative w-full aspect-video border border-white/10 glass flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-premium-accent/30 animate-scan"></div>
                </div>
                <div className="text-4xl font-black uppercase tracking-[0.5em] opacity-20">Secure Link</div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-20 text-center border-t border-white/5">
        <div className="text-xs uppercase tracking-[1em] opacity-30 mb-8">End of Transmission</div>
        <div className="flex justify-center gap-12 opacity-50 text-[10px] uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-premium-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-premium-accent transition-colors">Twitter</a>
          <a href="#" className="hover:text-premium-accent transition-colors">Discord</a>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .border-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}
