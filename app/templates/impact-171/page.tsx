"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Calendar, HeartPulse, Brain, Baby, Activity, Shield, ArrowRight } from "lucide-react";
import "../premium.css";

const SERVICES = [
  { icon: <HeartPulse className="w-8 h-8" />, title: "Cardiology", desc: "Advanced diagnostics, interventional procedures, and cardiac rehabilitation." },
  { icon: <Brain className="w-8 h-8" />, title: "Neurology", desc: "Expert treatment for brain, spinal cord, and complex nervous system disorders." },
  { icon: <Baby className="w-8 h-8" />, title: "Pediatrics", desc: "Comprehensive, compassionate healthcare for infants and adolescents." },
  { icon: <Activity className="w-8 h-8" />, title: "Orthopedics", desc: "Specialized sports medicine and reconstructive surgical care." },
];

export default function PremiumMedical() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#FAFAFA] text-[#1e293b] min-h-screen font-sans selection:bg-[#059669] selection:text-white">
      
      {/* TOP EMERGENCY BAR */}
      <div className="bg-[#059669] text-white px-6 py-3 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Emergency Response: (555) 911-0000
         </div>
         <div className="hidden md:block">
            Global Health Standards Certified 2026
         </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#059669]/10 px-6 md:px-12 py-6 flex justify-between items-center">
         <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-[#059669]/10 text-[#059669] rounded-xl flex items-center justify-center font-black text-xl group-hover:bg-[#059669] group-hover:text-white transition-colors duration-500">
               +
            </div>
            <span className="font-black text-2xl tracking-tighter text-[#0f172a]">NOVA.</span>
         </Link>

         <nav className="hidden md:flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-[#64748b]">
            <Link href="#" className="hover:text-[#059669] transition-colors">Specialties</Link>
            <Link href="#" className="hover:text-[#059669] transition-colors">Our Specialists</Link>
            <Link href="#" className="hover:text-[#059669] transition-colors">Patient Portal</Link>
         </nav>

         <button className="bg-[#0f172a] text-white px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-[#059669] hover:shadow-[0_0_30px_rgba(5,150,105,0.3)] transition-all flex items-center gap-3">
            <Calendar className="w-4 h-4" /> Book Consultation
         </button>
      </header>

      {/* HERO SECTION WITH PARALLAX */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0f172a]">
         <motion.div style={{ y: heroY, scale: scaleImage }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2500" alt="Medical Facility" fill className="object-cover opacity-40 mix-blend-luminosity" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
         </motion.div>

         <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
            <motion.div style={{ opacity: heroOpacity }} className="w-full md:w-1/2 pt-20 pb-32">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#059669]/20 text-[#059669] text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md border border-[#059669]/30">
                  <Shield className="w-4 h-4" /> Leading Medical Institute
               </div>
               <h1 className="text-5xl md:text-[6vw] font-black text-white leading-[0.9] tracking-tighter mb-8">
                  Redefining <br/> Human <span className="text-[#059669]">Care.</span>
               </h1>
               <p className="text-[#94a3b8] text-lg md:text-xl font-light max-w-lg leading-relaxed mb-12">
                  Precision medicine meets compassionate healing. We utilize next-generation diagnostics to elevate your baseline of health.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#059669] text-white px-8 py-5 rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-[#059669] transition-colors flex items-center justify-center gap-3">
                     Explore Specialties <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-5 rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-[#0f172a] transition-colors flex items-center justify-center gap-3">
                     <Phone className="w-4 h-4" /> Immediate Assistance
                  </button>
               </div>
            </motion.div>
         </div>
      </section>

      {/* METRICS STRIP */}
      <div className="relative z-20 bg-white border-b border-gray-100 py-12 px-6 md:px-12">
         <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {[
               { v: "24/7", l: "Emergency Care" },
               { v: "150+", l: "Specialist Doctors" },
               { v: "99%", l: "Patient Satisfaction" },
               { v: "12", l: "Excellence Centers" },
            ].map((m, i) => (
               <div key={i} className="text-center px-4">
                  <div className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-2">{m.v}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">{m.l}</div>
               </div>
            ))}
         </div>
      </div>

      {/* SERVICES INTERACTIVE GRID */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
               <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter mb-6">Centers of <br/> Clinical Excellence.</h2>
               <p className="text-[#64748b] text-lg font-light leading-relaxed">
                  Our specialized institutes bring together world-class medical expertise, pioneering research, and state-of-the-art technology.
               </p>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#059669] hover:text-[#0f172a] transition-colors pb-2 border-b border-[#059669]">
               View All Departments
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group bg-white border border-gray-200 rounded-[2rem] p-10 hover:border-[#059669] hover:shadow-2xl hover:shadow-[#059669]/10 transition-all duration-500 cursor-pointer overflow-hidden relative"
               >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#059669]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#059669] mb-8 group-hover:scale-110 group-hover:bg-[#059669] group-hover:text-white transition-all duration-500">
                     {s.icon}
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#0f172a] tracking-tight mb-4">{s.title}</h3>
                  <p className="text-[#64748b] leading-relaxed mb-8">{s.desc}</p>
                  
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#059669] group-hover:translate-x-2 transition-transform duration-500">
                     Discover Department <ArrowRight className="w-4 h-4" />
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

    </div>
  );
}
