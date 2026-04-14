"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
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

export default function SkewedScrollCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Create a velocity-like effect by mapping scroll progress to velocity (simulated)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);
  
  return (
    <div ref={containerRef} className="premium-theme bg-black text-white h-[400vh] relative overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Skew.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Velocity_Unit_0x58</div>
      </nav>

      {/* Main Skew Stage */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
         <motion.div style={{ x }} className="flex gap-24 px-24">
            {ASSETS.map((asset, i) => (
               <SkewedCard key={asset.id} asset={asset} scrollYProgress={scrollYProgress} />
            ))}
         </motion.div>
      </div>

      <footer className="fixed bottom-12 left-12 mix-blend-difference z-50 text-[8px] uppercase tracking-[1em] font-black opacity-20 italic">
         Scroll to experience kinetic distortion
      </footer>
    </div>
  );
}

function SkewedCard({ asset, scrollYProgress }: { asset: any, scrollYProgress: any }) {
  // Simulate skew based on "movement" (scroll progress change)
  const skewX = useTransform(scrollYProgress, [0, 1], [0, 20]); // Static skew for demo, would ideally be velocity-based
  
  return (
    <motion.div 
      style={{ skewX }}
      className="relative w-[30vw] md:w-[40vw] lg:w-[30vw] aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl elevation-24"
    >
       <Image src={asset.img} alt="Skewed asset" fill className="object-cover grayscale" />
       <div className="absolute inset-0 bg-black/20" />
       <div className="absolute bottom-8 left-8 text-white z-10">
          <span className="text-[10px] uppercase font-black tracking-widest italic opacity-40">Asset_0{asset.id}</span>
          <h3 className="text-4xl font-black uppercase italic tracking-tighter">PHASE.</h3>
       </div>
    </motion.div>
  );
}
