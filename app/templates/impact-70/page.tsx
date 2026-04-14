"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const COINS = [
  { name: "AEVIA", price: "4,420.24", change: "+12.4%" },
  { name: "SKYL", price: "0.1245", change: "-2.1%" },
  { name: "CORE", price: "89.12", change: "+0.8%" },
];

export default function CryptoTickerDynamic() {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTicker(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="premium-theme bg-[#050505] text-white min-h-screen selection:bg-rose-500 font-mono overflow-x-hidden">
      
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 opacity-20">
         <Image 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000" 
            alt="Crypto BG" 
            fill 
            className="object-cover contrast-150 grayscale" 
         />
         <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Ticker Banner */}
      <div className="fixed top-0 left-0 w-full z-100 bg-rose-600 text-black p-2 flex overflow-hidden">
         <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 font-black text-[10px] uppercase italic tracking-widest"
         >
            {Array.from({ length: 10 }).map((_, i) => (
               <div key={i} className="flex gap-12">
                  <span>LIVE_DATA_FEED_0x70</span>
                  <span>BTC_USD: 64,231.12</span>
                  <span>ETH_GAS: 12 Gwei</span>
                  <span>AEVIA_NET: STABLE</span>
               </div>
            ))}
         </motion.div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-12 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-rose-600">Crypto.Node</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">System_Uptime: 99.9%</div>
      </nav>

      <main className="grid grid-cols-12 min-h-screen pt-48 px-12 gap-12 max-w-7xl mx-auto items-center">
         
         {/* Left: Interactive Graph (Simulated) */}
         <div className="col-span-12 lg:col-span-8 space-y-12">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-neutral-900/50 p-12 rounded-[3rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden h-[400px] flex items-end"
            >
               <div className="absolute top-8 left-8 text-[10px] font-black opacity-40 flex gap-4 uppercase">
                  <span>Trend_Analytics</span>
                  <span className="text-rose-600">● LIVE</span>
               </div>
               
               {/* Simulated Data Bars */}
               <div className="flex items-end gap-2 w-full h-2/3">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div 
                       key={i}
                       animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                       transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                       className={`flex-1 ${i % 2 === 0 ? 'bg-rose-600' : 'bg-white/10'} rounded-t-lg`}
                    />
                  ))}
               </div>
            </motion.div>
         </div>

         {/* Right: Asset List */}
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <h2 className="text-xs uppercase tracking-[0.8em] font-black italic opacity-20 mb-8 border-b border-white/10 pb-4">Top_Assets</h2>
            <div className="space-y-4">
               {COINS.map((coin, i) => (
                  <motion.div 
                    key={coin.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 border border-white/5 rounded-2xl bg-white/5 flex justify-between items-center group hover:border-rose-600 transition-all cursor-crosshair"
                  >
                     <div>
                        <h3 className="text-2xl font-black italic">{coin.name}</h3>
                        <span className="text-[10px] opacity-40 uppercase tracking-widest">{coin.change} (24H)</span>
                     </div>
                     <div className="text-right">
                        <div className="text-xl font-black text-rose-600">${coin.price}</div>
                        <div className="text-[10px] opacity-40 font-mono italic">SY_Ref_0{i}</div>
                     </div>
                  </motion.div>
               ))}
            </div>
            
            <button className="w-full mt-12 px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 hover:text-white transition-all rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)]">Execute Trade</button>
         </div>

      </main>

      {/* Floating Specs */}
      <div className="fixed left-12 bottom-12 opacity-[0.05] pointer-events-none text-[8vw] font-black italic uppercase leading-none select-none">
         LIQUIDITY_PROVIDER_NODE_CONNECTED
      </div>

    </div>
  );
}
