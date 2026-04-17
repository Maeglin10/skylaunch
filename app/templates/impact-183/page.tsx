import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumAISaaS() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans overflow-hidden">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      <header className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="font-bold tracking-tight text-xl">Cognix AI</span>
        </div>
        <nav className="glass px-6 py-2 rounded-full hidden md:flex items-center gap-6 text-sm font-semibold text-white/50">
            <Link href="#" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#" className="hover:text-white transition-colors">Models</Link>
            <Link href="#" className="hover:text-white transition-colors">API</Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">Get Early Access</button>
      </header>

      <main className="relative z-10 px-6 pt-20 pb-32 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 mb-8 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                <span className="animate-pulse">✨</span> Introducing Cognix-7b Language Model
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
                Intelligence that <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">adapts to you.</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12">
                Deploy autonomous agents, interpret complex data streams, and automate workflows with our blazing-fast inference API.
            </p>
            
            <div className="glass p-2 max-w-md mx-auto rounded-full flex items-center border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <input type="text" placeholder="Describe your workflow..." className="bg-transparent border-none outline-none px-6 w-full text-white placeholder:text-gray-500 text-sm relative z-10" />
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-full text-sm font-bold transition-transform hover:scale-105 shrink-0 relative z-10">Generate App</button>
            </div>
        </motion.div>
        
        {/* MOCKUP INTERFACE */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="mt-20 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 blur-[100px] opacity-20"></div>
            <div className="relative glass border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden text-left bg-black/50">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 border border-white/5 rounded-lg p-4 bg-white/[0.02]">
                        <div className="w-20 h-4 bg-white/10 rounded mb-4"></div>
                        <div className="space-y-2">
                            <div className="w-full h-8 bg-indigo-500/20 rounded"></div>
                            <div className="w-full h-8 bg-white/5 rounded"></div>
                            <div className="w-full h-8 bg-white/5 rounded"></div>
                        </div>
                    </div>
                    <div className="col-span-2 border border-white/5 rounded-lg p-4 bg-white/[0.02] flex flex-col justify-end min-h-[300px]">
                         <div className="flex justify-end mb-4">
                             <div className="glass px-4 py-2 rounded-2xl rounded-tr-none text-sm inline-block max-w-[80%]">Compile data from Q3.</div>
                         </div>
                         <div className="flex justify-start">
                             <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 px-4 py-3 rounded-2xl rounded-tl-none text-sm inline-block max-w-[80%]">
                                 <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-[8px]">AI</div><span className="font-bold text-xs">Cognix Process</span></div>
                                 Compiling dataset... 84% complete. Expected anomalies resolved.
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </main>
    </div>
  );
}
