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
import { Share2, TrendingUp, Menu, X, ChevronRight, Eye, MessageSquare, Award, Zap } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>{children}</motion.div>
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 90
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target; } return n; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

const services = [
  { name: "Social Strategy", platforms: ["TikTok", "Instagram", "LinkedIn"], desc: "Audience growth & community building" },
  { name: "Content Creation", platforms: ["TikTok", "YouTube", "Instagram"], desc: "Short-form & long-form video" },
  { name: "Paid Social", platforms: ["Meta", "TikTok Ads", "YouTube"], desc: "Performance marketing campaigns" },
  { name: "Influencer", platforms: ["All"], desc: "Creator partnerships & collaborations" },
  { name: "Analytics", platforms: ["All"], desc: "Reporting & performance insights" }
]

const caseStudies = [
  { brand: "TechStart Co", metric: "+340%", desc: "Engagement growth", industry: "SaaS" },
  { brand: "Fashion Brand", metric: "+1.2M", desc: "Reach in 6mo", industry: "E-commerce" },
  { brand: "Health App", metric: "4.1x", desc: "ROAS achieved", industry: "HealthTech" },
  { brand: "Food Startup", metric: "+85%", desc: "Follower growth", industry: "F&B" },
  { brand: "Beauty Brand", metric: "500K", desc: "UGC pieces created", industry: "Beauty" },
  { brand: "SaaS Company", metric: "18%", desc: "CTR on campaigns", industry: "B2B SaaS" }
]

const platforms = [
  { name: "TikTok", certified: 95, lead: 150 },
  { name: "Instagram", certified: 88, lead: 140 },
  { name: "LinkedIn", certified: 72, lead: 110 },
  { name: "YouTube", certified: 80, lead: 130 }
]

const team = [
  { initials: "A.M.", role: "Strategy Lead", spec: "TikTok Specialist" },
  { initials: "J.R.", role: "Creative Director", spec: "Content Creator" },
  { initials: "S.K.", role: "Paid Media", spec: "Meta Expert" }
]

