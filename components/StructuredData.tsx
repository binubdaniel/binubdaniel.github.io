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
  jobTitle: "AI Product Consultant",
  description: "Bridging the gap between cutting-edge LLM engineering and strategic product leadership. Specialist in building production-ready Gen AI agents and agentic workflows.",
  url: "https://binubabu.in",
  sameAs: [
    "https://linkedin.com/in/binubdaniel"
  ],
  knowsAbout: [
    "Gen AI Agent Architecture",
    "Agentic Workflows",
    "LLM Engineering",
    "AI Product Strategy",
    "Production-Ready AI Systems",
    "AI Product Management",
    "AI Consulting",
    "Technology Strategy",
    "Product Architecture"
  ],
  hasOccupation: {
    "@type": "Occupation",
    "name": "AI & Gen AI Agents Architect",
    "description": "Strategic AI product engineering and agentic system consulting"
  }
};

export const WebsiteSchema = {
  name: "Binu Babu",
  description: "AI & Gen AI Agents Architect - Engineering production-ready agentic systems and AI products",
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
  headline: "AI Product Development Playbook",
  description: "Comprehensive framework for building defensible AI products from concept to scale",
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
      "name": "AI Product Development"
    },
    {
      "@type": "Thing", 
      "name": "AI Product Strategy"
    },
    {
      "@type": "Thing",
      "name": "Defensible AI Products"
    }
  ]
};
