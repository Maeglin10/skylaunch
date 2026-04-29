"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useInView } from "framer-motion";

/* ====== REVEAL COMPONENT ====== */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ====== COUNTER COMPONENT ====== */
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const increment = target / 100;
    const interval = setInterval(() => {
      setCount((c) => (c < target ? c + increment : target));
    }, 20);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <div ref={ref}>{Math.floor(count).toLocaleString()}</div>;
}

/* ====== TYPEWRITER TEXT DEMO ====== */
function TypewriterDemo() {
  const samples = [
    "Write a compelling product description in seconds...",
    "Transform your rough draft into polished prose...",
    "Brainstorm ideas and organize your thoughts instantly...",
  ];

  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const sample = samples[current];

    if (isTyping) {
      if (displayed.length < sample.length) {
        timeout = setTimeout(() => {
          setDisplayed(sample.slice(0, displayed.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
      } else {
        setCurrent((c) => (c + 1) % samples.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isTyping, current, samples]);

  return (
    <div className="min-h-16 flex items-center">
      <p className="text-2xl md:text-3xl font-light italic text-white/80">
        {displayed}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-[#a855f7]"
        >
          |
        </motion.span>
      </p>
    </div>
  );
}

/* ====== MAGNETIC BUTTON ====== */
function MagneticBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { damping: 3, stiffness: 100 });
  const ySpring = useSpring(y, { damping: 3, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    if (distance < 100) {
      x.set(distX * 0.3);
      y.set(distY * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-4 bg-[#7c3aed] text-white font-black uppercase text-sm tracking-[0.1em] rounded-full hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] transition-shadow"
    >
      {children}
    </motion.button>
  );
}

/* ====== INFINITE MARQUEE ====== */
function InfiniteMarquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden bg-[#1a1a24] border-y border-[#7c3aed]/10 py-6">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[#7c3aed] font-bold text-lg tracking-widest flex-shrink-0">
            ◆ {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ====== TESTIMONIALS CAROUSEL ====== */
function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Array<{ name: string; role: string; text: string }>;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center px-6"
        >
          <p className="text-2xl mb-6 italic opacity-80">&quot;{testimonials[current].text}&quot;</p>
          <p className="text-lg font-black text-[#7c3aed]">{testimonials[current].name}</p>
          <p className="text-sm opacity-60">{testimonials[current].role}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 justify-center mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-[#7c3aed] w-8" : "bg-[#7c3aed]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ====== FEATURE TAB ====== */
function FeatureTab({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 font-black uppercase text-sm tracking-widest rounded-full transition-all ${
        active
          ? "bg-[#7c3aed] text-white"
          : "bg-[#1a1a24] text-white/60 border border-[#7c3aed]/20 hover:border-[#7c3aed]"
      }`}
    >
      {title}
    </button>
  );
}

/* ====== PRICING CARD ====== */
function PricingCard({
  tier,
  price,
  features,
  cta,
}: {
  tier: string;
  price: string;
  features: string[];
  cta: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="border border-[#7c3aed]/20 rounded-2xl p-8 hover:border-[#7c3aed] transition-all bg-[#1a1a24]"
    >
      <h3 className="text-2xl font-black mb-2 text-[#7c3aed]">{tier}</h3>
      <div className="mb-6">
        {price === "Free" ? (
          <p className="text-3xl font-black text-white">{price}</p>
        ) : (
          <>
            <p className="text-4xl font-black text-white">{price}</p>
            <p className="text-sm opacity-60">/month</p>
          </>
        )}
      </div>
      <div className="space-y-3 mb-8">
        {features.map((f, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-[#7c3aed] font-black mt-1">✓</span>
            <span className="opacity-70">{f}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-3 bg-[#7c3aed] text-white font-black rounded-lg hover:bg-[#6d28d9] transition-colors">
        {cta}
      </button>
    </motion.div>
  );
}

/* ====== FAQ ACCORDION ====== */
function FAQAccordion({
  items,
}: {
  items: Array<{ q: string; a: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.div key={i} className="border border-[#7c3aed]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-4 flex justify-between items-center bg-[#1a1a24] text-white hover:bg-[#2a2a3a] transition-colors"
          >
            <span className="font-bold text-left">{item.q}</span>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }}>
              ▼
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#0f0f15] px-6 py-4 text-white/70 border-t border-[#7c3aed]/10"
              >
                {item.a}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

/* ====== MAIN PAGE ====== */
export default function QuillAI() {
  const [activeFeature, setActiveFeature] = useState("Write");

  const featureContent: Record<string, { title: string; desc: string }> = {
    Write: { title: "AI Writing", desc: "Generate high-quality content instantly" },
    Edit: { title: "Smart Editing", desc: "Refine and improve your writing" },
    Research: { title: "Research", desc: "Find and organize sources instantly" },
    Publish: { title: "Publishing", desc: "Optimize for any platform" },
  };

  const stats = [
    { label: "Writers", value: 2 },
    { label: "Words/Day", value: 50 },
    { label: "Satisfaction", value: 98 },
    { label: "Languages", value: 140 },
  ];

  const integrations = [
    "Notion",
    "Slack",
    "Google Docs",
    "WordPress",
    "Medium",
    "LinkedIn",
  ];

  const testimonials = [
    {
      name: "Emma Chen",
      role: "Content Creator",
      text: "Quill AI saves me hours every week. The writing quality is incredible.",
    },
    {
      name: "Marcus Johnson",
      role: "Freelance Writer",
      text: "Finally, a tool that understands my writing style and helps me improve.",
    },
    {
      name: "Sarah Williams",
      role: "Marketing Lead",
      text: "Our team's productivity increased by 40% since using Quill.",
    },
  ];

  const faqs = [
    {
      q: "Is the AI writing plagiarism-free?",
      a: "Yes! Quill generates original content. All outputs pass plagiarism detection.",
    },
    {
      q: "Can I edit AI-generated content?",
      a: "Absolutely. You have full control to edit, refine, and customize everything.",
    },
    {
      q: "Which languages are supported?",
      a: "Quill supports 140+ languages including all major world languages.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#09090b] to-[#1a1a24] text-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-12 pt-20">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              Quill AI
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xl opacity-60 mb-12 max-w-2xl mx-auto">
              The AI writing assistant for humans. Write better, faster, smarter.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mb-16 p-8 border border-[#7c3aed]/20 rounded-2xl bg-[#1a1a24]">
              <TypewriterDemo />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <MagneticBtn>Start Writing Free</MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Features
          </h2>
        </Reveal>

        <div className="flex gap-6 justify-center mb-12 flex-wrap">
          {Object.keys(featureContent).map((feature) => (
            <FeatureTab
              key={feature}
              title={feature}
              active={activeFeature === feature}
              onClick={() => setActiveFeature(feature)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border border-[#7c3aed]/20 rounded-2xl p-12 bg-[#1a1a24] text-center"
          >
            <h3 className="text-4xl font-black text-[#7c3aed] mb-4">
              {featureContent[activeFeature].title}
            </h3>
            <p className="text-lg opacity-70">{featureContent[activeFeature].desc}</p>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Integration Logos Marquee */}
      <InfiniteMarquee items={integrations} />

      {/* Stats */}
      <section className="py-20 px-12 bg-[#1a1a24]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
              By The Numbers
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center border border-[#7c3aed]/20 rounded-lg p-6">
                  <div className="text-4xl md:text-5xl font-black text-[#7c3aed] mb-2">
                    <Counter target={stat.value} />
                    {stat.value === 50 ? "M" : stat.value === 98 ? "%" : stat.value === 140 ? "+" : ""}
                  </div>
                  <p className="text-sm opacity-60 uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Simple Pricing
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal delay={0.1}>
            <PricingCard
              tier="Free"
              price="Free"
              features={["1000 words/month", "Basic tools", "Community support"]}
              cta="Get Started"
            />
          </Reveal>
          <Reveal delay={0.2}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <PricingCard
                tier="Pro"
                price="$19.99"
                features={[
                  "Unlimited words",
                  "All features",
                  "API access",
                  "Priority support",
                  "Custom templates",
                ]}
                cta="Start Free Trial"
              />
            </motion.div>
          </Reveal>
          <Reveal delay={0.3}>
            <PricingCard
              tier="Enterprise"
              price="Custom"
              features={[
                "Everything in Pro",
                "Team collaboration",
                "Advanced analytics",
                "Dedicated support",
                "Custom integration",
              ]}
              cta="Contact Sales"
            />
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-12 bg-[#1a1a24] max-w-4xl mx-auto w-full">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Loved By Writers
          </h2>
        </Reveal>
        <div className="border border-[#7c3aed]/20 rounded-2xl p-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Questions?
          </h2>
        </Reveal>
        <FAQAccordion items={faqs} />
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-12 bg-gradient-to-t from-[#7c3aed]/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">
              Ready to Write Better?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl opacity-60 mb-12 max-w-xl mx-auto">
              Join thousands of writers using Quill AI to create amazing content.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticBtn>Start Free Trial</MagneticBtn>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
