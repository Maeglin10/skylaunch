import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse 181 Website Themes | AeviaLaunch",
  description: "Explore 181 professional website themes — 21 site builder templates and 160 impact vault designs. Preview any theme live, then build your site in minutes.",
  openGraph: {
    title: "Browse 181 Website Themes | AeviaLaunch",
    description: "21 site builder templates and 160 impact vault designs. Click any theme for a live preview.",
    url: "https://aevia-launch.vercel.app/themes",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://aevia-launch.vercel.app/themes" },
};

export default function ThemesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
