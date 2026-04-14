"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const LOOKS = [
  { id: "01", name: "RAW_SILK", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" },
  { id: "02", name: "HEAVY_KNIT", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800" },
  { id: "03", name: "STRUCT_WOOL", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800" },
  { id: "04", name: "DRAPE_TECH", img: "https://images.unsplash.com/photo-1490481651871-ab68624d5517?auto=format&fit=crop&q=80&w=800" },
];

export default function FashionLookbookStaggered() {
  return (
    <div className="premium-theme bg-[#f7f7f7] text-black min-h-screen font-sans selection:bg-black selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-[#f7f7f7]/60 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-sm font-bold tracking-[0.6em] uppercase">MAISON_V</Link>
        <div className="flex gap-12 text-[10px] tracking-widest uppercase opacity-40 font-bold"><span>Lookbook</span><span>Heritage</span><span>Store</span></div>
      </nav>

      <main className="pt-40 px-6 pb-32 max-w-7xl mx-auto">
        <header className="mb-32 text-center">
            <motion.h1 initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="text-7xl md:text-[14vw] font-black tracking-tighter leading-[0.8] uppercase italic">VERDICT.<br/><span className="opacity-20">SS/26</span></motion.h1>
            <p className="mt-12 text-sm tracking-widest uppercase opacity-40 max-w-md mx-auto italic">An exploration of sculptural tension and raw textile materiality.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {LOOKS.map((look, i) => (
                <motion.div key={look.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: i * 0.1 }}
                    className={`group cursor-pointer ${i % 2 === 1 ? "md:mt-32" : ""}`}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-8 shadow-2xl">
                        <Image src={look.img} alt={look.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-[10px] tracking-widest uppercase opacity-40 font-bold">LOOK_{look.id}</span>
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic">{look.name}</h2>
                    </div>
                </motion.div>
            ))}
        </div>

        <footer className="mt-64 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </div>
            <span className="text-[10px] tracking-widest uppercase opacity-40 mt-8 font-bold">View More Looks</span>
        </footer>
      </main>
    </div>
  );
}