export default function OrbitMedia() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-[#08080f] text-white min-h-screen font-sans">
      {/* NAV */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[#7c3aed]/20 bg-[#08080f]/80 px-6 md:px-12 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#7c3aed] to-[#ec4899] rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">ORBIT</span>
          </div>

          <div className="hidden lg:flex gap-12 text-sm font-medium text-white/60">
            <button className="hover:text-white transition-colors cursor-pointer duration-200">Services</button>
            <button className="hover:text-white transition-colors cursor-pointer duration-200">Results</button>
            <button className="hover:text-white transition-colors cursor-pointer duration-200">Team</button>
            <button className="hover:text-white transition-colors cursor-pointer duration-200">Blog</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer hidden md:inline-flex bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7c3aed]/50 transition-all duration-200 text-sm">
              Discovery Call
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden cursor-pointer">
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#08080f] border-[#7c3aed]/20">
                <div className="flex flex-col gap-6 mt-8">
                  <button className="hover:text-[#7c3aed] transition-colors cursor-pointer">Services</button>
                  <button className="hover:text-[#7c3aed] transition-colors cursor-pointer">Results</button>
                  <button className="hover:text-[#7c3aed] transition-colors cursor-pointer">Team</button>
                  <button className="hover:text-[#7c3aed] transition-colors cursor-pointer">Blog</button>
                  <Separator className="bg-[#7c3aed]/20" />
                  <button onClick={() => { setDialogOpen(true); setMobileOpen(false); }} className="cursor-pointer bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white px-6 py-2 rounded-lg font-semibold w-full">
                    Discovery Call
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* HERO WITH FLOATING BUBBLES */}
      <motion.section className="relative min-h-screen flex items-center justify-center pt-32 px-6 overflow-hidden">
        {/* Animated floating metrics */}
        {[
          { x: "10%", y: "20%", text: "+1.2M Reach", delay: 0 },
          { x: "85%", y: "30%", text: "+340% Engagement", delay: 0.2 },
          { x: "15%", y: "70%", text: "4.1x ROAS", delay: 0.4 },
          { x: "80%", y: "75%", text: "500K+ UGC", delay: 0.6 },
          { x: "50%", y: "15%", text: "200 Brands", delay: 0.3 }
        ].map((bubble, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, delay: bubble.delay }}
            className="absolute"
            style={{ left: bubble.x, top: bubble.y }}
          >
            <motion.div
              animate={{
                y: [0, 20, -20, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 4 + i, repeat: Infinity }}
              className="w-32 h-32 bg-gradient-to-br from-[#7c3aed] to-[#ec4899] rounded-full blur-3xl"
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white text-center mix-blend-screen">
              {bubble.text}
            </div>
          </motion.div>
        ))}

        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <Badge className="bg-[#7c3aed]/20 text-[#7c3aed] border-[#7c3aed]/40 text-xs font-semibold px-4 py-1.5">
              Social Media & Content Marketing Agency
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black leading-tight tracking-tight"
          >
            Go <span className="bg-gradient-to-r from-[#7c3aed] to-[#ec4899] bg-clip-text text-transparent">Viral</span> <br /> By Design
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Data-driven social media strategy and content creation that turns followers into customers. 200 brands. 5B+ reach. 8 years of results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-4 justify-center"
          >
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7c3aed]/50 transition-all duration-200 flex items-center gap-2">
              Get Started <ChevronRight className="w-4 h-4" />
            </button>
            <button className="cursor-pointer border border-[#7c3aed]/40 text-white px-8 py-3 rounded-lg font-semibold hover:border-[#7c3aed] hover:bg-[#7c3aed]/5 transition-all duration-200">
              View Results
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* SERVICES TABS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#08080f] to-[#0f0f1e]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Our Services</h2>
              <p className="text-white/60 text-lg">End-to-end social media solutions</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-[#7c3aed]/10 p-1 mb-8">
                {["all", "strategy", "content", "paid", "influencer", "analytics"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="text-xs md:text-sm cursor-pointer data-[state=active]:bg-[#7c3aed] data-[state=active]:text-white">
                    {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {services.map((svc, i) => (
                  <Reveal key={svc.name} delay={i * 0.05}>
                    <Card className="bg-[#0f0f1e] border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-all duration-200 cursor-pointer group">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3">{svc.name}</h3>
                        <p className="text-white/60 text-sm mb-4">{svc.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {svc.platforms.map(plat => (
                            <Badge key={plat} className="bg-[#7c3aed]/20 text-[#7c3aed] text-xs">{plat}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 px-6 md:px-12 bg-[#08080f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Client Results</h2>
              <p className="text-white/60 text-lg">Real results from real brands</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, i) => (
              <Reveal key={study.brand} delay={i * 0.05}>
                <Card className="bg-gradient-to-br from-[#7c3aed]/10 to-[#ec4899]/10 border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-8 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{study.brand}</h3>
                      <Badge className="bg-[#ec4899]/20 text-[#ec4899] w-fit text-xs">{study.industry}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-[#7c3aed]">{study.metric}</div>
                      <p className="text-white/60 text-sm">{study.desc}</p>
                    </div>
                    <button className="text-[#7c3aed] text-sm font-semibold hover:text-[#ec4899] transition-colors cursor-pointer">
                      View Case Study →
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM EXPERTISE */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#08080f] to-[#0f0f1e]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Platform Expertise</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-8">
              {platforms.map((plat, i) => (
                <div key={plat.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{plat.name}</span>
                    <span className="text-[#7c3aed] font-black">{plat.certified}% Team Certified</span>
                  </div>
                  <Progress value={plat.certified} className="h-3 bg-white/10" style={{ background: `rgba(124, 58, 237, 0.1)` }} />
                  <p className="text-white/60 text-sm">{plat.lead} team members specialized</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIRAL CONTENT CAROUSEL */}
      <section className="py-24 px-6 md:px-12 bg-[#08080f]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Viral Campaign Highlights</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { title: "TechStart Launch", views: "2.4M", engagement: "18%" },
                  { title: "Beauty Launch", views: "1.8M", engagement: "24%" },
                  { title: "Food Brand", views: "3.2M", engagement: "21%" },
                  { title: "Fashion Collab", views: "1.5M", engagement: "19%" }
                ].map((campaign, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <Card className="bg-[#0f0f1e] border border-[#7c3aed]/20">
                      <CardContent className="p-8 space-y-4">
                        <h3 className="font-bold text-2xl">{campaign.title}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-white/60 text-sm mb-1">Total Views</p>
                            <p className="text-2xl font-black text-[#7c3aed]">{campaign.views}</p>
                          </div>
                          <div>
                            <p className="text-white/60 text-sm mb-1">Engagement</p>
                            <p className="text-2xl font-black text-[#ec4899]">{campaign.engagement}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer" />
              <CarouselNext className="cursor-pointer" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#08080f] via-[#0f0f1e] to-[#08080f]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Brands Served", value: 200, suffix: "" },
              { label: "Total Reach", value: 5, suffix: "B" },
              { label: "Years Active", value: 8, suffix: "" },
              { label: "Avg ROAS", value: 4.1, suffix: "x" }
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-[#7c3aed] mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/60">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 px-6 md:px-12 bg-[#08080f]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Our Team</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.role} delay={i * 0.1}>
                <Card className="bg-[#0f0f1e] border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="w-16 h-16 mb-4 border-2 border-[#7c3aed]/30 group-hover:border-[#7c3aed] transition-colors">
                        <AvatarFallback className="bg-gradient-to-br from-[#7c3aed] to-[#ec4899] text-white font-bold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="bg-[#ec4899]/20 text-[#ec4899] text-xs mb-3">{member.spec}</Badge>
                    </div>
                    <h3 className="font-bold mb-2">{member.role}</h3>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#08080f] to-[#0f0f1e]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Client Testimonials</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { name: "CEO, TechStart", quote: "Went from 10K to 500K followers in 6 months. Orbit's strategy was transformational." },
                  { name: "CMO, Fashion Brand", quote: "Best agency we've worked with. Results speak for themselves: 4.1x ROAS." },
                  { name: "Founder, SaaS", quote: "Orbit understands our audience. Content resonates and converts." }
                ].map((review, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <Card className="bg-[#0f0f1e] border border-[#7c3aed]/20">
                      <CardContent className="p-8">
                        <p className="text-white font-semibold mb-4">"{review.quote}"</p>
                        <p className="text-white/60">— {review.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer" />
              <CarouselNext className="cursor-pointer" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 bg-[#08080f]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">FAQ</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "What does onboarding look like?", a: "1-week discovery sprint including audience analysis, competitor audit, and strategy framework. Deliverables: content calendar, messaging guide, KPI dashboard." },
                { q: "Who owns the content we create?", a: "You do. All content created is fully owned by your brand. We provide unlimited revisions until you're satisfied." },
                { q: "How do you measure success?", a: "Custom KPI dashboard tracking reach, engagement, conversion, and ROAS. Weekly reports with insights and optimization recommendations." },
                { q: "What's your typical contract?", a: "3-month minimum engagement. Month-to-month after that. No setup fees. Pricing scales with results and scope." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-[#7c3aed]/20 rounded-lg px-4 data-[state=open]:border-[#7c3aed]/40 transition-all">
                  <AccordionTrigger className="cursor-pointer hover:text-[#7c3aed] transition-colors py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* DISCOVERY DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0f0f1e] border-[#7c3aed]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl">Schedule Discovery Call</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Your name" className="w-full bg-[#08080f] border border-[#7c3aed]/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-[#7c3aed] outline-none cursor-text" />
            <input type="email" placeholder="Your email" className="w-full bg-[#08080f] border border-[#7c3aed]/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-[#7c3aed] outline-none cursor-text" />
            <input type="tel" placeholder="Phone number" className="w-full bg-[#08080f] border border-[#7c3aed]/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-[#7c3aed] outline-none cursor-text" />
            <textarea placeholder="Tell us about your goals" rows={3} className="w-full bg-[#08080f] border border-[#7c3aed]/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-[#7c3aed] outline-none resize-none cursor-text" />
            <MagneticBtn className="w-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7c3aed]/50 transition-all duration-200">
              Book Call
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
