import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialBarber() {
  return (
    <div className="bg-[#111] text-[#E5E5E5] min-h-screen font-serif flex flex-col">
      {/* HEADER DIV */}
      <header className="w-full flex justify-between items-center px-8 py-6 border-b border-[#333]">
        <div className="text-3xl font-black uppercase tracking-[0.2em] italic text-[#C0A080]">Shears.</div>
        <button className="hidden md:block bg-transparent text-[#C0A080] border border-[#C0A080] px-6 py-2 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#C0A080] hover:text-[#111] transition-colors">Book Now</button>
      </header>

      {/* HERO HERO */}
      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-8 py-16 md:p-24 relative z-10 bg-[#111]">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-5xl md:text-8xl font-normal leading-[0.9] mb-8 font-serif italic text-white">Classic Cuts.<br/>Modern Feel.</h1>
                <p className="text-lg md:text-xl font-sans text-gray-400 mb-12 max-w-sm">Premium grooming services for the modern gentleman. Precision, style, and a hot towel finish.</p>
                
                <div className="space-y-6 font-sans text-sm uppercase tracking-widest text-[#C0A080] font-bold">
                    <div className="flex justify-between border-b border-[#333] pb-4">
                        <span>Haircut & Styling</span>
                        <span>$45</span>
                    </div>
                    <div className="flex justify-between border-b border-[#333] pb-4">
                        <span>Hot Towel Shave</span>
                        <span>$35</span>
                    </div>
                    <div className="flex justify-between border-b border-[#333] pb-4">
                        <span>Beard Trim</span>
                        <span>$25</span>
                    </div>
                    <div className="flex justify-between border-b border-[#333] pb-4">
                        <span>The Full Service</span>
                        <span>$70</span>
                    </div>
                </div>

                <div className="mt-12">
                    <button className="bg-[#C0A080] text-[#111] w-full md:w-auto px-12 py-4 font-sans font-black uppercase tracking-widest hover:bg-white transition-colors">Book Appointment</button>
                </div>
            </motion.div>
        </div>
        
        <div className="flex-1 relative min-h-[500px] border-l border-[#333]">
            <Image src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&q=80&w=1000" alt="Barber cutting hair" fill className="object-cover grayscale" />
            <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </main>
    </div>
  );
}
