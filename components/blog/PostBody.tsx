import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders the post's Markdown body. No rehype-raw, so embedded HTML is ignored
// (safe by default). Typography comes from @tailwindcss/typography `prose`.
export default function PostBody({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-foreground prose-pre:bg-muted">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
