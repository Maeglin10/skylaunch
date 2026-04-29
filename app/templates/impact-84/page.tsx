"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, PieChart, TrendingUp, Lock, Shield, Check, Star, ArrowRight, ChevronDown, Apple, Smartphone } from "lucide-react";

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
      className="px-8 py-3 bg-[#0891b2] text-white font-black uppercase text-sm tracking-wider rounded hover:bg-[#0e7490] transition-colors"
    >
      {children}
    </motion.button>
  );
};

export default function ClearpathFinance() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("budget");
  const [pricingPlan, setPricingPlan] = useState("pro");
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const tabs = [
    { id: "budget", name: "Budget", icon: <PieChart size={24} />, desc: "Real-time spending insights" },
    { id: "invest", name: "Invest", icon: <TrendingUp size={24} />, desc: "Portfolio management & growth" },
    { id: "plan", name: "Plan", icon: <TrendingUp size={24} />, desc: "Retirement & goal planning" },
    { id: "tax", name: "Tax", icon: <Shield size={24} />, desc: "Tax optimization strategies" },
  ];

  return (
    <div style={{ backgroundColor: "#050d14", color: "#ffffff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(5,13,20,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #0891b240" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#0891b2", letterSpacing: "-0.02em" }}>CLEARPATH</h1>
          <div style={{ display: "none", gap: "2rem" }} className="md:flex">
            {["Features", "Security", "Pricing", "App"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.875rem", fontWeight: "600", textDecoration: "none", color: "#ffffff", opacity: 0.7 }}>
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: "pointer", background: "none", border: "none", color: "#0891b2" }}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", top: "60px", left: 0, right: 0, backgroundColor: "#050d14", zIndex: 40, padding: "2rem", borderBottom: "1px solid #0891b240" }}>
            {["Features", "Security", "Pricing", "App"].map((item, i) => (
              <motion.a key={item} href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ display: "block", padding: "0.75rem 0", fontSize: "1rem", fontWeight: "600", color: "#ffffff", textDecoration: "none", borderBottom: "1px solid #0f172a" }}>
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0891b215 0%, #38bdf815 100%)" }} />
        </motion.div>
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.875rem", fontWeight: "900", letterSpacing: "0.1em", color: "#38bdf8", textTransform: "uppercase", marginBottom: "1rem" }}>
              Personal Finance
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ fontSize: "clamp(3rem, 12vw, 8rem)", fontWeight: "900", lineHeight: 1, marginBottom: "2rem", maxWidth: "900px" }}>
              Your Money, <span style={{ color: "#0891b2" }}>Simplified</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.25rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "600px" }}>
              Budget, invest, plan, and optimize taxes—all in one app. 2M users trust us with $50B.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={32} style={{ color: "#0891b2" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* FEATURE TABS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Features</h2>
          </Reveal>

          {/* TAB BUTTONS */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "1rem 1.5rem",
                  backgroundColor: activeTab === tab.id ? "#0891b2" : "transparent",
                  color: activeTab === tab.id ? "white" : "#ffffff",
                  border: `2px solid ${activeTab === tab.id ? "#0891b2" : "#1e293b"}`,
                  borderRadius: "0.75rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  opacity: activeTab === tab.id ? 1 : 0.7,
                }}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: "3rem",
                    backgroundColor: "#0f172a",
                    borderRadius: "1rem",
                    border: "1px solid #1e293b",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "1rem" }}>{tab.name}</h3>
                  <p style={{ opacity: 0.8, marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
                    {tab.desc}
                  </p>
                  <div style={{ width: "100%", height: "300px", backgroundColor: "#050d14", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      {tab.icon}
                    </motion.div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECURITY BADGES */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0f172a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Bank-Grade Security</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {[
              { name: "Bank-grade encryption", icon: <Lock size={32} /> },
              { name: "SOC2 Certified", icon: <Shield size={32} /> },
              { name: "FDIC Insured", icon: <Check size={32} /> },
              { name: "2FA Protection", icon: <Shield size={32} /> },
            ].map((badge, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "#050d14",
                    borderRadius: "1rem",
                    border: "1px solid #1e293b",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ color: "#0891b2", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                    {badge.icon}
                  </div>
                  <p style={{ fontWeight: "700" }}>{badge.name}</p>
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
            { label: "Users", value: 2, suffix: "M" },
            { label: "Assets Tracked", value: 50, suffix: "B" },
            { label: "Uptime", value: 99.9, suffix: "%" },
            { label: "Rating", value: 4.9, suffix: "★" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "0.5rem", color: "#0891b2" }}>
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

      {/* PRICING */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0f172a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Simple Pricing</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {[
              { name: "Starter", price: "Free", features: ["Budget tracking", "Spending insights", "Basic reports"] },
              { name: "Pro", price: "$7.99", period: "/month", features: ["Everything in Starter", "Investment tracking", "Tax optimization", "Priority support"] },
              { name: "Family", price: "$14.99", period: "/month", features: ["Everything in Pro", "5 family members", "Shared budgets", "Premium analytics"] },
            ].map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  onClick={() => setPricingPlan(plan.name.toLowerCase())}
                  style={{
                    padding: "2rem",
                    backgroundColor: pricingPlan === plan.name.toLowerCase() ? "#0891b2" : "#050d14",
                    borderRadius: "1rem",
                    border: `2px solid ${pricingPlan === plan.name.toLowerCase() ? "#0891b2" : "#1e293b"}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "900", marginBottom: "1rem" }}>{plan.name}</h3>
                  <div style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "0.5rem" }}>
                    {plan.price} <span style={{ fontSize: "0.875rem", opacity: 0.8 }}>{plan.period}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2rem" }}>
                    {plan.features.map((feature, j) => (
                      <div key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "center", fontSize: "0.875rem" }}>
                        <Check size={16} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Trusted by Millions</h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              padding: "2rem",
              backgroundColor: "#0f172a",
              borderRadius: "1rem",
              borderLeft: "4px solid #0891b2",
            }}
          >
            <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#0891b2" color="#0891b2" />
              ))}
            </div>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              "Clearpath made managing my finances effortless. The tax optimization alone saves me thousands every year."
            </p>
            <p style={{ fontWeight: "700", color: "#0891b2" }}>— James Park, Business Owner</p>
          </motion.div>
        </div>
      </section>

      {/* APP DOWNLOAD CTA */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0f172a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "2rem" }}>Download Clearpath</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.1rem", opacity: 0.8, marginBottom: "3rem" }}>
              Available on iOS and Android
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{ padding: "0.75rem 2rem", backgroundColor: "#0891b2", color: "white", fontWeight: "700", borderRadius: "0.5rem", border: "none", cursor: "pointer", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Apple size={20} /> App Store
              </button>
              <button style={{ padding: "0.75rem 2rem", backgroundColor: "#0891b2", color: "white", fontWeight: "700", borderRadius: "0.5rem", border: "none", cursor: "pointer", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Smartphone size={20} /> Google Play
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
