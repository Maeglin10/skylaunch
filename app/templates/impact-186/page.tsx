import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumArchitecture() {
  return (
    <div className="bg-[#f0f0f0] text-[#111] min-h-screen font-sans uppercase">
      {/* HEADER */}
      <header className="px-8 py-8 flex justify-between items-center z-50 relative">
        <div className="font-bold tracking-tighter text-2xl">Archi<span className="opacity-50">Tectura</span></div>
        <nav className="flex gap-12 font-bold text-xs tracking-widest opacity-50">
            <Link href="#" className="hover:opacity-100 transition">Projects</Link>
            <Link href="#" className="hover:opacity-100 transition">Studio</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="px-8 pb-24 h-[85vh] flex flex-col justify-end relative">
         <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute bottom-8 left-8 right-8 h-[calc(85vh-4rem)] bg-black/5 z-0">
             <Image src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000" alt="Architecture" fill className="object-cover mix-blend-multiply opacity-50" />
         </motion.div>
         <div className="relative z-10 flex justify-between items-end pb-8">
             <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-[8vw] font-black leading-[0.8] tracking-tighter">Space &<br/>Structure.</motion.h1>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-xs font-bold tracking-widest max-w-[200px] text-right opacity-70">
                 Award-winning architectural design studio based in Copenhagen.
             </motion.div>
         </div>
      </section>

      {/* PROJECT GRID */}
      <section className="px-8 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#111]">
            {[
                { title: "The Vertex", loc: "Oslo, Norway", img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1000" },
                { title: "Lumina Pavilion", loc: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" },
                { title: "Nordic Museum", loc: "Stockholm, Sweden", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" },
                { title: "Aura Skyscraper", loc: "Dubai, UAE", img: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1000" }
            ].map((proj, i) => (
                <div key={i} className="group relative aspect-[4/3] bg-[#f0f0f0] overflow-hidden cursor-pointer p-8 flex flex-col justify-between">
                    <div className="absolute inset-0 z-0">
                        <Image src={proj.img} alt={proj.title} fill className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 transform" />
                    </div>
                    <div className="relative z-10 font-bold tracking-widest text-xs opacity-50 group-hover:text-white transition-colors delay-100">0{i+1}</div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black tracking-tighter mb-2 group-hover:text-white transition-colors">{proj.title}</h3>
                        <p className="text-xs font-bold tracking-widest opacity-50 group-hover:text-white transition-colors">{proj.loc}</p>
                    </div>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
}
