import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Plus, FileText } from "lucide-react";

// Always render fresh — post list changes as the admin works.
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Defense-in-depth: middleware already gates /admin, but re-check on the server
  // since Prisma bypasses RLS and this page reads/writes real data.
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as {user.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/admin/new">
              <Plus className="mr-2 h-4 w-4" />
              New post
            </Link>
          </Button>
          <form action="/admin/logout" method="post">
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-border py-16 text-center">
          <FileText className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No posts yet. Create your first one.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border border border-border">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/admin/${post.id}/edit`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {post.title || "(untitled)"}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    /{post.slug}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span
                    className={
                      post.status === "PUBLISHED"
                        ? "text-xs font-medium text-foreground"
                        : "text-xs font-medium text-muted-foreground"
                    }
                  >
                    {post.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    {formatDate(
                      (post.publishedAt ?? post.updatedAt).toISOString(),
                    )}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
