import { motion } from "framer-motion";
import Link from "next/link";
import "../premium.css";

export default function PremiumWebAgency() {
  return (
    <div className="bg-[#e9e9e9] text-[#111111] min-h-screen font-sans">
      {/* HEADER */}
      <header className="px-6 py-6 border-b border-[#111111]/10 flex justify-between items-center sticky top-0 bg-[#e9e9e9]/80 backdrop-blur-md z-50">
        <div className="font-black text-xl tracking-tighter uppercase">Onix Studio.</div>
        <button className="w-12 h-12 bg-[#111111] text-white rounded-full flex items-center justify-center font-bold text-lg hover:scale-110 transition-transform">
            M
        </button>
      </header>

      {/* HERO HERO */}
      <section className="px-6 py-32 flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="inline-block px-4 py-2 border border-[#111111]/20 rounded-full text-xs font-bold uppercase tracking-widest mb-12 shadow-sm bg-white">Digital Craftsmanship</div>
            
            <h1 className="text-5xl md:text-[8vw] font-black tracking-tighter leading-[0.9] mb-8 uppercase">
                We design<br/>
                <span className="text-gray-400">digital</span> futures.
            </h1>
            
            <p className="text-lg md:text-xl font-medium text-gray-500 max-w-xl mx-auto mb-16 leading-relaxed">
                An independent design and development studio pushing the boundaries of web experiences.
            </p>
            
            <div className="relative inline-flex group cursor-pointer">
                <div className="absolute inset-0 bg-[#111111] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <button className="relative bg-[#111111] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-4 transition-transform group-hover:scale-[1.02]">
                    Start a project <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                </button>
            </div>
        </motion.div>
      </section>

      {/* PROJECT SHOWCASE STRIP */}
      <section className="py-24 border-t border-[#111111]/10 bg-white">
        <div className="marquee-container overflow-hidden whitespace-nowrap flex text-[10vw] font-black uppercase tracking-tighter text-gray-200">
            <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="flex gap-8">
                <span>Selected Works — Selected Works — Selected Works — </span>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
