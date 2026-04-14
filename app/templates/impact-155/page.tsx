"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const WORKS = [
  { title: "Fractal Void", year: "2026", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200" },
  { title: "Static Resonance", year: "2025", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1200" },
  { title: "Neural Drift", year: "2024", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" },
];

export default function ModernArtGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-white min-h-[400vh] font-sans selection:bg-white selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-lg font-black tracking-[0.2em] uppercase italic">ART_INDEX</Link>
        <span className="text-[10px] tracking-widest uppercase opacity-40">Digital Exhibition v.155</span>
      </nav>

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative h-full w-full">
            {WORKS.map((work, i) => {
                const start = (i / WORKS.length);
                const end = ((i + 1) / WORKS.length);
                const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
                const scale = useTransform(scrollYProgress, [start, end], [1.1, 0.9]);
                const y = useTransform(scrollYProgress, [start, end], [60, -60]);

                return (
                    <motion.div key={i} style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="relative w-full max-w-5xl aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl">
                            <Image src={work.img} alt={work.title} fill className="object-cover opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <motion.div style={{ y }} className="absolute bottom-12 left-12">
                                <span className="text-xs tracking-[0.6em] uppercase text-white/40 block mb-4">Edition {work.year}</span>
                                <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase">{work.title}</h2>
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
        <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] tracking-[0.4em] uppercase opacity-40">Scroll to Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </div>
  );
}
