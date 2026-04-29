"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
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
      <div className="text-5xl font-bold" style={{ color: "#b91c1c" }}>
        {count}
        {label.includes("K") ? "K" : label.includes("★") ? "★" : ""}
      </div>
      <p className="text-sm uppercase tracking-wide mt-2" style={{ color: "#f5f0e8" }}>
        {label.replace(/K|★/g, "")}
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
      style={{ color: "#0a0a0a", backgroundColor: "#b91c1c" } as any}
    >
      {children}
    </motion.button>
  );
};

const AccordionItem = ({ title, content, isOpen, onClick }: { title: string; content: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div style={{ borderBottom: "1px solid #b91c1c40" }}>
      <button
        onClick={onClick}
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-white/5 transition-colors"
      >
        <span className="font-bold" style={{ color: "#f5f0e8" }}>
          {title}
        </span>
        <ChevronDown
          style={{
            color: "#b91c1c",
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
            <p className="px-6 pb-4" style={{ color: "#f5f0e880" }}>
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function InkSoul() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState(0);

  const filters = ["All", "Traditional", "Japanese", "Blackwork", "Realism", "Geometric"];
  const artworks = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Tattoo ${i + 1}`,
    style: filters[Math.floor(Math.random() * (filters.length - 1)) + 1],
    img: `https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop`,
  }));

  const artists = [
    { id: 1, name: "Marcus Steel", specialty: "Blackwork & Realism", instagram: "@marcus_steel" },
    { id: 2, name: "Yuki Tanaka", specialty: "Japanese Traditional", instagram: "@yuki_ink" },
    { id: 3, name: "Sofia Rossi", specialty: "Geometric & Fine Line", instagram: "@sofia_geometric" },
    { id: 4, name: "Alex Chen", specialty: "Color & Realism", instagram: "@alex_chen_ink" },
  ];

  const faqs = [
    { title: "What's your healing process?", content: "Keep tattoo clean and dry. Apply antibacterial ointment 3x daily for 2 weeks." },
    { title: "How long is the consultation?", content: "Initial consultations are 30 minutes and completely free." },
    { title: "Can I get a custom design?", content: "Yes! We specialize in custom designs. Talk with your artist about your vision." },
    { title: "Do you use sterile needles?", content: "100% sterile, single-use needles. We exceed all health & safety standards." },
  ];

  return (
    <div ref={containerRef} style={{ backgroundColor: "#0a0a0a", color: "#f5f0e8", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#0a0a0add", backdropFilter: "blur(10px)", borderBottom: "1px solid #b91c1c20" }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: "#b91c1c" }} className="text-2xl font-bold">
          INK & SOUL
        </h1>
        <nav className="hidden md:flex gap-8">
          {["Portfolio", "Artists", "Booking", "FAQ"].map((item) => (
            <Link key={item} href="#" style={{ color: "#f5f0e8" }} className="hover:text-[#b91c1c] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={24} style={{ color: "#b91c1c" }} /> : <Menu size={24} style={{ color: "#b91c1c" }} />}
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
            className="md:hidden py-4 px-6 border-b border-[#b91c1c20]"
          >
            {["Portfolio", "Artists", "Booking", "FAQ"].map((item) => (
              <p key={item} style={{ color: "#f5f0e8" }} className="py-2">
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
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
            alt="Tattoo Studio"
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10 }}>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#b91c1c" }}>
              PERMANENT ART
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>15 years. 8 artists. 40K tattoos. Counting.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn>Book Consultation</MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Portfolio */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#b91c1c" }}>
            Portfolio Gallery
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
                border: `2px solid ${activeFilter === filter ? "#b91c1c" : "#b91c1c40"}`,
                borderRadius: "30px",
                backgroundColor: activeFilter === filter ? "#b91c1c" : "transparent",
                color: activeFilter === filter ? "#0a0a0a" : "#b91c1c",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {artworks.map((artwork, idx) => (
            <Reveal key={artwork.id} delay={idx * 0.05}>
              <motion.div
                whileHover={{ y: -5 }}
                onClick={() => setSelectedArtwork(artwork.id)}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "0.5rem", overflow: "hidden", marginBottom: "0.5rem", border: "2px solid #b91c1c" }}>
                  <Image src={artwork.img} alt={artwork.name} fill unoptimized style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0)", opacity: 0 } as any} className="hover:opacity-60 transition-opacity" />
                </div>
                <h4 style={{ fontWeight: "bold", color: "#b91c1c" }}>{artwork.style}</h4>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Artists Roster */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#b91c1c" }}>
              Meet Our Artists
            </h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {artists.map((artist, idx) => (
              <Reveal key={artist.id} delay={idx * 0.1}>
                <motion.div whileHover={{ y: -10 }} style={{ textAlign: "center" }}>
                  <div style={{ aspectRatio: "1", borderRadius: "1rem", overflow: "hidden", marginBottom: "1.5rem", border: "2px solid #b91c1c" }}>
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop" alt={artist.name} fill unoptimized style={{ objectFit: "cover" }} />
                  </div>
                  <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{artist.name}</h4>
                  <p style={{ color: "#b91c1c", marginBottom: "1rem" }}>{artist.specialty}</p>
                  <a href={`https://instagram.com/${artist.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#b91c1c", textDecoration: "none" }}>
                    {artist.instagram}
                    <ExternalLink size={16} />
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          <Counter target={15} label="Years Experience" />
          <Counter target={8} label="Master Artists" />
          <Counter target={40} label="K Tattoos" />
          <Counter target={4.9} label="Average Rating★" />
        </div>
      </section>

      {/* Guide Accordion */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#b91c1c" }}>
            Tattoo Care Guide
          </h3>
        </Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <AccordionItem title={faq.title} content={faq.content} isOpen={openAccordion === idx} onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)} />
          </Reveal>
        ))}
      </section>

      {/* Booking Flow Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtwork(null)}
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
                backgroundColor: "#0a0a0a",
                padding: "2rem",
                borderRadius: "1rem",
                maxWidth: "500px",
                width: "90%",
                border: "2px solid #b91c1c",
              }}
            >
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#b91c1c" }}>
                Book Your Tattoo
              </h4>
              {bookingStep === 0 && (
                <div>
                  <p style={{ marginBottom: "1.5rem" }}>Select your preferred style:</p>
                  {["Traditional", "Japanese", "Blackwork", "Realism", "Geometric"].map((style) => (
                    <button
                      key={style}
                      onClick={() => setBookingStep(1)}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "0.75rem",
                        marginBottom: "0.5rem",
                        backgroundColor: "#b91c1c",
                        color: "#0a0a0a",
                        borderRadius: "0.5rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              )}
              {bookingStep === 1 && (
                <div>
                  <p style={{ marginBottom: "1.5rem" }}>Choose your artist:</p>
                  {artists.map((artist) => (
                    <button
                      key={artist.id}
                      onClick={() => setBookingStep(2)}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "0.75rem",
                        marginBottom: "0.5rem",
                        backgroundColor: "#b91c1c",
                        color: "#0a0a0a",
                        borderRadius: "0.5rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      {artist.name}
                    </button>
                  ))}
                </div>
              )}
              {bookingStep === 2 && (
                <div>
                  <p style={{ marginBottom: "1.5rem" }}>Select a date:</p>
                  <input type="date" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", color: "#0a0a0a" }} />
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "#b91c1c",
                      color: "#0a0a0a",
                      borderRadius: "0.5rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
              <button
                onClick={() => (bookingStep > 0 ? setBookingStep(bookingStep - 1) : setSelectedArtwork(null))}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "1rem",
                  backgroundColor: "transparent",
                  border: "2px solid #b91c1c",
                  color: "#b91c1c",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {bookingStep > 0 ? "Back" : "Close"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flash Sale */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#b91c1c" }}>
              Flash Design Sale
            </h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {Array.from({ length: 8 }, (_, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div whileHover={{ y: -5 }} style={{ position: "relative", borderRadius: "0.5rem", overflow: "hidden", aspectRatio: "1", border: "2px solid #b91c1c" }}>
                  <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop" alt="Flash Design" fill unoptimized style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a, transparent)", display: "flex", justifyContent: "center", alignItems: "flex-end", padding: "1rem" }}>
                    <span style={{ color: "#b91c1c", fontWeight: "bold" }}>$50 Only Today</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center", backgroundColor: "#b91c1c" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#0a0a0a" }}>
            Ready for Ink?
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginBottom: "2rem", color: "#0a0a0a" }}>Book a free consultation with one of our artists</p>
        </Reveal>
        <Reveal delay={0.2}>
          <button
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#0a0a0a",
              color: "#b91c1c",
              borderRadius: "0.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              fontSize: "1rem",
            }}
          >
            Schedule Now
          </button>
        </Reveal>
      </section>
    </div>
  );
}
