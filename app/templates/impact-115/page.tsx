"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1502481851512-e9e2529b8bb5?auto=format&fit=crop&q=80&w=800", speed: -0.3 },
  { src: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80&w=800", speed: 0.2 },
  { src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=800", speed: -0.15 },
  { src: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&q=80&w=800", speed: 0.35 },
];

export default function ParallaxWaveGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <div ref={ref} className="premium-theme bg-[#0e1111] text-white min-h-[250vh] font-sans selection:bg-emerald-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#0e1111]/80 backdrop-blur-xl border-b border-emerald-500/10">
        <Link href="/" className="text-lg font-semibold tracking-tight text-emerald-400">Verda</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Parallax Gallery</span>
      </nav>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
          {IMAGES.map((img, i) => {
            const y = useTransform(scrollYProgress, [0, 1], [0, img.speed * 500]);
            return (
              <motion.div key={i} style={{ y }} className="relative aspect-[3/5] rounded-3xl overflow-hidden group">
                <Image src={img.src} alt={`Parallax ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/30 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs tracking-[0.3em] uppercase">Frame {String(i + 1).padStart(2, "0")}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
