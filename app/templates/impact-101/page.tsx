"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"

const CODE_SNIPPETS = [
  "const wallet = await blockbase.init()",
  "const tx = await contract.deploy()",
  "const hash = await eth.sendTransaction()",
  "const data = await api.query(filters)",
]

const PRODUCTS = [
  { id: 1, name: "SDK", desc: "TypeScript SDK for all chains", features: ["Type-safe", "Auto-refresh", "Batch ops"], code: "npm install @blockbase/sdk" },
  { id: 2, name: "API", desc: "RESTful + GraphQL endpoints", features: ["100% uptime", "Rate limits", "Webhooks"], code: "https://api.blockbase.dev" },
  { id: 3, name: "Node", desc: "Self-hosted validator node", features: ["Easy setup", "Monitoring", "Rewards"], code: "docker pull blockbase/node" },
  { id: 4, name: "Analytics", desc: "Real-time blockchain insights", features: ["Charts", "Alerts", "Export"], code: "blockbase.analytics.query()" },
]

const CHAINS = ["Ethereum", "Solana", "Base", "Polygon", "Arbitrum", "Avalanche", "BSC", "Optimism"]

const PRICING = [
  { tier: "Starter", price: "Free", features: ["100K calls/month", "Community support", "Public API"] },
  { tier: "Growth", price: "$199", features: ["10M calls/month", "Email support", "Private API"] },
  { tier: "Enterprise", price: "Custom", features: ["Unlimited", "24/7 support", "Custom infra"] },
]

const INTEGRATIONS = ["Hardhat", "Foundry", "Truffle", "Remix", "Ethers.js", "Web3.py"]

const SECURITY = [
  { q: "Is the code audited?", a: "Yes. Independent audits by Trail of Bits completed. Reports available." },
  { q: "What's the bug bounty?", a: "Up to $100K for critical vulnerabilities. Coordinated disclosure on HackerOne." },
  { q: "How do you handle keys?", a: "Zero-knowledge architecture. Keys never leave your device. Full encryption." },
  { q: "What about compliance?", a: "SOC 2 Type II certified. GDPR compliant. Contracts available." },
]

const TESTIMONIALS = [
  { text: "Blockbase saved us 6 months of infrastructure work. Production-ready immediately.", author: "CTO, DeFi Protocol", company: Badge },
  { text: "The API performance is unmatched. 99.99% uptime guaranteed. Fantastic.", author: "Lead Dev, Trading Firm", company: Badge },
  { text: "Support is incredible. Questions answered in minutes. Best DevTools.", author: "Founder, Web3 Startup", company: Badge },
]

const FAQ_ITEMS = [
  { q: "Do you support testnet?", a: "Yes. Full support for Sepolia, Mumbai, Arbitrum Goerli, and all major testnets." },
  { q: "What about RPC limits?", a: "No artificial limits. Horizontal scaling handles any load. Contact us for enterprise SLA." },
  { q: "Can I self-host?", a: "Absolutely. Docker images available. Kubernetes configs included. Enterprise license required." },
  { q: "What about data retention?", a: "Configurable. Keep on-chain indefinitely or set custom retention policies." },
]

const STATS = [{ value: "50K", label: "Devs" }, { value: "500M", label: "Txns" }, { value: "99.99%", label: "Uptime" }, { value: "200+", label: "Chains" }]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
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

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

function Terminal() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % CODE_SNIPPETS.length), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#0a0a0f] border border-[#1e90ff]/30 rounded-lg p-6 font-mono text-sm">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <span className="text-[#1e90ff]">{'>'}</span> <span className="text-[#00ff88]">{CODE_SNIPPETS[index]}</span>
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
          <span className="text-[#1e90ff]">|</span>
        </motion.span>
      </motion.div>
    </div>
  )
}

