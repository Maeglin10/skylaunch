import type { FormData, GeneratedContent } from "./sessions";

const mockByType: Record<string, Partial<GeneratedContent>> = {
  Restaurant: {
    heroHeadline: "Where every meal becomes a memory",
    heroSubline: "Authentic flavours crafted with passion, served in a warm and welcoming atmosphere.",
    aboutTitle: "Our story",
    aboutText:
      "Born from a love of food and community, we opened our doors with one simple goal: to make every guest feel at home.\n\nOur chefs source the finest local ingredients each morning, turning them into dishes that surprise and delight.\n\nWhether you're joining us for a quick lunch or a long dinner, we promise an experience worth returning for.",
    services: [
      { title: "Dine In", description: "Relax in our cosy dining room and let us take care of everything." },
      { title: "Takeaway", description: "Your favourite dishes, packed with care and ready to enjoy anywhere." },
      { title: "Private Events", description: "Celebrate your special moments with a personalised menu and dedicated service." },
    ],
    testimonials: [
      { name: "Sophie L.", role: "Regular guest", text: "The food is incredible every single time. I bring all my friends here.", rating: 5 },
      { name: "Marc T.", role: "Food blogger", text: "Genuinely one of the best meals I've had this year. Don't miss it.", rating: 5 },
      { name: "Elena R.", role: "Local resident", text: "Perfect spot for a family dinner. Warm atmosphere and delicious food.", rating: 5 },
    ],
    ctaText: "Reserve a table",
  },
  Agency: {
    heroHeadline: "Digital experiences that convert",
    heroSubline: "We design and build digital products that grow your business — beautifully.",
    aboutTitle: "We build what matters",
    aboutText:
      "We're a boutique digital agency obsessed with results. Every project we take on starts with a deep understanding of your business, your customers, and your goals.\n\nOur team combines sharp design thinking with solid engineering to deliver products that look great and perform even better.\n\nFrom early-stage startups to established brands, we've helped dozens of companies find their digital edge.",
    services: [
      { title: "Web Design", description: "Conversion-focused interfaces crafted pixel by pixel for your audience." },
      { title: "Development", description: "Fast, secure, and scalable web applications built with modern tech." },
      { title: "SEO & Growth", description: "Data-driven strategies to grow your organic traffic and leads." },
    ],
    testimonials: [
      { name: "James K.", role: "CEO, TechStart", text: "They delivered our MVP in record time. The quality was outstanding.", rating: 5 },
      { name: "Camille D.", role: "Marketing Director", text: "Our conversion rate doubled after the redesign. Highly recommend.", rating: 5 },
      { name: "Alex M.", role: "Founder, SaaS Co.", text: "Professional, responsive, and incredibly talented team.", rating: 5 },
    ],
    ctaText: "Start a project",
  },
  default: {
    heroHeadline: "Excellence delivered, every time",
    heroSubline: "Professional services tailored to your needs, backed by years of expertise.",
    aboutTitle: "Who we are",
    aboutText:
      "We are a passionate team dedicated to delivering exceptional results for our clients.\n\nWith years of experience in our field, we combine expertise with a personal approach to ensure every client gets exactly what they need.\n\nYour success is our mission — we don't rest until the job is done right.",
    services: [
      { title: "Consultation", description: "Expert advice tailored to your unique situation and goals." },
      { title: "Implementation", description: "Hands-on support to bring your vision to life efficiently." },
      { title: "Support", description: "Ongoing assistance to ensure lasting results and peace of mind." },
    ],
    testimonials: [
      { name: "Marie P.", role: "Client", text: "Exceptional service from start to finish. I couldn't be happier.", rating: 5 },
      { name: "Thomas B.", role: "Business Owner", text: "Professional, reliable, and truly committed to results.", rating: 5 },
      { name: "Isabelle C.", role: "Manager", text: "They exceeded every expectation. I'll definitely work with them again.", rating: 5 },
    ],
    ctaText: "Get in touch",
  },
};

export function generateMockContent(formData: FormData): GeneratedContent {
  const base = mockByType[formData.businessType] ?? mockByType.default;
  return {
    heroHeadline: base.heroHeadline!,
    heroSubline: base.heroSubline!,
    aboutTitle: base.aboutTitle!,
    aboutText: base.aboutText!,
    services: base.services!,
    testimonials: base.testimonials!,
    ctaText: base.ctaText!,
    metaTitle: `${formData.businessName} — ${formData.tagline || formData.businessType}`,
    metaDescription: base.heroSubline!,
  };
}
