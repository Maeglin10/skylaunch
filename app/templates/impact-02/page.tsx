"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search, Menu, ArrowRight, ArrowLeft } from "lucide-react";
import "../premium.css";

export default function EditorialLuxTemplate() {
  const [view, setView] = useState<"home" | "collection" | "product">("home");
  const [cartCount, setCartCount] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1500], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1500], [0, -200]);
  const op = useTransform(scrollY, [0, 500], [1, 0]);

  const products = [
    { id: 1, name: "The Alchemist Watch", price: 12500, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop", desc: "Forged in Geneva. Hand-wound mechanical movement with tourbillon." },
    { id: 2, name: "Onyx Cuff Bracelet", price: 3400, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop", desc: "Solid 18k white gold embedded with deep black onyx." },
    { id: 3, name: "Eternity Diamond Ring", price: 8900, image: "https://images.unsplash.com/photo-1605100804763-247f66127117?q=80&w=1000&auto=format&fit=crop", desc: "Flawless VVS1 diamond set on an invisible platinum band." },
    { id: 4, name: "Gilded Evening Clutch", price: 2100, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop", desc: "Artisanally shaped metal frame covered in pure silk." },
  ];

  return (
    <div className="bg-[#f0ece6] text-[#1a1a1a] min-h-screen selection:bg-[#d4b483] selection:text-white font-sans overflow-hidden">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 md:px-12 md:py-10 flex justify-between items-end border-b border-black/5 bg-[#f0ece6]/80 backdrop-blur-xl">
        <div className="hidden md:flex gap-12 text-[9px] uppercase tracking-[0.4em] font-bold">
          <button onClick={() => setView("home")} className="hover:text-[#d4b483] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4b483] hover:after:w-full after:transition-all">Maison</button>
          <button onClick={() => setView("collection")} className="hover:text-[#d4b483] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4b483] hover:after:w-full after:transition-all">Collection</button>
        </div>
        
        <button onClick={() => setView("home")} className="text-3xl md:text-5xl font-serif italic tracking-tighter mx-auto md:absolute md:left-1/2 md:-translate-x-1/2">
          Mavelle
        </button>

        <div className="flex gap-8 items-center text-[9px] uppercase tracking-[0.4em] font-bold">
          <button className="hidden md:block hover:text-[#d4b483] transition-colors">Atelier</button>
          <button className="flex items-center gap-2 hover:text-[#d4b483] transition-colors">
            <ShoppingBag className="w-4 h-4" /> 
            <span className="hidden md:inline">Cart ({cartCount})</span>
            <span className="md:hidden">({cartCount})</span>
          </button>
          <button className="md:hidden"><Menu className="w-5 h-5"/></button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* HOMEPAGE VIEW */}
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero Section */}
            <section className="relative px-6 md:px-12 pt-40 pb-24 grid grid-cols-12 gap-8 md:gap-12 min-h-[90vh]">
              {/* Left Column - Text content */}
              <div className="col-span-12 lg:col-span-4 flex flex-col justify-center pt-10 md:pt-24 z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                  <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6 block font-bold">Spring / Summer</span>
                  <h1 className="text-7xl md:text-[9rem] font-serif leading-[0.85] mb-8 md:mb-12 tracking-tighter">
                    Timeless <br />
                    <span className="italic text-[#d4b483]">Essence.</span>
                  </h1>
                  <p className="text-lg font-light leading-relaxed max-w-sm opacity-70 mb-12 hidden md:block">
                    Discover the new collection where heritage meets the avant-garde. A symphony of gold and silk, crafted for those who define the moment.
                  </p>
                  <button onClick={() => setView("collection")} className="group relative flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold">
                    <span className="bg-[#1a1a1a] text-white px-8 py-5 group-hover:bg-[#d4b483] transition-colors duration-500">Explore Selection</span>
                    <div className="w-12 h-[1px] bg-black/20 group-hover:w-24 group-hover:bg-[#d4b483] transition-all duration-500 hidden md:block"></div>
                  </button>
                </motion.div>
              </div>

              {/* Right Column - Hero Image with Parallax */}
              <div className="col-span-12 lg:col-span-8 relative h-[60vh] md:h-[80vh] overflow-hidden group">
                <motion.div style={{ y: y1 }} className="absolute -inset-y-24 inset-x-0">
                  <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" alt="Luxury Fashion" fill className="object-cover" priority />
                </motion.div>
                
                {/* Vintage Vignette */}
                <div className="absolute inset-0 bg-black/10 mix-blend-color-burn" />
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] pointer-events-none" />

                {/* Circular Badge Overlay */}
                <motion.div style={{ opacity: op }} className="absolute -bottom-10 -left-10 md:-bottom-16 md:-left-16 w-32 h-32 md:w-48 md:h-48 rounded-full border border-black/10 flex items-center justify-center p-4 md:p-8 bg-[#fdfcf9]/80 backdrop-blur-md shadow-2xl z-20">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-full h-full text-[6px] md:text-[8px] uppercase tracking-[0.2em] font-bold text-center flex items-center justify-center">
                    Crafted in Geneve • Est. 1984 • Authentic •
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Feature Section */}
            <section className="bg-white py-32 md:py-48 px-6 md:px-12">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-12 md:gap-24">
                 <div className="w-full md:w-1/3 aspect-[3/4] bg-[#f5f5f5] relative overflow-hidden group">
                   <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} className="w-full h-full">
                     <Image src="https://images.unsplash.com/photo-1599643478524-fb524419877d?q=80&w=1000&auto=format&fit=crop" alt="Detail view" fill className="object-cover opacity-80" />
                   </motion.div>
                 </div>
                 <div className="w-full md:w-2/3 md:pb-12">
                    <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">Precision. <br /> In Every <span className="italic text-[#d4b483]">Gilded</span> Second.</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-black/10 pt-12">
                      <div>
                         <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4">Master Craftsmanship</h3>
                         <p className="opacity-60 leading-relaxed uppercase text-[10px] tracking-wider">Over 400 hours of manual assembly for each timepiece in the collection. A dedication to the purest art form.</p>
                      </div>
                      <div>
                         <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4">Sustainable Luxury</h3>
                         <p className="opacity-60 leading-relaxed uppercase text-[10px] tracking-wider">Responsibly sourced materials, traceably harvested for a better tomorrow without compromising perfection.</p>
                      </div>
                    </div>
                 </div>
              </div>
            </section>

            {/* Selected Work Carousel Mock */}
            <section className="py-32 overflow-hidden bg-[#1a1a1a] text-white">
               <div className="px-6 md:px-12 mb-16 flex justify-between items-end">
                  <h2 className="text-4xl md:text-6xl font-serif italic">Curated Pieces</h2>
                  <button onClick={() => setView("collection")} className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-2 hover:border-[#d4b483] hover:text-[#d4b483] transition-colors">See All</button>
               </div>
               
               <div className="flex gap-8 px-6 md:px-12 overflow-x-auto pb-12 snap-x hide-scrollbar">
                  {products.slice(0, 3).map(p => (
                     <div key={p.id} onClick={() => { setActiveProduct(p.id - 1); setView("product"); }} className="min-w-[300px] md:min-w-[400px] snap-center group cursor-pointer">
                        <div className="w-full aspect-[4/5] bg-white/5 relative overflow-hidden mb-6">
                           <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <h3 className="text-lg font-serif italic mb-2 group-hover:text-[#d4b483] transition-colors">{p.name}</h3>
                        <p className="font-mono text-xs opacity-50">${p.price.toLocaleString()}</p>
                     </div>
                  ))}
               </div>
            </section>
          </motion.div>
        )}

        {/* COLLECTION VIEW */}
        {view === "collection" && (
          <motion.div key="collection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-6 md:px-12 min-h-screen">
             <div className="text-center mb-24">
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-4 block font-bold">The Archive</span>
                <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter">Current Collection</h1>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.map((p, i) => (
                   <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group">
                      <div className="w-full aspect-[3/4] bg-white relative overflow-hidden mb-6 cursor-pointer" onClick={() => { setActiveProduct(p.id - 1); setView("product"); }}>
                         <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="px-6 py-3 bg-white text-black text-[9px] uppercase tracking-[0.2em] font-bold">View Item</span>
                         </div>
                      </div>
                      <div className="flex justify-between items-start">
                         <div>
                            <h3 className="text-lg font-serif mb-1 group-hover:text-[#d4b483] transition-colors cursor-pointer" onClick={() => { setActiveProduct(p.id - 1); setView("product"); }}>
                               {p.name}
                            </h3>
                            <p className="text-[10px] uppercase tracking-[0.1em] opacity-50 font-bold">${p.price.toLocaleString()}</p>
                         </div>
                         <button onClick={() => setCartCount(c => c + 1)} className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors rounded-full">
                            <ShoppingBag className="w-4 h-4" />
                         </button>
                      </div>
                   </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* SINGLE PRODUCT VIEW */}
        {view === "product" && (
          <motion.div key="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-32 px-6 md:px-12 min-h-screen bg-white">
             <button onClick={() => setView("collection")} className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-4 hover:text-[#d4b483] transition-colors mb-12">
               <ArrowLeft className="w-4 h-4" /> Return to Archive
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                <div className="relative aspect-[3/4] w-full bg-[#f5f5f5]">
                   <Image src={products[activeProduct].image} alt={products[activeProduct].name} fill className="object-cover" priority />
                </div>
                
                <div className="flex flex-col justify-center">
                   <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6 block font-bold text-[#d4b483]">Authentic</span>
                   <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">{products[activeProduct].name}</h1>
                   <div className="text-xl font-mono opacity-80 mb-12">${products[activeProduct].price.toLocaleString()}</div>
                   
                   <p className="text-sm leading-relaxed opacity-70 mb-12 max-w-md">
                     {products[activeProduct].desc} Every detail is meticulously inspected to ensure absolute perfection. Comes with an authenticated certificate of origin and a lifetime guarantee of excellence.
                   </p>
                   
                   <button onClick={() => setCartCount(c => c + 1)} className="w-full md:w-auto px-12 py-5 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#d4b483] transition-colors duration-500 mb-12">
                      Add to Shopping Bag
                   </button>
                   
                   <div className="border-t border-black/10 pt-8 space-y-6">
                      {['Details', 'Shipping & Returns', 'Care Instructions'].map(item => (
                         <div key={item} className="flex justify-between items-center cursor-pointer border-b border-black/5 pb-4 group">
                            <span className="text-xs uppercase tracking-[0.2em] font-bold group-hover:text-[#d4b483] transition-colors">{item}</span>
                            <span className="text-lg opacity-50">+</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-[#1a1a1a] text-white py-32 px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-24 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-5xl font-serif italic mb-8">Mavelle</h2>
            <p className="opacity-40 max-w-sm text-sm leading-relaxed">Elevating the everyday through exceptional design and uncompromising quality.</p>
          </div>
          <div>
            <h4 className="uppercase text-[9px] tracking-[0.3em] font-bold mb-8 text-[#d4b483]">Navigation</h4>
            <ul className="space-y-4 opacity-60 text-xs tracking-wider uppercase">
              <li><button onClick={() => setView("collection")} className="hover:text-white transition-colors">Collections</button></li>
              <li><button className="hover:text-white transition-colors">Our Story</button></li>
              <li><button className="hover:text-white transition-colors">Bespoke</button></li>
              <li><button className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-[9px] tracking-[0.3em] font-bold mb-8 text-[#d4b483]">Connect</h4>
            <ul className="space-y-4 opacity-60 text-xs tracking-wider uppercase">
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold mb-10">
          <span className="mb-4 md:mb-0">&copy; 2026 MAVELLE KORR</span>
          <span>Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
}
