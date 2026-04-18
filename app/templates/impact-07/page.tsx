"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Activity, Shield, Zap, BarChart3, Globe, ChevronRight, LayoutDashboard, Settings, User } from "lucide-react";
import "../premium.css";

export default function GlassHUD_SPA() {
  const [view, setView] = useState<"home" | "features" | "dashboard">("home");
  const [activeStat, setActiveStat] = useState(0);

  return (
    <div className="premium-theme bg-[#020205] text-white min-h-screen selection:bg-cyan-500 font-sans overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Persistence HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference">
        <button onClick={() => setView("home")} className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
             <Activity className="w-full h-full text-white" />
          </div>
          Quantum.AI
        </button>
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.4em] font-black opacity-40">
           <button onClick={() => setView("home")} className="hover:opacity-100 transition-opacity">Protocol</button>
           <button onClick={() => setView("features")} className="hover:opacity-100 transition-opacity">Neural_Net</button>
           <button onClick={() => setView("dashboard")} className="px-5 py-2 glass rounded-full hover:bg-white hover:text-black transition-all">Launch_App</button>
        </div>
        <div className="flex gap-4 items-center md:hidden">
           <button onClick={() => setView("dashboard")} className="p-2 glass rounded-lg"><LayoutDashboard className="w-5 h-5" /></button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* HOMEPAGE VIEW */}
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-7xl mx-auto">
             <div className="text-center mb-32">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                   <span className="text-cyan-400 text-[10px] uppercase tracking-[1em] mb-6 block font-black">Next-Gen Intelligence</span>
                   <h1 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-12">Analyze.<br/>Synthesize.</h1>
                   <p className="max-w-xl mx-auto text-lg md:text-xl font-light opacity-50 leading-relaxed mb-16 uppercase tracking-widest">
                      The world's first predictive neural engine for real-time global logistics and data architecture.
                   </p>
                   <div className="flex flex-wrap justify-center gap-6">
                      <button onClick={() => setView("dashboard")} className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.5em] hover:bg-cyan-400 hover:text-white transition-all rounded-sm shadow-2xl">Start Tracking</button>
                      <button onClick={() => setView("features")} className="px-10 py-5 border border-white/10 glass font-black uppercase text-xs tracking-[0.5em] hover:bg-white/5 transition-all rounded-sm">View Neural Map</button>
                   </div>
                </motion.div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Shield className="w-6 h-6" />, t: "Encryption_v9", d: "Military grade data hardening for every calculation node." },
                  { icon: <Zap className="w-6 h-6" />, t: "Instant_Neural", d: "Latency reduced to sub-ms levels across continental relays." },
                  { icon: <Globe className="w-6 h-6" />, t: "Global_Mesh", d: "Decentralized processing power distributed globally." },
                ].map((f, i) => (
                  <div key={i} className="glass p-10 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group">
                     <div className="text-cyan-400 mb-8 p-3 bg-white/5 inline-block rounded-xl group-hover:scale-110 transition-transform">{f.icon}</div>
                     <h3 className="text-xl font-black uppercase tracking-tight mb-4">{f.t}</h3>
                     <p className="text-sm opacity-40 leading-relaxed uppercase tracking-tighter">{f.d}</p>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

        {/* FEATURES VIEW */}
        {view === "features" && (
          <motion.div key="features" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                   <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">The<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Neural</span><br/>Infrastructure.</h2>
                   <div className="space-y-10">
                      {[
                        "Predictive market flow synthesis",
                        "Real-time resource allocation nodes",
                        "Haptic visual dashboards for deep analytics",
                        "Automated anomaly detection protocols"
                      ].map((text, i) => (
                        <div key={i} className="flex gap-6 items-center group">
                           <div className="w-2 h-2 bg-cyan-400 group-hover:scale-[3] transition-transform" />
                           <span className="text-lg uppercase tracking-widest font-light opacity-50 group-hover:opacity-100 transition-opacity">{text}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden glass p-4 border border-white/10">
                   <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1500&auto=format&fit=crop" alt="High Tech Server" fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020205] to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-xl border border-white/10">
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">System_Load</span>
                            <span className="text-[10px] font-black text-cyan-400">Stable</span>
                         </div>
                         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "42%" }} className="h-full bg-cyan-400" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* DASHBOARD DEMO VIEW */}
        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 pb-32 px-4 md:px-12 flex items-center justify-center min-h-screen">
             <div className="w-full max-w-6xl aspect-[16/10] glass rounded-3xl border border-white/10 flex overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)]">
                {/* Sidebar */}
                <div className="w-20 md:w-64 border-r border-white/5 p-6 flex flex-col gap-10">
                   <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center p-2"><Activity className="w-full h-full text-cyan-400" /></div>
                      <span className="font-black uppercase tracking-widest hidden md:block">Console_v1</span>
                   </div>
                   <div className="space-y-4">
                      {[LayoutDashboard, BarChart3, Globe, Settings, User].map((Icon, i) => (
                        <div key={i} className={`flex gap-4 items-center p-3 rounded-xl transition-colors cursor-pointer ${i === 0 ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-white/5 opacity-40 hover:opacity-100'}`}>
                           <Icon className="w-5 h-5 flex-shrink-0" />
                           <span className="text-xs font-black uppercase tracking-widest hidden md:block">{Icon.name.replace('Icon', '')}</span>
                        </div>
                      ))}
                   </div>
                </div>
                {/* Main Content */}
                <div className="flex-grow p-8 overflow-y-auto bg-white/5">
                   <div className="flex justify-between items-end mb-12">
                      <div>
                         <h2 className="text-3xl font-black uppercase tracking-tight">Real-Time_Stream</h2>
                         <p className="text-[10px] opacity-40 uppercase tracking-[0.4em] mt-1 font-black">Monitoring Node Alpha (HK_Gateway)</p>
                      </div>
                      <div className="flex gap-3">
                         <div className="px-4 py-2 glass rounded-lg text-[10px] font-black uppercase text-cyan-400 border border-cyan-500/20">Active</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                      {[
                        { l: "Traffic", v: "4.2M", c: "text-cyan-400" },
                        { l: "Uptime", v: "100%", c: "text-green-400" },
                        { l: "Nodes", v: "842", c: "text-purple-400" },
                        { l: "Risk", v: "Low", c: "text-blue-400" },
                      ].map((s, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border border-white/5">
                           <div className="text-[8px] uppercase tracking-widest opacity-40 font-black mb-2">{s.l}</div>
                           <div className={`text-2xl font-black ${s.c}`}>{s.v}</div>
                        </div>
                      ))}
                   </div>

                   <div className="bg-black/40 rounded-3xl p-8 border border-white/5">
                      <div className="flex justify-between mb-8">
                         <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Predictive_Flow_Index</span>
                         <span className="text-[10px] uppercase tracking-widest font-black text-cyan-400">High_Accuracy</span>
                      </div>
                      <div className="h-48 flex items-end gap-2">
                         {[60, 45, 80, 55, 90, 70, 85, 40, 65, 95, 20, 50, 75, 85].map((h, i) => (
                           <motion.div 
                             key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05 }}
                             className="flex-grow bg-gradient-to-t from-cyan-600/20 to-cyan-400 rounded-sm"
                           />
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="relative z-10 py-12 px-8 border-t border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-20 text-[8px] uppercase tracking-[0.5em] font-black">
            <div>Quantum.AI &copy; 2026 / All Rights Reserved</div>
            <div className="flex gap-8">
               <span>Link_01</span>
               <span>Link_02</span>
               <span>Link_03</span>
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
