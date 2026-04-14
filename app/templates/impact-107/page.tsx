"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const CHAPTERS = [
  { id: 1, title: "The Awakening", text: "Deep in the Norwegian fjords, where light bends around ancient stone.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600" },
  { id: 2, title: "The Traverse", text: "Across glacial ridges where silence becomes a language of its own.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" },
  { id: 3, title: "The Summit", text: "Above the clouds, perspective shifts and the world reveals its architecture.", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600" },
];

export default function StorytellingParallaxJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="premium-theme bg-[#0a0a0a] text-white min-h-[400vh] relative font-serif selection:bg-teal-500">
      <div className="fixed top-0 left-0 h-1 bg-teal-500 z-[100]" style={{ width: "var(--progress)" }}>
        <motion.div style={{ width: progress }} className="h-full bg-teal-400" />
      </div>
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl">
        <Link href="/" className="text-lg font-light tracking-[0.3em] uppercase">Meridian</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Long-form Story</span>
      </nav>
      {CHAPTERS.map((ch, i) => (
        <section key={ch.id} className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
            <Image src={ch.img} alt={ch.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
          <motion.div initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className="relative z-10 text-center max-w-3xl px-8">
            <span className="text-teal-400 text-xs tracking-[1em] uppercase block mb-6">Chapter {ch.id}</span>
            <h2 className="text-5xl md:text-8xl font-light tracking-wide mb-8">{ch.title}</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">{ch.text}</p>
          </motion.div>
        </section>
      ))}
      <section className="h-screen flex items-center justify-center relative">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-wider mb-8">Fin.</h2>
          <button className="px-10 py-5 border border-teal-500/40 text-xs tracking-[0.5em] uppercase text-teal-400 hover:bg-teal-500 hover:text-black transition-all">Restart Journey</button>
        </div>
      </section>
    </div>
  );
}
