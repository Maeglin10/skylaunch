"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const WORKS = [
  { id: 1, title: "Kinesis", cat: "Branding", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Monolith", cat: "Web Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Vertex", cat: "Motion", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Halo", cat: "Identity", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Prism", cat: "Packaging", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Signal", cat: "Campaign", img: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=800" },
];

export default function PortfolioMasonryHover() {
  return (
    <div className="premium-theme bg-[#f0ede8] text-[#1a1a1a] min-h-screen font-sans selection:bg-orange-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#f0ede8]/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-lg font-semibold tracking-tight">Studio Versa</Link>
        <div className="flex gap-8 text-xs tracking-widest uppercase opacity-40">
          <span>Selected Work</span>
        </div>
      </nav>
      <main className="pt-36 pb-32 px-4 md:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6">
          {WORKS.map((w, i) => (
            <motion.div key={w.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.8 }} className="break-inside-avoid mb-4 md:mb-6 group cursor-pointer">
              <div className={`relative overflow-hidden rounded-3xl ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`}>
                <Image src={w.img} alt={w.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-8">
                  <motion.div initial={{ y: 20, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white/60 text-xs tracking-[0.3em] uppercase block mb-1">{w.cat}</span>
                    <h3 className="text-white text-2xl font-semibold">{w.title}</h3>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
