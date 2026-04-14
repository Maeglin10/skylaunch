"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800", title: "FORCE" },
  { img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", title: "ENDURE" },
  { img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800", title: "ASCEND" },
  { img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800", title: "IGNITE" },
];

export default function FitnessCarouselGrid() {
  return (
    <div className="premium-theme bg-[#111] text-white min-h-screen font-sans selection:bg-red-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#111]/80 backdrop-blur-xl border-b border-red-500/10">
        <Link href="/" className="text-xl font-black tracking-tight">IRON<span className="text-red-500">X</span></Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-50"><span>Programs</span><span>Join</span></div>
      </nav>
      <header className="pt-36 pb-16 px-8 md:px-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="text-red-500 text-xs tracking-[1em] uppercase block mb-6">Total Body Transformation</span>
          <h1 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] mb-6">NO<br/>LIMITS.</h1>
          <p className="text-sm opacity-40 max-w-md mx-auto">Unlock your potential with science-backed training and elite coaching.</p>
        </motion.div>
      </header>
      <main className="px-4 md:px-16 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer">
              <Image src={item.img} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
