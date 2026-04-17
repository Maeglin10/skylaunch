import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumBakery() {
  return (
    <div className="bg-[#fcf8f2] text-[#4a3b32] min-h-screen font-serif selection:bg-[#4a3b32] selection:text-[#fcf8f2]">
      {/* HEADER DIV */}
      <header className="px-8 py-8 flex justify-between items-center max-w-6xl mx-auto border-b border-[#4a3b32]/10 relative z-50">
        <nav className="hidden md:flex gap-8 font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#4a3b32]/70">
            <Link href="#" className="hover:text-[#4a3b32] transition-colors">Menu</Link>
            <Link href="#" className="hover:text-[#4a3b32] transition-colors">Locations</Link>
        </nav>
        <Link href="/" className="font-extrabold text-3xl tracking-tighter uppercase mx-auto md:mx-0">Lumière</Link>
        <button className="font-sans font-bold text-xs uppercase tracking-[0.2em] border border-[#4a3b32] px-6 py-2 hover:bg-[#4a3b32] hover:text-[#fcf8f2] transition-colors hidden md:block">Order Online</button>
      </header>

      {/* HERO HERO */}
      <section className="relative w-full max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex-1 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-normal mb-8 leading-[0.9] italic text-[#4a3b32]">Artisanal.<br/>Every Day.</h1>
            <p className="font-sans text-sm tracking-widest uppercase leading-loose text-[#4a3b32]/60 max-w-sm mx-auto md:mx-0 mb-12">
                Handcrafted pastries and sourdough breads baked fresh every morning in the heart of Paris.
            </p>
            <Link href="#" className="inline-block font-sans font-bold text-xs uppercase tracking-[0.3em] border-b-2 border-[#4a3b32] pb-1 hover:opacity-60 transition-opacity">Explore Our Bread</Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="flex-1 w-full relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-t-[15rem] overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1549926868-b3d90737a4e6?auto=format&fit=crop&q=80&w=1000" alt="Bread" fill className="object-cover" />
            </div>
            {/* FLOATING BADGE */}
            <div className="absolute top-1/2 -left-8 md:-left-16 transform -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center text-center shadow-xl border border-[#4a3b32]/10 rotate-12">
                <span className="font-black text-sm uppercase tracking-widest text-[#4a3b32] leading-tight">Est.<br/>1984</span>
            </div>
        </motion.div>
      </section>
    </div>
  );
}
