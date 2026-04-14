"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1600", title: "RESOLVE", sub: "Brand Identity" },
  { id: 2, img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1600", title: "CONSTRUCT", sub: "Web Platform" },
];

export default function SplitRevealSlider() {
  const [idx, setIdx] = useState(0);
  const s = SLIDES[idx];
  const next = () => setIdx((p) => (p + 1) % SLIDES.length);

  return (
    <div className="premium-theme bg-[#0e0e0e] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-emerald-400" onClick={next}>
      <div className="h-full grid grid-cols-1 md:grid-cols-2">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={`left-${idx}`} initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0">
              <Image src={s.img} alt={s.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative flex items-center justify-center p-12 md:p-20 bg-[#0e0e0e]">
          <AnimatePresence mode="wait">
            <motion.div key={`right-${idx}`} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <span className="text-emerald-400 text-xs tracking-[0.8em] uppercase block mb-6">{s.sub}</span>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">{s.title}.</h1>
              <p className="text-sm opacity-40 max-w-sm mb-10">A comprehensive visual system designed to unify digital presence across all platforms.</p>
              <button className="px-8 py-4 border border-emerald-400/30 text-emerald-300 text-xs tracking-[0.4em] uppercase hover:bg-emerald-400 hover:text-black transition-all">View Project</button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold tracking-tight text-emerald-400">SPLIT</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">{String(idx+1).padStart(2,"0")} / {String(SLIDES.length).padStart(2,"0")}</span>
      </nav>
    </div>
  );
}
