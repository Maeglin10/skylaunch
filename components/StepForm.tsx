"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";

const BUSINESS_TYPES = [
  "Restaurant", "Agency", "Coach", "Consultant",
  "E-commerce", "Portfolio", "Artisan", "Healthcare", "Other",
];

const TONES = ["Professional", "Friendly", "Bold", "Luxurious"];

const TEMPLATES = [
  { id: "landing", label: "Landing Page", desc: "Conversion-focused, single page", icon: "🚀" },
  { id: "vitrine", label: "Site Vitrine", desc: "Professional multi-page presence", icon: "🏢" },
  { id: "ecommerce", label: "E-commerce", desc: "Online store with cart", icon: "🛍️" },
];

const TOTAL_STEPS = 5;

type FormState = {
  businessName: string; businessType: string; tagline: string; city: string;
  mainService: string; benefit1: string; benefit2: string; benefit3: string;
  priceRange: string; targetAudience: string;
  brandColor: string; tone: string; template: string;
  email: string; phone: string; instagram: string; linkedin: string;
};

const initial: FormState = {
  businessName: "", businessType: "", tagline: "", city: "",
  mainService: "", benefit1: "", benefit2: "", benefit3: "",
  priceRange: "", targetAudience: "",
  brandColor: "#7c3aed", tone: "Professional", template: "landing",
  email: "", phone: "", instagram: "", linkedin: "",
};

export function StepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 1) return form.businessName && form.businessType && form.tagline;
    if (step === 2) return form.mainService && form.benefit1;
    if (step === 5) return form.email;
    return true;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      // Create session
      const sessionRes = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: {
            businessName: form.businessName, businessType: form.businessType,
            tagline: form.tagline, city: form.city,
            mainService: form.mainService,
            benefits: [form.benefit1, form.benefit2, form.benefit3],
            priceRange: form.priceRange, targetAudience: form.targetAudience,
            brandColor: form.brandColor, tone: form.tone, template: form.template,
            email: form.email, phone: form.phone,
            instagram: form.instagram, linkedin: form.linkedin,
          },
        }),
      });
      const { sessionId } = await sessionRes.json();

      // Generate content
      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          formData: {
            businessName: form.businessName, businessType: form.businessType,
            tagline: form.tagline, city: form.city,
            mainService: form.mainService,
            benefits: [form.benefit1, form.benefit2, form.benefit3],
            priceRange: form.priceRange, targetAudience: form.targetAudience,
            brandColor: form.brandColor, tone: form.tone, template: form.template,
            email: form.email, phone: form.phone,
            instagram: form.instagram, linkedin: form.linkedin,
          },
        }),
      });

      const { previewUrl } = await genRes.json();
      router.push(previewUrl);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const variants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="w-full max-w-xl">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i + 1 < step
                  ? "bg-violet-600 text-white"
                  : i + 1 === step
                  ? "bg-violet-600 text-white ring-4 ring-violet-600/20"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div className={`flex-1 h-0.5 rounded ${i + 1 < step ? "bg-violet-600" : "bg-zinc-800"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 space-y-5"
        >
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-white">Your business</h2>
              <Field label="Business name *">
                <input className={input} value={form.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="Nexxa Studio" />
              </Field>
              <Field label="Type of business *">
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("businessType", t)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        form.businessType === t
                          ? "bg-violet-600 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="What you do *">
                <textarea className={`${input} resize-none`} rows={2} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="We design and build websites for small businesses..." />
              </Field>
              <Field label="City">
                <input className={input} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Paris, France" />
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-white">Your offer</h2>
              <Field label="Main service / product *">
                <input className={input} value={form.mainService} onChange={(e) => set("mainService", e.target.value)} placeholder="Custom website design" />
              </Field>
              <Field label="3 key benefits *">
                {(["benefit1", "benefit2", "benefit3"] as const).map((k, i) => (
                  <input key={k} className={`${input} mb-2`} value={form[k]} onChange={(e) => set(k, e.target.value)} placeholder={`Benefit ${i + 1}${i === 0 ? " *" : " (optional)"}`} />
                ))}
              </Field>
              <Field label="Price range">
                <input className={input} value={form.priceRange} onChange={(e) => set("priceRange", e.target.value)} placeholder="From €500 / €29 per month" />
              </Field>
              <Field label="Target audience">
                <input className={input} value={form.targetAudience} onChange={(e) => set("targetAudience", e.target.value)} placeholder="Small business owners, freelancers..." />
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-bold text-white">Style & tone</h2>
              <Field label="Brand colour">
                <div className="flex items-center gap-3">
                  <input type="color" value={form.brandColor} onChange={(e) => set("brandColor", e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <span className="text-zinc-400 text-sm font-mono">{form.brandColor}</span>
                </div>
              </Field>
              <Field label="Tone of voice">
                <div className="flex flex-wrap gap-2">
                  {TONES.map((t) => (
                    <button key={t} type="button" onClick={() => set("tone", t)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${form.tone === t ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Template">
                <div className="grid grid-cols-1 gap-3">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} type="button" onClick={() => set("template", t.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${form.template === t.id ? "border-violet-600 bg-violet-600/10" : "border-zinc-700 hover:border-zinc-500"}`}>
                      <span className="text-2xl">{t.icon}</span>
                      <div>
                        <div className="text-white font-medium">{t.label}</div>
                        <div className="text-zinc-400 text-sm">{t.desc}</div>
                      </div>
                      {form.template === t.id && <Check className="w-5 h-5 text-violet-400 ml-auto" />}
                    </button>
                  ))}
                </div>
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-bold text-white">Photos & media</h2>
              <p className="text-zinc-400 text-sm">Optional — you can add these later.</p>
              <Field label="Logo (PNG or SVG)">
                <input type="file" accept="image/*" className={input} onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = () => setForm((s) => ({ ...s, logoBase64: reader.result as string }));
                  reader.readAsDataURL(f);
                }} />
              </Field>
              <Field label="Hero image">
                <input type="file" accept="image/*" className={input} onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = () => setForm((s) => ({ ...s, heroImageBase64: reader.result as string }));
                  reader.readAsDataURL(f);
                }} />
                <p className="text-zinc-500 text-xs mt-1">Or we'll use a professional stock image matching your business.</p>
              </Field>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-xl font-bold text-white">Almost there!</h2>
              <Field label="Email address *">
                <input type="email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
              </Field>
              <Field label="Phone">
                <input type="tel" className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+33 6 00 00 00 00" />
              </Field>
              <Field label="Instagram">
                <input className={input} value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@yourbrand" />
              </Field>
              <Field label="LinkedIn">
                <input className={input} value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="linkedin.com/in/yourname" />
              </Field>
              {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</p>}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-6">
        {step > 1 ? (
          <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 text-zinc-400 text-sm hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {step < TOTAL_STEPS ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={!canNext() || loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <>Generate my site <ArrowRight className="w-4 h-4" /></>}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-zinc-300">{label}</label>
      {children}
    </div>
  );
}

const input = "w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-violet-500 transition-colors";
