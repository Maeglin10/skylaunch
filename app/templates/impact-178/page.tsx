"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Droplets, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import "../premium.css";

function FloatingBubble({ size, delay, xRange, duration }: { size: number, delay: number, xRange: number[], duration: number }) {
  return (
    <motion.div
      animate={{ y: ["100vh", "-20vh"], x: xRange }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-0 rounded-full border border-white/40 bg-gradient-to-tr from-white/10 to-white/40 backdrop-blur-sm pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]"
      style={{ width: size, height: size }}
    />
  );
}

export default function PremiumCleaning() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#E0F2FE] text-[#0C4A6E] min-h-screen font-sans selection:bg-[#0EA5E9] selection:text-white overflow-hidden relative">
      
      {/* BACKGROUND BUBBLES */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <FloatingBubble size={120} delay={0} xRange={[0, 50, -20, 0]} duration={15} />
         <FloatingBubble size={60} delay={5} xRange={[-50, 20, 50, -50]} duration={12} />
         <FloatingBubble size={200} delay={2} xRange={[100, -100, 50, 100]} duration={25} />
         <FloatingBubble size={90} delay={8} xRange={[-100, 50, -50, -100]} duration={18} />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-white/50">
         <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-[#0EA5E9] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0EA5E9]/30 group-hover:rotate-12 transition-transform">
               <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-black text-2xl tracking-tighter">FreshHome.</div>
         </div>
         
         <nav className="hidden md:flex gap-8 font-bold text-xs uppercase tracking-widest text-[#0369A1]">
            <Link href="#" className="hover:text-[#0EA5E9] transition-colors">Services</Link>
            <Link href="#" className="hover:text-[#0EA5E9] transition-colors">Process</Link>
            <Link href="#" className="hover:text-[#0EA5E9] transition-colors">Testimonials</Link>
         </nav>
         
         <button className="bg-[#0EA5E9] text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#0EA5E9]/30 hover:bg-[#0284C7] hover:scale-105 transition-all">
            Book Cleaning
         </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-20 px-6 z-10">
         <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            <motion.div style={{ opacity: opacityText }} className="relative z-20">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white font-bold text-[10px] uppercase tracking-widest text-[#0369A1] mb-8 shadow-sm">
                  <span className="flex text-yellow-500">★★★★★</span> Trusted by 5,000+ homes
               </div>
               
               <h1 className="text-6xl md:text-[5vw] font-black tracking-tighter leading-[0.85] text-[#0C4A6E] mb-8 drop-shadow-sm">
                  Pristine <br/>
                  <span className="text-[#0EA5E9]">Perfection.</span>
               </h1>
               
               <p className="text-lg md:text-xl font-medium text-[#0369A1]/70 leading-relaxed mb-12 max-w-md">
                  Experience the clarity of a flawlessly cleaned home. We provide eco-conscious, meticulous service that transforms your living space.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#0C4A6E] text-white px-8 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-[#0EA5E9] transition-colors shadow-2xl flex items-center justify-center gap-3">
                     Get Free Estimate <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </motion.div>
            
            <div className="relative h-[60vh] w-full perspective-[1000px] z-10 hidden lg:block">
               <motion.div 
                  style={{ 
                     rotateX: useTransform(springY, [-0.5, 0.5], [10, -10]),
                     rotateY: useTransform(springX, [-0.5, 0.5], [-10, 10]),
                     y: heroY
                  }} 
                  className="w-full h-full relative"
               >
                  <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white/50 backdrop-blur-sm">
                     <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200" alt="Clean Home" fill className="object-cover" priority />
                     
                     {/* Floating Badge on Image */}
                     <motion.div 
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4"
                     >
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center">
                           <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                           <div className="font-black text-sm text-[#0C4A6E]">100% Eco-Friendly</div>
                           <div className="text-[10px] font-bold text-[#0369A1] uppercase tracking-widest">Safe for Pets</div>
                        </div>
                     </motion.div>
                  </div>
               </motion.div>
            </div>
            
         </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 px-6 relative z-20 bg-white rounded-t-[4rem] shadow-[0_-20px_50px_rgba(14,165,233,0.1)]">
         <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#0C4A6E] mb-6">The Fresh Standard.</h2>
               <p className="text-lg font-medium text-[#0369A1]/60 max-w-2xl mx-auto">We don't just clean; we restore the harmony of your home using advanced techniques and non-toxic products.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { icon: <ShieldCheck className="w-10 h-10" />, title: "Vetted Professionals", desc: "Every cleaner undergoes strict background checks, interviews, and hands-on training to ensure trust." },
                  { icon: <Droplets className="w-10 h-10" />, title: "Eco-Conscious", desc: "We use only plant-based, non-toxic cleaning supplies that are gentle on your home and the environment." },
                  { icon: <Sparkles className="w-10 h-10" />, title: "Immaculate Detail", desc: "From baseboards to ceiling fans, our meticulous checklist ensures nothing is ever overlooked." }
               ].map((feature, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.6, delay: i * 0.1 }}
                     className="bg-[#E0F2FE]/50 border border-[#0EA5E9]/10 p-10 rounded-[2rem] hover:bg-[#E0F2FE] hover:shadow-2xl hover:shadow-[#0EA5E9]/20 transition-all duration-500 group"
                  >
                     <div className="w-20 h-20 bg-white rounded-2xl shadow-sm text-[#0EA5E9] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        {feature.icon}
                     </div>
                     <h3 className="text-2xl font-black text-[#0C4A6E] tracking-tight mb-4">{feature.title}</h3>
                     <p className="text-[#0369A1]/70 leading-relaxed font-medium">{feature.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
