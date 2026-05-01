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
  ArrowRight, X, Menu, ChevronDown, ArrowUpRight,
  FlaskConical, Dna, Microscope, Heart, BarChart2, Shield,
} from "lucide-react";
import "../premium.css";

/* ─── DATA ─────────────────────────────────────────────── */
const PIPELINES = [
  {
    id: 1,
    code: "NXV-401",
    name: "Nexavir",
    indication: "Oncology — NSCLC",
    phase: "Phase III",
    progress: 82,
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1400&auto=format&fit=crop",
    desc: "Next-generation mRNA immunotherapy targeting PD-L1/CTLA-4 axis in non-small cell lung carcinoma.",
  },
  {
    id: 2,
    code: "GEN-217",
    name: "Genova",
    indication: "Rare Disease — SMA",
    phase: "Phase II",
    progress: 55,
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1400&auto=format&fit=crop",
    desc: "CRISPR-based gene editing platform for spinal muscular atrophy with precision delivery via lipid nanoparticles.",
  },
  {
    id: 3,
    code: "CAR-088",
    name: "Cardiosyne",
    indication: "Cardiovascular — HFrEF",
    phase: "Phase I",
    progress: 28,
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=1400&auto=format&fit=crop",
    desc: "Small molecule ROCK-2 inhibitor addressing cardiac fibrosis in heart failure with reduced ejection fraction.",
  },
];

const FAQS = [
  { q: "What is your primary research focus?", a: "Our research spans three therapeutic areas: oncology, rare genetic diseases, and cardiovascular medicine. We leverage mRNA, gene editing, and precision small molecule platforms." },
  { q: "How do you approach clinical development?", a: "We design adaptive trials that embed biomarker stratification from Phase I onward, reducing the risk of late-stage failure and accelerating the identification of responding patient populations." },
  { q: "What is your technology transfer policy?", a: "We maintain an open collaboration model with academic medical centers globally. Our IP strategy prioritizes rapid patient access while protecting core platform innovations." },
  { q: "How is patient safety monitored?", a: "All trials operate under independent Data Safety Monitoring Boards with real-time pharmacovigilance integration. We have maintained a zero serious unexpected adverse event record to date." },
];

const STATS = [
  { value: 12, label: "Clinical Candidates", suffix: "" },
  { value: 4, label: "Published Studies", suffix: "00+" },
  { value: 23, label: "Patent Families", suffix: "" },
  { value: 98, label: "Safety Record", suffix: "%" },
];

const MARQUEE_ITEMS = [
  "Genomics", "mRNA Therapeutics", "CRISPR", "Immunotherapy", "Proteomics",
  "Cell Therapy", "AI Drug Discovery", "Clinical Trials", "Precision Medicine",
  "Biomarkers", "Genomics", "mRNA Therapeutics", "CRISPR", "Immunotherapy",
  "Proteomics", "Cell Therapy", "AI Drug Discovery", "Clinical Trials",
];

