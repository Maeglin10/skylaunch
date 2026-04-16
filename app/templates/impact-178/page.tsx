import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialCleaningService() {
  return (
    <div className="bg-sky-50 text-slate-800 min-h-screen font-sans">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-black text-sky-600 flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.5.5 0 0 1-.496.522H3.5a.5.5 0 0 1-.496-.522 9.005 9.005 0 0 1 5.9-8.181A5.5 5.5 0 0 1 12 2.5z"></path></svg>
                FreshHome
            </div>
            <nav className="hidden md:flex gap-8 font-semibold text-slate-600 text-sm">
                <Link href="#" className="hover:text-sky-600">Services</Link>
                <Link href="#" className="hover:text-sky-600">Pricing</Link>
                <Link href="#" className="hover:text-sky-600">Reviews</Link>
            </nav>
            <div className="flex items-center gap-4">
                <div className="hidden sm:block font-bold text-sky-600">1-800-CLEAN</div>
                <button className="bg-sky-500 text-white px-6 py-2 rounded-full font-bold hover:bg-sky-600 transition shadow">Book Now</button>
            </div>
        </div>
      </header>

      {/* HERO HERO */}
      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-bold">
                <span className="text-yellow-500 text-lg">★★★★★</span> Rated 4.9 by 2,000+ happy clients
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-900">Come home to a <br/><span className="text-sky-600">sparkling clean</span> house.</h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">Trusted, professional, and fully insured local cleaners. Spend your free time doing what you love, leave the cleaning to us.</p>
            
            <form className="bg-white p-2 rounded-xl flex flex-col sm:flex-row gap-2 shadow-xl shadow-sky-100 max-w-md">
                <input type="text" placeholder="Enter your ZIP code" className="flex-1 px-4 py-3 outline-none font-semibold text-slate-700" />
                <button className="bg-sky-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-sky-600 transition">Get Estimate</button>
            </form>
        </motion.div>
        
        <div className="flex-1 relative w-full h-[400px] md:h-[600px]">
            <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000" alt="Clean Home" fill className="object-cover rounded-3xl shadow-2xl" />
        </div>
      </section>

      {/* THREE CARDS / WHY US */}
      <section className="bg-white py-24 px-6 border-t border-sky-100">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-16 text-slate-900">Why choose FreshHome?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                {[
                    { title: "Vetted Professionals", desc: "Every cleaner undergoes strict background checks and hands-on training." },
                    { title: "Eco-Friendly Products", desc: "We use safe, non-toxic cleaning supplies that are gentle on your home and pets." },
                    { title: "100% Satisfaction", desc: "Not happy? Let us know within 24 hours and we'll re-clean for free." }
                ].map((feature, i) => (
                    <div key={i} className="flex flex-col items-center p-6 border border-slate-100 rounded-2xl bg-sky-50">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-sky-500 font-black text-2xl mb-6 shadow-sm">✓</div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
