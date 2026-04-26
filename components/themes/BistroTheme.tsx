"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Coffee, MapPin, Clock, X, ChevronRight, Star } from "lucide-react";

export function BistroTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#10b981"; // Bistro Green fallback
  
  const [activeCategory, setActiveCategory] = useState("Breakfast");

  const MENU = {
    Breakfast: [
      { name: "Avocado Toast", desc: "Sourdough, poached eggs, chili flakes.", price: 12 },
      { name: "Berry Granola", desc: "Greek yogurt, honey, seasonal berries.", price: 9 },
      { name: "French Toast", desc: "Brioche, maple syrup, cinnamon cream.", price: 11 },
    ],
    Lunch: [
      { name: "Garden Salad", desc: "Mixed greens, quinoa, lemon dressing.", price: 14 },
      { name: "Bistro Burger", desc: "Wagyu beef, caramelized onions, brioche.", price: 18 },
      { name: "Quiche of the Day", desc: "Served with side salad.", price: 13 },
    ],
    Drinks: [
      { name: "Flat White", desc: "Double shot, silky milk.", price: 4.5 },
      { name: "Fresh Juice", desc: "Orange, carrot, ginger.", price: 6 },
      { name: "Artisan Tea", desc: "Selection of loose leaf teas.", price: 4 },
    ]
  };

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Soft Background Grains */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#fdfcf9]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">
              <Coffee className="w-4 h-4" /> Freshly Brewed Daily
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight text-zinc-900">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-zinc-500 max-w-lg mb-12 leading-relaxed italic">
              {c?.heroSubline}
            </p>
            <div className="flex gap-4">
              <MagneticButton
                href="#menu"
                style={{ background: brand, color: "#fff" }}
                className="px-8 py-4 rounded-full font-bold text-sm shadow-xl"
              >
                Explore The Menu
              </MagneticButton>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="relative aspect-square rounded-[80px] overflow-hidden rotate-3 shadow-2xl border-8 border-white">
              <img 
                src={formData.heroImageUrl || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80"} 
                className="w-full h-full object-cover" 
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 border-y bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
          <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> {formData.city}</div>
          <div className="flex items-center gap-3"><Clock className="w-4 h-4" /> Open Daily: 08:00 - 18:00</div>
          <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-current text-amber-400" /><Star className="w-3 h-3 fill-current text-amber-400" /><Star className="w-3 h-3 fill-current text-amber-400" /><Star className="w-3 h-3 fill-current text-amber-400" /><Star className="w-3 h-3 fill-current text-amber-400" /></div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-[#fdfcf9]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">Bistro Classics</h2>
              <div className="flex justify-center gap-8 mb-16">
                {Object.keys(MENU).map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-zinc-900 text-white' : 'bg-white border text-zinc-400 hover:text-zinc-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {(MENU as any)[activeCategory].map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-end group cursor-pointer border-b border-zinc-100 pb-8 hover:pb-10 transition-all">
                  <div className="text-left">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-zinc-500 transition-colors">{item.name}</h3>
                    <p className="text-zinc-400 text-sm italic font-light">{item.desc}</p>
                  </div>
                  <div className="text-2xl font-black text-zinc-900 italic">${item.price}</div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="h-full pt-20"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" className="w-full h-full object-cover rounded-3xl" /></div>
              <div className="h-full pb-20"><img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80" className="w-full h-full object-cover rounded-3xl" /></div>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 leading-tight">Simple Food,<br/>Real Passion.</h2>
            <p className="text-lg text-zinc-500 leading-relaxed italic mb-12">
              {c?.aboutText}
            </p>
            <div className="space-y-6">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-400 group">
                  <div className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform" style={{ background: brand }} />
                  {b}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-40 bg-[#fdfcf9] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 italic">Join Us At The Table.</h2>
            <p className="text-lg text-zinc-500 mb-16 italic">
              Located in the heart of {formData.city}, we&apos;re open every day to serve you the best artisan coffee and local classics.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl"
              >
                Find Us On Maps
              </MagneticButton>
              <button className="px-10 py-5 border bg-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-50 transition-colors">
                Call {formData.phone || "Us Today"}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