/* ─── SHARED COMPONENTS ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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
    }, 24);
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

/* ─── MAIN PAGE ──────────────────────────────────────────── */
export default function OnePageDotNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const activePipeline = activeModal !== null ? PIPELINES[activeModal] : null;

  return (
    <div className="premium-theme bg-white text-[#0a1628] min-h-screen font-sans overflow-x-hidden selection:bg-[#0066cc] selection:text-white">

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-5 bg-white/90 backdrop-blur-xl border-b border-[#0066cc]/10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066cc] flex items-center justify-center">
            <Dna className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0a1628]">Nexavir<span className="text-[#0066cc]">Bio</span></span>
        </div>
        <div className="hidden md:flex gap-10 text-sm text-[#0a1628]/60 font-medium">
          {["Pipeline", "Platform", "Science", "About", "Investors"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#0066cc] transition-colors">{item}</a>
          ))}
        </div>
        <MagneticBtn className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#0066cc] text-white text-sm font-semibold hover:bg-[#0052a3] transition-colors rounded-lg">
          Contact Us <ArrowRight className="w-4 h-4" />
        </MagneticBtn>
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6 text-[#0a1628]" />
        </button>
      </nav>

      {/* ── MOBILE NAV ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#0a1628] flex flex-col justify-center items-center gap-8"
          >
            <button className="absolute top-6 right-8" onClick={() => setMobileOpen(false)}>
              <X className="w-7 h-7 text-white" />
            </button>
            {["Pipeline", "Platform", "Science", "About", "Investors"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-bold text-white hover:text-[#0066cc] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#f0f6ff]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-196645?w=800&q=80"
            alt="Biotech lab"
            fill
            unoptimized
            className="object-cover opacity-20"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0f6ff] via-[#f0f6ff]/90 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 max-w-3xl pt-32 pb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066cc]/10 rounded-full text-[#0066cc] text-xs font-semibold tracking-wide uppercase mb-8 border border-[#0066cc]/20">
              <span className="w-2 h-2 bg-[#0066cc] rounded-full animate-pulse" />
              Advancing Human Health Since 2008
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-[6vw] font-bold text-[#0a1628] leading-[1.05] mb-8 tracking-tight">
              Precision Medicine<br />
              <span className="text-[#0066cc]">Reimagined.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-[#0a1628]/60 leading-relaxed mb-10 max-w-xl">
              We engineer therapeutic candidates that target disease at its molecular origin — with a clinical pipeline spanning oncology, genetic medicine, and cardiovascular science.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <MagneticBtn className="flex items-center gap-3 px-8 py-4 bg-[#0066cc] text-white font-semibold text-sm rounded-lg hover:bg-[#0052a3] transition-colors shadow-lg shadow-[#0066cc]/25">
                Explore Pipeline <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center gap-3 px-8 py-4 border border-[#0a1628]/15 text-[#0a1628] text-sm font-medium rounded-lg hover:border-[#0066cc] hover:text-[#0066cc] transition-colors">
                <BarChart2 className="w-4 h-4" /> Investor Relations
              </button>
            </div>
          </Reveal>
        </motion.div>
        <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block">
          <div className="relative h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-196645?w=800&q=80"
              alt="Scientist"
              fill
              unoptimized
              className="object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f0f6ff] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#0a1628] py-4">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="text-xs font-semibold uppercase tracking-[0.35em] text-white/30 flex-shrink-0">
              {item} <span className="text-[#0066cc]/50 mx-3">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── PIPELINE ──────────────────────────────────────── */}
      <section id="pipeline" className="px-8 md:px-16 py-28 bg-white">
        <Reveal className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#0066cc] block mb-4 font-semibold">Clinical Pipeline</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0a1628] leading-tight">
            Candidates in<br /><span className="text-[#0066cc]">Development.</span>
          </h2>
        </Reveal>
        <div className="space-y-6 max-w-5xl">
          {PIPELINES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
                className="group border border-[#0a1628]/8 rounded-2xl p-6 md:p-8 hover:border-[#0066cc]/30 hover:shadow-lg hover:shadow-[#0066cc]/5 transition-all cursor-pointer bg-white"
                onClick={() => setActiveModal(i)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-[#f0f6ff] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0066cc] transition-colors">
                      <FlaskConical className="w-6 h-6 text-[#0066cc] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-[#0a1628]/40 uppercase tracking-[0.2em]">{p.code}</span>
                        <span className="px-2.5 py-0.5 bg-[#0066cc]/10 text-[#0066cc] text-[10px] font-bold uppercase tracking-wider rounded-full">{p.phase}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0a1628] mb-1">{p.name}</h3>
                      <p className="text-sm text-[#0a1628]/50">{p.indication}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className="flex-1 md:w-48">
                      <div className="flex justify-between text-[11px] text-[#0a1628]/40 mb-2 font-semibold uppercase tracking-wider">
                        <span>Progress</span><span>{p.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#0a1628]/8 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.progress}%` }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          className="h-full bg-[#0066cc] rounded-full"
                        />
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#0a1628]/20 group-hover:text-[#0066cc] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PIPELINE MODAL ────────────────────────────────── */}
      <AnimatePresence>
        {activePipeline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a1628]/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <Image src={activePipeline.img} alt={activePipeline.name} fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent" />
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <div className="absolute bottom-6 left-8 flex items-center gap-3">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-[0.2em]">{activePipeline.code}</span>
                  <span className="px-3 py-1 bg-[#0066cc] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">{activePipeline.phase}</span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-[#0a1628] mb-2">{activePipeline.name}</h2>
                <p className="text-sm text-[#0066cc] font-semibold mb-6">{activePipeline.indication}</p>
                <p className="text-[#0a1628]/60 leading-relaxed mb-8">{activePipeline.desc}</p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[["Phase", activePipeline.phase], ["Trial ID", "NCT-" + activePipeline.id * 1234567], ["Sites", "42 Global"]].map(([l, v]) => (
                    <div key={l} className="p-4 bg-[#f0f6ff] rounded-xl text-center">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#0a1628]/40 mb-1 font-semibold">{l}</div>
                      <div className="font-bold text-sm text-[#0a1628]">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <MagneticBtn className="flex-1 py-3.5 bg-[#0066cc] text-white font-semibold text-sm rounded-xl hover:bg-[#0052a3] transition-colors">
                    Download Data Package
                  </MagneticBtn>
                  <button onClick={() => setActiveModal(null)} className="flex-1 py-3.5 border border-[#0a1628]/15 text-[#0a1628] text-sm font-medium rounded-xl hover:border-[#0066cc] transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-[#f0f6ff] py-20 px-8 md:px-16 border-y border-[#0066cc]/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl font-bold text-[#0066cc] mb-2 tabular-nums">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#0a1628]/40 font-semibold">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PLATFORM ──────────────────────────────────────── */}
      <section id="platform" className="px-8 md:px-16 py-28 bg-white max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-[#0066cc] block mb-4 font-semibold">Our Platform</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] leading-tight mb-8">
                Built on the Language<br />of <span className="text-[#0066cc]">Biology.</span>
              </h2>
              <p className="text-[#0a1628]/60 leading-relaxed mb-8">
                Our integrated platform combines AI-driven target identification, proprietary delivery chemistry, and a translational biomarker framework — compressing the discovery-to-IND timeline by up to 40%.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-5">
                {[
                  { icon: <Dna className="w-5 h-5" />, title: "Gene Editing Suite", desc: "Next-gen CRISPR-Cas12 platform with single-base resolution" },
                  { icon: <Microscope className="w-5 h-5" />, title: "mRNA Engineering", desc: "Modified nucleoside chemistry for sustained protein expression" },
                  { icon: <Shield className="w-5 h-5" />, title: "Delivery Technology", desc: "Organ-selective lipid nanoparticles with 95%+ encapsulation" },
                  { icon: <Heart className="w-5 h-5" />, title: "Predictive Toxicology", desc: "AI-driven safety profiling across 200+ cell-based assays" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl border border-[#0a1628]/6 hover:border-[#0066cc]/25 hover:bg-[#f0f6ff] transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-[#f0f6ff] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0066cc] transition-colors">
                      <span className="text-[#0066cc] group-hover:text-white transition-colors">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0a1628] text-sm mb-1">{item.title}</h4>
                      <p className="text-[11px] text-[#0a1628]/45 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl shadow-[#0066cc]/10">
              <Image
                src="https://images.unsplash.com/photo-1109543?w=800&q=80"
                alt="Lab platform"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/30 to-transparent mix-blend-multiply" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-sm rounded-2xl">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#0066cc] font-semibold mb-2">Research HQ</div>
                <p className="text-sm font-semibold text-[#0a1628]">24,000 m² Discovery Center · Basel, Switzerland</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="bg-[#0a1628] px-8 md:px-16 py-24">
        <Reveal className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#0066cc] block mb-4 font-semibold">Scientific Advisory</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by the World's<br />Leading Researchers.</h2>
        </Reveal>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { quote: "The precision of their mRNA chemistry platform is unlike anything we have seen in clinical translation — reproducible, scalable, and genuinely novel.", author: "Prof. E. Müller", role: "Harvard Medical School", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop" },
            { quote: "Their approach to patient stratification using liquid biopsy biomarkers sets a new standard for oncology trial design.", author: "Dr. A. Chen", role: "Memorial Sloan Kettering", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop" },
            { quote: "The AI-guided toxicology screening eliminated four candidates in eight weeks that would have failed in Phase II. Remarkable discipline.", author: "Dr. R. Patel", role: "Karolinska Institutet", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-7 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={t.img} alt={t.author} fill unoptimized className="object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.author}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-[0.15em]">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section id="science" className="px-8 md:px-16 py-24 max-w-4xl mx-auto">
        <Reveal className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#0066cc] block mb-4 font-semibold">Common Questions</span>
          <h2 className="text-4xl font-bold text-[#0a1628]">Science & Strategy.</h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-[#0a1628]/8 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-7 py-5 text-left hover:bg-[#f0f6ff] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0a1628] text-sm pr-4">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-[#0066cc] flex-shrink-0" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 text-[#0a1628]/55 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────── */}
      <section id="about" className="px-8 md:px-16 py-24 bg-[#f0f6ff] text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="w-16 h-16 rounded-2xl bg-[#0066cc] flex items-center justify-center mx-auto mb-8">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">Partnering for<br /><span className="text-[#0066cc]">Better Outcomes.</span></h2>
            <p className="text-[#0a1628]/55 text-lg leading-relaxed mb-10">
              Whether you are a pharma partner, academic collaborator, or investor — we are building the future of medicine together.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticBtn className="flex items-center justify-center gap-3 px-10 py-4 bg-[#0066cc] text-white font-semibold rounded-xl hover:bg-[#0052a3] transition-colors shadow-lg shadow-[#0066cc]/20">
                Request a Briefing <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center justify-center gap-3 px-10 py-4 border border-[#0a1628]/15 text-[#0a1628] font-medium rounded-xl hover:border-[#0066cc] hover:text-[#0066cc] transition-colors">
                <BarChart2 className="w-4 h-4" /> Investor Deck
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#0a1628] py-8 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/25 uppercase tracking-[0.2em] font-medium">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#0066cc] flex items-center justify-center"><Dna className="w-3 h-3 text-white" /></div>
          <span>NexavirBio © 2026</span>
        </div>
        <span>Pipeline · Platform · Publications · Careers</span>
        <span>Nasdaq: NXVB</span>
      </footer>

      <style>{`::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: white; } ::-webkit-scrollbar-thumb { background: #0066cc; border-radius: 3px; }`}</style>
    </div>
  );
}
