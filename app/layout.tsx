import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import type { Metadata } from "next";
import "./globals.css";
import "./journey-composition.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  title: "Swayam Badhe",
  description:
    "Swayam Rohidas Badhe: production software engineering, backend systems, full-stack development, and applied AI. Explore a cinematic space journey through his work.",
  openGraph: {
    title: "Swayam Badhe — Software Engineer",
    description: "Engineering systems. Exploring intelligence.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swayam Badhe — Software Engineer",
    description: "Production systems, full-stack development, and applied AI.",
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
