import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumRestaurant() {
  return (
    <div className="bg-[#171614] text-[#E8DCC4] min-h-screen font-serif selection:bg-[#E8DCC4] selection:text-[#171614]">
      {/* HEADER DIV */}
      <header className="px-6 py-6 md:px-12 md:py-8 flex justify-between items-center absolute w-full top-0 z-50 mix-blend-difference">
        <nav className="hidden md:flex gap-8 font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-[#E8DCC4]">
            <Link href="#" className="hover:opacity-60 transition">Menus</Link>
            <Link href="#" className="hover:opacity-60 transition">Private Dining</Link>
        </nav>
        <Link href="/" className="font-serif text-3xl italic tracking-widest mx-auto md:mx-0">Aura.</Link>
        <button className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase border border-[#E8DCC4] px-6 py-2 hover:bg-[#E8DCC4] hover:text-[#171614] transition-colors">Reservations</button>
      </header>

      {/* HERO HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden">
        <div className="absolute inset-0">
             <Image src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2000" alt="Restaurant interior" fill className="object-cover opacity-40 brightness-75 mix-blend-luminosity" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#171614] via-transparent to-transparent"></div>
        </div>
        
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative z-10 mt-20">
            <h1 className="text-6xl md:text-8xl font-normal tracking-tight mb-6">Culinary Poetry.</h1>
            <p className="font-sans text-sm md:text-base font-light tracking-widest max-w-lg mx-auto opacity-70 leading-relaxed text-center mb-12 uppercase">
                A Michelin-starred experience nestled in the heart of the city.<br/>Where fire meets finesse.
            </p>
            <div className="w-px h-24 bg-[#E8DCC4] mx-auto opacity-30"></div>
        </motion.div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto group">
                <Image src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1000" alt="Dish" fill className="object-cover rounded-t-[10rem] group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
                <div className="absolute inset-0 ring-1 ring-[#E8DCC4]/20 rounded-t-[10rem] pointer-events-none group-hover:ring-[#E8DCC4]/40 transition-colors"></div>
            </div>
            
            <div className="text-center lg:text-left space-y-12">
                <div className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase opacity-50">Tasting Menu</div>
                <h2 className="text-4xl font-normal italic">Seasonal Signatures</h2>
                
                <div className="space-y-8 font-sans font-light text-sm uppercase tracking-widest opacity-80">
                    <div className="border-b border-[#E8DCC4]/10 pb-4">
                        <div className="flex justify-between mb-2"><span>Wild Scallop Crudo</span><span>$32</span></div>
                        <div className="text-xs opacity-50 normal-case font-serif italic">Yuzu, shiso, smoked daikon</div>
                    </div>
                    <div className="border-b border-[#E8DCC4]/10 pb-4">
                        <div className="flex justify-between mb-2"><span>Aged Duck Breast</span><span>$48</span></div>
                        <div className="text-xs opacity-50 normal-case font-serif italic">Black cherry, endive, jus</div>
                    </div>
                    <div className="border-b border-[#E8DCC4]/10 pb-4">
                        <div className="flex justify-between mb-2"><span>Wagyu Striploin</span><span>$85</span></div>
                        <div className="text-xs opacity-50 normal-case font-serif italic">Charred leeks, bone marrow emulsion</div>
                    </div>
                </div>

                <div className="pt-8">
                    <button className="font-sans font-bold text-xs uppercase tracking-[0.2em] hover:opacity-50 transition-opacity flex items-center gap-4 mx-auto lg:mx-0">
                        View Full Menu <span className="w-12 h-px bg-[#E8DCC4]"></span>
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
