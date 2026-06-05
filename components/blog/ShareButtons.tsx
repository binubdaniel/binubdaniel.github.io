"use client";

import { useEffect, useState } from "react";
import { Linkedin, Twitter, Link2, Check, Share2 } from "lucide-react";

const BTN =
  "inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground";

export function ShareButtons({
  url,
  title,
  label = false,
}: {
  url: string;
  title: string;
  label?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, ignore
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled or unsupported, ignore
    }
  }

  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="mr-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Share
        </span>
      )}
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={BTN}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={BTN}
      >
        <Twitter className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={BTN}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      {canShare && (
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Share"
          className={`${BTN} sm:hidden`}
        >
          <Share2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
