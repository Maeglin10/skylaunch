"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, Shield, Lock, Eye, AlertTriangle, CheckCircle2, TrendingUp, Zap, Search } from "lucide-react";

const SERVICES = [
  { icon: Shield, title: "Penetration Testing", risk: 92 },
  { icon: Lock, title: "SOC Services", risk: 87 },
  { icon: Eye, title: "Incident Response", risk: 95 },
  { icon: AlertTriangle, title: "Compliance Audit", risk: 78 },
];

const CASE_STUDIES = [
  { title: "Financial Data Breach Prevention", category: "Finance", year: 2024 },
  { title: "Healthcare Infrastructure Hardening", category: "Healthcare", year: 2024 },
  { title: "Government Cybersecurity Audit", category: "Gov", year: 2023 },
  { title: "Retail POS System Protection", category: "Retail", year: 2024 },
];

const FAQS = [
  { q: "What is penetration testing?", a: "Simulated attacks to identify security vulnerabilities before real threats exploit them." },
  { q: "How often should we audit?", a: "We recommend quarterly audits for enterprise, monthly for high-risk sectors." },
  { q: "Is SOC 2 compliance required?", a: "Not always, but essential for enterprise clients handling sensitive data." },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(target / 50);
      if (current > target) current = target;
      setCount(current);
      if (current === target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#00ffcc] font-mono">{count.toLocaleString()}+</div>
      <div className="text-sm text-gray-400 mt-2">{label}</div>
    </div>
  );
}

function MagneticBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = (ref.current as HTMLDivElement).getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
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
      style={{ x: springX, y: springY }}
      className="px-8 py-3 bg-[#00ffcc] text-[#060810] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ffcc]/50 transition-shadow"
    >
      {children}
    </motion.button>
  );
}

function LoadBar({ value }: { value: number }) {
  const width = useTransform(() => `${value}%`);
  return (
    <motion.div className="h-1 bg-[#00ffcc] rounded-full" style={{ width: width as any }} />
  );
}

