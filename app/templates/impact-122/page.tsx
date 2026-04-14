"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SCENES = [
  { img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1600", text: "In the cathedral of ancient forests, time moves differently." },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1600", text: "Each face carries the geography of a thousand silent journeys." },
  { img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600", text: "Above the noise, the stars remember everything." },
];

export default function EditorialScrollStory() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="premium-theme bg-white text-[#1a1a1a] min-h-screen font-serif selection:bg-stone-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-black/5 mix-blend-difference">
        <Link href="/" className="text-lg font-light tracking-[0.3em] uppercase text-white">Chronicle</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/40">Long Read</span>
      </nav>
      <header className="h-screen flex items-center justify-center text-center px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <h1 className="text-5xl md:text-9xl font-extralight tracking-wide mb-6">The Last<br/>Wilderness</h1>
          <p className="text-xs tracking-[1em] uppercase opacity-30">A Visual Essay</p>
        </motion.div>
      </header>
      {SCENES.map((scene, i) => (
        <section key={i} className="relative">
          <div className="relative aspect-[16/7] overflow-hidden">
            <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} transition={{ duration: 2 }} className="w-full h-full">
              <Image src={scene.img} alt="Scene" fill className="object-cover" />
            </motion.div>
          </div>
          <div className="max-w-3xl mx-auto py-24 px-8">
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              className="text-2xl md:text-4xl font-extralight leading-relaxed tracking-wide">{scene.text}</motion.p>
          </div>
        </section>
      ))}
      <footer className="py-32 text-center">
        <p className="text-xs tracking-[1em] uppercase opacity-20">End of story</p>
      </footer>
    </div>
  );
}
