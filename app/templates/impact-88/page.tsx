"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import "../premium.css";

const BUTTONS = [
  "INCEPTION", "STRUCTURE", "SYNERGY", "LOGIC", "KINETIC", "ATOMIC", "VOID", "CORE"
];

export default function CreativeMagneticGrid() {
  return (
    <div className="premium-theme bg-[#0a0a0f] text-white min-h-screen selection:bg-rose-500 overflow-x-hidden font-mono p-12 lg:p-24">
      
      {/* Background HUD Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5 mx-auto">
        <Link href="/" className="px-12 text-xl font-black italic tracking-tighter uppercase text-rose-600">Magnetic.OS</Link>
        <div className="px-12 text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Field_Distribution_v.088</div>
      </nav>

      {/* Main Magnetic Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-48 max-w-[1600px] mx-auto relative z-10">
         {BUTTONS.map((label, i) => (
            <MagneticButton key={i} label={label} i={i} />
         ))}
      </main>

      {/* Hero Massive Typography Footnote */}
      <div className="py-64 text-center">
         <h2 className="text-[10vw] font-black uppercase italic tracking-tighter opacity-10 leading-none mb-12">Interaction.</h2>
         <p className="max-w-2xl mx-auto text-xs font-black uppercase tracking-[0.6em] leading-relaxed italic opacity-40">
            Structural integrity is redefined through the physics of digital resonance and field attraction.
         </p>
      </div>

    </div>
  );
}

function MagneticButton({ label, i }: { label: string, i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull (limited to half the width/height)
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`aspect-square flex items-center justify-center p-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] group cursor-none hover:bg-rose-600 hover:border-rose-600 transition-colors duration-500`}
    >
       <div className="text-center">
          <span className="text-[8px] font-black opacity-20 block mb-4 uppercase tracking-[0.6em]">Node_0x{i+88}</span>
          <h3 className="text-2xl font-black italic tracking-tighter uppercase group-hover:scale-110 transition-transform">{label}</h3>
       </div>
       
       {/* Visual cursor tether */}
       <motion.div 
         animate={{ opacity: [0, 1, 0] }}
         className="absolute inset-0 border-2 border-rose-600/20 rounded-[4rem] group-hover:block hidden"
       />
    </motion.div>
  );
}
