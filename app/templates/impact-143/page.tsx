"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600", room: "Living Room", style: "Japandi Minimal" },
  { img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600", room: "Bedroom", style: "Scandinavian Warm" },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600", room: "Kitchen", style: "Industrial Modern" },
];

export default function InteriorDesignSlider() {
  const [idx, setIdx] = useState(0);
  return (
    <div className="premium-theme bg-[#f5f2ed] text-[#2a2520] h-screen w-full overflow-hidden relative font-sans selection:bg-stone-500 selection:text-white">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <Image src={SLIDES[idx].img} alt={SLIDES[idx].room} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-lg font-light tracking-[0.4em] uppercase text-white">ATELIER</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/40">Interior Studio</span>
      </nav>
      <main className="relative z-10 h-full flex items-end p-8 md:p-16 pb-20">
        <div className="flex justify-between items-end w-full">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-white/50 text-xs tracking-[0.5em] uppercase block mb-3">{SLIDES[idx].style}</span>
              <h1 className="text-5xl md:text-8xl font-extralight tracking-wide text-white">{SLIDES[idx].room}</h1>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-3">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full transition-all ${i === idx ? "bg-white scale-125" : "bg-white/30"}`} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
