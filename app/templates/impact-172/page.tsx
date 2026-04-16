import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialLawFirm() {
  return (
    <div className="bg-[#fcfbf9] text-[#1a1a1a] min-h-screen font-serif">
      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-3xl font-bold tracking-tight uppercase">Sterling & Vance</div>
            <nav className="flex gap-6 text-sm font-sans font-bold tracking-widest text-[#555] uppercase">
                <Link href="#" className="hover:text-amber-700 transition">Practice Areas</Link>
                <Link href="#" className="hover:text-amber-700 transition">Attorneys</Link>
                <Link href="#" className="hover:text-amber-700 transition">Insights</Link>
            </nav>
            <div className="font-sans font-bold text-amber-700">(212) 555-0199</div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 py-24 md:py-32 bg-[#1a1a1a] text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
            <Image src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000" alt="Library" fill className="object-cover grayscale" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Uncompromising advocacy for complex matters.</h1>
            <p className="text-xl md:text-2xl font-sans font-light text-gray-300 mb-10">We represent exceptional clients in their most critical legal challenges across corporate litigation, appellate practice, and intellectual property.</p>
            <button className="bg-amber-700 text-white px-8 py-4 font-sans font-bold uppercase tracking-widest text-sm hover:bg-amber-600 transition">Consult With Us</button>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-sm font-sans font-bold uppercase tracking-widest text-amber-700 mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Practice Areas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
            {[
                { title: "Corporate Litigation", desc: "Resolving complex business disputes with aggressive and strategic representation." },
                { title: "Intellectual Property", desc: "Protecting essential patents, trademarks, and trade secrets in competitive markets." },
                { title: "Appellate Practice", desc: "Handling high-stakes appeals in federal and state supreme courts." },
                { title: "White Collar Defense", desc: "Defending executives and corporations in regulatory investigations." }
            ].map((area, i) => (
                <div key={i} className="bg-white p-12 hover:bg-[#fafafa] transition cursor-pointer group">
                    <h4 className="text-2xl font-bold mb-4 group-hover:text-amber-700 transition">{area.title}</h4>
                    <p className="font-sans text-gray-600 leading-relaxed">{area.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* ABOUT TEXT */}
      <section className="bg-[#1a1a1a] text-white py-24 px-6">
         <div className="max-w-4xl mx-auto text-center">
             <Image src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400" alt="Partner" width={120} height={120} className="rounded-full mx-auto mb-8 object-cover grayscale" />
             <p className="text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
                 "Our philosophy is simple: we prepare every case as if it will go to trial. This preparation is what secures favorable settlements and definitive victories."
             </p>
             <div className="font-sans font-bold uppercase tracking-widest text-sm text-amber-700">James Sterling, Managing Partner</div>
         </div>
      </section>
    </div>
  );
}
