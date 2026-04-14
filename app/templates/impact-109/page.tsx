"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PHOTOS = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1682687221038-404670f09439?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1500534314065-30e67e567e53?auto=format&fit=crop&q=80&w=800",
];

export default function PhotographyHorizontalDrag() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div ref={ref} className="premium-theme bg-[#faf9f6] text-[#1a1a1a] min-h-[300vh] relative font-sans selection:bg-indigo-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#faf9f6]/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-lg font-medium tracking-tight">Lumin Gallery</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Landscapes vol. III</span>
      </nav>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-[10vw]">
          {PHOTOS.map((ph, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative flex-shrink-0 w-[60vw] md:w-[35vw] aspect-[3/4] rounded-3xl overflow-hidden group">
              <Image src={ph} alt={`Photo ${i+1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full">
                <span className="text-[10px] font-medium tracking-widest uppercase">Frame {String(i+1).padStart(2,"0")}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
