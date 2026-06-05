import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/server";

// Admin-gated proxy to the Pexels photo search API. Keeps the Pexels key
// server-side — the browser only ever talks to this route.
export async function GET(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.PEXELS_API_KEY ?? process.env.PEXELS;
  if (!key) {
    return NextResponse.json(
      { error: "Pexels API key not configured (set PEXELS)." },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (!q) return NextResponse.json({ images: [] });

  const orientation = searchParams.get("orientation") ?? "landscape";
  const pexels = new URL("https://api.pexels.com/v1/search");
  pexels.searchParams.set("query", q);
  pexels.searchParams.set("per_page", "24");
  if (["landscape", "portrait", "square"].includes(orientation)) {
    pexels.searchParams.set("orientation", orientation);
  }

  try {
    const res = await fetch(pexels, { headers: { Authorization: key } });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Pexels request failed (${res.status}).` },
        { status: 502 },
      );
    }
    const data = await res.json();
    const images = (data.photos ?? []).map(
      (p: {
        id: number;
        alt: string;
        photographer: string;
        photographer_url: string;
        url: string;
        src: Record<string, string>;
      }) => ({
        id: p.id,
        alt: p.alt || q,
        photographer: p.photographer,
        photographerUrl: p.photographer_url,
        pexelsUrl: p.url,
        src: {
          landscape: p.src.landscape,
          large: p.src.large,
          medium: p.src.medium,
          tiny: p.src.tiny,
        },
      }),
    );
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Pexels." },
      { status: 502 },
    );
  }
}
