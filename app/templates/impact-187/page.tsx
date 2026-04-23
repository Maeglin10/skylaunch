"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Globe, ChevronRight, BarChart3, CreditCard } from "lucide-react";
import "../premium.css";

const FEATURES = [
  { icon: <Globe />, title: "Global Transfers", desc: "Send money across 150+ countries instantly with zero hidden fees and real-time exchange rates." },
  { icon: <BarChart3 />, title: "Smart Wealth", desc: "Automated portfolio balancing and AI-driven insights to grow your wealth passively." },
  { icon: <ShieldCheck />, title: "Bank-Grade Security", desc: "Multi-party computation (MPC) and biometric authentication keeping your assets locked down." }
];

export default function PremiumFintech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yDash = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacityDash = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#030712] text-white min-h-screen font-sans selection:bg-[#3B82F6] selection:text-white overflow-hidden relative">
      
      {/* 3D ORB BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-[#3B82F6] rounded-full mix-blend-screen filter blur-[150px] opacity-30" 
        />
        <motion.div 
           style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }}
           className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-[#10B981] rounded-full mix-blend-screen filter blur-[150px] opacity-20" 
        />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 bg-[#030712]/50 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-xl flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]">
               V
            </div>
            <span className="font-black tracking-tight text-2xl">Vault.</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-white/50">
            <Link href="#" className="hover:text-white transition-colors">Products</Link>
            <Link href="#" className="hover:text-white transition-colors">Business</Link>
            <Link href="#" className="hover:text-white transition-colors">Company</Link>
        </nav>
        
        <div className="flex items-center gap-6">
            <Link href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors hidden md:block">Log In</Link>
            <button className="bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               Get Started
            </button>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-48 pb-32 px-6 max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" /> Vault 2.0 is Here
                </div>
                
                <h1 className="text-6xl md:text-[7vw] font-black tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
                    Banking for the <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#10B981]">Next Generation.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                    Seamless global transfers, intelligent wealth management, and crystal-clear analytics. Your financial life, elevated.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white px-10 py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center justify-center gap-3">
                       Open Free Account <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                       See How it Works <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </section>

        {/* GLASSMORPHIC DASHBOARD MOCKUP */}
        <section className="px-6 pb-48 max-w-[1400px] mx-auto">
            <motion.div 
               style={{ y: yDash, opacity: opacityDash }}
               className="relative rounded-[3rem] bg-[#0A0F1C]/80 backdrop-blur-3xl border border-white/10 shadow-[0_40px_100px_rgba(59,130,246,0.2)] p-4 md:p-8 overflow-hidden group"
            >
                {/* Glow ring on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 via-transparent to-[#10B981]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                
                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                   
                   {/* Left Panel */}
                   <div className="flex-1 space-y-8">
                      {/* Balance Card */}
                      <div className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                         <div className="flex justify-between items-start mb-12">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Total Balance</div>
                            <div className="flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] px-3 py-1.5 rounded-lg text-xs font-bold">
                               +2.4% <ArrowRight className="w-3 h-3 -rotate-45" />
                            </div>
                         </div>
                         <div className="text-6xl font-black tracking-tighter mb-2">$124,532.00</div>
                         <div className="text-sm font-medium text-white/30">+ $2,430.50 this month</div>
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                         <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-8">Recent Activity</div>
                         <div className="space-y-6">
                            {[
                               { name: "Apple Store", cat: "Electronics", amt: "-$2,499.00", icon: <CreditCard className="w-5 h-5 text-white/50" /> },
                               { name: "Salary Deposit", cat: "Income", amt: "+$8,500.00", icon: <Zap className="w-5 h-5 text-[#10B981]" />, pos: true },
                               { name: "Uber Eats", cat: "Food", amt: "-$45.20", icon: <CreditCard className="w-5 h-5 text-white/50" /> }
                            ].map((act, i) => (
                               <div key={i} className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                                     {act.icon}
                                  </div>
                                  <div className="flex-1">
                                     <div className="font-bold">{act.name}</div>
                                     <div className="text-xs text-white/30">{act.cat}</div>
                                  </div>
                                  <div className={`font-black ${act.pos ? 'text-[#10B981]' : 'text-white'}`}>{act.amt}</div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Right Panel (Chart) */}
                   <div className="lg:w-[40%] bg-white/5 border border-white/5 rounded-3xl p-8 flex flex-col hover:bg-white/10 transition-colors relative overflow-hidden">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-12 relative z-10">Cashflow Analytics</div>
                      
                      <div className="flex-1 flex items-end gap-2 relative z-10">
                         {[20, 30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 100].map((h, i) => (
                             <motion.div 
                                key={i} 
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.05), ease: "easeOut" }}
                                className="w-full bg-gradient-to-t from-[#3B82F6] to-[#10B981] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
                             >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                   ${h * 100}
                                </div>
                             </motion.div>
                         ))}
                      </div>

                      {/* Chart Glow */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#3B82F6] blur-[80px] opacity-20 pointer-events-none" />
                   </div>
                </div>
            </motion.div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {FEATURES.map((feat, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: i * 0.1 }}
                     className="bg-white/5 border border-white/5 p-10 rounded-[2rem] hover:bg-white/10 transition-colors"
                  >
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/20 text-[#3B82F6] flex items-center justify-center mb-8 border border-[#3B82F6]/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                        {feat.icon}
                     </div>
                     <h3 className="text-2xl font-black mb-4">{feat.title}</h3>
                     <p className="text-white/50 leading-relaxed font-light">{feat.desc}</p>
                  </motion.div>
               ))}
            </div>
        </section>

      </main>
    </div>
  );
}
