"use client";

import React from "react";
import { Shield, TrendingUp, Zap, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

interface InsightCardProps {
  title: string;
  take: string;
  icon: React.ComponentType<{ className?: string }>;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  take,
  icon: Icon,
}) => (
  <motion.div
    variants={itemVariants}
    className="group border border-border p-8 transition-all duration-300 hover:border-foreground"
    whileHover={{ y: -2 }}
  >
    {/* Grid: on mobile, icon + heading share the top row and the body runs the
        full card width below; on md+, the icon sits left of a stacked
        heading/body column. */}
    <div className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 md:gap-x-6">
      <motion.div
        className="bg-muted p-3 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <h3 className="self-center text-lg font-light text-foreground md:self-start">
        {title}
      </h3>
      <p className="col-span-2 text-sm font-light leading-relaxed text-muted-foreground md:col-span-1 md:col-start-2">
        {take}
      </p>
    </div>
  </motion.div>
);

const AIStrategyInsights = () => {
  const opinions = [
    {
      icon: Target,
      title: "Autonomy follows reversibility",
      take: "Match how much an agent can do to how reversible the decision is. Behind two-way doors, agents move fast and report. At one-way doors, closing an account, filing with a network, a person stays in the loop. The delegation test is simple: hand over the work only where the expected loss is lower than the value released. The right autonomy level is a design decision per decision, not a model setting.",
    },
    {
      icon: TrendingUp,
      title: "Deciding is the premium; building is the commodity",
      take: "When every team can call the same models and ship in a weekend, building stops being the moat. What compounds is judgment built into data, workflows and trust: knowing which operation to hand over, where work actually waits, and what a customer would never forgive. Everyone gets the same models. Not everyone gets the same judgment.",
    },
    {
      icon: Zap,
      title: "Trust is earned with evidence, not configured",
      take: "Evals, logs, visible reasoning and undo are product features, not compliance add-ons. Autonomy isn't a toggle you flip; it's earned stage by stage, shadow, assist, limited release, scaled, each gated by evidence. And it's demoted without drama the moment the counter-metrics slip. Stepping back a level is a designed state, not a failure.",
    },
    {
      icon: Shield,
      title: "Design for failure, or the agent designs it for you",
      take: "Your agent will be wrong. Treat every one like a new employee with a badge, a role and a budget: its own identity, permissions scoped to the job, hard spend caps, and a logged, reversible trail. Then storyboard the failure paths, escalation, degraded mode, kill switch, recovery, before launch. Guardrails are structural, not instructions bolted on afterwards.",
    },
  ];

  return (
    <section className="relative bg-background py-32">
      {/* Minimal background */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 max-w-2xl">
            <Eyebrow>AI Strategy</Eyebrow>
            <h2 className="mt-6 text-5xl font-thin tracking-tight text-foreground md:text-6xl">
              A few opinions, strongly held
            </h2>
            <p className="mt-4 text-lg font-light leading-relaxed text-muted-foreground">
              Stop asking where AI fits. Start redesigning the work around
              autonomy, and design it to earn trust.
            </p>
          </motion.div>

          {/* Insights Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {opinions.map((insight) => (
              <InsightCard key={insight.title} {...insight} />
            ))}
          </motion.div>

          {/* Playbook CTA */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="max-w-2xl border border-border p-8">
              <h3 className="mb-4 text-xl font-light text-foreground">
                The whole playbook
              </h3>
              <p className="mb-6 font-light leading-relaxed text-muted-foreground">
                I wrote down the full framework I use to take operational work
                from &ldquo;where can we use AI?&rdquo; to a system people hand
                work to: discovery, delegation, guardrails, agentic UX, and the
                rollout that earns autonomy. Long, opinionated, and free.
              </p>
              <a
                href="/product-playbook"
                className="inline-flex items-center gap-3 bg-foreground px-8 py-4 font-light text-background transition-all duration-300 hover:bg-foreground/80"
              >
                <span>Read the playbook</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIStrategyInsights;
