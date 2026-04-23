"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Search, Bell, BarChart2, Users, CreditCard, Settings, ChevronDown, Activity, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import "../premium.css";

const KPIS = [
  { title: "Total Revenue", val: "$124,563.00", trend: "+12.5%", pos: true, spark: [20, 30, 25, 40, 35, 50, 60] },
  { title: "Active Subscribers", val: "8,432", trend: "+5.2%", pos: true, spark: [10, 15, 20, 18, 25, 22, 30] },
  { title: "Churn Rate", val: "1.2%", trend: "-0.4%", pos: true, spark: [15, 12, 10, 8, 10, 5, 4] },
];

const ACTIVITY = [
  { action: "Enterprise Plan Upgrade", user: "Acme Corp", time: "2 min ago", amt: "+$800/mo" },
  { action: "Failed Payment", user: "Stark Ind.", time: "15 min ago", amt: "$0" },
  { action: "New Annual Subscription", user: "Wayne Ent.", time: "1 hr ago", amt: "+$12,000" },
  { action: "Account Cancellation", user: "Oscorp", time: "3 hrs ago", amt: "-$200/mo" }
];

export default function PremiumDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="premium-theme bg-[#0A0A0A] text-[#FAFAFA] min-h-screen font-sans selection:bg-[#6366F1] selection:text-white flex overflow-hidden">
      
      {/* GLOW BACKGROUNDS */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#6366F1] rounded-full mix-blend-screen filter blur-[200px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#8B5CF6] rounded-full mix-blend-screen filter blur-[200px] opacity-10 pointer-events-none" />

      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/10 hidden lg:flex flex-col h-screen sticky top-0 bg-white/[0.02] backdrop-blur-3xl z-20">
        <div className="p-8 border-b border-white/10">
            <div className="font-black text-2xl tracking-tighter flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                  <Zap className="w-4 h-4 text-white" />
               </div>
               MetricFlow
            </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 px-4 mb-4">Main Menu</div>
            {[
               { name: "Overview", icon: <BarChart2 className="w-5 h-5" /> },
               { name: "Audience", icon: <Users className="w-5 h-5" /> },
               { name: "Billing", icon: <CreditCard className="w-5 h-5" /> },
               { name: "Settings", icon: <Settings className="w-5 h-5" /> }
            ].map((item, i) => (
               <div 
                  key={i} 
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${activeTab === item.name ? 'bg-white/10 text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.1)] border border-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
               >
                  {item.icon}
                  <span className="font-semibold text-sm">{item.name}</span>
                  {activeTab === item.name && (
                     <motion.div layoutId="indicator" className="w-1.5 h-6 bg-[#6366F1] rounded-full ml-auto shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  )}
               </div>
            ))}
        </nav>

        <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Avatar" width={40} height={40} className="rounded-full border border-white/20" />
                <div className="flex-1">
                    <div className="text-sm font-bold">John Admin</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-widest font-black">Pro Plan</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white/50" />
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10">
        
        {/* TOPNAV */}
        <header className="h-24 px-8 md:px-12 flex items-center justify-between sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
            <h1 className="text-2xl font-black tracking-tight">{activeTab}</h1>
            
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64 focus-within:ring-1 focus-within:ring-[#6366F1] focus-within:bg-white/10 transition-all">
                   <Search className="w-4 h-4 text-white/50" />
                   <input type="text" placeholder="Search metrics..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30" />
                </div>
                
                <button className="relative p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                    <Bell className="w-5 h-5 text-white/80" />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-[#6366F1] rounded-full border-2 border-[#0A0A0A] shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                </button>
            </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8 md:p-12 max-w-[1600px] w-full mx-auto space-y-8">
            
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {KPIS.map((kpi, i) => (
                  <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 20 }} 
                     animate={{ opacity: 1, y: 0 }} 
                     transition={{ duration: 0.5, delay: i * 0.1 }}
                     className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors cursor-pointer"
                  >
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="text-sm font-bold text-white/50 uppercase tracking-widest">{kpi.title}</div>
                        <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-md ${kpi.pos ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                           {kpi.pos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                           {kpi.trend}
                        </div>
                     </div>
                     <div className="text-4xl font-black tracking-tighter mb-4 relative z-10">{kpi.val}</div>
                     
                     {/* Mini Sparkline Chart */}
                     <div className="w-full h-12 flex items-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity relative z-10">
                        {kpi.spark.map((h, j) => (
                           <motion.div 
                              key={j} 
                              initial={{ height: 0 }} 
                              animate={{ height: `${h}%` }} 
                              transition={{ duration: 1, delay: 0.5 + j * 0.05 }}
                              className="flex-1 bg-gradient-to-t from-[#6366F1]/20 to-[#6366F1] rounded-t-sm"
                           />
                        ))}
                     </div>
                     
                     {/* Hover glow */}
                     <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#6366F1] rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* MAIN CHART AREA */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
               >
                  <div className="flex justify-between items-center mb-12">
                     <h3 className="font-bold text-lg">Revenue Growth</h3>
                     <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                        {["1W", "1M", "1Y", "ALL"].map(t => (
                           <button key={t} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${t === "1Y" ? 'bg-white text-black shadow-md' : 'text-white/50 hover:text-white'}`}>
                              {t}
                           </button>
                        ))}
                     </div>
                  </div>
                  
                  {/* Abstract Chart Representation */}
                  <div className="w-full h-[300px] relative border-b border-white/10 flex items-end justify-between px-2">
                     <div className="absolute inset-0 bg-gradient-to-t from-[#6366F1]/10 to-transparent pointer-events-none" />
                     {Array.from({ length: 12 }).map((_, i) => {
                        const h = 30 + Math.random() * 70;
                        return (
                           <div key={i} className="relative w-full mx-1 group h-full flex flex-col justify-end">
                              {/* Grid line */}
                              <div className="absolute bottom-0 left-1/2 w-[1px] h-full bg-white/5 -translate-x-1/2 pointer-events-none" />
                              
                              <motion.div 
                                 initial={{ height: 0 }} 
                                 animate={{ height: `${h}%` }} 
                                 transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                                 className="w-full bg-[#6366F1] rounded-t-md relative z-10 hover:bg-[#8B5CF6] transition-colors cursor-pointer group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                              >
                                 {/* Tooltip */}
                                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                                    ${(h * 100).toFixed(0)}
                                 </div>
                              </motion.div>
                           </div>
                        );
                     })}
                  </div>
               </motion.div>

               {/* ACTIVITY FEED */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8"
               >
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="font-bold text-lg">Live Feed</h3>
                     <Activity className="w-4 h-4 text-[#6366F1]" />
                  </div>

                  <div className="space-y-6">
                     {ACTIVITY.map((act, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/10">
                           <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-[#6366F1] transition-all">
                              <span className="w-2 h-2 rounded-full bg-[#6366F1] shadow-[0_0_10px_rgba(99,102,241,1)]" />
                           </div>
                           <div className="flex-1">
                              <div className="text-sm font-bold mb-1">{act.action}</div>
                              <div className="text-[10px] text-white/50 font-black uppercase tracking-widest">{act.user} • {act.time}</div>
                           </div>
                           <div className={`text-xs font-black ${act.amt.startsWith('+') ? 'text-emerald-400' : act.amt === '$0' ? 'text-white/30' : 'text-red-400'}`}>
                              {act.amt}
                           </div>
                        </div>
                     ))}
                  </div>
                  
                  <button className="w-full mt-8 py-4 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                     View All Activity
                  </button>
               </motion.div>
            </div>
        </div>
      </main>
    </div>
  );
}
