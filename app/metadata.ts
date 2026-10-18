// metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://binubabu.in'),
  title: {
    default: "Autonomous Operational Systems (AOS) | Binu Babu",
    template: "%s | Binu Babu"
  },
  description: "Binu Babu designs Autonomous Operational Systems (AOS): AI that runs real operational work end to end, where agents do the work and people set goals, judge exceptions, and own the outcome. Autonomy matched to reversibility; trust earned with evidence.",
  keywords: [
    "Autonomous Operational Systems",
    "AOS",
    "Autonomous Agents",
    "Agentic Systems",
    "Agent Autonomy Design",
    "AI Delegation",
    "Gen AI Agent Architecture",
    "Multi-Agent Orchestration",
    "Agent Memory Systems",
    "AI Evals and Guardrails",
    "AI Product Leader",
    "AI Product Strategy",
    "Enterprise AI Platforms",
    "Production-Ready AI Systems",
    "Human-in-the-Loop AI",
    "AI Product Playbook"
  ],
  authors: [{ name: "Binu Babu" }],
  creator: "Binu Babu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://binubabu.in",
    title: "Autonomous Operational Systems (AOS) | Binu Babu",
    description: "Binu Babu designs Autonomous Operational Systems (AOS): AI that runs real operational work end to end. Autonomy matched to reversibility; trust earned with evidence.",
    siteName: "Binu Babu",
    images: [
      {
        url: "/homepage.webp",
        width: 1200,
        height: 630,
        alt: "Binu Babu - Autonomous Operational Systems (AOS)"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous Operational Systems (AOS) | Binu Babu",
    description: "AI that runs real operational work end to end, where agents do the work and people set goals and judge. Autonomy matched to reversibility; trust earned with evidence.",
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