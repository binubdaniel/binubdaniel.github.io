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
