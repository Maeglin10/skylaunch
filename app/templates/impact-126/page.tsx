"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const TABS = [
  { label: "Appetizers", items: [
    { name: "Bruschetta Trio", price: "$14", img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=400" },
    { name: "Burrata Caprese", price: "$18", img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=400" },
  ]},
  { label: "Mains", items: [
    { name: "Osso Buco", price: "$38", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400" },
    { name: "Risotto Nero", price: "$32", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400" },
  ]},
  { label: "Desserts", items: [
    { name: "Tiramisu", price: "$16", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400" },
    { name: "Panna Cotta", price: "$14", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400" },
  ]},
];

export default function RestaurantTabbedMenu() {
  const [tab, setTab] = useState(0);
  return (
    <div className="premium-theme bg-[#1c1714] text-[#e8dcc8] min-h-screen font-serif selection:bg-orange-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#1c1714]/80 backdrop-blur-xl border-b border-orange-900/10">
        <Link href="/" className="text-xl font-light tracking-[0.3em] uppercase">Trattoria</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Since 1965</span>
      </nav>
      <main className="pt-36 pb-32 px-6 md:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-extralight tracking-wider mb-4">Il Menu</h1>
          <div className="w-16 h-[1px] bg-orange-600/30 mx-auto" />
        </div>
        <div className="flex justify-center gap-6 mb-16">
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} className={`text-xs tracking-[0.4em] uppercase pb-2 border-b-2 transition-all ${tab === i ? "border-orange-500 text-orange-400" : "border-transparent opacity-40 hover:opacity-70"}`}>{t.label}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            {TABS[tab].items.map((item, i) => (
              <div key={i} className="flex items-center gap-6 py-6 border-b border-orange-900/10 group">
                <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image src={item.img} alt={item.name} width={128} height={128} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex-1"><h3 className="text-lg font-light tracking-wider">{item.name}</h3></div>
                <span className="text-lg font-light opacity-50">{item.price}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
