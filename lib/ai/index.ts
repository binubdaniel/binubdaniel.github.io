import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

export type AIProvider = "openai" | "anthropic";

export interface BlogEditInput {
  // Current draft markdown (may be empty for a brand-new post).
  markdown: string;
  // What the user wants done ("turn these notes into a post", "tighten the intro", …).
  instruction: string;
  // Optional working title, given to the model as context only.
  title?: string;
}

function resolveProvider(): AIProvider {
  const raw = (process.env.AI_PROVIDER ?? "openai").toLowerCase();
  if (raw !== "openai" && raw !== "anthropic") {
    throw new Error(
      `Invalid AI_PROVIDER "${raw}" — expected "openai" or "anthropic".`,
    );
  }
  return raw;
}

// Stable instruction prefix — kept byte-identical across requests so the
// Anthropic prompt cache can reuse it. Volatile content (the draft, the
// instruction) goes in the user turn, never here.
const SYSTEM_PROMPT = [
  "You are an expert blog editor and ghostwriter helping a single author draft posts for their personal site.",
  "You receive the author's current draft (Markdown) and an instruction describing the change they want.",
  "Apply the instruction and return the COMPLETE revised post body as GitHub-flavored Markdown.",
  "Rules:",
  "- Return only the Markdown body. No preamble, no sign-off, no surrounding code fences, no commentary about what you changed.",
  "- Preserve the author's voice and any factual content unless the instruction says otherwise.",
  "- Use proper Markdown structure (headings, lists, links, code blocks) where it improves the post.",
  "- If the draft is empty, write a first draft from the instruction.",
].join("\n");

function buildUserPrompt({ markdown, instruction, title }: BlogEditInput): string {
  const parts: string[] = [];
  if (title?.trim()) parts.push(`Working title: ${title.trim()}`);
  parts.push("Current draft (Markdown):");
  parts.push("---");
  parts.push(markdown.trim() || "(the draft is currently empty)");
  parts.push("---");
  parts.push(`Instruction: ${instruction.trim()}`);
  return parts.join("\n");
}

async function runOpenAI(input: BlogEditInput): Promise<string> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL ?? "gpt-4o";

  // Stream and accumulate so a long rewrite doesn't hit an HTTP/function
  // timeout. 16384 is gpt-4o's output ceiling (~12k words).
  const stream = await client.chat.completions.create({
    model,
    max_tokens: 16384,
    stream: true,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(input) },
    ],
  });

  let text = "";
  for await (const chunk of stream) {
    text += chunk.choices[0]?.delta?.content ?? "";
  }

  text = text.trim();
  if (!text) throw new Error("OpenAI returned an empty response.");
  return text;
}

async function runAnthropic(input: BlogEditInput): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-7";

  // Stream with a high ceiling so long posts aren't truncated, and use
  // finalMessage() to avoid HTTP timeouts on large outputs (Opus supports
  // up to 128k output; 32k is ample for a blog and stays well within limits).
  const stream = client.messages.stream({
    model,
    max_tokens: 32000,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: buildUserPrompt(input) }],
  });

  const message = await stream.finalMessage();
  const text = message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();
  if (!text) throw new Error("Anthropic returned an empty response.");
  return text;
}

// Switchable entry point. Picks the provider from AI_PROVIDER at call time.
export async function runBlogEdit(input: BlogEditInput): Promise<string> {
  const provider = resolveProvider();
  return provider === "anthropic" ? runAnthropic(input) : runOpenAI(input);
}
