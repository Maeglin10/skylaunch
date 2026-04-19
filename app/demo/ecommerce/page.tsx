"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ShoppingCart, Star, ChevronRight, Package, Truck, RotateCcw, Shield } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const } }),
};

const products = [
  { id: 1, name: "Vase Céramique Brut", price: 89, originalPrice: 120, tag: "Nouveau", rating: 4.8, reviews: 24, color: "from-stone-700 to-stone-500" },
  { id: 2, name: "Carafe en Verre Soufflé", price: 145, originalPrice: null, tag: "Bestseller", rating: 5.0, reviews: 87, color: "from-blue-900 to-slate-700" },
  { id: 3, name: "Plateau Laiton Martelé", price: 210, originalPrice: 265, tag: "Exclusif", rating: 4.9, reviews: 41, color: "from-amber-800 to-amber-600" },
  { id: 4, name: "Bougie Soja Signature", price: 48, originalPrice: null, tag: "Nouveau", rating: 4.7, reviews: 132, color: "from-rose-900 to-rose-700" },
  { id: 5, name: "Coupe Marbre Blanc", price: 175, originalPrice: 220, tag: "Bestseller", rating: 4.9, reviews: 63, color: "from-zinc-400 to-zinc-200" },
  { id: 6, name: "Lampe Raku Artisanale", price: 320, originalPrice: null, tag: "Exclusif", rating: 5.0, reviews: 18, color: "from-neutral-700 to-neutral-500" },
];

const tagStyles: Record<string, string> = {
  "Nouveau": "bg-emerald-900/60 text-emerald-300 ring-1 ring-emerald-500/30",
  "Bestseller": "bg-amber-900/60 text-amber-300 ring-1 ring-amber-500/30",
  "Exclusif": "bg-violet-900/60 text-violet-300 ring-1 ring-violet-500/30",
};

const perks = [
  { icon: <Truck className="w-5 h-5" />, title: "Livraison offerte", description: "Dès 80€ d'achat" },
  { icon: <RotateCcw className="w-5 h-5" />, title: "Retours 30 jours", description: "Sans question" },
  { icon: <Shield className="w-5 h-5" />, title: "Paiement sécurisé", description: "SSL + 3D Secure" },
  { icon: <Package className="w-5 h-5" />, title: "Emballage cadeau", description: "Offert sur demande" },
];

export default function EcommerceDemo() {
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-600/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/6 bg-[#0d0d0f]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold tracking-[0.12em] uppercase text-white">ARKE</span>
            <span className="text-amber-400 text-lg font-bold tracking-[0.12em]"> Studio</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Collections", "Nouveautés", "Bestsellers", "À propos"].map((item) => (
              <a key={item} href="#" className="text-sm text-zinc-400 hover:text-white transition-colors tracking-wide">
                {item}
              </a>
            ))}
          </nav>

          <button
            className="relative p-2.5 rounded-full border border-zinc-800 hover:border-zinc-600 transition-colors group"
            onClick={() => setCartCount((c) => Math.max(0, c - 1))}
          >
            <ShoppingCart className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-8 pb-16 px-6 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/6 overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1a1408 0%, #0d0d0f 50%, #130f08 100%)" }}
          >
            {/* Decorative gradient shape */}
            <div className="absolute right-0 top-0 w-[500px] h-full pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-amber-600/15 via-orange-600/8 to-transparent" />
              <div className="absolute right-16 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-600/20 blur-[1px] border border-amber-500/20" />
              <div className="absolute right-32 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-gradient-to-br from-amber-400/20 to-transparent" />
              {/* Decorative dot grid */}
              <div className="absolute right-8 top-8 grid grid-cols-8 gap-3">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-amber-500/15" />
                ))}
              </div>
            </div>

            <div className="relative p-12 md:p-16 max-w-lg">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-4 block">
                  Collection Printemps 2025
                </span>
                <h1 className="text-5xl font-bold leading-tight mb-4 tracking-tight">
                  Objets<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    d&apos;exception
                  </span>
                </h1>
                <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-sm">
                  Chaque pièce est créée à la main par des artisans sélectionnés. Des objets qui racontent une histoire, qui durent une vie.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/25"
                  >
                    Découvrir la collection
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700">
                    Notre histoire
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks bar */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/2"
              >
                <div className="text-amber-400 mt-0.5 shrink-0">{perk.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-white">{perk.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{perk.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section id="products" className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Catalogue</p>
              <h2 className="text-3xl font-bold tracking-tight">Nos créations</h2>
            </div>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl border border-white/6 overflow-hidden bg-zinc-900/30 hover:border-white/12 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product visual */}
                <div className={`relative h-52 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Package className="w-10 h-10 text-white/60" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagStyles[product.tag]}`}>
                      {product.tag}
                    </span>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm leading-tight">{product.name}</h3>
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3 h-3 ${j < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="text-sm text-zinc-600 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                        addedId === product.id
                          ? "bg-emerald-600 text-white scale-95"
                          : "bg-amber-500 hover:bg-amber-400 text-black"
                      }`}
                    >
                      {addedId === product.id ? "Ajouté ✓" : "Ajouter"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-amber-500/20 overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1c1205 0%, #0d0d0f 60%, #1a1008 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/8 to-transparent" />
            </div>
            <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold uppercase tracking-widest text-amber-400">Offre exclusive</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Livraison gratuite dès 80€</h3>
                <p className="text-zinc-400 text-sm">Profitez de la livraison offerte en France métropolitaine sur toutes vos commandes.</p>
              </div>
              <a
                href="#products"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg shadow-amber-500/20"
              >
                En profiter
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-sm font-bold tracking-[0.12em] uppercase text-white">ARKE</span>
            <span className="text-amber-400 text-sm font-bold tracking-[0.12em]"> Studio</span>
            <p className="text-xs text-zinc-700 mt-1">Objets d&apos;artisanat de luxe</p>
          </div>
          <div className="flex gap-6">
            {["Livraison", "Retours", "CGV", "Mentions légales"].map((link) => (
              <a key={link} href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-zinc-700">© 2025 ARKE Studio</p>
        </div>
      </footer>
    </div>
  );
}
