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
  jobTitle: "AI Product Architect & Technology Consultant",
  description: "Transform your AI initiatives from concept to market success. Expert AI product strategy, defensible AI products, and strategic consulting for companies building competitive AI solutions.",
  url: "https://binubabu.in",
  sameAs: [
    "https://linkedin.com/in/binubdaniel"
  ],
  knowsAbout: [
    "AI Product Strategy",
    "AI Product Development", 
    "Defensible AI Products",
    "AI Product Management",
    "AI Consulting",
    "Technology Strategy",
    "Product Architecture",
    "AI Go-to-Market",
    "AI Growth Strategy"
  ],
  hasOccupation: {
    "@type": "Occupation",
    "name": "AI Product Architect",
    "description": "Strategic AI product development and consulting"
  }
};

export const WebsiteSchema = {
  name: "Binu Babu",
  description: "AI Product Architect & Technology Consultant - Transform your AI initiatives from concept to market success",
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
