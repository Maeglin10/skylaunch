"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PRODUCTS = [
  { name: "Midnight Serum", price: "$68", img: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?auto=format&fit=crop&q=80&w=600", tag: "Bestseller" },
  { name: "Glow Oil", price: "$52", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600", tag: "New" },
  { name: "Hydra Mist", price: "$38", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600", tag: "" },
  { name: "Repair Balm", price: "$45", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600", tag: "" },
];

export default function BeautyEcomGrid() {
  return (
    <div className="premium-theme bg-[#fdf5ef] text-[#3d2e22] min-h-screen font-sans selection:bg-rose-300">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#fdf5ef]/80 backdrop-blur-xl border-b border-rose-200/30">
        <Link href="/" className="text-lg font-semibold tracking-[0.1em]">Lumière</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-50"><span>Shop</span><span>Rituals</span><span>Cart</span></div>
      </nav>
      <main className="pt-36 pb-32 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">The Ritual Collection</h1>
          <p className="text-xs tracking-[0.5em] uppercase opacity-30">Clean beauty, crafted with intention</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group cursor-pointer">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#f5e6d8] mb-5">
                {p.tag && <span className="absolute top-4 left-4 z-10 bg-rose-400 text-white text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">{p.tag}</span>}
                <Image src={p.img} alt={p.name} fill className="object-cover p-4 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-sm font-medium mb-1">{p.name}</h3>
              <span className="text-sm opacity-50">{p.price}</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
