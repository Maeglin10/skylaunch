import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumFestival() {
  return (
    <div className="bg-[#090014] text-white min-h-screen font-sans selection:bg-[#00f3ff] selection:text-black overflow-hidden relative">
      {/* VIBRANT GLOW ACCENTS */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-[#9d00ff]/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#00f3ff]/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      {/* HEADER */}
      <header className="px-6 py-6 md:px-12 flex justify-between items-center relative z-50">
        <div className="text-3xl font-black uppercase tracking-tighter italic text-[#00f3ff]">ECHO<span className="text-[#9d00ff]">STATE</span></div>
        <button className="bg-[#00f3ff] text-black px-6 py-3 font-black uppercase tracking-widest text-xs skew-x-[-15deg] hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]">
            <span className="block skew-x-[15deg]">Get Tickets</span>
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 flex flex-col justify-center items-center h-[90vh]">
        <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute inset-0 z-0">
             <Image src="https://images.unsplash.com/photo-1540039155732-68473678c96e?auto=format&fit=crop&q=80&w=2000" alt="Concert" fill className="object-cover opacity-40 mix-blend-color-dodge grayscale" />
        </motion.div>
        
        <div className="relative z-10 text-center w-full max-w-5xl">
            <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter mb-8">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] block">Frequencies</span>
                Unite Us.
            </motion.h1>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 font-bold uppercase tracking-[0.2em] text-xs mb-12">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse"></span> Aug 14-16, 2026</div>
                <div className="hidden md:block w-px h-6 bg-white/20"></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#9d00ff]"></span> Ibiza, Spain</div>
            </motion.div>

            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}>
                <p className="font-bold uppercase tracking-widest text-sm text-white/50 mb-4">Phase 1 Lineup Includes:</p>
                <div className="text-xl md:text-3xl font-black uppercase tracking-tighter text-[#00f3ff] inline-block filter drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">
                    Daft System / Neon Cult / Acid Rain / Voidwalker
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
