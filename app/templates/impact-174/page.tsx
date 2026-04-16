import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialFitness() {
  return (
    <div className="bg-[#0b0c10] text-[#c5c6c7] min-h-screen font-sans">
      {/* HEADER DIV */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-3xl font-black text-[#66fcf1] tracking-wider uppercase italic">Apex</Link>
        <button className="border-2 border-[#66fcf1] text-[#66fcf1] px-6 py-2 uppercase tracking-widest text-xs font-bold hover:bg-[#66fcf1] hover:text-[#0b0c10] transition-colors">Join Now</button>
      </header>

      {/* HERO HERO */}
      <section className="relative px-6 py-32 md:py-48 flex items-center justify-center text-center min-h-[90vh]">
        <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" alt="Gym" fill className="object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] to-transparent"></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">Forge<br/>Your Legacy.</h1>
            <p className="text-xl md:text-2xl font-light max-w-xl mx-auto mb-10">Premium equipment. Elite coaching. A culture of pure progression.</p>
            <button className="bg-[#66fcf1] text-[#0b0c10] px-12 py-4 text-lg font-black uppercase tracking-widest hover:scale-105 transition-transform">Start Free Trial</button>
        </motion.div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-24 px-6 bg-[#0b0c10] relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { title: "Strength", desc: "State-of-the-art free weights, Olympic lifting platforms, and power racks." },
                { title: "Conditioning", desc: "High-intensity turf zones, rowers, and advanced functional training tools." },
                { title: "Recovery", desc: "Cold plunges, infrared saunas, and mobility spaces to rebuild." }
            ].map((pillar, i) => (
                <div key={i} className="text-center group">
                    <div className="w-20 h-20 mx-auto bg-[#1f2833] text-[#66fcf1] flex items-center justify-center rounded-full text-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-[#66fcf1]/10">0{i+1}</div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{pillar.title}</h3>
                    <p className="text-[#c5c6c7] leading-relaxed">{pillar.desc}</p>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
