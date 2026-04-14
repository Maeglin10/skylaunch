"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SERVICES = [
  { id: "01", title: "Brand Identity", desc: "Crafting distinct visual worlds.", color: "bg-rose-500", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800" },
  { id: "02", title: "Web Architecture", desc: "Engineered for speed and wonder.", color: "bg-indigo-500", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" },
  { id: "03", title: "Digital Craft", desc: "Elevating every touchpoint.", color: "bg-emerald-500", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
];

export default function AgencyServicesDiagonal() {
  return (
    <div className="premium-theme bg-[#0d0d0d] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-black/40 backdrop-blur-xl">
        <Link href="/" className="text-lg font-black tracking-tighter uppercase italic">OBLIQ_STUDIO</Link>
        <span className="text-[10px] tracking-widest uppercase opacity-40">Services v.2026</span>
      </nav>

      <main className="pt-40">
        <header className="px-8 pb-32 max-w-5xl">
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.8] uppercase italic mb-12">Beyond<br/>the Norm.</motion.h1>
            <p className="text-xl md:text-2xl opacity-40 leading-relaxed font-light italic">We don't just build websites. We design digital systems that command attention and drive visceral engagement.</p>
        </header>

        <div className="space-y-0">
            {SERVICES.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="relative h-[60vh] md:h-[80vh] group overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000">
                        <Image src={s.img} alt={s.title} fill className="object-cover" />
                    </div>
                    
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                    <div className="relative h-full flex flex-col justify-end p-8 md:p-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <span className={`text-[10px] font-black tracking-widest uppercase px-4 py-1 ${s.color} text-white rounded-full inline-block mb-6`}>{s.id} // Process</span>
                                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">{s.title}</h2>
                            </div>
                            <p className="max-w-xs text-lg opacity-60 leading-relaxed italic">{s.desc}</p>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/templates/impact-154`} className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </motion.div>
            ))}
        </div>
      </main>
    </div>
  );
}
