"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function FashionEditorialSplit() {
  return (
    <div className="premium-theme bg-[#111] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-yellow-400 selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-lg font-black tracking-tighter uppercase text-white">MAISON</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/40">SS26</span>
      </nav>
      <div className="h-full grid grid-cols-1 md:grid-cols-2">
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5 }} className="relative overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000" alt="Fashion 1" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-12 left-12">
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-60 block mb-2">Look 01</span>
            <h2 className="text-4xl font-extralight tracking-wider">Ivory</h2>
          </div>
        </motion.div>
        <div className="relative flex flex-col">
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className="relative flex-1 overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" alt="Fashion 2" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-12 left-12">
              <span className="text-[10px] tracking-[0.5em] uppercase opacity-60 block mb-2">Look 02</span>
              <h2 className="text-4xl font-extralight tracking-wider">Obsidian</h2>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="p-12 bg-[#111] border-t border-white/5">
            <h3 className="text-3xl font-extralight tracking-wider mb-3">Spring Summer <span className="text-yellow-400">2026</span></h3>
            <p className="text-xs opacity-40 leading-relaxed max-w-sm mb-6">A collection exploring the tension between minimalism and maximalist silhouettes.</p>
            <button className="px-8 py-4 bg-yellow-400 text-black text-xs font-bold tracking-[0.3em] uppercase hover:scale-105 transition-transform">View Collection</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
