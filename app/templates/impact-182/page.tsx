import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumHotel() {
  return (
    <div className="bg-[#FAF9F6] text-[#2c3e50] min-h-screen font-serif selection:bg-[#2c3e50] selection:text-[#FAF9F6]">
      {/* FIXED HEADER */}
      <header className="fixed w-full z-50 p-8 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="text-2xl font-normal tracking-widest uppercase">The Grand.</Link>
        <button className="text-xs uppercase tracking-[0.3em] font-bold border-b border-white pb-1">Menu</button>
      </header>

      {/* HERO HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1542314831-c6a4d42171ae?auto=format&fit=crop&q=80&w=2000" alt="Hotel Interior" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>
        
        <div className="relative z-10 text-center text-[#FAF9F6] px-4">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="text-6xl md:text-[8vw] font-normal tracking-tighter leading-none mb-8">Refined Elegance.</motion.h1>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="border border-white/50 px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors backdrop-blur-sm">Reserve Your Stay</motion.button>
        </div>
      </section>

      {/* INTRO PARALLAX TEXT */}
      <section className="py-32 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-light leading-relaxed mb-12">"A sanctuary of quiet luxury where classic architecture meets contemporary comfort."</h2>
        <div className="w-px h-24 bg-[#2c3e50] mx-auto opacity-30"></div>
      </section>

      {/* ROOMS SHOWCASE */}
      <section className="px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative aspect-[3/4] w-full max-w-md mx-auto md:mr-0 group overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800" alt="Suite" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="order-1 md:order-2 max-w-sm md:ml-16">
                <div className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">Signature Suites</div>
                <h3 className="text-4xl md:text-5xl font-normal mb-6">The Panorama.</h3>
                <p className="text-gray-600 leading-relaxed font-sans font-light mb-8">Floor-to-ceiling windows offering breathtaking city views, curated mid-century furnishings, and an oversized soaking tub.</p>
                <button className="text-xs uppercase tracking-[0.3em] font-bold border-b border-[#2c3e50] pb-1 hover:text-gray-500 transition-colors">Discover More</button>
            </div>
        </div>
      </section>
    </div>
  );
}
