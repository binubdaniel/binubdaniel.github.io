import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { normalizeFaq } from "@/lib/blog-format";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import PostBody from "@/components/blog/PostBody";
import { FadeIn } from "@/components/ui/fade-in";
import { NewsletterCTA } from "@/components/newsletter/NewsletterCTA";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

// Cached per request so generateMetadata and the page share one query.
const getPost = cache(async (slug: string) => {
  return prisma.post.findFirst({
    where: { slug, status: PostStatus.PUBLISHED },
  });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found", robots: { index: false } };

  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.excerpt || post.tldr || undefined;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: { canonical: post.canonicalUrl || url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const faq = normalizeFaq(post.faq);
  const article = articleJsonLd(post);
  const faqLd = faqJsonLd(faq);
  const date = post.publishedAt ?? post.updatedAt;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      {/* Structured data for search + answer engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <Link
        href="/blog"
        className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Writing
      </Link>

      <FadeIn className="mt-10"><article>
        {post.coverImage && (
          <figure className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-lg border border-border object-cover"
            />
            {post.coverCredit && (
              <figcaption className="mt-2 text-xs text-muted-foreground">
                Photo by{" "}
                {post.coverCreditUrl ? (
                  <a
                    href={post.coverCreditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {post.coverCredit}
                  </a>
                ) : (
                  post.coverCredit
                )}{" "}
                /{" "}
                <a
                  href="https://www.pexels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Pexels
                </a>
              </figcaption>
            )}
          </figure>
        )}

        <time
          dateTime={date.toISOString()}
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          {formatDate(date.toISOString())}
        </time>
        <h1 className="mt-4 text-4xl font-thin tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {post.tags.map((tag) => (
              <span key={tag} className="border border-border px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.tldr && (
          <aside className="mt-10 border-l border-foreground bg-muted/40 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              TL;DR
            </p>
            <p className="mt-2 font-light leading-relaxed text-foreground">
              {post.tldr}
            </p>
          </aside>
        )}

        <div className="mt-8">
          <PostBody content={post.content} />
        </div>

        {faq.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="text-2xl font-thin tracking-tight text-foreground">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-6">
              {faq.map((item, i) => (
                <div key={i}>
                  <dt className="font-medium text-foreground">{item.question}</dt>
                  <dd className="mt-1 font-light leading-relaxed text-muted-foreground">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <NewsletterCTA />
      </article>
      </FadeIn>
    </main>
  );
}
