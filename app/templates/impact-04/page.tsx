"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../premium.css";

export default function PortalTemplate() {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className="premium-theme bg-black text-white min-h-screen overflow-hidden">
      {/* HUD UI */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-bold tracking-[0.5em] uppercase pointer-events-auto">Portal.OS</Link>
        <div className="text-[10px] uppercase tracking-[0.5em] opacity-60">Status: {isEntered ? 'Stabilized' : 'Synchronizing'}</div>
      </nav>

      {/* Main Experience */}
      <main className="relative h-screen w-full flex items-center justify-center">
        
        {/* SCENE 1: DESERT (Visible initially) */}
        <AnimatePresence>
          {!isEntered && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
            >
              <Image
                src="/templates/portal_frame.png"
                alt="Desert salt flat"
                fill
                className="object-cover brightness-75 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCENE 2: JUNGLE (The Destination) */}
        <motion.div 
          animate={{ 
            scale: isEntered ? 1 : 0.5,
            opacity: isEntered ? 1 : 0
          }}
          transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/templates/portal_inner.png"
            alt="Jungle Paradise"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </motion.div>

        {/* THE PORTAL ARCH (Static element that mediates transition) */}
        <motion.div 
          animate={{ 
            scale: isEntered ? 4 : 1,
            opacity: isEntered ? 0 : 1
          }}
          transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
          className="relative z-20 w-[60vh] h-[60vh] flex items-center justify-center"
        >
          {/* We reuse the arch image but mask out the center in our minds, 
              actually the Portal Frame image HAS the arch. To make it feel like a portal,
              we place the "Inner Scene" BEHIND the arch and ensure the arch is transparent in the middle.
              Since my generated image is opaque, I'll use a CSS clip-path to simulate transparency.
          */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              backgroundImage: 'url(/templates/portal_frame.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              clipPath: 'circle(40% at 50% 50%)' // This masks the center to show the jungle behind
            }}
          />
          <div 
            className="absolute inset-0 border-[20px] border-white/10 rounded-full scale-110 blur-sm animate-pulse"
          />
        </motion.div>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-12 text-center">
          <AnimatePresence mode="wait">
            {!isEntered ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="max-w-2xl"
              >
                <h1 className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-12">
                  Alpha <br /> Node
                </h1>
                <p className="text-xs uppercase tracking-[1em] mb-12 opacity-60">Sequence: 884-29-1</p>
                <button 
                  onClick={() => setIsEntered(true)}
                  className="group relative px-12 py-6 overflow-hidden border border-white/20 uppercase text-xs tracking-[0.5em] font-black"
                >
                  <span className="relative z-10">Initialize Portal</span>
                  <motion.div 
                    initial={false}
                    whileHover={{ x: '100%' }}
                    className="absolute inset-0 bg-white -translate-x-full transition-transform duration-500"
                  />
                  <span className="absolute inset-0 bg-white text-black flex items-center justify-center translate-y-full hover:translate-y-0 transition-transform">
                     Enter the World
                  </span>
                </button>
              </motion.div>
            ) : (
                <motion.div
                    key="entered"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="max-w-4xl"
                >
                    <span className="text-[10px] uppercase tracking-[1em] text-cyan-400 mb-8 block">Destination Reached</span>
                    <h2 className="text-8xl md:text-[12rem] font-serif italic leading-none mb-12">Eden-01.</h2>
                    <p className="text-xl md:text-2xl font-light opacity-80 max-w-2xl mx-auto leading-relaxed mb-12">
                        Welcome to a reality untouched by time. <br />
                        Explore the coordinates of tranquility.
                    </p>
                    <button 
                         onClick={() => setIsEntered(false)}
                         className="text-[10px] uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity border-b border-white/20 pb-2"
                    >
                        Return to Node
                    </button>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating HUD Details */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-12 flex justify-between items-end mix-blend-difference pointer-events-none text-[8px] uppercase tracking-widest font-bold opacity-40">
        <div>Lat: 29.9792 | Long: 31.1342</div>
        <div className="text-right">Portal Sequence Active <br /> Core Temp: Nominal</div>
      </div>
    </div>
  );
}
