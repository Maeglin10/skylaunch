"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Scale, ShieldAlert, Landmark, Briefcase, ArrowUpRight } from "lucide-react";
import "../premium.css";

function RevealText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-2">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function PremiumLawFirm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#0F0F0F] text-[#E5E5E5] min-h-screen font-serif selection:bg-[#B8860B] selection:text-white">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-white/30 flex items-center justify-center rounded-sm">
               <Scale className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="font-black text-2xl tracking-widest uppercase">Sterling & Vance</Link>
         </div>
         
         <nav className="hidden md:flex gap-12 font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-white/50">
            <Link href="#" className="hover:text-white transition-colors">Expertise</Link>
            <Link href="#" className="hover:text-white transition-colors">Partners</Link>
            <Link href="#" className="hover:text-white transition-colors">Insights</Link>
         </nav>
         
         <button className="hidden md:block font-sans text-[10px] uppercase font-bold tracking-[0.3em] border-b border-white pb-1 hover:text-[#B8860B] hover:border-[#B8860B] transition-colors">
            Confidential Inquiry
         </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
         <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2500" alt="Library" fill className="object-cover grayscale opacity-30 mix-blend-luminosity" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent" />
         </motion.div>
         
         <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center pt-20">
            <h1 className="text-5xl md:text-[8vw] font-black tracking-tighter leading-[0.9] uppercase mb-12 drop-shadow-2xl">
               <RevealText text="Uncompromising" /> <br />
               <RevealText text="Advocacy." />
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="text-xl md:text-3xl font-light italic text-[#E5E5E5]/60 max-w-3xl mx-auto leading-relaxed">
               We represent exceptional clients in their most critical legal challenges. Silence when needed. Aggression when required.
            </motion.p>
         </motion.div>
      </section>

      {/* PHILOSOPHY STATEMENT */}
      <section className="py-32 px-6 bg-[#0F0F0F] relative z-20 border-t border-white/5">
         <div className="max-w-4xl mx-auto text-center">
            <Image src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400" alt="Managing Partner" width={100} height={100} className="rounded-full mx-auto mb-12 object-cover grayscale border border-white/20" />
            <blockquote className="text-3xl md:text-5xl font-light italic leading-tight mb-12">
               "Our philosophy is simple: we prepare every case as if it will go to trial. This absolute readiness is what secures favorable settlements and definitive victories."
            </blockquote>
            <div className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-[#B8860B]">James Sterling — Managing Partner</div>
         </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="py-32 px-6 bg-[#E5E5E5] text-[#0F0F0F] relative z-20">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
               <div>
                  <div className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-[#B8860B] mb-6 block">Areas of Expertise</div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                     <RevealText text="Strategic" /> <br/>
                     <RevealText text="Focus." />
                  </h2>
               </div>
               <p className="max-w-sm text-lg font-sans font-medium text-black/60">
                  Dedicated strictly to complex litigation and high-stakes corporate defense.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
               {[
                  { icon: <Briefcase />, title: "Corporate Litigation", desc: "Resolving complex business disputes with aggressive and strategic representation across multiple jurisdictions." },
                  { icon: <ShieldAlert />, title: "White Collar Defense", desc: "Defending executives and corporations in high-stakes regulatory investigations and enforcement actions." },
                  { icon: <Landmark />, title: "Appellate Practice", desc: "Handling critical appeals in federal and state supreme courts with meticulous legal scholarship." },
                  { icon: <Scale />, title: "Intellectual Property", desc: "Protecting essential patents, trademarks, and trade secrets in highly competitive global markets." }
               ].map((area, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: i * 0.1 }}
                     className="bg-[#E5E5E5] p-12 md:p-16 hover:bg-white transition-colors duration-500 group cursor-pointer"
                  >
                     <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center mb-8 group-hover:bg-[#0F0F0F] group-hover:text-white transition-colors duration-500">
                        {area.icon}
                     </div>
                     <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{area.title}</h3>
                     <p className="font-sans text-lg text-black/60 leading-relaxed mb-12">{area.desc}</p>
                     
                     <div className="flex items-center gap-4 font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-[#B8860B] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        Explore Practice <ArrowUpRight className="w-4 h-4" />
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-32 px-6 bg-[#0F0F0F] text-center border-t border-white/10">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">Secure Representation.</h2>
            <button className="bg-white text-black px-12 py-6 rounded-sm font-sans font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#B8860B] hover:text-white transition-colors duration-500">
               Schedule Confidential Consultation
            </button>
            <div className="mt-24 font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 flex flex-col md:flex-row justify-center items-center gap-8">
               <span>New York</span>
               <span>London</span>
               <span>Washington D.C.</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
