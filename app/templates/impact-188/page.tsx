import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumFilm() {
  return (
    <div className="bg-[#050505] text-[#FAFAFA] min-h-screen font-serif flex flex-col md:overflow-hidden selection:bg-red-700 selection:text-white">
      {/* HEADER */}
      <header className="px-12 py-8 flex justify-between items-center z-50 absolute top-0 left-0 w-full mix-blend-difference">
        <div className="font-sans font-bold text-xs uppercase tracking-[0.4em]">Cinema</div>
        <div className="font-sans font-bold text-[10px] uppercase tracking-[0.5em] flex gap-8">
            <Link href="#" className="hover:text-red-500 transition">Roster</Link>
            <Link href="#" className="hover:text-red-500 transition">About</Link>
            <Link href="#" className="hover:text-red-500 transition">Contact</Link>
        </div>
      </header>

      {/* HORIZONTAL SCROLL FEEL - MAPPED TO FLEX RAW */}
      <main className="flex-1 flex flex-col md:flex-row pt-24 md:pt-0 overflow-y-auto md:overflow-x-auto md:overflow-y-hidden snap-y md:snap-x snap-mandatory">
         
         {/* INTRO SLIDE */}
         <section className="w-full md:w-screen h-[50vh] md:h-screen shrink-0 flex items-center justify-center p-12 snap-center relative">
             <div className="absolute inset-0 bg-[#050505] z-0"></div>
             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-center md:text-left">
                 <h1 className="text-6xl md:text-[8vw] font-light tracking-tighter leading-none mb-6 italic text-[#FAFAFA]/90">Visual<br />Storytelling.</h1>
                 <p className="font-sans font-medium text-xs tracking-[0.3em] uppercase max-w-xs md:max-w-sm leading-loose text-gray-500 mx-auto md:mx-0">Award-winning production house specializing in cinematic commercials and short films.</p>
             </motion.div>
         </section>

         {/* PROJECT SLIDES */}
         {[
             { title: "Nighthawks", dir: "Dir: J. Mercer", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200" },
             { title: "The Void", dir: "Dir: A. Lin", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=1200" },
             { title: "Ethereal", dir: "Dir: S. Costa", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=1200" }
         ].map((proj, i) => (
             <section key={i} className="w-full md:w-[80vw] h-[80vh] md:h-screen shrink-0 p-8 md:p-24 snap-center flex items-center justify-center group cursor-pointer relative overflow-hidden">
                 <div className="relative w-full h-full rounded-tr-[10rem] overflow-hidden group-hover:rounded-tr-none transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
                    <Image src={proj.img} alt={proj.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 z-10 text-white flex items-end gap-8">
                        <div>
                            <div className="font-sans font-bold text-[10px] tracking-[0.5em] uppercase mb-4 text-red-500 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">{proj.dir}</div>
                            <h2 className="text-5xl md:text-8xl font-normal italic pr-8">{proj.title}</h2>
                        </div>
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md pb-1 pl-1">
                            <span className="font-sans text-xs tracking-widest">Play</span>
                        </div>
                    </div>
                 </div>
             </section>
         ))}
      </main>
    </div>
  );
}
