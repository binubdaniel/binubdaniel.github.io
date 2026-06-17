import { resend, RESEND_AUDIENCE_ID, RESEND_FROM } from "@/lib/resend";
import { SITE_URL, SITE_NAME } from "@/lib/site";

// Minimal HTML escaping for admin-authored strings dropped into email markup.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const emailWrap = (inner: string) =>
  `<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:8px;color:#111;line-height:1.6;">${inner}</div>`;

/**
 * Best-effort welcome email sent right after a brand-new subscribe. Never
 * throws: a failed send must not break the subscribe response. Requires a
 * verified sending domain in RESEND_FROM to actually deliver (the sandbox
 * sender onboarding@resend.dev only delivers to the account owner).
 */
export async function sendWelcomeEmail(email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: `You're subscribed to ${SITE_NAME}`,
      text:
        `You're in.\n\n` +
        `Thanks for subscribing. I'll send the occasional essay or note on AI ` +
        `product strategy, LLM engineering, and building agentic systems that ` +
        `survive production. No spam, and you can leave anytime.\n\n` +
        `Browse the latest: ${SITE_URL}/blog\n\n` +
        `- Binu`,
      html: emailWrap(
        `<h1 style="font-size:20px;font-weight:600;margin:0 0 16px;">You're in.</h1>` +
          `<p style="margin:0 0 16px;">Thanks for subscribing. I'll send the occasional essay or note on AI product strategy, LLM engineering, and building agentic systems that survive production. No spam, and you can leave anytime.</p>` +
          `<p style="margin:0 0 24px;"><a href="${SITE_URL}/blog" style="color:#111;font-weight:600;">Browse the latest &rarr;</a></p>` +
          `<p style="margin:0;color:#666;font-size:14px;">&mdash; Binu Babu</p>`,
      ),
    });
  } catch (err) {
    console.error("[newsletter] welcome email failed", err);
  }
}

type BroadcastPost = {
  title: string;
  slug: string;
  excerpt: string | null;
};

/**
 * Best-effort: create a DRAFT broadcast in Resend for a newly published post.
 * Does NOT send it; you review and send from the Resend dashboard. Never
 * throws, so publishing a post can never fail because of email.
 */
export async function createPostBroadcastDraft(
  post: BroadcastPost,
): Promise<void> {
  if (!process.env.RESEND_API_KEY || !RESEND_AUDIENCE_ID) return;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = escapeHtml(post.title);
  const excerpt = post.excerpt ? escapeHtml(post.excerpt) : "";
  try {
    await resend.broadcasts.create({
      audienceId: RESEND_AUDIENCE_ID,
      from: RESEND_FROM,
      name: `New post: ${post.title}`,
      subject: post.title,
      text:
        `New essay: ${post.title}\n\n` +
        (post.excerpt ? `${post.excerpt}\n\n` : "") +
        `Read it: ${url}\n\n` +
        `You're receiving this because you subscribed at binubabu.in.\n` +
        `Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
      html: emailWrap(
        `<p style="text-transform:uppercase;letter-spacing:1px;font-size:12px;color:#666;margin:0 0 8px;">New essay</p>` +
          `<h1 style="font-size:22px;font-weight:600;margin:0 0 12px;">${title}</h1>` +
          (excerpt
            ? `<p style="margin:0 0 24px;color:#333;">${excerpt}</p>`
            : "") +
          `<p style="margin:0 0 32px;"><a href="${url}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 22px;font-weight:600;">Read it &rarr;</a></p>` +
          `<p style="margin:0;color:#999;font-size:12px;">You're receiving this because you subscribed at binubabu.in. <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#999;">Unsubscribe</a>.</p>`,
      ),
    });
  } catch (err) {
    console.error("[newsletter] broadcast draft failed", err);
  }
}
