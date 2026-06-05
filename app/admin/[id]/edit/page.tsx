import { redirect, notFound } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { normalizeFaq } from "@/lib/blog-format";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <PostEditor
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        tags: post.tags,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        canonicalUrl: post.canonicalUrl,
        tldr: post.tldr,
        faq: normalizeFaq(post.faq),
        status: post.status,
      }}
    />
  );
}
