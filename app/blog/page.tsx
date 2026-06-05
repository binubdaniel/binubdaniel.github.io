import type { Metadata } from "next";
import Link from "next/link";
import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeIn } from "@/components/ui/fade-in";
import { NewsletterCTA } from "@/components/newsletter/NewsletterCTA";

// Rendered per request (reads the DB). Avoids any build-time DB dependency.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing",
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

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <header className="mb-16">
        <Eyebrow>Writing</Eyebrow>
        <h1 className="mt-6 text-4xl font-thin tracking-tight text-foreground sm:text-5xl">
          Notes &amp; essays
        </h1>
        <p className="mt-4 max-w-xl font-light leading-relaxed text-muted-foreground">
          On AI product strategy, LLM engineering, and shipping agentic systems
          that survive production.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="font-light text-muted-foreground">
          No posts yet. Check back soon.
        </p>
      ) : (
        <ul className="border-t border-border">
          {posts.map((post, i) => (
            <li key={post.id} className="border-b border-border">
              <FadeIn delay={i * 0.05}>
                <article className="py-8">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start justify-between gap-6"
                  >
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-light tracking-tight text-foreground transition-colors group-hover:text-muted-foreground">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 font-light leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        <time
                          dateTime={(post.publishedAt ?? post.updatedAt).toISOString()}
                        >
                          {formatDate(
                            (post.publishedAt ?? post.updatedAt).toISOString(),
                          )}
                        </time>
                        {post.tags.length > 0 && (
                          <span className="flex flex-wrap gap-2 normal-case tracking-normal">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="border border-border px-2 py-0.5"
                              >
                                {tag}
                              </span>
                            ))}
                          </span>
                        )}
                      </div>
                    </div>

                    {post.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImage}
                        alt=""
                        loading="lazy"
                        className="hidden aspect-video w-32 shrink-0 border border-border object-cover grayscale transition-all duration-500 group-hover:grayscale-0 sm:block md:w-44"
                      />
                    )}
                  </Link>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      )}

      <NewsletterCTA />
    </main>
  );
}
