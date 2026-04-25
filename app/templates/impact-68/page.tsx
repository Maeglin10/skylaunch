"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

/* ── Reveal ──────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Counter ─────────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      setCount((c) => {
        if (c + step >= target) { clearInterval(id); return target; }
        return c + step;
      });
    }, 22);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── MagneticBtn ─────────────────────────────────────────── */
function MagneticBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 18 });
  const sy = useSpring(my, { stiffness: 200, damping: 18 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = btnRef.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }, [mx, my]);
  const onMouseLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.button
      ref={btnRef}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ── Data ────────────────────────────────────────────────── */
const NFT_DROPS = [
  {
    id: 1,
    title: "Void Genesis #001",
    artist: "0xSerpentine",
    price: "2.4 ETH",
    edition: "1 of 1",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
  },
  {
    id: 2,
    title: "Neural Bloom #042",
    artist: "Aiko.eth",
    price: "0.88 ETH",
    edition: "10 of 100",
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
  },
  {
    id: 3,
    title: "Chrome Epoch #007",
    artist: "MECHASOUL",
    price: "1.2 ETH",
    edition: "3 of 50",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-amber-400 via-orange-500 to-rose-600",
  },
  {
    id: 4,
    title: "Prism Cascade #019",
    artist: "Lux Protocol",
    price: "0.44 ETH",
    edition: "22 of 200",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
  },
];

const FAQS = [
  {
    q: "What blockchain does NEXUS run on?",
    a: "NEXUS is a multi-chain marketplace supporting Ethereum mainnet, Polygon, and Base. Artists choose their preferred chain at mint time.",
  },
  {
    q: "How do creator royalties work?",
    a: "Creators earn up to 10% royalty on every secondary sale, enforced on-chain via ERC-2981 and NEXUS smart contracts.",
  },
  {
    q: "What wallets are supported?",
    a: "MetaMask, WalletConnect v2, Coinbase Wallet, and Phantom (for Solana collections). Hardware wallets via Ledger bridge.",
  },
  {
    q: "Is there an artist application process?",
    a: "Yes — we curate every artist. Apply via the Creator Portal. Response time is 7 business days. We accept 15–20 new artists per month.",
  },
];

const MARQUEE_ITEMS = [
  "DIGITAL ART",
  "ON-CHAIN PROVENANCE",
  "CREATOR ROYALTIES",
  "MULTI-CHAIN",
  "CURATED DROPS",
  "GENERATIVE AI",
  "1 OF 1 EDITIONS",
];

/* ── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Drops", "Collections", "Artists", "About"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 bg-[#05030f]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="font-black tracking-tighter text-xl text-white">
          NEXUS<span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">.</span>
        </Link>
        <ul className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-widest text-white/40">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-white transition-colors">{l}</a>
            </li>
          ))}
        </ul>
        <MagneticBtn className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:from-violet-500 hover:to-fuchsia-500 transition-all">
          Connect Wallet
        </MagneticBtn>
        <button className="md:hidden text-white" onClick={() => setOpen(true)} aria-label="Open menu">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="8" width="20" height="2" fill="currentColor" />
            <rect x="4" y="14" width="14" height="2" fill="currentColor" />
            <rect x="4" y="20" width="20" height="2" fill="currentColor" />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="fixed inset-0 z-[200] bg-[#05030f] flex flex-col p-10"
          >
            <button onClick={() => setOpen(false)} className="self-end text-white/30 hover:text-white mb-16 text-3xl">×</button>
            {links.map((l, i) => (
              <motion.a
                key={l}
                href="#"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => setOpen(false)}
                className="text-5xl font-black text-white/80 hover:text-fuchsia-400 uppercase tracking-tighter mb-6 transition-colors"
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#05030f]">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2400"
          alt="Hero NFT"
          fill
          unoptimized
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05030f]/60 via-transparent to-[#05030f]" />
      </motion.div>

      {/* Gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-[700px] h-[700px] rounded-full bg-violet-600/20 blur-[150px] -translate-x-40"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
        className="absolute w-[500px] h-[500px] rounded-full bg-fuchsia-500/20 blur-[120px] translate-x-40"
      />

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-fuchsia-400 text-xs font-black uppercase tracking-[0.5em] mb-6"
        >
          The curated NFT marketplace — 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[15vw] md:text-[10vw] font-black tracking-tighter text-white leading-none uppercase"
        >
          OWN THE
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            FUTURE.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.75 }}
          className="mt-8 text-white/50 text-sm uppercase tracking-widest max-w-sm mx-auto"
        >
          Rare digital art with on-chain provenance and lifetime creator royalties
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex gap-4 justify-center flex-wrap"
        >
          <MagneticBtn className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black uppercase text-xs tracking-widest rounded-full hover:from-violet-500 hover:to-fuchsia-500 transition-all">
            Explore Drops
          </MagneticBtn>
          <MagneticBtn className="px-8 py-4 border border-white/15 text-white font-black uppercase text-xs tracking-widest rounded-full hover:border-fuchsia-500 hover:text-fuchsia-400 transition-colors">
            Apply as Artist
          </MagneticBtn>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25"
      >
        <div className="w-px h-12 bg-white" />
        <span className="text-white text-[9px] font-black uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden py-4 bg-white/3 border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -2400] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {items.map((w, i) => (
          <span key={i} className="text-white/30 font-black uppercase text-xs tracking-widest mx-8 select-none">
            {w} <span className="text-fuchsia-500/40 mx-2">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Stats ───────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: 48, suffix: "k+", label: "Artworks" },
    { value: 12, suffix: "k+", label: "Artists" },
    { value: 340, suffix: "k", label: "ETH Traded" },
    { value: 98, suffix: "%", label: "On-Chain" },
  ];
  return (
    <section className="bg-[#07040f] py-24 px-8 border-b border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <p className="text-white/30 text-[11px] uppercase tracking-widest font-black">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── NFT Grid ────────────────────────────────────────────── */
