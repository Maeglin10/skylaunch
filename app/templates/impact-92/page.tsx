"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import Link from "next/link";

// Reveal Component (fade + slideUp with delay)
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

// Counter Component (count-up animation)
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
      <div className="text-5xl font-bold" style={{ color: "#6b7c3a" }}>
        {count}
      </div>
      <p className="text-sm uppercase tracking-wide mt-2" style={{ color: "#2c1e0e" }}>
        {label}
      </p>
    </div>
  );
};

// Magnetic Button (cursor tracking)
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
      className="px-8 py-3 rounded-full font-bold uppercase text-sm transition-all"
      style={{ color: "#f8f4e9", backgroundColor: "#6b7c3a" } as any}
    >
      {children}
    </motion.button>
  );
};

// Infinite Marquee
const Marquee = ({ items }: { items: string[] }) => {
  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        width: "100%",
      }}
    >
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-lg font-bold" style={{ color: "#6b7c3a" }}>
            {item} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Accordion Item
const AccordionItem = ({
  title,
  content,
  isOpen,
  onClick,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div style={{ borderBottom: "1px solid #6b7c3a40" }}>
      <button
        onClick={onClick}
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-white/5 transition-colors"
      >
        <span className="font-bold" style={{ color: "#2c1e0e" }}>
          {title}
        </span>
        <ChevronDown
          style={{
            color: "#6b7c3a",
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
            <p className="px-6 pb-4" style={{ color: "#2c1e0e88" }}>
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TerraNova() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const filters = ["All", "Extra Virgin", "Infused", "Gift Sets", "Vinegar"];
  const products = [
    { id: 1, name: "Estate Premium EVOO", category: "Extra Virgin", price: "$48", img: "https://images.unsplash.com/photo-1585518419759-7db19fbdb8f5?q=80&w=500&auto=format&fit=crop" },
    { id: 2, name: "Sicilian Gold Blend", category: "Extra Virgin", price: "$52", img: "https://images.unsplash.com/photo-1585518419759-7db19fbdb8f5?q=80&w=500&auto=format&fit=crop" },
    { id: 3, name: "Chili Infusion", category: "Infused", price: "$42", img: "https://images.unsplash.com/photo-1585518419759-7db19fbdb8f5?q=80&w=500&auto=format&fit=crop" },
    { id: 4, name: "Truffle Collection", category: "Infused", price: "$65", img: "https://images.unsplash.com/photo-1585518419759-7db19fbdb8f5?q=80&w=500&auto=format&fit=crop" },
    { id: 5, name: "Gourmet Gift Box", category: "Gift Sets", price: "$99", img: "https://images.unsplash.com/photo-1585518419759-7db19fbdb8f5?q=80&w=500&auto=format&fit=crop" },
    { id: 6, name: "Balsamic Reserve", category: "Vinegar", price: "$38", img: "https://images.unsplash.com/photo-1585518419759-7db19fbdb8f5?q=80&w=500&auto=format&fit=crop" },
  ];

  const faqs = [
    { title: "How should I store olive oil?", content: "Store in a cool, dark place away from heat and light. Ideal temperature is 15-20°C." },
    { title: "What's the shelf life?", content: "Our EVOO is best used within 18 months of harvest for optimal flavor and health benefits." },
    { title: "Are your olives organic?", content: "We use sustainable farming practices on our 6 estates across Tuscany, Andalusia, and Greece." },
    { title: "Do you offer international shipping?", content: "Yes! We ship to 38 countries. Standard shipping takes 5-7 business days." },
  ];

  return (
    <div ref={containerRef} style={{ backgroundColor: "#f8f4e9", color: "#2c1e0e", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#f8f4e9dd", backdropFilter: "blur(10px)", borderBottom: "1px solid #6b7c3a20" }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: "#6b7c3a" }} className="text-2xl font-bold">
          TERRA NOVA
        </h1>
        <nav className="hidden md:flex gap-8">
          {["Shop", "Origins", "Taste", "FAQ"].map((item) => (
            <Link key={item} href="#" style={{ color: "#2c1e0e" }} className="hover:opacity-60 transition-opacity">
              {item}
            </Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ backgroundColor: "#f8f4e9", zIndex: 40, marginTop: "60px" }}
            className="md:hidden py-4 px-6 border-b border-[#6b7c3a20]"
          >
            {["Shop", "Origins", "Taste", "FAQ"].map((item) => (
              <p key={item} style={{ color: "#2c1e0e" }} className="py-2">
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
            src="https://images.unsplash.com/photo-1585518419759-7db19fbdb8f5?q=80&w=1200&auto=format&fit=crop"
            alt="Olive Grove"
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #2c1e0e, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", color: "#f8f4e9", zIndex: 10 }}>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
              40 Years of Tradition
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
              Cold-pressed extra virgin olive oil from 6 family estates
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn>Shop Now</MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Product Filter */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#6b7c3a" }}>
            Our Collection
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
                border: `2px solid ${activeFilter === filter ? "#6b7c3a" : "#6b7c3a40"}`,
                borderRadius: "30px",
                backgroundColor: activeFilter === filter ? "#6b7c3a" : "transparent",
                color: activeFilter === filter ? "#f8f4e9" : "#6b7c3a",
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
              <motion.div
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProduct(product.id)}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "1rem", overflow: "hidden", marginBottom: "1rem" }}>
                  <Image src={product.img} alt={product.name} fill unoptimized style={{ objectFit: "cover" }} />
                </div>
                <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{product.name}</h4>
                <p style={{ color: "#6b7c3a", marginBottom: "0.5rem" }}>{product.category}</p>
                <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#6b7c3a",
                    color: "#f8f4e9",
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

      {/* Stats */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#6b7c3a", color: "#f8f4e9" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          <Counter target={40} label="Years Tradition" />
          <Counter target={6} label="Family Estates" />
          <Counter target={28} label="Awards Won" />
          <Counter target={38} label="Countries Shipped" />
        </div>
      </section>

      {/* Marquee */}
      <section style={{ padding: "3rem 0", backgroundColor: "#2c1e0e", overflow: "hidden" }}>
        <Marquee items={["Michelin Stars", "Sustainable Farming", "Cold Pressed", "Organic Certified"]} />
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#6b7c3a" }}>
            Frequently Asked
          </h3>
        </Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <AccordionItem
              title={faq.title}
              content={faq.content}
              isOpen={openAccordion === idx}
              onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
            />
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center", backgroundColor: "#6b7c3a", color: "#f8f4e9" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            First Time? Get 15% Off
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginBottom: "2rem" }}>Sign up for our newsletter and taste the difference</p>
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
                color: "#2c1e0e",
              }}
            />
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#2c1e0e",
                color: "#f8f4e9",
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
                backgroundColor: "#f8f4e9",
                padding: "2rem",
                borderRadius: "1rem",
                maxWidth: "400px",
                width: "90%",
              }}
            >
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#6b7c3a" }}>
                {products.find((p) => p.id === selectedProduct)?.name}
              </h4>
              <p style={{ marginBottom: "2rem" }}>Premium quality, hand-selected grapes from our estates.</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "#6b7c3a",
                    color: "#f8f4e9",
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
                    border: "2px solid #6b7c3a",
                    color: "#6b7c3a",
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
