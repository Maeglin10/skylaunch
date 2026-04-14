"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function ZoomRevealHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 0.5], [3, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <div ref={ref} className="premium-theme bg-black text-white min-h-[400vh] font-sans selection:bg-sky-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">ATLAS</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/40">Zoom Effect</span>
      </nav>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div style={{ scale }} className="relative w-full h-full">
          <Image src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000" alt="City" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        <motion.div style={{ opacity: textOpacity }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8">
          <span className="text-sky-400 text-xs tracking-[1em] uppercase block mb-8">Discover the Urban Canvas</span>
          <h1 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] mb-8">METRO<br/>POLIS</h1>
          <p className="text-sm opacity-40 max-w-md mx-auto mb-10">Where concrete meets sky, a new visual language emerges from the cityscape.</p>
          <button className="px-10 py-5 bg-sky-400 text-black text-xs font-bold tracking-[0.4em] uppercase hover:scale-105 transition-transform">Explore</button>
        </motion.div>
      </div>
    </div>
  );
}
