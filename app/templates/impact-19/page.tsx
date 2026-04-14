"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function AgencyFullLanding() {
  return (
    <div className="premium-theme bg-black text-white min-h-screen selection:bg-purple-600">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center bg-black/50 backdrop-blur-2xl border-b border-white/5">
        <Link href="/" className="text-2xl font-black italic tracking-tighter uppercase">AEVIA_AGENCY</Link>
        <div className="hidden lg:flex gap-12 font-mono text-[10px] uppercase font-black tracking-widest opacity-60">
           <a href="#about" className="hover:opacity-100">About</a>
           <a href="#work" className="hover:opacity-100">Work</a>
           <a href="#stats" className="hover:opacity-100">Stats</a>
           <a href="#contact" className="hover:opacity-100">Contact</a>
        </div>
        <button className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-110 transition-transform italic">Start Project</button>
      </nav>

      {/* Hero Section */}
      <section id="about" className="h-screen relative flex items-center justify-center pt-24">
         <div className="absolute inset-0 z-0 opacity-40">
            <Image src="/templates/agency_hero.png" alt="Hero background" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
         </div>
         <div className="relative z-10 text-center px-12">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12"
            >
               Infinite <br /> Design.
            </motion.h1>
            <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light opacity-60 leading-relaxed uppercase tracking-widest mb-16 italic">
               We build interfaces that transcend screens. <br />
               Crafting the future of digital interaction.
            </p>
            <div className="flex justify-center gap-8">
               <button className="px-12 py-6 border border-white/20 uppercase text-xs font-black tracking-[1em] hover:bg-white hover:text-black transition-all">Explore</button>
            </div>
         </div>
      </section>

      {/* Showcase Section */}
      <section id="work" className="py-64 px-12 border-t border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-32">
               <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">Our <br /> <span className="opacity-20">Artistry.</span></h2>
               <div className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">01 / Projects</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
               {[
                 { title: "Neural Link", img: "/templates/tech_noir.png" },
                 { title: "Gilded Era", img: "/templates/editorial_lux.png" }
               ].map((project, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -20 }}
                   className="group cursor-pointer"
                 >
                    <div className="relative aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden mb-8 border border-white/5 shadow-2xl">
                       <Image src={project.img} alt={project.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{project.title}</h3>
                    <p className="opacity-40 uppercase text-xs tracking-widest font-black">Design / Development / 2026</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-64 bg-white text-black">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
            {[
               { val: "200+", label: "Templates" },
               { val: "15MS", label: "Neural Latency" },
               { val: "99.9%", label: "Satisfaction" }
            ].map((stat, i) => (
               <div key={i}>
                  <div className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-none italic mb-4">{stat.val}</div>
                  <div className="text-xs uppercase font-black tracking-[0.5em] opacity-40">{stat.label}</div>
               </div>
            ))}
         </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-64 px-12 flex flex-col items-center text-center">
         <h2 className="text-8xl md:text-[12vw] font-black uppercase tracking-tighter leading-none mb-12 italic">Let's <br /> Build.</h2>
         <button className="px-12 py-8 bg-white text-black text-2xl font-black uppercase italic tracking-widest hover:scale-105 transition-transform">Get In Touch</button>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest font-black opacity-20 italic">
         <div>&copy; 2026 AEVIA AGENCY / NEW YORK</div>
         <div>All Systems Nominal</div>
      </footer>
    </div>
  );
}
