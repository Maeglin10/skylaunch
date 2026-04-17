import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumInterior() {
  return (
    <div className="bg-[#f0ece6] text-[#4a4a4a] min-h-screen font-serif selection:bg-[#c9b29b] selection:text-white">
      {/* HEADER */}
      <header className="px-6 py-6 md:px-12 flex justify-between items-center absolute w-full top-0 z-50">
        <Link href="/" className="text-2xl font-normal tracking-[0.2em] uppercase text-[#333]">Vela.</Link>
        <nav className="hidden md:flex gap-12 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            <Link href="#" className="hover:text-[#c9b29b] transition-colors">Projects</Link>
            <Link href="#" className="hover:text-[#c9b29b] transition-colors">Studio</Link>
            <Link href="#" className="hover:text-[#c9b29b] transition-colors">Journal</Link>
        </nav>
        <button className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase border-b border-[#333] pb-1 hover:text-[#c9b29b] hover:border-[#c9b29b] transition-colors">Inquire</button>
      </header>

      {/* HERO HERO */}
      <section className="h-screen flex flex-col md:flex-row border-b border-[#ddd] overflow-hidden">
        <div className="flex-1 flex flex-col justify-center px-8 py-24 md:p-24 bg-[#f0ece6] relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <h1 className="text-5xl md:text-[6vw] font-light leading-[1.1] mb-8 text-[#333]">Curating<br/><i className="text-[#c9b29b]">quiet</i> spaces.</h1>
                <p className="font-sans text-xs md:text-sm tracking-widest max-w-sm mb-12 uppercase leading-loose text-gray-500">
                    A multi-disciplinary interior architecture studio based in Milan, focusing on raw materials and natural light.
                </p>
                <Link href="#" className="inline-flex items-center gap-4 text-xs font-sans font-bold tracking-[0.2em] uppercase hover:gap-6 transition-all">
                    View Portfolio <span className="w-12 h-px bg-[#4a4a4a]"></span>
                </Link>
            </motion.div>
        </div>
        <div className="flex-1 relative w-full h-full min-h-[50vh]">
            <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" alt="Interior" fill className="object-cover" />
        </div>
      </section>

      {/* PROJECT PREVIEW */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#333]">Selected Works</h2>
            <Link href="#" className="text-xs font-sans font-bold tracking-[0.2em] uppercase underline hover:text-[#c9b29b] transition-colors">All Projects</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {[
                { title: "The Alpine Retreat", cat: "Residential", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000" },
                { title: "Maison V", cat: "Commercial", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000" }
            ].map((proj, i) => (
                <div key={i} className={`group cursor-pointer ${i === 1 ? 'md:mt-32' : ''}`}>
                    <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#e0dcd6]">
                        <Image src={proj.img} alt={proj.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                        <div className="absolute inset-0 bg-[#c9b29b]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-normal text-[#333] group-hover:italic transition-all">{proj.title}</h3>
                        <div className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400">{proj.cat}</div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
