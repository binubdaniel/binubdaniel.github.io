import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

// Canonical site-wide top nav. Used on every marketing page (home, blog,
// playbook). Essays & Notes is highlighted because it is the freshest, most
// frequently updated surface; the booking CTA lives in the hero and footers.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-light tracking-tight text-foreground transition-colors hover:text-muted-foreground"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon-96x96.png" alt="" aria-hidden className="h-7 w-7" />
          Binu Babu
        </Link>
        <nav className="flex items-center gap-5 text-sm font-light text-muted-foreground sm:gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center whitespace-nowrap border border-border px-3 py-1.5 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Essays &amp; Notes
          </Link>
          <Link
            href="/product-playbook"
            className="hidden transition-colors hover:text-foreground sm:inline"
          >
            Playbook
          </Link>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
