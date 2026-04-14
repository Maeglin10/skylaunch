"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ASSETS = [
  { id: 1, img: "/templates/tech_noir.png" },
  { id: 2, img: "/templates/editorial_lux.png" },
  { id: 3, img: "/templates/agency_hero.png" },
  { id: 4, img: "/templates/brutalist_staircase.png" },
  { id: 5, img: "/templates/portal_frame.png" },
];

export default function ClusterAssetCloud() {
  const [items, setItems] = useState<any[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const pts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      img: ASSETS[i % ASSETS.length].img,
      x: Math.random() * 200 - 50,
      y: Math.random() * 200 - 50,
      z: Math.random() * 100 - 50,
      scale: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 40 + 20,
    }));
    setItems(pts);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="premium-theme bg-white text-black h-screen w-full overflow-hidden relative cursor-crosshair">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase pointer-events-auto italic">Cluster.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Archive_Visual_Unit</div>
      </nav>

      {/* Drifting Asset Cloud */}
      <main className="absolute inset-0 flex items-center justify-center">
         {items.map((item) => (
            <motion.div 
               key={item.id}
               style={{ 
                  left: `${item.x}%`, 
                  top: `${item.y}%`,
                  zIndex: Math.floor(item.z),
                  scale: item.scale,
                  x: smoothX, // Basic parallax
                  y: smoothY
               }}
               transition={{ type: "spring", damping: item.speed, stiffness: item.speed / 2 }}
               className="absolute w-64 h-80 bg-[#eee] border border-black/5 shadow-2xl overflow-hidden group hover:z-[100] transition-all"
            >
               <Image 
                  src={item.img} 
                  alt="Cluster Asset" 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125" 
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] uppercase font-black tracking-widest italic">Asset_{item.id}04</span>
               </div>
            </motion.div>
         ))}
      </main>

      {/* Center Fixed Label */}
      <div className="absolute inset-x-12 bottom-24 z-[200] flex flex-col items-center pointer-events-none">
         <h1 className="text-[10vw] font-black uppercase italic tracking-tighter leading-none opacity-90 select-none">
            Digital <br /> Archive.
         </h1>
         <div className="w-1 px-24 h-48 bg-black/10 mt-12 mb-12" />
         <p className="text-[10px] uppercase tracking-[0.5em] font-black opacity-20">Move cursor to synchronize nodes</p>
      </div>

      {/* Vertical Side HUD */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 font-mono text-[8px] uppercase font-black opacity-20 items-end pointer-events-none">
         <div className="rotate-90 origin-right">Lat_0.422 N</div>
         <div className="rotate-90 origin-right">Frag_0x442</div>
         <div className="rotate-90 origin-right text-black">Active_Sequence</div>
      </div>

    </div>
  );
}
