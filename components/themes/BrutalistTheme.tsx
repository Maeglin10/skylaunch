"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem } from "./AnimationHelpers";
import { ArrowDown, ArrowUpRight, Plus, Hash } from "lucide-react";

export function BrutalistTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#000";

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const rotateBanner = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <ThemeWrapper session={session} dark={false}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        .mono { font-family: 'Space Mono', monospace; }
      `}</style>

      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-screen pt-40 pb-20 bg-[#f0f0f0] border-b-[20px] border-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="flex justify-between items-center mb-12">
              <span className="bg-black text-white px-4 py-1 text-xs font-black uppercase tracking-widest mono">SYSTEM // 0x2026</span>
              <span className="font-black uppercase tracking-widest text-black/20 mono">No_Limits_Applied</span>
            </div>
            <h1 className="text-8xl md:text-[18vw] font-black leading-[0.75] tracking-tighter uppercase mb-20 text-black">
              {c?.heroHeadline}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <p className="text-3xl font-bold uppercase leading-none text-black/40">
                {c?.heroSubline}
              </p>
              <div className="flex md:justify-end gap-10">
                <button className="w-40 h-40 bg-black text-white flex items-center justify-center font-black uppercase text-xs tracking-widest hover:translate-x-4 hover:-translate-y-4 shadow-[12px_12px_0_0_rgba(0,0,0,0.2)] transition-all">
                  Get Started
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Decorative Rotating Banner */}
        <motion.div 
          style={{ rotate: rotateBanner }}
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[800px] py-10 bg-black text-white text-5xl font-black uppercase tracking-tighter whitespace-nowrap opacity-5 pointer-events-none"
        >
          BRUTALISM // BRUTALISM // BRUTALISM // BRUTALISM //
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-40 bg-white border-b-[20px] border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-32">
            <Reveal>
              <h2 className="text-7xl font-black uppercase tracking-tighter text-black mb-12 italic">Raw Core<br/>Capabilities<span style={{ color: brand }}>.</span></h2>
              <div className="h-10 w-full bg-black/5 flex items-center px-4 mono text-[10px] font-bold text-black/40">LISTING_SERVICES // TOTAL_{c?.services.length}</div>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {c?.services.map((s, i) => (
              <StaggerItem key={i}>
                <div className="p-12 border-[10px] border-black hover:bg-black hover:text-white transition-all cursor-crosshair group">
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-4xl font-black mono italic">0{i+1}</span>
                    <Plus className="w-10 h-10 group-hover:rotate-90 transition-transform" />
                  </div>
                  <h3 className="text-4xl font-black uppercase mb-6">{s.title}</h3>
                  <p className="text-lg font-bold opacity-60 leading-tight mb-12 italic">
                    {s.description}
                  </p>
                  <div className="flex justify-between items-center text-xs font-black mono uppercase tracking-widest">
                    <span>Protocol_{i}</span>
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-40 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.8] italic">High <br/>Density <br/>Output.</h2>
            <div className="space-y-12">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex gap-10 items-center group">
                  <div className="text-2xl font-black mono text-white/20 group-hover:text-white transition-colors">#{i+1}</div>
                  <div className="text-3xl font-bold uppercase tracking-tight italic">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square bg-white border-[20px] border-white/20 p-4 grayscale hover:grayscale-0 transition-all duration-1000">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white text-black p-8 border-[10px] border-black hidden md:block">
              <div className="text-5xl font-black italic">X-01</div>
              <div className="text-xs font-black mono uppercase mt-2">Design_System_Active</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-60 bg-[#f0f0f0] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter text-black leading-none mb-20">Contact <br/>The Lab.</h2>
            <div className="flex flex-col items-center gap-12">
              <a 
                href={`mailto:${formData.email}`} 
                className="text-4xl md:text-6xl font-black uppercase bg-black text-white px-10 py-4 hover:translate-x-4 hover:-translate-y-4 transition-all shadow-[12px_12px_0_0_rgba(0,0,0,0.2)]"
              >
                {formData.email}
              </a>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-black/20 mono">
                <span>0x2026</span>
                <span>ROOT_USER</span>
                <span>{formData.city}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
