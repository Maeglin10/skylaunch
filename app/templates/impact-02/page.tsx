"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight, X, Menu, Camera, AtSign, Mail, MapPin, ExternalLink } from "lucide-react";
import "../premium.css";

/* --- Data ----------------------------------------------------------- */

const PROJECTS = [
  { id: 1, title: "Fluid Horizons", category: "Photography", year: "2026", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", color: "#6366f1", desc: "Capturing the ephemeral dance between sky and sea along the Icelandic coastline. A study in vastness, silence, and the weight of light at dusk.", role: "Photographer & Art Director", client: "National Geographic", duration: "3 Months" },
  { id: 2, title: "Tokyo Neon", category: "Street", year: "2025", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop", color: "#f43f5e", desc: "A nocturnal exploration of Shinjuku's electric veins — where neon bleeds into rain-slicked asphalt and human stories unfold in 1/125th of a second.", role: "Street Photographer", client: "Personal Project", duration: "6 Weeks" },
  { id: 3, title: "Concrete Poetry", category: "Architecture", year: "2025", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop", color: "#10b981", desc: "Brutalist structures reimagined as sculptural poems. Exploring the tension between mass and void in post-war European architecture.", role: "Architecture Photographer", client: "Wallpaper Magazine", duration: "4 Months" },
  { id: 4, title: "Skin & Silk", category: "Fashion", year: "2024", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop", color: "#d97706", desc: "Editorial series for Maison Lumière's haute couture collection. Merging classical portraiture with contemporary fashion storytelling.", role: "Fashion Photographer", client: "Maison Lumière", duration: "2 Months" },
  { id: 5, title: "Volcanic Silence", category: "Landscape", year: "2024", image: "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?q=80&w=1200&auto=format&fit=crop", color: "#8b5cf6", desc: "The aftermath of eruption — where destruction creates a canvas more beautiful than any human could conceive. Shot over three expeditions.", role: "Documentary Photographer", client: "BBC Earth", duration: "8 Months" },
  { id: 6, title: "Human Form", category: "Portrait", year: "2026", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop", color: "#ec4899", desc: "An intimate portrait series celebrating the raw beauty of the human form — unretouched, unfiltered, unapologetically real.", role: "Portrait Photographer", client: "Vogue Italia", duration: "5 Weeks" },
];

const CATEGORIES = ["All", "Photography", "Street", "Architecture", "Fashion", "Landscape", "Portrait"];

const AWARDS = [
  { title: "World Press Photo", year: "2025", category: "Nature" },
  { title: "Sony World Photography", year: "2024", category: "Architecture" },
  { title: "Hasselblad Masters", year: "2024", category: "Fashion" },
  { title: "IPA International", year: "2023", category: "Fine Art" },
];

/* --- Scroll Reveal -------------------------------------------------- */

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* --- Main Component ------------------------------------------------- */

export default function CreativePortfolioSPA() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, -80]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const selected = selectedProject !== null ? PROJECTS.find(p => p.id === selectedProject) : null;

  return (
    <div className="premium-theme bg-[#0a0a0a] text-white min-h-screen selection:bg-amber-400 selection:text-black overflow-x-hidden">

      {/* --- Custom Cursor (Desktop) --- */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="fixed top-0 left-0 w-4 h-4 rounded-full border border-white/30 pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"
      />

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
          <Link href="/" className="relative z-50">
            <span className="text-lg font-light tracking-[0.3em] uppercase">
              Elena<span className="font-black">Korr</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {["Work", "About", "Awards", "Contact"].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/50 hover:text-white transition-colors">
                {item}
              </button>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden relative z-50">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
            {["Work", "About", "Awards", "Contact"].map((item, i) => (
              <motion.button key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} onClick={() => scrollTo(item.toLowerCase())} className="text-4xl font-light tracking-wider uppercase hover:text-amber-400 transition-colors">
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===============================================================
          SECTION 1: HERO — Cinematic full-screen with parallax
         ============================================================= */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover"
            alt="Hero background"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
            <span className="text-[11px] uppercase tracking-[0.5em] text-white/40 font-medium mb-8 block">Visual Storyteller · Photographer</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }} className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extralight tracking-[-0.04em] leading-[0.85]">
              Elena
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.85 }} className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-[-0.04em] leading-[0.85] italic">
              Korr<span className="text-amber-400">.</span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-base md:text-lg text-white/50 max-w-lg mx-auto leading-relaxed font-light">
            Capturing the world through a lens of emotion, light, and uncompromising beauty.
          </motion.p>
        </motion.div>

        {/* Scroll Line */}
        <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-amber-400 to-transparent origin-top" />
      </section>

      {/* ===============================================================
          SECTION 2: PORTFOLIO GALLERY — Filterable masonry grid
         ============================================================= */}
      <section id="work" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <span className="text-amber-400 text-[11px] uppercase tracking-[0.3em] font-semibold mb-4 block">Portfolio</span>
                <h2 className="text-5xl md:text-7xl font-extralight tracking-tight">
                  Selected <span className="font-black italic">Works</span>
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 ${
                      activeFilter === cat
                        ? "bg-amber-400 text-black"
                        : "border border-white/10 text-white/40 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08}>
                  <div
                    onClick={() => setSelectedProject(project.id)}
                    className={`group cursor-pointer relative overflow-hidden rounded-2xl ${
                      i % 3 === 0 ? "md:row-span-2 aspect-[3/4]" : "aspect-square"
                    }`}
                  >
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                    {/* Content overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold" style={{ background: `${project.color}40`, color: project.color }}>
                          {project.category}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-amber-400 group-hover:border-amber-400 transition-all">
                          <ArrowUpRight className="w-4 h-4 group-hover:text-black transition-colors" />
                        </div>
                      </div>

                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl md:text-3xl font-light mb-1">{project.title}</h3>
                        <p className="text-sm text-white/50">{project.year}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- Project Detail Modal --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
              {/* Close */}
              <button onClick={() => setSelectedProject(null)} className="fixed top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all border border-white/10">
                <X className="w-5 h-5" />
              </button>

              {/* Hero Image */}
              <div className="relative w-full h-[70vh]">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
              </div>

              {/* Content */}
              <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-32">
                <span className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold mb-6 inline-block" style={{ background: `${selected.color}30`, color: selected.color }}>
                  {selected.category}
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-6">
                  {selected.title}<span className="text-amber-400 font-black">.</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mb-16">
                  {selected.desc}
                </p>

                {/* Meta Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-12 mb-16">
                  {[
                    { label: "Role", value: selected.role },
                    { label: "Client", value: selected.client },
                    { label: "Duration", value: selected.duration },
                  ].map((meta, i) => (
                    <div key={i}>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-2">{meta.label}</div>
                      <div className="text-lg font-medium">{meta.value}</div>
                    </div>
                  ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {PROJECTS.filter(p => p.id !== selected.id).slice(0, 4).map(p => (
                    <div key={p.id} className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer" onClick={() => setSelectedProject(p.id)}>
                      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute bottom-4 left-4 text-sm font-medium">{p.title}</div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setSelectedProject(null)} className="mt-16 flex items-center gap-3 text-sm text-white/40 hover:text-amber-400 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to portfolio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===============================================================
          SECTION 3: ABOUT — Cinematic split with image
         ============================================================= */}
      <section id="about" className="py-32 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" alt="Elena Korr" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" />
              </div>
              {/* Floating Badge */}
              <motion.div animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-amber-400 text-black flex items-center justify-center text-center shadow-2xl">
                <div>
                  <div className="text-2xl font-black leading-none">15</div>
                  <div className="text-[8px] uppercase tracking-wider font-bold">Years</div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-7">
            <span className="text-amber-400 text-[11px] uppercase tracking-[0.3em] font-semibold mb-6 block">About me</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.1] mb-8">
              I see the world in<br />
              <span className="font-black italic">frames of light<span className="text-amber-400">.</span></span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Based between Paris and Tokyo, I specialize in capturing moments that transcend the ordinary. My work has been featured in National Geographic, Vogue, and BBC Earth — but the images I&apos;m most proud of are the ones that make strangers feel something they can&apos;t quite name.
            </p>
            <p className="text-white/30 leading-relaxed mb-12">
              With over 15 years of professional experience and a background in fine arts from École des Beaux-Arts, I bring a deeply personal yet universally resonant perspective to every project. Whether documenting street life in Shinjuku or creating haute couture editorials, I seek the same thing: truth wrapped in beauty.
            </p>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {["Documentary", "Fashion", "Architecture", "Portrait", "Street", "Fine Art"].map((skill, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-150 transition-transform" />
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===============================================================
          SECTION 4: AWARDS — Horizontal scroll ticker + list
         ============================================================= */}
      <section id="awards" className="py-32 md:py-40 bg-[#07070a] border-y border-white/5">
        {/* Ticker */}
        <div className="overflow-hidden mb-24 border-y border-white/5 py-6">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap">
            {[...Array(3)].map((_, k) => (
              <span key={k} className="text-6xl md:text-8xl font-extralight tracking-tight opacity-[0.06] mx-8">
                Photography · Art Direction · Visual Stories · Editorial · Documentary · Fashion ·{" "}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Reveal>
            <span className="text-amber-400 text-[11px] uppercase tracking-[0.3em] font-semibold mb-4 block">Recognition</span>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight mb-16">
              Awards & <span className="font-black italic">Press</span>
            </h2>
          </Reveal>

          <div className="space-y-0">
            {AWARDS.map((award, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group flex items-center justify-between py-8 border-b border-white/5 hover:border-amber-400/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-8">
                    <span className="text-4xl md:text-5xl font-extralight text-white/10 group-hover:text-amber-400 transition-colors w-16">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-medium group-hover:text-amber-400 transition-colors">{award.title}</h3>
                      <span className="text-sm text-white/30">{award.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-white/20 font-mono hidden md:block">{award.year}</span>
                    <ExternalLink className="w-4 h-4 text-white/10 group-hover:text-amber-400 transition-colors" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================================
          SECTION 5: CONTACT — Minimal elegant contact
         ============================================================= */}
      <section id="contact" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <span className="text-amber-400 text-[11px] uppercase tracking-[0.3em] font-semibold mb-6 block">Contact</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8">
              Let&apos;s create<br />
              <span className="font-black italic">something beautiful<span className="text-amber-400">.</span></span>
            </h2>
            <p className="text-white/40 text-lg max-w-lg mx-auto mb-16 leading-relaxed">
              Available for commissions, editorial work, and creative collaborations worldwide.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a href="mailto:hello@elenakorr.com" className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-light hover:text-amber-400 transition-colors mb-16">
              hello@elenakorr.com
              <ArrowUpRight className="w-6 h-6 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex items-center justify-center gap-8">
              {[
                { icon: <Camera className="w-5 h-5" />, label: "Camera" },
                { icon: <AtSign className="w-5 h-5" />, label: "X / Twitter" },
                { icon: <Mail className="w-5 h-5" />, label: "Email" },
              ].map((social, i) => (
                <a key={i} href="#" className="group flex items-center gap-2 text-white/30 hover:text-amber-400 transition-colors">
                  <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-all">
                    {social.icon}
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold hidden md:block">{social.label}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===============================================================
          FOOTER
         ============================================================= */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-lg font-light tracking-[0.3em] uppercase">Elena<span className="font-black">Korr</span></span>
          <div className="flex items-center gap-2 text-[10px] text-white/20 uppercase tracking-wider">
            <MapPin className="w-3 h-3" /> Paris · Tokyo
          </div>
          <span className="text-[10px] text-white/20 uppercase tracking-wider">&copy; 2026 All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}
