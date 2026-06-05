"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";

export interface PexelsImage {
  id: number;
  alt: string;
  photographer: string;
  photographerUrl: string;
  pexelsUrl: string;
  src: { landscape: string; large: string; medium: string; tiny: string };
}

export default function ImagePickerModal({
  open,
  onClose,
  onSelect,
  orientation = "landscape",
  title = "Search Pexels images",
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (img: PexelsImage) => void;
  orientation?: "landscape" | "portrait" | "square";
  title?: string;
}) {
  const [q, setQ] = useState("");
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function search(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/images/search?q=${encodeURIComponent(q)}&orientation=${orientation}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed.");
      setImages(data.images ?? []);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex max-h-[85vh] w-full max-w-3xl flex-col border border-border bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-medium">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={search} className="flex gap-2 border-b border-border p-4">
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search photos (e.g. neural network, abstract, city)"
          />
          <Button type="submit" disabled={loading || !q.trim()}>
            <Search className="mr-1.5 h-4 w-4" />
            {loading ? "Searching…" : "Search"}
          </Button>
        </form>

        <div className="min-h-[12rem] flex-1 overflow-y-auto p-4">
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          {!error && searched && images.length === 0 && !loading && (
            <p className="text-sm text-muted-foreground">No results — try another search.</p>
          )}
          {!error && !searched && (
            <p className="text-sm text-muted-foreground">
              Search to browse free stock photos from Pexels.
            </p>
          )}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => {
                    onSelect(img);
                    onClose();
                  }}
                  className="group relative overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  title={`Photo by ${img.photographer}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src.medium}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-opacity group-hover:opacity-80"
                  />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
                    {img.photographer}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
          Photos provided by{" "}
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Pexels
          </a>
        </div>
      </div>
    </div>
  );
}
