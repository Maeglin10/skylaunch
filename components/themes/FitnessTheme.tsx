"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Zap, Target, Users, Flame, ChevronRight, PlayCircle, Star, Dumbbell } from "lucide-react";

const PROGRAMS = [
  { title: "Hypertrophy Elite", cat: "Strength", level: "Advanced", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" },
  { title: "Metabolic Burn", cat: "HIIT", level: "Intermediate", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80" },
  { title: "Zen Core Flow", cat: "Wellness", level: "Beginner", img: "https://images.unsplash.com/photo-1518611012118-2969c6370238?w=800&q=80" },
];

export function FitnessTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#f97316"; // Fitness Orange

  return (
    <ThemeWrapper session={session} dark={true}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={formData.heroImageUrl || "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1600&q=80"} 
            className="w-full h-full object-cover brightness-[0.3] grayscale" 
          />
        </div>
        
        {/* Kinetic Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
          <div className="text-[30vw] font-black uppercase tracking-tighter italic animate-pulse">COMMIT</div>
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-none border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-white/50">
              <Flame className="w-4 h-4 text-orange-500" /> Unleash Your Potential
            </div>
            <h1 className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 text-white italic">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl md:text-3xl text-white/40 max-w-2xl mx-auto mb-16 leading-relaxed font-light italic">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton
                style={{ background: brand, color: "#000" }}
                className="px-12 py-6 rounded-none font-black uppercase tracking-[0.3em] text-sm shadow-[0_0_50px_rgba(249,115,22,0.3)]"
              >
                Join The Movement
              </MagneticButton>
              <button className="px-12 py-6 border border-white/20 rounded-none font-black uppercase tracking-[0.3em] text-sm text-white hover:bg-white hover:text-black transition-all">
                Watch Training
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="py-20 border-y border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: "5000+", label: "Active Members" },
            { val: "24/7", label: "Access" },
            { val: "15+", label: "Elite Coaches" },
            { val: "100+", label: "Programs" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl font-black text-white mb-2 italic tracking-tighter">{s.val}</div>
              <div className="text-[10px] uppercase font-bold text-white/20 tracking-widest">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white italic">Elite Programs<span style={{ color: brand }}>.</span></h2>
            </Reveal>
            <div className="text-xs font-black text-white/20 uppercase tracking-widest hidden md:block pb-2">
              Select Your Path
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PROGRAMS.map((p, i) => (
              <StaggerItem key={i}>
                <div className="group cursor-pointer relative overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5 mb-8">
                    <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10">
                      <span className="px-3 py-1 bg-white text-black text-[8px] font-black uppercase tracking-widest mb-4 block w-fit">{p.level}</span>
                      <h3 className="text-3xl font-black uppercase text-white tracking-tighter italic">{p.title}</h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{p.cat} // Program</span>
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.8] italic text-white">No Limits.<br/>No Excuses<span style={{ color: brand }}>.</span></h2>
            <p className="text-xl text-white/40 leading-relaxed italic mb-16 max-w-md">
              {c?.aboutText}
            </p>
            <div className="space-y-8">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="text-lg font-black uppercase tracking-tight text-white">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square bg-zinc-900 border border-white/5 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80" className="w-full h-full object-cover grayscale opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MagneticButton className="w-32 h-32 rounded-full bg-white text-black flex flex-col items-center justify-center gap-1 group">
                  <PlayCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-black uppercase tracking-widest">Video</span>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-60 bg-white text-black text-center relative">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter mb-16 italic leading-none">Your Prime <br/>Begins Now.</h2>
            <div className="flex flex-col items-center gap-12 mt-20">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-16 py-8 rounded-none font-black uppercase tracking-[0.4em] text-sm shadow-2xl"
              >
                Get 7-Day Free Pass
              </MagneticButton>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400">
                <span>Harder</span>
                <span>Better</span>
                <span>Faster</span>
                <span>Stronger</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
