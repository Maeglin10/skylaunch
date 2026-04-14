"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function LuxuryJewelryDetail() {
  return (
    <div className="premium-theme bg-[#0d0a09] text-[#e5e1da] min-h-screen font-serif selection:bg-amber-800">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-[#0d0a09]/60 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl tracking-[0.4em] font-light uppercase">Aurum</Link>
        <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold"><span>Collection</span><span>About</span><span>Cart(0)</span></div>
      </nav>

      <main className="pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="relative group">
                <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full group-hover:bg-amber-500/20 transition-all duration-1000" />
                <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                    <Image src="https://images.unsplash.com/photo-1598560943141-8f566498ec00?auto=format&fit=crop&q=80&w=1200" alt="Ring Detail" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a09]/60 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex flex-col items-center justify-center text-center shadow-2xl">
                    <span className="text-[10px] tracking-widest uppercase opacity-40 mb-1">Purity</span>
                    <span className="text-xl font-light tracking-widest">18K GOLD</span>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.3 }} className="space-y-12">
                <div className="space-y-4">
                    <span className="text-amber-500 text-xs tracking-[1em] uppercase block font-bold">Iconic Series</span>
                    <h1 className="text-6xl md:text-8xl font-light italic tracking-tight leading-tight">The Celestial Band.</h1>
                    <div className="w-16 h-px bg-amber-500/30" />
                </div>
                
                <p className="text-xl opacity-60 leading-relaxed font-light italic">Hand-crafted from solid 18k yellow gold, featuring a constellation of ethically sourced diamonds that dance with the light.</p>
                
                <div className="space-y-6">
                    <div className="text-4xl font-light tracking-tighter italic">$12,450</div>
                    <div className="flex gap-4">
                        <button className="flex-1 py-5 bg-[#e5e1da] text-[#0d0a09] text-xs font-bold tracking-[0.4em] uppercase hover:bg-white transition-colors">Add to Collection</button>
                        <button className="w-16 h-16 flex items-center justify-center border border-white/10 hover:border-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                    <div>
                        <span className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 font-bold italic">Dimensions</span>
                        <p className="text-sm font-light italic">Width: 3.2mm // Diamonds: 0.8ct total weight</p>
                    </div>
                    <div>
                        <span className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 font-bold italic">Delivery</span>
                        <p className="text-sm font-light italic">Ships within 14 business days. Insured worldwide.</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </main>
    </div>
  );
}
