"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ITEMS = [
  { title: "Venture", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { title: "Horizon", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800" },
  { title: "Catalyst", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" },
];

export default function MousetrapListReveal() {
  return (
    <div className="premium-theme bg-[#fafafa] text-[#1a1a1a] min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#fafafa]/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-lg font-semibold tracking-tight">Folio.studio</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Selected Work</span>
      </nav>
      <main className="pt-36 pb-32 px-6 md:px-16 max-w-6xl mx-auto">
        {ITEMS.map((item, i) => (
          <HoverItem key={i} item={item} index={i} />
        ))}
      </main>
    </div>
  );
}

function HoverItem({ item, index }: { item: { title: string; img: string }; index: number }) {
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const springX = useSpring(imgX, { stiffness: 150, damping: 20 });
  const springY = useSpring(imgY, { stiffness: 150, damping: 20 });

  function handleMove(e: React.MouseEvent) {
    imgX.set(e.clientX - 150);
    imgY.set(e.clientY - 200);
  }

  return (
    <motion.div onMouseMove={handleMove} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.1 }}
      className="group relative py-12 md:py-16 border-b border-black/10 cursor-pointer">
      <div className="flex justify-between items-baseline">
        <h2 className="text-5xl md:text-8xl font-light tracking-tight group-hover:tracking-wide transition-all duration-500">{item.title}</h2>
        <span className="text-xs tracking-[0.3em] uppercase opacity-30">Case Study {String(index + 1).padStart(2, "0")}</span>
      </div>
      <motion.div style={{ x: springX, y: springY }} className="fixed top-0 left-0 w-72 h-96 rounded-2xl overflow-hidden pointer-events-none z-40 opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
        <Image src={item.img} alt={item.title} fill className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
