"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ITEMS = [
  { id: 1, name: "Ceramic Vessel", price: "$240", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=600", cat: "Homeware" },
  { id: 2, name: "Linen Throw", price: "$180", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600", cat: "Textile" },
  { id: 3, name: "Oak Stool", price: "$520", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600", cat: "Furniture" },
  { id: 4, name: "Iron Candle", price: "$85", img: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&q=80&w=600", cat: "Accent" },
];

export default function EcomMinimalGrid() {
  return (
    <div className="premium-theme bg-[#f7f5f0] text-[#2a2a2a] min-h-screen font-sans selection:bg-stone-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#f7f5f0]/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-lg font-light tracking-[0.4em] uppercase">Artisan</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-40"><span>Shop</span><span>About</span><span>Cart (0)</span></div>
      </nav>
      <main className="pt-36 pb-32 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-6xl font-extralight tracking-wide text-center mb-4">New Arrivals</motion.h1>
        <p className="text-center text-xs tracking-[0.5em] uppercase opacity-30 mb-20">Handcrafted essentials for considered living</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ITEMS.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.8 }} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#ebe7e0] mb-5">
                <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <motion.button whileHover={{ scale: 1.05 }} className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 backdrop-blur-xl text-xs tracking-[0.3em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">Add to Cart</motion.button>
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 block mb-1">{item.cat}</span>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <span className="text-sm opacity-50">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
