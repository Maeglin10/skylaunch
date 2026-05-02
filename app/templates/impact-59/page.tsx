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
  Wind, Leaf, Sun, Moon, Mountain, Heart, Check, Star,
  Menu, ArrowRight, ChevronRight, MapPin, Users, Clock,
  Twitter, Instagram, Youtube
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

const RETREATS = [
  {
    id: 1, name: "Sonoran Silence", location: "Arizona Desert, USA", duration: "7 Nights",
    price: "from $4,200", theme: "Stillness", season: "Oct–Apr",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    desc: "Seven days in an ancient desert landscape. Dawn somatic practice, silent midday walks, evening fire ceremonies. No agenda. No schedule beyond your own unfolding.",
    details: [["Group Size", "Max 9 participants"], ["Setting", "Private desert sanctuary"], ["Practice", "Somatic therapy + silence"], ["Meals", "Biodynamic plant cuisine"]],
  },
  {
    id: 2, name: "Icelandic Deep Reset", location: "Westfjords, Iceland", duration: "5 Nights",
    price: "from $5,800", theme: "Clarity", season: "Jun–Aug",
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    desc: "Geothermal pools at midnight. Midnight sun for orientation. Five days designed to dissolve the residue of over-functioning and restore access to your own thinking.",
    details: [["Group Size", "Max 9 participants"], ["Setting", "Isolated fjord lodge"], ["Practice", "Breathwork + thermal immersion"], ["Meals", "Icelandic foraged cuisine"]],
  },
  {
    id: 3, name: "Kyoto Forest Immersion", location: "Arashiyama, Japan", duration: "6 Nights",
    price: "from $6,100", theme: "Presence", season: "Mar–May · Oct–Nov",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    desc: "Shinrin-yoku through Arashiyama bamboo groves. Zen walking sequences with a lineage-trained teacher. Tea ceremony as contemplative practice. Silence as the deepest form of presence.",
    details: [["Group Size", "Max 9 participants"], ["Setting", "Private ryokan retreat"], ["Practice", "Zen practice + forest bathing"], ["Meals", "Kaiseki plant cuisine"]],
  },
  {
    id: 4, name: "Patagonian Edge", location: "Torres del Paine, Chile", duration: "8 Nights",
    price: "from $7,400", theme: "Solitude", season: "Nov–Mar",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    desc: "The world's most dramatic landscape as teacher. Wilderness solitude, guided solo days, ecological meditation at the edge of the known world. Eight days you will reference for the rest of your life.",
    details: [["Group Size", "Max 9 participants"], ["Setting", "Remote lodge, Torres del Paine"], ["Practice", "Wilderness solitude + eco-meditation"], ["Meals", "Patagonian plant cuisine"]],
  },
]

const TESTIMONIALS = [
  { name: "Isabelle Fontenay", role: "Investment Director, Paris", avatar: "IF", rating: 5, quote: "I arrived depleted to the point of invisibility. The Kyoto immersion gave me access to something I had not felt since childhood — genuine quiet inside my own mind. I returned to work as a different person. My team noticed before I did." },
  { name: "David Achterberg", role: "Founder & CEO, Amsterdam", avatar: "DA", rating: 5, quote: "I was sceptical of the no-device policy. By day two I was grateful. By day four I had made a decision I had been avoiding for three years. Luminal didn't make that decision for me. It gave me the conditions to make it myself." },
  { name: "Nina Vasquez", role: "Architect, Mexico City", avatar: "NV", rating: 5, quote: "Luminal does not promise transformation. It creates conditions for it. I returned home unrecognisable to myself in the best possible way — clearer, slower, and with something I can only describe as restored capacity for wonder." },
  { name: "Kenji Watanabe", role: "Creative Director, Tokyo", avatar: "KW", rating: 5, quote: "The Patagonian Edge changed my relationship to time permanently. I've been more creative in the eight months since than in the previous three years. The ROI on eight days at the end of the earth is incalculable." },
]

