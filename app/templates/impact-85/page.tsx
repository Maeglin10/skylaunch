"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, Music, Radio, Play, Users, Calendar, ArrowRight, ChevronDown } from "lucide-react";

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
const Counter = ({ target, duration = 2, suffix = "" }: { target: number; duration?: number; suffix?: string }) => {
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
      className="px-8 py-3 bg-[#ec4899] text-white font-black uppercase text-sm tracking-wider rounded hover:bg-[#db2777] transition-colors"
    >
      {children}
    </motion.button>
  );
};

// PULSING EFFECT
const PulsingBg = () => (
  <motion.div
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 3, repeat: Infinity }}
    style={{
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
      opacity: 0.3,
    }}
  />
);

export default function NeonCollective() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookingModal, setBookingModal] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const artists = [
    { id: 1, name: "CIPHER", genre: "Electronic", img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "APEX", genre: "Hip-Hop", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "LUNA", genre: "Ambient", img: "https://images.unsplash.com/photo-1516430536063-6f3314ca4e1b?q=80&w=600&auto=format&fit=crop" },
    { id: 4, name: "VOLT", genre: "Electronic", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop" },
    { id: 5, name: "SONIC", genre: "Indie", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop" },
    { id: 6, name: "ECHO", genre: "Hip-Hop", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop" },
    { id: 7, name: "PRISM", genre: "Ambient", img: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=600&auto=format&fit=crop" },
    { id: 8, name: "NEON", genre: "Electronic", img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=600&auto=format&fit=crop" },
  ];

  const genres = ["All", "Electronic", "Hip-Hop", "Indie", "Ambient"];
  const filteredArtists = selectedGenre === "All" ? artists : artists.filter(a => a.genre === selectedGenre);

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "#ffffff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #ec489940" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#ec4899", letterSpacing: "-0.02em" }}>NEON</h1>
          <div style={{ display: "none", gap: "2rem" }} className="md:flex">
            {["Artists", "Releases", "Events", "Shop"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.875rem", fontWeight: "600", textDecoration: "none", color: "#ffffff", opacity: 0.7 }}>
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: "pointer", background: "none", border: "none", color: "#ec4899" }}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", top: "60px", left: 0, right: 0, backgroundColor: "#0a0a0a", zIndex: 40, padding: "2rem", borderBottom: "1px solid #ec489940" }}>
            {["Artists", "Releases", "Events", "Shop"].map((item, i) => (
              <motion.a key={item} href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ display: "block", padding: "0.75rem 0", fontSize: "1rem", fontWeight: "600", color: "#ffffff", textDecoration: "none", borderBottom: "1px solid #1a1a1a" }}>
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO WITH PULSING NEON */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <PulsingBg />
        <div style={{ position: "relative", textAlign: "center", padding: "2rem", zIndex: 10 }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.875rem", fontWeight: "900", letterSpacing: "0.1em", color: "#ec4899", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>
              Music Label
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontSize: "clamp(3rem, 12vw, 8rem)",
                fontWeight: "900",
                lineHeight: 1,
                marginBottom: "2rem",
                maxWidth: "900px",
                color: "#ec4899",
                textShadow: "0 0 40px rgba(236, 72, 153, 0.5)",
              }}
            >
              NEON COLLECTIVE
            </motion.h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.25rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "600px" }}>
              Where electronic meets revolution. 24 artists. 8 years. Infinite possibilities.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={32} style={{ color: "#ec4899" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* ARTIST ROSTER */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Artist Roster</h2>
          </Reveal>

          {/* GENRE FILTER */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: selectedGenre === genre ? "#ec4899" : "transparent",
                  color: selectedGenre === genre ? "white" : "#ffffff",
                  border: `2px solid ${selectedGenre === genre ? "#ec4899" : "#333333"}`,
                  borderRadius: "9999px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* ARTISTS GRID */}
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
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    aspectRatio: "1",
                  }}
                >
                  <Image src={artist.img} alt={artist.name} fill style={{ objectFit: "cover", filter: "grayscale(100%)", transition: "all 0.4s ease" }} className="group-hover:grayscale-0 group-hover:scale-110" unoptimized />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.9) 100%)" }} />
                  <div style={{ position: "absolute", top: 0, right: 0, padding: "1rem", opacity: 0, transition: "opacity 0.3s ease" }} className="group-hover:opacity-100">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#ec4899",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Play size={20} fill="white" color="white" />
                    </motion.button>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", color: "white" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "900", marginBottom: "0.25rem" }}>{artist.name}</h3>
                    <p style={{ fontSize: "0.875rem", opacity: 0.8 }}>{artist.genre}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LATEST RELEASES TIMELINE */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Latest Releases</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { title: "FREQUENCY", artist: "CIPHER", date: "Apr 28", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop" },
              { title: "VOID ECHO", artist: "LUNA", date: "Apr 21", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop" },
              { title: "NEON NIGHTS", artist: "VOLT", date: "Apr 14", img: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=300&auto=format&fit=crop" },
              { title: "PULSE", artist: "APEX", date: "Apr 7", img: "https://images.unsplash.com/photo-1516430536063-6f3314ca4e1b?q=80&w=300&auto=format&fit=crop" },
            ].map((release, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 20 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr auto",
                    gap: "2rem",
                    padding: "1.5rem",
                    backgroundColor: "#0a0a0a",
                    borderRadius: "0.75rem",
                    border: "1px solid #333333",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "1", borderRadius: "0.5rem", overflow: "hidden" }}>
                    <Image src={release.img} alt={release.title} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "900", marginBottom: "0.25rem", color: "#ec4899" }}>
                      {release.title}
                    </h3>
                    <p style={{ opacity: 0.7 }}>by {release.artist}</p>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>{release.date}</p>
                    <Play size={20} style={{ color: "#ec4899" }} fill="#ec4899" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          {[
            { label: "Streams", value: 50, suffix: "M" },
            { label: "Artists", value: 24 },
            { label: "Years", value: 8 },
            { label: "Shows/Year", value: 120 },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "0.5rem", color: "#ec4899" }}>
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

      {/* TOUR DATES ACCORDION */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Tour Dates</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { date: "May 10", city: "Tokyo", venue: "Shibuya Club" },
              { date: "May 17", city: "Berlin", venue: "Berghain" },
              { date: "May 24", city: "New York", venue: "Terminal 5" },
              { date: "Jun 2", city: "London", venue: "Electric Ballroom" },
            ].map((tour, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setBookingModal(true)}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#0a0a0a",
                    border: "1px solid #333333",
                    borderRadius: "0.75rem",
                    color: "white",
                    cursor: "pointer",
                    display: "grid",
                    gridTemplateColumns: "150px 1fr auto",
                    gap: "2rem",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "900", color: "#ec4899", fontSize: "1.1rem" }}>{tour.date}</p>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: "700" }}>{tour.city}</p>
                    <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>{tour.venue}</p>
                  </div>
                  <div style={{ color: "#ec4899" }}>
                    <ArrowRight size={20} />
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {bookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBookingModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
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
                backgroundColor: "#0a0a0a",
                borderRadius: "1rem",
                padding: "2rem",
                maxWidth: "500px",
                width: "90vw",
                position: "relative",
                border: "1px solid #ec4899",
              }}
            >
              <button onClick={() => setBookingModal(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "#ec4899" }}>
                <X size={24} />
              </button>
              <h3 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1rem", color: "#ec4899" }}>Book Artist</h3>
              <p style={{ opacity: 0.7, marginBottom: "2rem" }}>Inquire about booking our artists for your event.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <input type="text" placeholder="Event Name" style={{ padding: "0.75rem", backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "0.5rem", color: "white" }} />
                <input type="email" placeholder="Email" style={{ padding: "0.75rem", backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "0.5rem", color: "white" }} />
                <input type="date" style={{ padding: "0.75rem", backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "0.5rem", color: "white" }} />
              </div>
              <button style={{ width: "100%", padding: "0.75rem", backgroundColor: "#ec4899", color: "white", fontWeight: "900", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}>
                Send Inquiry
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "2rem" }}>Join the Collective</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={() => setBookingModal(true)}
              style={{
                padding: "1rem 2.5rem",
                backgroundColor: "#ec4899",
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
              Book Now <ArrowRight size={20} />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
