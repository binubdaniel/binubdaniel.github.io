import React from 'react';

interface StructuredDataProps {
  type: 'Person' | 'Organization' | 'Article' | 'WebPage';
  data: Record<string, unknown>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Predefined structured data for Binu Babu
export const BinuBabuPersonSchema = {
  name: "Binu Babu",
  jobTitle: "AI Product Leader",
  description: "Binu Babu designs Autonomous Operational Systems (AOS): AI that runs real operational work end to end, where agents do the work and people set goals, judge exceptions, and own the outcome. Autonomy matched to reversibility; trust earned with evidence.",
  url: "https://binubabu.in",
  sameAs: [
    "https://linkedin.com/in/binubdaniel"
  ],
  knowsAbout: [
    "Autonomous Operational Systems",
    "Autonomous Agents",
    "Agentic Systems",
    "Agent Autonomy Design",
    "Multi-Agent Orchestration",
    "Agent Memory Systems",
    "AI Delegation and Human-in-the-Loop Design",
    "AI Evaluation and Guardrails",
    "Enterprise AI Platforms",
    "AI Product Strategy"
  ],
  hasOccupation: {
    "@type": "Occupation",
    "name": "AI Product Leader",
    "description": "Designing Autonomous Operational Systems: agents that run real operational work, with autonomy matched to reversibility and trust earned with evidence"
  }
};

export const WebsiteSchema = {
  name: "Binu Babu",
  description: "Binu Babu designs Autonomous Operational Systems (AOS): agents that run real operational work end to end, with autonomy matched to reversibility and trust earned with evidence",
  url: "https://binubabu.in",
  author: {
    "@type": "Person",
    "name": "Binu Babu"
  },
  potentialAction: {
    "@type": "SearchAction",
    "target": "https://binubabu.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const PlaybookArticleSchema = {
  headline: "The AOS Playbook: Autonomous Operational Systems",
  description: "The method for designing Autonomous Operational Systems: discovery to find where autonomy creates outsized value, then design to make it earn trust, with autonomy matched to reversibility and earned stage by stage",
  author: {
    "@type": "Person",
    "name": "Binu Babu"
  },
  publisher: {
    "@type": "Person",
    "name": "Binu Babu"
  },
  datePublished: "2024-01-01",
  dateModified: new Date().toISOString().split('T')[0],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://binubabu.in/product-playbook"
  },
  about: [
    {
      "@type": "Thing",
      "name": "Autonomous Operational Systems"
    },
    {
      "@type": "Thing",
      "name": "Agent Autonomy Design"
    },
    {
      "@type": "Thing",
      "name": "AI Delegation and Human-in-the-Loop Design"
    }
  ]
};
