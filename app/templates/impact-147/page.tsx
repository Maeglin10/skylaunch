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
import { Dna, Beaker, Target, Users, TrendingUp, Menu, X, ChevronRight, Award, Zap } from "lucide-react"

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

const programs = [
  { id: 1, name: "CRISPR-101", phase: "Phase 3", indication: "Sickle Cell Disease", status: 85, trials: 2400 },
  { id: 2, name: "RNA-2847", phase: "Phase 2", indication: "Liver Fibrosis", status: 62, trials: 1800 },
  { id: 3, name: "CELL-5039", phase: "Phase 1", indication: "Multiple Myeloma", status: 38, trials: 600 },
  { id: 4, name: "mRNA-3102", phase: "Approved", indication: "Melanoma", status: 100, trials: 5200 },
  { id: 5, name: "GENE-7744", phase: "Discovery", indication: "Hemophilia B", status: 15, trials: 200 },
  { id: 6, name: "RNAi-4521", phase: "Phase 2", indication: "Duchenne Muscular Dystrophy", status: 48, trials: 1400 },
]

const platforms = [
  { name: "CRISPR™", desc: "Base editing for genetic correction", pubs: 47 },
  { name: "RNAi", desc: "Gene silencing & pathway modulation", pubs: 92 },
  { name: "mRNA", desc: "Immunological & protein replacement", pubs: 156 },
  { name: "Cell Therapy", desc: "Ex vivo CAR-T & allogeneic", pubs: 68 },
]

const clinicalData = [
  { metric: "Efficacy", value: 94, color: "#10b981" },
  { metric: "Safety", value: 98, color: "#0ea5e9" },
  { metric: "Enrollment", value: 87, color: "#6366f1" },
]

const leadership = [
  { initials: "Dr. J.P.", role: "Chief Science Officer", institution: "Stanford School of Medicine", cred: "PhD" },
  { initials: "Dr. E.M.", role: "VP Clinical Affairs", institution: "NIH/NHLBI", cred: "MD" },
  { initials: "Dr. A.K.", role: "VP Regulatory", institution: "FDA CBER", cred: "PhD" },
  { initials: "Dr. R.T.", role: "Chief Medical Officer", institution: "UCSF/CTSF", cred: "MD" },
]

