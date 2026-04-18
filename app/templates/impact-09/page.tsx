"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, Menu, Search, X, Volume2, Share2 } from "lucide-react";
import "../premium.css";

const STORIES = [
  { 
    id: 1, 
    title: "The Gilded Age", 
    subtitle: "A Study of Gold and Silk",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
    content: "In the heart of the modern metropolis, a new wave of craftsmanship is emerging. This series explores the intersection of brutalist architecture and the softness of ancient silk weaving techniques."
  },
  { 
    id: 2, 
    title: "Desert Silence", 
    subtitle: "Minimalist Landscapes",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    content: "The void is not empty. It is a canvas for light. We traveled to the salt flats to capture the essence of pure, unadulterated color in the absence of form."
  },
  { 
    id: 3, 
    title: "Neural Rift", 
    subtitle: "Merging Tech & Flesh",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
    content: "As digital interfaces become invisible, our physical presence becomes a deliberate choice. A photographic essay on the final frontier of human individuality."
  }
];

export default function EditorialSPA() {
  const [view, setView] = useState<"front" | "story" | "archive">("front");
  const [activeStory, setActiveStory] = useState(0);

  return (
    <div className="premium-theme bg-[#fdfdfd] text-[#1a1a1a] min-h-screen overflow-x-hidden selection:bg-black selection:text-white font-serif">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference invert uppercase text-[10px] font-black tracking-[0.5em]">
        <button onClick={() => setView("front")} className="text-xl font-bold tracking-widest italic">Editorial&reg;</button>
        <div className="hidden md:flex gap-12">
           <button onClick={() => setView("front")} className={`hover:opacity-40 transition-opacity ${view === 'front' ? 'border-b border-black' : ''}`}>Issue_04</button>
           <button onClick={() => setView("archive")} className={`hover:opacity-40 transition-opacity ${view === 'archive' ? 'border-b border-black' : ''}`}>Archive</button>
        </div>
        <div className="flex gap-8 items-center">
           <Search className="w-4 h-4 cursor-pointer hover:opacity-40" />
           <Menu className="w-4 h-4 cursor-pointer hover:opacity-40" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* FRONT PAGE VIEW */}
        {view === "front" && (
          <motion.div key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
             <main className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Side: Pinned Context */}
                <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen lg:sticky lg:top-0 bg-[#f4f4f4] flex flex-col justify-center p-12 lg:p-24 border-r border-black/5">
                   <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
                      <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-8 block font-black font-sans">Volume Four / Series One</span>
                      <h1 className="text-7xl md:text-[8vw] italic leading-[0.8] tracking-tighter mb-12">
                         Asymmetric <br /> 
                         <span className="not-italic font-black text-[#111]">Balance.</span>
                      </h1>
                      <p className="max-w-md text-sm leading-relaxed opacity-60 mb-12 uppercase tracking-wide font-sans">
                         A study in structural negative space and conceptual narratives. We define the aesthetic of the next decade.
                      </p>
                      <button onClick={() => setView("archive")} className="flex items-center gap-6 group">
                         <div className="px-10 py-5 border border-black uppercase text-[10px] tracking-[0.5em] font-black group-hover:bg-black group-hover:text-white transition-all font-sans">Explore Stories</div>
                         <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </button>
                   </motion.div>
                </div>

                {/* Right Side: Scrollable Stories */}
                <div className="w-full lg:w-1/2 p-4 lg:p-24 space-y-32">
                   {STORIES.map((story, i) => (
                     <motion.div 
                       key={story.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
                       onClick={() => { setActiveStory(i); setView("story"); }}
                       className="group cursor-pointer"
                     >
                        <div className="relative aspect-[3/4] bg-[#eee] overflow-hidden mb-8 shadow-2xl">
                           <Image src={story.img} alt={story.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                        </div>
                        <div className="flex justify-between items-end border-b border-black/10 pb-6">
                           <div>
                              <h2 className="text-3xl md:text-4xl italic mb-2 tracking-tight">{story.title}</h2>
                              <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-black font-sans">{story.subtitle}</p>
                           </div>
                           <div className="text-[10px] font-black opacity-10 font-sans tracking-widest">REF_{2026 + i}</div>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </main>
          </motion.div>
        )}

        {/* STORY VIEW */}
        {view === "story" && (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 lg:pt-0">
             <button onClick={() => setView("front")} className="fixed top-12 left-12 z-[60] p-4 bg-white/80 backdrop-blur-md rounded-full border border-black/5 hover:bg-black hover:text-white transition-all shadow-xl">
               <ChevronLeft className="w-5 h-5" />
             </button>

             <main className="flex flex-col lg:flex-row min-h-screen">
                <div className="w-full lg:w-1/2 h-screen lg:sticky lg:top-0">
                   <Image src={STORIES[activeStory].img} alt="Hero" fill className="object-cover" priority />
                   <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="w-full lg:w-1/2 p-12 lg:p-32 bg-white">
                   <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 mb-8 block font-black font-sans">Article / {STORIES[activeStory].subtitle}</span>
                   <h1 className="text-6xl md:text-8xl italic tracking-tighter leading-[0.9] mb-12">{STORIES[activeStory].title}</h1>
                   
                   <div className="flex gap-12 mb-16 border-y border-black/5 py-8">
                      <div className="flex items-center gap-3 opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
                         <Volume2 className="w-4 h-4" /> <span className="text-[10px] font-black font-sans tracking-widest uppercase">Listen</span>
                      </div>
                      <div className="flex items-center gap-3 opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
                         <Share2 className="w-4 h-4" /> <span className="text-[10px] font-black font-sans tracking-widest uppercase">Share</span>
                      </div>
                   </div>

                   <p className="text-2xl leading-relaxed mb-12 italic opacity-80">
                      {STORIES[activeStory].content}
                   </p>
                   
                   <div className="space-y-12 text-lg leading-relaxed opacity-60 font-sans">
                      <p>
                         The collection represents a philosophical shift in how we perceive luxury. No longer tied to excess, the new premium is found in the deliberate reduction of noise. Every seam, every shadow, and every silence is curated to enhance the central narrative of the wearer.
                      </p>
                      <p>
                         Captured in the salt flats of Boliva, the 'Desert Silence' series represents the peak of this reduction. The harsh light strips away the illusions of form, leaving only the raw essence of our textile innovation.
                      </p>
                   </div>

                   <div className="mt-24 pt-12 border-t border-black/10 flex justify-between items-center group cursor-pointer" onClick={() => setActiveStory((activeStory + 1) % STORIES.length)}>
                      <div>
                         <span className="text-[10px] uppercase tracking-widest opacity-30 font-black font-sans">Next Story</span>
                         <div className="text-2xl italic tracking-tight">{STORIES[(activeStory + 1) % STORIES.length].title}</div>
                      </div>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                   </div>
                </div>
             </main>
          </motion.div>
        )}

        {/* ARCHIVE VIEW */}
        {view === "archive" && (
          <motion.div key="archive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen font-sans">
             <div className="flex justify-between items-end mb-24">
                <h1 className="text-8xl font-black italic tracking-tighter leading-none font-serif text-[#111]">Archive.</h1>
                <div className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30">Series // 2018—2026</div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: (i % 4) * 0.1 }}
                    className="relative aspect-square glass overflow-hidden group border border-black/5"
                  >
                     <Image src={`https://images.unsplash.com/photo-${1500000000000 + i * 123456}?q=80&w=600&auto=format&fit=crop`} alt="Archive" fill className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                     <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Issue_0{i+1}</div>
                        <div className="text-lg italic font-serif opacity-0 group-hover:opacity-100 transition-opacity">Visual Synthesis</div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="relative z-10 p-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12 font-sans text-[10px] uppercase tracking-[0.4em] font-black opacity-30">
         <div>&copy; 2026 Editorial.studio</div>
         <div className="flex gap-12">
            <span className="hover:opacity-100 cursor-pointer">Instagram</span>
            <span className="hover:opacity-100 cursor-pointer">Twitter</span>
            <span className="hover:opacity-100 cursor-pointer">Terminal</span>
         </div>
         <div>London / Paris / NYC</div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
