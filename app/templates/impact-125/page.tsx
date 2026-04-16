"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function CursorTrailHero() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  function handleMove(e: React.MouseEvent) {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }

  return (
    <div className="premium-theme bg-[#0f0f0f] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-amber-400 selection:text-black cursor-none" onMouseMove={handleMove}>
      <motion.div style={{ x: springX, y: springY }} className="fixed top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-amber-400 rounded-full mix-blend-difference pointer-events-none z-[100]" />
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1485470733090-0aae1788d668?auto=format&fit=crop&q=80&w=1600" alt="Abstract" fill className="object-cover opacity-30 grayscale" />
      </div>
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold tracking-tight">AURA</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Interactive</span>
      </nav>
      <main className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          <h1 className="text-6xl md:text-[12vw] font-black tracking-tighter leading-[0.85] mb-8">MOVE<br/>WITH<br/>INTENT.</h1>
          <p className="text-sm opacity-40 max-w-md mx-auto">Your cursor is a portal. Every movement creates a resonance in the visual field.</p>
        </motion.div>
      </main>
    </div>
  );
}
