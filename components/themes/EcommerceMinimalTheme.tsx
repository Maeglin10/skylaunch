"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem } from "./AnimationHelpers";
import { X, ArrowRight, Minus, Plus } from "lucide-react";

// --- Mock Data Generator ---
const generateProducts = (businessType: string) => {
  return [
    { id: 1, name: "Modular Object 01", price: 45.00, ref: "M-01" },
    { id: 2, name: "System Component 02", price: 120.00, ref: "S-02" },
    { id: 3, name: "Interface Element 03", price: 65.00, ref: "I-03" },
    { id: 4, name: "Structural Unit 04", price: 150.00, ref: "U-04" },
    { id: 5, name: "Functional Tool 05", price: 35.00, ref: "T-05" },
    { id: 6, name: "Base Module 06", price: 85.00, ref: "B-06" },
  ].map(p => ({
    ...p,
    image: `https://images.unsplash.com/photo-${1500000000000 + p.id * 8000}?w=800&q=80`,
  }));
};

export function EcommerceMinimalTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#000000";
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
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="pt-48 pb-32 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <h1 className="text-[12vw] font-bold leading-[0.8] tracking-tighter uppercase mb-20 text-black">
              {c?.heroHeadline}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
              <p className="text-2xl text-gray-400 max-w-lg leading-tight uppercase font-medium">
                {c?.heroSubline}
              </p>
              <div className="flex justify-end gap-12 text-[10px] font-bold uppercase tracking-widest text-gray-300">
                <span>EST. 2026</span>
                <span>SYSTEM VERSION // 1.0</span>
                <span>{formData.city}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid Shop */}
      <section id="shop" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-1">
            {products.map((p, i) => (
              <StaggerItem key={p.id}>
                <div className="group border p-12 hover:bg-gray-50 transition-colors cursor-crosshair">
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">REF: {p.ref}</span>
                    <span className="text-xl font-bold">${p.price.toFixed(2)}</span>
                  </div>
                  <div className="aspect-square bg-gray-100 mb-12 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    <img src={p.image} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase mb-8">{p.name}</h3>
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full py-4 border-t border-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-between hover:bg-black hover:text-white transition-all px-4"
                  >
                    Add to Cart <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <Reveal>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-8">Structural Intent.</h2>
              <p className="text-gray-400 leading-tight mb-12">
                {c?.aboutText}
              </p>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1 bg-gray-100 border">
                {formData.benefits.map((b, i) => (
                  <div key={i} className="bg-white p-12 border">
                    <div className="text-[10px] font-bold text-gray-300 mb-6 tracking-[0.2em] uppercase">PRINCIPLE 0{i+1}</div>
                    <div className="text-xl font-bold uppercase leading-none">{b}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cart Drawer Minimal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-white/80 z-[1000] backdrop-blur-md"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white border-l z-[1001] flex flex-col"
            >
              <div className="p-12 border-b flex justify-between items-center">
                <div className="text-3xl font-bold uppercase tracking-tighter">Your Cart</div>
                <button onClick={() => setIsCartOpen(false)}><X className="w-8 h-8" /></button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="p-12 text-gray-300 text-sm font-bold uppercase tracking-widest">The list is empty.</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="p-12 border-b flex gap-12 items-center">
                      <div className="w-24 h-24 bg-gray-50 border p-4 flex-shrink-0">
                        <img src={`https://images.unsplash.com/photo-${1500000000000 + item.id * 8000}?w=200&q=80`} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xl font-bold uppercase mb-2">{item.name}</div>
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">${item.price.toFixed(2)} / UNIT</div>
                        <div className="flex items-center gap-6">
                          <button onClick={() => setCart(prev => prev.map(i => i.id === item.id && i.qty > 1 ? {...i, qty: i.qty - 1} : i))}><Minus className="w-4 h-4" /></button>
                          <span className="font-bold">{item.qty}</span>
                          <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i))}><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-12 bg-black text-white">
                <div className="flex justify-between items-center mb-12">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Total Settlement</span>
                  <span className="text-4xl font-bold">${cart.reduce((a,b) => a + b.price * b.qty, 0).toFixed(2)}</span>
                </div>
                <button className="w-full py-6 border border-white text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ThemeWrapper>
  );
}
