"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function TypographyMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div ref={ref} className="premium-theme bg-[#0a0a0a] text-white min-h-[300vh] font-sans selection:bg-orange-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl">
        <Link href="/" className="text-lg font-black tracking-tighter text-orange-400">KINETIC</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Typography</span>
      </nav>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full mb-4">
          <motion.div style={{ x: x1 }} className="flex whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-[15vw] font-black tracking-tighter opacity-10 mx-8">DESIGN IS THE SILENT AMBASSADOR — </span>
            ))}
          </motion.div>
        </div>
        <div className="relative z-10 text-center px-8 my-8">
          <h1 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85]">MAKE<br/>IT <span className="text-orange-400">MOVE.</span></h1>
        </div>
        <div className="relative w-full mt-4">
          <motion.div style={{ x: x2 }} className="flex whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-[15vw] font-black tracking-tighter opacity-10 mx-8">OF YOUR BRAND IDENTITY — </span>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-48">
          <Image src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1600" alt="Abstract" fill className="object-cover opacity-20 mix-blend-screen" />
        </div>
      </div>
    </div>
  );
}
