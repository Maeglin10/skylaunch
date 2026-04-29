"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, Heart, Tree, Leaf, Award, ArrowRight, ChevronDown, Search, Package } from "lucide-react";

// REVEAL COMPONENT
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

// COUNTER COMPONENT
const Counter = ({ target, duration = 2, prefix = "", suffix = "" }: { target: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const increment = target / (duration * 100);
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 10);
    return () => clearInterval(interval);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// MAGNETIC BUTTON COMPONENT
const MagneticBtn = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { damping: 3, stiffness: 100 });
  const ySpring = useSpring(y, { damping: 3, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - (rect.left + rect.width / 2));
      y.set(e.clientY - (rect.top + rect.height / 2));
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      className="px-8 py-3 bg-[#2d5a3d] text-[#f5f0e6] font-black uppercase text-sm tracking-wider rounded hover:bg-[#1a3a20] transition-colors"
    >
      {children}
    </motion.button>
  );
};

export default function ThreadlineSustainable() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sizingModalOpen, setSizingModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const products = [
    { id: 1, name: "Organic Cotton Tee", collection: "Basics", price: "$45", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "Hemp Overshirt", collection: "Outerwear", price: "$89", img: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "Linen Trousers", collection: "Basics", price: "$79", img: "https://images.unsplash.com/photo-1542272604-787c62d465d1?q=80&w=600&auto=format&fit=crop" },
    { id: 4, name: "Wool Beanie", collection: "Accessories", price: "$34", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop" },
    { id: 5, name: "Canvas Tote", collection: "Accessories", price: "$56", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop" },
    { id: 6, name: "Recycled Puffer", collection: "Outerwear", price: "$129", img: "https://images.unsplash.com/photo-1539533057592-4ee29e8b254e?q=80&w=600&auto=format&fit=crop" },
    { id: 7, name: "Bamboo Basics Set", collection: "Basics", price: "$65", img: "https://images.unsplash.com/photo-1506629082847-11d3e44e6b85?q=80&w=600&auto=format&fit=crop" },
    { id: 8, name: "Cork Belt", collection: "Accessories", price: "$42", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" },
  ];

  const lookbook = [
    "https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c62d465d1?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529148482759-b649efde8876?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539533057592-4ee29e8b254e?q=80&w=600&auto=format&fit=crop",
  ];

  const collections = ["All", "Basics", "Outerwear", "Accessories"];
  const filteredProducts = selectedCollection === "All" ? products : products.filter(p => p.collection === selectedCollection);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div style={{ backgroundColor: "#f5f0e6", color: "#1a1a1a", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(245,240,230,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2d5a3d40" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#2d5a3d", letterSpacing: "-0.02em" }}>THREADLINE</h1>
          <div style={{ display: "none", gap: "2rem" }} className="md:flex">
            {["Collections", "About", "Sustainability", "Contact"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.875rem", fontWeight: "600", textDecoration: "none", color: "#1a1a1a", opacity: 0.7 }}>
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: "pointer", background: "none", border: "none", color: "#2d5a3d" }}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", top: "60px", left: 0, right: 0, backgroundColor: "#f5f0e6", zIndex: 40, padding: "2rem", borderBottom: "1px solid #2d5a3d40" }}>
            {["Collections", "About", "Sustainability", "Contact"].map((item, i) => (
              <motion.a key={item} href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ display: "block", padding: "0.75rem 0", fontSize: "1rem", fontWeight: "600", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #e8dfc5" }}>
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <Image src="https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=1600&auto=format&fit=crop" alt="Sustainable Fashion" fill style={{ objectFit: "cover" }} unoptimized priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(245,240,230,0.85) 0%, rgba(245,240,230,0.6) 100%)" }} />
        </motion.div>
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.875rem", fontWeight: "900", letterSpacing: "0.1em", color: "#2d5a3d", textTransform: "uppercase", marginBottom: "1rem" }}>
              Sustainable Fashion
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ fontSize: "clamp(3rem, 12vw, 8rem)", fontWeight: "900", lineHeight: 1, marginBottom: "2rem", maxWidth: "900px", color: "#1a1a1a" }}>
              Wear Your <span style={{ color: "#2d5a3d" }}>Values</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.25rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "600px", color: "#1a1a1a" }}>
              100% organic. Zero synthetic dyes. Certified B Corp. Every piece tells a story of sustainability.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={32} style={{ color: "#2d5a3d" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* IMPACT STATS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#2d5a3d", color: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          {[
            { label: "Organic Cotton", value: 100, suffix: "%" },
            { label: "Synthetic Dyes", value: 0, suffix: "%" },
            { label: "Trees Planted", value: 50, suffix: "K" },
            { label: "B Corp Certified", value: 1, suffix: "✓" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "0.5rem", color: "#f5f0e6" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p style={{ fontSize: "0.875rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCT COLLECTION */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Collections</h2>
          </Reveal>

          {/* COLLECTION FILTER */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
            {collections.map((coll) => (
              <button
                key={coll}
                onClick={() => setSelectedCollection(coll)}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: selectedCollection === coll ? "#2d5a3d" : "transparent",
                  color: selectedCollection === coll ? "white" : "#1a1a1a",
                  border: `2px solid ${selectedCollection === coll ? "#2d5a3d" : "#d4cfc5"}`,
                  borderRadius: "9999px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {coll}
              </button>
            ))}
          </div>

          {/* PRODUCTS GRID */}
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    position: "relative",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    backgroundColor: "white",
                    border: "1px solid #e8dfc5",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                    <Image src={product.img} alt={product.name} fill style={{ objectFit: "cover" }} unoptimized />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                      }}
                    >
                      <Heart size={20} fill={wishlist.includes(product.id) ? "#2d5a3d" : "none"} color={wishlist.includes(product.id) ? "#2d5a3d" : "#1a1a1a"} />
                    </button>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "900", marginBottom: "0.25rem" }}>{product.name}</h3>
                    <p style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.75rem" }}>{product.collection}</p>
                    <p style={{ fontSize: "1.25rem", fontWeight: "700", color: "#2d5a3d" }}>{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MATERIALS SECTION */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#f0e8d5" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Materials Transparency</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              { name: "Organic Cotton", cert: "GOTS Certified", desc: "Grown without synthetic pesticides or fertilizers" },
              { name: "Hemp Fiber", cert: "Fair Trade", desc: "Sustainably harvested with water-efficient processing" },
              { name: "Recycled Polyester", cert: "GRS Certified", desc: "Made from recovered plastic bottles and textiles" },
              { name: "Natural Dyes", cert: "Oeko-Tex", desc: "Plant-based colors with zero chemical waste" },
            ].map((material, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    border: "1px solid #e8dfc5",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "center" }}>
                    <Leaf size={24} style={{ color: "#2d5a3d" }} />
                    <Award size={24} style={{ color: "#2d5a3d" }} />
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "900", marginBottom: "0.25rem" }}>{material.name}</h3>
                  <p style={{ fontSize: "0.875rem", fontWeight: "700", color: "#2d5a3d", marginBottom: "0.75rem" }}>
                    {material.cert}
                  </p>
                  <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>{material.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK LIGHTBOX */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Lookbook</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {lookbook.map((img, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setLightboxIndex(i);
                    setLightboxOpen(true);
                  }}
                  style={{
                    position: "relative",
                    aspectRatio: "1",
                    cursor: "pointer",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                  }}
                >
                  <Image src={img} alt={`Lookbook ${i + 1}`} fill style={{ objectFit: "cover" }} unoptimized />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "90vw",
                height: "90vh",
                maxWidth: "800px",
              }}
            >
              <Image src={lookbook[lightboxIndex]} alt="Lookbook" fill style={{ objectFit: "contain" }} unoptimized />
              <button
                onClick={() => setLightboxOpen(false)}
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: 0,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "2rem",
                }}
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIZING MODAL */}
      <AnimatePresence>
        {sizingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSizingModalOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#f5f0e6",
                borderRadius: "1rem",
                padding: "2rem",
                maxWidth: "500px",
                width: "90vw",
                position: "relative",
              }}
            >
              <button onClick={() => setSizingModalOpen(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} />
              </button>
              <h3 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1rem" }}>Size Guide</h3>
              <table style={{ width: "100%", marginBottom: "2rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #2d5a3d" }}>
                    <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "700" }}>Size</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "700" }}>Chest (cm)</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "700" }}>Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: "XS", chest: "84-89", length: "66" },
                    { size: "S", chest: "89-94", length: "68" },
                    { size: "M", chest: "94-99", length: "70" },
                    { size: "L", chest: "99-104", length: "72" },
                  ].map((row) => (
                    <tr key={row.size} style={{ borderBottom: "1px solid #e8dfc5" }}>
                      <td style={{ padding: "0.75rem" }}>{row.size}</td>
                      <td style={{ padding: "0.75rem" }}>{row.chest}</td>
                      <td style={{ padding: "0.75rem" }}>{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={{ width: "100%", padding: "0.75rem", backgroundColor: "#2d5a3d", color: "white", fontWeight: "700", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}>
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#f0e8d5" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Customer Stories</h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "1rem",
              borderLeft: "4px solid #2d5a3d",
            }}
          >
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              "I love knowing exactly where my clothes come from and that they're made ethically. Threadline makes sustainable fashion accessible."
            </p>
            <p style={{ fontWeight: "700", color: "#2d5a3d" }}>— Emma Rodriguez, Threadline Customer</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Questions</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { q: "How sustainable is Threadline?", a: "100% organic cotton, zero synthetic dyes, B Corp certified, and carbon neutral shipping." },
              { q: "What's your return policy?", a: "30-day returns for unworn items. Free shipping on returns." },
              { q: "How do I find my size?", a: "Use our size guide or contact us for personalized recommendations." },
              { q: "Do you offer gift cards?", a: "Yes! Digital and physical gift cards available at checkout." },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.button
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "white",
                    border: "1px solid #e8dfc5",
                    borderRadius: "0.75rem",
                    color: "#1a1a1a",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: "700",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{faq.q}</span>
                    <ChevronDown size={20} />
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#2d5a3d", color: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "2rem" }}>Join Our Community</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: "2rem" }}>
              Get sustainability tips, new collection releases, and exclusive 15% off your first order.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  border: "1px solid white",
                  borderRadius: "0.5rem",
                  color: "white",
                }}
              />
              <button style={{ padding: "0.75rem 2rem", backgroundColor: "#f5f0e6", color: "#2d5a3d", fontWeight: "900", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}>
                Subscribe
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <button
              onClick={() => setSizingModalOpen(true)}
              style={{
                padding: "1rem 2.5rem",
                backgroundColor: "#f5f0e6",
                color: "#2d5a3d",
                fontWeight: "900",
                fontSize: "1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              Shop Now <ArrowRight size={20} />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
