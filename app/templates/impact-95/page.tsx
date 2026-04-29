'use client';

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Sun, Zap, ChevronDown, Leaf, TrendingUp } from 'lucide-react';
import Link from 'next/link';

/* === UTILITY COMPONENTS === */

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
};

const Counter = ({ target, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += target / 30;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black" style={{ color: '#f59e0b' }}>
        {count}{suffix}
      </div>
      <p className="text-sm uppercase tracking-widest mt-2 text-[#0ea5e9]" style={{ letterSpacing: '2px' }}>
        {label}
      </p>
    </div>
  );
};

const MagneticBtn = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      onClick={onClick}
      className="px-8 py-3 rounded-lg font-black uppercase text-sm transition-all bg-[#f59e0b] text-[#060a0f] hover:bg-[#fbbf24] tracking-widest"
    >
      {children}
    </motion.button>
  );
};

const Accordion = ({ title, content, isOpen, onClick }) => (
  <div style={{ borderBottom: '1px solid #f59e0b40' }}>
    <button onClick={onClick} className="w-full py-4 px-6 flex justify-between items-center hover:bg-white/5">
      <span className="font-bold text-white uppercase text-sm tracking-wide">{title}</span>
      <ChevronDown style={{ color: '#f59e0b', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <p className="px-6 pb-4 text-white/70">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Marquee = ({ items }) => (
  <div style={{ overflow: 'hidden', display: 'flex', width: '100%' }}>
    <motion.div animate={{ x: [0, -1400] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex gap-12 whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="text-lg font-black uppercase tracking-wider text-[#f59e0b]">
          {item} •
        </span>
      ))}
    </motion.div>
  </div>
);

/* === MAIN COMPONENT === */

export default function SolarisEnergy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Residential');
  const [openAccordion, setOpenAccordion] = useState(null);
  const [sliderValue, setSliderValue] = useState(250);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const solutions = {
    Residential: { desc: 'Perfect for homes. Average 25-year savings: $25,000+', savings: '$25K+', co2: '500K lbs' },
    Commercial: { desc: 'Scale for businesses. Immediate ROI and tax credits.', savings: '$150K+', co2: '3M lbs' },
    Industrial: { desc: 'Heavy-duty systems for manufacturers and warehouses.', savings: '$500K+', co2: '10M lbs' },
    'Utility-Scale': { desc: 'Mega farms powering entire communities with clean energy.', savings: '2M+', co2: '50M lbs' },
  };

  const timeline = [
    { step: 1, title: 'Site Assessment', desc: 'Solar analysis and energy audit' },
    { step: 2, title: 'Design', desc: 'Custom system layout' },
    { step: 3, title: 'Permitting', desc: 'All government approvals' },
    { step: 4, title: 'Installation', desc: 'Professional installation' },
    { step: 5, title: 'Activation', desc: 'System goes live' },
  ];

  const incentives = [
    { title: 'Federal Tax Credit', content: '30% ITC federal tax credit on all eligible equipment and installation costs.' },
    { title: 'State Rebates', content: 'Additional state-level rebates vary by location. Up to $10K in some states.' },
    { title: 'Net Metering', content: 'Sell excess power back to the grid. Many utilities offer full retail rates.' },
    { title: 'Financing Options', content: 'Zero-down loans, PPAs, and lease options make solar accessible to everyone.' },
  ];

  const caseStudies = [
    { name: 'Family Home, CA', savings: '$28,000', co2: '480,000 lbs', kw: '8.5 kW' },
    { name: 'Tech Campus, TX', savings: '$450,000', co2: '6.2M lbs', kw: '150 kW' },
    { name: 'Manufacturing, OH', savings: '$1.2M', co2: '15M lbs', kw: '400 kW' },
  ];

  const testimonials = [
    { name: 'John Smith', quote: 'Solaris made going solar so easy. My electric bill dropped 90%.' },
    { name: 'Sarah Chen', quote: 'Best investment we ever made for our business. Paying for itself in 5 years.' },
    { name: 'Mike Torres', quote: 'Professional, efficient, and they explained everything clearly.' },
    { name: 'Emma Davis', quote: 'Helping the planet while saving money. Win-win!' },
  ];

  const faqs = [
    { title: 'How much can I save with solar?', content: 'Most residential customers save $10K-40K over 25 years. Commercial systems save 30-50% on energy costs.' },
    { title: 'What is the 30% federal tax credit?', content: 'The Investment Tax Credit (ITC) allows you to deduct 30% of installation costs from your federal taxes.' },
    { title: 'How does net metering work?', content: 'Excess power flows back to the grid, spinning your meter backward and earning bill credits.' },
    { title: 'Do I need a battery system?', content: 'Batteries are optional. Most homeowners rely on grid connection for reliability and cost savings.' },
  ];

  const annualSavings = (sliderValue / 100) * 1200; // Approximate savings calculation

  return (
    <div ref={containerRef} style={{ backgroundColor: '#060a0f', color: '#ffffff', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: '#060a0fdd', backdropFilter: 'blur(10px)', borderBottom: '1px solid #f59e0b30' }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'black', letterSpacing: '2px' }} className="uppercase">
          SOLARIS
        </h1>
        <nav className="hidden md:flex gap-8">
          {['Solutions', 'Savings', 'Incentives', 'FAQ'].map((item) => (
            <Link key={item} href="#" className="hover:text-[#f59e0b] transition-colors uppercase font-bold text-xs tracking-wide">
              {item}
            </Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ backgroundColor: '#060a0f', zIndex: 40, marginTop: '60px' }} className="md:hidden py-4 px-6 border-b border-[#f59e0b30]">
            {['Solutions', 'Savings', 'Incentives', 'FAQ'].map((item) => (
              <p key={item} className="py-2 text-white uppercase font-bold text-xs tracking-wide">
                {item}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO WITH ROTATING SUN */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', marginTop: '60px', background: 'linear-gradient(135deg, #060a0f, #0a0f1a)' }}>
        <motion.div style={{ y: parallaxY }}>
          <Image src="https://images.unsplash.com/photo-1508841307935-29c51e541908?q=80&w=1200" alt="Solar Farm" fill unoptimized style={{ objectFit: 'cover', opacity: 0.15 }} />
        </motion.div>
        {/* Rotating Sun */}
        <motion.div style={{ position: 'absolute', top: '5%', right: '10%', zIndex: 5, rotateZ }} className="w-32 h-32 md:w-48 md:h-48">
          <Sun size={200} color="#f59e0b" strokeWidth={0.5} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 10 }}>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: 'black', marginBottom: '1rem', color: '#ffffff', letterSpacing: '-2px' }}>
              HARNESS THE SUN
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#0ea5e9', fontWeight: 'bold' }}>Clean Energy. Massive Savings. 25-Year Guarantee.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <motion.div className="flex gap-4">
              <MagneticBtn onClick={() => setShowQuoteDialog(true)}>Get Quote</MagneticBtn>
              <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '0.75rem 2rem', border: '2px solid #f59e0b', color: '#f59e0b', backgroundColor: 'transparent', borderRadius: '0.5rem', fontWeight: 'black', letterSpacing: '1px' }}>
                Learn More
              </motion.button>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* SOLUTIONS - TABS */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#f59e0b', letterSpacing: '1px' }}>
            TAILORED SOLUTIONS
          </h3>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {Object.keys(solutions).map((sol) => (
            <motion.button
              key={sol}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab(sol)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === sol ? '#f59e0b' : 'transparent',
                color: activeTab === sol ? '#060a0f' : '#f59e0b',
                border: `2px solid ${activeTab === sol ? '#f59e0b' : '#f59e0b40'}`,
                borderRadius: '0.5rem',
                fontWeight: 'black',
                cursor: 'pointer',
              }}
            >
              {sol}
            </motion.button>
          ))}
        </div>
        <Reveal>
          <div style={{ backgroundColor: '#0f1419', padding: '3rem', borderRadius: '1rem', border: '1px solid #f59e0b30', textAlign: 'center' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#ffffff' }}>{solutions[activeTab].desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 'black', color: '#f59e0b' }}>{solutions[activeTab].savings}</p>
                <p style={{ color: '#0ea5e9', fontWeight: 'bold' }}>25-Year Savings</p>
              </div>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 'black', color: '#0ea5e9' }}>{solutions[activeTab].co2}</p>
                <p style={{ color: '#f59e0b', fontWeight: 'bold' }}>CO2 Eliminated</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SAVINGS CALCULATOR - SLIDER */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#0f1419', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#f59e0b' }}>
            CALCULATE YOUR SAVINGS
          </h3>
        </Reveal>
        <div style={{ backgroundColor: '#060a0f', padding: '3rem', borderRadius: '1rem', border: '1px solid #f59e0b30' }}>
          <Reveal delay={0.1}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'black', color: 'white' }}>
                Home Size: {sliderValue} m²
              </label>
              <input
                type="range"
                min="50"
                max="500"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '10px',
                  background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(sliderValue / 500) * 100}%, #f59e0b30 ${(sliderValue / 500) * 100}%, #f59e0b30 100%)`,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
              <p style={{ fontSize: '1rem', color: '#ffffff80', marginBottom: '1rem' }}>Annual Savings</p>
              <div style={{ fontSize: '3rem', fontWeight: 'black', color: '#f59e0b', marginBottom: '1rem' }}>
                ${annualSavings.toLocaleString()}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#ffffff80' }}>Over 25 years: ${(annualSavings * 25).toLocaleString()}</p>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* INSTALLATION TIMELINE - PROGRESS */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#f59e0b' }}>
            INSTALLATION PROCESS
          </h3>
        </Reveal>
        <div style={{ position: 'relative' }}>
          {/* Progress Bar */}
          <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1 }} style={{ position: 'absolute', top: '24px', left: '0', height: '4px', backgroundColor: '#f59e0b', borderRadius: '2px', zIndex: 0 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', position: 'relative', zIndex: 1 }}>
            {timeline.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div style={{ backgroundColor: '#0f1419', padding: '2rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid #f59e0b30' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#f59e0b', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#060a0f', fontWeight: 'black', fontSize: '1.5rem', border: '4px solid #0f1419' }}>
                    {item.step}
                  </div>
                  <h4 style={{ fontWeight: 'black', marginBottom: '0.5rem', color: 'white' }}>{item.title}</h4>
                  <p style={{ color: '#ffffff60', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS COUNTER */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#0f1419' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          <Counter target={10} label="GW Installed" suffix="+" />
          <Counter target={500} label="Thousand Homes" suffix="K+" />
          <Counter target={2} label="Million Tons CO2" suffix="M" />
          <Counter target={98} label="Uptime Guarantee" suffix="%" />
        </div>
      </section>

      {/* MARQUEE */}
      <section style={{ padding: '3rem 0', backgroundColor: '#060a0f', overflow: 'hidden' }}>
        <Marquee items={['25-Year Warranty', '30% Tax Credit', 'Zero Installation Cost', 'Grid-Tied Systems', 'Battery Backup']} />
      </section>

      {/* GOVERNMENT INCENTIVES - ACCORDION */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '2rem', textAlign: 'center', color: '#f59e0b' }}>
            GOVERNMENT INCENTIVES
          </h3>
        </Reveal>
        {incentives.map((incentive, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <Accordion
              title={incentive.title}
              content={incentive.content}
              isOpen={openAccordion === `incentive-${idx}`}
              onClick={() => setOpenAccordion(openAccordion === `incentive-${idx}` ? null : `incentive-${idx}`)}
            />
          </Reveal>
        ))}
      </section>

      {/* CASE STUDIES - CAROUSEL */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#0f1419', maxWidth: '1000px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#f59e0b' }}>
            REAL RESULTS
          </h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {caseStudies.map((study, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div style={{ backgroundColor: '#060a0f', padding: '2rem', borderRadius: '1rem', border: '1px solid #f59e0b30' }}>
                <h4 style={{ fontWeight: 'black', marginBottom: '1.5rem', color: '#f59e0b' }}>{study.name}</h4>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: '#ffffff80', fontSize: '0.9rem', marginBottom: '0.5rem' }}>System Size</p>
                  <p style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>{study.kw}</p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: '#ffffff80', fontSize: '0.9rem', marginBottom: '0.5rem' }}>25-Year Savings</p>
                  <p style={{ color: '#f59e0b', fontWeight: 'black', fontSize: '1.5rem' }}>{study.savings}</p>
                </div>
                <div>
                  <p style={{ color: '#ffffff80', fontSize: '0.9rem', marginBottom: '0.5rem' }}>CO2 Eliminated</p>
                  <p style={{ color: '#0ea5e9', fontWeight: 'bold' }}>{study.co2}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#f59e0b' }}>
            WHAT OUR CUSTOMERS SAY
          </h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {testimonials.map((testimonial, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div style={{ backgroundColor: '#0f1419', padding: '2rem', borderRadius: '1rem', border: '1px solid #f59e0b30' }}>
                <p style={{ color: '#f59e0b', marginBottom: '1rem', fontStyle: 'italic', fontWeight: 'bold' }}>"{testimonial.quote}"</p>
                <p style={{ fontWeight: 'black', color: 'white' }}>{testimonial.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '2rem', textAlign: 'center', color: '#f59e0b' }}>
            FAQ
          </h3>
        </Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <Accordion title={faq.title} content={faq.content} isOpen={openAccordion === `faq-${idx}`} onClick={() => setOpenAccordion(openAccordion === `faq-${idx}` ? null : `faq-${idx}`)} />
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#0f1419', color: '#060a0f', textAlign: 'center' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '1rem', letterSpacing: '1px', color: '#f59e0b' }}>READY TO GO SOLAR?</h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>Join 500K+ homeowners saving thousands with Solaris Energy</p>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticBtn onClick={() => setShowQuoteDialog(true)}>Get Your Quote Today</MagneticBtn>
        </Reveal>
      </section>

      {/* QUOTE DIALOG */}
      <AnimatePresence>
        {showQuoteDialog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQuoteDialog(false)} style={{ position: 'fixed', inset: 0, backgroundColor: '#00000080', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 60 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ backgroundColor: '#0f1419', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', width: '90%', border: '1px solid #f59e0b30' }}>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 'black', marginBottom: '1.5rem', color: '#f59e0b' }}>Get Your Free Quote</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <input type="text" placeholder="Full Name" style={{ padding: '0.75rem', backgroundColor: '#060a0f', color: 'white', borderRadius: '0.5rem', border: '1px solid #f59e0b30' }} />
                <input type="email" placeholder="Email Address" style={{ padding: '0.75rem', backgroundColor: '#060a0f', color: 'white', borderRadius: '0.5rem', border: '1px solid #f59e0b30' }} />
                <input type="tel" placeholder="Phone Number" style={{ padding: '0.75rem', backgroundColor: '#060a0f', color: 'white', borderRadius: '0.5rem', border: '1px solid #f59e0b30' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowQuoteDialog(false)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#f59e0b', color: '#060a0f', borderRadius: '0.5rem', fontWeight: 'black', cursor: 'pointer' }}>
                  Get Quote
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowQuoteDialog(false)} style={{ flex: 1, padding: '0.75rem', backgroundColor: 'transparent', border: '2px solid #f59e0b', color: '#f59e0b', borderRadius: '0.5rem', fontWeight: 'black', cursor: 'pointer' }}>
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
