"use client"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Code, GitBranch } from "lucide-react"

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
    x.set((e.clientX - r.left - r.width/2) * 0.3)
    y.set((e.clientY - r.top - r.height/2) * 0.3)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

const features = [
  { before: "function parse(str) {\n  return JSON.parse(str)\n}", after: "syntax.parse('data')\n→ Type-safe, validated", title: "Smart Parsing" },
  { before: "let syntax = {\n  parse: () => {}\n}", after: "Instant autocomplete\nComplete docs inline", title: "Developer UX" },
  { before: "// Manual checks\nif (!data) error", after: "Built-in validation\nError handling", title: "Error Prevention" },
  { before: "// Copy-paste setup\nmodule.export = {}", after: "One command setup\nZero config", title: "Quick Setup" }
]

const pricingPlans = [
  { name: "Hobby", price: "Free", users: "Solo", features: ["Basic features", "5K monthly uses", "Community support"] },
  { name: "Pro", price: "$9/month", users: "Up to 5", features: ["Advanced IDE extensions", "100K monthly uses", "Priority email support", "API access"] },
  { name: "Team", price: "$19/user/month", users: "Unlimited", features: ["All Pro features", "Team collaboration", "Admin controls", "SSO authentication", "Dedicated support"] }
]

export default function SyntaxIDE() {
  const [selectedPlan, setSelectedPlan] = useState<typeof pricingPlans[0] | null>(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#0d1117] text-white font-sans">

      {/* HERO WITH CODE EDITOR */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.1)_0%,rgba(13,17,23,1)_100%)]" />
        </motion.div>

        <div className="relative z-10 max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 text-[#22c55e]">
                Syntax
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-xl mb-12">
                Developer tools & IDE extensions for Python, JavaScript, Go, Rust, and Java. 500K+ installs.
              </p>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => setOpen(true)} className="px-8 py-4 bg-[#22c55e] text-[#0d1117] font-bold cursor-pointer hover:bg-white transition-all duration-200">
                Start Free Trial
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:block">
              <div className="bg-[#161b22] border border-[#30363d] rounded p-6 font-mono text-sm">
                <div className="text-[#8b949e] mb-4 flex justify-between">
                  <span>syntax.tsx</span>
                  <span className="text-[#22c55e]">✓</span>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
                  <div className="text-[#79c0ff]">import <span className="text-[#ffa657]">Syntax</span> from <span className="text-[#a5d6ff]">'@syntax/core'</span></div>
                  <div className="text-[#8b949e] mt-2">// Type-safe, validated code</div>
                  <div className="text-[#79c0ff] mt-2">const parser = <span className="text-[#ffa657]">new</span> <span className="text-[#22c55e]">Syntax</span>()</div>
                  <div className="text-[#79c0ff]">parser.<span className="text-[#d2a8ff]">parse</span>(<span className="text-[#a5d6ff]">'{"code":"fast"}'</span>)</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Products</h2>
        </Reveal>

        <Tabs defaultValue="vscode" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 bg-transparent">
            <TabsTrigger value="vscode" className="cursor-pointer">VS Code Ext.</TabsTrigger>
            <TabsTrigger value="cli" className="cursor-pointer">CLI Tool</TabsTrigger>
            <TabsTrigger value="api" className="cursor-pointer">API</TabsTrigger>
            <TabsTrigger value="plugins" className="cursor-pointer">Plugins</TabsTrigger>
          </TabsList>

          {[
            { value: "vscode", features: ["Smart syntax highlighting", "Real-time validation", "Auto-completion", "1M+ downloads"] },
            { value: "cli", features: ["Command-line tool", "Batch processing", "Pipeline integration", "500K+ installs"] },
            { value: "api", features: ["REST API", "WebSocket support", "Rate limiting", "100% uptime SLA"] },
            { value: "plugins", features: ["GitHub integration", "GitLab support", "Jira workflows", "Custom plugins"] }
          ].map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tab.features.map((feature, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <Card className="bg-[#161b22] border-[#30363d] hover:border-[#22c55e]/50 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-3">{feature}</h3>
                        <Badge className="bg-[#22c55e] text-[#0d1117] cursor-pointer">Available</Badge>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* INTEGRATION LOGOS */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#161b22]">
        <Reveal>
          <h3 className="text-center text-lg font-bold mb-12 opacity-60">Integrates with your workflow</h3>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-8 items-center max-w-6xl mx-auto">
          {["GitHub", "GitLab", "Jira", "Linear", "Slack", "Notion", "VS Code", "Vim"].map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="h-12 w-32 bg-[#0d1117] border border-[#30363d] rounded flex items-center justify-center cursor-pointer hover:border-[#22c55e] transition-colors duration-200">
              {service}
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Reveal><div><div className="text-4xl md:text-5xl font-black mb-2 text-[#22c55e]"><Counter target={500} />K+</div><p className="text-sm opacity-60">Downloads</p></div></Reveal>
          <Reveal delay={0.1}><div><div className="text-4xl md:text-5xl font-black mb-2 text-[#3b82f6]"><Counter target={8000} /></div><p className="text-sm opacity-60">GitHub Stars</p></div></Reveal>
          <Reveal delay={0.2}><div><div className="text-4xl md:text-5xl font-black mb-2 text-[#22c55e]"><Counter target={200} />+</div><p className="text-sm opacity-60">Contributors</p></div></Reveal>
          <Reveal delay={0.3}><div><div className="text-4xl md:text-5xl font-black mb-2 text-[#3b82f6]">4.9<span className="text-2xl">★</span></div><p className="text-sm opacity-60">Average Rating</p></div></Reveal>
        </div>
      </section>

      {/* FEATURE SHOWCASE */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Code Comparison</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="bg-[#161b22] border-[#30363d] overflow-hidden hover:border-[#22c55e]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-6 text-[#22c55e]">{feature.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-[#0d1117] p-4 rounded border border-red-500/20">
                      <p className="text-[#8b949e] mb-2">Without Syntax</p>
                      <p className="text-[#ff7b72]">{feature.before}</p>
                    </div>
                    <div className="bg-[#0d1117] p-4 rounded border border-[#22c55e]/20">
                      <p className="text-[#8b949e] mb-2">With Syntax</p>
                      <p className="text-[#22c55e]">{feature.after}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">Simple Pricing</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div onClick={() => { setSelectedPlan(plan); setOpen(true); }} className="group relative cursor-pointer bg-[#161b22] border border-[#30363d] hover:border-[#22c55e] transition-all duration-300 p-8 rounded hover:shadow-2xl hover:shadow-[#22c55e]/20">
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-2xl font-black text-[#22c55e] mb-2">{plan.price}</p>
                <p className="text-sm opacity-60 mb-8">For {plan.users}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="text-sm flex gap-3">
                      <span className="text-[#22c55e]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.div className="flex items-center gap-2 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Choose Plan <span className="ml-auto">→</span>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Security & Privacy</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { title: "Data Privacy", description: "Your code is never stored on our servers. All processing happens locally or in secure EU data centers with encryption." },
            { title: "Local Processing", description: "Most operations run on your machine. Cloud processing is opt-in and encrypted end-to-end." },
            { title: "Enterprise SSO", description: "SAML 2.0, OAuth 2.0, and LDAP integration for enterprise deployments with audit logging." },
            { title: "Audit Logs", description: "Complete audit trail of all API access, user actions, and configuration changes with retention policies." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`item-${i}`} className="border-b border-[#30363d]">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#22c55e] transition-colors">{item.title}</AccordionTrigger>
                <AccordionContent className="text-white/60 py-4">{item.description}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#161b22]">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">Trusted by Developers</h2>
        </Reveal>
        <div className="max-w-4xl mx-auto">
          <Carousel>
            <CarouselContent>
              {[
                { text: "Syntax has saved us hours of debugging every week. The IDE integration is flawless.", author: "Alex Chen, Senior Developer", company: "TechCorp" },
                { text: "Finally a tool that understands modern development workflows. Best plugin I've ever used.", author: "Sara Williams, CTO", company: "DevStudio" },
                { text: "Team productivity increased 40% after switching to Syntax. Worth every penny.", author: "Marcus Johnson, Engineering Lead", company: "CloudScale" }
              ].map((testimonial, i) => (
                <CarouselItem key={i} className="md:basis-full">
                  <Card className="bg-[#0d1117] border-[#30363d]">
                    <CardContent className="p-8 text-center">
                      <p className="text-lg mb-6 italic text-white/60">"{testimonial.text}"</p>
                      <p className="font-bold text-white">{testimonial.author}</p>
                      <p className="text-sm opacity-60">{testimonial.company}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />
          </Carousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "Which languages are supported?", a: "Python, JavaScript, TypeScript, Go, Rust, Java, C#, and more. Check GitHub for the complete list." },
            { q: "Is there a self-hosted option?", a: "Yes, Enterprise plan includes self-hosted deployment with Docker and Kubernetes support." },
            { q: "What's the setup time?", a: "VS Code extension: 2 minutes. CLI: 5 minutes. API integration: depends on your stack." },
            { q: "Can I cancel anytime?", a: "Yes, Pro and Team plans can be cancelled anytime with no penalties." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`faq-${i}`} className="border-b border-[#30363d]">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#22c55e] transition-colors">{item.q}</AccordionTrigger>
                <AccordionContent className="text-white/60 py-4">{item.a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* PLAN SELECTION DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Choose Your Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedPlan && (
              <div className="bg-[#161b22] border border-[#22c55e]/30 p-6 rounded">
                <p className="text-sm opacity-60 mb-2">Selected Plan</p>
                <p className="text-2xl font-black text-[#22c55e]">{selectedPlan.name}</p>
                <p className="text-lg font-bold mt-2">{selectedPlan.price}</p>
              </div>
            )}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-2">Billing Cycle</label>
                <select className="w-full border border-[#30363d] bg-[#0d1117] p-2 rounded cursor-pointer text-white">
                  <option>Monthly</option>
                  <option>Annual (Save 20%)</option>
                </select>
              </div>
            </div>
            <MagneticBtn className="w-full px-6 py-3 bg-[#22c55e] text-[#0d1117] font-bold hover:bg-white transition-all duration-300">
              Start Free Trial
            </MagneticBtn>
            <p className="text-xs text-white/40 text-center">No credit card required. 14-day free trial.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* FOOTER CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#161b22] text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-[#22c55e]">Ready to ship faster code?</h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Join 500K+ developers using Syntax</p>
          <MagneticBtn className="px-8 py-4 bg-[#22c55e] text-[#0d1117] font-bold cursor-pointer hover:bg-white transition-all duration-200">
            Get Started Free
          </MagneticBtn>
        </Reveal>
      </section>
    </div>
  )
}