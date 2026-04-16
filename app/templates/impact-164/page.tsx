import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialAgencyBW() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {/* HEADER BLOCK */}
      <header className="px-8 py-8 flex justify-between items-center border-b border-white/10">
        <div className="font-black text-2xl uppercase tracking-tighter">Onyx.</div>
        <button className="text-sm font-bold uppercase tracking-widest border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-colors rounded-sm">Contact</button>
      </header>

      {/* HERO BLOCK */}
      <section className="px-8 py-32 md:py-48 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">We build<br/><span className="text-white/40">digital products.</span></h1>
            <p className="text-xl md:text-3xl font-light text-white/60 max-w-2xl leading-snug mb-16">A lean design and engineering studio partnering with ambitious founders to launch market-defining software.</p>
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </div>
        </motion.div>
      </section>

      {/* SERVICES BLOCK */}
      <section className="border-t border-white/10 pt-32 pb-32 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">Our Capabilities</h2>
            </div>
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-12">
                {[
                    { title: "Product Strategy", desc: "User research, market analysis, and product roadmapping." },
                    { title: "UX/UI Design", desc: "Wireframing, prototyping, and high-fidelity interface design." },
                    { title: "Web Architecture", desc: "Scalable front-end systems with React, Next.js, and headless CMS." },
                    { title: "Brand Identity", desc: "Logo design, typographic systems, and visual guidelines." }
                ].map((s, i) => (
                    <div key={i}>
                        <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                        <p className="text-white/60 leading-relaxed font-light">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* SELECTED WORK BLOCK */}
      <section className="border-t border-white/10 pt-32 pb-32 px-8">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-16">Selected Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { client: "FinTech Platform", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
                    { client: "Healthcare App", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" },
                    { client: "E-Commerce", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
                    { client: "SaaS Dashboard", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800" },
                ].map((work, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="relative aspect-video bg-white/5 mb-6 overflow-hidden">
                            <Image src={work.img} alt={work.client} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale" />
                        </div>
                        <h3 className="text-2xl font-bold group-hover:underline">{work.client}</h3>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FOOTER BLOCK */}
      <footer className="border-t border-white/10 py-16 px-8 text-center bg-white/5">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Ready to start?</h2>
        <button className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">Start a Project</button>
      </footer>
    </div>
  );
}
