"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, img: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=1600", title: "Arctic Solitude" },
  { id: 2, img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1600", title: "Emerald Canopy" },
  { id: 3, img: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&q=80&w=1600", title: "Desert Bloom" },
];

export default function FluidCurtainSlider() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((p) => (p + 1) % SLIDES.length);

  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative font-serif selection:bg-amber-500 cursor-pointer" onClick={next}>
      <AnimatePresence mode="sync">
        <motion.div key={idx} initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 z-10">
          <Image src={SLIDES[idx].img} alt={SLIDES[idx].title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-light tracking-[0.4em] uppercase">Terra</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">{String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
      </nav>
      <main className="relative z-20 h-full flex items-end p-8 md:p-16 pb-20">
        <AnimatePresence mode="wait">
          <motion.h1 key={idx} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-9xl font-light tracking-wide">{SLIDES[idx].title}</motion.h1>
        </AnimatePresence>
      </main>
      <div className="absolute bottom-8 right-8 md:right-16 z-30 text-xs tracking-[0.5em] uppercase opacity-40">Click anywhere</div>
    </div>
  );
}
