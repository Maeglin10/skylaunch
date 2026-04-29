"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ShoppingCart, Zap, ChevronRight } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  )
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
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

export default function PeakPerformance() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Pre-Workout")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [sliderValue, setSliderValue] = useState([1])

  const products = [
    { id: 1, name: "Thunder Pre-Workout", category: "Pre-Workout", flavors: ["Citrus Blast", "Berry Surge", "Tropical"], price: "$35", protein: 0, creatine: 5, bcaa: 7, electrolytes: 2.5, img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 2, name: "Elite Whey Isolate", category: "Protein", flavors: ["Vanilla", "Chocolate", "Strawberry"], price: "$42", protein: 25, creatine: 0, bcaa: 5.5, electrolytes: 0, img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 3, name: "Recovery Blend", category: "Recovery", flavors: ["Watermelon", "Mango"], price: "$38", protein: 15, creatine: 0, bcaa: 8, electrolytes: 3, img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 4, name: "Hydration Max", category: "Hydration", flavors: ["Lemon", "Orange", "Grape"], price: "$22", protein: 0, creatine: 0, bcaa: 0, electrolytes: 3.5, img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 5, name: "Muscle Fuel", category: "Protein", flavors: ["Mint Chocolate", "Cookie Dough"], price: "$45", protein: 28, creatine: 3, bcaa: 7, electrolytes: 1.5, img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 6, name: "Pump Stack", category: "Pre-Workout", flavors: ["Cherry", "Peach"], price: "$40", protein: 5, creatine: 5, bcaa: 6, electrolytes: 2, img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 7, name: "BCAAs Pro", category: "Hydration", flavors: ["Blue Raspberry", "Tropical"], price: "$28", protein: 0, creatine: 0, bcaa: 10, electrolytes: 2, img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
    { id: 8, name: "Extreme Pump", category: "Pre-Workout", flavors: ["Watermelon", "Mango"], price: "$38", protein: 2, creatine: 6, bcaa: 8, electrolytes: 3, img: "https://images.unsplash.com/photo-1579033100900-9f979cd9ce5f?q=80&w=500&auto=format&fit=crop" },
  ]

  const nutrients = [
    { name: "Protein", percent: 90 },
    { name: "Creatine", percent: 95 },
    { name: "BCAAs", percent: 85 },
    { name: "Electrolytes", percent: 88 },
  ]

  const athletes = [
    { name: "Alex Johnson", sport: "Olympic Weightlifting", country: "USA", record: "405 lb Snatch", badge: "Gold", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" },
    { name: "Maya Patel", sport: "Marathon Running", country: "India", record: "Sub 2:30", badge: "Endurance", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300" },
    { name: "Drake Martinez", sport: "CrossFit", country: "Mexico", record: "Games Athlete", badge: "Competition", img: "https://images.unsplash.com/photo-1535713566543-0ca82e64d466?q=80&w=300" },
    { name: "Sofia Bergström", sport: "Professional Cycling", country: "Sweden", record: "Stage Winner", badge: "Elite", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" },
    { name: "Chen Wei", sport: "Bodybuilding", country: "Taiwan", record: "Mr. Olympia Top 5", badge: "Pro", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300" },
    { name: "Lucia Rossi", sport: "Powerlifting", country: "Italy", record: "1000 lb Total", badge: "Master", img: "https://images.unsplash.com/photo-1535713566543-0ca82e64d466?q=80&w=300" },
  ]

  const testimonials = [
    { name: "Alex Johnson", sport: "Weightlifter", text: "Peak Performance is the only supplement I trust in competition. Results speak louder than words.", rating: 5 },
    { name: "Maya Patel", sport: "Marathoner", text: "Game-changing hydration formula. Smashed my PRs since switching to Peak.", rating: 5 },
    { name: "Drake Martinez", sport: "CrossFit", text: "Best pre-workout I've ever used. The pump is real, the focus is sharp.", rating: 5 },
  ]

  const faqs = [
    { q: "Are all products NSF Certified?", a: "Yes! All our products are NSF Certified for Sport. We guarantee zero banned substances and complete transparency." },
    { q: "What about allergens?", a: "We clearly label all allergens. Products are made in a GMP facility with strict cross-contamination protocols." },
    { q: "Can I stack multiple products?", a: "Absolutely! Many athletes use Pre-Workout + Hydration + Recovery together for maximum results." },
    { q: "What's your return policy?", a: "100% satisfaction guarantee. Money back if you don't see results in 30 days. No questions asked." },
    { q: "Do you offer shipping?", a: "Free shipping on orders over $75. We ship globally within 5-7 business days." },
  ]

  const handleAddToCart = (product: any) => {
    setToastMsg(`${product.name} added to cart`)
    setTimeout(() => setToastMsg(null), 2000)
  }

  return (
    <div ref={containerRef} style={{ backgroundColor: "#080808", color: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#080808dd", backdropFilter: "blur(10px)", borderBottom: "1px solid #ff4d0020" }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: "#ff4d00", fontSize: "1.5rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }}><Zap size={28} />PEAK</h1>
        <nav className="hidden md:flex gap-8">
          {["Shop", "Athletes", "Science", "FAQ"].map((item) => (
            <Link key={item} href="#" style={{ color: "#fff" }} className="hover:text-[#ff4d00] transition-colors text-sm font-medium">{item}</Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ color: "#ff4d00" }}>{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ backgroundColor: "#1a1a1a", zIndex: 40, marginTop: "60px", borderBottom: "1px solid #ff4d0020" }} className="md:hidden py-4 px-6">
            {["Shop", "Athletes", "Science", "FAQ"].map((item) => (
              <p key={item} style={{ color: "#fff" }} className="py-2 font-medium">{item}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ y: parallaxY }}>
          <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" alt="Athlete" fill unoptimized priority style={{ objectFit: "cover" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #080808, transparent)" }} />
        <motion.div style={{ position: "absolute", top: "20%", right: "-10%", width: "600px", height: "600px", background: "linear-gradient(135deg, #ff4d00, transparent)", borderRadius: "50%", opacity: 0.2 }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10 }}>
          <Reveal delay={0.1}><h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#ff4d00" }}>POWERED BY SCIENCE</h2></Reveal>
          <Reveal delay={0.2}><p style={{ fontSize: "1.25rem", marginBottom: "2rem", color: "#fff" }}>Trusted by 25M athletes worldwide for legendary performance</p></Reveal>
          <Reveal delay={0.3}><MagneticBtn className="px-8 py-3 rounded-full font-bold uppercase text-sm" style={{ color: "#080808", backgroundColor: "#ff4d00" } as any}>Explore Products</MagneticBtn></Reveal>
        </div>
      </section>

      {/* Products Collection with Tabs */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#ff4d00" }}>Complete Product Line</h3></Reveal>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap", justifyContent: "center" }}>
          {["Pre-Workout", "Protein", "Recovery", "Hydration"].map((tab) => (
            <motion.button key={tab} onClick={() => setActiveTab(tab)} whileHover={{ scale: 1.05 }} style={{ padding: "0.75rem 1.75rem", border: `2px solid ${activeTab === tab ? "#ff4d00" : "#ff4d0040"}`, borderRadius: "30px", backgroundColor: activeTab === tab ? "#ff4d00" : "transparent", color: activeTab === tab ? "#080808" : "#ff4d00", cursor: "pointer", fontWeight: "bold", transition: "all 0.3s" }}>{tab}</motion.button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {products.filter((p) => p.category === activeTab).map((product, idx) => (
            <Reveal key={product.id} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -10 }} onClick={() => setSelectedProduct(product)} style={{ cursor: "pointer" }}>
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "1rem", overflow: "hidden", marginBottom: "1rem", border: "2px solid #ff4d00" }}>
                  <Image src={product.img} alt={product.name} fill unoptimized style={{ objectFit: "cover" }} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  {product.flavors.slice(0, 2).map((flavor) => (
                    <span key={flavor} style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", backgroundColor: "#ff4d0020", color: "#ff4d00", borderRadius: "20px", fontWeight: "bold" }}>{flavor}</span>
                  ))}
                </div>
                <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#fff", fontSize: "1.125rem" }}>{product.name}</h4>
                <p style={{ color: "#ff4d00", marginBottom: "0.5rem", fontSize: "0.875rem" }}>{product.category}</p>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", marginBottom: "1rem" }}>{product.price}</p>
                <motion.button whileHover={{ scale: 1.05 }} onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }} style={{ width: "100%", padding: "0.75rem", backgroundColor: "#ff4d00", color: "#080808", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none" }}><ShoppingCart size={18} style={{ display: "inline", marginRight: "0.5rem" }} />Add to Cart</motion.button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Formula Transparency - Nutrient Progress */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#ff4d00" }}>Formula Transparency</h3></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
            {nutrients.map((nutrient, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div style={{ padding: "1.5rem", backgroundColor: "#0a0a0a", borderRadius: "1rem", border: "2px solid #ff4d0020" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.125rem" }}>{nutrient.name}</span>
                    <span style={{ color: "#ff4d00", fontWeight: "bold" }}>{nutrient.percent}%</span>
                  </div>
                  <div style={{ height: "8px", backgroundColor: "#333", borderRadius: "10px", overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${nutrient.percent}%` }} transition={{ duration: 1, delay: idx * 0.1 }} viewport={{ once: true }} style={{ height: "100%", backgroundColor: "#ff4d00" }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Athlete Ambassadors */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#ff4d00" }}>Athlete Ambassadors</h3></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {athletes.map((athlete, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -10 }} style={{ padding: "1.5rem", backgroundColor: "#1a1a1a", borderRadius: "1rem", border: "2px solid #ff4d00", textAlign: "center" }}>
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "1rem", overflow: "hidden", marginBottom: "1rem", border: "2px solid #ff4d00" }}>
                  <Image src={athlete.img} alt={athlete.name} fill unoptimized style={{ objectFit: "cover" }} />
                </div>
                <h4 style={{ fontWeight: "bold", marginBottom: "0.25rem", color: "#fff", fontSize: "1.125rem" }}>{athlete.name}</h4>
                <p style={{ color: "#ff4d00", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "bold" }}>{athlete.sport}</p>
                <p style={{ color: "#fff70", marginBottom: "0.75rem", fontSize: "0.875rem" }}>{athlete.country}</p>
                <p style={{ color: "#fff", marginBottom: "1rem", fontSize: "0.875rem", fontStyle: "italic" }}>{athlete.record}</p>
                <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", backgroundColor: "#ff4d00", color: "#080808", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold" }}>{athlete.badge}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats Counter */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          <Reveal><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#ff4d00" }}><Counter target={50} />M</div><p style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "#fff" }}>Servings Sold</p></div></Reveal>
          <Reveal delay={0.1}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#ff4d00" }}><Counter target={25} />M</div><p style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "#fff" }}>Athletes Trust Us</p></div></Reveal>
          <Reveal delay={0.2}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#ff4d00" }}>NSF</div><p style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "#fff" }}>Certified Sport</p></div></Reveal>
          <Reveal delay={0.3}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#ff4d00" }}>0</div><p style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "#fff" }}>Banned Substances</p></div></Reveal>
        </div>
      </section>

      {/* Subscription Savings Slider */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#ff4d00" }}>Subscription Savings</h3></Reveal>
          <Reveal delay={0.1}>
            <div style={{ padding: "2rem", backgroundColor: "#0a0a0a", borderRadius: "1rem", border: "2px solid #ff4d0020" }}>
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <label style={{ color: "#fff", fontWeight: "bold" }}>Select subscription period:</label>
                  <span style={{ color: "#ff4d00", fontWeight: "bold" }}>{sliderValue[0]} months</span>
                </div>
                <input type="range" min="1" max="6" value={sliderValue[0]} onChange={(e) => setSliderValue([parseInt(e.target.value)])} style={{ width: "100%", cursor: "pointer" }} />
              </div>
              <div style={{ padding: "1.5rem", backgroundColor: "#080808", borderRadius: "0.75rem", textAlign: "center", border: "2px solid #ff4d00" }}>
                <p style={{ color: "#fff70", marginBottom: "0.5rem" }}>Monthly Price</p>
                <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#ff4d00", marginBottom: "0.5rem" }}>${(45 - sliderValue[0] * 2.5).toFixed(2)}</h3>
                <p style={{ color: "#fff", fontSize: "0.875rem" }}>Save ${(sliderValue[0] * 2.5).toFixed(2)} per month</p>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} style={{ width: "100%", padding: "1rem", marginTop: "1.5rem", backgroundColor: "#ff4d00", color: "#080808", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none", fontSize: "1rem" }}>
                Subscribe & Save {Math.round(sliderValue[0] * 2.5 / 45 * 100)}%
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#ff4d00" }}>Athlete Testimonials</h3></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {testimonials.map((testimonial, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -5 }} style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "1rem", border: "2px solid #ff4d0020" }}>
                <div style={{ marginBottom: "1rem" }}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} style={{ color: "#ff4d00", fontSize: "1.25rem" }}>★</span>
                  ))}
                </div>
                <p style={{ color: "#fff", marginBottom: "1.5rem", lineHeight: "1.6", fontSize: "0.95rem" }}>{testimonial.text}</p>
                <div>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>{testimonial.name}</p>
                  <p style={{ color: "#ff4d00", fontSize: "0.875rem" }}>{testimonial.sport}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#ff4d00" }}>Common Questions</h3></Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <div style={{ borderBottom: "2px solid #ff4d0040", marginBottom: "1rem" }}>
              <button onClick={() => setOpenAccordion(openAccordion === `q${idx}` ? null : `q${idx}`)} style={{ width: "100%", padding: "1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", color: "#fff", fontWeight: "bold", fontSize: "1rem" }}>
                {faq.q}
                <motion.div animate={{ rotate: openAccordion === `q${idx}` ? 180 : 0 }} style={{ color: "#ff4d00" }}><ChevronRight size={20} /></motion.div>
              </button>
              <AnimatePresence>
                {openAccordion === `q${idx}` && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                    <p style={{ paddingBottom: "1rem", color: "#fff99", lineHeight: "1.6" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA Section */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center", backgroundColor: "#ff4d00", color: "#080808" }}>
        <Reveal><h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Join 25M Athletes</h3></Reveal>
        <Reveal delay={0.1}><p style={{ marginBottom: "2rem", fontSize: "1.125rem" }}>Free shipping on orders over $75. Unleash your potential.</p></Reveal>
        <Reveal delay={0.2}>
          <MagneticBtn className="px-8 py-3 rounded-full font-bold uppercase text-sm" style={{ color: "#080808", backgroundColor: "#080808", border: "2px solid #080808", color: "#ff4d00" } as any}>Claim Free Sample</MagneticBtn>
        </Reveal>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} style={{ position: "fixed", inset: 0, backgroundColor: "#00000080", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 60 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "#080808", padding: "2.5rem", borderRadius: "1rem", maxWidth: "500px", width: "90%", border: "3px solid #ff4d00", maxHeight: "90vh", overflowY: "auto" }}>
              <h4 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#ff4d00" }}>{selectedProduct.name}</h4>
              <p style={{ color: "#ff4d00", marginBottom: "1.5rem", fontSize: "0.875rem", fontWeight: "bold" }}>{selectedProduct.category}</p>
              <p style={{ marginBottom: "1.5rem", color: "#fff", lineHeight: "1.6" }}>Science-backed formula engineered for peak performance. NSF Certified. Zero fillers.</p>
              <h5 style={{ color: "#fff", fontWeight: "bold", marginBottom: "1rem" }}>Nutrient Profile:</h5>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ padding: "0.75rem", backgroundColor: "#1a1a1a", borderRadius: "0.5rem", textAlign: "center" }}>
                  <p style={{ color: "#fff70", fontSize: "0.75rem" }}>Protein</p>
                  <p style={{ color: "#ff4d00", fontWeight: "bold" }}>{selectedProduct.protein}g</p>
                </div>
                <div style={{ padding: "0.75rem", backgroundColor: "#1a1a1a", borderRadius: "0.5rem", textAlign: "center" }}>
                  <p style={{ color: "#fff70", fontSize: "0.75rem" }}>Creatine</p>
                  <p style={{ color: "#ff4d00", fontWeight: "bold" }}>{selectedProduct.creatine}g</p>
                </div>
                <div style={{ padding: "0.75rem", backgroundColor: "#1a1a1a", borderRadius: "0.5rem", textAlign: "center" }}>
                  <p style={{ color: "#fff70", fontSize: "0.75rem" }}>BCAAs</p>
                  <p style={{ color: "#ff4d00", fontWeight: "bold" }}>{selectedProduct.bcaa}g</p>
                </div>
                <div style={{ padding: "0.75rem", backgroundColor: "#1a1a1a", borderRadius: "0.5rem", textAlign: "center" }}>
                  <p style={{ color: "#fff70", fontSize: "0.75rem" }}>Electrolytes</p>
                  <p style={{ color: "#ff4d00", fontWeight: "bold" }}>{selectedProduct.electrolytes}g</p>
                </div>
              </div>
              <p style={{ marginBottom: "1.5rem", color: "#fff", fontWeight: "bold" }}>Flavor:</p>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                {selectedProduct.flavors.map((flavor: string) => (
                  <button key={flavor} onClick={() => setSelectedFlavor(flavor)} style={{ padding: "0.5rem 1rem", backgroundColor: selectedFlavor === flavor ? "#ff4d00" : "#333", color: selectedFlavor === flavor ? "#080808" : "#fff", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none", flex: selectedProduct.flavors.length <= 3 ? 1 : "auto" }}>
                    {flavor}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ff4d00", marginBottom: "1.5rem" }}>{selectedProduct.price}</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null) }} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#ff4d00", color: "#080808", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none" }}>Add to Cart</motion.button>
                <button onClick={() => setSelectedProduct(null)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "transparent", border: "2px solid #ff4d00", color: "#ff4d00", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer" }}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", bottom: "2rem", right: "2rem", backgroundColor: "#ff4d00", color: "#080808", padding: "1rem 1.5rem", borderRadius: "0.5rem", fontWeight: "bold", zIndex: 70 }}>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
