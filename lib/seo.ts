import type { FaqItem } from "@/lib/blog-format";
import { SITE_URL, AUTHOR_NAME } from "@/lib/site";

export interface ArticleSeoInput {
  title: string;
  slug: string;
  excerpt?: string | null;
  metaDescription?: string | null;
  tldr?: string | null;
  coverImage?: string | null;
  tags: string[];
  publishedAt: Date | null;
  updatedAt: Date;
}

// schema.org BlogPosting — the Article structured data that helps Google and
// AI crawlers understand authorship, dates, and topic.
export function articleJsonLd(p: ArticleSeoInput) {
  const url = `${SITE_URL}/blog/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.metaDescription || p.excerpt || p.tldr || undefined,
    image: p.coverImage ? [p.coverImage] : undefined,
    datePublished: p.publishedAt ? p.publishedAt.toISOString() : undefined,
    dateModified: p.updatedAt.toISOString(),
    author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    keywords: p.tags.length ? p.tags.join(", ") : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

// schema.org FAQPage — strong answer-engine signal. Only emit when the same
// Q&As are rendered visibly on the page (Google requires visible content).
export function faqJsonLd(faq: FaqItem[]) {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
