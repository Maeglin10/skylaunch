import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumFragrance() {
  return (
    <div className="bg-[#0f0e0c] text-[#f2edd9] min-h-screen font-serif selection:bg-[#d4af37] selection:text-[#0f0e0c]">
      {/* HEADER */}
      <header className="px-6 py-6 md:px-12 flex justify-between items-center relative z-50">
        <nav className="hidden md:flex gap-8 font-sans font-bold text-[9px] tracking-[0.3em] uppercase text-[#a39e8c]">
            <Link href="#" className="hover:text-[#d4af37] transition">Collections</Link>
            <Link href="#" className="hover:text-[#d4af37] transition">Maison</Link>
        </nav>
        <Link href="/" className="text-3xl font-light tracking-[0.1em] uppercase mx-auto md:mx-0 text-center">
            Aurae
        </Link>
        <div className="hidden md:flex gap-8 font-sans font-bold text-[9px] tracking-[0.3em] uppercase text-[#a39e8c] items-center">
            <Link href="#" className="hover:text-[#d4af37] transition">Search</Link>
            <Link href="#" className="hover:text-[#d4af37] transition">Cart (0)</Link>
        </div>
      </header>

      {/* LUXURY HERO */}
      <section className="relative px-6 py-12 md:py-0 md:-mt-24 h-auto md:h-screen flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37] opacity-[0.03] blur-[100px] rounded-full"></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 w-full max-w-sm aspect-[3/4] md:h-[60vh] md:w-auto md:aspect-auto mx-auto mb-12 border border-[#d4af37]/20 p-2 md:p-4 rounded-t-[10rem]">
            <div className="relative w-full h-full rounded-t-[10rem] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000" alt="Perfume Bottle" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c] to-transparent"></div>
            </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="relative z-10 -mt-24 md:-mt-32">
            <h1 className="text-6xl md:text-[8vw] font-light italic tracking-tight leading-none mb-6 text-[#d4af37]">L'Essence.</h1>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#a39e8c] max-w-xs mx-auto leading-relaxed mb-8">
                The new signature autumn collection. Notes of dark amber, vetiver, and smoked vanilla.
            </p>
            <button className="font-sans font-bold text-[9px] uppercase tracking-[0.3em] border border-[#d4af37]/30 px-10 py-4 hover:bg-[#d4af37] hover:text-[#0f0e0c] transition-colors duration-500">Discover Now</button>
        </motion.div>
      </section>
    </div>
  );
}
