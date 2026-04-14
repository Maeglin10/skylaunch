"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function LuxuryPerfumeReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.4], [20, 0]);

  return (
    <div ref={ref} className="premium-theme bg-[#1a0a1e] text-white min-h-[300vh] font-serif selection:bg-pink-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#1a0a1e]/60 backdrop-blur-xl">
        <Link href="/" className="text-lg font-light tracking-[0.5em] uppercase text-pink-200">Éclat</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Parfumerie</span>
      </nav>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/10 to-[#1a0a1e]" />
        <motion.div style={{ scale, opacity, filter: `blur(${blur}px)` }} className="relative z-10 text-center">
          <div className="relative w-64 md:w-80 aspect-[2/3] mx-auto mb-12">
            <Image src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600" alt="Perfume" fill className="object-cover rounded-[4rem]" />
            <div className="absolute -inset-8 border border-pink-300/10 rounded-[5rem]" />
            <div className="absolute -inset-16 border border-pink-300/5 rounded-[6rem]" />
          </div>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-[0.15em] mb-4">NUIT ROSE</h1>
          <p className="text-xs tracking-[1em] uppercase opacity-30 mb-8">Eau de Parfum • 100ml</p>
          <span className="text-3xl font-light tracking-wider text-pink-200 block mb-8">€285</span>
          <button className="px-12 py-5 bg-pink-300/10 border border-pink-300/20 text-pink-200 text-xs tracking-[0.5em] uppercase hover:bg-pink-300/20 transition-colors backdrop-blur-xl rounded-full">Add to Collection</button>
        </motion.div>
      </div>
    </div>
  );
}
