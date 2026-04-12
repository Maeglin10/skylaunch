export interface FormData {
  // Step 1
  businessName: string;
  businessType: string;
  tagline: string;
  city: string;
  // Step 2
  mainService: string;
  benefits: [string, string, string];
  priceRange: string;
  targetAudience: string;
  // Step 3
  brandColor: string;
  tone: string;
  template: string;
  // Step 4
  logoBase64?: string;
  heroImageBase64?: string;
  heroImageUrl?: string;
  // Step 5
  email: string;
  phone?: string;
  instagram?: string;
  linkedin?: string;
}

export interface GeneratedContent {
  heroHeadline: string;
  heroSubline: string;
  aboutTitle: string;
  aboutText: string;
  services: { title: string; description: string }[];
  testimonials: { name: string; role: string; text: string; rating: number }[];
  ctaText: string;
  metaTitle: string;
  metaDescription: string;
}

export interface SessionData {
  id: string;
  formData: FormData;
  generatedContent?: GeneratedContent;
  createdAt: Date;
}

const sessions = new Map<string, SessionData>();

export function saveSession(id: string, data: SessionData) {
  sessions.set(id, data);
}

export function getSession(id: string): SessionData | undefined {
  return sessions.get(id);
}

export function updateSession(id: string, updates: Partial<SessionData>) {
  const existing = sessions.get(id);
  if (existing) {
    sessions.set(id, { ...existing, ...updates });
  }
}
