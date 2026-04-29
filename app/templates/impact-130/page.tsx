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

function Reveal({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>
}
function Counter({ target, suffix="" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = Math.ceil(target / 60)
    const t = setInterval(() => setCount(c => Math.min(c + step, target)), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}
function MagneticBtn({ children, className="" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width/2) * 0.35)
    y.set((e.clientY - r.top - r.height/2) * 0.35)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={className}>{children}</motion.button>
}

const SERVICES = [
  { id: 1, name: "Media Relations", deliverables: ["Press releases", "Media outreach", "Crisis management", "Exclusive access"], retainer: "$8K-15K/mo" },
  { id: 2, name: "Crisis Comms", deliverables: ["24/7 response", "Scenario planning", "Stakeholder management", "Recovery strategy"], retainer: "$12K-25K/mo" },
  { id: 3, name: "Brand Positioning", deliverables: ["Strategy development", "Messaging framework", "Competitive analysis", "Brand audit"], retainer: "$10K-18K/mo" },
  { id: 4, name: "Thought Leadership", deliverables: ["Content strategy", "Byline placement", "Speaking opportunities", "Executive visibility"], retainer: "$9K-16K/mo" },
  { id: 5, name: "Social Strategy", deliverables: ["Platform strategy", "Content calendar", "Community management", "Influencer relations"], retainer: "$6K-12K/mo" },
  { id: 6, name: "Influencer Activation", deliverables: ["Talent scouting", "Campaign management", "Content amplification", "Performance tracking"], retainer: "$7K-14K/mo" },
]

const CASES = [
  { id: 1, industry: "Tech", situation: "Acquisition announcement", result: "400K+ media mentions", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600" },
  { id: 2, industry: "Finance", situation: "Leadership transition", result: "60+ tier-1 placements", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600" },
  { id: 3, industry: "Health", situation: "Product launch", result: "15M earned media value", img: "https://images.unsplash.com/photo-1554224311-beaf415c15e7?w=600" },
  { id: 4, industry: "Consumer", situation: "Brand relaunch", result: "92% favorable sentiment", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600" },
  { id: 5, industry: "B2B", situation: "Thought leadership", result: "35+ speaking engagements", img: "https://images.unsplash.com/photo-1552669406-6bde9eaf4303?w=600" },
  { id: 6, industry: "Nonprofit", situation: "Campaign launch", result: "$5M funding secured", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600" },
]

const TEAM = [
  { name: "Alexandra Park", role: "Media Relations Lead", beat: "Technology", avatar: "AP" },
  { name: "Marcus Johnson", role: "Crisis Director", beat: "Corporate", avatar: "MJ" },
  { name: "Elena Rodriguez", role: "Thought Leadership", beat: "Innovation", avatar: "ER" },
  { name: "James Chen", role: "Social Strategist", beat: "Influencer", avatar: "JC" },
]

const MEDIA = ["New York Times", "Financial Times", "TechCrunch", "Forbes", "BBC", "Bloomberg", "WSJ", "The Guardian"]

const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "CMO, Fortune 500", quote: "Transformed our media presence in 90 days." },
  { name: "David Yang", role: "CEO, Scale-up", quote: "Secured $50M Series B with their positioning." },
  { name: "Jennifer Lee", role: "COO, Enterprise", quote: "Crisis management saved our reputation." },
]

export default function HeraldPRPage() {
  const [selectedCase, setSelectedCase] = useState<typeof CASES[0] | null>(null)
  const [clientOpen, setClientOpen] = useState(false)
  const { scrollY } = useScroll()

  const revealText = (text: string) => {
    return text.split("").map((char, i) => (
      <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
        {char}
      </motion.span>
    ))
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Editorial Hero with Text Reveal */}
      <section className="relative h-[80vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-white via-[#f5f5f3] to-white px-8">
        <div className="max-w-4xl text-center z-10">
          <Reveal>
            <h1 className="text-7xl md:text-9xl font-black leading-tight mb-8">
              <div>{revealText("YOUR STORY,")}</div>
              <motion.div className="text-[#2563eb] mt-2">{revealText("AMPLIFIED.")}</motion.div>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-gray-600 mb-12">
              Public relations, communications strategy, and media influence for brands that matter.
            </p>
          </Reveal>
          <motion.button className="px-8 py-4 bg-[#2563eb] text-white font-bold uppercase tracking-wider hover:bg-blue-600 transition">
            Schedule Consultation
          </motion.button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-6xl font-black mb-4">Services</h2>
          <p className="text-2xl text-gray-600 mb-16">Retainer packages tailored to your needs</p>
        </Reveal>
        <Tabs defaultValue="media" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-12 bg-[#f5f5f3] p-2 rounded-none">
            {SERVICES.map(svc => (
              <TabsTrigger
                key={svc.id}
                value={svc.name.toLowerCase().replace(" ", "")}
                className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white text-xs"
              >
                {svc.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {SERVICES.map(svc => (
            <TabsContent key={svc.id} value={svc.name.toLowerCase().replace(" ", "")}>
              <Reveal>
                <Card className="bg-[#f5f5f3] border-black/10">
                  <CardContent className="pt-8 space-y-6">
                    <div>
                      <h3 className="text-3xl font-black mb-4">{svc.name}</h3>
                      <p className="text-2xl text-[#2563eb] font-bold mb-8">{svc.retainer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-600">Key Deliverables</p>
                      <ul className="space-y-2">
                        {svc.deliverables.map(d => (
                          <li key={d} className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-[#2563eb]" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Case Studies */}
      <section className="py-32 px-8 md:px-16 bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-6xl font-black mb-16">Case Studies</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CASES.map((cse, i) => (
              <Reveal key={cse.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCase(cse)}
                >
                  <div className="relative h-64 mb-6 rounded-lg overflow-hidden border-2 border-black">
                    <Image src={cse.img} alt={cse.industry} fill className="object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <Badge className="bg-[#2563eb] text-white mb-3">{cse.industry}</Badge>
                  <h3 className="text-xl font-black mb-2">{cse.situation}</h3>
                  <p className="text-lg font-bold text-[#2563eb]">{cse.result}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Detail Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl bg-white border-2 border-black">
          <DialogHeader>
            <DialogTitle>{selectedCase?.situation}</DialogTitle>
          </DialogHeader>
          {selectedCase && (
            <div className="space-y-6">
              <div className="relative h-80 rounded-lg overflow-hidden border-2 border-black">
                <Image src={selectedCase.img} alt={selectedCase.industry} fill className="object-cover" />
              </div>
              <Carousel className="w-full">
                <CarouselContent>
                  {[1, 2, 3].map(i => (
                    <CarouselItem key={i} className="md:basis-1/2">
                      <div className="relative h-40 bg-[#f5f5f3] rounded-lg border border-black">
                        <Image
                          src={`https://images.unsplash.com/photo-${1558000000000 + i * 1000}?w=500`}
                          alt="Press"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="space-y-3 pt-4 border-t-2 border-black">
                <p className="font-bold">Industry: {selectedCase.industry}</p>
                <p className="text-gray-600">Result: {selectedCase.result}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Media Coverage */}
      <section className="py-16 px-8 md:px-16 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-center text-gray-400 mb-12 uppercase tracking-widest font-bold">Our Placements</p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-8">
            {MEDIA.map((outlet, i) => (
              <Reveal key={i}>
                <p className="font-black text-lg hover:text-[#2563eb] transition cursor-pointer">
                  {outlet}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { number: 200, label: "Brands Served", suffix: "" },
            { number: 12, label: "Years Experience", suffix: "" },
            { number: 5, label: "Placements Per Client", suffix: "K+" },
            { number: 49, label: "Award Winning", suffix: "%" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-5xl font-black text-[#2563eb] mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600 font-bold">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-8 md:px-16 bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-6xl font-black mb-16">The Team</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className="bg-white border-2 border-black">
                  <CardContent className="pt-8 space-y-4 text-center">
                    <Avatar className="mx-auto w-16 h-16 border-2 border-[#2563eb]">
                      <AvatarFallback className="bg-[#2563eb] text-white font-black">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-black text-lg">{member.name}</p>
                      <p className="text-sm font-bold text-[#2563eb]">{member.role}</p>
                      <p className="text-xs text-gray-600 mt-2">Beat: {member.beat}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-6xl font-black mb-16">Client Stories</h2>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((test, i) => (
                <CarouselItem key={i} className="md:basis-1/2">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#f5f5f3] border-2 border-black">
                      <CardContent className="pt-8 space-y-6">
                        <p className="text-xl italic font-light">"{test.quote}"</p>
                        <div>
                          <p className="font-black">{test.name}</p>
                          <p className="text-sm font-bold text-[#2563eb]">{test.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Retainer Process */}
      <section className="py-32 px-8 md:px-16 bg-[#f5f5f3]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-6xl font-black mb-12">Our Process</h2>
          </Reveal>
          <Accordion className="space-y-4">
            {[
              { stage: "Discovery", desc: "We learn your brand, market, and goals" },
              { stage: "Strategy", desc: "We develop a comprehensive 12-month plan" },
              { stage: "Execution", desc: "We build relationships and place stories" },
              { stage: "Optimization", desc: "We refine based on performance data" },
            ].map((step, i) => (
              <AccordionItem key={i} value={`process-${i}`} className="border-2 border-black rounded-none px-6">
                <AccordionTrigger className="text-2xl font-black hover:text-[#2563eb]">
                  {step.stage}
                </AccordionTrigger>
                <AccordionContent className="text-lg font-light">
                  {step.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-8 md:px-16 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-6xl font-black mb-12">FAQ</h2>
        </Reveal>
        <Accordion className="space-y-4">
          {["What's the minimum budget?", "Can we do project-based work?", "How do you measure ROI?", "Do you require exclusivity?"].map((q, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-2 border-black rounded-none px-6">
              <AccordionTrigger className="text-xl font-bold hover:text-[#2563eb]">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 font-light">
                We're flexible. Let's discuss your specific needs, timeline, and budget constraints.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* New Client CTA */}
      <section className="py-32 px-8 md:px-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-6xl font-black mb-8">Ready to Build Your Story?</h2>
            <p className="text-2xl font-light mb-12">
              Let's discuss how we can elevate your brand presence and drive meaningful results.
            </p>
          </Reveal>
          <MagneticBtn
            onClick={() => setClientOpen(true)}
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-[#2563eb] hover:text-white transition"
          >
            Schedule Strategy Call
          </MagneticBtn>
        </div>
      </section>

      {/* Client Dialog */}
      <Dialog open={clientOpen} onOpenChange={setClientOpen}>
        <DialogContent className="max-w-md bg-white border-2 border-black">
          <DialogHeader>
            <DialogTitle>New Client Inquiry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Company name"
              className="w-full px-4 py-3 border-2 border-black rounded-none focus:outline-none focus:bg-[#f5f5f3]"
            />
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-black rounded-none focus:outline-none focus:bg-[#f5f5f3]"
            />
            <textarea
              placeholder="Tell us about your business..."
              className="w-full px-4 py-3 border-2 border-black rounded-none focus:outline-none focus:bg-[#f5f5f3] h-24"
            />
            <MagneticBtn className="w-full py-3 bg-[#2563eb] text-white font-bold rounded-none hover:bg-blue-600 transition">
              Submit Inquiry
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
