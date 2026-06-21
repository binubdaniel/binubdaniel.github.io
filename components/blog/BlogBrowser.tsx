"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/utils";

export type BlogListPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  tags: string[];
  coverImage: string | null;
  date: string; // ISO string, precomputed on the server
};

const PER_PAGE = 6;
// Only the most-used tags show by default; the rest sit behind a "+N more".
const TOP_TAGS = 8;

// Client-side browse experience for the blog index: instant search over
// title/excerpt/tags, tag chips, and pagination. The full first page is still
// server-rendered (this component SSRs its initial state) so /blog stays
// crawlable.
export function BlogBrowser({ posts }: { posts: BlogListPost[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showAllTags, setShowAllTags] = useState(false);

  // Unique tags, most frequent first then alphabetical.
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) {
      for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [posts]);

  // Default to the most-used tags; keep an active-but-hidden tag visible so the
  // current filter never disappears when the list is collapsed.
  const visibleTags = useMemo(() => {
    if (showAllTags) return tags;
    const top = tags.slice(0, TOP_TAGS);
    if (activeTag && !top.includes(activeTag)) top.push(activeTag);
    return top;
  }, [tags, showAllTags, activeTag]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (!q) return true;
      const haystack = `${p.title} ${p.excerpt ?? ""} ${p.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeTag]);

  // Any change to the filter set sends us back to the first page.
  useEffect(() => {
    setPage(1);
  }, [query, activeTag]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const pagePosts = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search essays & notes"
          aria-label="Search essays and notes"
          className="w-full border border-border bg-transparent py-2.5 pl-10 pr-3 text-sm font-light text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
        />
      </div>

      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <TagChip
            label="All"
            active={!activeTag}
            onClick={() => setActiveTag(null)}
          />
          {visibleTags.map((t) => (
            <TagChip
              key={t}
              label={t}
              active={activeTag === t}
              onClick={() => setActiveTag(activeTag === t ? null : t)}
            />
          ))}
          {tags.length > TOP_TAGS && (
            <button
              type="button"
              onClick={() => setShowAllTags((v) => !v)}
              className="border border-dashed border-border px-3 py-1 text-xs font-light text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {showAllTags ? "Show less" : `+${tags.length - TOP_TAGS} more`}
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="font-light text-muted-foreground">
          No posts match your search.
        </p>
      ) : (
        <ul className="border-t border-border">
          {pagePosts.map((post) => (
            <li key={post.id} className="border-b border-border">
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
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
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
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="border border-border px-4 py-2 text-sm font-light text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border"
          >
            Previous
          </button>
          <span className="text-sm font-light text-muted-foreground">
            Page {current} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={current === pageCount}
            className="border border-border px-4 py-2 text-sm font-light text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "border px-3 py-1 text-xs font-light transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
