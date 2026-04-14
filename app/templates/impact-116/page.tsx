"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const MENU = [
  { name: "Matcha Latte", price: "¥680", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600" },
  { name: "Sakura Mochi", price: "¥420", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600" },
  { name: "Wagashi Set", price: "¥1,200", img: "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?auto=format&fit=crop&q=80&w=600" },
];

export default function JapaneseTeahouse() {
  return (
    <div className="premium-theme bg-[#f5f0e8] text-[#3d3528] min-h-screen font-serif selection:bg-[#8b7355]">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#f5f0e8]/80 backdrop-blur-xl border-b border-[#3d3528]/5">
        <Link href="/" className="text-xl font-light tracking-[0.5em]">茶寮</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Kyoto Est. 1892</span>
      </nav>
      <main className="pt-36 pb-32 px-6 md:px-16 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="text-center mb-24">
          <div className="text-6xl mb-4">和</div>
          <h1 className="text-4xl md:text-7xl font-extralight tracking-[0.15em] mb-4">HARMONY</h1>
          <div className="w-24 h-[1px] bg-[#8b7355]/30 mx-auto mb-4" />
          <p className="text-xs tracking-[0.8em] uppercase opacity-40">The art of tea ceremony</p>
        </motion.div>
        <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden mb-24 shadow-xl">
          <Image src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=1600" alt="Teahouse" fill className="object-cover" />
        </div>
        <div className="space-y-0">
          {MENU.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.15 }}
              className="flex items-center gap-8 py-10 border-b border-[#3d3528]/10 group">
              <div className="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden">
                <Image src={item.img} alt={item.name} width={160} height={160} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light tracking-wider">{item.name}</h3>
              </div>
              <span className="text-lg font-light opacity-40">{item.price}</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
