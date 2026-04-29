"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, Zap, Battery, Gauge, Clock, ArrowRight, ChevronDown, Plus } from "lucide-react";

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
      {count}
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
      className="px-8 py-3 bg-[#00d97e] text-[#050c0a] font-black uppercase text-sm tracking-wider rounded hover:bg-[#00b366] transition-colors"
    >
      {children}
    </motion.button>
  );
};

export default function VoltaMotors() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(80);
  const [showPreorderModal, setShowPreorderModal] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const rangeAtCharge = Math.round((chargeLevel / 100) * 500);

  return (
    <div style={{ backgroundColor: "#050c0a", color: "#ffffff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(5,12,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #00d97e40" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#00d97e", letterSpacing: "-0.02em" }}>VOLTA</h1>
          <div style={{ display: "none", gap: "2rem" }} className="md:flex">
            {["Models", "Charging", "Performance", "Order"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.875rem", fontWeight: "600", textDecoration: "none", color: "#ffffff", opacity: 0.7 }}>
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: "pointer", background: "none", border: "none", color: "#00d97e" }}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", top: "60px", left: 0, right: 0, backgroundColor: "#050c0a", zIndex: 40, padding: "2rem", borderBottom: "1px solid #00d97e40" }}>
            {["Models", "Charging", "Performance", "Order"].map((item, i) => (
              <motion.a key={item} href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ display: "block", padding: "0.75rem 0", fontSize: "1rem", fontWeight: "600", color: "#ffffff", textDecoration: "none", borderBottom: "1px solid #1a2825" }} >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <Image src="https://images.unsplash.com/photo-1619405399517-d4dc2ebe6e73?q=80&w=1600&auto=format&fit=crop" alt="Electric Car" fill style={{ objectFit: "cover" }} unoptimized priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,12,10,0.8) 0%, rgba(0,217,126,0.1) 100%)" }} />
        </motion.div>
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.875rem", fontWeight: "900", letterSpacing: "0.1em", color: "#00d97e", textTransform: "uppercase", marginBottom: "1rem" }}>
              The Future of Driving
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ fontSize: "clamp(3rem, 12vw, 8rem)", fontWeight: "900", lineHeight: 1, marginBottom: "2rem", maxWidth: "900px" }}>
              Electric <span style={{ color: "#00d97e" }}>Redefined</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.25rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "600px" }}>
              500km range. 3.2s acceleration. Zero emissions.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={32} style={{ color: "#00d97e" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* STAT BARS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {[
            { label: "Range", value: 500, max: 500, unit: "km" },
            { label: "Acceleration", value: 3.2, max: 10, unit: "0-100 in s" },
            { label: "Efficiency", value: 0.16, max: 0.3, unit: "kWh/km" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontWeight: "700", fontSize: "1rem" }}>{stat.label}</span>
                  <span style={{ color: "#00d97e", fontWeight: "900" }}>
                    {stat.value}
                    {stat.unit}
                  </span>
                </div>
                <div style={{ height: "8px", backgroundColor: "#1a2825", borderRadius: "9999px", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(stat.value / stat.max) * 100}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    style={{ height: "100%", backgroundColor: "#00d97e", borderRadius: "9999px" }}
                  />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RANGE CALCULATOR */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "1rem", textAlign: "center" }}>Range Calculator</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ opacity: 0.7, textAlign: "center", marginBottom: "3rem" }}>
              Adjust the charge level to see real-time range estimates
            </p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              padding: "3rem",
              backgroundColor: "#0a1410",
              borderRadius: "1rem",
              border: "1px solid #00d97e40",
            }}
          >
            {/* SLIDER */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontWeight: "700" }}>Battery Charge</span>
                <span style={{ color: "#00d97e", fontWeight: "900" }}>{chargeLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={chargeLevel}
                onChange={(e) => setChargeLevel(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "9999px",
                  backgroundColor: "#1a2825",
                  outline: "none",
                  WebkitAppearance: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
              <style>{`
                input[type="range"]::-webkit-slider-thumb {
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #00d97e;
                  cursor: pointer;
                  box-shadow: 0 0 20px rgba(0, 217, 126, 0.5);
                }
                input[type="range"]::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #00d97e;
                  cursor: pointer;
                  border: none;
                  box-shadow: 0 0 20px rgba(0, 217, 126, 0.5);
                }
              `}</style>
            </div>

            {/* RANGE DISPLAY */}
            <motion.div
              key={chargeLevel}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                padding: "2rem",
                backgroundColor: "#050c0a",
                borderRadius: "0.75rem",
                border: "2px solid #00d97e",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem", textTransform: "uppercase" }}>
                Estimated Range
              </div>
              <div style={{ fontSize: "3.5rem", fontWeight: "900", color: "#00d97e" }}>
                {rangeAtCharge} <span style={{ fontSize: "1.5rem", opacity: 0.7 }}>km</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CHARGING NETWORK STATS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Charging Network</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              { label: "Charging Stations", value: 850 },
              { label: "Fast Charge Time", value: 45, unit: " min" },
              { label: "Maximum Range", value: 500, unit: " km" },
              { label: "0-100 km/h", value: 3.2, unit: " s" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "#050c0a",
                    borderRadius: "1rem",
                    border: "1px solid #00d97e40",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#00d97e", marginBottom: "0.5rem" }}>
                    <Counter target={stat.value} suffix={stat.unit} />
                  </div>
                  <p style={{ fontSize: "0.875rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MODEL COMPARISON TABLE */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Compare Models</h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              overflowX: "auto",
              backgroundColor: "#0a1410",
              borderRadius: "1rem",
              border: "1px solid #00d97e40",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #00d97e40" }}>
                  <th style={{ padding: "1.5rem", textAlign: "left", fontWeight: "900" }}>Feature</th>
                  <th style={{ padding: "1.5rem", textAlign: "center", fontWeight: "900", color: "#00d97e" }}>Volta 1</th>
                  <th style={{ padding: "1.5rem", textAlign: "center", fontWeight: "900", color: "#00d97e" }}>Volta X</th>
                  <th style={{ padding: "1.5rem", textAlign: "center", fontWeight: "900", color: "#00d97e" }}>Volta GT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Range", volta1: "400 km", voltaX: "500 km", voltaGT: "600 km" },
                  { feature: "0-100 km/h", volta1: "4.2 s", voltaX: "3.2 s", voltaGT: "2.8 s" },
                  { feature: "Price", volta1: "$45K", voltaX: "$65K", voltaGT: "$89K" },
                  { feature: "Seats", volta1: "5", voltaX: "5", voltaGT: "4" },
                  { feature: "Warranty", volta1: "5 years", voltaX: "8 years", voltaGT: "10 years" },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a2825" }}>
                    <td style={{ padding: "1.5rem", fontWeight: "600" }}>{row.feature}</td>
                    <td style={{ padding: "1.5rem", textAlign: "center", opacity: 0.8 }}>{row.volta1}</td>
                    <td style={{ padding: "1.5rem", textAlign: "center", opacity: 0.8 }}>{row.voltaX}</td>
                    <td style={{ padding: "1.5rem", textAlign: "center", opacity: 0.8 }}>{row.voltaGT}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Owner Stories</h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              padding: "2rem",
              backgroundColor: "#050c0a",
              borderRadius: "1rem",
              borderLeft: "4px solid #00d97e",
            }}
          >
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              "The Volta X changed my daily commute. 500km range means I charge once a week, and the acceleration is insane."
            </p>
            <p style={{ fontWeight: "700", color: "#00d97e" }}>— Alex Kumar, Volta X Owner</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>FAQ</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { q: "How does range anxiety work with 500km?", a: "You can drive 5+ hours without charging. Most people charge overnight and never think about it." },
              { q: "What's the charging infrastructure like?", a: "850 Volta Fast Charge stations across the country, plus home charging in 30 minutes." },
              { q: "Are batteries covered under warranty?", a: "Yes, 8-10 year battery warranty depending on your model." },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.button
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#0a1410",
                    border: "1px solid #00d97e40",
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
                    <ChevronDown size={20} />
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PREORDER MODAL */}
      <AnimatePresence>
        {showPreorderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreorderModal(false)}
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
                backgroundColor: "#050c0a",
                borderRadius: "1rem",
                padding: "2rem",
                maxWidth: "500px",
                width: "90vw",
                position: "relative",
                border: "1px solid #00d97e40",
              }}
            >
              <button onClick={() => setShowPreorderModal(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "#00d97e" }}>
                <X size={24} />
              </button>
              <h3 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1rem", color: "#00d97e" }}>Pre-order Volta</h3>
              <p style={{ opacity: 0.7, marginBottom: "2rem" }}>Secure your electric future today. Deposit required, balance on delivery.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <input type="text" placeholder="Full Name" style={{ padding: "0.75rem", backgroundColor: "#0a1410", border: "1px solid #1a2825", borderRadius: "0.5rem", color: "white" }} />
                <input type="email" placeholder="Email" style={{ padding: "0.75rem", backgroundColor: "#0a1410", border: "1px solid #1a2825", borderRadius: "0.5rem", color: "white" }} />
                <select style={{ padding: "0.75rem", backgroundColor: "#0a1410", border: "1px solid #1a2825", borderRadius: "0.5rem", color: "white" }}>
                  <option>Select Model</option>
                  <option>Volta 1</option>
                  <option>Volta X</option>
                  <option>Volta GT</option>
                </select>
              </div>
              <button style={{ width: "100%", padding: "0.75rem", backgroundColor: "#00d97e", color: "#050c0a", fontWeight: "900", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}>
                Reserve Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA FOOTER */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "2rem" }}>Ready to Go Electric?</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={() => setShowPreorderModal(true)}
              style={{
                padding: "1rem 2.5rem",
                backgroundColor: "#00d97e",
                color: "#050c0a",
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
              Pre-order Now <Zap size={20} />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