export default function HelixBiotech() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-[#050c14] text-white min-h-screen font-sans">
      {/* NAV */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[#0ea5e9]/20 bg-[#050c14]/80 px-6 md:px-12 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#10b981] rounded-lg flex items-center justify-center">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">HELIX</span>
          </div>

          <div className="hidden lg:flex gap-12 text-sm font-medium text-white/60">
            <button className="hover:text-white transition-colors cursor-pointer duration-200">Pipeline</button>
            <button className="hover:text-white transition-colors cursor-pointer duration-200">Science</button>
            <button className="hover:text-white transition-colors cursor-pointer duration-200">Team</button>
            <button className="hover:text-white transition-colors cursor-pointer duration-200">News</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer hidden md:inline-flex bg-[#0ea5e9] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0d94d4] transition-all duration-200 text-sm">
              Investor Inquiry
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden cursor-pointer">
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#050c14] border-[#0ea5e9]/20">
                <div className="flex flex-col gap-6 mt-8">
                  <button className="hover:text-[#0ea5e9] transition-colors cursor-pointer">Pipeline</button>
                  <button className="hover:text-[#0ea5e9] transition-colors cursor-pointer">Science</button>
                  <button className="hover:text-[#0ea5e9] transition-colors cursor-pointer">Team</button>
                  <button className="hover:text-[#0ea5e9] transition-colors cursor-pointer">News</button>
                  <Separator className="bg-[#0ea5e9]/20" />
                  <button onClick={() => { setDialogOpen(true); setMobileOpen(false); }} className="cursor-pointer bg-[#0ea5e9] text-white px-6 py-2 rounded-lg font-semibold w-full">
                    Investor Inquiry
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center pt-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              rotateZ: [0, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#0ea5e9] to-[#10b981] rounded-full blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              rotateZ: [360, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#10b981] to-[#0ea5e9] rounded-full blur-3xl opacity-15"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1),transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <Badge className="bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/40 text-xs font-semibold px-4 py-1.5">
              Advancing Gene Therapy
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black leading-tight tracking-tight"
          >
            Genetic Medicine <br /> <span className="bg-gradient-to-r from-[#0ea5e9] to-[#10b981] bg-clip-text text-transparent">Redefined</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Cutting-edge gene therapy platforms targeting rare genetic diseases. 12 active programs advancing clinical development with precision medicine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-4 justify-center"
          >
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer bg-gradient-to-r from-[#0ea5e9] to-[#0d94d4] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#0ea5e9]/50 transition-all duration-200 flex items-center gap-2">
              Schedule Briefing <ChevronRight className="w-4 h-4" />
            </button>
            <button className="cursor-pointer border border-[#0ea5e9]/40 text-white px-8 py-3 rounded-lg font-semibold hover:border-[#0ea5e9] hover:bg-[#0ea5e9]/5 transition-all duration-200">
              Pipeline Overview
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* PIPELINE TABS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#050c14] to-[#0a111f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Clinical Pipeline</h2>
              <p className="text-white/60 text-lg">6 programs spanning early discovery to approved therapies</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-[#0ea5e9]/10 p-1 mb-8">
                {["all", "phase1", "phase2", "phase3", "approved", "discovery"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="text-xs md:text-sm cursor-pointer data-[state=active]:bg-[#0ea5e9] data-[state=active]:text-white">
                    {tab === "all" ? "All" : tab === "phase1" ? "Ph1" : tab === "phase2" ? "Ph2" : tab === "phase3" ? "Ph3" : tab === "approved" ? "✓" : "Discovery"}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {programs.map((prog, i) => (
                  <Reveal key={prog.id} delay={i * 0.05}>
                    <div className="bg-[#0a111f] border border-[#0ea5e9]/20 rounded-xl p-6 hover:border-[#0ea5e9]/40 transition-all duration-200 cursor-pointer group">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{prog.name}</h3>
                          <p className="text-white/60 text-sm">{prog.indication}</p>
                        </div>
                        <Badge className={prog.phase === "Approved" ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40" : prog.phase.includes("3") ? "bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/40" : "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40"}>
                          {prog.phase}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Trial Enrollment</span>
                          <span className="font-semibold">{prog.status}%</span>
                        </div>
                        <Progress value={prog.status} className="h-2 bg-[#0ea5e9]/20" />
                        <p className="text-xs text-white/40 mt-2">{prog.trials.toLocaleString()} patients enrolled</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* SCIENCE PLATFORMS */}
      <section className="py-24 px-6 md:px-12 bg-[#050c14]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Scientific Platforms</h2>
              <p className="text-white/60 text-lg">Proprietary modalities enabling precision medicine</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((plat, i) => (
              <Reveal key={plat.name} delay={i * 0.1}>
                <Card className="bg-gradient-to-br from-[#0ea5e9]/10 to-[#10b981]/10 border border-[#0ea5e9]/20 hover:border-[#0ea5e9]/40 transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Beaker className="w-8 h-8 text-[#0ea5e9] group-hover:text-[#10b981] transition-colors" />
                      <Badge className="bg-[#0ea5e9]/20 text-[#0ea5e9] text-xs">{plat.pubs} pubs</Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{plat.name}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{plat.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLINICAL DATA */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#050c14] to-[#0a111f]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Clinical Outcomes</h2>
          </Reveal>

          <div className="space-y-8">
            {clinicalData.map((data, i) => (
              <Reveal key={data.metric} delay={i * 0.1}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{data.metric}</span>
                    <span className="text-2xl font-black" style={{ color: data.color }}>{data.value}%</span>
                  </div>
                  <Progress value={data.value} className="h-3 bg-white/10" style={{ background: `${data.color}20` }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS MARQUEE */}
      <section className="py-20 px-6 md:px-12 bg-[#050c14] border-y border-[#0ea5e9]/10">
        <Reveal>
          <h3 className="text-center text-white/60 font-semibold mb-12">Strategic Partners</h3>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {["Pfizer", "Roche", "NIH", "FDA", "EMA"].map((partner, i) => (
              <Badge key={partner} className="bg-[#0ea5e9]/10 text-white border-[#0ea5e9]/30 px-4 py-2 cursor-pointer hover:bg-[#0ea5e9]/20 transition-all duration-200">
                {partner}
              </Badge>
            ))}
          </div>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#050c14] via-[#0a111f] to-[#050c14]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Programs", value: 12, suffix: "" },
              { label: "Years in Development", value: 8, suffix: "" },
              { label: "Patients Treated", value: 500, suffix: "" },
              { label: "Capital Raised", value: 200, suffix: "M€" }
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-[#0ea5e9] mb-2">
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
      <section className="py-24 px-6 md:px-12 bg-[#050c14]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Leadership</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, i) => (
              <Reveal key={leader.role} delay={i * 0.1}>
                <Card className="bg-[#0a111f] border border-[#0ea5e9]/20 hover:border-[#0ea5e9]/40 transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="w-16 h-16 mb-4 border-2 border-[#0ea5e9]/30 group-hover:border-[#0ea5e9] transition-colors">
                        <AvatarFallback className="bg-gradient-to-br from-[#0ea5e9] to-[#10b981] text-white font-black">
                          {leader.initials}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="bg-[#10b981]/20 text-[#10b981] text-xs mb-3">{leader.cred}</Badge>
                    </div>
                    <h3 className="font-bold mb-2">{leader.role}</h3>
                    <p className="text-white/60 text-sm">{leader.institution}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#050c14] to-[#0a111f]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Publications</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { journal: "Nature Medicine", year: "2024", title: "CRISPR-based therapy demonstrates safety" },
                  { journal: "Cell", year: "2023", title: "Novel mRNA delivery mechanism" },
                  { journal: "NEJM", year: "2023", title: "Phase 3 trial results published" },
                  { journal: "Science", year: "2024", title: "Gene correction efficacy data" }
                ].map((pub, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-[#0a111f] border border-[#0ea5e9]/20 h-full hover:border-[#0ea5e9]/40 transition-all duration-200 cursor-pointer">
                      <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div>
                          <Badge className="bg-[#0ea5e9]/20 text-[#0ea5e9] text-xs mb-3">{pub.journal}</Badge>
                          <p className="font-semibold text-sm line-clamp-2 mb-2">{pub.title}</p>
                        </div>
                        <p className="text-white/60 text-xs">{pub.year}</p>
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
      <section className="py-24 px-6 md:px-12 bg-[#050c14]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">FAQ</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "What is your pipeline status?", a: "We have 12 active programs spanning discovery through approved indications, with 6 in clinical development." },
                { q: "How do you approach IP protection?", a: "Comprehensive patent portfolio with 240+ issued and pending patents covering platforms and applications." },
                { q: "What are your partnership opportunities?", a: "We collaborate with pharma majors, biotech, academic institutions, and patient organizations on specific programs." },
                { q: "What's your FDA pathway strategy?", a: "Expedited pathways including Breakthrough Therapy and Fast Track designations for qualified programs." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-[#0ea5e9]/20 rounded-lg px-4 data-[state=open]:border-[#0ea5e9]/40 transition-all">
                  <AccordionTrigger className="cursor-pointer hover:text-[#0ea5e9] transition-colors py-4">
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

      {/* INQUIRY DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0a111f] border-[#0ea5e9]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl">Investor Inquiry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="email" placeholder="Your email" className="w-full bg-[#050c14] border border-[#0ea5e9]/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-[#0ea5e9] outline-none cursor-text" />
            <textarea placeholder="Your message" rows={4} className="w-full bg-[#050c14] border border-[#0ea5e9]/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-[#0ea5e9] outline-none resize-none cursor-text" />
            <MagneticBtn className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0d94d4] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#0ea5e9]/50 transition-all duration-200">
              Send Inquiry
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
