"use client";

import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Globe2, BookOpen, ArrowUpRight, ArrowRight } from "lucide-react";
import "../premium.css";

function AnimatedCounter({ from, to, duration, suffix = "" }: { from: number, to: number, duration: number, suffix?: string }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
         if (node) {
            node.textContent = value.toFixed(0) + suffix;
         }
      },
    });

    return () => controls.stop();
  }, [from, to, duration, suffix]);

  return <span ref={nodeRef} />;
}

export default function PremiumNonprofit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#FAF9F6] text-[#1C2E2A] min-h-screen font-serif selection:bg-[#2A5C4A] selection:text-white">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-all bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-[#1C2E2A]/5">
         <div className="font-black text-2xl tracking-tighter text-[#2A5C4A] flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" />
            HopeFoundation.
         </div>
         
         <nav className="hidden md:flex gap-12 font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-[#1C2E2A]/60">
            <Link href="#" className="hover:text-[#2A5C4A] transition-colors">Our Mission</Link>
            <Link href="#" className="hover:text-[#2A5C4A] transition-colors">Initiatives</Link>
            <Link href="#" className="hover:text-[#2A5C4A] transition-colors">Stories</Link>
         </nav>
         
         <button className="bg-[#2A5C4A] text-[#FAF9F6] px-8 py-4 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#1C2E2A] transition-all shadow-[0_10px_30px_rgba(42,92,74,0.3)] hover:shadow-[0_10px_30px_rgba(28,46,42,0.5)]">
            Donate Now
         </button>
      </header>

      {/* BIG HERO IMAGE */}
      <section className="pt-32 pb-16 px-6 max-w-[1800px] mx-auto w-full flex-1 flex flex-col justify-center">
         <div className="relative w-full h-[70vh] md:h-[80vh] rounded-[3rem] overflow-hidden flex items-end p-8 md:p-16 text-white shadow-2xl">
            <motion.div style={{ scale: heroScale, y: imgY }} className="absolute inset-0">
               <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2500" alt="Charity" fill className="object-cover" priority />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2E2A] via-[#1C2E2A]/40 to-transparent" />
            
            <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1, delay: 0.2 }}
               className="relative z-10 max-w-4xl"
            >
               <div className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-white/50" /> Empowering the next generation
               </div>
               <h1 className="text-5xl md:text-[7vw] font-light tracking-tighter mb-8 leading-[0.9]">
                  Education <span className="font-black italic">changes</span> <br/> everything.
               </h1>
               <p className="text-lg md:text-2xl font-sans font-light mb-12 max-w-2xl text-white/80 leading-relaxed">
                  We believe every child deserves access to quality education. Join us in building schools and opportunities in underserved communities globally.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-6 font-sans">
                  <button className="bg-white text-[#2A5C4A] px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-[#FAF9F6] transition-colors flex items-center justify-center gap-3">
                     Give Monthly <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#1C2E2A] transition-colors flex items-center justify-center">
                     Learn Our Approach
                  </button>
               </div>
            </motion.div>
         </div>
      </section>

      {/* STATS STRIP (ANIMATED) */}
      <section className="py-24 px-6 relative z-20">
         <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-[#1C2E2A]/10">
            {[
               { num: 50, suffix: "+", text: "Schools Built", icon: <BookOpen className="w-6 h-6 mx-auto mb-4 text-[#2A5C4A]/50" /> },
               { num: 12000, suffix: "+", text: "Children Reached", icon: <Heart className="w-6 h-6 mx-auto mb-4 text-[#2A5C4A]/50" /> },
               { num: 15, suffix: "", text: "Countries", icon: <Globe2 className="w-6 h-6 mx-auto mb-4 text-[#2A5C4A]/50" /> },
               { num: 98, suffix: "%", text: "Direct Fund Allocation", icon: <div className="w-6 h-6 mx-auto mb-4 text-[#2A5C4A]/50 font-sans font-black">$</div> }
            ].map((stat, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
               >
                  {stat.icon}
                  <div className="text-5xl md:text-7xl font-black text-[#2A5C4A] mb-4 tracking-tighter font-sans">
                     <AnimatedCounter from={0} to={stat.num} duration={2} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] font-sans font-black text-[#1C2E2A]/50 uppercase tracking-[0.2em] max-w-[150px] mx-auto leading-relaxed">
                     {stat.text}
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* INITIATIVES SECTION */}
      <section className="py-32 px-6 bg-[#2A5C4A] text-white rounded-t-[4rem]">
         <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
               <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-none">
                  Current <br/> <span className="font-black italic">Initiatives.</span>
               </h2>
               <p className="max-w-md font-sans text-white/70 leading-relaxed font-medium">
                  We focus our resources where they create the largest ripple effect. Explore our active projects and see the impact of your contribution.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                  { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200", title: "Project: Nairobi Library", desc: "Constructing a modern learning center with digital resources for 2,000 students." },
                  { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200", title: "Girls Education Fund", desc: "Providing scholarships, uniforms, and safe transportation for young women in rural areas." }
               ].map((init, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.6, delay: i * 0.2 }}
                     className="group cursor-pointer"
                  >
                     <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 border border-white/10">
                        <Image src={init.img} alt={init.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        
                        <div className="absolute top-6 right-6 w-12 h-12 bg-white text-[#2A5C4A] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                           <ArrowUpRight className="w-5 h-5" />
                        </div>
                     </div>
                     <h3 className="text-3xl font-black tracking-tighter mb-4">{init.title}</h3>
                     <p className="font-sans text-white/60 text-lg leading-relaxed">{init.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
