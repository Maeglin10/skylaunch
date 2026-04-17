import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumFashion() {
  return (
    <div className="bg-[#EBE9E4] text-[#1D1D1B] min-h-screen font-serif selection:bg-[#1D1D1B] selection:text-[#EBE9E4]">
      {/* HEADER */}
      <header className="px-8 py-8 flex justify-between items-center max-w-screen-2xl mx-auto mix-blend-difference text-white z-50 relative">
        <nav className="hidden md:flex gap-8 text-xs font-sans font-bold uppercase tracking-[0.2em]">
            <Link href="#" className="hover:opacity-50 transition">Shop</Link>
            <Link href="#" className="hover:opacity-50 transition">Collections</Link>
        </nav>
        <Link href="/" className="text-4xl font-black uppercase tracking-tighter mix-blend-difference">V E L M A</Link>
        <nav className="flex gap-8 text-xs font-sans font-bold uppercase tracking-[0.2em]">
            <Link href="#" className="hover:opacity-50 transition hidden md:block">Account</Link>
            <Link href="#" className="hover:opacity-50 transition">Bag (0)</Link>
        </nav>
      </header>

      {/* MASSIVE HERO */}
      <section className="relative px-4 pb-12 -mt-24 h-screen flex flex-col justify-end">
        <div className="absolute inset-4 z-0 pointer-events-none">
             <Image src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000" alt="Fashion" fill className="object-cover rounded-xl" />
        </div>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative z-10 text-center w-full">
            <h1 className="text-[12vw] font-black uppercase tracking-tighter text-white mix-blend-overlay leading-none mb-4">SS '26</h1>
        </motion.div>
      </section>

      {/* EDITORIAL GRID */}
      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-start mb-24 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-light italic leading-snug">"A study in contrasts: delicate silks bound by rigid architectural forms."</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-5 md:col-start-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg group">
                    <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000" alt="Editorial" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-4 md:col-start-8 flex flex-col justify-center">
                <div className="text-xs font-sans font-bold uppercase tracking-[0.3em] mb-4 text-gray-500">Look 01</div>
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">The Structured Coat</h3>
                <p className="font-light italic text-gray-600 mb-8 max-w-sm">Crafted from heavy wool blend, featuring exaggerated shoulders and a cinched waist silhouette.</p>
                <Link href="#" className="font-sans font-bold uppercase tracking-widest text-xs border-b border-[#1D1D1B] pb-1 w-max hover:text-gray-500 hover:border-gray-500 transition-colors">Shop the look</Link>
             </motion.div>
        </div>
      </section>
    </div>
  );
}
