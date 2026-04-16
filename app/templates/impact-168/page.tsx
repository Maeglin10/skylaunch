import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialEcommerce() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      {/* HEADER BLOCK */}
      <header className="px-6 py-5 flex justify-between items-center border-b border-gray-100 max-w-7xl mx-auto">
        <div className="font-black text-2xl tracking-tighter">BASICS.</div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-500">
            <Link href="#" className="text-black">Shop All</Link>
            <Link href="#" className="hover:text-black">New Arrivals</Link>
            <Link href="#" className="hover:text-black">Collections</Link>
            <Link href="#" className="hover:text-black">Sale</Link>
        </nav>
        <div className="flex gap-4">
            <button className="text-gray-500 hover:text-black">Search</button>
            <button className="text-gray-500 hover:text-black">Cart (2)</button>
        </div>
      </header>

      {/* HERO BANNER BLOCK */}
      <section className="px-6 py-6 pb-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-gray-100 rounded-2xl overflow-hidden flex items-center p-12">
            <div className="absolute inset-0">
                <Image src="https://images.unsplash.com/photo-1445205170230-053b830160b0?auto=format&fit=crop&q=80&w=2000" alt="Autumn Collection" fill className="object-cover opacity-60" />
            </div>
            <div className="relative z-10 w-full max-w-lg">
                <h1 className="text-4xl md:text-5xl font-black mb-4">The Autumn Fall Collection.</h1>
                <p className="text-lg text-gray-700 mb-8">Premium essentials crafted for the changing seasons.</p>
                <button className="bg-black text-white px-8 py-3 font-bold text-sm hover:bg-gray-800 transition-colors">Shop Now</button>
            </div>
        </motion.div>
      </section>

      {/* PRODUCT GRID BLOCK */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Trending Now</h2>
            <Link href="#" className="text-sm font-semibold underline text-gray-500 hover:text-black">View all</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {[
                { name: "Heavyweight Box Tee", price: "$45.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
                { name: "Structured Overshirt", price: "$120.00", img: "https://images.unsplash.com/photo-1593998066526-65fcab3021a2?auto=format&fit=crop&q=80&w=800" },
                { name: "Everyday Tote", price: "$65.00", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800" },
                { name: "Minimalist Sneaker", price: "$150.00", img: "https://images.unsplash.com/photo-1560769623-688fd61376d2?auto=format&fit=crop&q=80&w=800" },
            ].map((p, i) => (
                <div key={i} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="w-full bg-white text-black font-bold text-xs py-3 shadow-lg">Quick Add</button>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm mb-1">{p.name}</h3>
                        <p className="text-gray-500 text-sm">{p.price}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
