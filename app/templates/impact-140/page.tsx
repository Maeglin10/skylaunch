"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function TravelHeroCarousel() {
  return (
    <div className="premium-theme bg-[#0d1117] text-white min-h-screen font-sans selection:bg-amber-400 selection:text-black">
      <div className="absolute inset-0 h-screen">
        <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1600" alt="Travel" fill className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/40 via-transparent to-[#0d1117]" />
      </div>
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-light tracking-[0.4em] uppercase">Wanderlust</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-50"><span>Destinations</span><span>Experiences</span></div>
      </nav>
      <header className="relative h-screen flex items-center justify-center text-center px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          <span className="text-amber-400 text-xs tracking-[1em] uppercase block mb-8">Curated Journeys</span>
          <h1 className="text-6xl md:text-[10vw] font-extralight tracking-wide mb-8">Discover<br/>the Unknown</h1>
          <p className="text-sm opacity-40 max-w-md mx-auto mb-10">Bespoke travel experiences designed for the curious soul.</p>
          <button className="px-10 py-5 bg-amber-400 text-black text-xs font-semibold tracking-[0.4em] uppercase hover:bg-amber-300 transition-colors rounded-full">Plan Your Journey</button>
        </motion.div>
      </header>
      <section className="relative z-10 px-6 md:px-16 pb-32 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Santorini", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600", from: "$2,400" },
            { title: "Kyoto", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600", from: "$3,100" },
            { title: "Patagonia", img: "https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&q=80&w=600", from: "$4,800" },
          ].map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-5">
                <Image src={d.img} alt={d.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-light tracking-wider mb-1">{d.title}</h3>
                  <span className="text-xs opacity-60">From {d.from}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
