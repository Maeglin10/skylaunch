import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumMuseum() {
  return (
    <div className="bg-[#e4e2de] text-red-900 min-h-screen font-serif selection:bg-red-900 selection:text-[#e4e2de]">
      {/* SIDE HEADER */}
      <header className="fixed top-0 left-0 w-full md:w-24 md:h-screen border-b md:border-b-0 md:border-r border-red-900/20 bg-[#e4e2de] z-50 flex md:flex-col justify-between items-center p-6 md:py-12">
        <Link href="/" className="font-extrabold text-2xl tracking-tighter uppercase md:origin-center md:-rotate-90 md:mt-12">MoMA</Link>
        <button className="w-10 h-10 border border-red-900 flex flex-col justify-center gap-1.5 p-2 hover:bg-red-900 group transition-colors">
            <span className="w-full h-px bg-red-900 group-hover:bg-[#e4e2de]"></span>
            <span className="w-full h-px bg-red-900 group-hover:bg-[#e4e2de]"></span>
        </button>
        <div className="hidden md:block font-bold text-xs uppercase tracking-widest md:origin-center md:-rotate-90 md:mb-16">Tickets</div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-24 md:pt-0 md:pl-24">
        <section className="min-h-screen flex flex-col md:flex-row border-b border-red-900/20">
            <div className="flex-1 flex text-center md:text-left flex-col justify-center p-8 md:p-24 relative">
                <div className="absolute top-8 left-8 md:top-24 md:left-24 text-[10px] font-sans font-bold uppercase tracking-[0.3em] opacity-40">Current Exhibition</div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl lg:text-[9vw] font-black uppercase leading-[0.8] tracking-tighter mb-8 text-red-900">
                    Form<br/>& Chaos.
                </motion.h1>
                <p className="text-lg md:text-xl font-light italic opacity-70 max-w-sm mb-12 mx-auto md:mx-0">Explore the tension between structural design and organic breakdown in modern sculpture.</p>
                <div>
                   <button className="font-sans font-bold uppercase tracking-widest text-xs border-b-2 border-red-900 pb-1 hover:text-red-700 hover:border-red-700 transition-colors">Explore Gallery &rarr;</button>
                </div>
            </div>
            
            <div className="flex-1 relative border-t md:border-t-0 md:border-l border-red-900/20 bg-red-900 overflow-hidden group min-h-[500px]">
                <Image src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1000" alt="Sculpture" fill className="object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000" />
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 border-b border-red-900/20">
            {[
                { title: "Plan Your Visit", txt: "Open daily 10:30a - 5:30p. Free admission for members." },
                { title: "Membership", txt: "Join today for unlimited free admission and exclusive previews." },
                { title: "Collections", txt: "Browse over 200,000 works of modern and contemporary art." }
            ].map((block, i) => (
                <div key={i} className={`p-12 hover:bg-red-900 hover:text-[#e4e2de] transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-red-900/20 last:border-r-0`}>
                    <h3 className="font-bold uppercase tracking-widest text-lg mb-4">{block.title}</h3>
                    <p className="font-serif italic opacity-80">{block.txt}</p>
                </div>
            ))}
        </section>
      </main>
    </div>
  );
}
