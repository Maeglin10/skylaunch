"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, Menu, Globe, Layers, Wind } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, title: "AETHER MOBILE", category: "Full Branding", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1500&auto=format&fit=crop", desc: "Redefining mobile interaction through quantum design layers." },
  { id: 2, title: "LUMINA LABS", category: "Web Ecosystem", image: "https://images.unsplash.com/photo-1550741164-c0fa6e19e782?q=80&w=1500&auto=format&fit=crop", desc: "A high-end research facility website with interactive data models." },
  { id: 3, title: "SILENT PROTOCOL", category: "Product Design", image: "https://images.unsplash.com/photo-1504384308090-c89eec282421?q=80&w=1500&auto=format&fit=crop", desc: "Distilling nature into pure digital form for the next generation." },
];

export default function StudioXSPA() {
  const [view, setView] = useState<"home" | "portfolio" | "case">("home");
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="premium-theme bg-[#0a0a0a] text-white min-h-screen selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Animated Mesh Background - Persistent */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-30 blur-[120px]">
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-rose-600/40 rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-600/40 rounded-full"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <button onClick={() => setView("home")} className="text-2xl font-black tracking-tighter uppercase">
          Studio.X
        </button>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
           <button onClick={() => setView("home")} className="hover:opacity-100 transition-opacity">Philosophy</button>
           <button onClick={() => setView("portfolio")} className="hover:opacity-100 transition-opacity">Work</button>
        </div>
        <div className="flex gap-6 items-center">
           <div className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40 hidden sm:block">Berlin / HK</div>
           <Menu className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* HOMEPAGE */}
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 px-8 pt-48 pb-32 max-w-7xl mx-auto">
             <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                <h1 className="text-[12vw] md:text-[14vw] font-black leading-[0.8] tracking-[-0.05em] uppercase mb-16 md:mb-24">
                  Digital <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>Alchemy.</span>
                </h1>
             </motion.div>

             <div className="grid grid-cols-12 gap-12 items-end">
                <div className="col-span-12 lg:col-span-4 mb-16 lg:mb-0">
                   <p className="text-xl md:text-2xl font-light leading-relaxed opacity-60 mb-12">
                      We craft intentional digital experiences that transform brands and accelerate growth. High-end design meets strategic engineering.
                   </p>
                   <button onClick={() => setView("portfolio")} className="group flex items-center gap-4 text-xs uppercase tracking-[0.5em] font-bold border-b-2 border-white pb-4 hover:tracking-[0.8em] transition-all">
                      Our Collective Work <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                   </button>
                </div>
                <div className="col-span-12 lg:col-span-8 relative aspect-video bg-white/5 overflow-hidden group">
                   <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop" alt="Agency Hero" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
             </div>
          </motion.div>
        )}

        {/* PORTFOLIO */}
        {view === "portfolio" && (
          <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-7xl mx-auto">
             <div className="flex justify-between items-end mb-24">
                <div>
                   <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-4 block font-bold">Showcase / 2026</span>
                   <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Selected <br /> <span className="opacity-20 italic">Stories.</span></h2>
                </div>
                <div className="text-[10px] font-mono opacity-20 uppercase hidden md:block">Scroll for more</div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                {PROJECTS.map((p, i) => (
                   <motion.div 
                     initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                     key={p.id} className="group cursor-pointer" 
                     onClick={() => { setActiveProject(i); setView("case"); }}
                   >
                      <div className="relative aspect-[4/5] bg-white/5 mb-8 overflow-hidden">
                         <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                         <div className="absolute inset-x-8 bottom-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                            <span className="text-[10px] uppercase font-black tracking-widest bg-white text-black px-4 py-2">Open Case</span>
                         </div>
                      </div>
                      <div className="flex justify-between items-start">
                         <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{p.title}</h3>
                            <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{p.category}</span>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* CASE STUDY */}
        {view === "case" && (
          <motion.div key="case" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 pb-32 px-8">
             <div className="max-w-7xl mx-auto">
                <button onClick={() => setView("portfolio")} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black opacity-40 hover:opacity-100 transition-opacity mb-16">
                   <ChevronLeft className="w-4 h-4" /> Go Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                   <div>
                      <span className="text-rose-500 text-[10px] uppercase tracking-[0.5em] font-black mb-8 block">{PROJECTS[activeProject].category}</span>
                      <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-12">{PROJECTS[activeProject].title}</h1>
                      <p className="text-xl md:text-2xl font-light leading-relaxed opacity-60 mb-12">
                         {PROJECTS[activeProject].desc}
                      </p>
                      <div className="flex gap-16 py-8 border-y border-white/10">
                         <div>
                            <div className="text-[10px] opacity-30 uppercase mb-2">Role</div>
                            <div className="text-sm font-bold">Art Direction</div>
                         </div>
                         <div>
                            <div className="text-[10px] opacity-30 uppercase mb-2">Duration</div>
                            <div className="text-sm font-bold">4 Months</div>
                         </div>
                      </div>
                   </div>
                   <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                      <Image src={PROJECTS[activeProject].image} alt="Detail" fill className="object-cover" priority />
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   {[...Array(4)].map((_, i) => (
                      <div key={i} className="aspect-square bg-white/5 relative overflow-hidden group">
                         <Image src={`https://images.unsplash.com/photo-${1550000000000 + (i * 10000)}?q=80&w=800&auto=format&fit=crop`} alt="Gallery" fill className="object-cover opacity-40 group-hover:opacity-80 transition-opacity grayscale group-hover:grayscale-0" />
                      </div>
                   ))}
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="p-8 md:p-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 mt-32 relative z-10 bg-[#0a0a0a]">
        <div className="text-4xl font-black tracking-tighter uppercase">Studio.X</div>
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
           <a href="#" className="hover:opacity-100">Twitter</a>
           <a href="#" className="hover:opacity-100">Dribbble</a>
           <a href="#" className="hover:opacity-100">Contact</a>
        </div>
        <div className="text-[10px] uppercase tracking-widest opacity-20 font-mono">
          &copy; 2026 STUDIO X DIGITAL
        </div>
      </footer>
    </div>
  );
}
