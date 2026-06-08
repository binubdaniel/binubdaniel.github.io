import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const BOOK_A_CALL_URL = "https://calendar.app.google/8aUmjsXDvFni8wF38";

// Canonical site-wide top nav. Used on every marketing page (home, blog,
// playbook) so the freshest content (Writing) is always one click away. The
// homepage hero used to carry its own chrome; that now lives here.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-light tracking-tight text-foreground transition-colors hover:text-muted-foreground"
        >
          Binu Babu
        </Link>
        <nav className="flex items-center gap-5 text-sm font-light text-muted-foreground sm:gap-6">
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Writing
          </Link>
          <Link
            href="/product-playbook"
            className="hidden transition-colors hover:text-foreground sm:inline"
          >
            Playbook
          </Link>
          <a
            href={BOOK_A_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-foreground transition-colors hover:border-foreground"
          >
            Book a call
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