const STATS_DATA = [
  { label: "Retreats Delivered", to: 214, suffix: "", icon: Sun },
  { label: "Locations Worldwide", to: 18, suffix: "", icon: MapPin },
  { label: "Max Per Group", to: 9, suffix: "", icon: Users },
  { label: "Participants Served", to: 1830, suffix: "+", icon: Heart },
  { label: "Years of Practice", to: 11, suffix: "", icon: Leaf },
  { label: "Satisfaction Rate", to: 98, suffix: "%", icon: Star },
]

const PRICING = [
  {
    name: "Single Retreat", price: "from $4,200", highlight: false,
    desc: "One transformative experience. Application required.",
    features: ["Single retreat of your choice", "Pre-intake consultation", "Comprehensive arrival guide", "Full board biodynamic cuisine", "Post-retreat integration call", "Access to alumni community"],
  },
  {
    name: "Annual Journey", price: "from $14,800", highlight: true,
    desc: "Three retreats across a year. The most powerful container we offer.",
    features: ["Three retreats across 12 months", "Seasonal rhythm design session", "Monthly one-to-one integration calls", "Priority access to new locations", "Custom practice recommendations", "Dedicated Luminal guide", "Lifetime alumni access"],
  },
  {
    name: "Private Retreat", price: "Bespoke", highlight: false,
    desc: "A Luminal experience designed entirely for you or your small group.",
    features: ["Fully private programme design", "Your chosen dates and location", "Dedicated guide and practitioners", "Up to 4 participants", "Custom schedule and practices", "Post-retreat support programme"],
  },
]

const FAQS_DATA = [
  { q: "Who is Luminal designed for?", a: "Luminal serves high-functioning individuals experiencing burnout, creative depletion, or a sustained sense of disconnection from meaning. We do not offer clinical therapy. We offer conditions for genuine rest and re-orientation at depth. Our participants include founders, artists, executives, and athletes." },
  { q: "Is technology permitted during retreats?", a: "Devices are surrendered on arrival and returned on departure. This is non-negotiable and constitutes the first transformative act of the retreat. Exceptions are available for medical devices only. We have never had a participant regret this policy." },
  { q: "How small are the groups?", a: "Every Luminal retreat is capped at nine participants. This is not scalable and is entirely intentional. The intimacy of small numbers is foundational to our method. Many participants name the group relationships as among the most significant outcomes of their experience." },
  { q: "What if I have a significant mental health history?", a: "We require a 45-minute pre-intake call with our clinical advisor prior to booking. Certain conditions may require medical clearance. Your safety is the only constraint we refuse to negotiate. We have successfully supported participants with a wide range of histories with appropriate preparation." },
  { q: "What does a typical day look like?", a: "There is no typical day. There is no schedule distributed in advance. This is intentional. You will know what each day holds when you wake. Broadly: mornings are for somatic or contemplative practice, afternoons for nature immersion or solitude, evenings for shared inquiry or fire ceremony." },
  { q: "How far in advance should I apply?", a: "Most of our retreats book 3–4 months in advance. High-demand locations (Kyoto cherry blossom, Iceland midnight sun) book 6+ months ahead. Annual Journey participants receive priority access. We maintain a waitlist and honour it scrupulously." },
]

const NAV_LINKS = ["Retreats", "Practice", "Philosophy", "Reflections", "Apply"]

