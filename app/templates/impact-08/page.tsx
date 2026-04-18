"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Activity, Shield, Zap, Globe, LayoutDashboard, Cpu, Network, Lock, Bell, Menu } from "lucide-react";
import "../premium.css";

const LOGS = [
  "[14:22:01] PROTOCOL_INIT... OK",
  "[14:22:04] FETCHING_NODE_STREAM... (0x442)",
  "[14:22:15] BUFFER_FLUSHED...",
  "[14:22:20] ENCRYPTION_SYNC_ACTIVE",
  "[14:22:25] DETECTING_ANOMALIES... NONE",
];

export default function GlassHUD_SPA() {
  const [view, setView] = useState<"core" | "mapping" | "audit">("core");
  const [metrics, setMetrics] = useState({ cpu: 45, mem: 62, net: 12 });
  const [activeLog, setActiveLog] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 20) + 40,
        mem: Math.floor(Math.random() * 10) + 60,
        net: Math.floor(Math.random() * 50) + 5,
      });
      setActiveLog((prev) => (prev + 1) % LOGS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="premium-theme bg-[#020408] text-cyan-50 min-h-screen selection:bg-cyan-500 font-mono relative overflow-hidden">
      
      {/* Background Grid & Ambient Persistent Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.4) 1px, transparent 0)`, backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Persistence Navigation HUD */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <button onClick={() => setView("core")} className="text-xl font-black tracking-[0.4em] uppercase text-cyan-400 flex items-center gap-3">
          <Activity className="w-6 h-6 animate-pulse" /> AEON_SYSTEM
        </button>
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-black opacity-30">
           <button onClick={() => setView("core")} className={`hover:opacity-100 transition-opacity ${view === 'core' ? 'text-cyan-400 opacity-100' : ''}`}>CORE_INIT</button>
           <button onClick={() => setView("mapping")} className={`hover:opacity-100 transition-opacity ${view === 'mapping' ? 'text-cyan-400 opacity-100' : ''}`}>MESH_MAP</button>
           <button onClick={() => setView("audit")} className={`hover:opacity-100 transition-opacity ${view === 'audit' ? 'text-cyan-400 opacity-100' : ''}`}>SECURITY_INDEX</button>
        </div>
        <div className="flex gap-4 items-center">
           <div className="text-[10px] font-black uppercase text-emerald-400 animate-pulse">Online</div>
           <Menu className="w-5 h-5 opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* CORE DASHBOARD VIEW */}
        {view === "core" && (
          <motion.div key="core" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 px-6 md:px-12 grid grid-cols-12 gap-8 max-w-[1800px] mx-auto min-h-screen pb-24">
             {/* Left Column: Metrics */}
             <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                <div className="glass p-8 rounded-3xl border border-white/5 h-full">
                   <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-cyan-400 mb-8 pb-4 border-b border-white/5 flex items-center justify-between">
                      System_Load <Cpu className="w-4 h-4" />
                   </h3>
                   <div className="space-y-8">
                      {Object.entries(metrics).map(([key, val]) => (
                        <div key={key}>
                           <div className="flex justify-between text-[10px] uppercase font-black mb-3">
                              <span className="opacity-40">{key}_Process</span>
                              <span className="text-cyan-400">{val}%</span>
                           </div>
                           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div animate={{ width: `${val}%` }} transition={{ duration: 1 }} className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-[8px] uppercase font-black opacity-30 mb-2">Memory_Pool</div>
                      <div className="text-xl font-light text-white/80">0xAB_442_F1</div>
                   </div>
                </div>
             </div>

             {/* Center Column: Visualizer */}
             <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center relative bg-white/5 rounded-[4rem] border border-white/5 p-12">
                <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="relative w-full aspect-square max-w-[500px]">
                   <div className="absolute inset-[-15%] border border-cyan-500/10 rounded-full animate-[spin_30s_linear_infinite]" />
                   <div className="absolute inset-[-8%] border border-dashed border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                   <div className="relative w-full h-full rounded-full overflow-hidden glass p-4 shadow-[0_0_100px_rgba(34,211,238,0.1)]">
                      <div className="relative w-full h-full rounded-full overflow-hidden border border-cyan-500/30">
                         <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1500&auto=format&fit=crop" alt="Core HUD" fill className="object-cover brightness-150 saturate-[0.5] contrast-150 opacity-60" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent mix-blend-overlay" />
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 glass p-6 rounded-2xl border border-white/20 translate-x-12 -translate-y-4">
                      <div className="text-[10px] font-black text-cyan-400 mb-2">SCAN_ACTIVE</div>
                      <div className="text-[8px] opacity-40 leading-relaxed uppercase">Polygons: 2.1M<br/>Buffers: Stable</div>
                   </div>
                </motion.div>
                <div className="text-center mt-12">
                   <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none strike-text">Core_Vision</h1>
                   <div className="mt-6 flex justify-center gap-4">
                      <button className="px-8 py-3 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all">Rebuild_Net</button>
                      <button className="px-8 py-3 glass border border-white/10 font-black uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all">Audit_Stream</button>
                   </div>
                </div>
             </div>

             {/* Right Column: Log & Status */}
             <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                <div className="glass p-8 rounded-3xl border border-white/5 flex-grow">
                   <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-cyan-400 mb-6 pb-4 border-b border-white/5">Neural_Audit_Log</h3>
                   <div className="space-y-3 font-mono text-[9px] uppercase leading-relaxed tracking-tighter opacity-40">
                      {LOGS.map((log, i) => (
                        <div key={i} className={i === activeLog ? 'text-cyan-400 opacity-100' : ''}>
                           {log}
                        </div>
                      ))}
                      <div className="text-white opacity-25 mt-4">&gt;&gt; Listening for node broadcast...</div>
                   </div>
                </div>
                <div className="glass p-8 rounded-3xl border border-white/5 bg-cyan-500/5">
                   <div className="flex justify-between items-end mb-4">
                      <div className="text-[10px] uppercase font-black opacity-40">Security_Level</div>
                      <Shield className="w-5 h-5 text-cyan-400" />
                   </div>
                   <div className="text-4xl font-black italic tracking-tighter">MAXIMUM</div>
                </div>
             </div>
          </motion.div>
        )}

        {/* MESH MAP VIEW */}
        {view === "mapping" && (
          <motion.div key="mapping" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-24 h-screen w-full">
             <div className="absolute inset-0 bg-black">
                <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="Map View" fill className="object-cover opacity-60 brightness-50 contrast-125" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-[#020408]" />
             </div>
             <div className="relative z-20 p-12 h-full flex flex-col justify-between pointer-events-none">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {[
                     { label: "Active_Nodes", value: "8,442" },
                     { label: "Throughput", value: "1.2 GB/s" },
                     { label: "Mesh_Density", value: "Optimal" },
                     { label: "Risk_Factor", value: "Low" },
                   ].map((item, i) => (
                     <div key={i} className="glass p-6 rounded-2xl border border-white/10 backdrop-blur-3xl">
                        <div className="text-[8px] uppercase tracking-[0.5em] opacity-40 font-black mb-2">{item.label}</div>
                        <div className="text-2xl font-black italic text-cyan-400 tracking-tighter">{item.value}</div>
                     </div>
                   ))}
                </div>
                <div className="flex justify-between items-end">
                   <div className="max-w-md glass p-8 rounded-3xl border border-white/10 backdrop-blur-3xl">
                      <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">Protocol: MESH_OVERRIDE</h3>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6">Redirecting all neural traffic via the northern HK-Gateway to bypass signal latency anomalies.</p>
                      <button className="px-8 py-3 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all pointer-events-auto">Init_Redirect</button>
                   </div>
                   <div className="text-right text-[10px] font-black uppercase tracking-[1em] opacity-20">Projection Alpha // 2026</div>
                </div>
             </div>
          </motion.div>
        )}

        {/* SECURITY AUDIT VIEW */}
        {view === "audit" && (
          <motion.div key="audit" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-7xl mx-auto min-h-screen">
             <div className="flex justify-between items-end mb-24 border-b border-white/5 pb-8">
                <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">SECURITY<br/>SYNTHESIS</h2>
                <div className="text-cyan-400 font-black text-2xl animate-pulse">/ VERIFIED_LINK</div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { icon: <Lock className="w-8 h-8" />, t: "ENCRYPTION_LAYER_9", d: "Current hashing cycle is active. No unauthorized block modifications detected in the last 12,000 cycles." },
                  { icon: <Network className="w-8 h-8" />, t: "MESH_HARDENING", d: "Quantum-resistant protocols established at every node interface. Dynamic IP rotation enabled." },
                  { icon: <Shield className="w-8 h-8" />, t: "THREAT_NEUTRALIZER", d: "Automated counter-measures active. AI-driven threat modeling has pre-emptively blocked 82 potential intrusions today." },
                  { icon: <Bell className="w-8 h-8" />, t: "ALERT_SYNCHRONIZATION", d: "Real-time notification pipeline established with global security hubs. Response time locked at 12ms." },
                ].map((item, i) => (
                  <div key={i} className="glass p-10 rounded-[3rem] border border-white/10 hover:bg-white/5 transition-all group">
                     <div className="text-cyan-400 mb-8 p-4 bg-white/5 rounded-2xl inline-block group-hover:scale-110 transition-transform">{item.icon}</div>
                     <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{item.t}</h3>
                     <p className="opacity-40 text-sm leading-relaxed uppercase tracking-tighter">{item.d}</p>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="fixed bottom-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference opacity-20 text-[8px] uppercase tracking-[0.5em] font-black">
        <div>Lat: 29.9792 | Long: 31.1342</div>
        <div className="flex gap-8">
           <span>Core_Temp: 24°C</span>
           <span>Prot: AES_256</span>
           <span>Aeon_Projection</span>
        </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
        .strike-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
          color: transparent;
        }
      `}</style>
    </div>
  );
}
