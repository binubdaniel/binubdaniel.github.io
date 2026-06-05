import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// Returns a slug unique across posts, appending -2, -3, … on collision.
export async function uniqueSlug(
  base: string,
  excludeId?: string,
): Promise<string> {
  const root = slugify(base) || "post";
  let candidate = root;
  let n = 1;
  for (;;) {
    const existing = await prisma.post.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return candidate;
    n += 1;
    candidate = `${root}-${n}`;
  }
}

// Picks posts to show as "Read next": prefers ones sharing tags with the
// current post, and falls back to most-recent. Always excludes the current
// post. Behaves like "recent" until there are enough tagged posts to relate.
export async function getRelatedPosts(
  currentId: string,
  tags: string[],
  take = 3,
) {
  const pool = await prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED, id: { not: currentId } },
    orderBy: { publishedAt: "desc" },
    take: 12,
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

  return pool
    .map((p) => ({
      post: p,
      overlap: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.overlap - a.overlap ||
        (b.post.publishedAt?.getTime() ?? 0) -
          (a.post.publishedAt?.getTime() ?? 0),
    )
    .slice(0, take)
    .map((x) => x.post);
}
