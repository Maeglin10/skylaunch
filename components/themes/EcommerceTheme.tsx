"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem } from "./AnimationHelpers";
import { ShoppingBag, X, Plus, Minus, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

// --- Mock Data Generator ---
const generateProducts = (businessType: string, brandColor: string) => {
  const isFashion = businessType.toLowerCase().includes("fashion") || businessType.toLowerCase().includes("boutique");
  const isJewelry = businessType.toLowerCase().includes("jewelry") || businessType.toLowerCase().includes("luxury");
  
  const base = [
    { id: 1, name: "Premium Collection Item", price: 129, category: "Featured" },
    { id: 2, name: "Limited Edition Release", price: 89, category: "New Arrivals" },
    { id: 3, name: "Signature Series A", price: 199, category: "Bestsellers" },
    { id: 4, name: "Essential Pack", price: 45, category: "Featured" },
    { id: 5, name: "Modern Classic", price: 155, category: "New Arrivals" },
    { id: 6, name: "Artisanal Selection", price: 210, category: "Bestsellers" },
  ];

  return base.map(p => ({
    ...p,
    image: `https://images.unsplash.com/photo-${1500000000000 + p.id * 1000}?w=800&q=80`,
    rating: 4.5 + Math.random() * 0.5
  }));
};

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]));

  function handleMouse(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

export function EcommerceTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";
  const products = generateProducts(formData.businessType, brand);
  
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const addToCart = (p: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const filteredProducts = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <ThemeWrapper session={session}>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-zinc-900">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          src={formData.heroImageUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <Reveal>
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
              New Collection 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight max-w-3xl">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-white/70 max-w-xl mb-12 leading-relaxed">
              {c?.heroSubline}
            </p>
            <div className="flex gap-6">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: brand }}
                className="px-10 py-5 rounded-none font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all"
              >
                Shop Now
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 text-zinc-400">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><Truck className="w-5 h-5 text-zinc-900" /> Free Shipping</div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><ShieldCheck className="w-5 h-5 text-zinc-900" /> Secure Payment</div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><RotateCcw className="w-5 h-5 text-zinc-900" /> 30-Day Returns</div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter">Explore {formData.businessName}</h2>
              <div className="w-20 h-2 mt-6" style={{ background: brand }} />
            </Reveal>
            
            <div className="flex gap-4">
              {["All", "Featured", "New Arrivals", "Bestsellers"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-400 hover:text-zinc-900 border'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredProducts.map(p => (
              <StaggerItem key={p.id}>
                <TiltCard>
                  <div className="group bg-white border border-zinc-100 overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white text-[10px] font-black uppercase tracking-widest border border-zinc-100">{p.category}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => addToCart(p)}
                          className="bg-white text-zinc-900 px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-zinc-100 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{p.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /> <span className="text-xs font-bold">{p.rating}</span></div>
                      </div>
                      <div className="text-xl font-black" style={{ color: brand }}>${p.price}</div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Lookbook / Collections */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <h3 className="text-4xl font-black mb-8 uppercase tracking-tighter leading-tight">Curated with Passion,<br/>Delivered with Precision.</h3>
              <p className="text-lg text-zinc-500 mb-12 leading-relaxed">
                {c?.aboutText}
              </p>
              <div className="grid grid-cols-2 gap-8">
                {formData.benefits.map((b, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: brand }}>{i+1}</div>
                    <div className="font-bold uppercase text-xs tracking-widest">{b}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-6 h-[600px]">
              <div className="h-full pt-12"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" className="w-full h-full object-cover" /></div>
              <div className="h-full pb-12"><img src="https://images.unsplash.com/photo-1529139513055-119712d289b5?w=800&q=80" className="w-full h-full object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[1000] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[1001] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="font-black uppercase tracking-widest text-lg">Your Cart</span>
                  <span className="bg-zinc-100 text-zinc-500 text-xs px-2 py-0.5 rounded-full">{cart.reduce((a, b) => a + b.qty, 0)}</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-4">
                    <ShoppingBag className="w-12 h-12 opacity-20" />
                    <p className="uppercase text-xs font-bold tracking-widest">Cart is empty</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-6 items-center">
                        <div className="w-20 h-24 bg-zinc-100 overflow-hidden flex-shrink-0">
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + item.id * 1000}?w=200&q=80`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold mb-1">{item.name}</div>
                          <div className="text-zinc-500 text-sm mb-4">${item.price}</div>
                          <div className="flex items-center gap-4">
                            <button className="p-1 border hover:bg-zinc-50" onClick={() => setCart(prev => prev.map(i => i.id === item.id && i.qty > 1 ? {...i, qty: i.qty - 1} : i))}><Minus className="w-3 h-3" /></button>
                            <span className="font-bold text-sm">{item.qty}</span>
                            <button className="p-1 border hover:bg-zinc-50" onClick={() => setCart(prev => prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i))}><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                        <button className="text-zinc-300 hover:text-red-500 transition-colors" onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 border-t bg-zinc-50">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold uppercase text-xs tracking-widest text-zinc-400">Total Amount</span>
                  <span className="text-2xl font-black">${cart.reduce((a, b) => a + b.price * b.qty, 0)}</span>
                </div>
                <button 
                  disabled={cart.length === 0}
                  style={{ background: brand }}
                  className="w-full py-5 rounded-none text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ThemeWrapper>
  );
}
