import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeIn } from "@/components/ui/fade-in";

const roles = [
  {
    role: "AI Product Manager",
    company: "Techjays",
    period: "Jul 2025 to Present",
  },
  {
    role: "Technical Lead, AI Integration",
    company: "Bridge Global",
    period: "Sep 2024 to Jul 2025",
  },
  {
    role: "Founder and CEO",
    company: "Socife Technologies",
    period: "2019 to 2024",
  },
  {
    role: "Co-Founder",
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
            These days I lead AI product at Techjays, building multi-agent
            systems that run real enterprise workflows. The hard part is almost
            never the model. It is making agents reliable enough that a business
            can hand them work and trust the result.
          </p>
          <p>
            Before that I was technical lead for AI integration at Bridge
            Global, where I spent a year turning experimental RAG and LLM
            pipelines into systems that held up in production. One rebuild cut
            hallucinations by about 45 percent; another brought inference
            latency down by roughly 60 percent. I also helped a group of
            engineers make the jump from full stack to AI native work, which
            taught me as much as the systems did.
          </p>
          <p>
            I come at product from the founder side too. I started Socife
            Technologies and ran it for about five years, wearing every hat a
            founder wears: setting the strategy, running day to day operations,
            hiring and building the team, and owning the numbers, not just the
            code. I took products from a rough MVP to something people actually
            paid for, and learned that a sustainable business is its own kind of
            engineering, with its own failure modes.
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
            the messy middle between a promising idea and a product people depend
            on.
          </p>
        </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-1">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Roles
            </p>
            <ul className="space-y-6">
              {roles.map((r) => (
                <li key={r.company} className="border-l border-border pl-4">
                  <p className="font-light text-foreground">{r.role}</p>
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
