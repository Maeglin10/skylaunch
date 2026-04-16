import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialConstruction() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans">
      {/* HEADER DIV */}
      <header className="bg-zinc-900 text-white flex justify-between items-center p-6 border-b-4 border-yellow-500">
        <div className="font-black text-2xl tracking-tighter uppercase italic">IronClad Build</div>
        <nav className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-widest text-zinc-400">
            <Link href="#" className="hover:text-yellow-500 transition">Projects</Link>
            <Link href="#" className="hover:text-yellow-500 transition">Services</Link>
            <Link href="#" className="hover:text-yellow-500 transition">About</Link>
        </nav>
        <button className="bg-yellow-500 text-zinc-900 px-6 py-2 font-black uppercase text-sm hover:bg-yellow-400 transition">Get a Quote</button>
      </header>

      {/* HERO HERO */}
      <section className="relative px-6 py-24 md:py-32 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" alt="Construction Site" fill className="object-cover opacity-30 mix-blend-luminosity" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
                <div className="w-16 h-2 bg-yellow-500 mb-6"></div>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-6">Building<br/>The Future,<br/>On Solid Ground.</h1>
                <p className="text-zinc-400 text-lg mb-8 max-w-md">Commercial and industrial construction with uncompromising standards for quality and safety since 1998.</p>
                <button className="bg-yellow-500 text-zinc-900 px-8 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors">Our Projects</button>
            </div>
            <div className="flex-1 w-full relative aspect-square border-8 border-zinc-800 hidden md:block">
                <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" alt="Worker" fill className="object-cover" />
            </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 px-6 bg-zinc-100">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Core Capabilities</h2>
                <p className="text-zinc-600 max-w-2xl mx-auto">We bring decades of experience to every phase of commercial development.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "General Contracting", desc: "Full-service project management from concept to completion." },
                    { title: "Design-Build", desc: "Integrated architecture and construction for faster delivery." },
                    { title: "Heavy Civil", desc: "Infrastructure, earthwork, and foundational engineering." }
                ].map((serv, i) => (
                    <div key={i} className="bg-white p-8 border-t-4 border-zinc-200 hover:border-yellow-500 transition-colors group cursor-pointer shadow-sm">
                        <div className="text-4xl font-black text-zinc-200 mb-4 group-hover:text-yellow-500 transition-colors">0{i+1}</div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">{serv.title}</h3>
                        <p className="text-zinc-600">{serv.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
