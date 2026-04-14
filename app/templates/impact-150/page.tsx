"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function CyberAestheticShop() {
  return (
    <div className="premium-theme bg-[#030303] text-[#00ffcc] min-h-screen font-mono selection:bg-[#00ffcc] selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center border-b border-[#00ffcc]/10 bg-black/80 backdrop-blur-xl">
        <Link href="/" className="text-xl font-bold tracking-tighter text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]">NEON_UNIT.v1</Link>
        <div className="flex gap-8 text-[10px] tracking-widest uppercase opacity-60"><span>Apparel</span><span>Hardware</span><span>Cart[0]</span></div>
      </nav>

      <main className="pt-32 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 mb-12 opacity-40 text-[10px] uppercase tracking-[0.4em]">
            <div className="w-12 h-[1px] bg-[#00ffcc]" /> 
            System.Active // Connection: Secured
          </motion.div>

          <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white mb-8 italic">WEAR THE<br/><span className="text-[#00ffcc] drop-shadow-[0_0_20px_rgba(0,255,204,0.3)]">FUTURE.</span></h1>
              <p className="text-sm opacity-40 max-w-sm mb-12 leading-relaxed">High-performance technical wear engineered for the sprawl. Reinforced fibers, climate-synced mesh, and encrypted pockets.</p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-[#00ffcc] text-black font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_40px_rgba(0,255,204,0.4)] transition-all">Equip Now</button>
                <button className="px-8 py-4 border border-[#00ffcc]/20 text-[#00ffcc] font-bold uppercase tracking-widest text-xs hover:border-[#00ffcc] transition-colors">Databank</button>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className="relative aspect-square">
              <div className="absolute inset-0 bg-[#00ffcc]/10 blur-[100px]" />
              <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" alt="Cyber Model" fill className="object-cover rounded-3xl opacity-80" />
              <div className="absolute -bottom-6 -right-6 p-6 bg-black border border-[#00ffcc]/30 rounded-2xl shadow-2xl">
                <div className="text-[10px] opacity-40 mb-2 uppercase tracking-widest">Current Batch</div>
                <div className="text-xl font-bold">X-9 SHELL</div>
                <div className="text-[#00ffcc] text-xs font-bold mt-1">AVAILABLE</div>
              </div>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group relative aspect-[3/4] border border-[#00ffcc]/10 overflow-hidden rounded-2xl cursor-pointer">
                <Image src={`https://images.unsplash.com/photo-${i === 1 ? '1509631179647-0177331693ae' : i === 2 ? '1541643600914-78b084683601' : '1544636331-e26879cd4d9b'}?auto=format&fit=crop&q=80&w=600`} alt="Product" fill className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="text-[10px] opacity-40 mb-1 tracking-widest uppercase">Protocol {i}</div>
                  <div className="text-lg font-bold text-white uppercase italic">Neural Sync v.{i}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
