"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ShoppingCart, MapPin, ChevronRight } from "lucide-react"

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

export default function TerraNova() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Extra Virgin")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const products = [
    { id: 1, name: "Estate Premium EVOO", category: "Extra Virgin", price: "$48", region: "Tuscany", year: "2024", acidity: "0.3", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop" },
    { id: 2, name: "Sicilian Gold Blend", category: "Extra Virgin", price: "$52", region: "Sicily", year: "2023", acidity: "0.4", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop" },
    { id: 3, name: "Chili Infusion", category: "Infused", price: "$42", region: "Greece", year: "2024", heat: "Medium", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop" },
    { id: 4, name: "Truffle Collection", category: "Infused", price: "$65", region: "Italy", year: "2023", flavor: "Intense", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop" },
    { id: 5, name: "Gourmet Gift Box", category: "Gift Sets", price: "$99", region: "Mixed", items: "5 bottles", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop" },
    { id: 6, name: "Balsamic Reserve", category: "Vinegar", price: "$38", region: "Modena", year: "12 Year Aged", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop" },
    { id: 7, name: "White Truffle Oil", category: "Infused", price: "$72", region: "Piedmont", year: "2024", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop" },
    { id: 8, name: "Lemon Fusion", category: "Infused", price: "$44", region: "Sicily", year: "2024", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop" },
  ]

  const origins = [
    { gen: "Generation 1", year: 1984, name: "Giuseppe Rossi", desc: "Founded on family estate" },
    { gen: "Generation 2", year: 2001, name: "Marco Rossi", desc: "Expanded to 3 estates" },
    { gen: "Generation 3", year: 2015, name: "Lucia Rossi", desc: "International certification" },
    { gen: "Generation 4", year: 2024, name: "Antonio Rossi", desc: "Sustainable excellence" },
  ]

  const varieties = [
    { name: "Arbequina", acidity: 35, bitterness: 25, pungency: 40, fruitiness: 75 },
    { name: "Picual", acidity: 45, bitterness: 55, pungency: 65, fruitiness: 60 },
    { name: "Koroneiki", acidity: 40, bitterness: 48, pungency: 55, fruitiness: 70 },
    { name: "Frantoio", acidity: 50, bitterness: 60, pungency: 70, fruitiness: 65 },
  ]

  const chefs = [
    { name: "Chef Marco Barbieri", restaurant: "Michelin 2-Star", region: "Tuscany", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" },
    { name: "Chef Sofia Verdi", restaurant: "1 Michelin Star", region: "Sicily", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300" },
    { name: "Chef Giovanni Leone", restaurant: "Michelin Bib", region: "Piedmont", img: "https://images.unsplash.com/photo-1535713566543-0ca82e64d466?q=80&w=300" },
    { name: "Chef Alessandra Rossi", restaurant: "Michelin 3-Star", region: "Emilia", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" },
  ]

  const recipes = [
    { name: "Grilled Branzino", category: "Seafood", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500" },
    { name: "Burrata & Heirloom", category: "Salads", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500" },
    { name: "Pasta Aglio e Olio", category: "Pasta", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=500" },
    { name: "Wood-Fired Focaccia", category: "Bread", img: "https://images.unsplash.com/photo-1565690741031-1a89f0ed1c20?q=80&w=500" },
  ]

  const certs = ["PDO Certified", "Organic ECOCERT", "Kosher Certified", "EVOO Premium"]

  const faqs = [
    { q: "How should I store olive oil?", a: "Store in a cool, dark place away from heat and light. Ideal temperature is 15-20°C. Avoid direct sunlight and keep cap tightly sealed." },
    { q: "What is the shelf life?", a: "Our EVOO is best used within 18 months of harvest for optimal flavor. However, it remains safe for 2-3 years if stored properly." },
    { q: "When is the harvest?", a: "We harvest from October through November. Early harvest oils are more grassy; late harvest are richer and buttery." },
    { q: "Are your oils certified organic?", a: "All our oils are certified organic by ECOCERT. We practice sustainable farming across all 6 estates." },
    { q: "Do you offer bulk orders?", a: "Yes! We provide special pricing for restaurants and bulk purchases. Contact our B2B team for custom orders." },
  ]

  const handleAddToCart = (product: any) => {
    setToastMsg(`${product.name} added to cart`)
    setTimeout(() => setToastMsg(null), 2000)
  }

  return (
    <div ref={containerRef} style={{ backgroundColor: "#f8f4e9", color: "#2c1e0e", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#f8f4e9dd", backdropFilter: "blur(10px)", borderBottom: "1px solid #6b7c3a20" }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: "#6b7c3a", fontSize: "1.5rem", fontWeight: "bold" }}>TERRA NOVA</h1>
        <nav className="hidden md:flex gap-8">
          {["Shop", "Origins", "Taste", "FAQ"].map((item) => (
            <Link key={item} href="#" style={{ color: "#2c1e0e" }} className="hover:opacity-60 transition-opacity text-sm font-medium">{item}</Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ color: "#6b7c3a" }}>{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ backgroundColor: "#f8f4e9", zIndex: 40, marginTop: "60px", borderBottom: "1px solid #6b7c3a20" }} className="md:hidden py-4 px-6">
            {["Shop", "Origins", "Taste", "FAQ"].map((item) => (
              <p key={item} style={{ color: "#2c1e0e" }} className="py-2 font-medium">{item}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ y: parallaxY }}>
          <Image src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop" alt="Olive Grove" fill unoptimized priority style={{ objectFit: "cover" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #2c1e0e, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10 }}>
          <Reveal delay={0.1}>
            <div style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#c9a22a", color: "#2c1e0e", borderRadius: "30px", marginBottom: "1.5rem", fontSize: "0.875rem", fontWeight: "bold" }}>HARVEST 2024</div>
          </Reveal>
          <Reveal delay={0.2}><h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#f8f4e9" }}>40 Years of Tradition</h2></Reveal>
          <Reveal delay={0.3}><p style={{ fontSize: "1.25rem", marginBottom: "2rem", color: "#f8f4e9" }}>Cold-pressed extra virgin olive oil from 6 family estates across Mediterranean</p></Reveal>
          <Reveal delay={0.4}><MagneticBtn className="px-8 py-3 rounded-full font-bold uppercase text-sm" style={{ color: "#f8f4e9", backgroundColor: "#6b7c3a" } as any}>Discover Collection</MagneticBtn></Reveal>
        </div>
      </section>

      {/* Products Collection with Tabs */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#6b7c3a" }}>Our Collection</h3></Reveal>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap", justifyContent: "center" }}>
          {["Extra Virgin", "Infused", "Gift Sets", "Vinegar"].map((tab) => (
            <motion.button key={tab} onClick={() => setActiveTab(tab)} whileHover={{ scale: 1.05 }} style={{ padding: "0.75rem 1.75rem", border: `2px solid ${activeTab === tab ? "#6b7c3a" : "#6b7c3a40"}`, borderRadius: "30px", backgroundColor: activeTab === tab ? "#6b7c3a" : "transparent", color: activeTab === tab ? "#f8f4e9" : "#6b7c3a", cursor: "pointer", fontWeight: "bold", transition: "all 0.3s" }}>{tab}</motion.button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {products.filter((p) => p.category === activeTab).map((product, idx) => (
            <Reveal key={product.id} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -10 }} onClick={() => setSelectedProduct(product)} style={{ cursor: "pointer" }}>
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "1rem", overflow: "hidden", marginBottom: "1rem", border: "2px solid #6b7c3a" }}>
                  <Image src={product.img} alt={product.name} fill unoptimized style={{ objectFit: "cover" }} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", backgroundColor: "#c9a22a20", color: "#6b7c3a", borderRadius: "20px", fontWeight: "bold" }}>{product.region}</span>
                  <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", backgroundColor: "#6b7c3a20", color: "#6b7c3a", borderRadius: "20px", fontWeight: "bold" }}>{product.year}</span>
                </div>
                <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#2c1e0e", fontSize: "1.125rem" }}>{product.name}</h4>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#6b7c3a", marginBottom: "1rem" }}>{product.price}</p>
                <motion.button whileHover={{ scale: 1.05 }} onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }} style={{ width: "100%", padding: "0.75rem", backgroundColor: "#6b7c3a", color: "#f8f4e9", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none" }}><ShoppingCart size={18} style={{ display: "inline", marginRight: "0.5rem" }} />Add to Cart</motion.button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Estate Origin Timeline */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#f0ebe0", maxWidth: "1000px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "4rem", textAlign: "center", color: "#6b7c3a" }}>Four Generations</h3></Reveal>
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          <div style={{ position: "absolute", left: "0.5rem", top: 0, bottom: 0, width: "2px", backgroundColor: "#c9a22a" }} />
          {origins.map((origin, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div style={{ marginBottom: "2.5rem", position: "relative" }}>
                <div style={{ position: "absolute", left: "-1.25rem", top: "0.5rem", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#c9a22a", border: "4px solid #f0ebe0" }} />
                <div style={{ padding: "1.5rem", backgroundColor: "#f8f4e9", borderRadius: "0.75rem", border: "2px solid #6b7c3a20" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <h4 style={{ fontWeight: "bold", fontSize: "1.125rem", color: "#6b7c3a" }}>{origin.gen}</h4>
                    <span style={{ fontSize: "0.875rem", color: "#c9a22a", fontWeight: "bold" }}>{origin.year}</span>
                  </div>
                  <p style={{ fontWeight: "bold", marginBottom: "0.25rem", color: "#2c1e0e" }}>{origin.name}</p>
                  <p style={{ fontSize: "0.875rem", color: "#2c1e0e88" }}>{origin.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tasting Notes with Progress Bars */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#6b7c3a" }}>Tasting Profile</h3></Reveal>
        <div style={{ display: "grid", gap: "2.5rem" }}>
          {varieties.map((variety, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div style={{ padding: "2rem", backgroundColor: "#f0ebe0", borderRadius: "1rem", border: "2px solid #6b7c3a20" }}>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#6b7c3a" }}>{variety.name} Olives</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                  {[
                    { label: "Acidity", value: variety.acidity },
                    { label: "Bitterness", value: variety.bitterness },
                    { label: "Pungency", value: variety.pungency },
                    { label: "Fruitiness", value: variety.fruitiness },
                  ].map((attr) => (
                    <div key={attr.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontWeight: "bold", color: "#2c1e0e" }}>{attr.label}</span>
                        <span style={{ color: "#6b7c3a" }}>{attr.value}%</span>
                      </div>
                      <div style={{ height: "8px", backgroundColor: "#d9d3c6", borderRadius: "10px", overflow: "hidden" }}>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${attr.value}%` }} transition={{ duration: 0.8, delay: idx * 0.1 }} viewport={{ once: true }} style={{ height: "100%", backgroundColor: "#6b7c3a" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats Counter */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#6b7c3a", color: "#f8f4e9" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          <Reveal><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}><Counter target={40} /></div><p style={{ fontSize: "0.875rem", textTransform: "uppercase" }}>Years Tradition</p></div></Reveal>
          <Reveal delay={0.1}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}><Counter target={6} /></div><p style={{ fontSize: "0.875rem", textTransform: "uppercase" }}>Family Estates</p></div></Reveal>
          <Reveal delay={0.2}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}><Counter target={28} /></div><p style={{ fontSize: "0.875rem", textTransform: "uppercase" }}>Awards Won</p></div></Reveal>
          <Reveal delay={0.3}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}><Counter target={38} /></div><p style={{ fontSize: "0.875rem", textTransform: "uppercase" }}>Countries Shipped</p></div></Reveal>
        </div>
      </section>

      {/* Chef Endorsements Carousel */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#6b7c3a" }}>Chef Favorites</h3></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {chefs.map((chef, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -10 }} style={{ textAlign: "center", padding: "1.5rem", backgroundColor: "#f0ebe0", borderRadius: "1rem", border: "2px solid #6b7c3a20" }}>
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "50%", overflow: "hidden", marginBottom: "1rem", border: "3px solid #c9a22a" }}>
                  <Image src={chef.img} alt={chef.name} fill unoptimized style={{ objectFit: "cover" }} />
                </div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#2c1e0e" }}>{chef.name}</h4>
                <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", backgroundColor: "#c9a22a", color: "#2c1e0e", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", marginBottom: "0.75rem" }}>{chef.restaurant}</div>
                <p style={{ color: "#6b7c3a", fontSize: "0.875rem" }}>{chef.region}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recipe Inspiration */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#f0ebe0", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#6b7c3a" }}>Recipe Collection</h3></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {recipes.map((recipe, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -5 }}>
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "1rem", overflow: "hidden", marginBottom: "1rem", border: "2px solid #6b7c3a" }}>
                  <Image src={recipe.img} alt={recipe.name} fill unoptimized style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #2c1e0e, transparent)", display: "flex", alignItems: "flex-end", padding: "1.5rem" }}>
                    <div>
                      <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", backgroundColor: "#c9a22a", color: "#2c1e0e", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{recipe.category}</span>
                      <h4 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#f8f4e9" }}>{recipe.name}</h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certifications Badge Row */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <Reveal><h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2rem", color: "#6b7c3a" }}>World-Class Certifications</h3></Reveal>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          {certs.map((cert, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div style={{ padding: "0.75rem 1.5rem", backgroundColor: "#6b7c3a", color: "#f8f4e9", borderRadius: "30px", fontWeight: "bold", fontSize: "0.875rem" }}>{cert}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#6b7c3a" }}>Frequently Asked</h3></Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <div style={{ borderBottom: "2px solid #6b7c3a40", marginBottom: "1rem" }}>
              <button onClick={() => setOpenAccordion(openAccordion === `q${idx}` ? null : `q${idx}`)} style={{ width: "100%", padding: "1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", color: "#2c1e0e", fontWeight: "bold", fontSize: "1rem" }}>
                {faq.q}
                <motion.div animate={{ rotate: openAccordion === `q${idx}` ? 180 : 0 }} style={{ color: "#6b7c3a" }}><ChevronRight size={20} /></motion.div>
              </button>
              <AnimatePresence>
                {openAccordion === `q${idx}` && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                    <p style={{ paddingBottom: "1rem", color: "#2c1e0e88", lineHeight: "1.6" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Newsletter CTA */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center", backgroundColor: "#6b7c3a", color: "#f8f4e9" }}>
        <Reveal><h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>First Time? Get 15% Off</h3></Reveal>
        <Reveal delay={0.1}><p style={{ marginBottom: "2rem", fontSize: "1.125rem" }}>Sign up for our newsletter and taste the difference</p></Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: "1rem", maxWidth: "450px", margin: "0 auto" }}>
            <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: "0.75rem", borderRadius: "0.5rem", border: "none", color: "#2c1e0e" }} />
            <MagneticBtn className="px-6 py-3 rounded" style={{ backgroundColor: "#2c1e0e", color: "#f8f4e9", fontWeight: "bold", cursor: "pointer", border: "none" } as any}>Subscribe</MagneticBtn>
          </div>
        </Reveal>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} style={{ position: "fixed", inset: 0, backgroundColor: "#00000080", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 60 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "#f8f4e9", padding: "2.5rem", borderRadius: "1rem", maxWidth: "500px", width: "90%", border: "3px solid #6b7c3a" }}>
              <h4 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#6b7c3a" }}>{selectedProduct.name}</h4>
              <p style={{ color: "#6b7c3a", marginBottom: "1.5rem", fontSize: "0.875rem", fontWeight: "bold" }}>{selectedProduct.region}</p>
              <p style={{ marginBottom: "1.5rem", color: "#2c1e0e", lineHeight: "1.6" }}>Premium quality, hand-harvested and cold-pressed to preserve nutritional integrity and authentic Mediterranean flavor.</p>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#6b7c3a", marginBottom: "2rem" }}>{selectedProduct.price}</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null) }} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#6b7c3a", color: "#f8f4e9", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none" }}>Add to Cart</motion.button>
                <button onClick={() => setSelectedProduct(null)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "transparent", border: "2px solid #6b7c3a", color: "#6b7c3a", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer" }}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", bottom: "2rem", right: "2rem", backgroundColor: "#6b7c3a", color: "#f8f4e9", padding: "1rem 1.5rem", borderRadius: "0.5rem", fontWeight: "bold", zIndex: 70 }}>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
