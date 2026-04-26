"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Calendar, MapPin, Ticket, Users, Zap, Clock, Mic, Star } from "lucide-react";

export function EventTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#f43f5e"; // Event Red/Pink
  
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeWrapper session={session} dark={true}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={formData.heroImageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80"} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        
        {/* Animated Shapes */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ background: brand }} />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-white">
              <Zap className="w-4 h-4 text-amber-400" /> Tickets On Sale Now
            </div>
            <h1 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 text-white italic">
              {c?.heroHeadline}
            </h1>
            <div className="flex flex-wrap justify-center gap-12 mb-16 text-white/60 font-bold uppercase text-sm tracking-widest">
              <div className="flex items-center gap-3"><Calendar className="w-5 h-5" /> May 24-26, 2026</div>
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5" /> {formData.city}</div>
            </div>
            
            {/* Countdown */}
            <div className="flex justify-center gap-8 mb-20">
              {[
                { val: timeLeft.days, label: "Days" },
                { val: timeLeft.hours, label: "Hours" },
                { val: timeLeft.minutes, label: "Mins" },
                { val: timeLeft.seconds, label: "Secs" },
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">{String(t.val).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">{t.label}</div>
                </div>
              ))}
            </div>

            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-16 py-6 rounded-none font-black uppercase tracking-[0.4em] text-sm shadow-[0_0_50px_rgba(244,63,94,0.3)]"
            >
              Get Your Tickets <Ticket className="inline-block ml-3 w-5 h-5" />
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 border-y border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: "2500+", label: "Attendees" },
            { val: "50+", label: "Speakers" },
            { val: "3", label: "Days" },
            { val: "12", label: "Workshops" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-4xl font-black text-white mb-2 italic">{s.val}</div>
              <div className="text-[10px] uppercase font-bold text-white/20 tracking-widest">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white italic">The Lineup<span style={{ color: brand }}>.</span></h2>
            </Reveal>
            <div className="text-xs font-black text-white/20 uppercase tracking-widest hidden md:block pb-2">
              Filtering by: All Sessions
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((s, i) => (
              <StaggerItem key={i}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5 mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 9000}?w=800&q=80`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"><Mic className="w-4 h-4 text-white" /></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white mb-2 group-hover:italic transition-all">Speaker Name {i+1}</h3>
                  <div className="text-xs font-bold text-white/30 uppercase tracking-widest">Industry Leader // Tech</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About Section */}
      <section className="py-40 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic text-white">Why Attend <br/>This Year<span style={{ color: brand }}>?</span></h2>
            <p className="text-xl text-white/40 leading-relaxed italic mb-16">
              {c?.aboutText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all">
                    <Star className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest leading-tight text-white/60">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square bg-zinc-900 p-4 border border-white/5 rounded-full overflow-hidden rotate-12">
              <img src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1200&q=80" className="w-full h-full object-cover rounded-full opacity-50" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-6xl font-black text-white italic">LIVE</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-2">Performance Focus</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-60 bg-black text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-white leading-none mb-16 italic">Secure Your<br/>Legacy<span style={{ color: brand }}>.</span></h2>
            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-16 py-8 rounded-none font-black uppercase tracking-[0.4em] text-sm shadow-[0_0_80px_rgba(244,63,94,0.4)]"
            >
              Buy Tickets Now
            </MagneticButton>
            <div className="mt-16 flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.6em] text-white/20">
              <span>Standard</span>
              <span>VIP Elite</span>
              <span>All Access</span>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
