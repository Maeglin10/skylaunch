"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, ShoppingCart, Heart, Star, ChevronDown, Check } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Premium Dog Food", cat: "Food", price: "$45", img: "https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f6?q=80&w=500&auto=format&fit=crop" },
  { id: 2, name: "Interactive Toy Set", cat: "Toys", price: "$35", img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=500&auto=format&fit=crop" },
  { id: 3, name: "Grooming Kit", cat: "Grooming", price: "$60", img: "https://images.unsplash.com/photo-1633722715463-d30628519d47?q=80&w=500&auto=format&fit=crop" },
  { id: 4, name: "Supplements Pack", cat: "Health", price: "$50", img: "https://images.unsplash.com/photo-1576201160550-2173dba999ef?q=80&w=500&auto=format&fit=crop" },
  { id: 5, name: "Gourmet Treats", cat: "Food", price: "$25", img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=500&auto=format&fit=crop" },
  { id: 6, name: "Comfort Bed", cat: "Toys", price: "$80", img: "https://images.unsplash.com/photo-1583511655857-d19db992cb74?q=80&w=500&auto=format&fit=crop" },
  { id: 7, name: "Dental Chews", cat: "Health", price: "$20", img: "https://images.unsplash.com/photo-1611003228941-98852ba62227?q=80&w=500&auto=format&fit=crop" },
  { id: 8, name: "Training Clicker", cat: "Toys", price: "$15", img: "https://images.unsplash.com/photo-1552053831-71594a27c62d?q=80&w=500&auto=format&fit=crop" },
];

const TESTIMONIALS = [
  { author: "Luna's Mom", rating: 5, text: "My corgi's coat has never looked better!", petImg: "https://images.unsplash.com/photo-1633722715463-d30628519d47?q=80&w=200&auto=format&fit=crop" },
  { author: "Max's Dad", rating: 5, text: "Best investment in his health!", petImg: "https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f6?q=80&w=200&auto=format&fit=crop" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(target / 50);
      if (current > target) current = target;
      setCount(current);
      if (current === target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#ff6b4a]">{count.toLocaleString()}K</div>
      <div className="text-sm text-gray-600 mt-2">{label}</div>
    </div>
  );
}

function MagneticBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = (ref.current as HTMLDivElement).getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="px-8 py-3 bg-[#ff6b4a] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#ff6b4a]/30 transition-shadow"
    >
      {children}
    </motion.button>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: "What's your return policy?", a: "60-day money-back guarantee if your pet doesn't love it." },
    { q: "Do you use natural ingredients?", a: "100% natural, vet-approved, no artificial additives." },
    { q: "How fast is shipping?", a: "Free shipping on orders over $35, arrives in 2-3 business days." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <motion.div key={i} className="border-2 border-[#ff6b4a]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full p-4 flex justify-between items-center bg-[#fff8f0] hover:bg-orange-50 transition-colors"
          >
            <span className="text-left font-semibold text-[#2d1b00]">{faq.q}</span>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5 text-[#ff6b4a]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-white border-t-2 border-[#ff6b4a]/10 p-4"
              >
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function PawsomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const handleAddToCart = (productName: string) => {
    setToastMessage(`Added ${productName} to cart!`);
    setShowToast(true);
    setCartCount((prev) => prev + 1);
    setTimeout(() => setShowToast(false), 2000);
  };

  const filteredProducts = filterCat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filterCat);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#fff8f0] text-[#2d1b00] overflow-x-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1633722715463-d30628519d47?q=80&w=1200&auto=format&fit=crop"
          alt="bg"
          fill
          className="object-cover grayscale"
          unoptimized
        />
      </motion.div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fff8f0]/95 backdrop-blur-xl border-b border-[#ff6b4a]/10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Heart className="w-6 h-6 text-[#ff6b4a]" />
            <span className="font-bold text-lg">PAWSOME</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#products" className="hover:text-[#ff6b4a] transition-colors">Shop</a>
            <a href="#reviews" className="hover:text-[#ff6b4a] transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-[#ff6b4a] transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <ShoppingCart className="w-5 h-5 text-[#ff6b4a]" />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#ff6b4a] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 flex flex-col gap-4 text-sm">
              <a href="#products">Shop</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQ</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="text-[#ff6b4a] text-sm font-bold mb-4">PREMIUM PET CARE</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Your Pet Deserves <span className="text-[#ff6b4a]">The Best</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">Premium products, vet-approved, loved by 500K+ happy pets worldwide.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <MagneticBtn>EXPLORE SHOP</MagneticBtn>
            </Reveal>
          </div>
        </section>

        {/* Product Filter & Grid */}
        <section id="products" className="py-20 px-6 bg-gradient-to-b from-[#fff8f0] to-white">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-8 text-center">SHOP BY CATEGORY</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-3 mb-12 flex-wrap justify-center">
                {["All", "Food", "Toys", "Grooming", "Health"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      filterCat === cat
                        ? "bg-[#ff6b4a] text-white"
                        : "border-2 border-[#ff6b4a]/30 hover:border-[#ff6b4a]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, i) => (
                <Reveal key={product.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden border-2 border-[#ff6b4a]/10 hover:border-[#ff6b4a]/30 transition-colors shadow-lg hover:shadow-2xl"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#ff6b4a] font-semibold mb-2">{product.cat.toUpperCase()}</p>
                      <h3 className="font-bold mb-2">{product.name}</h3>
                      <p className="text-lg font-bold text-[#ff6b4a] mb-4">{product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product.name)}
                        className="w-full py-2 bg-[#ff6b4a] text-white rounded-lg hover:bg-[#e55a39] transition-colors font-semibold"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quiz CTA */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#ff6b4a] to-[#ff8566] rounded-3xl p-12 text-white text-center">
            <Reveal>
              <h2 className="text-3xl font-bold mb-4">Find Your Perfect Pet Match</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-6 opacity-90">Answer 3 quick questions and get personalized product recommendations.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <button
                onClick={() => setShowQuizModal(true)}
                className="px-8 py-3 bg-white text-[#ff6b4a] rounded-full font-bold hover:shadow-lg transition-shadow"
              >
                TAKE THE QUIZ
              </button>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Reveal delay={0}>
                <Counter target={500} label="Happy Pets" />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#ff6b4a]">4.9</div>
                  <div className="text-sm text-gray-600 mt-2">Star Rating</div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#ff6b4a]">60</div>
                  <div className="text-sm text-gray-600 mt-2">Day Guarantee</div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#ff6b4a]">FREE</div>
                  <div className="text-sm text-gray-600 mt-2">Over $35</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Reviews Carousel */}
        <section id="reviews" className="py-20 px-6 bg-gradient-to-b from-white to-[#fff8f0]">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">PET PARENT FAVORITES</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((review, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-6 bg-white border-2 border-[#ff6b4a]/20 rounded-2xl">
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[#ff6b4a] text-[#ff6b4a]" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{review.text}"</p>
                    <p className="font-bold text-[#2d1b00]">- {review.author}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription */}
        <section className="py-20 px-6 bg-[#2d1b00] text-white">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-8 text-center">SUBSCRIPTION BOX</h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Reveal delay={0.1}>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Monthly Pet Box</h3>
                  <ul className="space-y-3">
                    {["Premium food", "Toy surprise", "Treats", "Health supplement"].map((item, i) => (
                      <li key={i} className="flex gap-3 items-center">
                        <Check className="w-5 h-5 text-[#ff6b4a]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="bg-white/10 p-8 rounded-2xl text-center">
                  <div className="text-4xl font-bold text-[#ff6b4a] mb-2">$49.99</div>
                  <p className="text-sm text-gray-300 mb-4">Save 20% vs. retail</p>
                  <button className="w-full py-3 bg-[#ff6b4a] text-white rounded-lg font-bold hover:bg-[#e55a39] transition-colors">
                    SUBSCRIBE NOW
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">QUESTIONS?</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion />
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 text-center">
          <Reveal>
            <h2 className="text-4xl font-bold mb-6">Give Your Pet The Pawsome Life</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticBtn>SHOP NOW</MagneticBtn>
          </Reveal>
        </section>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-[100] bg-[#ff6b4a] text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuizModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md"
            >
              <h3 className="text-2xl font-bold mb-4">Pet Recommendation Quiz</h3>
              <p className="text-gray-600 mb-6">Question 1: What type of pet do you have?</p>
              <div className="space-y-2 mb-6">
                {["Dog", "Cat", "Both"].map((opt) => (
                  <button key={opt} className="w-full p-3 border-2 border-[#ff6b4a]/30 rounded-lg hover:border-[#ff6b4a] transition-colors">
                    {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowQuizModal(false)}
                className="w-full py-3 bg-[#ff6b4a] text-white rounded-lg font-bold"
              >
                CONTINUE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #fff8f0; }
        ::-webkit-scrollbar-thumb { background: #ff6b4a; border-radius: 4px; }
      `}</style>
    </div>
  );
}
