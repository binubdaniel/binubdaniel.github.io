import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://binubabu.in'),
  title: "The AOS Playbook: Autonomous Operational Systems",
  description: "The method for designing Autonomous Operational Systems: discovery to find where autonomy creates outsized value, then design to make it earn trust, with autonomy matched to reversibility and earned stage by stage.",
  keywords: [
    "Autonomous Operational Systems",
    "AOS Playbook",
    "Agent Autonomy Design",
    "AI Delegation Framework",
    "Agentic Discovery",
    "Human-in-the-Loop AI",
    "AI Evals and Guardrails",
    "Multi-Agent Orchestration",
    "Production AI Methodology"
  ],
  openGraph: {
    title: "The AOS Playbook | Binu Babu",
    description: "The method for designing Autonomous Operational Systems: discovery, design, and rollout. Autonomy matched to reversibility; trust earned with evidence.",
    type: "website",
    url: "https://binubabu.in/product-playbook",
    images: [
      {
        url: "/homepage.webp",
        width: 1200,
        height: 630,
        alt: "The AOS Playbook - Autonomous Operational Systems"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The AOS Playbook | Binu Babu",
    description: "The method for designing Autonomous Operational Systems: discovery, design, rollout. Autonomy matched to reversibility; trust earned with evidence.",
    images: ["/homepage.webp"]
  }
};
