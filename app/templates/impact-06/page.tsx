"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Star, ArrowUpRight, ArrowRight, Zap, Droplets, Wind, Plus, Minus, X, ChevronDown, Heart, Check, Sparkles, Eye } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "Neural Mist", price: 290, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop", desc: "A molecular hydration spray for long-term focus and cognitive clarity.", badge: "Bestseller" },
  { id: 2, name: "Bio-Glass Pro", price: 850, image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1000&auto=format&fit=crop", desc: "AR-integrated lenses designed for seamless digital-biological blending.", badge: "New" },
  { id: 3, name: "Flow Core X", price: 1200, image: "https://images.unsplash.com/photo-1614729939124-03290b5609ce?q=80&w=1000&auto=format&fit=crop", desc: "A portable haptic relay for tactile interaction in virtual spaces.", badge: "Limited" },
  { id: 4, name: "Synapse Band", price: 540, image: "https://images.unsplash.com/photo-1615397323755-e7a8e7456d6a?q=80&w=1000&auto=format&fit=crop", desc: "Neural wristband tracking cognitive patterns and optimizing daily flow states.", badge: null },
];

const FEATURES = [
  { icon: <Droplets className="w-6 h-6" />, title: "Bio-Sync", desc: "Every product harmonizes with your biological rhythm. Zero foreign interference." },
  { icon: <Zap className="w-6 h-6" />, title: "Instant Link", desc: "Sub-millisecond neural bridging. Your thought, your action, one moment." },
  { icon: <Wind className="w-6 h-6" />, title: "Zero Mass", desc: "Molecular lattice construction creates tools that feel like they don't exist." },
  { icon: <Eye className="w-6 h-6" />, title: "Adaptive UI", desc: "Interfaces that reshape themselves based on your cognitive state in real-time." },
];

