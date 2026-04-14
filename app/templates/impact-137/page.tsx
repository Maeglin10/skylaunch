"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function CoffeeShopOnepage() {
  return (
    <div className="premium-theme bg-[#f9f3ec] text-[#3a2e25] min-h-screen font-serif selection:bg-amber-700 selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#f9f3ec]/80 backdrop-blur-xl border-b border-amber-900/5">
        <Link href="/" className="text-xl font-light tracking-[0.3em] uppercase">Torréfié</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-40"><span>Menu</span><span>Visit</span></div>
      </nav>
      <section className="h-screen flex items-center px-8 md:px-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
          <Image src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" alt="Coffee" fill className="object-cover rounded-l-[5rem]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="max-w-xl relative z-10">
          <span className="text-xs tracking-[0.8em] uppercase opacity-30 block mb-6">Specialty Coffee Roasters</span>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-wide leading-tight mb-6">Every cup,<br/>a story.</h1>
          <p className="text-sm opacity-50 leading-relaxed max-w-sm mb-8">Single-origin beans roasted daily in our atelier. From seed to cup, we honour the craft.</p>
          <button className="px-8 py-4 bg-[#3a2e25] text-[#f9f3ec] text-xs tracking-[0.4em] uppercase hover:bg-amber-800 transition-colors rounded-full">Our Origins</button>
        </motion.div>
      </section>
      <section className="py-24 px-8 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Ethiopia Yirgacheffe", notes: "Jasmine, bergamot, honey", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600" },
            { title: "Colombia Huila", notes: "Caramel, red apple, cocoa", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?auto=format&fit=crop&q=80&w=600" },
            { title: "Guatemala Antigua", notes: "Dark chocolate, spice, plum", img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600" },
          ].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="group">
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-5">
                <Image src={c.img} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-lg font-light tracking-wider mb-1">{c.title}</h3>
              <p className="text-xs opacity-40 italic">{c.notes}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
