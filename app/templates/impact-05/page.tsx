"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function BrutalistTemplate() {
  const accentColor = "#adff2f"; // Toxic Green

  return (
    <div className="premium-theme bg-[#f0f0f0] text-black min-h-screen selection:bg-black selection:text-white p-4 md:p-8">
      {/* Brutalist Layout Container */}
      <div className="border-[4px] border-black min-h-[calc(100vh-4rem)] p-8 md:p-12 relative flex flex-col">
        
        {/* Navigation */}
        <nav className="flex justify-between items-start mb-24">
          <Link href="/" className="text-4xl font-mono font-black border-b-[8px] border-black leading-none pb-2">
            RAW_ARCH
          </Link>
          <div className="flex gap-8 font-mono text-sm font-bold uppercase">
             <a href="#" className="hover:bg-black hover:text-white px-2 py-1 transition-colors">Manifesto</a>
             <a href="#" className="hover:bg-black hover:text-white px-2 py-1 transition-colors">Structure</a>
             <a href="#" className="hover:bg-black hover:text-white px-2 py-1 transition-colors">Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-12 gap-8 flex-grow items-end">
          <div className="col-span-12 lg:col-span-7">
             <motion.h1 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-[15vw] lg:text-[12vw] font-black leading-[0.8] uppercase tracking-tighter mb-8 bg-white border-[4px] border-black p-4 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
             >
                Stark <br /> Frame
             </motion.h1>
             <div className="max-w-xl font-mono text-lg font-bold leading-tight uppercase opacity-80 mt-12 mb-12">
                Honesty of materials. <br />
                Transparency of function. <br />
                The weight of history.
             </div>
          </div>

          <div className="col-span-12 lg:col-span-5 relative">
             {/* Main Image with Brutalist Shadow */}
             <motion.div 
               whileHover={{ x: -8, y: -8 }}
               className="relative aspect-square border-[8px] border-black shadow-[24px_24px_0px_0px_#adff2f] overflow-hidden"
             >
                <Image
                  src="/templates/brutalist_staircase.png"
                  alt="Brutalist Staircase"
                  fill
                  className="object-cover grayscale contrast-200"
                />
             </motion.div>
             {/* Floating Label */}
             <div className="absolute top-[-30px] right-[-30px] bg-black text-white p-6 font-mono font-black italic text-2xl rotate-12 z-10 border-[4px] border-[#adff2f]">
                001
             </div>
          </div>
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-24 border-[4px] border-black">
           {[
             { title: "Material", val: "CONCRETE_V1" },
             { title: "Form", val: "GEOMETRIC" },
             { title: "Truth", val: "FUNCTIONAL" }
           ].map((item, i) => (
             <div key={i} className="p-12 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black hover:bg-[#adff2f] transition-colors group">
                <div className="text-xs font-mono font-black opacity-40 mb-4 uppercase">{item.title}</div>
                <div className="text-4xl font-mono font-black group-hover:tracking-widest transition-all">{item.val}</div>
             </div>
           ))}
        </div>
      </div>

      {/* Full Width Impact Text Overlay */}
      <section className="mt-32 mb-32 relative overflow-hidden h-[40vh] bg-black flex items-center justify-center">
         <motion.div 
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="whitespace-nowrap flex"
         >
            <span className="text-[25vh] font-mono font-black text-white uppercase italic px-12">NO_COMPROMISE. NO_COMPROMISE.</span>
         </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-24 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 font-mono uppercase font-black text-sm">
         <div>
            &copy; 2026 BRUT_STUDIO / LDN <br />
            BUILT_BY_ALIENS
         </div>
         <div className="flex gap-12 md:justify-end">
            <a href="#" className="border-b-[4px] border-black">Index</a>
            <a href="#" className="border-b-[4px] border-black">Archive</a>
            <a href="#" className="border-b-[4px] border-black">Contact</a>
         </div>
      </footer>
    </div>
  );
}