const REVIEWS = [
  { name: "Kai Tanaka", role: "Neurodesigner", text: "The Bio-Glass Pro literally changed how I perceive digital space. It's not AR, it's extension of consciousness.", rating: 5 },
  { name: "Alina Voss", role: "Flow Researcher", text: "Neural Mist is my morning ritual. Sustained clarity for 12 hours without the crash.", rating: 5 },
  { name: "Marcus Del Rio", role: "Haptic Engineer", text: "Flow Core X is the first haptic device that actually feels organic. Incredible engineering.", rating: 5 },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function FluiditySPA() {
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [activeReview, setActiveReview] = useState(0);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => {
    const p = PRODUCTS.find(pr => pr.id === i.id);
    return sum + (p?.price ?? 0) * i.qty;
  }, 0);

  const addToCart = (id: number) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === id);
      if (exists) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, qty: 1 }];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => setActiveReview(p => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const selected = activeProduct ? PRODUCTS.find(p => p.id === activeProduct) : null;

  return (
    <div className="premium-theme bg-[#050510] text-white min-h-screen overflow-x-hidden selection:bg-pink-500 font-sans">

      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div animate={{ x: [0, 50, -30, 0], y: [0, -50, 50, 0], scale: [1, 1.1, 0.9, 1], rotate: 180 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-15%] w-[80%] h-[80%] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-[100px]" />
        <motion.div animate={{ x: [0, -50, 30, 0], y: [0, 50, -50, 0], scale: [1.1, 0.9, 1.1, 1], rotate: -180 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-15%] right-[-15%] w-[80%] h-[80%] bg-gradient-to-tr from-pink-600/20 to-rose-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-between items-center bg-[#050510]/60 backdrop-blur-xl border-b border-white/5">
        <button onClick={() => scrollTo("hero")} className="text-xl font-black lowercase tracking-tighter flex items-center gap-2 group">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full group-hover:scale-125 transition-transform duration-500 shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
          fluidity.
        </button>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-white/40">
          <button onClick={() => scrollTo("products")} className="hover:text-white transition-colors">Products</button>
          <button onClick={() => scrollTo("features")} className="hover:text-white transition-colors">Technology</button>
          <button onClick={() => scrollTo("reviews")} className="hover:text-white transition-colors">Reviews</button>
        </div>
        <button onClick={() => setCartOpen(true)} className="relative p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-[8px] flex items-center justify-center font-bold">
              {cartCount}
            </motion.span>
          )}
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 mb-10">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-[11px] font-semibold text-pink-300 uppercase tracking-wider">Series 08 / Bio-Sync Technology</span>
            </div>
            <h1 className="text-[14vw] md:text-[9vw] font-black leading-none mb-8 tracking-tighter">
              Organic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Ambition.</span>
            </h1>
            <p className="text-lg md:text-xl font-light opacity-50 max-w-2xl mx-auto leading-relaxed mb-12">
              Tools for the evolutionary digital citizen. Fluid tech designed to disappear into your being.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollTo("products")} className="group relative px-12 py-5 overflow-hidden rounded-full font-bold text-sm uppercase tracking-widest transition-all">
                <span className="relative z-10 flex items-center gap-2">Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:scale-105 transition-transform duration-500" />
              </button>
              <button onClick={() => scrollTo("features")} className="px-10 py-5 border border-white/10 rounded-full text-sm font-semibold hover:border-pink-500/50 transition-all">
                Our Technology
              </button>
            </div>
          </motion.div>
        </motion.div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 z-10">
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="text-pink-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">Bio-Dynamics</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              The Core of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Flow.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass p-8 rounded-3xl border border-white/5 hover:border-pink-500/20 transition-all group h-full">
                  <div className="text-pink-400 mb-6 p-3 bg-white/5 inline-block rounded-xl group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <span className="text-pink-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">The Vault</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Series 08</h2>
            </div>
            <span className="text-sm text-white/20 font-mono">{PRODUCTS.length} products</span>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <div className="group glass rounded-3xl p-6 hover:bg-white/[0.06] transition-all border border-white/5 h-full flex flex-col">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 cursor-pointer" onClick={() => setActiveProduct(p.id)}>
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    {p.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full text-[9px] font-bold uppercase tracking-wider">{p.badge}</div>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); setWishlist(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id]); }}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${wishlist.includes(p.id) ? "bg-pink-500 text-white" : "bg-black/40 hover:bg-pink-500"}`}>
                      <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? "fill-white" : ""}`} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">{p.name}</h3>
                    <p className="text-xs text-white/30 mb-4 line-clamp-2">{p.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-lg font-light">${p.price}</span>
                    <button onClick={() => addToCart(p.id)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-pink-500 hover:border-pink-500 transition-all flex items-center gap-1.5">
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="relative z-10 py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-pink-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">Community</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-16">Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">pioneers.</span></h2>
          </Reveal>
          <div className="relative min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeReview} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
                <div className="flex gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-pink-400 text-pink-400" />)}</div>
                <p className="text-xl md:text-2xl font-light leading-relaxed italic text-white/60 mb-8 max-w-2xl">&ldquo;{REVIEWS[activeReview].text}&rdquo;</p>
                <div className="text-sm font-bold">{REVIEWS[activeReview].name}</div>
                <div className="text-xs text-white/30">{REVIEWS[activeReview].role}</div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setActiveReview(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeReview ? "bg-pink-500 w-6" : "bg-white/10"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6 md:px-12">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">ecosystem.</span>
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto">Subscribe for early access to new drops, exclusive pricing, and community events.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-full text-sm placeholder:text-white/20 focus:border-pink-500 focus:outline-none transition-colors" />
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">Subscribe</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 border-t border-white/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter lowercase">fluidity.</div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-semibold text-white/20">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <span className="text-[10px] text-white/10 uppercase tracking-wider">&copy; 2026 Fluidity Labs</span>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed top-0 right-0 h-full w-full max-w-md z-[100] bg-[#0a0a18] border-l border-white/5 flex flex-col">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold">Cart ({cartCount})</h3>
                <button onClick={() => setCartOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? <p className="text-center text-white/20 py-20">Your cart is empty</p> :
                  cart.map(item => {
                    const p = PRODUCTS.find(pr => pr.id === item.id)!;
                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-xl relative overflow-hidden shrink-0"><Image src={p.image} alt={p.name} fill className="object-cover" /></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold">{p.name}</h4>
                          <span className="text-sm text-white/40">${p.price}</span>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="w-6 h-6 border border-white/10 rounded flex items-center justify-center text-xs">-</button>
                            <span className="text-sm w-4 text-center">{item.qty}</span>
                            <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="w-6 h-6 border border-white/10 rounded flex items-center justify-center text-xs">+</button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5">
                  <div className="flex justify-between mb-4"><span className="text-white/40 text-sm">Subtotal</span><span className="text-lg font-bold">${cartTotal}</span></div>
                  <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full font-bold text-sm">Checkout</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#050510]/95 backdrop-blur-2xl overflow-y-auto flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} className="glass rounded-3xl border border-white/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
              <div className="relative aspect-square"><Image src={selected.image} alt={selected.name} fill className="object-cover" /></div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <button onClick={() => setActiveProduct(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"><X className="w-4 h-4" /></button>
                {selected.badge && <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full text-[9px] font-bold uppercase tracking-wider mb-4 w-fit">{selected.badge}</span>}
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">{selected.name}</h2>
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-pink-400 text-pink-400" />)}</div>
                <p className="text-white/40 text-sm leading-relaxed mb-8">{selected.desc} Constructed with advanced molecular integrity for zero-mass feeling.</p>
                <div className="text-2xl font-light mb-8">${selected.price}.00</div>
                <button onClick={() => { addToCart(selected.id); setCartOpen(true); setActiveProduct(null); }} className="w-full py-4 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full font-bold text-sm flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.08); }
      `}</style>
    </div>
  );
}
