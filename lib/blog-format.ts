import matter from "gray-matter";

export interface FaqItem {
  question: string;
  answer: string;
}

// The canonical shape the skill emits and the editor ingests. All optional
// except content/title so partial pastes still fill what they can.
export interface ParsedPost {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  tldr: string;
  faq: FaqItem[];
  content: string;
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function normalizeTags(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof v === "string") {
    return v
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

export function normalizeFaq(v: unknown): FaqItem[] {
  if (!Array.isArray(v)) return [];
  const out: FaqItem[] = [];
  for (const item of v) {
    if (item && typeof item === "object") {
      const rec = item as Record<string, unknown>;
      const question = str(rec.question ?? rec.q);
      const answer = str(rec.answer ?? rec.a);
      if (question && answer) out.push({ question, answer });
    }
  }
  return out;
}

// Claude often wraps the document in a ```markdown … ``` block for easy
// copying. Strip a single outer fence if present before parsing frontmatter.
function stripOuterFence(raw: string): string {
  const trimmed = raw.trim();
  const fence = /^```[a-zA-Z]*\n([\s\S]*?)\n```$/;
  const m = trimmed.match(fence);
  return m ? m[1] : trimmed;
}

export function parseBlogDocument(raw: string): {
  post: ParsedPost;
  hasFrontmatter: boolean;
} {
  const cleaned = stripOuterFence(raw);
  const { data, content } = matter(cleaned);
  const hasFrontmatter = Object.keys(data).length > 0;

  return {
    hasFrontmatter,
    post: {
      title: str(data.title),
      slug: str(data.slug),
      excerpt: str(data.excerpt),
      coverImage: str(data.coverImage ?? data.cover ?? data.image),
      tags: normalizeTags(data.tags),
      metaTitle: str(data.metaTitle ?? data.meta_title),
      metaDescription: str(data.metaDescription ?? data.meta_description),
      canonicalUrl: str(data.canonicalUrl ?? data.canonical ?? data.canonical_url),
      tldr: str(data.tldr ?? data.summary),
      faq: normalizeFaq(data.faq),
      content: content.trim(),
    },
  };
}
