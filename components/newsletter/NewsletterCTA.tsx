"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "done" | "error";

interface NewsletterCTAProps {
  /** Heading copy. Defaults to the blog "new posts" framing. */
  title?: string;
  /** Supporting line under the heading. */
  description?: string;
  /** Submit button label. */
  buttonLabel?: string;
}

export function NewsletterCTA({
  title = "Get new posts by email",
  description = "No spam. Just the occasional note when I publish something worth your time.",
  buttonLabel = "Subscribe",
}: NewsletterCTAProps = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("done");
      setMessage(data.message ?? "You are subscribed. Thanks.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="text-2xl font-thin tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-2 max-w-xl font-light leading-relaxed text-muted-foreground">
        {description}
      </p>

      {status === "done" ? (
        <p className="mt-6 font-light text-foreground">{message}</p>
      ) : (
        <form onSubmit={submit} className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={status === "loading"}
            aria-label="Email address"
          />
          <Button type="submit" disabled={status === "loading" || !email.trim()}>
            {status === "loading" ? "Subscribing…" : buttonLabel}
          </Button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{message}</p>
      )}
    </section>
  );
}
