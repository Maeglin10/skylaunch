import type { MetadataRoute } from 'next'

const BASE = "https://aevia-launch.vercel.app";

const SITE_THEME_IDS = [
  "landing","saas","agency","vitrine","consultant","portfolio","ecommerce",
  "restaurant","hotel","healthcare","realestate","fitness","event","nonprofit",
  "startup","luxury","brutalist","magazine","aurora","3d-tech","minimal-pro",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const themePages = SITE_THEME_IDS.map(id => ({
    url: `${BASE}/themes/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/themes`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/configure`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    ...themePages,
  ];
}