export default function LuminalRetreatsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const [activeRetreat, setActiveRetreat] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#f4f1ec] text-[#1a1a1a] min-h-screen" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled ? "bg-[#f4f1ec]/92 backdrop-blur-xl border-b border-[#1a1a1a]/8 py-4" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <span className="text-lg tracking-[0.32em] uppercase text-[#1a1a1a] font-bold">Luminal</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="cursor-pointer text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a]/42 hover:text-[#1a1a1a] transition-all duration-200">{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="#apply" className="cursor-pointer px-6 py-3 bg-[#3d7a5e] text-[#f4f1ec] text-[10px] uppercase tracking-[0.28em] hover:bg-[#1a1a1a] transition-all duration-200">
              Apply Now
            </a>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer text-[#1a1a1a] hover:text-[#3d7a5e] transition-all duration-200">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#f4f1ec] border-l border-[#1a1a1a]/8 w-72">
              <div className="flex flex-col gap-9 pt-12">
                {NAV_LINKS.map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="cursor-pointer text-2xl tracking-[0.22em] uppercase text-[#1a1a1a]/38 hover:text-[#1a1a1a] transition-all duration-200">{l}</a>
                ))}
                <Separator className="bg-[#1a1a1a]/8" />
                <a href="#apply" className="cursor-pointer px-6 py-4 bg-[#3d7a5e] text-[#f4f1ec] text-[10px] uppercase tracking-[0.28em] text-center hover:bg-[#1a1a1a] transition-all duration-200">Apply Now</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end pb-28 px-6 md:px-16" id="retreats">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" alt="Mountain landscape at sunrise" fill unoptimized className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f1ec] via-[#f4f1ec]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f1ec]/50 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 mb-7">
            <Badge className="bg-[#3d7a5e]/12 border border-[#3d7a5e]/25 text-[#3d7a5e] text-[9px] uppercase tracking-[0.38em] rounded-none px-3 py-1">Immersive Retreats · 9 Participants Max</Badge>
            <Badge className="bg-[#1a1a1a]/5 border border-[#1a1a1a]/12 text-[#1a1a1a]/45 text-[9px] uppercase tracking-[0.32em] rounded-none px-3 py-1">No Devices · No Agenda</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[7.5vw] font-bold leading-[0.88] text-[#1a1a1a] mb-7 tracking-tight"
          >
            Rest is not<br />a reward.<br /><em className="text-[#3d7a5e]">It is the work.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-base text-[#1a1a1a]/50 max-w-lg mb-11 leading-relaxed">
            Luminal designs profound retreat experiences in the world's most transformative landscapes. Maximum nine participants. No devices. No agenda beyond your own deepening.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-wrap gap-4">
            <a href="#retreats" className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-[#f4f1ec] text-xs uppercase tracking-[0.28em] hover:bg-[#3d7a5e] transition-all duration-200">
              View 2026 Programme <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#philosophy" className="cursor-pointer flex items-center gap-2 px-8 py-4 border border-[#1a1a1a]/20 text-[#1a1a1a] text-xs uppercase tracking-[0.28em] hover:bg-[#1a1a1a] hover:text-[#f4f1ec] transition-all duration-200">
              Our Philosophy
            </a>
          </motion.div>
        </div>

        {/* Floating stat cards */}
        <div className="absolute right-8 md:right-16 bottom-28 hidden lg:flex flex-col gap-3 z-10">
          {[
            { label: "Locations Worldwide", val: "18" },
            { label: "Max Per Retreat", val: "9" },
            { label: "Satisfaction Rate", val: "98%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.15 }}
              className="bg-[#f4f1ec]/88 backdrop-blur border border-[#1a1a1a]/10 px-5 py-3 flex items-center gap-4"
            >
              <span className="text-xl font-bold text-[#3d7a5e]">{stat.val}</span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-[#1a1a1a]/40">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-20 px-6 md:px-16 bg-[#1a1a1a] text-[#f4f1ec]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {STATS_DATA.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <s.icon className="w-4 h-4 text-[#a8c5b8] mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-[#a8c5b8] mb-1">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#f4f1ec]/28 leading-snug">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── RETREAT CARDS ── */}
      <section className="py-32 px-6 md:px-16" id="retreats">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.42em] text-[#1a1a1a]/38 mb-3">2026 Programme</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-5 leading-tight">Where We Go.</h2>
            <p className="text-base text-[#1a1a1a]/45 max-w-lg mb-20 leading-relaxed italic">Four landscapes. Four distinct practices. Each chosen because the terrain itself is the teacher.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {RETREATS.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.1}>
                <Card className="bg-transparent border-[#1a1a1a]/10 rounded-none overflow-hidden cursor-pointer group hover:border-[#3d7a5e]/35 transition-all duration-200" onClick={() => setActiveRetreat(i)}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={r.img} alt={r.name} fill unoptimized className="object-cover transition-transform duration-[3s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/65 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#3d7a5e] text-[#f4f1ec] rounded-none text-[9px] uppercase tracking-[0.3em] px-3 py-1">{r.theme}</Badge>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#f4f1ec]/65 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />{r.location}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#f4f1ec]/45 flex items-center gap-1.5 mt-1">
                          <Clock className="w-3 h-3" />{r.duration} · {r.season}
                        </p>
                      </div>
                      <p className="text-base font-bold text-[#f4f1ec]">{r.price}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#1a1a1a] tracking-[0.04em] uppercase mb-2 group-hover:text-[#3d7a5e] transition-all duration-200">{r.name}</h3>
                    <p className="text-sm text-[#1a1a1a]/45 italic leading-relaxed">{r.desc.slice(0, 95)}...</p>
                    <div className="flex items-center gap-1.5 mt-4 text-[9px] uppercase tracking-[0.3em] text-[#3d7a5e]/55 cursor-pointer group-hover:text-[#3d7a5e] transition-all duration-200">
                      Apply for this retreat <ChevronRight className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RETREAT MODAL ── */}
      <Dialog open={activeRetreat !== null} onOpenChange={() => setActiveRetreat(null)}>
        <DialogContent className="bg-[#f4f1ec] border border-[#1a1a1a]/12 text-[#1a1a1a] max-w-2xl rounded-none p-0 overflow-hidden">
          {activeRetreat !== null && (
            <>
              <div className="relative aspect-[16/9]">
                <Image src={RETREATS[activeRetreat].img} alt={RETREATS[activeRetreat].name} fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-[#3d7a5e] text-[#f4f1ec] rounded-none text-[9px] uppercase tracking-[0.28em] px-3 py-1">{RETREATS[activeRetreat].theme}</Badge>
              </div>
              <div className="p-8 md:p-10">
                <DialogHeader>
                  <p className="text-[9px] uppercase tracking-[0.38em] text-[#3d7a5e]/70 mb-1">{RETREATS[activeRetreat].location} · {RETREATS[activeRetreat].duration}</p>
                  <DialogTitle className="text-2xl font-bold uppercase tracking-[0.06em] text-[#1a1a1a]">{RETREATS[activeRetreat].name}</DialogTitle>
                  <p className="text-xl font-bold text-[#3d7a5e]">{RETREATS[activeRetreat].price}</p>
                </DialogHeader>
                <p className="text-sm text-[#1a1a1a]/52 leading-relaxed italic mt-5 mb-7">{RETREATS[activeRetreat].desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {RETREATS[activeRetreat].details.map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs border-b border-[#1a1a1a]/8 pb-2.5">
                      <span className="text-[#1a1a1a]/35 uppercase tracking-[0.2em]">{k}</span>
                      <span className="text-[#1a1a1a]/65">{v}</span>
                    </div>
                  ))}
                </div>
                <a href="#apply" className="cursor-pointer w-full block text-center py-4 bg-[#3d7a5e] text-[#f4f1ec] text-xs uppercase tracking-[0.3em] hover:bg-[#1a1a1a] transition-all duration-200" onClick={() => setActiveRetreat(null)}>
                  Request Application
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── PRACTICE PILLARS TABS ── */}
      <section className="py-32 px-6 md:px-16 bg-[#e8e3da] border-y border-[#1a1a1a]/8" id="practice">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.42em] text-[#1a1a1a]/38 mb-3">Our Method</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-16 leading-tight">The Four Pillars.</h2>
          </Reveal>
          <Tabs defaultValue="somatic" className="w-full">
            <TabsList className="bg-transparent border-b border-[#1a1a1a]/12 rounded-none p-0 mb-14 w-full flex gap-0 h-auto justify-start overflow-x-auto">
              {[
                { val: "somatic", label: "Somatic Therapy", icon: Heart },
                { val: "contemplative", label: "Contemplative Practice", icon: Moon },
                { val: "nature", label: "Nature Immersion", icon: Leaf },
                { val: "nutrition", label: "Nutritional Restoration", icon: Sun },
              ].map(({ val, label, icon: Icon }) => (
                <TabsTrigger key={val} value={val} className="cursor-pointer rounded-none flex-shrink-0 px-5 py-5 text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/35 data-[state=active]:bg-transparent data-[state=active]:text-[#1a1a1a] data-[state=active]:border-b-2 data-[state=active]:border-[#3d7a5e] transition-all duration-200 flex items-center gap-2 border-b-2 border-transparent">
                  <Icon className="w-3.5 h-3.5" /><span>{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {[
              {
                val: "somatic", icon: Heart,
                title: "Somatic Therapy", subtitle: "Body-based trauma release through movement and re-patterning.",
                desc: "We carry history in our bodies. Somatic therapy works directly with the nervous system — through movement, breath, and proprioceptive re-patterning — to release patterns held below the threshold of conscious thought. Our practitioners are certified in Somatic Experiencing and Sensorimotor Psychotherapy.",
                bullets: ["Certified Somatic Experiencing practitioners", "Nervous system regulation through movement", "Proprioceptive re-patterning techniques", "One-to-one and group somatic sessions", "Integration practices for daily life"],
                progress: [["Effectiveness for Burnout", 94], ["Nervous System Regulation", 97], ["Participant Satisfaction", 98]],
                img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
              },
              {
                val: "contemplative", icon: Moon,
                title: "Contemplative Practice", subtitle: "Vipassana-informed meditation with lineage-trained teachers.",
                desc: "Our contemplative offerings are rooted in tradition without being bound by it. Vipassana-informed sitting practice, Zen walking sequences, and non-directive inquiry are adapted for the modern mind without diluting their essential power. We work with teachers trained in living lineages.",
                bullets: ["Vipassana-informed sitting meditation", "Zen walking sequences (kinhin)", "Non-directive inquiry practices", "Lineage-trained meditation teachers", "Daily practice booklets for home integration"],
                progress: [["Depth of Practice", 96], ["Teacher Quality", 99], ["Integration Support", 92]],
                img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
              },
              {
                val: "nature", icon: Leaf,
                title: "Nature Immersion", subtitle: "Shinrin-yoku and wilderness solitude as fundamental practice.",
                desc: "Shinrin-yoku (forest bathing), guided wilderness solitude days, and ecological meditation restore what urban life systematically removes: our fundamental attunement to the living world. Research shows that 40 minutes in nature reduces cortisol by 21%. We give you days.",
                bullets: ["Guided forest bathing (shinrin-yoku)", "Structured wilderness solo periods", "Ecological meditation and earth connection", "Wildlife observation as contemplative practice", "Night sky immersion"],
                progress: [["Cortisol Reduction", 89], ["Reported Clarity", 96], ["Nature Connection Score", 94]],
                img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
              },
              {
                val: "nutrition", icon: Sun,
                title: "Nutritional Restoration", subtitle: "Biodynamic, plant-forward cuisine for nervous system repair.",
                desc: "Every meal at a Luminal retreat is designed by our nutritional therapist for nervous system support, anti-inflammatory benefit, and digestive restoration. Biodynamic, plant-forward, and alcohol-free. Our cuisine is not a restriction — it is a revelation of what food can feel like.",
                bullets: ["Biodynamic plant-forward cuisine", "Designed for nervous system support", "Anti-inflammatory and restorative", "Alcohol-free across all retreats", "Nutritional therapist consultation"],
                progress: [["Nutritional Quality", 98], ["Digestive Improvement", 91], ["Participant Enjoyment", 97]],
                img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
              },
            ].map(({ val, title, subtitle, desc, bullets, progress, img }) => (
              <TabsContent key={val} value={val} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                  <div>
                    <h3 className="text-4xl font-bold text-[#1a1a1a] mb-3 tracking-tight">{title}</h3>
                    <p className="text-base text-[#3d7a5e] mb-6 italic leading-relaxed">{subtitle}</p>
                    <p className="text-sm text-[#1a1a1a]/50 leading-relaxed mb-9 italic">{desc}</p>
                    <ul className="space-y-3 mb-10">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-sm text-[#1a1a1a]/55 italic">
                          <Check className="w-3.5 h-3.5 text-[#3d7a5e] shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-4">
                      {progress.map(([label, val]) => (
                        <div key={label}>
                          <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/35 mb-2">
                            <span>{label}</span><span className="text-[#3d7a5e]">{val}%</span>
                          </div>
                          <Progress value={val as number} className="h-0.5 bg-[#1a1a1a]/10 [&>div]:bg-[#3d7a5e]" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={img} alt={title} fill unoptimized className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 to-transparent" />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-32 px-6 md:px-16" id="reflections">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.42em] text-[#1a1a1a]/38 mb-3 text-center">Participant Reflections</p>
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-16 text-center tracking-tight">What Participants Say.</h2>
          </Reveal>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2">
                  <Card className="bg-[#e8e3da] border-[#1a1a1a]/8 rounded-none h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-[#3d7a5e] fill-[#3d7a5e]" />
                        ))}
                      </div>
                      <p className="text-base text-[#1a1a1a]/58 italic leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                      <Separator className="bg-[#1a1a1a]/8 mb-5" />
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 rounded-none">
                          <AvatarFallback className="bg-[#3d7a5e]/12 text-[#3d7a5e] text-xs font-bold rounded-none">{t.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-[#3d7a5e] uppercase tracking-[0.2em]">{t.name}</p>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#1a1a1a]/35">{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-4 bg-[#f4f1ec] border-[#1a1a1a]/15 text-[#1a1a1a] hover:bg-[#3d7a5e] hover:text-[#f4f1ec] hover:border-[#3d7a5e] rounded-none transition-all duration-200" />
            <CarouselNext className="cursor-pointer -right-4 bg-[#f4f1ec] border-[#1a1a1a]/15 text-[#1a1a1a] hover:bg-[#3d7a5e] hover:text-[#f4f1ec] hover:border-[#3d7a5e] rounded-none transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-32 px-6 md:px-16 bg-[#e8e3da] border-t border-[#1a1a1a]/8" id="apply">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.42em] text-[#1a1a1a]/38 mb-3 text-center">Engagement Paths</p>
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4 text-center tracking-tight">Choose Your Container.</h2>
            <p className="text-sm text-[#1a1a1a]/45 text-center max-w-md mx-auto mb-20 italic leading-relaxed">Applications reviewed within 72 hours. All retreats require a pre-intake call.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1a1a1a]/10">
            {PRICING.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div className={`p-8 h-full flex flex-col border-r border-[#1a1a1a]/10 last:border-r-0 cursor-pointer transition-all duration-200 ${tier.highlight ? "bg-[#3d7a5e]/6 border-[#3d7a5e]/20" : "bg-transparent hover:bg-[#1a1a1a]/2"}`}>
                  {tier.highlight && (
                    <Badge className="bg-[#3d7a5e] text-[#f4f1ec] rounded-none text-[9px] uppercase tracking-[0.3em] px-3 py-1 mb-5 w-fit">Recommended</Badge>
                  )}
                  <p className="text-[10px] uppercase tracking-[0.42em] text-[#1a1a1a]/35 mb-2">{tier.name}</p>
                  <div className="text-2xl font-bold text-[#1a1a1a] mb-3 leading-tight">{tier.price}</div>
                  <p className="text-xs text-[#1a1a1a]/40 italic leading-relaxed mb-8">{tier.desc}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#1a1a1a]/50 italic">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tier.highlight ? "text-[#3d7a5e]" : "text-[#1a1a1a]/30"}`} /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`cursor-pointer w-full py-4 text-xs uppercase tracking-[0.3em] transition-all duration-200 ${tier.highlight ? "bg-[#3d7a5e] text-[#f4f1ec] hover:bg-[#1a1a1a]" : "border border-[#1a1a1a]/18 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f1ec]"}`}>
                    Apply Now
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-6 md:px-16" id="philosophy">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.42em] text-[#1a1a1a]/38 mb-3">Before You Apply</p>
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-16 tracking-tight">Common Questions.</h2>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-0">
            {FAQS_DATA.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#1a1a1a]/8 border-t-0">
                <AccordionTrigger className="cursor-pointer text-left text-base text-[#1a1a1a]/72 hover:text-[#1a1a1a] hover:no-underline transition-all duration-200 py-6 leading-snug font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#1a1a1a]/48 italic leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-32 px-6 md:px-16 bg-[#3d7a5e] text-[#f4f1ec] relative overflow-hidden">
        <div className="absolute inset-0 opacity-12">
          <Image src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80" alt="Patagonia" fill unoptimized className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#3d7a5e]/88" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-[#f4f1ec]/42 mb-6">Applications reviewed in 72 hours</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#f4f1ec] mb-5 leading-tight">
              You already<br /><em>know it's time.</em>
            </h2>
            <p className="text-[#f4f1ec]/52 mb-12 text-sm italic max-w-sm mx-auto leading-relaxed">Nine participants. No devices. One question: what would you discover in real silence?</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#apply" className="cursor-pointer flex items-center gap-2 px-12 py-5 bg-[#f4f1ec] text-[#3d7a5e] text-xs uppercase tracking-[0.38em] hover:bg-[#1a1a1a] hover:text-[#f4f1ec] transition-all duration-200">
                Apply for a Retreat <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#retreats" className="cursor-pointer flex items-center gap-2 px-12 py-5 border border-[#f4f1ec]/25 text-[#f4f1ec] text-xs uppercase tracking-[0.32em] hover:bg-[#f4f1ec]/8 transition-all duration-200">
                Browse Retreats
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1a1a1a]/8 bg-[#f4f1ec]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <span className="text-xl tracking-[0.32em] uppercase text-[#1a1a1a] font-bold mb-4 block">Luminal</span>
              <p className="text-xs text-[#1a1a1a]/35 italic leading-relaxed max-w-xs mb-7">Immersive retreat experiences in the world's most transformative landscapes. Maximum nine participants. No devices. Stillness as practice.</p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button key={i} className="cursor-pointer w-8 h-8 border border-[#1a1a1a]/12 flex items-center justify-center text-[#1a1a1a]/30 hover:border-[#3d7a5e]/45 hover:text-[#3d7a5e] transition-all duration-200">
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: "Retreats", links: ["Sonoran Silence", "Icelandic Reset", "Kyoto Immersion", "Patagonian Edge"] },
              { title: "Practice", links: ["Somatic Therapy", "Contemplative Practice", "Nature Immersion", "Nutritional Restoration"] },
              { title: "Connect", links: ["Apply", "Philosophy", "Alumni", "Press"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[9px] uppercase tracking-[0.42em] text-[#3d7a5e]/55 mb-5">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="cursor-pointer text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/32 hover:text-[#3d7a5e] transition-all duration-200 italic">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-[#1a1a1a]/8 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-[#1a1a1a]/25">
            <span>Luminal Retreats</span>
            <span>© 2026 Luminal Ltd. All rights reserved.</span>
            <span>Stillness as Practice</span>
          </div>
        </div>
      </footer>

      <style>{`::-webkit-scrollbar{width:6px;background:#f4f1ec}::-webkit-scrollbar-thumb{background:#1a1a1a15}`}</style>
    </div>
  )
}
