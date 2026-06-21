import type { Metadata } from "next";
import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";
import { NewsletterCTA } from "@/components/newsletter/NewsletterCTA";
import { BlogBrowser } from "@/components/blog/BlogBrowser";

// Rendered per request (reads the DB). Avoids any build-time DB dependency.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Essays & Notes",
  description:
    "Writing on AI product strategy, LLM engineering, and building production-ready agentic systems.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function BlogIndexPage() {
  const posts = await prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      tags: true,
      coverImage: true,
      publishedAt: true,
      updatedAt: true,
    },
  });

  const items = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    tags: p.tags,
    coverImage: p.coverImage,
    date: (p.publishedAt ?? p.updatedAt).toISOString(),
  }));

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-thin tracking-tight text-foreground sm:text-5xl">
          Essays &amp; Notes
        </h1>
        <p className="mt-4 max-w-xl font-light leading-relaxed text-muted-foreground">
          On AI product strategy, LLM engineering, and shipping agentic systems
          that survive production.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="font-light text-muted-foreground">
          No posts yet. Check back soon.
        </p>
      ) : (
        <BlogBrowser posts={items} />
      )}

      <NewsletterCTA />
    </main>
  );
}
