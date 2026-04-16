import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialNonprofit() {
  return (
    <div className="bg-[#FAF8F5] text-[#2c3e50] min-h-screen font-serif flex flex-col">
      {/* HEADER */}
      <header className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="font-black text-2xl tracking-tighter text-[#27ae60]">HopeFoundation.</div>
        <nav className="hidden md:flex gap-8 font-bold text-sm tracking-widest uppercase">
            <Link href="#" className="hover:text-[#27ae60] transition-colors">Our Mission</Link>
            <Link href="#" className="hover:text-[#27ae60] transition-colors">Projects</Link>
            <Link href="#" className="hover:text-[#27ae60] transition-colors">News</Link>
        </nav>
        <button className="bg-[#27ae60] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#219653] transition-colors">Donate</button>
      </header>

      {/* BIG HERO IMAGE */}
      <section className="px-4 py-8 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-[2rem] overflow-hidden flex items-end p-8 md:p-16 text-white text-center md:text-left shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000" alt="Charity" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-3xl">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-[1.1]">Education changes everything.</h1>
                <p className="text-lg md:text-xl font-sans font-light mb-8 max-w-xl">We believe every child deserves access to quality education. Join us in building schools and opportunities in underserved communities.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start font-sans">
                    <button className="bg-[#27ae60] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#219653] transition-colors">Give Monthly</button>
                    <button className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#2c3e50] transition-colors">Learn More</button>
                </div>
            </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-white py-16 px-6 font-sans border-y border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
                { num: "50+", text: "Schools Built" },
                { num: "12,000", text: "Children Reached" },
                { num: "15", text: "Countries" },
                { num: "98%", text: "Funds go directly to programs" }
            ].map((stat, i) => (
                <div key={i}>
                    <div className="text-4xl md:text-5xl font-black text-[#27ae60] mb-2">{stat.num}</div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.text}</div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
