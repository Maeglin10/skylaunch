import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialLocalCafe() {
  return (
    <div className="bg-[#FAF8F5] text-[#3E2723] min-h-screen font-serif">
      {/* HEADER BLOCK */}
      <header className="w-full bg-[#FAF8F5] py-6 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-50 border-b border-[#3E2723]/10">
        <h1 className="text-2xl font-black tracking-widest uppercase">The Roast.</h1>
        <nav className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase">
          <Link href="#" className="hover:text-[#D84315] transition-colors">Menu</Link>
          <Link href="#" className="hover:text-[#D84315] transition-colors">About</Link>
          <Link href="#" className="hover:text-[#D84315] transition-colors">Location</Link>
        </nav>
        <button className="bg-[#3E2723] text-[#FAF8F5] px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#D84315] transition-colors">Order Ahead</button>
      </header>

      {/* HERO BLOCK */}
      <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">Artisan coffee,<br/>roasted locally.</h2>
            <p className="text-lg opacity-80 max-w-md mx-auto md:mx-0">Every bean is carefully selected and roasted in-house to bring out its unique flavor profile. Visit us for your daily cup of perfection.</p>
            <div className="flex gap-4 justify-center md:justify-start">
               <button className="bg-[#D84315] text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#BF360C] transition-colors">View Menu</button>
               <button className="border-2 border-[#3E2723] px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#3E2723] hover:text-[#FAF8F5] transition-colors">Find Us</button>
            </div>
         </motion.div>

         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex-1 w-full relative aspect-square md:aspect-[4/5]">
            <Image src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" alt="Coffee Pour" fill className="object-cover rounded-t-full shadow-2xl" />
         </motion.div>
      </section>

      {/* MENU PREVIEW BLOCK */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-[#D84315] font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Our Classics</span>
                <h2 className="text-4xl font-bold">Morning Essentials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {[
                    { name: "Espresso", price: "$3.50", desc: "Our signature blend, rich and complex." },
                    { name: "Cortado", price: "$4.00", desc: "Equal parts espresso and steamed milk." },
                    { name: "Pour Over", price: "$5.00", desc: "Single origin beans, hand-poured." },
                    { name: "Cold Brew", price: "$4.50", desc: "Slow-steeped for 24 hours, over ice." },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-baseline border-b border-[#3E2723]/10 pb-4">
                        <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm opacity-60 mt-1">{item.desc}</p>
                        </div>
                        <div className="font-bold text-[#D84315]">{item.price}</div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 text-center">
                <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-[#3E2723] pb-1 hover:text-[#D84315] hover:border-[#D84315] transition-colors">See Full Menu</button>
            </div>
        </div>
      </section>

      {/* INFO BLOCK */}
      <section className="py-24 bg-[#ECE6DD] px-6 text-center">
         <h2 className="text-3xl font-bold mb-8">Visit The Shop</h2>
         <p className="text-lg mb-2">123 Roaster Avenue, Coffee District</p>
         <p className="text-lg opacity-80 mb-8">Mon-Fri: 7am - 4pm | Sat-Sun: 8am - 5pm</p>
         <button className="bg-[#3E2723] text-[#FAF8F5] px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#D84315] transition-colors">Get Directions</button>
      </section>
    </div>
  );
}
