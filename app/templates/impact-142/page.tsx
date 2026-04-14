"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function SustainabilityOnepage() {
  return (
    <div className="premium-theme bg-[#f4f7f0] text-[#1a2e1a] min-h-screen font-sans selection:bg-green-500 selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#f4f7f0]/80 backdrop-blur-xl border-b border-green-900/5">
        <Link href="/" className="text-lg font-semibold tracking-tight text-green-800">🌿 Verdant</Link>
        <button className="px-6 py-2.5 bg-green-800 text-white rounded-full text-xs tracking-wide font-semibold">Join the Mission</button>
      </nav>
      <section className="pt-36 pb-24 px-8 md:px-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="text-green-600 text-xs tracking-[0.5em] uppercase block mb-6">Carbon Neutral Since 2024</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] mb-6 max-w-4xl mx-auto">Building a greener <span className="text-green-600">tomorrow.</span></h1>
          <p className="text-base opacity-50 max-w-xl mx-auto mb-10">We develop sustainable technologies that reduce environmental impact without compromising performance.</p>
        </motion.div>
      </section>
      <section className="px-8 md:px-16 pb-24">
        <div className="relative max-w-6xl mx-auto aspect-[21/9] rounded-[3rem] overflow-hidden shadow-xl">
          <Image src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1600" alt="Nature" fill className="object-cover" />
        </div>
      </section>
      <section className="px-8 md:px-16 pb-32 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: "2.4M", label: "Trees Planted", icon: "🌳" },
            { num: "89%", label: "Renewable Energy", icon: "⚡" },
            { num: "0", label: "Waste to Landfill", icon: "♻️" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
              className="text-center p-10 bg-white rounded-3xl shadow-sm border border-green-100">
              <div className="text-4xl mb-4">{s.icon}</div>
              <div className="text-4xl font-black text-green-800 mb-2">{s.num}</div>
              <p className="text-xs tracking-widest uppercase opacity-40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
