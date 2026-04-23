"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Hexagon, Activity, Shield, Coins } from "lucide-react";
import "../premium.css";

const STATS = [
  { val: "$4.2B", lbl: "Total Value Locked", icon: <Coins /> },
  { val: "$840M", lbl: "24h Volume", icon: <Activity /> },
  { val: "124K", lbl: "Active Traders", icon: <Shield /> }
];

export default function PremiumWeb3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yStats = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#030303] text-white min-h-screen font-sans overflow-hidden selection:bg-[#8B5CF6] selection:text-white">
      
      {/* REACTIVE GLOWING ORBS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#8B5CF6] mix-blend-screen filter blur-[150px] opacity-20" 
        />
        <motion.div 
           style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }}
           className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-[#3B82F6] mix-blend-screen filter blur-[150px] opacity-20" 
        />
      </div>

      <header className="relative z-50 px-6 md:px-12 py-8 flex justify-between items-center w-full">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
           <Hexagon className="w-8 h-8 text-[#8B5CF6] animate-[spin_10s_linear_infinite]" />
           NEXUS<span className="text-[#8B5CF6]">.fi</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.1)]">
            <Link href="#" className="hover:text-white transition-colors">Protocol</Link>
            <Link href="#" className="hover:text-white transition-colors">Ecosystem</Link>
            <Link href="#" className="hover:text-white transition-colors">Governance</Link>
        </nav>
        <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#8B5CF6] hover:text-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
           Launch App
        </button>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="max-w-[1200px] w-full">
                
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#8B5CF6] mb-12 border border-[#8B5CF6]/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]"></span> Mainnet V2 is Live
                </div>
                
                <h1 className="text-6xl md:text-[8vw] font-black mb-8 leading-[0.85] tracking-tighter mix-blend-overlay text-white drop-shadow-2xl uppercase">
                    Decentralized <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>Liquidity Matrix.</span>
                </h1>
                
                <p className="text-xl md:text-3xl text-white/50 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                    The next-generation AMM providing institutional-grade liquidity, zero-slippage execution, and seamless cross-chain composability.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform shadow-[0_0_40px_rgba(139,92,246,0.5)] flex items-center justify-center gap-3">
                       Start Trading <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3">
                       Read Whitepaper
                    </button>
                </div>
            </motion.div>
        </section>

        {/* PARALLAX STATS */}
        <section className="py-32 px-6 max-w-[1600px] mx-auto overflow-hidden">
            <motion.div style={{ y: yStats }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {STATS.map((stat, i) => (
                    <motion.div 
                       key={i} 
                       initial={{ opacity: 0, y: 50 }} 
                       whileInView={{ opacity: 1, y: 0 }} 
                       viewport={{ once: true, margin: "-100px" }} 
                       transition={{ duration: 0.8, delay: i * 0.2 }} 
                       className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 relative group hover:border-[#8B5CF6]/50 transition-colors duration-500 cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#8B5CF6] mb-8 border border-white/5 group-hover:scale-110 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(139,92,246,0)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                           {stat.icon}
                        </div>
                        
                        <div className="text-6xl lg:text-[5vw] font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30 group-hover:from-white group-hover:to-white transition-all duration-500">
                           {stat.val}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.3em] font-black text-[#8B5CF6]">{stat.lbl}</div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
        
        {/* NETWORK VISUALIZATION */}
        <section className="py-32 relative overflow-hidden border-t border-white/5">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_110%)] pointer-events-none" />
           <div className="text-center relative z-10 px-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Secured by Mathematics.</h2>
              <p className="text-white/50 max-w-xl mx-auto font-light text-lg">Fully audited smart contracts. Bug bounties up to $1,000,000. Immutable logic deployed across 12 chains.</p>
           </div>
        </section>

      </main>
    </div>
  );
}
