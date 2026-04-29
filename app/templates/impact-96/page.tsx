"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, ShoppingCart, Play } from "lucide-react";
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
      <div className="text-5xl font-bold" style={{ color: "#d4a96a" }}>
        {count}
        {label.includes("K") ? "K" : ""}
      </div>
      <p className="text-sm uppercase tracking-wide mt-2" style={{ color: "#e5e7eb" }}>
        {label.replace(/K/g, "")}
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

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: xSpring, y: ySpring }}
      className="px-8 py-3 rounded-full font-bold uppercase text-sm"
      style={{ color: "#0d1117", backgroundColor: "#d4a96a" } as any}
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
          <span key={i} className="text-lg font-bold" style={{ color: "#d4a96a" }}>
            {item} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const AccordionItem = ({ title, content, isOpen, onClick }: { title: string; content: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div style={{ borderBottom: "1px solid #d4a96a40" }}>
      <button
        onClick={onClick}
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-white/5 transition-colors"
      >
        <span className="font-bold text-white">{title}</span>
        <ChevronDown
          style={{
            color: "#d4a96a",
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

export default function NomadLens() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const filters = ["All", "Portraits", "Landscapes", "Street", "Wildlife", "Architecture"];
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Capture ${i + 1}`,
    category: filters[Math.floor(Math.random() * (filters.length - 1)) + 1],
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop",
  }));

  const workshops = [
    { id: 1, type: "Destination", title: "Iceland Landscapes", duration: "7 days", price: "$2,499", desc: "Glaciers, waterfalls, northern lights" },
    { id: 2, type: "Online", title: "Mastering Composition", duration: "4 weeks", price: "$299", desc: "Live weekly masterclasses" },
    { id: 3, type: "1:1", title: "Personal Mentoring", duration: "Flexible", price: "$150/hr", desc: "One-on-one feedback sessions" },
  ];

  const faqs = [
    { title: "What equipment do I need?", content: "Any camera works - smartphone to DSLR. We teach technique over gear." },
    { title: "Do you offer payment plans?", content: "Yes! Workshops available in 3 monthly installments with no interest." },
    { title: "What's your refund policy?", content: "100% refund if you cancel 14 days before workshop start date." },
    { title: "Can I bring a friend?", content: "Absolutely! Group discounts available for 3+ participants." },
  ];

  const gearGuide = [
    { category: "Cameras", items: "Sony A7IV, Canon R5, Fujifilm XT-4" },
    { category: "Lenses", items: "35mm f/1.4, 70-200mm f/2.8, 16-35mm f/2.8" },
    { category: "Accessories", items: "Tripod, filters, backup batteries, weather protection" },
  ];

  return (
    <div ref={containerRef} style={{ backgroundColor: "#0d1117", color: "#e5e7eb", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#0d1117dd", backdropFilter: "blur(10px)", borderBottom: "1px solid #d4a96a20" }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: "#d4a96a" }} className="text-2xl font-bold">
          NOMAD LENS
        </h1>
        <nav className="hidden md:flex gap-8">
          {["Gallery", "Workshops", "Gear", "Blog"].map((item) => (
            <Link key={item} href="#" style={{ color: "#e5e7eb" }} className="hover:text-[#d4a96a] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={24} style={{ color: "#d4a96a" }} /> : <Menu size={24} style={{ color: "#d4a96a" }} />}
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
            className="md:hidden py-4 px-6 border-b border-[#d4a96a20]"
          >
            {["Gallery", "Workshops", "Gear", "Blog"].map((item) => (
              <p key={item} style={{ color: "#e5e7eb" }} className="py-2">
                {item}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Bleed Parallax Hero */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ y: parallaxY }}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop"
            alt="Mountain Landscape"
            fill
            unoptimized
            priority
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,17,23,0.2), rgba(13,17,23,0.8))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10 }}>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#d4a96a" }}>
              CAPTURE MOMENTS
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
              Travel photography across 40 countries
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn>Browse Portfolio</MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#d4a96a" }}>
            Photo Series
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
                border: `2px solid ${activeFilter === filter ? "#d4a96a" : "#d4a96a40"}`,
                borderRadius: "30px",
                backgroundColor: activeFilter === filter ? "#d4a96a" : "transparent",
                color: activeFilter === filter ? "#0d1117" : "#d4a96a",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Masonry Layout */}
        <div style={{ columnCount: 3, columnGap: "1.5rem", marginBottom: "3rem" } as any}>
          {photos.map((photo, idx) => (
            <Reveal key={photo.id} delay={idx * 0.05}>
              <motion.div
                whileHover={{ y: -10 }}
                onClick={() => setSelectedPhoto(photo.id)}
                style={{
                  cursor: "pointer",
                  marginBottom: "1.5rem",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  border: "2px solid #d4a96a",
                  breakInside: "avoid" as any,
                }}
              >
                <Image
                  src={photo.img}
                  alt={photo.title}
                  width={300}
                  height={300}
                  unoptimized
                  style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
                <div style={{ padding: "1rem", backgroundColor: "#1a1a1a" }}>
                  <p style={{ color: "#d4a96a", fontSize: "0.875rem" }}>{photo.category}</p>
                  <h4 style={{ fontWeight: "bold" }}>{photo.title}</h4>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Behind the Scenes Video */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#d4a96a" }}>
              Behind the Scenes
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                position: "relative",
                aspectRatio: "16/9",
                borderRadius: "1rem",
                overflow: "hidden",
                border: "2px solid #d4a96a",
                cursor: "pointer",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1516035069371-29a08e8be853?q=80&w=1200&auto=format&fit=crop"
                alt="Video Thumbnail"
                fill
                unoptimized
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" }}>
                <Play size={80} style={{ color: "#d4a96a" }} fill="#d4a96a" />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Workshop Offerings */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#d4a96a" }}>
            Learn From Me
          </h3>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {workshops.map((workshop, idx) => (
            <Reveal key={workshop.id} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                onClick={() => setSelectedWorkshop(workshop.id)}
                style={{
                  padding: "2rem",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "1rem",
                  border: "2px solid #d4a96a",
                  cursor: "pointer",
                }}
              >
                <p style={{ color: "#d4a96a", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  {workshop.type.toUpperCase()}
                </p>
                <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  {workshop.title}
                </h4>
                <p style={{ marginBottom: "1rem" }}>{workshop.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#d4a96a", fontWeight: "bold" }}>
                    {workshop.duration}
                  </span>
                  <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    {workshop.price}
                  </span>
                </div>
                <button
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#d4a96a",
                    color: "#0d1117",
                    borderRadius: "0.5rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Book Workshop
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#0d1117" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          <Counter target={50} label="K Photos Published" />
          <Counter target={40} label="Countries Visited" />
          <Counter target={200} label="Workshops Taught" />
          <Counter target={15} label="Awards Won" />
        </div>
      </section>

      {/* Marquee */}
      <section style={{ padding: "3rem 0", overflow: "hidden" }}>
        <Marquee items={["Published in National Geographic", "Canon Ambassador", "Award Winning Photographer", "Travel Expert"]} />
      </section>

      {/* Gear Guide Accordion */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#d4a96a" }}>
            Gear Guide
          </h3>
        </Reveal>
        {gearGuide.map((gear, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <AccordionItem
              title={gear.category}
              content={gear.items}
              isOpen={openAccordion === idx}
              onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
            />
          </Reveal>
        ))}
      </section>

      {/* Print Shop */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#d4a96a" }}>
              Fine Art Prints
            </h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {["Iceland Dreams", "Tokyo Streets", "Safari Gold", "Desert Dawn"].map((title, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#0d1117",
                    borderRadius: "1rem",
                    border: "2px solid #d4a96a",
                  }}
                >
                  <div style={{ aspectRatio: "1", borderRadius: "0.5rem", overflow: "hidden", marginBottom: "1rem" }}>
                    <Image
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop"
                      alt={title}
                      width={300}
                      height={300}
                      unoptimized
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                  <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{title}</h4>
                  <p style={{ color: "#d4a96a", marginBottom: "1rem" }}>16x24" | Matte Paper</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    {["16x24", "20x30", "24x36"].map((size) => (
                      <button
                        key={size}
                        style={{
                          flex: 1,
                          padding: "0.5rem",
                          backgroundColor: "#d4a96a",
                          color: "#0d1117",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          border: "none",
                          fontWeight: "bold",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <button
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "#d4a96a",
                      color: "#0d1117",
                      borderRadius: "0.5rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    <ShoppingCart size={16} style={{ display: "inline", marginRight: "0.5rem" }} />
                    Add to Cart
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#d4a96a" }}>
            Questions
          </h3>
        </Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <AccordionItem
              title={faq.title}
              content={faq.content}
              isOpen={openAccordion === idx + 100}
              onClick={() => setOpenAccordion(openAccordion === idx + 100 ? null : idx + 100)}
            />
          </Reveal>
        ))}
      </section>

      {/* Newsletter CTA */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center", backgroundColor: "#d4a96a" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#0d1117" }}>
            Stay Connected
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginBottom: "2rem", color: "#0d1117" }}>
            Subscribe for behind-the-scenes content and travel tips
          </p>
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
                color: "#0d1117",
              }}
            />
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#0d1117",
                color: "#d4a96a",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                border: "none",
              }}
            >
              Subscribe
            </button>
          </div>
        </Reveal>
      </section>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#00000090",
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
                position: "relative",
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop"
                alt="Full Size Photo"
                width={1200}
                height={800}
                unoptimized
                style={{ objectFit: "contain" }}
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#d4a96a",
                  color: "#0d1117",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
