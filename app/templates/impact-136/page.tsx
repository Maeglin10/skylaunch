"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function TextMaskScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const clipPath = useTransform(scrollYProgress, [0, 0.5], ["inset(40% 30% 40% 30%)", "inset(0% 0% 0% 0%)"]);

  return (
    <div ref={ref} className="premium-theme bg-[#1a1a1a] text-white min-h-[300vh] font-sans selection:bg-amber-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-lg font-black tracking-tighter text-white">REVEAL</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/40">Scroll to Unmask</span>
      </nav>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600" alt="Event" fill className="object-cover" />
        </motion.div>
        <h1 className="relative z-10 text-7xl md:text-[15vw] font-black tracking-tighter text-center leading-[0.85] mix-blend-difference">
          UN<br/>MASK
        </h1>
      </div>
    </div>
  );
}
