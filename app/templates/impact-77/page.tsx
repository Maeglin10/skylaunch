"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const IMAGES = [
  { id: 1, img: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, img: "https://images.unsplash.com/photo-1523424296224-8d91b72a696c?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, img: "https://images.unsplash.com/photo-1492691523567-613d9685354e?auto=format&fit=crop&q=80&w=1000" },
];

export default function PhotographyParallaxTiltGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-rose-500 overflow-x-hidden font-mono" onMouseMove={handleMouseMove}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Tilt.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Gallery_Mapping_v.077</div>
      </nav>

      <header className="pt-48 pb-24 px-12 text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
         >
            <span className="text-xs uppercase tracking-[0.8em] font-black opacity-20 mb-8 block font-mono italic">Curated Perspective Shift</span>
            <h1 className="text-7xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">
               Kinetic <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Grids.</span>
            </h1>
         </motion.div>
      </header>

      <main className="px-12 pb-64">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-[1600px] mx-auto perspective-2000">
            {IMAGES.map((item, i) => (
               <TiltCard key={item.id} item={item} mouseX={mouseX} mouseY={mouseY} i={i} />
            ))}
         </div>
      </main>

      <style>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </div>
  );
}

function TiltCard({ item, mouseX, mouseY, i }: { item: any, mouseX: MotionValue<number>, mouseY: MotionValue<number>, i: number }) {
  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  return (
    <motion.div 
      style={{ rotateX, rotateY }}
      transition={{ delay: i * 0.1 }}
      className="relative aspect-[3/4] bg-neutral-100 rounded-[3rem] overflow-hidden shadow-2xl elevation-24 border-8 border-white group"
    >
       <Image src={item.img} alt="Gallery" fill className="object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-[2s] group-hover:scale-110 transition-transform duration-[4s]" />
       <div className="absolute inset-0 bg-black/10 transition-opacity opacity-40 group-hover:opacity-0" />
       
       <div className="absolute bottom-8 left-8 text-white mix-blend-difference z-10 transition-transform group-hover:translate-x-4">
          <span className="text-[10px] font-black italic mb-2 block tracking-widest leading-none">FRAGMENT_0x0{i}</span>
          <h3 className="text-3xl font-black italic leading-none uppercase">PHASE.</h3>
       </div>
    </motion.div>
  );
}
