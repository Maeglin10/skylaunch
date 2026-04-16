import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialRealEstate() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">
      {/* HEADER BLOCK */}
      <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="font-bold text-xl text-blue-900 tracking-tight">LuxeHomes.</div>
        <nav className="hidden md:flex gap-6 text-sm font-semibold text-gray-500">
            <Link href="#" className="hover:text-blue-900">Buy</Link>
            <Link href="#" className="hover:text-blue-900">Rent</Link>
            <Link href="#" className="hover:text-blue-900">Sell</Link>
        </nav>
        <button className="bg-blue-900 text-white px-5 py-2 rounded font-semibold text-sm hover:bg-blue-800">Sign In</button>
      </header>

      {/* HERO SEARCH BLOCK */}
      <section className="relative px-6 py-24 md:py-32 bg-blue-900 flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" alt="House" fill className="object-cover opacity-20 mix-blend-overlay" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Find your next perfect place.</h1>
            <p className="text-blue-100 text-lg mb-10">Discover thousands of properites for sale or rent across the country.</p>
            
            <div className="bg-white p-2 rounded-lg flex flex-col md:flex-row gap-2 shadow-2xl">
                <input type="text" placeholder="Enter an address, neighborhood, city, or ZIP code" className="flex-1 px-4 py-3 outline-none text-gray-700 font-medium" />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors">Search</button>
            </div>
        </motion.div>
      </section>

      {/* PROPERTY GRID BLOCK */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Listings</h2>
                <p className="text-gray-500">Hand-picked properties in premium locations.</p>
            </div>
            <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { price: "$1,250,000", address: "123 Beverly Hills Ave", specs: "4 Beds • 3 Baths • 2,500 sqft", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
                { price: "$850,000", address: "456 Modern Architecture St", specs: "3 Beds • 2 Baths • 1,800 sqft", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" },
                { price: "$2,100,000", address: "789 Ocean View Lane", specs: "5 Beds • 4 Baths • 4,200 sqft", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800" },
            ].map((prop, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
                    <div className="relative aspect-[4/3]">
                        <Image src={prop.img} alt="Property" fill className="object-cover" />
                        <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold rounded shadow-sm text-blue-900">FOR SALE</div>
                    </div>
                    <div className="p-6">
                        <div className="text-2xl font-bold text-blue-900 mb-2">{prop.price}</div>
                        <div className="text-gray-500 text-sm mb-4">{prop.specs}</div>
                        <div className="font-semibold text-gray-800">{prop.address}</div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
