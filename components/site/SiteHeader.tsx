import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

// Shared top bar for content pages (blog, etc.) so there is always a clear way
// back home and across sections. The homepage hero has its own chrome.
export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-lg font-light tracking-tight text-foreground transition-colors hover:text-muted-foreground"
        >
          Binu Babu
        </Link>
        <nav className="flex items-center gap-6 text-sm font-light text-muted-foreground">
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
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
