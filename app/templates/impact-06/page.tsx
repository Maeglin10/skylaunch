"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "../premium.css";

export default function OrganicFlowTemplate() {
  return (
    <div className="premium-theme bg-[#050510] text-white min-h-screen overflow-hidden selection:bg-pink-500">
      
      {/* Background Fluid Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0], 
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: 360
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-[40%_60%_70%_30%/50%_60%_30%_70%] blur-[80px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 50, 0], 
            y: [0, 100, -100, 0],
            scale: [1.2, 0.8, 1.2, 1],
            rotate: -360
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-gradient-to-tr from-pink-600/30 to-rose-600/30 rounded-[30%_70%_50%_50%/40%_30%_60%_70%] blur-[80px]"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center bg-black/10 backdrop-blur-md">
        <Link href="/" className="text-2xl font-black lowercase tracking-tight flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          fluidity.
        </Link>
        <div className="hidden md:flex gap-12 text-sm font-medium opacity-60">
           <a href="#" className="hover:opacity-100 transition-opacity">Philosophy</a>
           <a href="#" className="hover:opacity-100 transition-opacity">Work</a>
           <a href="#" className="hover:opacity-100 transition-opacity">Connect</a>
        </div>
        <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
          Say Hello
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-12 pt-64 pb-32 flex flex-col items-center">
        <div className="max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[12vw] md:text-[8vw] font-black leading-none mb-12 tracking-tight"
          >
            Liquid <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Ambition.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl font-light opacity-60 max-w-2xl mx-auto leading-relaxed mb-16"
          >
            We define the shape of digital commerce through fluid interfaces and organic experiences. 
            No grids, just growth.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-6"
          >
             <div className="px-8 py-4 glass rounded-full flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold tracking-wider uppercase">Strategic Vision</span>
             </div>
             <div className="px-8 py-4 glass rounded-full flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold tracking-wider uppercase">Organic Tech</span>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Card Section */}
      <section className="px-12 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto overflow-visible">
         {[
           { title: "Adaptation", bg: "from-blue-500/20" },
           { title: "Evolution", bg: "from-purple-500/20" },
           { title: "Flow", bg: "from-pink-500/20" }
         ].map((card, i) => (
           <motion.div 
             key={i}
             whileHover={{ y: -20, scale: 1.02 }}
             className={`p-12 glass rounded-[3rem] border-white/5 bg-gradient-to-br ${card.bg} to-transparent min-h-[400px] flex flex-col justify-end group`}
           >
              <div className="text-4xl font-black mb-6 uppercase tracking-tighter opacity-100">{card.title}</div>
              <p className="opacity-60 text-sm leading-relaxed mb-8 group-hover:opacity-100 transition-opacity">
                Responsive systems that mold to YOUR needs. Fluidity isn't just about design, it's about business agility.
              </p>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                &rarr;
              </div>
           </motion.div>
         ))}
      </section>

      {/* Footer */}
      <footer className="p-24 text-center">
         <div className="text-[10px] uppercase tracking-[1em] opacity-20 mb-12">Flowing into the future</div>
         <div className="text-6xl font-black lowercase tracking-tighter opacity-10">fluidity.</div>
      </footer>

      <style jsx global>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
