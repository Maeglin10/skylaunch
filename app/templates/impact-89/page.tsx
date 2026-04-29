"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, Play, Pause, ChevronDown, Music, Users } from "lucide-react";

const SHOWS = [
  { id: 1, title: "Crime Files", genre: "True Crime", episodes: 124, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop" },
  { id: 2, title: "Tech Trends", genre: "Tech", episodes: 87, img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=300&auto=format&fit=crop" },
  { id: 3, title: "Business Bytes", genre: "Business", episodes: 156, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&auto=format&fit=crop" },
  { id: 4, title: "Laugh Track", genre: "Comedy", episodes: 203, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
  { id: 5, title: "Sports Talk", genre: "Sports", episodes: 167, img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=300&auto=format&fit=crop" },
  { id: 6, title: "Culture Cast", genre: "Comedy", episodes: 92, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop" },
];

const STATS = [
  { value: "2M", label: "Monthly Listeners" },
  { value: "48", label: "Active Shows" },
  { value: "850", label: "Total Episodes" },
  { value: "12", label: "Industry Awards" },
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
      <div className="text-4xl md:text-5xl font-bold text-[#f59e0b]">{count}M+</div>
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
      className="px-8 py-3 bg-[#6d28d9] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#6d28d9]/30 transition-shadow"
    >
      {children}
    </motion.button>
  );
}

function WaveBar() {
  return (
    <div className="flex items-center gap-1 h-12">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [8, Math.random() * 40 + 8, 8] }}
          transition={{ duration: 0.4, delay: i * 0.02, repeat: Infinity }}
          className="flex-1 bg-gradient-to-t from-[#6d28d9] to-[#f59e0b] rounded-sm"
        />
      ))}
    </div>
  );
}