function NFTGrid() {
  const [activeModal, setActiveModal] = useState<(typeof NFT_DROPS)[0] | null>(null);

  return (
    <section className="bg-[#05030f] py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-fuchsia-400 text-xs font-black uppercase tracking-[0.5em] mb-3">
            Live Drops
          </p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase">
            This
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Season.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NFT_DROPS.map((nft, i) => (
            <Reveal key={nft.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onClick={() => setActiveModal(nft)}
                className="group relative overflow-hidden rounded-2xl bg-white/4 border border-white/8 hover:border-fuchsia-500/50 cursor-pointer transition-colors"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={nft.img}
                    alt={nft.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${nft.gradient} opacity-30 mix-blend-screen`} />
                </div>
                <div className="p-5">
                  <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-0.5">{nft.artist}</p>
                  <h3 className="text-white font-black text-sm mb-3 truncate">{nft.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-fuchsia-400 font-black text-sm">{nft.price}</span>
                    <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">{nft.edition}</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0e0a1a] rounded-3xl overflow-hidden max-w-md w-full border border-white/10"
            >
              <div className="relative h-64">
                <Image src={activeModal.img} alt={activeModal.title} fill unoptimized className="object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${activeModal.gradient} opacity-40 mix-blend-screen`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a1a]" />
              </div>
              <div className="p-8">
                <p className="text-fuchsia-400 text-[10px] font-black uppercase tracking-widest mb-2">{activeModal.artist} · {activeModal.edition}</p>
                <h2 className="text-3xl font-black text-white tracking-tighter mb-4">{activeModal.title}</h2>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  A rare generative work minted on-chain. Provenance immutably recorded. Resale
                  royalties guaranteed at the contract level.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{activeModal.price}</span>
                  <MagneticBtn className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black uppercase text-xs tracking-widest rounded-full hover:from-violet-500 hover:to-fuchsia-500 transition-all">
                    Place Bid
                  </MagneticBtn>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Feature / Parallax ──────────────────────────────────── */
function Feature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#080511] py-36">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=2400"
          alt="Feature"
          fill
          unoptimized
          className="object-cover opacity-10"
        />
      </motion.div>
      <div className="relative z-10 max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
        <Reveal>
          <p className="text-fuchsia-400 text-xs font-black uppercase tracking-[0.5em] mb-4">For Collectors</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-8">
            Own it.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Forever.
            </span>
          </h2>
          <p className="text-white/40 leading-relaxed mb-8 max-w-md">
            Every NEXUS piece is tied to an immutable on-chain certificate. No platform lock-in,
            no third-party dependency — you hold the key.
          </p>
          <MagneticBtn className="px-8 py-4 border border-fuchsia-500/40 text-fuchsia-400 font-black uppercase text-xs tracking-widest rounded-full hover:border-fuchsia-400 hover:bg-fuchsia-500/10 transition-all">
            Start Collecting
          </MagneticBtn>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "On-Chain Cert", d: "ERC-721 standard" },
              { n: "Royalties", d: "Up to 10% forever" },
              { n: "Multi-Chain", d: "ETH · Polygon · Base" },
              { n: "Insured", d: "Lloyd's of London" },
            ].map((feat) => (
              <div key={feat.n} className="p-5 bg-white/3 border border-white/6 rounded-2xl hover:border-fuchsia-500/30 transition-colors">
                <p className="text-fuchsia-400 text-[9px] font-black uppercase tracking-widest mb-1">{feat.d}</p>
                <p className="text-white text-sm font-black">{feat.n}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-[#05030f] py-28 px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-14">
          <p className="text-fuchsia-400 text-xs font-black uppercase tracking-[0.5em] mb-3">Questions</p>
          <h2 className="text-5xl font-black text-white tracking-tighter">FAQ</h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border border-white/8 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-white font-black pr-6">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-fuchsia-400 text-2xl font-thin flex-shrink-0"
                  >+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-white/40 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#03020a] border-t border-white/5 pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          <div>
            <h3 className="text-white font-black tracking-tighter text-3xl mb-4">
              NEXUS<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">.</span>
            </h3>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              The curated marketplace for rare digital art with immutable on-chain provenance.
            </p>
          </div>
          {[
            { title: "Marketplace", links: ["Browse", "Live Auctions", "New Drops", "Trending"] },
            { title: "Creators", links: ["Apply", "Resources", "Community", "Support"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-fuchsia-400/60 text-[10px] font-black uppercase tracking-widest mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-white/30 text-sm hover:text-fuchsia-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-xs uppercase tracking-widest">© 2026 NEXUS. All rights reserved.</p>
          <p className="text-white/10 text-xs uppercase tracking-widest">Template impact-68</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function PortfolioCircularScroll() {
  return (
    <div className="premium-theme bg-[#05030f] text-white overflow-x-hidden selection:bg-fuchsia-500/30">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <NFTGrid />
      <Feature />
      <FAQ />
      <Footer />
    </div>
  );
}
