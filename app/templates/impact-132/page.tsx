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
import { BookOpen, Clock, TrendingUp, Users, Menu, X, ArrowRight, Star, Globe, Rss, ChevronRight, Mail, Award } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function Counter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  useEffect(() => {
    if (!isInView) return
    const step = target / 80
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target; } return n; }), 16)
    return () => clearInterval(t)
  }, [isInView, target])
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} onClick={onClick} className={`cursor-pointer transition-all duration-200 ${className}`}>
      {children}
    </motion.button>
  )
}

const TOPICS = ["Technology", "Business", "Culture", "Science", "Politics"]

const ARTICLES = [
  { id: 1, title: "The Generative AI Revolution Will Reshape Every Industry by 2026", topic: "Technology", reading: "8 min", author: "Sarah Chen", img: "https://images.unsplash.com/photo-1677442d019cecf8d3cb45e44f0d7bbb?w=800&q=80", views: "142K" },
  { id: 2, title: "Why Global Supply Chains Are Rewiring Toward Regional Hubs", topic: "Business", reading: "12 min", author: "Marcus Thompson", img: "https://images.unsplash.com/photo-1642254060782-1fc53d30c63d?w=800&q=80", views: "98K" },
  { id: 3, title: "The New Digital Creators Are Building Billion-Dollar Empires", topic: "Culture", reading: "15 min", author: "Elena Rodriguez", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", views: "211K" },
  { id: 4, title: "Quantum Computing Reaches a Pivotal Commercial Threshold", topic: "Science", reading: "10 min", author: "James Liu", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", views: "76K" },
  { id: 5, title: "Democracy's Digital Battlefield: How Algorithms Shape Elections", topic: "Politics", reading: "18 min", author: "Olivia Park", img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80", views: "183K" },
  { id: 6, title: "The Spatial Computing Era Arrives — and It Changes Everything", topic: "Technology", reading: "11 min", author: "David Kim", img: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80", views: "94K" },
  { id: 7, title: "Private Equity's New Obsession: AI-Native Companies", topic: "Business", reading: "13 min", author: "Priya Shah", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", views: "67K" },
  { id: 8, title: "Gen Z Is Rewriting the Rules of Work — and Winning", topic: "Culture", reading: "9 min", author: "Leo Müller", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", views: "158K" },
]

const WRITERS = [
  { id: 1, name: "Sarah Chen", beat: "Technology", articles: 284, followers: "94K", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" },
  { id: 2, name: "Marcus Thompson", beat: "Politics", articles: 317, followers: "128K", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  { id: 3, name: "Elena Rodriguez", beat: "Culture", articles: 201, followers: "87K", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80" },
  { id: 4, name: "James Liu", beat: "Science", articles: 156, followers: "71K", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
]

const NEWSLETTERS = [
  { id: 1, name: "The Daily Brief", frequency: "Every morning", subs: "2.4M", openRate: "68%", desc: "The essential 5-minute briefing. 2.4 million readers start their day here.", color: "from-orange-500 to-red-500" },
  { id: 2, name: "Deep Dive Weekly", frequency: "Every Sunday", subs: "890K", openRate: "74%", desc: "Immersive investigations into the stories that define the week.", color: "from-blue-500 to-purple-500" },
  { id: 3, name: "The Long Read", frequency: "Saturdays", subs: "1.2M", openRate: "71%", desc: "Long-form narrative journalism. The kind they used to only write books about.", color: "from-emerald-500 to-teal-500" },
]

const PLANS = [
  { name: "Free", price: "€0", period: "forever", features: ["5 articles/month", "Daily Brief newsletter", "Mobile app access", "Breaking news alerts"], cta: "Start Reading", highlight: false },
  { name: "Atlas+", price: "€9", period: "/month", features: ["Unlimited articles", "All 3 newsletters", "Full archive access", "Offline reading", "Ad-free experience"], cta: "Start Free Trial", highlight: true },
  { name: "Atlas Pro", price: "€19", period: "/month", features: ["Everything in Atlas+", "Early access articles", "Quarterly briefings with editors", "Community access", "Annual print edition"], cta: "Go Pro", highlight: false },
]

export default function AtlasMediaLanding() {
  const [currentTopic, setCurrentTopic] = useState(0)
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null)
  const [showArticleDialog, setShowArticleDialog] = useState(false)
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [email, setEmail] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "25%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const navBg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"])

  useEffect(() => {
    const interval = setInterval(() => setCurrentTopic(prev => (prev + 1) % TOPICS.length), 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-white text-slate-900 min-h-screen">

      {/* Sticky Nav */}
      <motion.nav style={{ backgroundColor: navBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-slate-100/80 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900">ATLAS</span>
            <Badge className="hidden md:flex bg-orange-50 text-orange-600 border-orange-200 text-xs font-semibold">MEDIA</Badge>
          </div>
          <div className="hidden lg:flex gap-10 text-sm font-medium text-slate-500">
            {["Stories", "Writers", "Newsletters", "Pricing"].map(item => (
              <button key={item} className="hover:text-orange-500 cursor-pointer transition-all duration-200">{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all duration-200">Sign In</button>
            <MagneticBtn onClick={() => setShowSubscribeDialog(true)} className="px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all duration-200">
              Subscribe Free
            </MagneticBtn>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-all duration-200">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <nav className="flex flex-col gap-6 mt-8">
                  {["Stories", "Writers", "Newsletters", "Pricing"].map(item => (
                    <button key={item} className="text-left text-lg font-semibold text-slate-700 hover:text-orange-500 cursor-pointer transition-all duration-200">{item}</button>
                  ))}
                  <Separator />
                  <button onClick={() => { setShowSubscribeDialog(true); setMobileOpen(false) }} className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl cursor-pointer">Subscribe Free</button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(249,115,22,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(239,68,68,0.1) 0%, transparent 50%)" }} />
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent"
              style={{ left: `${5 + i * 5}%`, height: "100%", top: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }} />
          ))}
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-10">
          {/* Live ticker */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/80">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="font-semibold text-orange-300">LIVE</span>
              <span>2.4M readers online now</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight">
            The News<br />That
            <span className="relative ml-4">
              <AnimatePresence mode="wait">
                <motion.span key={currentTopic} initial={{ opacity: 0, y: 30, rotateX: -30 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -30, rotateX: 30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {TOPICS[currentTopic]}
                </motion.span>
              </AnimatePresence>
              <span className="text-white"> Needs</span>
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            Curated, verified journalism across technology, business, culture, science and politics. Read deeper. Think faster. Decide better.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticBtn onClick={() => setShowSubscribeDialog(true)} className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-200 flex items-center gap-2 justify-center">
              Start Reading Free <ArrowRight className="w-5 h-5" />
            </MagneticBtn>
            <button className="cursor-pointer px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/20 transition-all duration-200">
              See Today's Stories
            </button>
          </motion.div>

          {/* Floating social proof cards */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="hidden md:flex justify-center gap-6 mt-16">
            {[
              { label: "Daily Readers", value: "2.4M", icon: Users },
              { label: "Articles Published", value: "18,400+", icon: BookOpen },
              { label: "Avg. Reading Time", value: "12 min", icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <motion.div key={label} whileHover={{ y: -4, scale: 1.02 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-3 cursor-pointer transition-all duration-200">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-black text-lg leading-none">{value}</p>
                  <p className="text-white/50 text-xs mt-1">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 px-6 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: 2400000, suffix: "", label: "Global Readers", prefix: "" },
              { value: 50, suffix: "+", label: "Active Newsletters", prefix: "" },
              { value: 8, suffix: " years", label: "Of Publishing", prefix: "" },
              { value: 4.9, suffix: "", label: "Reader Rating", prefix: "" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-black">
                    {stat.prefix}<Counter target={stat.value} suffix={stat.suffix} decimals={stat.value < 10 ? 1 : 0} />
                    {stat.value === 4.9 && <span className="text-yellow-300 ml-1">★</span>}
                  </p>
                  <p className="text-orange-100 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories — Tabs */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <div>
                <Badge className="bg-orange-100 text-orange-600 border-0 mb-3 text-xs font-bold uppercase tracking-wider">Featured Stories</Badge>
                <h2 className="text-5xl font-black text-slate-900 leading-tight">What's Defining<br />the Conversation</h2>
              </div>
              <button className="cursor-pointer flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-200">
                See all stories <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          <Tabs defaultValue="Technology" className="w-full">
            <TabsList className="flex flex-wrap gap-2 h-auto mb-12 bg-transparent p-0">
              {TOPICS.map(topic => (
                <TabsTrigger key={topic} value={topic} className="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 font-semibold data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500 cursor-pointer transition-all duration-200 shadow-sm">
                  {topic}
                </TabsTrigger>
              ))}
            </TabsList>
            {TOPICS.map(topic => (
              <TabsContent key={topic} value={topic}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {ARTICLES.filter(a => a.topic === topic || ARTICLES.filter(a => a.topic === topic).length === 0).slice(0, 4).map((article, i) => (
                    <Reveal key={article.id} delay={i * 0.08}>
                      <motion.div whileHover={{ y: -4 }} className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100"
                        onClick={() => { setSelectedArticle(article); setShowArticleDialog(true) }}>
                        <div className="relative h-56 overflow-hidden">
                          <Image src={article.img} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge className="bg-orange-500 text-white border-0 text-xs font-bold">{article.topic}</Badge>
                          </div>
                          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> {article.views}
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors duration-200 leading-snug line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-7 h-7 border-2 border-orange-200">
                                <AvatarFallback className="text-xs bg-orange-100 text-orange-700 font-bold">{article.author[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-slate-500 font-medium">{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                              <Clock className="w-3.5 h-3.5" />
                              {article.reading} read
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Newsletter Showcase */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 space-y-4">
              <Badge className="bg-slate-100 text-slate-600 border-0 text-xs font-bold uppercase tracking-wider">Our Newsletters</Badge>
              <h2 className="text-5xl font-black text-slate-900">Your Inbox.<br />Elevated.</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">Three newsletters. Millions of readers. One standard: only what matters.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWSLETTERS.map((nl, i) => (
              <Reveal key={nl.id} delay={i * 0.12}>
                <motion.div whileHover={{ y: -6, scale: 1.01 }} className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${nl.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${nl.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-1">{nl.name}</h3>
                      <p className="text-slate-400 text-sm font-medium">{nl.frequency}</p>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{nl.desc}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="text-center">
                        <p className="text-xl font-black text-slate-900">{nl.subs}</p>
                        <p className="text-xs text-slate-400">subscribers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-black text-slate-900">{nl.openRate}</p>
                        <p className="text-xs text-slate-400">open rate</p>
                      </div>
                      <MagneticBtn onClick={() => setShowSubscribeDialog(true)} className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-orange-500 transition-all duration-200">
                        Join
                      </MagneticBtn>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Writers Carousel */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex justify-between items-end mb-16">
              <div>
                <Badge className="bg-orange-100 text-orange-600 border-0 mb-3 text-xs font-bold uppercase tracking-wider">Our Journalists</Badge>
                <h2 className="text-5xl font-black text-slate-900">The Writers<br />Behind the Words</h2>
              </div>
              <button className="cursor-pointer hidden md:flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-200">
                All writers <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {WRITERS.map((writer, i) => (
                <CarouselItem key={writer.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                  <Reveal delay={i * 0.1}>
                    <motion.div whileHover={{ y: -6 }} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-center space-y-4">
                      <Avatar className="w-24 h-24 mx-auto ring-4 ring-orange-100 group-hover:ring-orange-300 transition-all duration-200">
                        <AvatarImage src={writer.img} />
                        <AvatarFallback className="text-xl font-black bg-orange-100 text-orange-700">{writer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-black text-slate-900 text-lg">{writer.name}</h3>
                        <Badge className="bg-orange-50 text-orange-600 border-orange-100 text-xs mt-1">{writer.beat} Correspondent</Badge>
                      </div>
                      <div className="flex justify-around pt-3 border-t border-slate-100">
                        <div>
                          <p className="font-black text-slate-900">{writer.articles}</p>
                          <p className="text-xs text-slate-400">articles</p>
                        </div>
                        <div>
                          <p className="font-black text-slate-900">{writer.followers}</p>
                          <p className="text-xs text-slate-400">followers</p>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-4 shadow-lg" />
            <CarouselNext className="cursor-pointer -right-4 shadow-lg" />
          </Carousel>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <div className="text-center mb-16 space-y-4">
              <Badge className="bg-white/10 text-white/80 border-white/20 text-xs font-bold uppercase tracking-wider">Reader Voices</Badge>
              <h2 className="text-5xl font-black text-white">2.4 Million Readers.<br />One Common Truth.</h2>
            </div>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {[
                { name: "Alexandra K.", role: "Head of Product, Shopify", quote: "I cancelled three other subscriptions when I found Atlas. This is the only journalism that actually respects my intelligence.", rating: 5, img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" },
                { name: "Michael S.", role: "Founder, FinTech startup", quote: "The Daily Brief has replaced my entire morning news routine. It's like having a brilliant friend curate the world for you.", rating: 5, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" },
                { name: "Jessica P.", role: "Senior Analyst, Goldman Sachs", quote: "Atlas Deep Dives are the only things I forward to my entire team. Consistently the most insightful coverage out there.", rating: 5, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" },
                { name: "David L.", role: "CTO, Series B startup", quote: "Atlas Technology coverage is months ahead of the mainstream press. I've made better product decisions because of their reporting.", rating: 5, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" },
              ].map((testi, i) => (
                <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2">
                  <Reveal delay={i * 0.1}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 space-y-6 h-full">
                      <div className="flex gap-1">
                        {[...Array(testi.rating)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                      <p className="text-white/80 text-lg italic leading-relaxed">"{testi.quote}"</p>
                      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                        <Avatar className="w-12 h-12 ring-2 ring-orange-500/40">
                          <AvatarImage src={testi.img} />
                          <AvatarFallback className="bg-orange-900 text-orange-200 font-bold">{testi.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-white">{testi.name}</p>
                          <p className="text-white/50 text-sm">{testi.role}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer border-white/20 text-white hover:bg-white/10 -left-4" />
            <CarouselNext className="cursor-pointer border-white/20 text-white hover:bg-white/10 -right-4" />
          </Carousel>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 space-y-4">
              <Badge className="bg-orange-100 text-orange-600 border-0 text-xs font-bold uppercase tracking-wider">Pricing</Badge>
              <h2 className="text-5xl font-black text-slate-900">Invest in your<br />understanding of the world</h2>
              <p className="text-slate-500 text-lg">Start free. Upgrade when you're ready.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className={`relative rounded-3xl p-8 border-2 transition-all duration-300 ${plan.highlight ? "bg-slate-900 border-orange-500 shadow-2xl shadow-orange-100" : "bg-white border-slate-100 shadow-sm hover:shadow-xl"}`}>
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-1 font-bold shadow-lg">Most Popular</Badge>
                    </div>
                  )}
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-black mb-2 ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                      <div className="flex items-end gap-1">
                        <span className={`text-5xl font-black ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.price}</span>
                        <span className={`text-lg mb-2 ${plan.highlight ? "text-white/60" : "text-slate-400"}`}>{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((f, j) => (
                        <li key={j} className={`flex items-center gap-3 text-sm ${plan.highlight ? "text-white/80" : "text-slate-600"}`}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? "bg-orange-500" : "bg-orange-100"}`}>
                            <ChevronRight className={`w-3 h-3 ${plan.highlight ? "text-white" : "text-orange-600"}`} />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <MagneticBtn onClick={() => setShowSubscribeDialog(true)} className={`w-full py-3.5 font-bold rounded-2xl transition-all duration-200 ${plan.highlight ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-400/40" : "bg-slate-100 text-slate-900 hover:bg-orange-500 hover:text-white"}`}>
                      {plan.cta}
                    </MagneticBtn>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advertise — Accordion */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="mb-12">
              <Badge className="bg-orange-100 text-orange-600 border-0 mb-3 text-xs font-bold uppercase tracking-wider">For Brands</Badge>
              <h2 className="text-5xl font-black text-slate-900">Advertise with Atlas</h2>
              <p className="text-slate-500 text-lg mt-3">Reach 2.4M highly engaged, high-income readers who trust Atlas completely.</p>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "Formats & Rates", a: "Sponsored Deep Dives from €18,000 | Newsletter Sponsorships from €9,500 | Native Articles from €12,000 | Branded Roundups from €7,500. All placements are clearly labeled and editorially independent." },
              { q: "Our Audience", a: "2.4M engaged readers with median household income €140K+. 72% hold senior decision-making roles. 68% college-educated. Average time-on-site: 11 minutes. 74% subscription renewal rate." },
              { q: "Campaign Results", a: "Palantir Technologies: 44% increase in brand recognition among target segment. Notion: 8,200 qualified enterprise trial signups. Stripe Atlas: 3.1x the industry average CTR on sponsored content." },
              { q: "How to Get Started", a: "Fill in our brand brief form and a Media Partnerships Manager will respond within 2 business days. We typically have a 6-week lead time for premium placements." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`adv-${i}`} className="border border-slate-200 rounded-2xl px-6 bg-white shadow-sm">
                <AccordionTrigger className="font-bold text-slate-900 cursor-pointer hover:text-orange-500 transition-colors duration-200">{item.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 space-y-4">
              <Badge className="bg-slate-100 text-slate-600 border-0 text-xs font-bold uppercase tracking-wider">FAQ</Badge>
              <h2 className="text-5xl font-black text-slate-900">Frequently Asked Questions</h2>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "Is Atlas really free?", a: "Yes. Our free tier gives you 5 articles per month plus our Daily Brief newsletter. Atlas+ at €9/month unlocks unlimited access. No credit card needed to start." },
              { q: "Can I gift an Atlas+ subscription?", a: "Absolutely. Gift cards for 1-month, 6-month, and annual Atlas+ subscriptions are available. The recipient activates at their own convenience." },
              { q: "Are your journalists independent?", a: "100%. Atlas editorial team operates independently. Advertisers have zero influence over editorial coverage. Our sponsorship is clearly labeled." },
              { q: "How do I manage my newsletter preferences?", a: "Click 'Manage Preferences' in any newsletter footer, or log in to your Atlas account. You can subscribe or unsubscribe from any newsletter instantly." },
              { q: "Is there an RSS feed?", a: "Yes, full RSS feeds are available for all publications at atlas.media/rss. Perfect for your read-later workflow." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-200 rounded-2xl px-6 shadow-sm">
                <AccordionTrigger className="font-bold text-slate-900 cursor-pointer hover:text-orange-500 transition-colors duration-200">{item.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.12) 0%, transparent 70%)" }} />
        <Reveal>
          <div className="max-w-3xl mx-auto text-center relative space-y-8">
            <Badge className="bg-white/10 text-white/80 border-white/20 text-xs font-bold uppercase tracking-wider">Join 2.4M readers</Badge>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">The world is complex.<br />Your journalism shouldn't be.</h2>
            <p className="text-white/60 text-xl">Start with the free Daily Brief. No credit card. No spam. Just the world's best journalism in your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-all duration-200" />
              <MagneticBtn onClick={() => setShowSubscribeDialog(true)} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/40 whitespace-nowrap transition-all duration-200">
                Start Free
              </MagneticBtn>
            </div>
            <p className="text-white/30 text-sm">Free forever. Upgrade anytime. Unsubscribe with one click.</p>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white/50 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white text-lg">ATLAS MEDIA</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {["About", "Careers", "Advertise", "Privacy", "Terms", "RSS"].map(item => (
                <button key={item} className="cursor-pointer hover:text-white transition-colors duration-200">{item}</button>
              ))}
            </div>
            <p className="text-sm">© 2026 Atlas Media. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Article Preview Dialog */}
      <Dialog open={showArticleDialog} onOpenChange={setShowArticleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 leading-tight">{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <div className="space-y-5">
              <div className="relative h-56 rounded-2xl overflow-hidden">
                <Image src={selectedArticle.img} alt={selectedArticle.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-orange-100 text-orange-600 border-0">{selectedArticle.topic}</Badge>
                <Badge variant="outline" className="text-slate-500">{selectedArticle.reading} read</Badge>
                <Badge variant="outline" className="text-slate-500">{selectedArticle.views} views</Badge>
              </div>
              <p className="text-slate-600 leading-relaxed">This is a preview. Atlas+ subscribers get unlimited access to all articles, archives, and exclusive deep dives. Join 2.4M readers who read smarter.</p>
              <MagneticBtn onClick={() => { setShowArticleDialog(false); setShowSubscribeDialog(true) }} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-orange-200 transition-all duration-200">
                Subscribe to Read Full Article
              </MagneticBtn>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Subscribe Dialog */}
      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-slate-900">Join 2.4M Readers</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <p className="text-slate-500">Start with our free Daily Brief. No credit card, no catch.</p>
            <div className="flex gap-2">
              {["★★★★★ 4.9 on App Store", "Featured in TIME"].map(s => (
                <Badge key={s} className="bg-orange-50 text-orange-600 border-orange-100 text-xs">{s}</Badge>
              ))}
            </div>
            <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 transition-all duration-200 text-slate-900" />
            <MagneticBtn className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-orange-200 transition-all duration-200">
              Start Reading Free
            </MagneticBtn>
            <p className="text-xs text-slate-400 text-center">By subscribing you agree to our Privacy Policy. Unsubscribe anytime.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
