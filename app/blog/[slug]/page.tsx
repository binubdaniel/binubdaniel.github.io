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
    <main className="mx-auto max-w-3xl px-4 py-12">
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
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Blog
      </Link>

      <article className="mt-6">
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

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <time dateTime={date.toISOString()}>{formatDate(date.toISOString())}</time>
          {post.tags.length > 0 && (
            <span className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="border border-border px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </span>
          )}
        </div>

        {post.tldr && (
          <aside className="mt-8 border-l-2 border-foreground bg-muted/50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              TL;DR
            </p>
            <p className="mt-1 text-foreground">{post.tldr}</p>
          </aside>
        )}

        <div className="mt-8">
          <PostBody content={post.content} />
        </div>

        {faq.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-xl font-semibold text-foreground">
              Frequently asked questions
            </h2>
            <dl className="mt-4 space-y-6">
              {faq.map((item, i) => (
                <div key={i}>
                  <dt className="font-medium text-foreground">{item.question}</dt>
                  <dd className="mt-1 text-muted-foreground">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </article>
    </main>
  );
}
