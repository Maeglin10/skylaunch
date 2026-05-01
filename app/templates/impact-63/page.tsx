"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight, X, Menu, ChevronDown, TrendingUp, TrendingDown,
  Zap, Shield, Activity, Terminal, BarChart2, Lock,
} from "lucide-react";
import "../premium.css";

/* ─── DATA ─────────────────────────────────────────────── */
const ASSETS = [
  { symbol: "BTC/USD", price: "67,432.80", change: "+3.24%", up: true, vol: "42.1B" },
  { symbol: "ETH/USD", price: "3,891.55", change: "+1.87%", up: true, vol: "18.6B" },
  { symbol: "SOL/USD", price: "182.40", change: "-0.93%", up: false, vol: "4.2B" },
  { symbol: "ARB/USD", price: "1.24", change: "+8.11%", up: true, vol: "920M" },
  { symbol: "AVAX/USD", price: "38.72", change: "-1.55%", up: false, vol: "2.1B" },
];

const FEATURES = [
  { icon: <Zap className="w-5 h-5" />, title: "Sub-millisecond Execution", desc: "Co-located servers across 12 global data centers ensure latency below 0.3ms on all order types." },
  { icon: <Shield className="w-5 h-5" />, title: "MPC Cold Storage", desc: "Multi-party computation wallets with threshold signing and 98% cold storage by default." },
  { icon: <Activity className="w-5 h-5" />, title: "Deep Liquidity Pools", desc: "Aggregated order books from 24 institutional market makers with $400B+ monthly flow." },
  { icon: <BarChart2 className="w-5 h-5" />, title: "Quantitative Analytics", desc: "On-chain order flow imbalance, funding rate heatmaps, and liquidation cascade detection." },
  { icon: <Terminal className="w-5 h-5" />, title: "Algorithmic API", desc: "REST and WebSocket API with FIX protocol support for institutional algorithmic strategies." },
  { icon: <Lock className="w-5 h-5" />, title: "Regulatory Compliance", desc: "Registered with FINMA, FCA, and MAS. Full KYC/AML pipeline with real-time screening." },
];

const FAQS = [
  { q: "What asset classes are supported?", a: "We support spot and derivatives trading across 300+ cryptocurrency pairs, tokenized commodities, and synthetic equity indices. Perpetual futures with up to 100x leverage are available to verified institutional accounts." },
  { q: "How is custody handled for large positions?", a: "Assets above $500K are automatically swept to MPC cold wallets with 3-of-5 threshold signing. Insurance coverage of $500M is provided through Lloyd's of London syndicate partners." },
  { q: "What are the maker/taker fees?", a: "Maker fees start at 0.02% and taker fees at 0.05% for retail. Institutional accounts enjoy tiered discounts starting at $5M monthly volume, with custom market-making agreements available." },
  { q: "Do you offer an institutional API?", a: "Yes. Our FIX 4.4 and REST API supports co-location within our primary data centers. Average round-trip latency is 0.28ms. WebSocket subscriptions support up to 200 streams per connection." },
];

const STATS = [
  { value: 400, label: "Monthly Volume", suffix: "B+" },
  { value: 2, label: "Registered Users", suffix: "M+" },
  { value: 300, label: "Trading Pairs", suffix: "+" },
  { value: 99, label: "Uptime SLA", suffix: ".9%" },
];

const MARQUEE_ITEMS = [
  "BTC +3.24%", "ETH +1.87%", "SOL -0.93%", "ARB +8.11%", "AVAX -1.55%",
  "MATIC +2.30%", "LINK +4.70%", "INJ +12.4%", "TIA +5.80%", "NEAR +1.20%",
  "BTC +3.24%", "ETH +1.87%", "SOL -0.93%", "ARB +8.11%", "AVAX -1.55%",
  "MATIC +2.30%", "LINK +4.70%", "INJ +12.4%", "TIA +5.80%", "NEAR +1.20%",
];

