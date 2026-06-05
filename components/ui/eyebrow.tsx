import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared section label motif: an uppercase, wide-tracked eyebrow over a short
// hairline rule. Used across the homepage sections and the blog for a single
// visual vocabulary.
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {children}
      </span>
      <div className={cn("mt-3 h-px w-12 bg-foreground")} />
    </div>
  );
}