export default function BlockBase() {
  const [selectedTab, setSelectedTab] = useState("SDK")
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  return (
    <div className="bg-[#05080f] text-white overflow-hidden font-mono">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-md border-b border-[#1e90ff]/10 z-50 flex items-center justify-between px-6">
        <div className="text-2xl font-bold tracking-wider">{'<'}<span className="text-[#1e90ff]">BLOCKBASE</span>{'>'}</div>
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="#products" className="hover:text-[#1e90ff] transition">Products</Link>
          <Link href="#pricing" className="hover:text-[#1e90ff] transition">Pricing</Link>
          <Link href="#security" className="hover:text-[#1e90ff] transition">Security</Link>
        </div>
      </nav>

      <motion.section style={{ opacity: heroOpacity, y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e90ff]/10 to-[#00ff88]/10" />
        <div className="relative z-10 max-w-4xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8">
            <Terminal />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            BLOCKCHAIN INFRASTRUCTURE
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-xl text-gray-300 mb-8 max-w-2xl">
            Enterprise-grade APIs and SDKs for 200+ blockchains. Zero friction. Maximum uptime.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
            <Dialog>
              <DialogTrigger asChild>
                <MagneticBtn className="px-8 py-4 bg-[#1e90ff] text-white font-bold rounded-full hover:bg-[#1e90ff]/80 transition">
                  Get API Key
                </MagneticBtn>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0a0f] border-[#1e90ff]/20 max-w-md">
                <DialogTitle>Get Started</DialogTitle>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#1e90ff]/30 rounded text-white font-mono" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#1e90ff]/30 rounded text-white font-mono" />
                  <input type="text" placeholder="Project Name" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#1e90ff]/30 rounded text-white font-mono" />
                  <button type="submit" className="w-full px-4 py-3 bg-[#1e90ff] text-white font-bold rounded hover:bg-[#1e90ff]/80 transition font-mono">
                    Create Account
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </motion.section>

      <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="text-5xl font-bold mb-4 text-center">Products</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Complete developer toolkit for blockchain applications.</p>
        </Reveal>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#0a0a0f] border border-[#1e90ff]/20 mb-8">
            {PRODUCTS.map((prod) => (
              <TabsTrigger key={prod.name} value={prod.name} className="data-[state=active]:bg-[#1e90ff] data-[state=active]:text-black">
                {prod.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {PRODUCTS.map((prod) => (
            <TabsContent key={prod.id} value={prod.name}>
              <Card className="bg-[#0a0a0f] border-[#1e90ff]/20">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-4 text-[#1e90ff]">{prod.name}</h3>
                  <p className="text-gray-300 mb-6">{prod.desc}</p>
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-3">Features:</p>
                    <div className="space-y-2">
                      {prod.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-[#00ff88]">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <pre className="bg-[#0d0d15] border border-[#1e90ff]/20 rounded p-4 overflow-auto">
                    <code className="text-[#00ff88]">{prod.code}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="py-24 px-6 bg-[#0a0a0f]">
        <Reveal delay={0.1}>
          <h2 className="text-5xl font-bold mb-4 text-center">Supported Chains</h2>
          <p className="text-gray-400 text-center mb-12">200+ blockchains. One API.</p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4">
          {CHAINS.map((chain, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <Badge className="bg-[#1e90ff] text-white px-6 py-3 text-base">{chain}</Badge>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="text-5xl font-bold mb-4 text-center">Pricing</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Pay as you grow. No lock-in.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((plan, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-[#0a0a0f] border-[#1e90ff]/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
                  <p className="text-3xl font-bold text-[#1e90ff] mb-6">{plan.price}</p>
                  <ul className="space-y-3">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00ff88] mt-1">→</span>
                        <span className="text-gray-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="text-center">
              <div className="text-4xl font-bold text-[#1e90ff] mb-2"><Counter target={stat.value} suffix="" /></div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-16">
          <h2 className="text-5xl font-bold text-center mb-4">Integrations</h2>
          <p className="text-gray-400 text-center">Works with your favorite tools.</p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4">
          {INTEGRATIONS.map((tool, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <Badge variant="outline" className="border-[#1e90ff]/30 text-[#00ff88] px-6 py-3 text-base">{tool}</Badge>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="security" className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal delay={0.1} className="mb-12">
          <h2 className="text-5xl font-bold text-center mb-4">Security</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4">
          {SECURITY.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-[#1e90ff]/20">
              <AccordionTrigger className="text-lg font-semibold hover:text-[#1e90ff] transition">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-16">
          <h2 className="text-5xl font-bold text-center mb-4">Developer Stories</h2>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {TESTIMONIALS.map((testi, idx) => (
              <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="bg-[#0a0a0f] border-[#1e90ff]/20 h-full">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <p className="text-gray-300 italic mb-4 flex-1">"{testi.text}"</p>
                    <div>
                      <p className="text-sm text-[#1e90ff] font-semibold">— {testi.author}</p>
                      <p className="text-xs text-gray-500">{testi.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-[#1e90ff]/30" />
          <CarouselNext className="border-[#1e90ff]/30" />
        </Carousel>
      </section>

      <section className="py-24 px-6 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <Reveal delay={0.1} className="mb-12">
            <h2 className="text-5xl font-bold text-center mb-4">FAQ</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border-[#1e90ff]/20">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#1e90ff] transition">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Build on Blockbase</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">50K+ developers already trust us. Start building in minutes.</p>
          <Dialog>
            <DialogTrigger asChild>
              <MagneticBtn className="px-8 py-4 bg-[#1e90ff] text-white font-bold rounded-full hover:bg-[#1e90ff]/80 transition">
                Get Started Free
              </MagneticBtn>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0f] border-[#1e90ff]/20">
              <DialogTitle>Create Account</DialogTitle>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#1e90ff]/30 rounded text-white font-mono" />
                <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#1e90ff]/30 rounded text-white font-mono" />
                <input type="text" placeholder="Project Name" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#1e90ff]/30 rounded text-white font-mono" />
                <textarea placeholder="What are you building?" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#1e90ff]/30 rounded text-white font-mono h-24" />
                <button type="submit" className="w-full px-4 py-3 bg-[#1e90ff] text-white font-bold rounded hover:bg-[#1e90ff]/80 transition font-mono">
                  Get API Key
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
