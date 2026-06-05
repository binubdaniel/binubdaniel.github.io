import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client (used in Client Components, e.g. the login form).
// Uses the public anon key — safe to ship to the browser.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
