"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PROPERTIES = [
  { id: 1, name: "Skyline Penthouse", loc: "Manhattan, NY", price: "$8.9M", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800", beds: 4, baths: 3 },
  { id: 2, name: "Cliff House", loc: "Big Sur, CA", price: "$5.2M", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", beds: 3, baths: 2 },
  { id: 3, name: "Lake Retreat", loc: "Como, IT", price: "€6.8M", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800", beds: 5, baths: 4 },
];

export default function RealEstateCardGrid() {
  return (
    <div className="premium-theme bg-[#f8f6f3] text-[#2a2520] min-h-screen font-sans selection:bg-amber-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#f8f6f3]/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-lg font-semibold tracking-tight">Haven Properties</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-40"><span>Buy</span><span>Rent</span><span>Sell</span></div>
      </nav>
      <main className="pt-36 pb-32 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-20">
          <h1 className="text-4xl md:text-7xl font-extralight tracking-wide mb-4">Featured Estates</h1>
          <p className="text-xs tracking-[0.5em] uppercase opacity-30">Curated luxury living worldwide</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPERTIES.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-lg">
                <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full">
                  <span className="text-xs font-semibold">{p.price}</span>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-1">{p.name}</h3>
              <p className="text-xs tracking-widest uppercase opacity-40 mb-3">{p.loc}</p>
              <div className="flex gap-4 text-xs opacity-50">
                <span>{p.beds} Beds</span><span>•</span><span>{p.baths} Baths</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
