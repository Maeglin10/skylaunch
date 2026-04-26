"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { ShoppingBag, X, Plus, Minus, Star, ShieldCheck, Truck, RotateCcw, ArrowRight } from "lucide-react";

// --- Mock Data Generator ---
const generateProducts = (businessType: string) => {
  return [
    { id: 1, name: "The Signature Timepiece", price: 2450, cat: "Elite" },
    { id: 2, name: "Noir Essence Parfum", price: 320, cat: "Fragrance" },
    { id: 3, name: "Velvet Evening Gown", price: 1850, cat: "Couture" },
    { id: 4, name: "Gold Inlay Cufflinks", price: 540, cat: "Jewelry" },
    { id: 5, name: "Luxe Leather Carryall", price: 980, cat: "Accessories" },
    { id: 6, name: "Silk Monogram Scarf", price: 210, cat: "Essentials" },
  ].map(p => ({
    ...p,
    image: `https://images.unsplash.com/photo-${1500000000000 + p.id * 5000}?w=800&q=80`,
    rating: 4.9
  }));
};

export function EcommerceLuxuryTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#c9a84c"; // Gold fallback
  const products = generateProducts(formData.businessType);
  
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (p: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <ThemeWrapper session={session} dark={true}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Montserrat:wght@100;300;600&display=swap');
        .luxury-text { font-family: 'Playfair Display', serif; }
        .luxury-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={formData.heroImageUrl || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80"} 
            className="w-full h-full object-cover opacity-50" 
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-block px-6 py-1 rounded-full border border-white/20 text-[10px] luxury-sans uppercase tracking-[0.5em] mb-12 text-white/40">
              Collection Privée
            </div>
            <h1 className="text-6xl md:text-9xl luxury-text italic text-white mb-12 leading-none">
              {c?.heroHeadline}
            </h1>
            <p className="text-lg md:text-xl text-white/50 luxury-sans font-light tracking-[0.1em] max-w-2xl mx-auto mb-16 italic">
              {c?.heroSubline}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ border: `1px solid ${brand}`, color: brand }}
                className="px-16 py-5 luxury-sans uppercase text-[10px] font-bold tracking-[0.4em] hover:bg-white hover:text-black hover:border-white transition-all duration-700"
              >
                Discover The Gallery
              </button>
            </div>
          </Reveal>
        </div>

        {/* Decorative Lines */}
        <div className="absolute left-10 top-0 h-full w-[1px] bg-white/5 hidden lg:block" />
        <div className="absolute right-10 top-0 h-full w-[1px] bg-white/5 hidden lg:block" />
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl luxury-text text-white mb-12 italic leading-tight">The Art of <br/>Exceptional Choice.</h2>
            <p className="text-lg text-white/30 luxury-sans font-light leading-relaxed mb-16">
              {c?.aboutText}
            </p>
            <div className="space-y-10">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex gap-6 items-center">
                  <div className="text-[10px] luxury-sans text-white/20">0{i+1}</div>
                  <div className="h-[1px] w-12 bg-white/10" />
                  <div className="text-sm luxury-sans uppercase tracking-widest text-white/70">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2} className="relative">
            <div className="aspect-[3/4] border border-white/10 p-4">
              <img src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=800&q=80" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-white/10 p-2 hidden lg:block">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid Shop */}
      <section id="shop" className="py-40 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32">
            <Reveal>
              <span className="text-[10px] luxury-sans text-white/20 uppercase tracking-[0.4em] mb-4 block">The Archives</span>
              <h2 className="text-6xl luxury-text text-white italic">Elite Selection<span style={{ color: brand }}>.</span></h2>
            </Reveal>
            <div className="text-white/20 luxury-sans text-[10px] uppercase tracking-widest hidden md:block">
              Ref 0x2026 // Archive_Series
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-y-32 gap-x-12">
            {products.map((p, i) => (
              <StaggerItem key={p.id}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden mb-8 border border-white/5">
                    <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <button 
                        onClick={() => addToCart(p)}
                        className="luxury-sans text-[10px] uppercase tracking-[0.5em] text-white border-b border-white pb-2 hover:opacity-50"
                      >
                        Add to Private Collection
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="luxury-sans text-[10px] uppercase tracking-[0.2em] text-white/30">{p.cat}</div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-2.5 h-2.5 text-[#c9a84c] fill-current" />)}
                    </div>
                  </div>
                  <h3 className="text-2xl luxury-text text-white mb-2 italic tracking-wide">{p.name}</h3>
                  <div className="luxury-sans font-bold text-lg" style={{ color: brand }}>${p.price.toLocaleString()}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Cart Drawer Luxury */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/90 z-[1000] backdrop-blur-md"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0a0a0a] border-l border-white/5 z-[1001] flex flex-col p-12"
            >
              <div className="flex justify-between items-center mb-20">
                <div className="luxury-text text-3xl text-white italic">Private Selection</div>
                <button onClick={() => setIsCartOpen(false)}><X className="w-6 h-6 text-white/20 hover:text-white transition-colors" /></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-12">
                {cart.length === 0 ? (
                  <div className="text-center text-white/10 luxury-text text-xl italic pt-20">Your collection is empty</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-8 items-center border-b border-white/5 pb-8">
                      <div className="w-20 h-24 bg-white/5 grayscale">
                        <img src={`https://images.unsplash.com/photo-${1500000000000 + item.id * 5000}?w=200&q=80`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="luxury-text text-xl text-white mb-2">{item.name}</div>
                        <div className="luxury-sans text-[10px] text-white/40 uppercase tracking-widest">${item.price.toLocaleString()} // Qty {item.qty}</div>
                      </div>
                      <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}><X className="w-4 h-4 text-white/10" /></button>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-12 mt-auto">
                <div className="flex justify-between items-center mb-12">
                  <div className="luxury-sans text-[10px] text-white/30 uppercase tracking-[0.3em]">Total Investment</div>
                  <div className="luxury-text text-3xl text-white italic">${cart.reduce((a,b) => a + b.price * b.qty, 0).toLocaleString()}</div>
                </div>
                <button 
                  style={{ background: brand }}
                  className="w-full py-6 luxury-sans text-[10px] uppercase font-bold tracking-[0.4em] text-black shadow-2xl hover:scale-[1.02] transition-transform"
                >
                  Finalize Acquisition
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ThemeWrapper>
  );
}
