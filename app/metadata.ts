// metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Binu Babu | AI Product Architect & Technology Consultant",
    template: "%s | Binu Babu"
  },
  description: "Pioneering the future of AI product development with innovative frameworks and practical methodologies that transform how organizations build intelligent systems.",
  keywords: ["AI Product Architect", "Technology Consultant", "AI Strategy", "EVOLVE Framework", "AI Development"],
  authors: [{ name: "Binu Babu" }],
  creator: "Binu Babu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://binubabu.in",
    title: "Binu Babu | AI Product Architect & Technology Consultant",
    description: "Pioneering the future of AI product development with innovative frameworks and practical methodologies.",
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
    title: "Binu Babu | AI Product Architect & Author",
    description: "Pioneering the future of AI product development with innovative frameworks and practical methodologies.",
    images: ["/homepage.webp"]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true
  }
};