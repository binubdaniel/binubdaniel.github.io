import { NextResponse } from "next/server";
import { Prisma, PostStatus } from "@prisma/client";
import { getAdminUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/posts";
import { normalizeTags, normalizeFaq } from "@/lib/blog-format";

export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) {
    return NextResponse.json({ error: "A title is required." }, { status: 400 });
  }

  const status =
    body.status === "PUBLISHED" ? PostStatus.PUBLISHED : PostStatus.DRAFT;
  const slugInput =
    typeof body.slug === "string" && body.slug.trim() ? body.slug : title;

  const faq = normalizeFaq(body.faq);

  const post = await prisma.post.create({
    data: {
      title,
      slug: await uniqueSlug(slugInput),
      content: typeof body.content === "string" ? body.content : "",
      excerpt:
        typeof body.excerpt === "string" ? body.excerpt.trim() || null : null,
      coverImage:
        typeof body.coverImage === "string"
          ? body.coverImage.trim() || null
          : null,
      coverCredit:
        typeof body.coverCredit === "string"
          ? body.coverCredit.trim() || null
          : null,
      coverCreditUrl:
        typeof body.coverCreditUrl === "string"
          ? body.coverCreditUrl.trim() || null
          : null,
      tags: normalizeTags(body.tags),
      metaTitle:
        typeof body.metaTitle === "string" ? body.metaTitle.trim() || null : null,
      metaDescription:
        typeof body.metaDescription === "string"
          ? body.metaDescription.trim() || null
          : null,
      canonicalUrl:
        typeof body.canonicalUrl === "string"
          ? body.canonicalUrl.trim() || null
          : null,
      tldr: typeof body.tldr === "string" ? body.tldr.trim() || null : null,
      faq: faq.length ? (faq as unknown as Prisma.InputJsonValue) : undefined,
      status,
      publishedAt: status === PostStatus.PUBLISHED ? new Date() : null,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}
