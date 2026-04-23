"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import "../premium.css";

const LOOKS = [
  { img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200", title: "The Structured Coat", desc: "Crafted from heavy wool blend, featuring exaggerated shoulders and a cinched waist silhouette.", price: "$1,250" },
  { img: "https://images.unsplash.com/photo-1550614000-4b95d4151745?auto=format&fit=crop&q=80&w=1200", title: "Silk Draped Gown", desc: "Fluid, asymmetric design cut from pure mulberry silk. A study in organic movement.", price: "$2,800" },
  { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200", title: "Oversized Blazer", desc: "Menswear-inspired tailoring meets delicate feminine draping.", price: "$980" }
];

export default function PremiumFashion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Spring smooth scroll for marquee
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const marqueeX = useTransform(springScroll, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#EBE9E4] text-[#1D1D1B] min-h-screen font-serif selection:bg-[#1D1D1B] selection:text-[#EBE9E4]">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-8 py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <nav className="hidden md:flex gap-8 text-[10px] font-sans font-black uppercase tracking-[0.3em] pointer-events-auto">
            <Link href="#" className="hover:opacity-50 transition-opacity">Shop</Link>
            <Link href="#" className="hover:opacity-50 transition-opacity">Collections</Link>
        </nav>
        
        <Link href="/" className="text-4xl md:text-5xl font-black uppercase tracking-tighter pointer-events-auto mix-blend-difference">V E L M A</Link>
        
        <nav className="flex items-center gap-8 text-[10px] font-sans font-black uppercase tracking-[0.3em] pointer-events-auto">
            <Link href="#" className="hover:opacity-50 transition-opacity hidden md:block">Account</Link>
            <button className="flex items-center gap-2 hover:opacity-50 transition-opacity">
               <ShoppingBag className="w-4 h-4" /> (0)
            </button>
        </nav>
      </header>

      {/* MASSIVE HERO */}
      <section className="relative h-screen flex flex-col justify-end overflow-hidden p-4">
        <motion.div style={{ y: heroY }} className="absolute inset-4 z-0 pointer-events-none rounded-2xl overflow-hidden">
             <Image src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2500" alt="Fashion" fill className="object-cover" priority />
             <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        
        <motion.div style={{ scale: textScale, opacity: textOpacity }} className="relative z-10 text-center w-full pb-12 pointer-events-none">
            <div className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-white/80 mb-6 drop-shadow-lg">
               Spring / Summer Collection
            </div>
            <h1 className="text-[15vw] font-black uppercase tracking-tighter text-white mix-blend-overlay leading-none drop-shadow-2xl">
               SS '26
            </h1>
        </motion.div>
      </section>

      {/* KINETIC TYPOGRAPHY MARQUEE */}
      <div className="py-12 bg-[#1D1D1B] text-[#EBE9E4] overflow-hidden border-y border-[#1D1D1B]">
         <motion.div style={{ x: marqueeX }} className="text-8xl md:text-[8vw] font-black uppercase tracking-tighter whitespace-nowrap flex gap-12">
            <span>NEW COLLECTION</span> <span className="text-transparent" style={{ WebkitTextStroke: "1px #EBE9E4" }}>SS26</span> <span>V E L M A</span>
            <span>NEW COLLECTION</span> <span className="text-transparent" style={{ WebkitTextStroke: "1px #EBE9E4" }}>SS26</span> <span>V E L M A</span>
         </motion.div>
      </div>

      {/* EDITORIAL GRID */}
      <section className="py-32 px-8 max-w-[1800px] mx-auto">
        <div className="flex justify-between items-start mb-32 max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light italic leading-snug">
               "A study in contrasts: delicate silks bound by rigid architectural forms."
            </h2>
        </div>

        <div className="space-y-48">
            {LOOKS.map((look, i) => (
               <div key={i} className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center`}>
                  
                  {/* Image Side */}
                  <motion.div 
                     initial={{ opacity: 0, clipPath: "inset(20% 0 20% 0)" }}
                     whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                     className={`md:col-span-6 ${i % 2 !== 0 ? 'md:col-start-7 md:order-2' : 'md:col-start-2'}`}
                  >
                     <div className="relative aspect-[3/4] overflow-hidden group">
                        <Image src={look.img} alt={look.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-[0.16,1,0.3,1]" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                     </div>
                  </motion.div>

                  {/* Text Side */}
                  <motion.div 
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     className={`md:col-span-4 flex flex-col justify-center ${i % 2 !== 0 ? 'md:col-start-2 md:order-1' : 'md:col-start-9'}`}
                  >
                     <div className="text-[10px] font-sans font-black uppercase tracking-[0.3em] mb-6 text-gray-500">Look 0{i + 1}</div>
                     <h3 className="text-5xl font-black uppercase mb-6 tracking-tighter leading-none">{look.title}</h3>
                     <p className="font-light italic text-xl text-gray-600 mb-12 max-w-sm leading-relaxed">{look.desc}</p>
                     
                     <div className="flex items-center gap-8">
                        <span className="font-sans font-bold text-lg">{look.price}</span>
                        <Link href="#" className="font-sans font-black uppercase tracking-widest text-[10px] border-b-2 border-[#1D1D1B] pb-2 flex items-center gap-3 hover:gap-6 hover:text-gray-500 hover:border-gray-500 transition-all group">
                           Shop the look <ArrowRight className="w-4 h-4" />
                        </Link>
                     </div>
                  </motion.div>

               </div>
            ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1D1D1B] text-[#EBE9E4] pt-32 pb-12 px-8 mt-32 text-center">
         <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none mb-12">V E L M A</h2>
         <div className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-white/50 flex justify-center gap-12">
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
         </div>
      </footer>
    </div>
  );
}
