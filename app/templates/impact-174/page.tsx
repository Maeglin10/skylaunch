"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Activity, ShieldPlus, ArrowUpRight, Flame } from "lucide-react";
import "../premium.css";

function FloatingText({ children, yRange }: { children: React.ReactNode, yRange: number[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  return <motion.div ref={ref} style={{ y }}>{children}</motion.div>;
}

export default function PremiumFitness() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-[#FAFAFA] min-h-screen font-sans selection:bg-[#E11D48] selection:text-white">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
         <Link href="/" className="font-black text-3xl tracking-tighter uppercase italic text-white flex items-center gap-2">
            APEX <Flame className="w-6 h-6 text-[#E11D48]" />
         </Link>
         
         <nav className="hidden md:flex gap-12 font-black text-[10px] uppercase tracking-[0.3em] text-white/50">
            <Link href="#" className="hover:text-white transition-colors">Philosophy</Link>
            <Link href="#" className="hover:text-white transition-colors">Facilities</Link>
            <Link href="#" className="hover:text-white transition-colors">Membership</Link>
         </nav>
         
         <button className="bg-transparent border border-white/20 text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors">
            Join The Elite
         </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
         <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2500" alt="Training Facility" fill className="object-cover opacity-50 grayscale" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
         </motion.div>
         
         <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 text-center pt-32">
            <div className="overflow-hidden flex justify-center mb-6">
               <motion.div style={{ x: textX }} className="text-[#E11D48] font-black text-[10px] uppercase tracking-[0.5em] bg-[#E11D48]/10 px-6 py-2 rounded-full border border-[#E11D48]/30 backdrop-blur-md">
                  Uncompromising Standards
               </motion.div>
            </div>
            
            <h1 className="text-6xl md:text-[12vw] font-black tracking-tighter leading-[0.8] uppercase mb-12 mix-blend-overlay text-white drop-shadow-2xl">
               Forge <br /> <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.5)" }}>Your Legacy.</span>
            </h1>
         </motion.div>
         
         {/* Vertical Text */}
         <div className="absolute bottom-32 left-6 md:left-12 origin-bottom-left -rotate-90 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hidden md:block">
            Est. 2026 // Apex Performance Center
         </div>
      </section>

      {/* THREE PILLARS (SCROLL REVEAL) */}
      <section className="py-32 px-6 bg-[#050505] relative z-20">
         <div className="max-w-[1600px] mx-auto">
            <div className="mb-32">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                  The <span className="text-[#E11D48]">Methodology.</span>
               </h2>
               <p className="text-xl font-light text-white/50 max-w-2xl">
                  We don't do trends. We build functional strength, elite conditioning, and absolute resilience through scientific application.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
               {[
                  { icon: <Dumbbell className="w-10 h-10" />, title: "Strength", desc: "Olympic lifting platforms, calibrated plates, and competition-grade power racks." },
                  { icon: <Activity className="w-10 h-10" />, title: "Conditioning", desc: "40-yard turf zones, Concept2 rowers, and specialized functional training equipment." },
                  { icon: <ShieldPlus className="w-10 h-10" />, title: "Recovery", desc: "Cold plunges, infrared saunas, and active mobility spaces to rebuild tissue." }
               ].map((pillar, i) => (
                  <FloatingText key={i} yRange={[50 * (i+1), -50 * (i+1)]}>
                     <div className="group cursor-pointer">
                        <div className="text-[#E11D48] mb-12 border border-[#E11D48]/30 w-24 h-24 rounded-full flex items-center justify-center bg-[#E11D48]/5 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                           {pillar.icon}
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{pillar.title}</h3>
                        <p className="text-lg text-white/40 leading-relaxed font-light group-hover:text-white/80 transition-colors">{pillar.desc}</p>
                     </div>
                  </FloatingText>
               ))}
            </div>
         </div>
      </section>

      {/* FULL WIDTH IMAGE BREAK */}
      <section className="relative h-[80vh] w-full overflow-hidden">
         <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2500" alt="Training" fill className="object-cover opacity-60 grayscale" />
            <div className="absolute inset-0 bg-black/40" />
         </motion.div>
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[15vw] font-black uppercase tracking-tighter text-white/10 mix-blend-overlay">NO EXCUSES.</div>
         </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-48 px-6 bg-[#E11D48] text-white text-center relative z-20 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
         <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-12">Commit.</h2>
            <button className="bg-white text-black px-12 py-6 rounded-full font-black text-[12px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 mx-auto hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]">
               Start Free Trial <ArrowUpRight className="w-5 h-5" />
            </button>
         </div>
      </footer>
    </div>
  );
}
