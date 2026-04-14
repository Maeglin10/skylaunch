"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function OrganicSkincareStory() {
  return (
    <div className="premium-theme bg-[#fcf9f5] text-[#4a3f35] min-h-screen font-serif selection:bg-[#e2d1c3]">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-[#fcf9f5]/60 backdrop-blur-xl">
        <Link href="/" className="text-xl tracking-[0.2em] font-light italic">Pureté</Link>
        <div className="flex gap-8 text-[10px] tracking-widest uppercase opacity-60"><span>Journal</span><span>Shop</span></div>
      </nav>

      <section className="h-screen flex items-center justify-center p-8 overflow-hidden relative">
        <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000" alt="Botanical" fill className="object-cover opacity-20 contrast-75 brightness-110" />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-3xl">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs uppercase tracking-[0.5em] block mb-8 opacity-40">Derived from nature, perfected by science</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }} className="text-6xl md:text-[9vw] font-light italic leading-[0.9] mb-12">The Essence of Earth.</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-lg opacity-60 italic leading-relaxed mb-12">A sensory journey through the botanicals that nourish the skin and calm the mind.</motion.p>
          <motion.button whileHover={{ scale: 1.05 }} className="px-12 py-5 bg-[#4a3f35] text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-xl">Explore the Ritual</motion.button>
        </div>
      </section>

      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800" alt="Oil" fill className="object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="space-y-12">
            <h2 className="text-5xl font-light italic leading-tight">Harvested with care.</h2>
            <p className="text-lg opacity-60 leading-relaxed italic">Our oils are cold-pressed in small batches to preserve the vital nutrients and anti-inflammatory properties of each organic ingredient.</p>
            <div className="space-y-6">
              {['100% Organic', 'Cruelty Free', 'Ethically Sourced'].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-xs tracking-widest uppercase opacity-40">
                  <div className="w-8 h-[1px] bg-[#4a3f35]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
