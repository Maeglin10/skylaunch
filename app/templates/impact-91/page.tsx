"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, Zap, ChevronDown } from "lucide-react";

const EXPERIENCES = [
  { id: 1, title: "BeatSaber Elite", cat: "Gaming", rating: "4.9★", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Corporate Training VR", cat: "Training", rating: "4.8★", img: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Social Metaverse", cat: "Social", rating: "4.7★", img: "https://images.unsplash.com/photo-1535016120754-be0045b9a9f8?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Medical Simulation", cat: "Medical", rating: "4.9★", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Architecture Explorer", cat: "Gaming", rating: "4.8★", img: "https://images.unsplash.com/photo-1577720633775-b5c3b80c68d3?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "Language Learning VR", cat: "Training", rating: "4.6★", img: "https://images.unsplash.com/photo-1563089145-599ba351e4da?q=80&w=400&auto=format&fit=crop" },
  { id: 7, title: "Fitness Challenge", cat: "Gaming", rating: "4.7★", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop" },
  { id: 8, title: "Therapy Sessions", cat: "Medical", rating: "4.8★", img: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=400&auto=format&fit=crop" },
];

const PLATFORMS = [
  { name: "Meta Quest", icon: "Q" },
  { name: "PlayStation VR", icon: "P" },
  { name: "Valve Index", icon: "V" },
  { name: "PC VR", icon: "C" },
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
      <div className="text-4xl md:text-5xl font-bold text-[#e879f9]">{count.toLocaleString()}M</div>
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
      className="px-8 py-3 bg-[#8b5cf6] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#8b5cf6]/30 transition-shadow"
    >
      {children}
    </motion.button>
  );
}

function FloatingElement({ delay }: { delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity }}
      className="absolute w-20 h-20 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#e879f9] opacity-20"
      style={{ perspective: "1000px" }}
    />
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: "What hardware do I need?", a: "Meta Quest 3 or later, PlayStation VR, or PC with SteamVR. Mobile VR headsets also supported." },
    { q: "Do I need internet for experiences?", a: "Most experiences support offline play. Optional online features require broadband connection." },
    { q: "Is there a subscription model?", a: "Free experiences + premium tier at $9.99/month for exclusive content and early access." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <motion.div key={i} className="border border-[#8b5cf6]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full p-4 flex justify-between items-center bg-[#1a0f2e] hover:bg-[#241a3f] transition-colors"
          >
            <span className="text-left font-semibold text-sm">{faq.q}</span>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5 text-[#e879f9]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#050208] border-t border-[#8b5cf6]/10 p-4"
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

export default function VoxelPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState<(typeof EXPERIENCES)[0] | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const filteredExperiences = filterCat === "All" ? EXPERIENCES : EXPERIENCES.filter((e) => e.cat === filterCat);
  const categories = ["All", "Gaming", "Training", "Social", "Medical"];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#050208] via-[#1a0f2e] to-[#050208] text-white overflow-x-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#8b5cf650_0%,_#e879f950_50%,_transparent_100%)]" />
      </motion.div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <FloatingElement key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050208]/80 backdrop-blur-xl border-b border-[#8b5cf6]/10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Zap className="w-6 h-6 text-[#e879f9]" />
            <span className="font-bold text-lg">VOXEL</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#experiences" className="hover:text-[#e879f9] transition-colors">Experiences</a>
            <a href="#platforms" className="hover:text-[#e879f9] transition-colors">Platforms</a>
            <a href="#faq" className="hover:text-[#e879f9] transition-colors">FAQ</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 flex flex-col gap-4 text-sm">
              <a href="#experiences">Experiences</a>
              <a href="#platforms">Platforms</a>
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
              <div className="text-[#e879f9] text-sm font-bold mb-4 tracking-widest">IMMERSIVE VR/XR STUDIO</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                The Future is <span className="text-transparent" style={{ WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(135deg, #8b5cf6, #e879f9)" }}>Immersive</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">2M downloads. 50 experiences. 4.8★ average rating. Changing how people interact.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <MagneticBtn>EXPLORE CATALOG</MagneticBtn>
            </Reveal>
          </div>
        </section>

        {/* Experiences Grid */}
        <section id="experiences" className="py-20 px-6 bg-[#1a0f2e]/30">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-8 text-center">EXPERIENCE CATALOG</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-3 mb-12 flex-wrap justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      filterCat === cat
                        ? "bg-[#8b5cf6] text-white"
                        : "border border-[#8b5cf6]/30 hover:border-[#8b5cf6]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredExperiences.map((exp, i) => (
                <Reveal key={exp.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedExperience(exp)}
                    className="bg-[#1a0f2e] border border-[#8b5cf6]/20 rounded-xl overflow-hidden hover:border-[#8b5cf6]/40 transition-colors cursor-pointer"
                  >
                    <div className="relative h-40 bg-gray-900">
                      <Image
                        src={exp.img}
                        alt={exp.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050208] via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#e879f9] font-bold mb-2">{exp.cat.toUpperCase()}</p>
                      <h3 className="font-bold mb-1">{exp.title}</h3>
                      <p className="text-xs text-gray-500">{exp.rating}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section id="platforms" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">CROSS-PLATFORM SUPPORT</h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PLATFORMS.map((platform, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-[#1a0f2e] border border-[#8b5cf6]/20 rounded-xl text-center hover:border-[#8b5cf6] transition-colors"
                  >
                    <div className="text-3xl font-bold text-[#e879f9] mb-3">{platform.icon}</div>
                    <p className="font-semibold text-sm">{platform.name}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 px-6 bg-[#1a0f2e]/30">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">TECHNOLOGY STACK</h2>
            </Reveal>
            <div className="space-y-4">
              {[
                { name: "Real-time Rendering", level: 95 },
                { name: "AI NPCs", level: 88 },
                { name: "Haptic Feedback", level: 92 },
                { name: "Multiplayer Sync", level: 90 },
              ].map((tech, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-4 bg-[#1a0f2e] border border-[#8b5cf6]/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">{tech.name}</p>
                      <span className="text-[#e879f9]">{tech.level}%</span>
                    </div>
                    <div className="w-full bg-[#050208] rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#e879f9]"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Reveal delay={0}>
                <Counter target={2} label="Downloads" />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#e879f9]">50</div>
                  <div className="text-sm text-gray-400 mt-2">Experiences</div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#e879f9]">4.8</div>
                  <div className="text-sm text-gray-400 mt-2">Average Rating</div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#e879f9]">12</div>
                  <div className="text-sm text-gray-400 mt-2">Industry Awards</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-6 bg-[#1a0f2e]/30">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">FAQ</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion />
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 text-center">
          <Reveal>
            <h2 className="text-4xl font-bold mb-6">Enter the Immersive Future</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticBtn>DOWNLOAD NOW</MagneticBtn>
          </Reveal>
        </section>
      </main>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExperience(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a0f2e] border border-[#8b5cf6]/20 rounded-2xl p-8 max-w-md"
            >
              <h3 className="text-2xl font-bold mb-4">{selectedExperience.title}</h3>
              <p className="text-gray-400 mb-2">Category: {selectedExperience.cat}</p>
              <p className="text-[#e879f9] font-bold mb-6">{selectedExperience.rating}</p>
              <button
                onClick={() => setSelectedExperience(null)}
                className="w-full py-3 bg-[#8b5cf6] text-white rounded-lg font-bold"
              >
                DOWNLOAD EXPERIENCE
              </button>
              <button
                onClick={() => setSelectedExperience(null)}
                className="w-full mt-3 py-3 border border-[#8b5cf6]/30 rounded-lg"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050208; }
        ::-webkit-scrollbar-thumb { background: #8b5cf6; border-radius: 4px; }
      `}</style>
    </div>
  );
}
