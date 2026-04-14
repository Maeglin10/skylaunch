"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function HeroSplitDiagonal() {
  return (
    <div className="premium-theme bg-[#111] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-lime-400 selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-lg font-bold tracking-tight">VECTRAL</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase"><span>About</span><span>Work</span><span>Contact</span></div>
      </nav>
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)" }}>
          <Image src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200" alt="Abstract" fill className="object-cover" />
          <div className="absolute inset-0 bg-lime-400/20 mix-blend-multiply" />
        </div>
        <div className="bg-[#111]" />
      </div>
      <main className="relative z-10 h-full flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-16">
          <div />
          <motion.div initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.5 }}>
            <span className="text-lime-400 text-xs tracking-[0.5em] uppercase block mb-6">Creative Studio</span>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              WE<br />BUILD<br /><span className="text-lime-400">BOLD.</span>
            </h1>
            <p className="text-sm leading-relaxed opacity-50 max-w-sm mb-10">We craft digital experiences that challenge conventions and push the boundaries of visual storytelling.</p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-lime-400 text-black text-xs font-bold tracking-[0.3em] uppercase hover:scale-105 transition-transform">See Work</button>
              <button className="px-8 py-4 border border-white/20 text-xs tracking-[0.3em] uppercase hover:border-lime-400 transition-colors">Contact</button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
