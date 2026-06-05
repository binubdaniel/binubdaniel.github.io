"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import ImagePickerModal, {
  type PexelsImage,
} from "@/components/admin/ImagePickerModal";
import { slugify } from "@/lib/utils";
import {
  ArrowLeft,
  Sparkles,
  Eye,
  Pencil,
  ClipboardPaste,
  Plus,
  X,
  Image as ImageIcon,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export interface EditablePost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  coverCredit: string | null;
  coverCreditUrl: string | null;
  tags: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  tldr: string | null;
  faq: FaqItem[];
  status: "DRAFT" | "PUBLISHED";
}

type Status = "DRAFT" | "PUBLISHED";

const textareaClass =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export default function PostEditor({ post }: { post?: EditablePost }) {
  const router = useRouter();

  const [id, setId] = useState<string | null>(post?.id ?? null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [content, setContent] = useState(post?.content ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [coverCredit, setCoverCredit] = useState(post?.coverCredit ?? "");
  const [coverCreditUrl, setCoverCreditUrl] = useState(
    post?.coverCreditUrl ?? "",
  );
  const [tagsInput, setTagsInput] = useState((post?.tags ?? []).join(", "));
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    post?.metaDescription ?? "",
  );
  const [canonicalUrl, setCanonicalUrl] = useState(post?.canonicalUrl ?? "");
  const [tldr, setTldr] = useState(post?.tldr ?? "");
  const [faq, setFaq] = useState<FaqItem[]>(post?.faq ?? []);
  const [status, setStatus] = useState<Status>(post?.status ?? "DRAFT");

  const [paste, setPaste] = useState("");
  const [pasteLoading, setPasteLoading] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<"write" | "preview">("write");
  const [error, setError] = useState<string | null>(null);
  const [coverPickerOpen, setCoverPickerOpen] = useState(false);
  const [bodyPickerOpen, setBodyPickerOpen] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Cover image: store Pexels' landscape size (good OG dimensions) + credit.
  function selectCover(img: PexelsImage) {
    setCoverImage(img.src.landscape);
    setCoverCredit(img.photographer);
    setCoverCreditUrl(img.photographerUrl);
  }

  // Inline image: insert Markdown at the cursor in the body textarea.
  function insertBodyImage(img: PexelsImage) {
    const md = `![${img.alt}](${img.src.large})`;
    const ta = contentRef.current;
    if (!ta) {
      setContent((c) => (c ? `${c}\n\n${md}\n` : `${md}\n`));
      return;
    }
    const start = ta.selectionStart ?? content.length;
    const end = ta.selectionEnd ?? content.length;
    setContent(content.slice(0, start) + md + content.slice(end));
  }

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function tagsArray(): string[] {
    return tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  // --- Paste from Claude: parse frontmatter doc and fill every field ---
  async function fillFromPaste() {
    if (!paste.trim()) return;
    setPasteLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw: paste }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not parse.");
      if (!data.hasFrontmatter) {
        setError(
          "No frontmatter found — pasted text was treated as body only. Make sure the skill output includes the --- metadata block.",
        );
      }
      const p = data.post as EditablePost & { content: string };
      if (p.title) onTitleChange(p.title);
      if (p.slug) {
        setSlug(slugify(p.slug));
        setSlugTouched(true);
      }
      if (p.content) setContent(p.content);
      setExcerpt(p.excerpt ?? "");
      setCoverImage(p.coverImage ?? "");
      setTagsInput((p.tags ?? []).join(", "));
      setMetaTitle(p.metaTitle ?? "");
      setMetaDescription(p.metaDescription ?? "");
      setCanonicalUrl(p.canonicalUrl ?? "");
      setTldr(p.tldr ?? "");
      setFaq(Array.isArray(p.faq) ? p.faq : []);
      setPaste("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not parse.");
    } finally {
      setPasteLoading(false);
    }
  }

  async function runAI() {
    if (!instruction.trim()) return;
    setAiLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown: content, instruction, title }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "AI request failed.");
      setContent(data.content);
      setInstruction("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI request failed.");
    } finally {
      setAiLoading(false);
    }
  }

  async function save(nextStatus: Status) {
    if (!title.trim()) {
      setError("A title is required before saving.");
      return;
    }
    setSaving(true);
    setError(null);
    const payload = {
      title,
      slug: slug || slugify(title),
      content,
      excerpt,
      coverImage,
      coverCredit,
      coverCreditUrl,
      tags: tagsArray(),
      metaTitle,
      metaDescription,
      canonicalUrl,
      tldr,
      faq: faq.filter((f) => f.question.trim() && f.answer.trim()),
      status: nextStatus,
    };
    try {
      const res = await fetch(
        id ? `/api/admin/posts/${id}` : "/api/admin/posts",
        {
          method: id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed.");
      const saved = data.post as EditablePost;
      setStatus(saved.status);
      setSlug(saved.slug);
      if (!id) {
        setId(saved.id);
        router.replace(`/admin/${saved.id}/edit`);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const published = status === "PUBLISHED";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Posts
        </Link>
        <span
          className={
            published
              ? "text-xs font-medium text-foreground"
              : "text-xs font-medium text-muted-foreground"
          }
        >
          {published ? "Published" : "Draft"}
        </span>
      </div>

      {/* Paste from Claude */}
      <div className="mb-8 space-y-2 border border-border p-4">
        <label htmlFor="paste" className="flex items-center text-sm font-medium">
          <ClipboardPaste className="mr-1.5 h-4 w-4" />
          Paste from Claude
        </label>
        <textarea
          id="paste"
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          rows={4}
          placeholder="Paste the skill's output here (frontmatter + Markdown). It fills every field below."
          className={`${textareaClass} font-mono`}
          disabled={pasteLoading}
        />
        <Button onClick={fillFromPaste} disabled={pasteLoading || !paste.trim()}>
          {pasteLoading ? "Parsing…" : "Fill fields"}
        </Button>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Post title"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              placeholder="post-slug"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="cover" className="text-sm font-medium">
              Cover image URL
            </label>
            <div className="flex gap-2">
              <Input
                id="cover"
                value={coverImage}
                onChange={(e) => {
                  // A hand-typed URL isn't the Pexels pick — drop its credit.
                  setCoverImage(e.target.value);
                  setCoverCredit("");
                  setCoverCreditUrl("");
                }}
                placeholder="https://…"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setCoverPickerOpen(true)}
              >
                <ImageIcon className="mr-1.5 h-4 w-4" />
                Pexels
              </Button>
            </div>
            {coverImage && (
              <div className="mt-2 max-w-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="aspect-video w-full rounded-md border border-border object-cover"
                />
                {coverCredit && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Photo by {coverCredit} / Pexels
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="text-sm font-medium">
            Tags
          </label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="comma, separated, tags"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-sm font-medium">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Short summary shown in the blog index and newsletter."
            className={textareaClass}
          />
        </div>

        {/* AI assist */}
        <div className="space-y-2 border border-border p-4">
          <label
            htmlFor="instruction"
            className="flex items-center text-sm font-medium"
          >
            <Sparkles className="mr-1.5 h-4 w-4" />
            AI assist
          </label>
          <div className="flex gap-2">
            <Input
              id="instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  runAI();
                }
              }}
              placeholder='e.g. "Tighten the intro" or "Add a conclusion"'
              disabled={aiLoading}
            />
            <Button onClick={runAI} disabled={aiLoading || !instruction.trim()}>
              {aiLoading ? "Thinking…" : "Apply"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Rewrites the body below. Provider is set by AI_PROVIDER.
          </p>
        </div>

        {/* Body */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Body (Markdown)</label>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setBodyPickerOpen(true)}
              >
                <ImageIcon className="mr-1.5 h-3.5 w-3.5" />
                Image
              </Button>
              <Button
                type="button"
                variant={view === "write" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("write")}
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" />
                Write
              </Button>
              <Button
                type="button"
                variant={view === "preview" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("preview")}
              >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Preview
              </Button>
            </div>
          </div>
          {view === "write" ? (
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
              placeholder="Write in Markdown, paste from Claude, or use AI assist."
              className={`${textareaClass} font-mono`}
            />
          ) : (
            <div className="min-h-[20rem] rounded-md border border-input px-4 py-3">
              {content.trim() ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nothing to preview yet.
                </p>
              )}
            </div>
          )}
        </div>

        {/* SEO / AEO / AI optimization */}
        <details className="border border-border" open>
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
            SEO &amp; AI optimization
          </summary>
          <div className="space-y-5 border-t border-border p-4">
            <div className="space-y-2">
              <label htmlFor="metaTitle" className="text-sm font-medium">
                Meta title{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  ({metaTitle.length}/60)
                </span>
              </label>
              <Input
                id="metaTitle"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO title (defaults to the post title)"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="metaDescription" className="text-sm font-medium">
                Meta description{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  ({metaDescription.length}/160)
                </span>
              </label>
              <textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={2}
                placeholder="150–160 chars, includes the primary keyword."
                className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="canonical" className="text-sm font-medium">
                Canonical URL
              </label>
              <Input
                id="canonical"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://… (only if cross-posted)"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tldr" className="text-sm font-medium">
                TL;DR / direct answer
              </label>
              <textarea
                id="tldr"
                value={tldr}
                onChange={(e) => setTldr(e.target.value)}
                rows={3}
                placeholder="2–3 sentence answer up front — what answer engines and AI lift."
                className={textareaClass}
              />
            </div>

            {/* FAQ editor → FAQPage structured data */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">FAQ</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFaq([...faq, { question: "", answer: "" }])}
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Q&amp;A
                </Button>
              </div>
              {faq.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Add 3–5 real questions readers ask. These become FAQ structured
                  data (strong answer-engine signal).
                </p>
              )}
              {faq.map((item, i) => (
                <div key={i} className="space-y-2 border border-border p-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={item.question}
                      onChange={(e) => {
                        const next = [...faq];
                        next[i] = { ...next[i], question: e.target.value };
                        setFaq(next);
                      }}
                      placeholder="Question"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setFaq(faq.filter((_, j) => j !== i))}
                      aria-label="Remove Q&A"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <textarea
                    value={item.answer}
                    onChange={(e) => {
                      const next = [...faq];
                      next[i] = { ...next[i], answer: e.target.value };
                      setFaq(next);
                    }}
                    rows={2}
                    placeholder="Answer"
                    className={textareaClass}
                  />
                </div>
              ))}
            </div>
          </div>
        </details>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
          <Button onClick={() => save("DRAFT")} variant="outline" disabled={saving}>
            Save draft
          </Button>
          {published ? (
            <>
              <Button
                onClick={() => save("DRAFT")}
                variant="outline"
                disabled={saving}
              >
                Unpublish
              </Button>
              <Button onClick={() => save("PUBLISHED")} disabled={saving}>
                Update published
              </Button>
            </>
          ) : (
            <Button onClick={() => save("PUBLISHED")} disabled={saving}>
              Publish
            </Button>
          )}
          {saving && (
            <span className="text-sm text-muted-foreground">Saving…</span>
          )}
        </div>
      </div>

      <ImagePickerModal
        open={coverPickerOpen}
        onClose={() => setCoverPickerOpen(false)}
        onSelect={selectCover}
        orientation="landscape"
        title="Choose a cover image"
      />
      <ImagePickerModal
        open={bodyPickerOpen}
        onClose={() => setBodyPickerOpen(false)}
        onSelect={insertBodyImage}
        orientation="landscape"
        title="Insert an image"
      />
    </main>
  );
}
