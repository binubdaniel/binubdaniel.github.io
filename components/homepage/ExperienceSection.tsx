import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeIn } from "@/components/ui/fade-in";

const roles = [
  {
    titles: ["AI Product Lead", "AI Product Manager"],
    company: "Techjays",
    period: "Jul 2025 to Present",
  },
  {
    titles: ["Technical Lead, AI Integration"],
    company: "Bridge Global",
    period: "Sep 2024 to Jul 2025",
  },
  {
    titles: ["Founder and CEO"],
    company: "Socife Technologies",
    period: "2019 to 2024",
  },
  {
    titles: ["Co-Founder"],
    company: "College-Shore",
    period: "2016 to 2018",
  },
];

const ExperienceSection = () => {
  return (
    <section className="relative bg-background py-32">
      {/* Minimal background */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn>
          <Eyebrow>Experience</Eyebrow>
          <h2 className="mt-6 text-5xl font-thin tracking-tight text-foreground md:text-6xl">
            How I got here
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-12 md:grid-cols-3">
          <FadeIn
            delay={0.05}
            className="space-y-6 text-lg font-light leading-relaxed text-muted-foreground md:col-span-2"
          >
          <p>
            These days I lead AI product at Techjays, where I own two flagship
            platforms, an AI Operations Intelligence Platform and a Context Layer
            for Enterprise, and hold portfolio-level review authority over the
            firm&apos;s AI work: three projects across five delivery teams. I fund
            what maps to a quantified financial outcome and cut what does not,
            using Value Causation Trees that tie every proposed intervention to
            the P&amp;L before it earns headcount. I grew the AI product function
            from four people to eighteen and was promoted to Lead within eleven
            months. The hard part is almost never the model. It is deciding what a
            business can safely hand to agents, and designing the system so it
            earns that trust.
          </p>
          <p>
            Before that I built the AI capability from zero at Bridge Global,
            owning architecture, vendor selection, and production delivery across
            three client engagements. I ran discovery with the actual end users
            instead of stakeholder proxies, which cut six weeks of scope before
            anyone wrote code, and set the data-quality, evaluation, and prompt
            standards the team kept using. The reliability work underneath,
            cutting hallucinations and latency by roughly half, was always in
            service of one thing: systems a client would trust in production.
          </p>
          <p>
            I come at product from the founder side too. I started Socife
            Technologies and ran it for six years, owning the strategy, the P&amp;L,
            hiring, fundraising, and the investor relationships, not just the
            code. I took it from zero to ten thousand users, made the hard call to
            pivot when the first model stalled, and learned that a sustainable
            business is its own kind of engineering, with its own failure modes.
          </p>
          <p>
            Before that I co-founded College-Shore, an education platform
            connecting students with academic resources. That is where I cut my
            teeth on the less glamorous parts of building a company: finding a
            business model that actually holds up, landing partnerships with
            institutions, and earning the first users one conversation at a
            time. Most of what I know about go to market and growth started
            there, in the gap between a good idea and a paying customer.
          </p>
          <p className="text-foreground">
            The thread through all of it is the same. Strategy only matters once
            it survives contact with real customers, and the part I like best is
            the messy middle, deciding which work a business can safely hand over,
            and designing the system so it earns that trust one piece of evidence
            at a time.
          </p>
        </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-1">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Roles
            </p>
            <ul className="space-y-6">
              {roles.map((r) => (
                <li key={r.company} className="border-l border-border pl-4">
                  {r.titles.map((t) => (
                    <p key={t} className="font-light text-foreground">
                      {t}
                    </p>
                  ))}
                  <p className="text-sm font-light text-muted-foreground">
                    {r.company}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {r.period}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
