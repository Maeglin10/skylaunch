"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../premium.css";

export default function DynamicStockTicker() {
  const [data, setData] = useState([
    { sym: "AAPL", price: 198.42, change: 2.14 },
    { sym: "NVDA", price: 924.15, change: -5.32 },
    { sym: "TSLA", price: 245.80, change: 8.76 },
    { sym: "MSFT", price: 428.67, change: 1.23 },
    { sym: "AMZN", price: 186.53, change: -0.87 },
    { sym: "GOOG", price: 175.92, change: 3.41 },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => prev.map(s => ({
        ...s,
        price: +(s.price + (Math.random() - 0.5) * 2).toFixed(2),
        change: +((Math.random() - 0.45) * 10).toFixed(2)
      })));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="premium-theme bg-[#0a0e17] text-white h-screen w-full overflow-hidden relative font-mono selection:bg-green-400 selection:text-black">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(34,197,94,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,.3) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#0a0e17]/80 backdrop-blur-xl border-b border-green-500/10">
        <Link href="/" className="text-lg font-bold tracking-tight text-green-400">TRADE.OS</Link>
        <div className="flex items-center gap-3"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /><span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Markets Open</span></div>
      </nav>
      <main className="h-full flex flex-col items-center justify-center px-6 md:px-16 relative z-10">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl md:text-8xl font-black tracking-tighter text-center mb-16">LIVE<br/><span className="text-green-400">MARKETS</span></motion.h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 w-full max-w-6xl">
          {data.map((s) => (
            <motion.div key={s.sym} layout className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-green-500/20 transition-colors">
              <span className="text-xs tracking-wider opacity-50 block mb-2">{s.sym}</span>
              <div className="text-xl font-bold tabular-nums mb-1">${s.price.toFixed(2)}</div>
              <span className={`text-xs font-bold ${s.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                {s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%
              </span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
