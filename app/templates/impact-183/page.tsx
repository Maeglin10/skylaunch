"use client";

import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Terminal, Activity, Zap, ChevronRight, TerminalSquare } from "lucide-react";
import "../premium.css";

const TERMINAL_LINES = [
  "Initializing Cognix Kernel v4.2.0...",
  "Loading neural pathways [||||||||||] 100%",
  "Connecting to distributed node clusters...",
  "Connection established. Latency: 12ms",
  "> Analyzing structural integrity of data streams...",
  "> Anomalies detected: 0",
  "> Optimizing inference parameters...",
  "System ready. Awaiting input."
];

export default function PremiumAISaaS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHeader = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [lines, setLines] = useState<string[]>([]);
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < TERMINAL_LINES.length) {
        setLines(prev => [...prev, TERMINAL_LINES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    const cursorInterval = setInterval(() => setCursorBlink(p => !p), 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-[#FAFAFA] min-h-screen font-sans selection:bg-[#3B82F6] selection:text-white overflow-hidden relative">
      
      {/* ANIMATED GRID OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <motion.div style={{ y: yBg }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_110%)]" />
         </motion.div>
         {/* GLOWS */}
         <div className="absolute top-[-20%] left-[20%] w-[50vw] h-[50vw] bg-indigo-500 rounded-full mix-blend-screen filter blur-[200px] opacity-10" />
         <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-500 rounded-full mix-blend-screen filter blur-[200px] opacity-10" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#050505]/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-black tracking-tight text-xl">Cognix.ai</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/50">
            <Link href="#" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#" className="hover:text-white transition-colors">Models</Link>
            <Link href="#" className="hover:text-white transition-colors">API</Link>
        </nav>
        
        <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform flex items-center gap-2">
           <TerminalSquare className="w-4 h-4" /> Console
        </button>
      </header>

      {/* HERO SECTION */}
      <main className="relative z-10 px-6 pt-32 pb-24 md:pt-48 max-w-[1400px] mx-auto flex flex-col items-center text-center">
        
        <motion.div style={{ opacity: opacityHeader }} className="w-full max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-12 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" /> Introducing Cognix-7B
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6vw] font-black tracking-tighter mb-8 leading-[0.9]">
                Intelligence that <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
                   adapts to you.
                </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-white/50 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                Deploy autonomous agents, interpret complex data streams, and automate workflows with our blazing-fast inference API.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                   <Zap className="w-4 h-4" /> Start Building
                </button>
                <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                   Read Documentation <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
        
        {/* TERMINAL MOCKUP */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ delay: 0.5, duration: 1 }} 
           className="mt-24 w-full max-w-5xl relative group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 rounded-[2rem] blur-[20px] opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
            
            <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[400px] md:h-[500px]">
                {/* Window Header */}
                <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <div className="ml-4 font-mono text-xs text-white/30 flex items-center gap-2">
                       <Terminal className="w-4 h-4" /> cognix-cli
                    </div>
                </div>
                
                {/* Terminal Content */}
                <div className="flex-1 p-6 md:p-8 font-mono text-sm md:text-base text-white/80 overflow-y-auto text-left flex flex-col gap-2">
                    {lines.map((line, i) => (
                       <div key={i} className={`${line.startsWith('>') ? 'text-indigo-400 font-bold' : 'text-white/60'}`}>
                          {line}
                       </div>
                    ))}
                    {lines.length === TERMINAL_LINES.length && (
                       <div className="flex items-center text-fuchsia-400 font-bold">
                          $ <span className={`ml-2 w-2 h-5 bg-fuchsia-400 ${cursorBlink ? 'opacity-100' : 'opacity-0'}`} />
                       </div>
                    )}
                </div>
            </div>
        </motion.div>

      </main>
    </div>
  );
}
