"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import Link from "next/link";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const Counter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCount((prev) => (prev < target ? prev + Math.ceil(target / 50) : target));
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold" style={{ color: "#ff4d00" }}>
        {count}
      </div>
      <p className="text-sm uppercase tracking-wide mt-2" style={{ color: "#fff" }}>
        {label}
      </p>
    </div>
  );
};

const MagneticBtn = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="px-8 py-3 rounded-full font-bold uppercase text-sm"
      style={{ color: "#080808", backgroundColor: "#ff4d00" } as any}
    >
      {children}
    </motion.button>
  );
};

const Marquee = ({ items }: { items: string[] }) => {
  return (
    <div style={{ overflow: "hidden", display: "flex", width: "100%" }}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-lg font-bold" style={{ color: "#ff4d00" }}>
            {item} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const AccordionItem = ({ title, content, isOpen, onClick }: { title: string; content: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div style={{ borderBottom: "1px solid #ff4d0040" }}>
      <button
        onClick={onClick}
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-white/5 transition-colors"
      >
        <span className="font-bold text-white">{title}</span>
        <ChevronDown
          style={{
            color: "#ff4d00",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-4 text-white/70">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PeakPerformance() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const filters = ["All", "Pre-Workout", "Protein", "Recovery", "Hydration"];
  const products = [
    { id: 1, name: "Thunder Pre-Workout", category: "Pre-Workout", flavors: ["Citrus Blast", "Berry Surge"], price: "$35", img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 2, name: "Elite Whey Isolate", category: "Protein", flavors: ["Vanilla", "Chocolate"], price: "$42", img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 3, name: "Recovery Blend", category: "Recovery", flavors: ["Watermelon"], price: "$38", img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 4, name: "Hydration Max", category: "Hydration", flavors: ["Lemon", "Orange"], price: "$22", img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 5, name: "Muscle Fuel", category: "Protein", flavors: ["Mint Chocolate"], price: "$45", img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 6, name: "Pump Stack", category: "Pre-Workout", flavors: ["Cherry"], price: "$40", img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
  ];

  const faqs = [
    { title: "Are all products NSF Certified?", content: "Yes! All our products are NSF Certified for Sport. Zero banned substances." },
    { title: "What makes your formula unique?", content: "We use only researched-backed ingredients at clinically effective doses." },
    { title: "Can I stack multiple products?", content: "Absolutely! Many athletes use Pre-Workout + Hydration + Recovery together." },
    { title: "What's your refund policy?", content: "100% satisfaction guarantee. Money back if you don't see results in 30 days." },
  ];

  const nutrients = [
    { name: "BCAA", percent: 85 },
    { name: "Creatine", percent: 95 },
    { name: "Citrulline", percent: 75 },
    { name: "Beta-Alanine", percent: 90 },
  ];

  return (
    <div ref={containerRef} style={{ backgroundColor: "#080808", color: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#080808dd", backdropFilter: "blur(10px)", borderBottom: "1px solid #ff4d0020" }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: "#ff4d00" }} className="text-2xl font-bold">
          PEAK PERFORMANCE
        </h1>
        <nav className="hidden md:flex gap-8">
          {["Shop", "Athletes", "Science", "FAQ"].map((item) => (
            <Link key={item} href="#" style={{ color: "#fff" }} className="hover:text-[#ff4d00] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={24} style={{ color: "#ff4d00" }} /> : <Menu size={24} style={{ color: "#ff4d00" }} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ backgroundColor: "#1a1a1a", zIndex: 40, marginTop: "60px" }}
            className="md:hidden py-4 px-6 border-b border-[#ff4d0020]"
          >
            {["Shop", "Athletes", "Science", "FAQ"].map((item) => (
              <p key={item} style={{ color: "#fff" }} className="py-2">
                {item}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parallax Hero */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ y: parallaxY }}>
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
            alt="Athlete"
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #080808, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10 }}>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#ff4d00" }}>
              POWERED BY SCIENCE
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.25rem", marginBottom: "2rem", color: "#fff" }}>
              Trusted by 25M athletes worldwide
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn>Shop Products</MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Product Filter */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#ff4d00" }}>
            Complete Product Line
          </h3>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem", justifyContent: "center" }}>
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "0.5rem 1.5rem",
                border: `2px solid ${activeFilter === filter ? "#ff4d00" : "#ff4d0040"}`,
                borderRadius: "30px",
                backgroundColor: activeFilter === filter ? "#ff4d00" : "transparent",
                color: activeFilter === filter ? "#080808" : "#ff4d00",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s",
              }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {products.map((product, idx) => (
            <Reveal key={product.id} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -10 }} onClick={() => setSelectedProduct(product.id)} style={{ cursor: "pointer", position: "relative" }}>
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "1rem", overflow: "hidden", marginBottom: "1rem", border: "2px solid #ff4d00" }}>
                  <Image src={product.img} alt={product.name} fill unoptimized style={{ objectFit: "cover" }} />
                </div>
                <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#fff" }}>{product.name}</h4>
                <p style={{ color: "#ff4d00", marginBottom: "0.5rem" }}>{product.category}</p>
                <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff" }}>{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#ff4d00",
                    color: "#080808",
                    borderRadius: "0.5rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <ShoppingCart size={18} style={{ display: "inline", marginRight: "0.5rem" }} />
                  Add to Cart
                </motion.button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Performance Tracker */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#ff4d00" }}>
              Nutrient Breakdown
            </h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {nutrients.map((nutrient, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#fff", fontWeight: "bold" }}>{nutrient.name}</span>
                    <span style={{ color: "#ff4d00" }}>{nutrient.percent}%</span>
                  </div>
                  <div style={{ height: "8px", backgroundColor: "#333", borderRadius: "10px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${nutrient.percent}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      style={{ height: "100%", backgroundColor: "#ff4d00", borderRadius: "10px" }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          <Counter target={50} label="Million Servings" />
          <Counter target={25} label="Million Athletes" />
          <Counter target={1} label="NSF Certified" />
          <Counter target={0} label="Banned Substances" />
        </div>
      </section>

      {/* Marquee */}
      <section style={{ padding: "3rem 0", backgroundColor: "#1a1a1a", overflow: "hidden" }}>
        <Marquee items={["NSF Certified", "Research Backed", "100% Transparent", "Zero Fillers"]} />
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#ff4d00" }}>
            Common Questions
          </h3>
        </Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <AccordionItem title={faq.title} content={faq.content} isOpen={openAccordion === idx} onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)} />
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center", backgroundColor: "#ff4d00", color: "#080808" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Join 25M Athletes
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginBottom: "2rem" }}>Free shipping on orders over $75</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: "1rem", maxWidth: "400px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "none",
                color: "#080808",
              }}
            />
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#080808",
                color: "#ff4d00",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
        </Reveal>
      </section>

      {/* Quick Buy Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#00000080",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 60,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#080808",
                padding: "2rem",
                borderRadius: "1rem",
                maxWidth: "400px",
                width: "90%",
                border: "2px solid #ff4d00",
              }}
            >
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#ff4d00" }}>
                {products.find((p) => p.id === selectedProduct)?.name}
              </h4>
              <p style={{ marginBottom: "1rem", color: "#fff" }}>Select flavor:</p>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
                {products
                  .find((p) => p.id === selectedProduct)
                  ?.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#ff4d00",
                        color: "#080808",
                        borderRadius: "0.5rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        flex: 1,
                      }}
                    >
                      {flavor}
                    </button>
                  ))}
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "#ff4d00",
                    color: "#080808",
                    borderRadius: "0.5rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "transparent",
                    border: "2px solid #ff4d00",
                    color: "#ff4d00",
                    borderRadius: "0.5rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
