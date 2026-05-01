"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Terminal, Code2, Cpu, Database, GitBranch, Globe, ChevronDown, Menu, X, ArrowRight, Check, ChevronRight } from "lucide-react";
import "../premium.css";

const MODULES = [
  { icon: Terminal, title: "CLI Interface", desc: "Full-featured terminal with syntax highlighting, autocomplete, and bash-compatible scripting.", cmd: "$ skyterm --init" },
  { icon: Cpu, title: "Process Manager", desc: "Monitor and control system processes in real-time with kill, restart, and priority control.", cmd: "$ ps aux | grep sky" },
  { icon: Database, title: "DB Console", desc: "Query any database directly from the terminal with live schema inspection.", cmd: "$ db connect --uri $DB_URL" },
  { icon: GitBranch, title: "Git Bridge", desc: "Full git workflow without leaving terminal — commit, push, PR, review, merge.", cmd: "$ git push origin main" },
  { icon: Globe, title: "Network Tools", desc: "Built-in curl, netstat, traceroute, and custom HTTP client with JWT handling.", cmd: "$ curl -H 'Auth: $TOKEN'" },
  { icon: Code2, title: "Code Runner", desc: "Execute JS, Python, Rust, Go snippets inline with shared state and history.", cmd: "$ run --lang=rust main.rs" },
];

const LOGS_DEMO = [
  { time: "14:22:01", type: "INFO", msg: "SYSTEM_BOOT complete — 8 modules loaded" },
  { time: "14:22:04", type: "OK", msg: "DATABASE connection established [pg@localhost:5432]" },
  { time: "14:22:08", type: "WARN", msg: "Memory usage at 78% — consider scaling" },
  { time: "14:22:15", type: "INFO", msg: "Scheduled job BACKUP_DAILY queued [T+00:15]" },
  { time: "14:22:19", type: "OK", msg: "API endpoint /health — 200 OK [12ms]" },
  { time: "14:22:25", type: "INFO", msg: "User root@192.168.1.10 authenticated via SSH key" },
  { time: "14:22:31", type: "ERR", msg: "Retry #3 — upstream timeout [service: auth-proxy]" },
  { time: "14:22:36", type: "OK", msg: "auth-proxy restarted successfully — latency nominal" },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Dev users" },
  { value: 99.99, suffix: "%", label: "Uptime" },
  { value: 4, suffix: "ms", label: "Avg command exec" },
  { value: 200, suffix: "+", label: "Built-in tools" },
];

const PLANS = [
  { name: "Free", price: "0", desc: "Solo devs and side projects.", features: ["1 user", "CLI + process manager", "Community support", "10 saved sessions"], cta: "Get started", pop: false },
  { name: "Team", price: "29", desc: "Shared workspace for engineering teams.", features: ["Up to 20 users", "All modules", "Priority support", "Shared history", "RBAC"], cta: "Start trial", pop: true },
  { name: "Enterprise", price: "Custom", desc: "For large engineering orgs.", features: ["Unlimited users", "SSO/SAML", "Dedicated infra", "SLA 99.99%", "Audit logs"], cta: "Contact us", pop: false },
];

