"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function VideoHeroParticleOverlay() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), { stiffness: 50, damping: 30 });
  const bgY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), { stiffness: 50, damping: 30 });

  function handleMove(e: React.MouseEvent) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  }

  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative font-sans selection:bg-cyan-400 selection:text-black" onMouseMove={handleMove}>
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-[-40px]">
        <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" alt="Space" fill className="object-cover opacity-70" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 bg-cyan-400 rounded-full z-20" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 2 + Math.random()*3, repeat: Infinity, delay: Math.random()*5 }} />
      ))}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold tracking-tight text-cyan-400">COSMO</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-60"><span>Explore</span><span>Mission</span></div>
      </nav>
      <main className="relative z-30 h-full flex flex-col items-center justify-center text-center px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          <span className="text-cyan-400/60 text-xs tracking-[1em] uppercase block mb-8">Deep Space Observatory</span>
          <h1 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] mb-8">BEYOND<br/>THE VOID</h1>
          <p className="text-sm opacity-40 max-w-md mx-auto mb-12">Explore the infinite expanse where light and matter converge into cosmic architecture.</p>
          <button className="px-10 py-5 bg-cyan-400 text-black text-xs font-bold tracking-[0.4em] uppercase hover:scale-110 transition-transform">Launch Mission</button>
        </motion.div>
      </main>
    </div>
  );
}
