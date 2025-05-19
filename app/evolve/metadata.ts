// app/evolve-book/metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "EVOLVE: An Adaptive Framework for AI Product Development",
  description: "A revolutionary approach to AI product development that addresses the unique challenges of building systems with probabilistic outputs and complex data dependencies.",
  keywords: ["EVOLVE Framework", "AI Product Development", "AI Framework", "Binu Babu", "AI Methodology"],
  authors: [{ name: "Binu Babu" }],
  creator: "Binu Babu",
  openGraph: {
    type: "book",
    locale: "en_US",
    url: "https://binubabu.in/evolve",
    title: "EVOLVE: An Adaptive Framework for AI Product Development",
    description: "A revolutionary approach to AI product development addressing the unique challenges of AI systems. Coming June 2025.",
    siteName: "Binu Babu",
    images: [
      {
        url: "/evolve.webp", 
        width: 1200,
        height: 630,
        alt: "EVOLVE Framework Book Cover"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "EVOLVE: An Adaptive Framework for AI Product Development",
    description: "A revolutionary approach to AI product development addressing the unique challenges of AI systems. Coming June 2025.",
    images: ["/evolve.webp"]
  },
  robots: {
    index: true,
    follow: true
  }
};