const TESTIMONIALS = [
  { name: "Liam O'Connor", role: "Staff Engineer, Stripe", quote: "Replaced my entire dotfiles setup. Terminal Console does everything better, faster, and without the config hell.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
  { name: "Priya Sharma", role: "DevOps Lead, Shopify", quote: "The database console alone is worth it. I've cancelled 3 other subscriptions since switching.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Alex Müller", role: "CTO, Finstack", quote: "Every engineer on our team uses this daily. Onboarding new devs went from days to hours.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "Does it work on Windows?", a: "Yes — Terminal Console runs natively on macOS, Linux, and Windows (via WSL2). A pure Windows PowerShell adapter is in beta for Q3 2026." },
  { q: "Is my data stored on your servers?", a: "No. All command history, sessions, and credentials are stored locally. We never see your data. Optional encrypted cloud sync is opt-in." },
  { q: "Can I use my own plugins?", a: "Absolutely. Terminal Console supports WASM plugins. The marketplace has 400+ community plugins. Building one takes about 10 minutes." },
  { q: "Is there a self-hosted option?", a: "Enterprise plan includes a self-hosted option with full source access, Docker image, and Kubernetes helm chart." },
];

const MARQUEE = ["$ git push", "$ docker build", "$ curl POST", "$ prisma migrate", "$ npm deploy", "$ ssh root@", "$ kubectl apply", "$ cargo run"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    let cur = 0;
    const t = setInterval(() => {
      cur += target / steps;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(parseFloat(cur.toFixed(target % 1 !== 0 ? 2 : 0)));
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  const display = target >= 1000 ? count.toLocaleString() : target % 1 !== 0 ? count.toFixed(2) : count.toString();
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-green-400 font-mono mb-1">{display}{suffix}</div>
      <div className="text-xs text-green-900 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function TerminalConsoleSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const [activeLog, setActiveLog] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 5000);
    const l = setInterval(() => setActiveLog(p => (p + 1) % LOGS_DEMO.length), 1200);
    return () => { clearInterval(t); clearInterval(l); };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e0a] text-green-400 overflow-x-hidden font-mono">
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(16,185,129,0.02) 3px, rgba(16,185,129,0.02) 4px)" }} />

      {/* Nav */}
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0e0a]/95 backdrop-blur-xl border-b border-green-900/30">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-bold">terminal<span className="text-green-600">.console</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs text-green-700">
          {["modules", "pricing", "docs", "status"].map(item => (
            <a key={item} href="#" className="hover:text-green-400 transition-colors">$ {item}</a>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} className="hidden md:block px-4 py-2 bg-green-400 text-black text-xs font-bold hover:bg-green-300 transition-colors">
          ./install.sh
        </motion.button>
        <button className="md:hidden text-green-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#0a0e0a] flex flex-col items-center justify-center gap-8">
            {["modules", "pricing", "docs", "status"].map(item => (
              <a key={item} href="#" className="text-green-400 text-xl" onClick={() => setMenuOpen(false)}>$ {item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-546819?w=800&q=80" alt="Terminal" fill className="object-cover opacity-5" unoptimized />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 text-green-600 text-xs mb-8">
            <span className="animate-pulse">█</span> v4.2.0 — STABLE — 50,000+ DEVS SHIPPING DAILY
          </motion.div>

          {/* Live log ticker */}
          <div className="mx-auto max-w-2xl mb-12 text-left bg-black/40 border border-green-900/40 rounded-xl p-4 overflow-hidden h-48">
            <div className="flex items-center gap-2 mb-3 border-b border-green-900/30 pb-2">
              <span className="w-3 h-3 rounded-full bg-red-500/60" /><span className="w-3 h-3 rounded-full bg-yellow-500/60" /><span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-green-700 text-xs ml-2">terminal.console — main</span>
            </div>
            {LOGS_DEMO.slice(0, 6).map((log, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: i <= activeLog ? 1 : 0.2 }} className="text-xs mb-1 flex gap-3">
                <span className="text-green-700 shrink-0">[{log.time}]</span>
                <span className={`shrink-0 ${log.type === "OK" ? "text-green-400" : log.type === "WARN" ? "text-yellow-400" : log.type === "ERR" ? "text-red-400" : "text-green-600"}`}>{log.type}</span>
                <span className="text-green-600">{log.msg}</span>
              </motion.div>
            ))}
          </div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-black leading-none mb-6 text-white">
            Your entire
            <br />
            <span className="text-green-400">dev workflow.</span>
            <br />
            One terminal.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-green-600 max-w-xl mx-auto mb-10 text-lg font-sans leading-relaxed">
            Terminal Console replaces your scattered tools with a single, blazing-fast environment. CLI, DB, git, network, and code runner — unified.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.02 }} className="px-8 py-4 bg-green-400 text-black font-black text-sm hover:bg-green-300 transition-colors flex items-center gap-2">
              ./install.sh <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} className="px-8 py-4 border border-green-900 text-green-400 text-sm font-bold hover:bg-green-900/20 transition-colors">
              $ docs --open
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-green-700" />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="py-4 border-y border-green-900/20 overflow-hidden">
        <motion.div className="flex gap-16 whitespace-nowrap" animate={{ x: [0, -2400] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="text-green-800 text-xs font-bold">{item}</span>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border border-green-900/30 p-12">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>)}
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-green-700 text-xs tracking-widest mb-3">// SYSTEM MODULES</p>
          <h2 className="text-4xl font-black text-white">Everything you need, loaded</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.01 }} className="p-6 border border-green-900/30 hover:border-green-600/30 transition-colors group">
                <m.icon className="w-5 h-5 text-green-400 mb-4" />
                <h3 className="font-bold text-white mb-2 text-sm">{m.title}</h3>
                <p className="text-green-700 text-xs leading-relaxed font-sans mb-4">{m.desc}</p>
                <code className="text-green-600 text-xs">{m.cmd}</code>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-green-700 text-xs tracking-widest mb-3">// PRICING</p>
          <h2 className="text-4xl font-black text-white">Choose your plan</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={`p-8 border flex flex-col ${p.pop ? "border-green-400 bg-green-950/20" : "border-green-900/30"}`}>
                {p.pop && <span className="self-start px-3 py-1 bg-green-400 text-black text-xs font-bold mb-4">POPULAR</span>}
                <h3 className="font-black text-white text-xl mb-1">{p.name}</h3>
                <p className="text-green-700 text-xs mb-4 font-sans">{p.desc}</p>
                <div className="text-4xl font-black text-white mb-6">{p.price === "Custom" ? p.price : `$${p.price}`}{p.price !== "Custom" && <span className="text-green-700 text-sm">/mo</span>}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map(f => <li key={f} className="flex items-center gap-2 text-xs text-green-600 font-sans"><Check className="w-3 h-3 text-green-400 shrink-0" />{f}</li>)}
                </ul>
                <motion.button whileHover={{ scale: 1.02 }} className={`py-3 font-bold text-xs transition-colors ${p.pop ? "bg-green-400 text-black hover:bg-green-300" : "border border-green-900 text-green-400 hover:bg-green-900/20"}`}>
                  {p.cta}
                </motion.button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <Reveal><p className="text-green-700 text-xs mb-3">// USER REPORTS</p></Reveal>
        <Reveal><h2 className="text-4xl font-black text-white mb-16">Devs love it</h2></Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={activeT} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <p className="text-lg text-green-600 font-sans italic mb-8 leading-relaxed">"{TESTIMONIALS[activeT].quote}"</p>
            <div className="flex items-center justify-center gap-3">
              <Image src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} width={44} height={44} className="rounded-full object-cover border border-green-900" unoptimized />
              <div className="text-left">
                <p className="text-white text-sm font-bold">{TESTIMONIALS[activeT].name}</p>
                <p className="text-green-700 text-xs">{TESTIMONIALS[activeT].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-6 h-px transition-colors ${i === activeT ? "bg-green-400" : "bg-green-900"}`} />)}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12"><p className="text-green-700 text-xs mb-3">// FAQ</p><h2 className="text-4xl font-black text-white">Common queries</h2></Reveal>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-green-900/30 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-green-900/10 transition-colors">
                  <span className="text-sm font-bold text-white">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-4 h-4 text-green-700 shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="px-5 pb-5 text-green-700 text-sm font-sans leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center border border-green-900/40 p-16">
            <p className="text-green-700 text-xs mb-4">// INITIALIZE</p>
            <h2 className="text-5xl font-black text-white mb-6">Ready to ship faster?</h2>
            <p className="text-green-700 font-sans mb-10">Install in 30 seconds. No account required for free tier.</p>
            <code className="block bg-black/40 border border-green-900/40 px-6 py-4 text-green-400 text-sm rounded mx-auto max-w-md mb-8">
              curl -fsSL https://terminal.console/install | bash
            </code>
            <motion.button whileHover={{ scale: 1.02 }} className="px-10 py-5 bg-green-400 text-black font-black flex items-center gap-2 mx-auto hover:bg-green-300 transition-colors">
              ./install.sh <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </Reveal>
      </section>

      <footer className="py-8 px-6 border-t border-green-900/20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-green-800">
        <div className="flex items-center gap-2 text-green-400"><Terminal className="w-4 h-4" />terminal.console</div>
        <p>© 2026 — MIT LICENSE — BUILT WITH ♥ BY DEVS, FOR DEVS</p>
        <div className="flex gap-6">{["docs", "github", "discord", "status"].map(l => <a key={l} href="#" className="hover:text-green-400 transition-colors">$ {l}</a>)}</div>
      </footer>
    </div>
  );
}
