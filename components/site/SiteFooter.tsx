import Link from "next/link";

// Shared footer for content pages: home link, section nav, and a quiet credit.
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="font-light text-foreground transition-colors hover:text-muted-foreground"
            >
              Binu Babu
            </Link>
            <p className="text-sm font-light text-muted-foreground">
              AI Product Consultant
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm font-light text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/blog" className="transition-colors hover:text-foreground">
              Writing
            </Link>
            <Link
              href="/product-playbook"
              className="transition-colors hover:text-foreground"
            >
              Playbook
            </Link>
            <a
              href="https://linkedin.com/in/binubdaniel"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          </nav>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs font-light text-muted-foreground">
          © {year} Binu Babu.
        </p>
      </div>
    </footer>
  );
}
