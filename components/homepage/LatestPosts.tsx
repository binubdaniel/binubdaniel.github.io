import Link from "next/link";
import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowRight } from "lucide-react";

// Async server component. Shows the 3 most recent published posts, and renders
// nothing at all when there are none (so the homepage never shows an empty
// blog teaser). A DB hiccup degrades gracefully to hidden rather than erroring.
export default async function LatestPosts() {
  let posts: {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    publishedAt: Date | null;
    updatedAt: Date;
  }[] = [];

  try {
    posts = await prisma.post.findMany({
      where: { status: PostStatus.PUBLISHED },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
  } catch {
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section className="relative bg-background py-32">
      {/* Minimal background */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Writing</Eyebrow>
            <h2 className="mt-6 text-5xl font-thin tracking-tight text-foreground md:text-6xl">
              Latest writing
            </h2>
            <p className="mt-4 text-lg font-light leading-relaxed text-muted-foreground">
              Notes on AI product strategy, LLM engineering, and shipping
              agentic systems.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-sm font-light text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            All posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col border border-border p-6 transition-all duration-300 hover:border-foreground"
            >
              <h3 className="text-xl font-light text-foreground transition-colors group-hover:text-muted-foreground">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
              <time
                dateTime={(post.publishedAt ?? post.updatedAt).toISOString()}
                className="mt-auto pt-6 text-xs uppercase tracking-[0.15em] text-muted-foreground"
              >
                {formatDate((post.publishedAt ?? post.updatedAt).toISOString())}
              </time>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-2 whitespace-nowrap text-sm font-light text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        >
          All posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
