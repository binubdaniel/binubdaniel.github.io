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
    <div className="flex items-start gap-6">
      <motion.div
        className="flex-shrink-0 bg-muted p-3 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <div className="space-y-3">
        <h3 className="text-lg font-light text-foreground">{title}</h3>
        <p className="text-sm font-light leading-relaxed text-muted-foreground">
          {take}
        </p>
      </div>
    </div>
  </motion.div>
);

const AIStrategyInsights = () => {
  const opinions = [
    {
      icon: Shield,
      title: "The moat moved off the model",
      take: "When every team can call the same models, the model stops being the moat. Defensibility lives in the orchestration: the workflows, the proprietary data your agents reason over, and the execution loops that compound the more they run. That is the part a competitor cannot copy by swapping in a new LLM.",
    },
    {
      icon: TrendingUp,
      title: "From point and click to instruct and execute",
      take: "SaaS is shifting from software you operate to software that operates for you. The products worth building are not bolting a chat box onto an old workflow; they rebuild the workflow so the software is the one doing the work. That changes the interface, the pricing, and what done even means.",
    },
    {
      icon: Zap,
      title: "Reliability is an engineering problem, not a model one",
      take: "A demo that works once is not a product. Production agents need error handling, evaluation, guardrails, and observability: the unglamorous parts that decide whether a business can trust an agent with real work. Most failed Gen AI projects died here, long before the model was the limit.",
    },
    {
      icon: Target,
      title: "Build the stack AI native",
      take: "Adding AI as a feature on top of an existing architecture rarely holds. The systems that last are designed around data flow and agent autonomy from day one: modular enough to swap models, structured enough that outputs are reliable, observable enough that you debug a trace instead of guessing.",
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
              On where defensibility actually comes from, and why most AI
              products stall before they reach production.
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
                I wrote down the full framework I use to take AI products from
                idea to scale: strategy, execution, launch, and growth. It is
                long, opinionated, and free.
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
