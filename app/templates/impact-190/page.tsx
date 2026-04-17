import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumGamingStudio() {
  return (
    <div className="bg-[#050505] text-[#F3F4F6] min-h-screen font-sans selection:bg-[#FF003C] selection:text-white">
      {/* GLITCH MASK BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FF003C 0%, transparent 40%)' }}></div>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,0,60,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,60,0.1)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

      {/* HEADER */}
      <header className="px-8 py-6 flex justify-between items-center relative z-50 border-b border-white/10 glass">
        <Link href="/" className="font-black text-2xl tracking-[0.2em] text-white">NEXUS<span className="text-[#FF003C]">_</span></Link>
        <nav className="hidden md:flex gap-8 font-bold text-xs uppercase tracking-[0.3em] text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Games</Link>
            <Link href="#" className="hover:text-white transition-colors">Studio</Link>
            <Link href="#" className="hover:text-white transition-colors">Careers</Link>
        </nav>
        <button className="bg-[#FF003C] text-white px-6 py-2 font-bold text-xs uppercase tracking-[0.2em] skew-x-[-10deg] hover:bg-white hover:text-black transition-colors">
            <span className="block skew-x-[10deg]">Play Now</span>
        </button>
      </header>

      {/* HERO HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-8 md:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000" alt="Cyberpunk" fill className="object-cover opacity-30 mix-blend-luminosity grayscale" />
        </div>
        
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="relative z-10 w-full max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-[#FF003C]"></div>
                <div className="font-bold text-[10px] uppercase tracking-[0.4em] text-[#FF003C]">Protocol Initiated</div>
            </div>
            <h1 className="text-6xl md:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter mb-8 group">
                Enter The<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 relative">
                    Simulation.
                </span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-400 max-w-lg mb-10 leading-relaxed uppercase tracking-widest text-[10px]">
                AAA studio developing hyper-realistic immersive experiences for the next generation of hardware.
            </p>
            <div className="flex gap-6">
                <button className="border-2 border-[#FF003C] bg-[#FF003C]/10 text-white px-10 py-4 font-bold text-xs uppercase tracking-[0.2em] skew-x-[-15deg] hover:bg-[#FF003C] transition-all group backdrop-blur-sm shadow-[0_0_20px_rgba(255,0,60,0.3)]">
                    <span className="block skew-x-[15deg]">Watch Trailer</span>
                </button>
            </div>
        </motion.div>
      </section>

      {/* FEATURES / GAMES GIRD */}
      <section className="py-24 px-8 max-w-[1600px] mx-auto relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "Neon Shift", typ: "RPG / Action", desc: "Open-world cybernetic rebellion." },
                { title: "Void Walker", typ: "Survival", desc: "Zero-gravity psychological horror." },
                { title: "Aether Strike", typ: "FPS / Esport", desc: "Tactical class-based competitive." }
            ].map((game, i) => (
                <div key={i} className="group relative border border-white/10 bg-white/5 p-8 overflow-hidden hover:border-[#FF003C]/50 transition-colors cursor-pointer">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FF003C] to-transparent opacity-0 group-hover:opacity-20 transition-opacity blur-2xl"></div>
                    <div className="font-bold text-[10px] uppercase tracking-[0.3em] text-[#FF003C] mb-2">{game.typ}</div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{game.title}</h3>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">{game.desc}</p>
                    <div className="w-12 h-1 bg-white/20 group-hover:bg-[#FF003C] group-hover:w-24 transition-all duration-300"></div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
