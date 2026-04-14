"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const POSTS = [
  { id: 1, title: "THE DEATH OF INTERFACE", date: "MAR 24", cat: "PHILOSOPHY", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "GENESIS OF CHIP ARCHITECTURE", date: "MAR 22", cat: "HARDWARE", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "ETHICS IN COLD COMPUTE", date: "MAR 21", cat: "AI", img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800" },
];

export default function BrutalistEditorial() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen font-mono selection:bg-black selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center border-b-[6px] border-black bg-white">
        <Link href="/" className="text-3xl font-black tracking-tighter uppercase italic">PROTO_LOG</Link>
        <span className="text-xs font-bold tracking-[0.2em] uppercase">SYSTEM_TIME: {new Date().toLocaleTimeString()}</span>
      </nav>

      <main className="pt-32">
        <header className="px-6 py-24 border-b-[6px] border-black">
            <motion.h1 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-[14vw] font-black tracking-tighter leading-[0.8] uppercase italic">RADICAL<br/>DISCOURSE.</motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="p-8 border-r-[6px] border-b-[6px] border-black hover:bg-black hover:text-white transition-colors group cursor-pointer lg:last:border-r-0">
                    <div className="flex justify-between items-start mb-12">
                        <span className="text-xs font-bold px-3 py-1 border-2 border-current rounded-full">{post.cat}</span>
                        <span className="text-xs opacity-40 italic">{post.date}</span>
                    </div>
                    
                    <div className="relative aspect-video mb-12 overflow-hidden border-2 border-current">
                        <Image src={post.img} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    </div>

                    <h2 className="text-4xl font-black tracking-tighter leading-none uppercase italic mb-12">{post.title}</h2>
                    
                    <div className="flex justify-end">
                        <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:rotate-45 transition-transform">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        <section className="px-6 py-32 bg-black text-white text-center">
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-12">JOIN THE RESISTANCE.</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                <input type="text" placeholder="SECURE_EMAIL_ADDR" className="px-8 py-5 bg-transparent border-4 border-white text-white font-black uppercase tracking-widest outline-none focus:bg-white focus:text-black transition-all" />
                <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest hover:invert transition-all">SUBSCRIBE</button>
            </div>
        </section>
      </main>
    </div>
  );
}