/* ─── SHARED COMPONENTS ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 20);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function MagneticBtn({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, [x, y]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ─── TICKER ─────────────────────────────────────────────── */
function LiveTicker() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="overflow-hidden bg-[#050d05]/80 border-b border-[#00ff9d]/10 py-2.5">
      <motion.div
        animate={{ x: [0, -2400] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap font-mono"
      >
        {MARQUEE_ITEMS.map((item, i) => {
          const up = item.includes("+");
          return (
            <span key={i + tick * 0.0001} className={`text-[11px] font-bold flex-shrink-0 ${up ? "text-[#00ff9d]" : "text-[#ff4560]"}`}>
              {item}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────── */
export default function IndexListSPA() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="premium-theme bg-[#060c08] text-[#e8f5e9] min-h-screen font-mono overflow-x-hidden selection:bg-[#00ff9d] selection:text-black">

      {/* ── TICKER ────────────────────────────────────────── */}
      <LiveTicker />

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="sticky top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-14 py-4 bg-[#060c08]/95 backdrop-blur-xl border-b border-[#00ff9d]/8">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#00ff9d] rounded flex items-center justify-center">
            <Activity className="w-4 h-4 text-black" />
          </div>
          <span className="text-base font-bold tracking-tight text-[#e8f5e9]">Krypta<span className="text-[#00ff9d]">X</span></span>
          <span className="hidden md:inline text-[10px] text-[#00ff9d]/40 border border-[#00ff9d]/20 px-2 py-0.5">BETA</span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] text-[#e8f5e9]/40">
          {["Markets", "Trade", "Earn", "Institutional", "API"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00ff9d] transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-[#e8f5e9]/50 hover:text-[#00ff9d] transition-colors">Log In</button>
          <MagneticBtn
            onClick={() => setSignupOpen(true)}
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#00ff9d] text-black text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#00e68a] transition-colors"
          >
            Start Trading
          </MagneticBtn>
          <button className="md:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5 text-[#e8f5e9]" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE NAV ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#030806] flex flex-col justify-center items-center gap-8"
          >
            <button className="absolute top-5 right-6" onClick={() => setMobileOpen(false)}>
              <X className="w-6 h-6 text-[#e8f5e9]" />
            </button>
            {["Markets", "Trade", "Earn", "Institutional", "API"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.15 }}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-bold text-[#e8f5e9] uppercase tracking-widest hover:text-[#00ff9d] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SIGNUP MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {signupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSignupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="bg-[#080f0a] border border-[#00ff9d]/15 rounded-2xl p-10 max-w-md w-full shadow-[0_0_80px_rgba(0,255,157,0.05)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#00ff9d]/60 mb-1">Create Account</div>
                  <h2 className="text-xl font-bold text-[#e8f5e9]">Start Trading in Minutes</h2>
                </div>
                <button onClick={() => setSignupOpen(false)} className="w-8 h-8 border border-[#e8f5e9]/10 flex items-center justify-center hover:border-[#00ff9d]/40 transition-colors">
                  <X className="w-4 h-4 text-[#e8f5e9]/50" />
                </button>
              </div>
              <div className="space-y-4">
                {[["Email", "email", "trader@example.com"], ["Password", "password", "••••••••••"], ["Referral Code", "text", "Optional"]].map(([label, type, placeholder]) => (
                  <div key={label as string}>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-[#e8f5e9]/35 block mb-2">{label as string}</label>
                    <input type={type as string} placeholder={placeholder as string} className="w-full bg-[#e8f5e9]/4 border border-[#00ff9d]/12 text-[#e8f5e9] placeholder-[#e8f5e9]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#00ff9d]/50 transition-colors font-mono" />
                  </div>
                ))}
                <MagneticBtn className="w-full py-4 bg-[#00ff9d] text-black font-bold text-sm uppercase tracking-[0.15em] hover:bg-[#00e68a] transition-colors mt-2">
                  Create Account <ArrowRight className="w-4 h-4 inline ml-2" />
                </MagneticBtn>
                <p className="text-[10px] text-center text-[#e8f5e9]/25 leading-relaxed">By continuing you agree to our Terms of Service and acknowledge our Privacy Policy.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-14 pt-16">
        <motion.div style={{ y: heroY }} className="absolute inset-0 opacity-[0.04]">
          <Image
            src="https://images.unsplash.com/photo-1536482?w=800&q=80"
            alt="Trading interface"
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,157,0.04)_0%,transparent_70%)]" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-4xl py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/70">Markets Open · 24/7/365</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-[7vw] font-bold text-[#e8f5e9] leading-[0.9] mb-8 tracking-tight">
              Trade the Edge.<br />
              <span className="text-[#00ff9d]">Own the Signal.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base text-[#e8f5e9]/45 leading-relaxed mb-10 max-w-xl">
              Institutional-grade infrastructure, sub-millisecond execution, and deep on-chain analytics — built for traders who demand absolute precision and absolute control.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-16">
              <MagneticBtn
                onClick={() => setSignupOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-[#00ff9d] text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#00e68a] transition-colors shadow-[0_0_40px_rgba(0,255,157,0.2)]"
              >
                Start Trading <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center gap-2 px-8 py-4 border border-[#00ff9d]/20 text-[#00ff9d]/70 text-[11px] uppercase tracking-[0.2em] hover:border-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors">
                <Terminal className="w-4 h-4" /> View API Docs
              </button>
            </div>
          </Reveal>
          {/* Live asset cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {ASSETS.map((a, i) => (
              <Reveal key={a.symbol} delay={i * 0.05}>
                <div className="border border-[#00ff9d]/8 p-4 hover:border-[#00ff9d]/25 transition-colors bg-[#060c08]/80">
                  <div className="text-[10px] text-[#e8f5e9]/30 uppercase tracking-[0.2em] mb-2">{a.symbol}</div>
                  <div className="text-sm font-bold text-[#e8f5e9] mb-1">${a.price}</div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${a.up ? "text-[#00ff9d]" : "text-[#ff4560]"}`}>
                    {a.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {a.change}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-[#030806] border-y border-[#00ff9d]/8 py-16 px-6 md:px-14">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl font-bold text-[#00ff9d] mb-2 tabular-nums">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#e8f5e9]/30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section id="trade" className="px-6 md:px-14 py-24">
        <Reveal className="mb-16">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/60 block mb-4">Infrastructure</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#e8f5e9] leading-tight">
            Built for<br /><span className="text-[#00ff9d]">Professionals.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ borderColor: "rgba(0,255,157,0.35)" }}
                className="p-7 border border-[#00ff9d]/8 hover:bg-[#00ff9d]/2 transition-all group cursor-default"
              >
                <div className="w-10 h-10 bg-[#00ff9d]/8 flex items-center justify-center mb-5 group-hover:bg-[#00ff9d]/15 transition-colors">
                  <span className="text-[#00ff9d]">{f.icon}</span>
                </div>
                <h3 className="font-bold text-[#e8f5e9] text-sm mb-3 uppercase tracking-[0.1em]">{f.title}</h3>
                <p className="text-[11px] text-[#e8f5e9]/35 leading-relaxed">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PLATFORM VISUAL ───────────────────────────────── */}
      <section className="px-6 md:px-14 py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <Reveal delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden border border-[#00ff9d]/12 shadow-[0_0_80px_rgba(0,255,157,0.05)] aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1536482?w=800&q=80"
              alt="Trading platform"
              fill
              unoptimized
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#060c08]/80 to-transparent" />
            <div className="absolute top-6 left-6 right-6 font-mono">
              <div className="text-[10px] text-[#00ff9d]/50 uppercase tracking-[0.3em] mb-3">// LIVE ORDER BOOK</div>
              {[["67,450", "1.243 BTC", "ask"], ["67,432", "0.891 BTC", "mid"], ["67,418", "2.130 BTC", "bid"]].map(([price, size, side]) => (
                <div key={price} className={`flex justify-between py-1.5 border-b border-[#e8f5e9]/4 text-[11px] ${side === "ask" ? "text-[#ff4560]/80" : side === "bid" ? "text-[#00ff9d]/80" : "text-[#e8f5e9]/60"}`}>
                  <span className="font-bold">${price}</span>
                  <span className="opacity-60">{size}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#060c08]/90 border border-[#00ff9d]/10 text-[11px] font-mono">
              <span className="text-[#00ff9d]/60">EXEC</span> <span className="text-[#e8f5e9]/80">BUY 1.00 BTC @ MARKET</span> <span className="text-[#00ff9d]">FILLED 0.28ms</span>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/60 block mb-4">The Trading Engine</span>
            <h2 className="text-4xl font-bold text-[#e8f5e9] leading-tight mb-8">
              Zero Latency.<br /><span className="text-[#00ff9d]">Maximum Control.</span>
            </h2>
            <p className="text-[#e8f5e9]/40 text-sm leading-relaxed mb-8">
              Our matching engine processes 1.2 million orders per second with deterministic sequencing. Smart order routing automatically selects the best execution path across integrated liquidity venues.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-4">
              {[["Order Types", "Market, Limit, Stop, Trailing Stop, TWAP, VWAP"], ["Position Modes", "One-way & Hedge, with portfolio margin netting"], ["Instruments", "Spot, Perpetuals, Quarterly Futures, Options"], ["Leverage", "Up to 100x on majors, 25x on mid-caps"]].map(([label, value]) => (
                <div key={label} className="flex items-start gap-4 border-b border-[#00ff9d]/6 pb-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#00ff9d]/40 w-28 flex-shrink-0 pt-0.5">{label}</div>
                  <div className="text-[11px] text-[#e8f5e9]/55 leading-relaxed">{value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="bg-[#030806] border-y border-[#00ff9d]/8 px-6 md:px-14 py-20">
        <Reveal className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/60 block mb-3">Traders Who Know</span>
          <h2 className="text-3xl font-bold text-[#e8f5e9]">Built for Those Who Demand More.</h2>
        </Reveal>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { quote: "KryptaX execution is genuinely sub-millisecond. We benchmarked 11 venues — nothing comes close at this latency tier.", author: "M. Kovacs", role: "Prop Desk, ZH" },
            { quote: "The FIX API implementation is clean, the documentation is exceptional, and the uptime over 18 months has been 100%.", author: "T. Nakamura", role: "Algo Strategy, TK" },
            { quote: "MPC cold storage with real-time proof-of-reserve. First platform I've seen that makes institutional-grade custody feel native.", author: "J. Osei", role: "Digital Asset Fund, LN" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border border-[#00ff9d]/10 p-7 hover:border-[#00ff9d]/25 transition-colors">
                <p className="text-[#e8f5e9]/50 text-[11px] leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-[#e8f5e9] text-xs">{t.author}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#00ff9d]/40">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section id="institutional" className="px-6 md:px-14 py-20 max-w-4xl mx-auto">
        <Reveal className="mb-14">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/60 block mb-3">Documentation</span>
          <h2 className="text-3xl font-bold text-[#e8f5e9]">Technical Q&A.</h2>
        </Reveal>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-[#00ff9d]/8 overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-[#00ff9d]/3 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-[#e8f5e9] text-[11px] font-bold uppercase tracking-[0.15em] pr-4">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4 text-[#00ff9d]/50 flex-shrink-0" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[#e8f5e9]/40 text-[11px] leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="px-6 md:px-14 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,157,0.05)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d]/8 border border-[#00ff9d]/15 text-[#00ff9d] text-[10px] uppercase tracking-[0.3em] mb-8">
              <span className="w-1.5 h-1.5 bg-[#00ff9d] rounded-full animate-pulse" />
              Institutional Accounts Available
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#e8f5e9] mb-6 leading-tight">
              Ready to<br /><span className="text-[#00ff9d]">Execute?</span>
            </h2>
            <p className="text-[#e8f5e9]/40 mb-10 leading-relaxed text-sm">
              Create an account in under 3 minutes. Full KYC, institutional onboarding, and API access available from day one.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticBtn
                onClick={() => setSignupOpen(true)}
                className="flex items-center justify-center gap-2 px-10 py-4 bg-[#00ff9d] text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#00e68a] transition-colors shadow-[0_0_40px_rgba(0,255,157,0.2)]"
              >
                Create Free Account <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center justify-center gap-2 px-10 py-4 border border-[#00ff9d]/20 text-[#00ff9d]/70 text-[11px] uppercase tracking-[0.2em] hover:border-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors">
                <BarChart2 className="w-4 h-4" /> Institutional Inquiry
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#030806] border-t border-[#00ff9d]/8 py-8 px-6 md:px-14 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#e8f5e9]/20">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#00ff9d]" />
          <span>KryptaX © 2026</span>
        </div>
        <span>Markets · Trade · API · Compliance</span>
        <span className="text-[#ff4560]/40">Trading involves risk of loss · Not financial advice</span>
      </footer>

      <style>{`::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #060c08; } ::-webkit-scrollbar-thumb { background: #00ff9d55; }`}</style>
    </div>
  );
}
