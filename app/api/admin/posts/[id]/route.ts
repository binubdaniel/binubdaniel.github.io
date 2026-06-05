import { NextResponse } from "next/server";
import { Prisma, PostStatus } from "@prisma/client";
import { getAdminUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/posts";
import { normalizeTags, normalizeFaq } from "@/lib/blog-format";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const data: Prisma.PostUpdateInput = {};

  if (typeof body.title === "string") {
    const title = body.title.trim();
    if (!title) {
      return NextResponse.json(
        { error: "Title cannot be empty." },
        { status: 400 },
      );
    }
    data.title = title;
  }
  if (typeof body.content === "string") data.content = body.content;
  if (typeof body.excerpt === "string") data.excerpt = body.excerpt.trim() || null;
  if (typeof body.coverImage === "string")
    data.coverImage = body.coverImage.trim() || null;
  if (typeof body.slug === "string" && body.slug.trim()) {
    data.slug = await uniqueSlug(body.slug, id);
  }
  if ("tags" in body) data.tags = normalizeTags(body.tags);
  if (typeof body.metaTitle === "string")
    data.metaTitle = body.metaTitle.trim() || null;
  if (typeof body.metaDescription === "string")
    data.metaDescription = body.metaDescription.trim() || null;
  if (typeof body.canonicalUrl === "string")
    data.canonicalUrl = body.canonicalUrl.trim() || null;
  if (typeof body.tldr === "string") data.tldr = body.tldr.trim() || null;
  if ("faq" in body) {
    const faq = normalizeFaq(body.faq);
    data.faq = faq.length
      ? (faq as unknown as Prisma.InputJsonValue)
      : Prisma.DbNull;
  }

  if (body.status === "PUBLISHED" || body.status === "DRAFT") {
    const status = body.status as PostStatus;
    data.status = status;
    // First publish stamps publishedAt; re-publishing keeps the original date.
    if (status === PostStatus.PUBLISHED && !existing.publishedAt) {
      data.publishedAt = new Date();
    }
  }

  const post = await prisma.post.update({ where: { id }, data });
  return NextResponse.json({ post });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.post.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
