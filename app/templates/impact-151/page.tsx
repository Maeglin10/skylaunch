"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function LuxuryWatchTechnical() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  return (
    <div ref={ref} className="premium-theme bg-[#0a0a0a] text-white min-h-[300vh] font-sans selection:bg-amber-600">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-sm font-bold tracking-[0.6em] uppercase">CHRONOS_LAB</Link>
        <span className="text-[10px] tracking-widest uppercase opacity-40 italic">Technical Specifications v.151</span>
      </nav>

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale, opacity }} className="relative z-10 text-center">
          <span className="text-amber-500 text-[10px] tracking-[1em] uppercase block mb-12">Precision Engineering</span>
          <h1 className="text-7xl md:text-[12vw] font-black tracking-tighter leading-none mb-12 italic">VERTEX_ZERO</h1>
          <div className="flex justify-center gap-16 text-xs tracking-widest uppercase opacity-40 font-bold">
            <div><span className="block text-3xl text-white mb-2">42</span>MM Case</div>
            <div><span className="block text-3xl text-white mb-2">72</span>H Power</div>
            <div><span className="block text-3xl text-white mb-2">100</span>M WR</div>
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div style={{ scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 2]) }} className="relative w-full max-w-4xl aspect-square">
                <Image src="https://images.unsplash.com/photo-1547996160-81dfa63595ee?auto=format&fit=crop&q=80&w=1200" alt="Watch Close Up" fill className="object-cover rounded-full opacity-40 mix-blend-screen" />
            </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.05" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.02" strokeDasharray="1 1" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.02" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.02" />
            </svg>
        </div>
      </div>

      <div className="relative z-20 bg-[#0a0a0a] pt-32 pb-64 px-8">
        <div className="max-w-4xl mx-auto space-y-48">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <h2 className="text-5xl font-black tracking-tighter italic">Tourbillon<br/>Movement.</h2>
                <p className="text-lg opacity-40 leading-relaxed font-light">The Vertex Zero features an in-house skeletonized tourbillon, visible through double-domed sapphire crystal. Every component is hand-polished to a mirror finish.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="order-2 md:order-1">
                    <p className="text-lg opacity-40 leading-relaxed font-light">Crafted from Grade 5 titanium, the case offers unparalleled strength-to-weight ratio, ensuring comfort for the active explorer.</p>
                </div>
                <h2 className="text-5xl font-black tracking-tighter italic order-1 md:order-2 text-right">Titanium<br/>Chassis.</h2>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
