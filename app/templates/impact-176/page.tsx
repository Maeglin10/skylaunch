"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Search, Bell, BarChart2, Users, CreditCard, Settings, ChevronDown, Activity, ArrowUpRight, ArrowDownRight, Zap, Menu, Layers } from "lucide-react";
import "../premium.css";

const KPIS = [
  { title: "TOTAL_REVENUE", val: "$124,563.00", trend: "+12.5%", pos: true, spark: [20, 30, 25, 40, 35, 50, 60] },
  { title: "ACTIVE_SUBS", val: "8,432", trend: "+5.2%", pos: true, spark: [10, 15, 20, 18, 25, 22, 30] },
  { title: "CHURN_RATE", val: "1.2%", trend: "-0.4%", pos: true, spark: [15, 12, 10, 8, 10, 5, 4] },
];

const ACTIVITY = [
  { action: "PLAN_UPGRADE", user: "Acme Corp", time: "2 min ago", amt: "+$800/mo" },
  { action: "NEW_ANNUAL", user: "Wayne Ent.", time: "1 hr ago", amt: "+$12,000" },
  { action: "CHURN_LOSS", user: "Oscorp", time: "3 hrs ago", amt: "-$200/mo" }
];

export default function MetricFlowSPA() {
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    <div ref={containerRef} className="premium-theme bg-[#0A0A0A] text-[#FAFAFA] min-h-screen font-sans selection:bg-[#6366F1] selection:text-white flex overflow-hidden relative">
      
      {/* DASHBOARD GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#6366F1] opacity-[0.02] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-screen" />
      </div>

      {/* SIDEBAR */}
      <aside className="w-80 border-r border-white/5 hidden lg:flex flex-col h-screen sticky top-0 bg-black/50 backdrop-blur-3xl z-50 p-10 font-mono">
         <div className="font-black text-2xl tracking-[0.2em] text-white flex items-center gap-4 italic uppercase mb-20">
            METRIC<span className="text-[#6366F1]">_FLOW</span>
         </div>
         
         <nav className="flex-1 space-y-12">
            <div className="space-y-4">
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic mb-6 block">Main_Menu</span>
               {["OVERVIEW", "AUDIENCE", "BILLING", "SETTINGS"].map((t) => (
                  <div 
                     key={t}
                     onClick={() => setActiveTab(t)}
                     className={`text-[10px] font-black uppercase tracking-[0.8em] cursor-pointer transition-all ${activeTab === t ? 'text-[#6366F1]' : 'text-white/30 hover:text-white'}`}
                  >
                     {t}<span className={`inline-block w-0 ${activeTab === t ? 'w-3' : ''} transition-all overflow-hidden text-[#6366F1]`}>_</span>
                  </div>
               ))}
            </div>
            
            <div className="space-y-4">
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic mb-6 block">Quick_Actions</span>
               <div className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 hover:text-white cursor-pointer transition-all">EXPORT_LOGS</div>
               <div className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 hover:text-white cursor-pointer transition-all">SYSTEM_SYNC</div>
            </div>
         </nav>

         <div className="pt-10 border-t border-white/5 flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-none border border-white/10 flex items-center justify-center">
               <Activity className="w-6 h-6 text-[#6366F1]" />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white">ADMIN_CORE</div>
               <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">STATUS: ACTIVE</div>
            </div>
         </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10 font-mono">
         
         {/* HEADER */}
         <header className="px-12 py-10 flex justify-between items-center sticky top-0 z-30 bg-[#0A0A0A]/50 backdrop-blur-3xl border-b border-white/5">
            <div className="flex items-center gap-6">
               <Menu className="w-6 h-6 text-[#6366F1] lg:hidden" />
               <h1 className="text-xl font-black tracking-[0.4em] text-white uppercase italic">{activeTab}<span className="text-white/20">_SNAPSHOT</span></h1>
            </div>
            
            <div className="flex items-center gap-10">
               <div className="hidden md:flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3">
                  <Search className="w-4 h-4 text-white/20" />
                  <input type="text" placeholder="SEARCH_METRICS..." className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-[0.4em] text-white placeholder:text-white/20 w-40" />
               </div>
               <Bell className="w-6 h-6 text-white/20 cursor-pointer hover:text-[#6366F1] transition-colors" />
            </div>
         </header>

         {/* DASHBOARD GRID */}
         <div className="p-12 space-y-16 max-w-[1600px] w-full mx-auto">
            
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {KPIS.map((kpi, i) => (
                  <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: i * 0.1 }}
                     className="bg-[#1A1A1A] border border-white/5 p-10 group hover:border-[#6366F1]/30 transition-all shadow-2xl relative overflow-hidden"
                  >
                     <div className="flex justify-between items-start mb-10 relative z-10">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">{kpi.title}</div>
                        <div className={`text-[10px] font-black ${kpi.pos ? 'text-emerald-400' : 'text-red-400'} italic`}>
                           {kpi.trend}
                        </div>
                     </div>
                     <div className="text-5xl font-black italic uppercase tracking-tighter mb-10 relative z-10">{kpi.val}</div>
                     
                     {/* Mini Sparkline Chart */}
                     <div className="w-full h-16 flex items-end gap-2 opacity-20 group-hover:opacity-100 transition-opacity relative z-10">
                        {kpi.spark.map((h, j) => (
                           <div 
                              key={j} 
                              style={{ height: `${h}%` }}
                              className="flex-1 bg-[#6366F1] rounded-none group-hover:bg-[#6366F1] transition-colors shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                           />
                        ))}
                     </div>
                     
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* MAIN CHART */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="lg:col-span-2 bg-[#1A1A1A] border border-white/5 p-12 relative overflow-hidden"
               >
                  <div className="flex justify-between items-center mb-16">
                     <h3 className="text-sm font-black tracking-[0.4em] text-white uppercase italic">REVENUE_GROWTH<span className="text-white/20">_LOG</span></h3>
                     <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                        {["1W", "1M", "1Y", "ALL"].map(t => (
                           <button key={t} className={`hover:text-white transition-colors ${t === "1Y" ? 'text-[#6366F1]' : ''}`}>
                              {t}
                           </button>
                        ))}
                     </div>
                  </div>
                  
                  <div className="w-full h-[400px] relative border-b border-white/5 flex items-end justify-between gap-2 px-2 pb-10">
                     {Array.from({ length: 24 }).map((_, i) => {
                        const h = 20 + Math.random() * 80;
                        return (
                           <motion.div 
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 1.5, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                              className="flex-1 bg-white/5 hover:bg-[#6366F1] transition-all cursor-pointer relative group"
                           >
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[8px] font-black bg-[#6366F1] text-white px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 ${(h * 10).toFixed(0)}
                              </div>
                           </motion.div>
                        );
                     })}
                  </div>
                  <div className="flex justify-between mt-8 text-[8px] font-black uppercase tracking-[0.4em] text-white/10">
                     <span>JAN</span>
                     <span>JUN</span>
                     <span>DEC</span>
                  </div>
               </motion.div>

               {/* ACTIVITY FEED */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-[#1A1A1A] border border-white/5 p-12"
               >
                  <div className="flex justify-between items-center mb-12">
                     <h3 className="text-sm font-black tracking-[0.4em] text-white uppercase italic">LIVE_FEED<span className="text-white/20">_ACTIVE</span></h3>
                     <Zap className="w-4 h-4 text-[#6366F1]" />
                  </div>

                  <div className="space-y-8">
                     {ACTIVITY.map((act, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 border border-white/5 hover:border-[#6366F1]/30 hover:bg-white/[0.02] transition-all cursor-pointer group">
                           <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#6366F1] group-hover:border-transparent transition-all">
                              <div className="w-2 h-2 bg-[#6366F1] group-hover:bg-white rounded-full shadow-[0_0_10px_rgba(99,102,241,1)]" />
                           </div>
                           <div className="flex-1 overflow-hidden">
                              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 truncate">{act.action}</div>
                              <div className="text-[8px] text-white/20 font-black uppercase tracking-[0.2em]">{act.user} • {act.time}</div>
                           </div>
                           <div className={`text-[10px] font-black italic ${act.amt.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                              {act.amt}
                           </div>
                        </div>
                     ))}
                  </div>
                  
                  <button className="w-full mt-12 py-5 border border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all italic">
                     VIEW_FULL_LOGS_
                  </button>
               </motion.div>
            </div>
         </div>
      </main>
    </div>
  );
}
