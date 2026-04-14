"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function ModernAgencyTemplate() {
  return (
    <div className="premium-theme bg-[#0a0a0a] text-white min-h-screen selection:bg-white selection:text-black">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-30 blur-[100px]">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600 rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-start">
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase">
          Studio.X
        </Link>
        <div className="flex flex-col items-end gap-2">
            <div className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40">Menu</div>
            <div className="w-12 h-[2px] bg-white"></div>
            <div className="w-8 h-[2px] bg-white/40"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-12 pt-64 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <h1 className="text-[12vw] md:text-[15vw] font-black leading-[0.8] tracking-[-0.05em] uppercase mb-24">
              Digital <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Alchemy.</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-12 gap-12 items-end">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-xl md:text-2xl font-light leading-relaxed opacity-60 mb-12">
                We craft intentional digital experiences that transform brands and accelerate growth. High-end design meets strategic engineering.
              </p>
              <button className="text-xs uppercase tracking-[0.5em] font-bold border-b-2 border-white pb-4 hover:tracking-[0.8em] transition-all">
                Our Work
              </button>
            </div>
            <div className="col-span-12 lg:col-span-8 relative aspect-video bg-[#111] overflow-hidden">
               <Image
                  src="/templates/agency_hero.png"
                  alt="Abstract Agency Visual"
                  fill
                  className="object-cover opacity-80"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="px-12 py-64 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-32">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Selected <br /> <span className="opacity-20 italic">Stories.</span></h2>
            <div className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-4">(01 - 04)</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {[1, 2].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -20 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-[#111] mb-8 overflow-hidden">
                   <Image
                      src="/templates/agency_hero.png"
                      alt="Project"
                      fill
                      className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${i === 2 ? 'hue-rotate-90' : ''}`}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs uppercase tracking-[1em] font-black border border-white p-6">View Project</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold uppercase tracking-widest">Aevia Mobile</h3>
                  <span className="text-[10px] uppercase tracking-widest opacity-40">Development / 2026</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 md:p-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-4xl font-black tracking-tighter uppercase">Studio.X</div>
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
           <a href="#" className="hover:opacity-100">Twitter</a>
           <a href="#" className="hover:opacity-100">Dribbble</a>
           <a href="#" className="hover:opacity-100">Contact</a>
        </div>
        <div className="text-[10px] uppercase tracking-widest opacity-20">
          &copy; 2026 STUDIO X DIGITAL
        </div>
      </footer>
    </div>
  );
}
