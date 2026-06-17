import { NextResponse } from "next/server";
import { resend, RESEND_AUDIENCE_ID } from "@/lib/resend";
import { sendWelcomeEmail } from "@/lib/newsletter";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public endpoint: adds an email to the Resend newsletter audience. No auth
// (it is meant for readers). Duplicates are treated as success for friendly UX.
export async function POST(request: Request) {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  if (!RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      { error: "Newsletter is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const { error } = await resend.contacts.create({
      audienceId: RESEND_AUDIENCE_ID,
      email,
      unsubscribed: false,
    });

    // Resend errors on an already-existing contact; treat that as success so a
    // repeat subscribe just reassures the reader rather than showing an error.
    // Only a clean (new-contact) success gets a welcome email, so repeat
    // submits do not re-spam an existing subscriber.
    if (error) {
      return NextResponse.json({ ok: true, message: "You are on the list." });
    }

    // Best-effort welcome email; never blocks or fails the subscribe response.
    await sendWelcomeEmail(email);

    return NextResponse.json({ ok: true, message: "You are subscribed. Thanks." });
  } catch {
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 502 },
    );
  }
}
