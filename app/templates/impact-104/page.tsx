"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const DISHES = [
  { id: 1, name: "Wagyu A5", price: "€120", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800", desc: "Dry-aged 120 days, charcoal grill" },
  { id: 2, name: "Black Truffle Risotto", price: "€85", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800", desc: "Carnaroli rice, Périgord truffle" },
  { id: 3, name: "Lobster Thermidor", price: "€95", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", desc: "Blue lobster, cognac reduction" },
];

export default function GastronomyVerticalMenu() {
  return (
    <div className="premium-theme bg-[#1a1510] text-[#e8dcc8] min-h-screen selection:bg-amber-600 font-serif">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#1a1510]/80 backdrop-blur-xl border-b border-amber-900/20">
        <Link href="/" className="text-xl font-light tracking-[0.3em] uppercase">Maison Dorée</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Menu Dégustation</span>
      </nav>
      <main className="pt-40 pb-32 px-6 md:px-16 max-w-5xl mx-auto">
        <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="text-center mb-32">
          <div className="w-16 h-[1px] bg-amber-600 mx-auto mb-8" />
          <h1 className="text-5xl md:text-8xl font-light tracking-[0.15em] uppercase mb-6">Carte</h1>
          <p className="text-xs tracking-[0.6em] uppercase opacity-40">Saison Printemps MMXXVI</p>
          <div className="w-16 h-[1px] bg-amber-600 mx-auto mt-8" />
        </motion.header>
        <div className="space-y-0">
          {DISHES.map((dish, i) => (
            <motion.div key={dish.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 1 }} className="group grid grid-cols-12 gap-6 py-16 border-b border-amber-900/10 hover:bg-amber-900/5 transition-colors px-4 -mx-4 rounded-2xl">
              <div className="col-span-3 md:col-span-2">
                <div className="aspect-square rounded-full overflow-hidden border border-amber-900/20 group-hover:scale-110 transition-transform duration-700">
                  <Image src={dish.img} alt={dish.name} width={200} height={200} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <div className="col-span-6 md:col-span-7 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-light tracking-wider uppercase mb-2">{dish.name}</h2>
                <p className="text-xs tracking-widest opacity-40 italic">{dish.desc}</p>
              </div>
              <div className="col-span-3 flex items-center justify-end">
                <span className="text-2xl font-light tracking-wider opacity-60 group-hover:text-amber-500 transition-colors">{dish.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-32 text-center">
          <p className="text-[10px] tracking-[0.8em] uppercase opacity-20">Tous nos plats sont préparés avec des produits de saison</p>
        </div>
      </main>
    </div>
  );
}
