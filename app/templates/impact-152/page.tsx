"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function TravelMagazine() {
  return (
    <div className="premium-theme bg-[#fdfdfc] text-[#1a1a1a] min-h-screen font-serif selection:bg-black selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-end border-b border-black/5 bg-white/60 backdrop-blur-xl">
        <div>
            <Link href="/" className="text-3xl font-black tracking-tighter uppercase italic">Wanderer.</Link>
            <div className="text-[8px] tracking-[0.4em] uppercase opacity-40 mt-1">International Edition // No. 152</div>
        </div>
        <div className="flex gap-12 text-[10px] tracking-widest uppercase font-bold opacity-60">
            <span>Stories</span><span>Archive</span><span>Print</span>
        </div>
      </nav>

      <main className="pt-48 px-8 pb-32 max-w-7xl mx-auto">
        <header className="mb-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-12">
                <h1 className="text-7xl md:text-[13vw] font-black tracking-tighter leading-[0.85] uppercase italic">Into the<br/>Silent North.</h1>
                <div className="max-w-xs">
                    <p className="text-lg italic opacity-60 leading-relaxed mb-8">Exploring the remote archipelagos of Svalbard as the midnight sun begins its descent.</p>
                    <span className="text-xs font-bold tracking-widest uppercase pb-1 border-b-2 border-black">Read Feature</span>
                </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1517090504586-3bf49cf204e3?auto=format&fit=crop&q=80&w=2000" alt="Arctic Landscape" fill className="object-cover" />
            </motion.div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { title: "The Salt Flats", cat: "Bolivia", img: "https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=800" },
                { title: "Neon Tokyo", cat: "Japan", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800" },
                { title: "Fjord Serene", cat: "Norway", img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&q=80&w=800" }
            ].map((article, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-xl">
                        <Image src={article.img} alt={article.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase opacity-40 block mb-2">{article.cat}</span>
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic group-hover:text-amber-600 transition-colors">{article.title}</h3>
                </motion.div>
            ))}
        </section>
      </main>
    </div>
  );
}
