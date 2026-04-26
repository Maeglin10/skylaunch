"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { ArrowUpRight, Monitor, Palette, Code2, Layers, Users, Zap, Mail } from "lucide-react";

const PROJECTS = [
  { title: "Aether Labs", cat: "Web Ecosystem", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80", span: "md:col-span-2 md:row-span-2" },
  { title: "Noir Studio", cat: "Brand Identity", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80", span: "md:col-span-1 md:row-span-1" },
  { title: "Prisme", cat: "Fintech App", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80", span: "md:col-span-1 md:row-span-2" },
  { title: "Lumina", cat: "Healthcare", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80", span: "md:col-span-1 md:row-span-1" },
];

const PROCESS = [
  { title: "Discovery", desc: "We dive deep into your business, audience, and goals to build a strategic foundation." },
  { title: "Design", desc: "Creating unique visual languages that resonate and differentiate your brand." },
  { title: "Build", desc: "Turning designs into high-performance digital products with modern technologies." },
  { title: "Launch", desc: "Seamless deployment and ongoing support to ensure long-term success." },
];

export function AgencyTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bannerX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <ThemeWrapper session={session} dark={true}>
      <div ref={containerRef}>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" className="w-full h-full object-cover grayscale" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-[2px] w-12 bg-white/30" />
                <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/50">Digital Craft Studio</span>
              </div>
              <h1 className="text-7xl md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] mb-16 text-white italic">
                {c?.heroHeadline}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <p className="text-2xl text-white/40 leading-relaxed font-light max-w-xl italic">
                  {c?.heroSubline}
                </p>
                <div className="flex md:justify-end">
                  <MagneticButton
                    style={{ border: `1px solid ${brand}`, color: brand }}
                    className="w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 group hover:bg-white hover:text-black hover:border-white transition-all"
                  >
                    <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Start Project</span>
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Scrolling Banner */}
        <div className="py-20 border-y border-white/5 bg-zinc-950 overflow-hidden whitespace-nowrap">
          <motion.div style={{ x: bannerX }} className="flex gap-20 items-center text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-white opacity-[0.02] italic">
            <span>Design · Build · Launch · Strategy · Design · Build · Launch · Strategy · Design · Build · Launch · Strategy ·</span>
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <section className="py-40 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="mb-32">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-6 font-black font-mono">Selected Works // 2026</span>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">The Portfolio<span style={{ color: brand }}>.</span></h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:grid-flow-dense">
              {PROJECTS.map((p, i) => (
                <Reveal key={i} delay={i * 0.1} className={p.span}>
                  <div className="group relative h-full min-h-[400px] overflow-hidden cursor-pointer">
                    <img src={p.img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] uppercase tracking-widest text-white/50 mb-2 block">{p.cat}</span>
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-white flex items-center justify-between">
                        {p.title} <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all" />
                      </h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-40 border-y border-white/5 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-20">
            {[
              { val: "200+", label: "Projects Delivered" },
              { val: "98%", label: "Client Satisfaction" },
              { val: "15+", label: "Design Awards" },
              { val: "12", label: "Team Members" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1} className="text-center md:text-left">
                <div className="text-5xl md:text-7xl font-black text-white mb-4 italic tracking-tighter">{s.val}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-40 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-6 font-black font-mono">Our DNA // Logic</span>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-12 leading-none">Behind the<br/>Scenes<span style={{ color: brand }}>.</span></h2>
                <p className="text-xl text-white/40 leading-relaxed italic max-w-md">
                  {c?.aboutText}
                </p>
              </Reveal>

              <div className="space-y-20">
                {PROCESS.map((p, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="flex gap-10">
                      <div className="text-5xl font-black text-white/10 italic">0{i+1}</div>
                      <div>
                        <h3 className="text-2xl font-black uppercase text-white mb-6 tracking-tight">{p.title}</h3>
                        <p className="text-white/40 leading-relaxed max-w-sm">{p.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-60 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-black leading-none mb-16 italic">Let&apos;s Build<br/>Something Huge<span style={{ color: brand }}>.</span></h2>
              
              <div className="flex flex-col items-center gap-12 mt-20">
                <div className="flex gap-8">
                  <a href={`mailto:${formData.email}`} className="text-2xl font-black border-b-2 border-black pb-2 hover:opacity-50 transition-opacity uppercase tracking-tighter">
                    {formData.email}
                  </a>
                </div>
                
                <MagneticButton
                  style={{ background: brand, color: "#fff" }}
                  className="px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl"
                >
                  Start The Conversation
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </ThemeWrapper>
  );
}
