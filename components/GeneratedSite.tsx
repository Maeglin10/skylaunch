"use client";

import type { SessionData } from "@/lib/sessions";
import { Star } from "lucide-react";

export function GeneratedSite({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  if (!c) return null;

  const brand = formData.brandColor || "#7c3aed";

  const heroImage =
    formData.heroImageBase64 ||
    formData.heroImageUrl ||
    `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80`;

  const aboutParagraphs = c.aboutText.split("\n\n").filter(Boolean);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#fff", color: "#111" }}>
      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#111" }}>
          {formData.logoBase64
            ? <img src={formData.logoBase64} alt="Logo" style={{ height: 32, objectFit: "contain" }} />
            : formData.businessName}
        </div>
        <a href="#contact" style={{ background: brand, color: "#fff", padding: "8px 20px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          {c.ctaText}
        </a>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", height: 520, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img src={heroImage} alt="Hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20, maxWidth: 620 }}>
            {c.heroHeadline}
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", maxWidth: 500, marginBottom: 32 }}>
            {c.heroSubline}
          </p>
          <a href="#contact" style={{ background: brand, color: "#fff", padding: "14px 32px", borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            {c.ctaText}
          </a>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>What we offer</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {c.services.map((s, i) => (
            <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 28 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: brand + "20", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: brand }} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6 }}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section style={{ background: "#f9fafb", padding: "80px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>{c.aboutTitle}</h2>
          {aboutParagraphs.map((p, i) => (
            <p key={i} style={{ color: "#374151", lineHeight: 1.8, marginBottom: 20, fontSize: 16 }}>{p}</p>
          ))}
          {formData.priceRange && (
            <div style={{ display: "inline-block", background: brand + "15", border: `1px solid ${brand}40`, borderRadius: 12, padding: "12px 24px", marginTop: 8 }}>
              <span style={{ fontWeight: 600, color: brand }}>{formData.priceRange}</span>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>What clients say</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {c.testimonials.map((t, i) => (
            <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 28 }}>
              <div style={{ display: "flex", marginBottom: 12 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} style={{ width: 16, height: 16, fill: "#f59e0b", color: "#f59e0b" }} />
                ))}
              </div>
              <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ background: brand, padding: "80px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Ready to get started?</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, marginBottom: 32 }}>{c.heroSubline}</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {formData.email && (
            <a href={`mailto:${formData.email}`} style={{ background: "#fff", color: brand, padding: "14px 32px", borderRadius: 999, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
              {formData.email}
            </a>
          )}
          {formData.phone && (
            <a href={`tel:${formData.phone}`} style={{ border: "2px solid rgba(255,255,255,0.5)", color: "#fff", padding: "14px 32px", borderRadius: 999, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              {formData.phone}
            </a>
          )}
        </div>
        {formData.city && <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 24, fontSize: 14 }}>{formData.city}</p>}
      </section>

      {/* Footer */}
      <footer style={{ background: "#111", color: "#9ca3af", padding: "24px 40px", textAlign: "center", fontSize: 13 }}>
        © {new Date().getFullYear()} {formData.businessName}. All rights reserved.
      </footer>
    </div>
  );
}
