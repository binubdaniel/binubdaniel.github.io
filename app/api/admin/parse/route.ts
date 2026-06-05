import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/server";
import { parseBlogDocument } from "@/lib/blog-format";

// Parses a pasted blog document (YAML frontmatter + Markdown) into editor
// fields. Runs server-side so gray-matter / YAML stays out of the client bundle.
export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { raw?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const raw = typeof body.raw === "string" ? body.raw : "";
  if (!raw.trim()) {
    return NextResponse.json({ error: "Nothing to parse." }, { status: 400 });
  }

  try {
    const result = parseBlogDocument(raw);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Could not parse the document. Check the frontmatter syntax." },
      { status: 422 },
    );
  }
}
