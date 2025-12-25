// metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://binubabu.in'),
  title: {
    default: "AI Product Consultant | Binu Babu",
    template: "%s | Binu Babu"
  },
  description: "Bridging the gap between cutting-edge LLM engineering and strategic product leadership. Specialist in building production-ready Gen AI agents and agentic workflows.",
  keywords: [
    "AI Product Consultant",
    "Gen AI Agent Architecture",
    "Agentic Workflows",
    "LLM Engineering", 
    "AI Product Strategy", 
    "AI Consulting", 
    "Technology Consultant", 
    "AI Product Development", 
    "Production-Ready AI Systems",
    "AI Product Management", 
    "AI Strategy Consulting", 
    "AI Product Roadmap", 
    "AI Agent Engineering",
    "AI Go-to-Market", 
    "AI Growth Strategy", 
    "AI Product Playbook"
  ],
  authors: [{ name: "Binu Babu" }],
  creator: "Binu Babu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://binubabu.in",
    title: "AI Product Consultant | Binu Babu",
    description: "Bridging the gap between cutting-edge LLM engineering and strategic product leadership. Specialist in building production-ready Gen AI agents and agentic workflows.",
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
    title: "AI Product Consultant | Binu Babu",
    description: "Bridging the gap between cutting-edge LLM engineering and strategic product leadership.",
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