"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
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

const Counter = ({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) => {
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
      <div className="text-5xl font-bold" style={{ color: "#f59e0b" }}>
        {count}
        {suffix}
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

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: xSpring, y: ySpring }}
      className="px-8 py-3 rounded-full font-bold uppercase text-sm"
      style={{ color: "#060a0f", backgroundColor: "#f59e0b" } as any}
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
          <span key={i} className="text-lg font-bold text-white">
            {item} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const AccordionItem = ({ title, content, isOpen, onClick }: { title: string; content: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div style={{ borderBottom: "1px solid #f59e0b40" }}>
      <button
        onClick={onClick}
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-white/5 transition-colors"
      >
        <span className="font-bold text-white">{title}</span>
        <ChevronDown
          style={{
            color: "#f59e0b",
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

export default function SolarisEnergy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const solutions = [
    { name: "Residential", desc: "Home Solar Systems", savings: "70% on energy bills", specs: ["4-8 kW", "25+ year warranty", "Battery storage optional"] },
    { name: "Commercial", desc: "Business Solutions", savings: "50% on operating costs", specs: ["10-100 kW", "Custom design", "ROI in 5-7 years"] },
    { name: "Industrial", desc: "Large Scale", savings: "60% reduction", specs: ["100+ kW", "Ground mounted", "24/7 monitoring"] },
    { name: "Utility", desc: "Grid Scale", savings: "Wholesale pricing", specs: ["1-100+ MW", "Turnkey", "Grid-tied"] },
  ];

  const timeline = [
    { step: 1, title: "Consultation", desc: "Free site assessment" },
    { step: 2, title: "Design", desc: "Custom system plan" },
    { step: 3, title: "Permitting", desc: "License & permits" },
    { step: 4, title: "Installation", desc: "3-5 day install" },
    { step: 5, title: "Activation", desc: "Live & producing" },
  ];

  const faqs = [
    { title: "What if my roof is old?", content: "We can replace your roof during installation at a discounted rate." },
    { title: "How long is installation?", content: "Residential systems typically take 3-5 days from start to full operation." },
    { title: "Do you offer financing?", content: "Yes! 0% APR for 10 years, plus 26% federal tax credit." },
    { title: "What's the maintenance cost?", content: "Minimal. Annual inspections are $99. No moving parts to maintain." },
  ];

  const utilities = ["PG&E", "Edison", "SoCal Water", "Descanso", "Burbank Water"];

  return (
    <div ref={containerRef} style={{ backgroundColor: "#060a0f", color: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#060a0fdd", backdropFilter: "blur(10px)", borderBottom: "1px solid #f59e0b20" }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: "#f59e0b" }} className="text-2xl font-bold flex items-center gap-2">
          <Zap size={28} /> SOLARIS
        </h1>
        <nav className="hidden md:flex gap-8">
          {["Solutions", "Timeline", "Partners", "FAQ"].map((item) => (
            <Link key={item} href="#" style={{ color: "#fff" }} className="hover:text-[#f59e0b] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={24} style={{ color: "#f59e0b" }} /> : <Menu size={24} style={{ color: "#f59e0b" }} />}
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
            className="md:hidden py-4 px-6 border-b border-[#f59e0b20]"
          >
            {["Solutions", "Timeline", "Partners", "FAQ"].map((item) => (
              <p key={item} style={{ color: "#fff" }} className="py-2">
                {item}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rotating Sun Hero */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", marginTop: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div style={{ y: parallaxY }}>
          <Image
            src="https://images.unsplash.com/photo-1509391366360-2e938616c5eb?q=80&w=1200&auto=format&fit=crop"
            alt="Solar Field"
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,10,15,0.3), rgba(6,10,15,0.8))" }} />

        {/* Rotating Sun Animation */}
        <motion.div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #f59e0b, #ff7f00)",
            top: "10%",
            right: "10%",
            rotateZ: rotationY,
            boxShadow: "0 0 100px rgba(245, 158, 11, 0.5)",
          }}
        />

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10 }}>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#f59e0b" }}>
              CLEAN POWER
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
              500K homes powered. 2M tons CO2 saved.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn>Get Free Quote</MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Solution Tabs */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#f59e0b" }}>
            Solutions For Every Scale
          </h3>
        </Reveal>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap", justifyContent: "center" }}>
          {solutions.map((sol, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveSolution(idx)}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "0.75rem 1.5rem",
                border: `2px solid ${activeSolution === idx ? "#f59e0b" : "#f59e0b40"}`,
                borderRadius: "30px",
                backgroundColor: activeSolution === idx ? "#f59e0b" : "transparent",
                color: activeSolution === idx ? "#060a0f" : "#f59e0b",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {sol.name}
            </motion.button>
          ))}
        </div>
        <motion.div
          key={activeSolution}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            padding: "2rem",
            backgroundColor: "#1a1a1a",
            borderRadius: "1rem",
            border: "2px solid #f59e0b",
          }}
        >
          <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#f59e0b", marginBottom: "0.5rem" }}>
            {solutions[activeSolution].name}
          </h4>
          <p style={{ marginBottom: "1rem" }}>{solutions[activeSolution].desc}</p>
          <p style={{ marginBottom: "1.5rem", color: "#0ea5e9" }}>Savings: {solutions[activeSolution].savings}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            {solutions[activeSolution].specs.map((spec, i) => (
              <div key={i} style={{ padding: "1rem", backgroundColor: "#0a0a0a", borderRadius: "0.5rem", borderLeft: "3px solid #f59e0b" }}>
                {spec}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Savings Calculator */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", color: "#f59e0b" }}>
              Calculate Your Savings
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              <input
                type="number"
                placeholder="Monthly bill ($)"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #f59e0b",
                  backgroundColor: "#0a0a0a",
                  color: "#fff",
                }}
              />
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#f59e0b",
                  color: "#060a0f",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Calculate
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ padding: "2rem", backgroundColor: "#0a0a0a", borderRadius: "1rem", border: "2px solid #f59e0b" }}>
              <p style={{ color: "#0ea5e9", marginBottom: "0.5rem" }}>Est. Annual Savings</p>
              <h4 style={{ fontSize: "2rem", fontWeight: "bold", color: "#f59e0b" }}>$1,200+</h4>
              <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>with 26% federal tax credit</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Installation Timeline */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#f59e0b" }}>
            From Quote to Power
          </h3>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
          {timeline.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "1rem",
                  border: "2px solid #f59e0b",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#0ea5e9", marginBottom: "0.5rem" }}>
                  {item.step}
                </div>
                <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#f59e0b" }}>{item.title}</h4>
                <p style={{ fontSize: "0.875rem" }}>{item.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          <Counter target={10} label="GW Installed" suffix="GW" />
          <Counter target={500} label="K Homes Powered" suffix="K" />
          <Counter target={2} label="M Tons CO2 Saved" suffix="M" />
          <Counter target={98} label="Uptime Guarantee" suffix="%" />
        </div>
      </section>

      {/* Partner Utilities Marquee */}
      <section style={{ padding: "3rem 0", overflow: "hidden" }}>
        <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#0ea5e9", fontWeight: "bold" }}>
          TRUSTED BY MAJOR UTILITIES
        </p>
        <Marquee items={utilities} />
      </section>

      {/* Incentives */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#f59e0b" }}>
            Government Incentives
          </h3>
        </Reveal>
        {[
          { title: "Federal Tax Credit", content: "26% of installation cost back as federal income tax credit" },
          { title: "State Rebates", content: "Up to $3,000 from California State programs" },
          { title: "Net Metering", content: "Get paid for excess energy exported to grid" },
          { title: "Performance Credits", content: "Utility bill credits for clean energy generation" },
        ].map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <AccordionItem title={faq.title} content={faq.content} isOpen={openAccordion === idx} onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)} />
          </Reveal>
        ))}
      </section>

      {/* Case Studies */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#f59e0b" }}>
            Real Results
          </Reveal>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            { home: "Mountain Home, CA", power: "8 kW", savings: "$1,800/year", co2: "10 tons" },
            { home: "Urban Condo, LA", power: "5 kW", savings: "$1,200/year", co2: "6 tons" },
            { home: "Ranch House, SD", power: "12 kW", savings: "$2,400/year", co2: "15 tons" },
          ].map((study, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#0a0a0a",
                  borderRadius: "1rem",
                  border: "2px solid #f59e0b",
                }}
              >
                <h4 style={{ fontWeight: "bold", marginBottom: "1rem", color: "#0ea5e9" }}>{study.home}</h4>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  <p>
                    <span style={{ color: "#f59e0b" }}>System:</span> {study.power}
                  </p>
                  <p>
                    <span style={{ color: "#f59e0b" }}>Annual Savings:</span> {study.savings}
                  </p>
                  <p>
                    <span style={{ color: "#f59e0b" }}>CO2 Offset:</span> {study.co2}/year
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#f59e0b" }}>
            Common Questions
          </h3>
        </Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <AccordionItem title={faq.title} content={faq.content} isOpen={openAccordion === idx + 100} onClick={() => setOpenAccordion(openAccordion === idx + 100 ? null : idx + 100)} />
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center", backgroundColor: "#f59e0b" }}>
        <Reveal>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#060a0f" }}>
            Go Solar Today
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginBottom: "2rem", color: "#060a0f" }}>Free consultation, no obligation</p>
        </Reveal>
        <Reveal delay={0.2}>
          <button
            onClick={() => setQuoteModalOpen(true)}
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#060a0f",
              color: "#f59e0b",
              borderRadius: "0.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              fontSize: "1rem",
            }}
          >
            Request Quote
          </button>
        </Reveal>
      </section>

      {/* Quote Modal */}
      <AnimatePresence>
        {quoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuoteModalOpen(false)}
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
                backgroundColor: "#060a0f",
                padding: "2rem",
                borderRadius: "1rem",
                maxWidth: "400px",
                width: "90%",
                border: "2px solid #f59e0b",
              }}
            >
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#f59e0b" }}>
                Free Solar Quote
              </h4>
              <input type="text" placeholder="Full Name" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: "0.5rem", border: "2px solid #f59e0b", color: "#060a0f" }} />
              <input type="email" placeholder="Email" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: "0.5rem", border: "2px solid #f59e0b", color: "#060a0f" }} />
              <input type="tel" placeholder="Phone" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: "0.5rem", border: "2px solid #f59e0b", color: "#060a0f" }} />
              <button
                onClick={() => setQuoteModalOpen(false)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#f59e0b",
                  color: "#060a0f",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Get Quote
              </button>
              <button
                onClick={() => setQuoteModalOpen(false)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "1rem",
                  backgroundColor: "transparent",
                  border: "2px solid #f59e0b",
                  color: "#f59e0b",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
