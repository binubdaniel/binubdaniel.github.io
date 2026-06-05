import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/server";
import { runBlogEdit } from "@/lib/ai";

export async function POST(request: Request) {
  // Middleware only matches /admin/*, not /api/* — gate here explicitly.
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { markdown?: unknown; instruction?: unknown; title?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const instruction =
    typeof body.instruction === "string" ? body.instruction.trim() : "";
  if (!instruction) {
    return NextResponse.json(
      { error: "An instruction is required." },
      { status: 400 },
    );
  }

  try {
    const content = await runBlogEdit({
      markdown: typeof body.markdown === "string" ? body.markdown : "",
      instruction,
      title: typeof body.title === "string" ? body.title : undefined,
    });
    return NextResponse.json({ content });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "AI request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
