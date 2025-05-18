import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binu B Daniel X Groot AI",
  description: "Engage with Groot AI, Binu Babu's multi-agent AI assistant for intelligent conversation handling, technical consultations, and meeting scheduling.",
  keywords: [
    "AI Assistant", 
    "Groot AI", 
    "Binu Babu", 
    "AI Consultant", 
    "Technical Consultation", 
    "Multi-agent AI System", 
    "Meeting Scheduling",
    "LLM Orchestration",
    "Technology Consulting"
  ],
  authors: [{ name: "Binu Babu" }],
  creator: "Binu Babu",
  publisher: "Binu Babu",
  applicationName: "Groot AI Assistant",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://binubabu.in",
    title: "Binu B Daniel X Groot AI",
    description: "Engage with Groot AI, Binu Babu's multi-agent AI assistant for intelligent conversation analysis and technical consultations.",
    siteName: "Groot AI",
    images: [
      {
        url: "/binubabu.webp",
        width: 1200,
        height: 630,
        alt: "Groot AI Assistant"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Binu B Daniel X Groot AI",
    description: "Engage with Groot AI, Binu Babu's multi-agent AI assistant for intelligent conversation analysis and technical consultations.",
    images: ["/binubabu.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: "technology"
};