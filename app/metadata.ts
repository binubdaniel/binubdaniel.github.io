// metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Binu Babu | AI Product Architect & Technology Consultant",
    template: "%s | Binu Babu"
  },
  description: "Transform your AI initiatives from concept to market success. Expert AI product strategy, defensible AI products, and strategic consulting for companies building competitive AI solutions.",
  keywords: [
    "AI Product Architect", 
    "AI Product Strategy", 
    "AI Consulting", 
    "Technology Consultant", 
    "AI Product Development", 
    "Defensible AI Products", 
    "AI Product Management", 
    "AI Strategy Consulting", 
    "AI Product Roadmap", 
    "AI Market Research", 
    "AI Go-to-Market", 
    "AI Growth Strategy", 
    "AI Product Playbook", 
    "AI Product Framework",
    "AI Product Leadership",
    "AI Competitive Advantage",
    "AI Business Strategy"
  ],
  authors: [{ name: "Binu Babu" }],
  creator: "Binu Babu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://binubabu.in",
    title: "Binu Babu | AI Product Architect & Technology Consultant",
    description: "Transform your AI initiatives from concept to market success. Expert AI product strategy and strategic consulting for building defensible AI products.",
    siteName: "Binu Babu",
    images: [
      {
        url: "/homepage.webp",
        width: 1200,
        height: 630,
        alt: "Binu Babu - AI Product Architect & Technology Consultant"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Binu Babu | AI Product Architect & Technology Consultant",
    description: "Transform your AI initiatives from concept to market success. Expert AI product strategy and strategic consulting for building defensible AI products.",
    images: ["/homepage.webp"]
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true
  }
};