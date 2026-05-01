"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BookOpen, ChevronDown, Menu, X, ArrowRight, ArrowUpRight, Clock, Tag } from "lucide-react";
import "../premium.css";

const ARTICLES = [
  { title: "The Architecture of Modern Attention", cat: "Culture", date: "Apr 18", read: "8 min", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop", featured: true },
  { title: "How Silence Became a Luxury Good", cat: "Society", date: "Apr 15", read: "6 min", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop", featured: false },
  { title: "The Return of the Printed Word", cat: "Media", date: "Apr 12", read: "10 min", img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop", featured: false },
  { title: "Notes on Craft in an Age of Generation", cat: "Tech", date: "Apr 8", read: "12 min", img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop", featured: false },
  { title: "Who Owns the Story Now?", cat: "Media", date: "Apr 2", read: "7 min", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop", featured: false },
];

const CATEGORIES = ["All", "Culture", "Society", "Media", "Tech", "Philosophy"];

const STATS = [
  { value: 2400000, suffix: "", label: "Monthly readers" },
  { value: 380, suffix: "+", label: "Published essays" },
  { value: 6, suffix: " years", label: "In circulation" },
  { value: 47, suffix: "", label: "Countries reached" },
];

const TESTIMONIALS = [
  { name: "Margot Leclaire", role: "Editor-in-Chief, Le Monde", quote: "The finest long-form journalism publishing today. Each piece is a small monument.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "James Harrington", role: "Cultural Critic, The Guardian", quote: "They publish what others are afraid to commission. That courage is increasingly rare.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Yuki Tanaka", role: "Media Researcher, MIT", quote: "A masterclass in editorial independence. No clickbait — only ideas that matter.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "How do you select your contributors?", a: "We accept pitches from any writer globally. Our editorial team evaluates solely on the quality and originality of the argument, regardless of the writer's credentials or platform." },
  { q: "Is there a paywall?", a: "We offer 5 free articles per month. An annual subscription gives unlimited access to our entire archive plus exclusive subscriber-only essays each week." },
  { q: "How can I contribute?", a: "Send a 200-word pitch to pitches@editorial.io. We respond to every submission within 14 days. If accepted, we work with you through editing to publication." },
  { q: "Do you accept advertising?", a: "We accept a small number of contextually relevant sponsors per month. All sponsorships are clearly labeled and never influence editorial decisions." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
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
    const inc = target / steps;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-black text-[#1a1a1a] mb-1">{count >= 1000000 ? `${(count / 1000000).toFixed(1)}M` : count.toLocaleString()}{suffix}</div>
      <div className="text-sm text-[#6b7280]">{label}</div>
    </div>
  );
}

export default function EditorialSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const filtered = activeCategory === "All" ? ARTICLES : ARTICLES.filter(a => a.cat === activeCategory);

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#1a1a1a] overflow-x-hidden">
      {/* Nav */}
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#fafaf8]/95 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center gap-2 font-serif">
          <BookOpen className="w-4 h-4" />
          <span className="font-bold text-lg tracking-tight">The Editorial</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm text-[#6b7280]">
          {["Culture", "Society", "Media", "Tech", "Archive"].map(item => (
            <a key={item} href="#" className="hover:text-[#1a1a1a] transition-colors">{item}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm text-[#6b7280] hover:text-[#1a1a1a] transition-colors">Sign in</a>
          <motion.button whileHover={{ scale: 1.02 }} className="px-5 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors">Subscribe</motion.button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed inset-0 z-40 bg-[#fafaf8] flex flex-col items-center justify-center gap-8 text-2xl font-serif">
            {["Culture", "Society", "Media", "Tech", "Archive"].map(item => <a key={item} href="#" onClick={() => setMenuOpen(false)}>{item}</a>)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative overflow-hidden pt-24">
        <motion.div style={{ y: heroY }} className="absolute inset-0 top-0">
          <Image src="https://images.unsplash.com/photo-1536523?w=800&q=80" alt="Editorial" fill className="object-cover opacity-8" unoptimized />
        </motion.div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm text-[#6b7280] uppercase tracking-widest mb-6">
            Independent. Unsponsored. Unfiltered.
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-6xl md:text-8xl font-black leading-none mb-8 font-serif">
            Ideas that
            <br />
            <em className="not-italic bg-gradient-to-r from-[#1a1a1a] to-[#6b7280] bg-clip-text text-transparent">deserve</em>
            <br />
            your time
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="text-xl text-[#6b7280] max-w-xl mb-10 leading-relaxed">
            Long-form essays, reported features, and criticism for readers who still believe in the paragraph.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-4">
            <motion.a href="#" whileHover={{ scale: 1.02 }} className="px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl flex items-center gap-2 hover:bg-black transition-colors">
              Start reading <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.02 }} className="px-8 py-4 border border-black/10 text-[#1a1a1a] font-bold rounded-xl hover:bg-black/5 transition-colors">
              Our mission
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-black/5 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>)}
        </div>
      </section>

      {/* Articles */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h2 className="text-3xl font-black font-serif">Latest essays</h2>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "bg-[#1a1a1a] text-white" : "bg-black/5 text-[#6b7280] hover:bg-black/10"}`}>
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.07} className={article.featured ? "md:col-span-2 lg:col-span-2" : ""}>
              <motion.a href="#" whileHover={{ y: -4 }} className="group block">
                <div className={`relative overflow-hidden rounded-2xl mb-4 ${article.featured ? "h-64 md:h-80" : "h-52"}`}>
                  <Image src={article.img} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-xs font-bold rounded-full text-[#1a1a1a]">{article.cat}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#9ca3af] mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.read}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>
                <h3 className={`font-black font-serif leading-tight group-hover:underline ${article.featured ? "text-2xl" : "text-lg"}`}>{article.title}</h3>
                <div className="mt-3 flex items-center gap-1 text-sm text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors">
                  Read essay <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><h2 className="text-4xl font-black font-serif mb-16">What readers say</h2></Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={activeT} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}>
              <p className="text-xl text-white/80 italic leading-relaxed mb-8 font-serif">"{TESTIMONIALS[activeT].quote}"</p>
              <div className="flex items-center justify-center gap-3">
                <Image src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} width={44} height={44} className="rounded-full object-cover" unoptimized />
                <div className="text-left">
                  <p className="font-bold text-sm">{TESTIMONIALS[activeT].name}</p>
                  <p className="text-white/50 text-xs">{TESTIMONIALS[activeT].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeT ? "bg-white" : "bg-white/20"}`} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 bg-white">
        <Reveal className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-black font-serif mb-4">Weekly dispatch</h2>
          <p className="text-[#6b7280] mb-8">One essay, every Sunday. No noise. Unsubscribe any time.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-black/30 bg-[#fafaf8]" />
            <motion.button whileHover={{ scale: 1.02 }} className="px-6 py-3 bg-[#1a1a1a] text-white font-bold text-sm rounded-xl hover:bg-black transition-colors whitespace-nowrap">Subscribe</motion.button>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12"><h2 className="text-3xl font-black font-serif">Questions</h2></Reveal>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-black/10 pb-4">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-2 text-left">
                  <span className="font-semibold text-[#1a1a1a]">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-[#9ca3af] shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="pt-2 text-[#6b7280] text-sm leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#1a1a1a]">
        <Reveal className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-5xl font-black font-serif mb-6">Join 2.4M readers who think</h2>
          <p className="text-white/60 text-lg mb-10">Full access to our archive, weekly digest, and exclusive subscriber essays.</p>
          <motion.button whileHover={{ scale: 1.04 }} className="px-10 py-5 bg-white text-black font-black text-lg rounded-2xl hover:bg-white/90 transition-colors flex items-center gap-2 mx-auto">
            Subscribe — €7/month <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Reveal>
      </section>

      <footer className="py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9ca3af] border-t border-black/5">
        <div className="flex items-center gap-2 font-bold text-[#1a1a1a] font-serif"><BookOpen className="w-4 h-4" />The Editorial</div>
        <p>© 2026 The Editorial. Independent journalism.</p>
        <div className="flex gap-6">{["About", "Privacy", "Contact", "Archive"].map(l => <a key={l} href="#" className="hover:text-[#1a1a1a] transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
