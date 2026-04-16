import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialEvent() {
  return (
    <div className="bg-[#5e35b1] text-white min-h-screen font-sans selection:bg-[#ffb300] selection:text-black">
      {/* HEADER */}
      <header className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/20">
        <div className="text-2xl font-black uppercase tracking-widest text-[#ffb300]">SYNTHESE<span className="text-white">26</span></div>
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest">
            <Link href="#" className="hover:text-[#ffb300] transition">Speakers</Link>
            <Link href="#" className="hover:text-[#ffb300] transition">Schedule</Link>
            <Link href="#" className="hover:text-[#ffb300] transition">Location</Link>
        </nav>
        <button className="bg-[#ffb300] text-black px-6 py-3 font-black uppercase tracking-widest text-xs hover:bg-white transition shadow-xl">Buy Tickets</button>
      </header>

      {/* HERO HERO */}
      <section className="px-6 py-20 md:py-32 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block border border-white/30 rounded-full px-6 py-2 text-sm font-bold tracking-widest uppercase mb-8 bg-white/10 backdrop-blur-md">
                October 12-14, 2026 • Paris, France
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">The Future of<br/><span className="text-[#ffb300]">Digital Design.</span></h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12 opacity-90">Join 2,000+ creators, engineers, and visionaries for three days of keynotes, workshops, and networking.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <button className="bg-[#ffb300] text-black px-10 py-4 font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform h-14 flex items-center justify-center">Get Your Pass</button>
                <button className="border-2 border-white text-white px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors h-14 flex items-center justify-center">View Agenda</button>
            </div>
        </motion.div>
      </section>

      {/* SPEAKERS GRID */}
      <section className="bg-white text-black py-24 px-6 rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">Featured Speakers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { name: "Elena Rostova", role: "Design Lead, Vercel", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
                    { name: "Marcus Chen", role: "Founder, Frame", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
                    { name: "Sophia Martinez", role: "Creative Dir, Studio", img: "https://images.unsplash.com/photo-1531123897727-8f129e1eb1df?auto=format&fit=crop&q=80&w=400" },
                    { name: "David Kim", role: "Principal Engineer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
                ].map((speaker, i) => (
                    <div key={i} className="group">
                        <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-100">
                            <Image src={speaker.img} alt={speaker.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                        </div>
                        <h3 className="font-black text-xl mb-1">{speaker.name}</h3>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{speaker.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
