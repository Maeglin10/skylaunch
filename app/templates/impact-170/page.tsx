"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Linkedin, Twitter, Download } from "lucide-react";
import "../premium.css";

const EXP = [
  { role: "Fractional CMO", comp: "TechFlow Inc.", time: "2023 - Present", desc: "Engineered a product-led growth strategy that scaled enterprise pipeline by 150% in 12 months. Redefined brand positioning for the AI era." },
  { role: "VP of Marketing", comp: "CloudSync", time: "2020 - 2023", desc: "Built and scaled a 15-person marketing engine from scratch. Instrumental in securing $40M Series B funding through strategic narrative design." },
  { role: "Director of Growth", comp: "DataNova", time: "2017 - 2020", desc: "Architected the initial growth loop resulting in 1M+ active users within the first two years of launch." }
];

export default function PremiumConsultantCV() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotateIndicator = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#F7F7F7] text-[#111111] min-h-screen font-sans selection:bg-[#4F46E5] selection:text-white">
      
      {/* GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row relative z-10">
         
         {/* LEFT STICKY COLUMN: PROFILE */}
         <div className="lg:w-[40%] lg:h-screen lg:sticky lg:top-0 p-8 md:p-16 flex flex-col justify-between border-r border-[#111111]/10 bg-[#F7F7F7]">
            <motion.div style={{ y: headerY }}>
               <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-12 filter grayscale hover:grayscale-0 transition-all duration-700">
                  <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="David Mitchell" fill className="object-cover" />
               </div>
               
               <h1 className="text-6xl md:text-[5vw] font-black tracking-tighter leading-none mb-6">David <br/> Mitchell.</h1>
               <div className="text-xl md:text-2xl text-[#4F46E5] font-black uppercase tracking-tighter italic mb-8">Strategic Growth & CMO</div>
               
               <p className="text-[#111111]/60 leading-relaxed text-lg max-w-sm mb-12 font-medium">
                  I partner with ambitious Series A/B SaaS founders to engineer scalable growth engines and build market-defining narratives.
               </p>

               <div className="flex flex-col gap-4 max-w-xs">
                  <button className="bg-[#111111] text-white px-8 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-between hover:bg-[#4F46E5] transition-colors group">
                     Initiate Dialogue <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </button>
                  <button className="border border-[#111111]/20 text-[#111111] px-8 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-between hover:bg-white transition-colors">
                     Download Dossier <Download className="w-4 h-4" />
                  </button>
               </div>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="hidden lg:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#111111]/30 mt-12">
               <motion.div style={{ rotate: rotateIndicator }} className="w-8 h-8 rounded-full border border-[#111111]/30 flex items-center justify-center border-t-[#111111]" />
               Scroll to Explore
            </div>
         </div>

         {/* RIGHT SCROLL COLUMN: CONTENT */}
         <div className="lg:w-[60%] p-8 md:p-16 lg:p-24 bg-white/50 backdrop-blur-3xl">
            
            {/* EXPERIENCE */}
            <section className="mb-32">
               <div className="flex items-center gap-6 mb-16">
                  <div className="w-12 h-[2px] bg-[#4F46E5]" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Career Trajectory</h2>
               </div>

               <div className="space-y-16">
                  {EXP.map((job, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 50 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="relative pl-8 md:pl-12 border-l border-[#111111]/10 group"
                     >
                        <div className="absolute w-3 h-3 bg-[#111111] rounded-full -left-[6px] top-2 group-hover:bg-[#4F46E5] transition-colors group-hover:scale-150 duration-500" />
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-2">
                           <h3 className="text-2xl md:text-4xl font-black tracking-tighter">{job.role}</h3>
                           <div className="text-[10px] font-black uppercase tracking-widest text-[#4F46E5] bg-[#4F46E5]/10 px-3 py-1 rounded-full">{job.time}</div>
                        </div>
                        <div className="text-sm font-black uppercase tracking-widest text-[#111111]/40 mb-6">{job.comp}</div>
                        <p className="text-lg text-[#111111]/70 leading-relaxed max-w-2xl font-medium">{job.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* EXPERTISE */}
            <section className="mb-32">
               <div className="flex items-center gap-6 mb-16">
                  <div className="w-12 h-[2px] bg-[#4F46E5]" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Core Competencies</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                  {[
                     { skill: "Go-to-Market Strategy", level: "95%" },
                     { skill: "Demand Generation", level: "90%" },
                     { skill: "Brand Positioning", level: "85%" },
                     { skill: "Growth Marketing", level: "92%" }
                  ].map((s, i) => (
                     <div key={i}>
                        <div className="flex justify-between font-black uppercase tracking-widest text-xs mb-4">
                           <span>{s.skill}</span>
                           <span className="text-[#4F46E5]">{s.level}</span>
                        </div>
                        <div className="h-1 w-full bg-[#111111]/10 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: s.level }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                              className="h-full bg-[#4F46E5]" 
                           />
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            {/* CASE STUDIES PREVIEW */}
            <section className="mb-24">
               <div className="flex items-center gap-6 mb-16">
                  <div className="w-12 h-[2px] bg-[#4F46E5]" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Selected Work</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                     { title: "Scaling from $1M to $10M ARR", tag: "PLG Strategy" },
                     { title: "Enterprise Brand Repositioning", tag: "Brand Identity" }
                  ].map((caseStudy, i) => (
                     <div key={i} className="p-8 md:p-12 bg-[#111111] text-white rounded-3xl hover:bg-[#4F46E5] transition-colors duration-500 cursor-pointer group">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-6">{caseStudy.tag}</div>
                        <h4 className="text-2xl font-black tracking-tighter mb-8 leading-tight">{caseStudy.title}</h4>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#4F46E5] transition-all">
                           <ArrowUpRight className="w-5 h-5" />
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            {/* CONTACT HUD */}
            <section className="pt-16 border-t border-[#111111]/10 flex flex-wrap gap-8 justify-between items-center">
               <div className="flex gap-6">
                  <Link href="#" className="w-12 h-12 rounded-full bg-[#111111]/5 flex items-center justify-center hover:bg-[#4F46E5] hover:text-white transition-colors">
                     <Mail className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="w-12 h-12 rounded-full bg-[#111111]/5 flex items-center justify-center hover:bg-[#4F46E5] hover:text-white transition-colors">
                     <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="w-12 h-12 rounded-full bg-[#111111]/5 flex items-center justify-center hover:bg-[#4F46E5] hover:text-white transition-colors">
                     <Twitter className="w-5 h-5" />
                  </Link>
               </div>
               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40">
                  © 2026 David Mitchell
               </div>
            </section>

         </div>
      </div>
    </div>
  );
}
