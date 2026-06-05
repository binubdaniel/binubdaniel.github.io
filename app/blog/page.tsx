import type { Metadata } from "next";
import Link from "next/link";
import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

// Rendered per request (reads the DB) — avoids any build-time DB dependency.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
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
      publishedAt: true,
      updatedAt: true,
    },
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-2 text-muted-foreground">
          Notes on AI product strategy, LLM engineering, and shipping agentic
          systems.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet — check back soon.</p>
      ) : (
        <ul className="divide-y divide-border border-t border-border">
          {posts.map((post) => (
            <li key={post.id} className="py-8">
              <article>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-xl font-semibold text-foreground group-hover:underline">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                  )}
                </Link>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                  <time dateTime={(post.publishedAt ?? post.updatedAt).toISOString()}>
                    {formatDate((post.publishedAt ?? post.updatedAt).toISOString())}
                  </time>
                  {post.tags.length > 0 && (
                    <span className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="border border-border px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
