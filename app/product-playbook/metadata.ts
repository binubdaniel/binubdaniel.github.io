import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://binubabu.in'),
  title: "AI Product Development Playbook",
  description: "Comprehensive framework for building defensible AI products from concept to scale. Strategic AI product development methodology covering strategy, execution, launch, and growth phases.",
  keywords: [
    "AI Product Development Playbook",
    "AI Product Framework", 
    "AI Product Strategy",
    "AI Product Management",
    "AI Product Roadmap",
    "AI Product Methodology",
    "Defensible AI Products",
    "AI Product Launch",
    "AI Product Scaling",
    "AI Product Consulting",
    "AI Product Architecture",
    "AI Product Planning",
    "AI Product Execution",
    "AI Product Growth",
    "AI Product Framework Guide"
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
