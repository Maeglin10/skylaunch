"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight, ArrowUpRight, Star, Check, Menu, X,
  Layers, Globe, Film, Zap, Circle, ChevronRight,
  Twitter, Instagram, Linkedin, Youtube
} from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [glitch, setGlitch] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 90)
    }, 2800 + Math.random() * 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <span className={`relative inline-block ${className}`}
      style={glitch ? { textShadow: "2px 0 #ff003c, -2px 0 #ffffff20", filter: "brightness(1.15)" } : {}}>
      {text}
    </span>
  )
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let cur = 0
    const step = to / 70
    const t = setInterval(() => {
      cur += step
      if (cur >= to) { setCount(to); clearInterval(t) } else { setCount(Math.floor(cur)) }
    }, 16)
    return () => clearInterval(t)
  }, [isInView, to])
  return <span ref={ref}>{count}{suffix}</span>
}

const WORK = [
  { id: 1, title: "VOID IDENTITY", client: "Orbit Labs", tag: "Brand System", year: "2026", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80", deliverables: ["Identity System", "Motion Language", "Sonic Identity", "Environmental Applications"] },
  { id: 2, title: "CIPHER UI", client: "Nova Bank", tag: "Digital Experience", year: "2025", img: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&q=80", deliverables: ["Design System", "Interaction Design", "Prototype", "Dev Handoff"] },
  { id: 3, title: "BRUTAL MOTION", client: "Hyper Records", tag: "Motion Design", year: "2025", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", deliverables: ["Title Sequence", "Visual ID", "Music Video Direction", "Live Visuals"] },
  { id: 4, title: "DARK MATTER", client: "Epoch Films", tag: "Title Design", year: "2024", img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80", deliverables: ["Main Title", "End Credits", "Chapter Idents", "Promotional Assets"] },
  { id: 5, title: "SIGNAL DROP", client: "Arc Studio", tag: "Campaign Direction", year: "2024", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", deliverables: ["Campaign Strategy", "Film Direction", "OOH Design", "Digital Rollout"] },
]

const TESTIMONIALS = [
  { name: "Zara Okonkwo", role: "CMO, Orbit Labs", avatar: "ZO", rating: 5, quote: "VOID AGENCY is the only studio I've encountered that makes you feel slightly afraid of your own brand before you love it completely. The work is extraordinary and the strategic thinking behind it is even more impressive." },
  { name: "Lars Henriksen", role: "Founder, Nova Bank", avatar: "LH", rating: 5, quote: "We instructed three agencies. VOID understood the brief in the first meeting and delivered something none of the others had even imagined. The Cipher UI system now runs 2.4 million daily active users." },
  { name: "Celeste Moreau", role: "Creative Director, Epoch Films", avatar: "CM", rating: 5, quote: "The Dark Matter title sequence became the most discussed element of the entire film. Critics dedicated paragraphs to it. That is not coincidence. That is what VOID does — they make craft feel inevitable." },
  { name: "Jae-won Park", role: "Head of Brand, Arc Studio", avatar: "JP", rating: 5, quote: "Signal Drop ran in 22 markets simultaneously. Every market received VOID's same obsessive attention to cultural context. The results: 340% engagement lift over our previous campaign baseline." },
]

const PRICING = [
  {
    name: "Project", price: "from €28,000", highlight: false,
    desc: "Standalone identity or digital project. Six-week minimum engagement.",
    features: ["Brand system or single digital product", "Two rounds of creative development", "Final asset delivery", "Usage rights — full ownership", "One post-launch review session"],
  },
  {
    name: "Retainer", price: "from €9,500/mo", highlight: true,
    desc: "Ongoing creative partnership. Our most successful client relationships.",
    features: ["8–20 hours dedicated creative per month", "Priority scheduling and escalation", "Quarterly strategic brand reviews", "Motion and campaign execution", "Access to full VOID creative team", "Direct line to Creative Director"],
  },
  {
    name: "Studio Embed", price: "Bespoke", highlight: false,
    desc: "VOID creative director and team embedded within your organisation.",
    features: ["Full-time dedicated creative team", "Custom scope and deliverables", "Exclusive engagement (one client)", "C-suite creative partnership", "Global execution capability", "Equity or revenue arrangements available"],
  },
]

const STATS_DATA = [
  { label: "Projects Delivered", to: 194, suffix: "" },
  { label: "Countries Reached", to: 34, suffix: "" },
  { label: "Awards Won", to: 67, suffix: "" },
  { label: "Brand Systems Built", to: 89, suffix: "" },
  { label: "Years in Practice", to: 9, suffix: "" },
  { label: "Engagement Lift Avg", to: 340, suffix: "%" },
]

const FAQS_DATA = [
  { q: "How do you begin a new project?", a: "Every engagement opens with a two-day Creative Immersion — a structured provocation session where we map your brand territory, competitive landscape, and cultural ambition. No brief accepted, no deck produced beforehand. We meet in person wherever you are in the world." },
  { q: "What is your minimum engagement?", a: "Our minimum project scope is six weeks. We do not accept one-off logo briefs. We build systems, not assets. Retainer relationships begin at eight hours per month. Studio Embed arrangements are scoped entirely around your needs." },
  { q: "Do you work with early-stage startups?", a: "Occasionally. If the ambition is sufficiently uncommon, we will consider early-stage companies on a deferred payment structure. Contact us with your founding thesis, not a brief. We are looking for ideas that deserve to exist." },
  { q: "Where is VOID based?", a: "Our creative direction operates from Berlin, Paris, and Los Angeles. Production teams are distributed globally. We have delivered work in 34 countries across six continents. We travel to our clients. Time zones are not an excuse." },
  { q: "How do you measure success on a brand project?", a: "We set two kinds of success criteria before any project begins: measurable KPIs (brand recall, NPS, digital engagement, conversion) and qualitative benchmarks (cultural resonance, editorial coverage, competitor response). Both matter equally." },
  { q: "Can we see more work before signing?", a: "Absolutely. We will curate a private viewing of unreleased work and case study data relevant to your sector. This happens after a 30-minute introductory call. We do not share full case studies publicly — our clients value confidentiality." },
]

const NAV_LINKS = ["Work", "Services", "Manifesto", "Studio", "Contact"]

export default function VoidAgencyPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [activeWork, setActiveWork] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#080808] text-white min-h-screen" style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 mix-blend-difference ${scrolled ? "py-4" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="cursor-pointer text-xl font-black uppercase tracking-[-0.02em] text-white">VOID</Link>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="cursor-pointer text-[10px] uppercase tracking-[0.28em] text-white/50 hover:text-white transition-all duration-200 font-black">{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="cursor-pointer px-6 py-3 bg-white text-[#080808] text-[10px] uppercase tracking-[0.3em] font-black hover:bg-[#ff003c] hover:text-white transition-all duration-200">
              Start a Project
            </a>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer text-white hover:text-[#ff003c] transition-all duration-200">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#080808] border-l border-white/5 w-80">
              <div className="flex flex-col gap-10 pt-16 pl-2">
                {NAV_LINKS.map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="cursor-pointer text-3xl font-black uppercase tracking-[-0.02em] text-white/35 hover:text-white transition-all duration-200">{l}</a>
                ))}
                <Separator className="bg-white/5" />
                <a href="#contact" className="cursor-pointer px-6 py-4 bg-[#ff003c] text-white text-[10px] uppercase tracking-[0.3em] font-black text-center hover:bg-white hover:text-[#080808] transition-all duration-200">Start a Project</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center px-6 md:px-16">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" alt="Creative work" fill unoptimized className="object-cover object-center" />
          <div className="absolute inset-0 bg-[#080808]/78" />
        </motion.div>

        {/* Glitch flash */}
        <motion.div
          animate={{ opacity: [0, 0, 0.05, 0, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.42, 0.48, 0.54, 1] }}
          className="absolute inset-0 bg-[#ff003c] mix-blend-screen pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center gap-3 mb-8">
            <Badge className="bg-transparent border border-white/15 text-white/35 text-[9px] uppercase tracking-[0.4em] rounded-none px-3 py-1 font-black">Creative Agency · Est. 2017</Badge>
            <Badge className="bg-transparent border border-white/10 text-white/25 text-[9px] uppercase tracking-[0.35em] rounded-none px-3 py-1 font-black">Berlin · Paris · LA</Badge>
          </motion.div>
          <h1 className="text-7xl md:text-[10.5vw] font-black uppercase leading-[0.8] tracking-[-0.03em] mb-8">
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="block">
              <GlitchText text="We make" />
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="block">
              <span className="text-white/10" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>brands</span>{" "}
              <GlitchText text="feel" />
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.76, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="block text-white">
              uncomfortable.
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-sm text-white/35 max-w-sm mb-12 leading-relaxed uppercase tracking-[0.15em] font-bold">
            Brand systems, digital experience, and motion design for companies that refuse to be forgettable.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }} className="flex flex-wrap gap-4">
            <a href="#work" className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-white text-[#080808] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-[#ff003c] hover:text-white transition-all duration-200">
              View Work <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="cursor-pointer flex items-center gap-2 px-8 py-4 border border-white/15 text-white text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white/5 transition-all duration-200">
              Start a Project
            </a>
          </motion.div>
        </div>

        {/* Floating stat cards */}
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10">
          {[
            { label: "Projects Delivered", val: "194+" },
            { label: "Awards Won", val: "67" },
            { label: "Avg Engagement Lift", val: "+340%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 + i * 0.15 }}
              className="bg-[#080808]/90 backdrop-blur border border-white/8 px-5 py-3 flex items-center gap-4"
            >
              <span className="text-xl font-black text-white">{stat.val}</span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-white/25 font-black">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-20 px-6 md:px-16 bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {STATS_DATA.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-black leading-snug">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WORK LIST ── */}
      <section id="work" className="py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-[-0.03em] text-white mb-20 leading-none">Selected<br />Work.</h2>
          </Reveal>
          <div className="space-y-0 divide-y divide-white/5">
            {WORK.map((w, i) => (
              <Reveal key={w.id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group cursor-pointer py-7 flex items-end justify-between gap-8 hover:bg-white/2 px-0 transition-all duration-200"
                  onClick={() => setActiveWork(i)}
                >
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <span className="text-[10px] text-white/18 font-black uppercase tracking-[0.35em] w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div className="relative overflow-hidden w-16 h-10 shrink-0 hidden md:block">
                      <Image src={w.img} alt={w.title} fill unoptimized className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-[-0.02em] text-white group-hover:text-[#ff003c] transition-all duration-200 truncate leading-none">
                      <GlitchText text={w.title} />
                    </h3>
                  </div>
                  <div className="text-right hidden md:block shrink-0">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black">{w.tag}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/18 font-black mt-1">{w.client} · {w.year}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/18 group-hover:text-[#ff003c] transition-all duration-200 shrink-0" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK MODAL ── */}
      <Dialog open={activeWork !== null} onOpenChange={() => setActiveWork(null)}>
        <DialogContent className="bg-[#111] border border-white/8 text-white max-w-3xl rounded-none p-0 overflow-hidden">
          {activeWork !== null && (
            <>
              <div className="relative aspect-video overflow-hidden">
                <Image src={WORK[activeWork].img} alt={WORK[activeWork].title} fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                <motion.div animate={{ opacity: [0, 0.07, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute inset-0 bg-[#ff003c] mix-blend-screen" />
              </div>
              <div className="p-8 md:p-10">
                <DialogHeader>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-black mb-1">{WORK[activeWork].tag} · {WORK[activeWork].year}</p>
                  <DialogTitle className="text-4xl font-black uppercase tracking-[-0.02em] text-white">{WORK[activeWork].title}</DialogTitle>
                  <p className="text-sm text-white/35 font-black uppercase tracking-[0.2em] mt-1">Client: {WORK[activeWork].client}</p>
                </DialogHeader>
                <p className="text-sm text-white/40 leading-relaxed mt-5 mb-7 font-medium">
                  A total brand system rebuilt from first principles. Typography, motion language, colour architecture, and environmental applications — all derived from a single conceptual gesture. Delivered across 22 markets in 14 languages.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {WORK[activeWork].deliverables.map((d) => (
                    <Badge key={d} className="bg-white/5 border border-white/10 text-white/45 rounded-none text-[9px] uppercase tracking-[0.25em] font-black px-3 py-1">{d}</Badge>
                  ))}
                </div>
                <a href="#contact" className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 bg-white text-[#080808] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-[#ff003c] hover:text-white transition-all duration-200" onClick={() => setActiveWork(null)}>
                  View Full Case Study <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── SERVICES TABS ── */}
      <section id="services" className="py-32 px-6 md:px-16 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/25 mb-3 font-black">What We Do</p>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.03em] text-white mb-16 leading-none">The Work.</h2>
          </Reveal>
          <Tabs defaultValue="brand" className="w-full">
            <TabsList className="bg-transparent border-b border-white/8 rounded-none p-0 mb-16 w-full flex gap-0 h-auto justify-start">
              {[
                { val: "brand", label: "Brand Systems", icon: Layers },
                { val: "digital", label: "Digital Experience", icon: Globe },
                { val: "motion", label: "Motion & Film", icon: Film },
                { val: "campaign", label: "Campaign Direction", icon: Zap },
              ].map(({ val, label, icon: Icon }) => (
                <TabsTrigger key={val} value={val} className="cursor-pointer rounded-none flex-1 md:flex-none px-6 py-5 text-[10px] uppercase tracking-[0.28em] text-white/25 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#ff003c] font-black transition-all duration-200 flex items-center gap-2 border-b-2 border-transparent">
                  <Icon className="w-3.5 h-3.5" /><span className="hidden md:inline">{label}</span><span className="md:hidden">{label.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {[
              {
                val: "brand",
                title: "Brand Systems", subtitle: "Identity architecture designed to survive cultural entropy.",
                desc: "We don't make logos. We build systems — logotypes, colour architectures, typographic hierarchies, motion languages, sonic identities, and environmental applications. Everything derived from a single conceptual gesture that makes your brand undeniable.",
                bullets: ["Visual identity and logotype design", "Colour and typographic systems", "Brand language and tone of voice", "Motion identity and sonic branding", "Environmental and spatial design", "Brand governance and guidelines"],
                stat1: { val: "89", label: "Brand systems deployed" }, stat2: { val: "34", label: "Countries reached" },
                img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
              },
              {
                val: "digital",
                title: "Digital Experience", subtitle: "Interfaces that reward attention.",
                desc: "From bespoke design systems to micro-interaction choreography. We design digital products where every state, every transition, and every empty moment is considered. The result is interfaces that feel like they were made for a single user — yours.",
                bullets: ["UX research and service design", "Product and interface design", "Design systems and component libraries", "Interaction design and prototyping", "Motion and micro-interactions", "Developer handoff and QA"],
                stat1: { val: "2.4M", label: "DAU on our products" }, stat2: { val: "94%", label: "Avg. user satisfaction" },
                img: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&q=80",
              },
              {
                val: "motion",
                title: "Motion & Film", subtitle: "Title sequences and brand films for projects that demand presence.",
                desc: "We direct, design, and produce motion work for film, broadcast, and brand. Our sequences have opened Cannes premieres, driven 200M+ streaming views, and been cited in international press coverage as defining aesthetic moments.",
                bullets: ["Title sequences and end credits", "Brand films and manifestos", "Music video direction", "Generative and live AV visuals", "Commercial and campaign film", "Post-production and VFX"],
                stat1: { val: "200M+", label: "Combined streaming views" }, stat2: { val: "22", label: "Film festivals shown" },
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
              },
              {
                val: "campaign",
                title: "Campaign Direction", subtitle: "Concepting through execution — end to end.",
                desc: "We operate as an embedded creative cell within your organisation. We concept, direct, and oversee execution across every channel — OOH, digital, editorial, experiential. We don't hand off to production. We produce it ourselves.",
                bullets: ["Campaign strategy and concepting", "Creative direction and art direction", "Film and photography production", "Out-of-home and print design", "Digital and social campaign execution", "Global rollout management"],
                stat1: { val: "+340%", label: "Avg engagement lift" }, stat2: { val: "22", label: "Markets simultaneously" },
                img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
              },
            ].map(({ val, title, subtitle, desc, bullets, stat1, stat2, img }) => (
              <TabsContent key={val} value={val} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <h3 className="text-4xl font-black uppercase tracking-[-0.02em] text-white mb-3">{title}</h3>
                    <p className="text-base text-white/45 mb-6 font-bold uppercase tracking-[0.1em] leading-relaxed">{subtitle}</p>
                    <p className="text-sm text-white/40 leading-relaxed mb-10 font-medium">{desc}</p>
                    <ul className="space-y-3 mb-12">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-[11px] text-white/50 uppercase tracking-[0.12em] font-black">
                          <Circle className="w-1.5 h-1.5 text-[#ff003c] fill-[#ff003c] shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="border-t border-white/8 pt-6">
                        <div className="text-3xl font-black text-white mb-1">{stat1.val}</div>
                        <div className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-black">{stat1.label}</div>
                      </div>
                      <div className="border-t border-white/8 pt-6">
                        <div className="text-3xl font-black text-white mb-1">{stat2.val}</div>
                        <div className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-black">{stat2.label}</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={img} alt={title} fill unoptimized className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 to-transparent" />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-32 px-6 md:px-16 bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 mb-3 text-center font-black">Unverifiable Praise</p>
            <h2 className="text-4xl font-black uppercase tracking-[-0.02em] text-white mb-16 text-center">What Clients Say.</h2>
          </Reveal>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2">
                  <Card className="bg-[#080808] border-white/8 rounded-none h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-[#ff003c] fill-[#ff003c]" />
                        ))}
                      </div>
                      <p className="text-base text-white/55 leading-relaxed flex-1 mb-6 font-bold uppercase tracking-[-0.01em]">"{t.quote}"</p>
                      <Separator className="bg-white/5 mb-5" />
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 rounded-none">
                          <AvatarFallback className="bg-white/5 text-white/60 text-xs font-black rounded-none">{t.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.3em] text-white font-black">{t.name}</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-black">{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-4 bg-[#080808] border-white/15 text-white hover:bg-white hover:text-[#080808] rounded-none transition-all duration-200" />
            <CarouselNext className="cursor-pointer -right-4 bg-[#080808] border-white/15 text-white hover:bg-white hover:text-[#080808] rounded-none transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-32 px-6 md:px-16" id="contact">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/22 mb-3 font-black">Engagement Models</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-[-0.03em] text-white mb-4 leading-none">How We Work.</h2>
            <p className="text-sm text-white/30 max-w-md mb-20 leading-relaxed uppercase tracking-[0.12em] font-bold">Every engagement is priced based on scope, timeline, and exclusivity. These are starting points.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/8">
            {PRICING.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div className={`p-8 h-full flex flex-col border-r border-white/8 last:border-r-0 cursor-pointer transition-all duration-200 ${tier.highlight ? "bg-[#ff003c]/5 border-[#ff003c]/20" : "hover:bg-white/2"}`}>
                  {tier.highlight && (
                    <Badge className="bg-[#ff003c] text-white rounded-none text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 mb-5 w-fit">Most Popular</Badge>
                  )}
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-3 font-black">{tier.name}</p>
                  <div className="text-3xl font-black text-white mb-3 tracking-[-0.02em] leading-tight">{tier.price}</div>
                  <p className="text-[11px] text-white/30 leading-relaxed mb-8 font-bold uppercase tracking-[0.1em]">{tier.desc}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[11px] text-white/45 uppercase tracking-[0.1em] font-black">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tier.highlight ? "text-[#ff003c]" : "text-white/25"}`} /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`cursor-pointer w-full py-4 text-[10px] uppercase tracking-[0.35em] font-black transition-all duration-200 ${tier.highlight ? "bg-[#ff003c] text-white hover:bg-white hover:text-[#080808]" : "border border-white/12 text-white hover:border-white/40 hover:bg-white/4"}`}>
                    Enquire Now
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/22 mb-3 font-black">How We Work</p>
            <h2 className="text-4xl font-black uppercase tracking-[-0.02em] text-white mb-16">Common Questions.</h2>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-0">
            {FAQS_DATA.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-white/5 border-t-0">
                <AccordionTrigger className="cursor-pointer text-left text-sm text-white/70 hover:text-white hover:no-underline transition-all duration-200 py-6 uppercase tracking-[0.08em] font-black">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/38 leading-relaxed pb-6 font-medium">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-32 px-6 md:px-16 text-center relative overflow-hidden border-t border-white/5">
        <motion.div animate={{ opacity: [0, 0.03, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute inset-0 bg-[#ff003c]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/18 mb-8 font-black">Applications Open · Q3 2026</p>
            <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-[-0.03em] text-white leading-[0.82] mb-12">
              <GlitchText text="Make" /><br />
              <span className="text-white/10" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}>something</span><br />
              <GlitchText text="brutal." />
            </h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/25 font-black max-w-sm mx-auto mb-12 leading-relaxed">We accept three new client relationships per quarter. Apply early.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:void@voidagency.com" className="cursor-pointer flex items-center gap-2 px-12 py-5 bg-[#ff003c] text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-[#080808] transition-all duration-200">
                Start the Conversation <ArrowRight className="w-4 h-4" />
              </a>
              <button className="cursor-pointer px-12 py-5 border border-white/15 text-white text-[10px] uppercase tracking-[0.35em] font-black hover:border-white/40 hover:bg-white/4 transition-all duration-200">
                View All Work
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <span className="text-2xl font-black uppercase tracking-[-0.02em] mb-5 block">VOID</span>
              <p className="text-[11px] text-white/25 leading-relaxed max-w-xs mb-7 uppercase tracking-[0.1em] font-black">Brand systems, digital experience, and motion design for companies that refuse to be forgettable. Berlin · Paris · Los Angeles.</p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <button key={i} className="cursor-pointer w-8 h-8 border border-white/8 flex items-center justify-center text-white/20 hover:border-[#ff003c]/50 hover:text-[#ff003c] transition-all duration-200">
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: "Work", links: ["Brand Systems", "Digital Experience", "Motion & Film", "Campaign Direction"] },
              { title: "Studio", links: ["About", "Manifesto", "Process", "Careers"] },
              { title: "Contact", links: ["New Projects", "Press", "Partnerships", "Berlin Office"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[9px] uppercase tracking-[0.45em] text-white/20 mb-5 font-black">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="cursor-pointer text-[11px] uppercase tracking-[0.15em] text-white/28 hover:text-[#ff003c] transition-all duration-200 font-black">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-white/5 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-white/15 font-black">
            <span>VOID AGENCY</span>
            <span>© 2026 Void Agency GmbH. All rights reserved.</span>
            <span>Berlin · Paris · LA</span>
          </div>
        </div>
      </footer>

      <style>{`::-webkit-scrollbar{width:4px;background:#080808}::-webkit-scrollbar-thumb{background:#ffffff10}`}</style>
    </div>
  )
}
