"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function FluidMorphHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["50%", "10%", "0%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.5, 1.2]);

  return (
    <div ref={ref} className="premium-theme bg-[#f2efe9] text-[#1a1a1a] min-h-[400vh] font-sans selection:bg-teal-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#f2efe9]/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-lg font-semibold tracking-tight text-teal-700">morph.studio</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Fluid Transition</span>
      </nav>
      <div className="sticky top-0 h-screen flex items-center justify-center p-8 md:p-16 overflow-hidden">
        <motion.div style={{ borderRadius, scale: imgScale }} className="relative w-full max-w-5xl aspect-video overflow-hidden shadow-2xl">
          <Image src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1600" alt="Ocean" fill className="object-cover" />
          <div className="absolute inset-0 bg-teal-900/20 mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1 style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }} className="text-6xl md:text-[10vw] font-black tracking-tighter text-white mix-blend-difference text-center">FLUID<br/>FORM</motion.h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
