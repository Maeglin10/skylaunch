"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function SustainableArchOnePage() {
  return (
    <div className="premium-theme bg-[#f2f4f1] text-[#2d3a2d] min-h-screen font-sans selection:bg-[#2d3a2d] selection:text-[#f2f4f1]">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-[#f2f4f1]/80 backdrop-blur-xl border-b border-[#2d3a2d]/5">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1a2e1a]">BIO_FORM</Link>
        <div className="flex gap-8 text-[10px] tracking-widest uppercase font-bold opacity-60"><span>Research</span><span>Projects</span><span>Atelier</span></div>
      </nav>

      <main className="pt-40">
        <section className="px-8 pb-32 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-32">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                    <span className="text-emerald-700 text-xs tracking-[0.5em] uppercase block mb-8 font-bold">Climate-Adaptive Systems</span>
                    <h1 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.8] uppercase italic mb-12">Built<br/><span className="text-emerald-700">to Breath.</span></h1>
                    <p className="text-xl opacity-60 leading-relaxed font-light italic max-w-md">Integrating living ecosystems with high-performance structural engineering to create architecture that heals.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200" alt="Sustainable Building" fill className="object-cover" />
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Solar Thermal Grid", metric: "100%", desc: "Renewable energy autonomy.", img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800" },
                    { title: "Vertical Biome", metric: "42k", desc: "Native plant integration.", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800" },
                    { title: "Resource Loop", metric: "Zero", desc: "Waste-to-energy circularity.", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" }
                ].map((feature, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="group">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-xl">
                            <Image src={feature.img} alt={feature.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-[#1a2e1a]/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter uppercase italic mb-2">{feature.title}</h3>
                        <p className="text-xs opacity-50 tracking-widest uppercase mb-4">{feature.desc}</p>
                        <div className="text-4xl font-black text-emerald-700">{feature.metric}</div>
                    </motion.div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}
