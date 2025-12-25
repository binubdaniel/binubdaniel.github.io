import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://binubabu.in'),
  title: "AI & Gen AI Agents Development Playbook",
  description: "Comprehensive framework for building production-ready Gen AI agents and agentic systems from concept to scale.",
  keywords: [
    "AI & Gen AI Agents Playbook",
    "Agentic Framework",
    "Gen AI Agent Strategy",
    "LLM Engineering Roadmap",
    "Agentic Workflows",
    "Production AI Methodology",
    "AI Agent Architecture",
    "AI Product Execution",
    "AI Growth Strategy"
  ],
  openGraph: {
    title: "AI Product Development Playbook | Binu Babu",
    description: "Comprehensive framework for building defensible AI products from concept to scale. Strategic AI product development methodology.",
    type: "website",
    url: "https://binubabu.in/product-playbook",
    images: [
      {
        url: "/homepage.webp",
        width: 1200,
        height: 630,
        alt: "AI Product Development Playbook - Strategic Framework"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Development Playbook | Binu Babu",
    description: "Comprehensive framework for building defensible AI products from concept to scale.",
    images: ["/homepage.webp"]
  }
};
