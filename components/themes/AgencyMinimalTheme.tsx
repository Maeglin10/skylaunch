"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { ArrowUpRight, Check, Users, Globe, Zap, ArrowRight } from "lucide-react";

export function AgencyMinimalTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#111";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="pt-40 pb-32 border-b bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-12">Established 2026 // Global Studio</div>
            <h1 className="text-6xl md:text-8xl font-bold mb-20 leading-[1.1] tracking-tighter text-black">
              {c?.heroHeadline}
            </h1>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
            <Reveal delay={0.2}>
              <p className="text-2xl text-gray-400 font-medium leading-tight max-w-xl">
                {c?.heroSubline}
              </p>
            </Reveal>
            <Reveal delay={0.4} className="flex md:justify-end">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-5 rounded-none font-black uppercase tracking-widest text-xs shadow-lg"
              >
                Start A Project
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grid Portfolio */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b pb-12">
            <Reveal>
              <h2 className="text-4xl font-bold uppercase tracking-tighter">The Portfolio</h2>
            </Reveal>
            <div className="text-xs font-bold text-gray-300 uppercase tracking-widest hidden md:block">
              Filtering by: All Industries
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1 bg-gray-100 border">
            {[
              { title: "Aether Labs", cat: "Digital Ecosystem", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
              { title: "Noir Studio", cat: "Branding", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" },
              { title: "Prisme App", cat: "Development", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80" },
              { title: "Lumina", cat: "Healthcare", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" },
            ].map((p, i) => (
              <StaggerItem key={i}>
                <div className="group bg-white p-12 hover:bg-gray-50 transition-all cursor-pointer h-full">
                  <div className="aspect-video overflow-hidden mb-12">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      src={p.img} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-4">{p.cat}</span>
                      <h3 className="text-3xl font-bold uppercase tracking-tight">{p.title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-12 leading-tight">Strategic design<br/>meets technical<br/>precision.</h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              {c?.aboutText}
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { icon: <Zap />, label: "Strategy", val: "Market analysis and positioning." },
              { icon: <Users />, label: "UX Design", val: "User-centric interface systems." },
              { icon: <Globe />, label: "Web Dev", val: "High-performance codebases." },
              { icon: <Check />, label: "Consulting", val: "Ongoing growth and optimization." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 bg-white border rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gray-50" style={{ color: brand }}>{s.icon}</div>
                  <h4 className="text-lg font-bold uppercase mb-4">{s.label}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.val}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-6xl font-bold uppercase tracking-tighter mb-16">Ready to talk?</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button 
                style={{ background: brand }}
                className="px-12 py-6 text-white font-black uppercase tracking-widest text-xs shadow-2xl"
              >
                Send Us An Email
              </button>
              <button className="px-12 py-6 border border-gray-200 font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors">
                Book A Discovery Call
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
