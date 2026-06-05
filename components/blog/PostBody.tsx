import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders the post's Markdown body. No rehype-raw, so embedded HTML is ignored
// (safe by default). Typography comes from @tailwindcss/typography `prose`.
export default function PostBody({ content }: { content: string }) {
  return (
    <div
      className={[
        "prose prose-neutral max-w-none dark:prose-invert",
        // Headings: medium weight for scannability in a reading column
        // (a deliberate step down from the homepage's display `font-thin`).
        "prose-headings:font-medium prose-headings:tracking-tight",
        "prose-h2:text-2xl prose-h3:text-xl",
        // Body, links, code, images tuned to the monochrome system.
        "prose-p:font-light prose-li:font-light prose-p:leading-relaxed",
        "prose-a:text-foreground prose-a:underline prose-a:underline-offset-2",
        "prose-pre:rounded-none prose-pre:border prose-pre:border-border prose-pre:bg-muted",
        "prose-img:rounded-lg prose-img:border prose-img:border-border",
        "prose-blockquote:border-l-foreground prose-blockquote:font-light prose-blockquote:not-italic",
      ].join(" ")}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
