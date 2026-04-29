"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, MapPin, Calendar, Users, Globe, ArrowRight, ChevronDown } from "lucide-react";

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
const Counter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
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

  return <span ref={ref}>{count.toLocaleString()}</span>;
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
      className="px-8 py-3 bg-[#c0392b] text-white font-black uppercase text-sm tracking-wider rounded hover:bg-[#a93221] transition-colors"
    >
      {children}
    </motion.button>
  );
};

// DATA
const artists = [
  { id: 1, name: "Elena Rossi", category: "Painting", img: "https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Marcus Chen", category: "Sculpture", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Sophia Wells", category: "Photography", img: "https://images.unsplash.com/photo-1552053831-71594a27c62d?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "David Park", category: "Digital", img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Amara Okafor", category: "Painting", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "James Mitchell", category: "Sculpture", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
  { id: 7, name: "Lucia Moretti", category: "Photography", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
  { id: 8, name: "Jin Zhang", category: "Digital", img: "https://images.unsplash.com/photo-1517070213202-1332aab541fe?q=80&w=600&auto=format&fit=crop" },
];

const faqs = [
  { q: "How do I purchase artwork?", a: "All pieces are available through our online gallery. Click 'Inquire' on any artwork to begin the acquisition process." },
  { q: "Is there a VIP preview?", a: "Yes! Join our VIP circle for early access to new collections and private viewings." },
  { q: "What about international shipping?", a: "We ship globally with white-glove insurance and climate-controlled transport for all pieces." },
  { q: "Can I commission work?", a: "Many of our artists accept commissions. Ask our team for artist-specific commission information." },
];

export default function MeridianArtFair() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showVipModal, setShowVipModal] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const categories = ["All", "Painting", "Sculpture", "Digital", "Photography"];
  const filteredArtists = selectedCategory === "All" ? artists : artists.filter(a => a.category === selectedCategory);

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1e293b", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", letterSpacing: "-0.02em" }}>MERIDIAN</h1>
          <div style={{ display: "none", gap: "2rem" }} className="md:flex">
            {["Gallery", "Schedule", "Artists", "Contact"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.875rem", fontWeight: "600", textDecoration: "none", color: "#1e293b", opacity: 0.7 }}>
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: "pointer", background: "none", border: "none" }}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", top: "60px", left: 0, right: 0, backgroundColor: "white", zIndex: 40, padding: "2rem", borderBottom: "1px solid #e2e8f0" }}>
            {["Gallery", "Schedule", "Artists", "Contact"].map((item, i) => (
              <motion.a key={item} href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ display: "block", padding: "0.75rem 0", fontSize: "1rem", fontWeight: "600", color: "#1e293b", textDecoration: "none", borderBottom: "1px solid #f1f5f9" }}>
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <Image src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?q=80&w=1600&auto=format&fit=crop" alt="Art Fair" fill style={{ objectFit: "cover" }} unoptimized priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)" }} />
        </motion.div>
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.875rem", fontWeight: "900", letterSpacing: "0.1em", color: "#c0392b", textTransform: "uppercase", marginBottom: "1rem" }}>
              International Art Event
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ fontSize: "clamp(3rem, 12vw, 8rem)", fontWeight: "900", lineHeight: 1, marginBottom: "2rem", maxWidth: "900px" }}>
              Where <span style={{ color: "#c0392b" }}>Art</span> Meets <span style={{ color: "#c0392b" }}>Passion</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.25rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "600px" }}>
              Discover works from 200 artists across 40 countries. 15 years of cultural excellence.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={32} style={{ color: "#c0392b" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* STATS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#1e293b", color: "#ffffff" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          {[
            { label: "Artists", value: 200 },
            { label: "Countries", value: 40 },
            { label: "Visitors", value: 12000 },
            { label: "Years", value: 15 },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "0.5rem", color: "#c0392b" }}>
                  <Counter target={stat.value} />
                  {stat.label === "Visitors" ? "K" : ""}
                </div>
                <p style={{ fontSize: "0.875rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ARTIST GRID */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Featured Artists</h2>
          </Reveal>

          {/* CATEGORY FILTER */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: selectedCategory === cat ? "#c0392b" : "transparent",
                  color: selectedCategory === cat ? "white" : "#1e293b",
                  border: `2px solid ${selectedCategory === cat ? "#c0392b" : "#e2e8f0"}`,
                  borderRadius: "9999px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ARTISTS */}
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
            <AnimatePresence mode="wait">
              {filteredArtists.map((artist, i) => (
                <motion.div
                  key={artist.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedArtist(artist)}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    aspectRatio: "1",
                    group: "group",
                  }}
                >
                  <Image src={artist.img} alt={artist.name} fill style={{ objectFit: "cover", filter: "grayscale(100%)", transition: "all 0.4s ease" }} className="group-hover:grayscale-0 group-hover:scale-110" unoptimized />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, rgba(30,41,59,0.8) 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", color: "white" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "900", marginBottom: "0.25rem" }}>{artist.name}</h3>
                    <p style={{ fontSize: "0.875rem", opacity: 0.8 }}>{artist.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* EVENT SCHEDULE TABS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Event Schedule</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              { name: "Preview Night", date: "May 16", time: "6PM - 9PM", guests: "VIP Only" },
              { name: "Opening", date: "May 17", time: "10AM - 10PM", guests: "All Welcome" },
              { name: "Weekend", date: "May 18-19", time: "9AM - 6PM", guests: "All Welcome" },
              { name: "Closing", date: "May 20", time: "10AM - 5PM", guests: "Final Day" },
            ].map((event, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "900", marginBottom: "0.5rem" }}>{event.name}</h3>
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", fontSize: "0.875rem", opacity: 0.7 }}>
                    <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <Calendar size={16} /> {event.date}
                    </span>
                  </div>
                  <p style={{ marginBottom: "0.5rem", fontWeight: "600" }}>{event.time}</p>
                  <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>{event.guests}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Collector Stories</h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              padding: "3rem",
              backgroundColor: "#f8fafc",
              borderRadius: "1rem",
              borderLeft: "4px solid #c0392b",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1.25rem", marginBottom: "2rem", fontStyle: "italic" }}>
              "Meridian introduced me to artists who changed my perspective on contemporary art. The curation is exceptional."
            </p>
            <p style={{ fontWeight: "900", fontSize: "1rem" }}>— Victoria Chen, Collector</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#1e293b", color: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Questions?</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: expandedFaq === i ? "#c0392b" : "transparent",
                    border: `1px solid ${expandedFaq === i ? "#c0392b" : "#475569"}`,
                    borderRadius: "0.75rem",
                    color: "white",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: "700",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{faq.q}</span>
                    <motion.div animate={{ rotate: expandedFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginTop: "1rem", fontSize: "0.95rem", opacity: 0.9 }}
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIP MODAL */}
      <AnimatePresence>
        {showVipModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVipModal(false)}
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
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "2rem",
                maxWidth: "500px",
                width: "90vw",
                position: "relative",
              }}
            >
              <button onClick={() => setShowVipModal(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} />
              </button>
              <h3 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1rem" }}>VIP Preview Access</h3>
              <p style={{ opacity: 0.7, marginBottom: "2rem" }}>Join our exclusive circle for early access to new collections and private viewings.</p>
              <input type="email" placeholder="your@email.com" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", border: "1px solid #e2e8f0", borderRadius: "0.5rem" }} />
              <button style={{ width: "100%", padding: "0.75rem", backgroundColor: "#c0392b", color: "white", fontWeight: "700", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}>
                Join VIP Circle
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ARTIST MODAL */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtist(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
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
                backgroundColor: "white",
                borderRadius: "1rem",
                overflow: "hidden",
                maxWidth: "600px",
                width: "90vw",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "1" }}>
                <Image src={selectedArtist.img} alt={selectedArtist.name} fill style={{ objectFit: "cover" }} unoptimized />
              </div>
              <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <button onClick={() => setSelectedArtist(null)} style={{ alignSelf: "flex-end", background: "none", border: "none", cursor: "pointer" }}>
                  <X size={24} />
                </button>
                <div>
                  <p style={{ fontSize: "0.875rem", opacity: 0.7, textTransform: "uppercase", fontWeight: "600", marginBottom: "0.5rem" }}>
                    {selectedArtist.category}
                  </p>
                  <h3 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "1rem" }}>{selectedArtist.name}</h3>
                  <p style={{ opacity: 0.7, marginBottom: "1.5rem" }}>International artist specializing in contemporary {selectedArtist.category.toLowerCase()}. Featured in major galleries worldwide.</p>
                </div>
                <MagneticBtn>View Portfolio</MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA FOOTER */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#1e293b", color: "white" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "2rem" }}>Ready to Discover?</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={() => setShowVipModal(true)}
              style={{
                padding: "1rem 2.5rem",
                backgroundColor: "#c0392b",
                color: "white",
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
              Join VIP Preview <ArrowRight size={20} />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
