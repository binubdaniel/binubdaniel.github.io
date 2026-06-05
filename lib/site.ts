// Canonical site origin (production serves the www host; apex 308s to it).
// Override via NEXT_PUBLIC_SITE_URL if the domain ever changes.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.binubabu.in"
).replace(/\/$/, "");

export const SITE_NAME = "Binu Babu";
export const AUTHOR_NAME = "Binu Babu";
