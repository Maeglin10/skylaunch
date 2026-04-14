"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import "../premium.css";

const NODE_COUNT = 40;

export default function NeuralNetworkGraph() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pts = Array.from({ length: NODE_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2
    }));
    setNodes(pts);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100
    });
  };

  return (
    <div ref={containerRef} className="premium-theme bg-[#05050a] text-[#0066ff] h-screen w-full overflow-hidden relative selection:bg-[#0066ff] selection:text-white font-mono" onMouseMove={handleMouseMove}>
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'linear-gradient(to right, #0066ff 1px, transparent 1px), linear-gradient(to bottom, #0066ff 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#0066ff]/20">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-[#0066ff]">Neural.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Synaptic_Unit_v.094</div>
      </nav>

      {/* Neural Graph Stage */}
      <main className="h-full w-full relative z-10 overflow-hidden">
         {/* Lines SVG */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            {nodes.map((node, i) => (
               nodes.slice(i + 1).map((other) => {
                  const dist = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));
                  const mouseDist = Math.sqrt(Math.pow(node.x - mouse.x, 2) + Math.pow(node.y - mouse.y, 2));
                  
                  if (dist < 20 || (mouseDist < 15)) {
                     return (
                        <line 
                           key={`${i}-${other.id}`}
                           x1={`${node.x}%`} y1={`${node.y}%`}
                           x2={`${other.x}%`} y2={`${other.y}%`}
                           stroke="#0066ff"
                           strokeWidth={dist < 5 ? 2 : 0.5}
                           strokeOpacity={1 - dist / 20}
                        />
                     );
                  }
                  return null;
               })
            ))}
         </svg>

         {/* Nodes */}
         {nodes.map((node) => (
            <motion.div 
               key={node.id}
               animate={{ 
                  x: [`${node.x}%`, `${node.x + 2}%`, `${node.x}%`],
                  y: [`${node.y}%`, `${node.y + 2}%`, `${node.y}%`]
               }}
               transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
               className="absolute w-2 h-2 bg-[#0066ff] rounded-full shadow-[0_0_15px_#0066ff]"
               style={{ left: `${node.x}%`, top: `${node.y}%` }}
            />
         ))}

         {/* Floating Title */}
         <div className="h-full w-full flex flex-col items-center justify-center pointer-events-none">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 2 }}
               className="text-center bg-black/60 p-24 backdrop-blur-3xl border border-[#0066ff]/20 rounded-[5rem]"
            >
               <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40">Synaptic Density Processing</span>
               <h1 className="text-7xl md:text-[10vw] font-black uppercase italic tracking-tighter leading-none mb-12 text-white">
                  Neural <br /> <span className="text-[#0066ff]">Mesh.</span>
               </h1>
               <p className="text-[8px] uppercase tracking-[0.6em] leading-relaxed italic opacity-40 font-black text-white max-w-sm mx-auto">
                  Architecting fluid connectivity within a high-speed data substrate.
               </p>
            </motion.div>
         </div>

      </main>

      {/* Floating Price Index */}
      <div className="fixed left-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         TOPOLOGY_v94
      </div>

    </div>
  );
}