function InfiniteMarquee({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden py-8 bg-[#1a1a2e]">
      <motion.div
        className="flex gap-12"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-gray-600 whitespace-nowrap font-bold text-sm">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: "Which platforms are supported?", a: "Apple Podcasts, Spotify, Google Podcasts, Amazon Music, and all major podcast apps." },
    { q: "Can I download episodes?", a: "Yes! Download unlimited episodes on premium membership." },
    { q: "How often are new episodes released?", a: "Varies by show - from weekly to daily updates. Check each show's schedule." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <motion.div key={i} className="border border-[#6d28d9]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full p-4 flex justify-between items-center bg-[#1a1a2e] hover:bg-[#262645] transition-colors"
          >
            <span className="text-left font-semibold text-sm">{faq.q}</span>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5 text-[#f59e0b]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#0f0f1e] border-t border-[#6d28d9]/10 p-4"
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

export default function ResonanceFMPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterGenre, setFilterGenre] = useState("All");
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveListeners, setLiveListeners] = useState(42000);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveListeners((prev) => Math.max(prev + Math.floor(Math.random() * 100) - 50, 35000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredShows = filterGenre === "All" ? SHOWS : SHOWS.filter((s) => s.genre === filterGenre);
  const genres = ["All", "True Crime", "Tech", "Business", "Comedy", "Sports"];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#0c0a14] via-[#1a1a2e] to-[#0c0a14] text-white overflow-x-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#6d28d920_0%,_#f59e0b10_50%,_transparent_100%)]" />
      </motion.div>

      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]"
        style={{ backgroundImage: "linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(90deg, #6d28d9 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0a14]/80 backdrop-blur-xl border-b border-[#6d28d9]/10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Music className="w-6 h-6 text-[#f59e0b]" />
            <span className="font-bold text-lg">RESONANCE FM</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#shows" className="hover:text-[#f59e0b] transition-colors">Shows</a>
            <a href="#featured" className="hover:text-[#f59e0b] transition-colors">Featured</a>
            <a href="#faq" className="hover:text-[#f59e0b] transition-colors">FAQ</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 flex flex-col gap-4 text-sm">
              <a href="#shows">Shows</a>
              <a href="#featured">Featured</a>
              <a href="#faq">FAQ</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="text-[#f59e0b] text-sm font-bold mb-4 tracking-widest">LIVE PODCAST NETWORK</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Your Daily <span className="text-[#f59e0b]">Audio</span> Escape
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">48 shows, 850+ episodes, 2M monthly listeners. Find your next favorite podcast.</p>
            </Reveal>

            {/* Live Counter */}
            <Reveal delay={0.3}>
              <div className="flex justify-center gap-4 mb-8">
                <div className="px-6 py-3 bg-[#6d28d9]/20 border border-[#6d28d9]/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">{liveListeners.toLocaleString()} listening now</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <MagneticBtn>EXPLORE NOW</MagneticBtn>
            </Reveal>
          </div>
        </section>

        {/* Featured Episode Player */}
        <section id="featured" className="py-20 px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#6d28d9]/20 to-[#f59e0b]/10 border border-[#6d28d9]/20 rounded-2xl p-8">
            <Reveal>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="text-[#f59e0b] text-sm font-bold mb-2">LATEST EPISODE</div>
                  <h3 className="text-2xl font-bold mb-4">Crime Files: The Unsolved Case</h3>
                  <p className="text-gray-400 mb-6">Episode 124 • 52 minutes • Season 4</p>
                  <WaveBar />
                </div>
                <div className="flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-[#f59e0b] text-[#0c0a14] rounded-full flex items-center justify-center"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </motion.button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Shows Grid */}
        <section id="shows" className="py-20 px-6 bg-[#1a1a2e]/50">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-8 text-center">SHOW ROSTER</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-3 mb-12 flex-wrap justify-center">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setFilterGenre(genre)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      filterGenre === genre
                        ? "bg-[#6d28d9] text-white"
                        : "border border-[#6d28d9]/30 hover:border-[#6d28d9]"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShows.map((show, i) => (
                <Reveal key={show.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-[#1a1a2e] border border-[#6d28d9]/20 rounded-xl overflow-hidden hover:border-[#6d28d9]/40 transition-colors"
                  >
                    <div className="relative h-40 bg-gray-900">
                      <Image
                        src={show.img}
                        alt={show.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#f59e0b] font-bold mb-2">{show.genre.toUpperCase()}</p>
                      <h3 className="font-bold mb-1">{show.title}</h3>
                      <p className="text-xs text-gray-500">{show.episodes} episodes</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors Marquee */}
        <section className="py-12">
          <Reveal>
            <InfiniteMarquee items={["Spotify", "Apple Podcasts", "Google", "Amazon Music", "Patreon", "Audible"]} />
          </Reveal>
        </section>

        {/* Stats */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Reveal delay={0}>
                <Counter target={2} label="Listeners" />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#f59e0b]">48</div>
                  <div className="text-sm text-gray-400 mt-2">Active Shows</div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#f59e0b]">850</div>
                  <div className="text-sm text-gray-400 mt-2">Episodes Total</div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#f59e0b]">12</div>
                  <div className="text-sm text-gray-400 mt-2">Awards Won</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-6 bg-[#1a1a2e]/50">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">FAQ</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion />
            </Reveal>
          </div>
        </section>

        {/* Subscribe CTA */}
        <section className="py-20 px-6 text-center">
          <Reveal>
            <h2 className="text-4xl font-bold mb-6">Never Miss an Episode</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-gray-400 mb-8">Subscribe on your favorite platform or join our premium network.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={() => setShowSubscribeModal(true)}
              className="px-8 py-3 bg-[#6d28d9] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#6d28d9]/30 transition-shadow"
            >
              SUBSCRIBE NOW
            </button>
          </Reveal>
        </section>
      </main>

      {/* Subscribe Modal */}
      <AnimatePresence>
        {showSubscribeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a2e] border border-[#6d28d9]/20 rounded-2xl p-8 max-w-md"
            >
              <h3 className="text-2xl font-bold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-6">Choose your favorite platform:</p>
              <div className="space-y-2">
                {["Apple Podcasts", "Spotify", "Google Podcasts", "Amazon Music"].map((platform) => (
                  <button
                    key={platform}
                    className="w-full p-3 border border-[#6d28d9]/30 rounded-lg hover:bg-[#6d28d9]/10 transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowSubscribeModal(false)}
                className="w-full mt-6 py-3 bg-[#6d28d9] rounded-lg font-bold"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0c0a14; }
        ::-webkit-scrollbar-thumb { background: #6d28d9; border-radius: 4px; }
      `}</style>
    </div>
  );
}