function InfiniteMarquee({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden py-8 bg-[#0a1628]">
      <motion.div
        className="flex gap-12"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-gray-600 whitespace-nowrap font-mono text-sm">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {FAQS.map((faq, i) => (
        <motion.div key={i} className="border border-[#00ffcc]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full p-4 flex justify-between items-center bg-[#0a1628] hover:bg-[#0f1f32] transition-colors"
          >
            <span className="text-left font-mono text-sm">{faq.q}</span>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
              <AlertTriangle className="w-4 h-4 text-[#00ffcc]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#060810] border-t border-[#00ffcc]/10 p-4"
              >
                <p className="text-sm text-gray-400">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function CipherShieldPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [threatCounter, setThreatCounter] = useState(0);
  const [filterTab, setFilterTab] = useState("Finance");
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCounter((prev) => (prev + Math.floor(Math.random() * 50) + 10) % 10000);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredCases = CASE_STUDIES.filter((cs) => !filterTab || cs.category === filterTab);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#060810] text-white font-mono overflow-x-hidden"
      style={{ backgroundImage: "linear-gradient(135deg, #060810 0%, #0a1628 100%)" }}
    >
      {/* Fixed Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00ffcc10_0%,_transparent_70%)]" />
      </motion.div>

      {/* Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#00ffcc 1px, transparent 1px), linear-gradient(90deg, #00ffcc 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #00ffcc 0, #00ffcc 1px, transparent 1px, transparent 2px)" }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060810]/80 backdrop-blur-xl border-b border-[#00ffcc]/10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Shield className="w-6 h-6 text-[#00ffcc]" />
            <span className="font-bold text-lg">CIPHER_SHIELD</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#services" className="hover:text-[#00ffcc] transition-colors">Services</a>
            <a href="#clients" className="hover:text-[#00ffcc] transition-colors">Clients</a>
            <a href="#cases" className="hover:text-[#00ffcc] transition-colors">Cases</a>
            <a href="#faq" className="hover:text-[#00ffcc] transition-colors">FAQ</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 flex flex-col gap-4 text-sm">
              <a href="#services">Services</a>
              <a href="#clients">Clients</a>
              <a href="#cases">Cases</a>
              <a href="#faq">FAQ</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #00ffcc15, transparent)" }} />
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <Reveal delay={0}>
              <div className="text-[#00ffcc] text-sm font-bold mb-4 tracking-widest">// CYBER DEFENSE PLATFORM</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                THREAT DETECTION <br /> IN <span className="text-[#00ffcc]">REAL-TIME</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Enterprise-grade security for Fortune 500. Zero breaches. 99.9% detection rate.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <MagneticBtn>
                GET SECURITY AUDIT
              </MagneticBtn>
            </Reveal>

            {/* Live Threat Counter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="mt-16 p-8 bg-[#0a1628] border border-[#00ffcc]/20 rounded-lg inline-block">
              <div className="text-3xl font-bold text-[#00ffcc] font-mono">{threatCounter} THREATS/DAY</div>
              <div className="text-xs text-gray-500 mt-2">Live Detection</div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-20 px-6 bg-[#0a1628]">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">CORE SERVICES</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-[#060810] border border-[#00ffcc]/20 rounded-lg group hover:border-[#00ffcc]/40 transition-colors cursor-pointer">
                      <Icon className="w-8 h-8 text-[#00ffcc] mb-4 group-hover:animate-pulse" />
                      <h3 className="font-bold mb-4">{svc.title}</h3>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-400">Risk Score</div>
                        <LoadBar value={svc.risk} />
                        <div className="text-xs text-[#00ffcc]">{svc.risk}%</div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Client Logos Marquee */}
        <section id="clients" className="py-12">
          <Reveal>
            <InfiniteMarquee items={["FORTUNE 500", "TECH GIANTS", "FINANCIAL INSTITUTIONS", "GOVERNMENT AGENCIES", "HEALTHCARE NETWORKS"]} />
          </Reveal>
        </section>

        {/* Stats */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Reveal delay={0}>
                <Counter target={500} label="Clients Secured" />
              </Reveal>
              <Reveal delay={0.1}>
                <Counter target={10000} label="Threats Blocked/Day" />
              </Reveal>
              <Reveal delay={0.2}>
                <Counter target={99} label="% Detection Rate" />
              </Reveal>
              <Reveal delay={0.3}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#00ffcc] font-mono">0</div>
                  <div className="text-sm text-gray-400 mt-2">Confirmed Breaches</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="cases" className="py-20 px-6 bg-[#0a1628]">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-8 text-center">CASE STUDIES</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-3 mb-8 flex-wrap justify-center">
                {["Finance", "Healthcare", "Gov", "Retail"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterTab(cat)}
                    className={`px-4 py-2 rounded border transition-all ${
                      filterTab === cat
                        ? "bg-[#00ffcc] text-[#060810]"
                        : "border-[#00ffcc]/20 hover:border-[#00ffcc]/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCases.map((cs, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -4 }} className="p-6 bg-[#060810] border border-[#00ffcc]/20 rounded-lg hover:border-[#00ffcc]/40 transition-colors cursor-pointer">
                    <h3 className="font-bold mb-2">{cs.title}</h3>
                    <p className="text-xs text-[#00ffcc]">{cs.category} • {cs.year}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">CERTIFIED & COMPLIANT</h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {["ISO 27001", "SOC 2 Type II", "CISA", "NIST", "GDPR", "HIPAA"].map((cert, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="p-6 bg-[#0a1628] border border-[#00ffcc]/20 rounded-lg text-center">
                    <CheckCircle2 className="w-8 h-8 text-[#00ffcc] mx-auto mb-2" />
                    <p className="font-bold text-sm">{cert}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-6 bg-[#0a1628]">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">FREQUENTLY ASKED</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion />
            </Reveal>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-20 px-6 text-center">
          <Reveal>
            <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Enterprise?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-gray-400 mb-8">Get a free threat assessment in 24 hours.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticBtn>SCHEDULE AUDIT NOW</MagneticBtn>
          </Reveal>
        </section>
      </main>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #060810; }
        ::-webkit-scrollbar-thumb { background: #00ffcc; border-radius: 4px; }
      `}</style>
    </div>
  );
}
