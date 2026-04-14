"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../premium.css";

export default function ParticleWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let frame = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(8,8,18,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cols = 80;
      const rows = 40;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i / cols) * canvas.width;
          const y = (j / rows) * canvas.height;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(i * 0.3 + frame * 0.02) * 20 + Math.cos(j * 0.3 + frame * 0.015) * 20;
          const mouseEffect = Math.max(0, 1 - dist / 200) * 30;
          const finalY = y + wave + mouseEffect;
          const size = 1 + Math.sin(i * 0.5 + frame * 0.03) * 0.5;
          const alpha = 0.3 + Math.sin(i * 0.2 + j * 0.3 + frame * 0.01) * 0.2;
          ctx.fillStyle = `rgba(99,102,241,${alpha})`;
          ctx.beginPath();
          ctx.arc(x, finalY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      frame++;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, [mouse]);

  return (
    <div className="premium-theme bg-[#080812] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-indigo-400" onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold tracking-tight text-indigo-400">WAVE.FX</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Particle System</span>
      </nav>
      <main className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          <h1 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] mb-6">PARTICLE<br/>WAVE</h1>
          <p className="text-sm opacity-40 max-w-md mx-auto mb-10">Interactive particle field responding to cursor position with sine-wave dynamics.</p>
          <button className="px-10 py-5 bg-indigo-500 text-white text-xs font-bold tracking-[0.4em] uppercase hover:bg-indigo-400 transition-colors rounded-xl">Explore</button>
        </motion.div>
      </main>
    </div>
  );
}
