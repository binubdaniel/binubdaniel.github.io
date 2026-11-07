"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, Network, Database, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

interface ProjectCardProps {
  title: string;
  description: string;
  outcome: string;
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  outcome,
  technologies,
  icon: Icon,
}) => (
  <motion.div
    variants={itemVariants}
    className="group flex flex-col border border-border p-8 transition-all duration-300 hover:border-foreground"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center gap-4">
      <motion.div
        className="bg-muted p-3 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
      <h3 className="text-2xl font-light text-foreground">{title}</h3>
    </div>

    <p className="mt-6 font-light leading-relaxed text-muted-foreground">
      {description}
    </p>

    <p className="mt-4 text-sm font-light leading-relaxed text-foreground/80">
      {outcome}
    </p>

    <div className="mt-auto pt-8">
      <div className="mb-4 h-px w-full bg-border" />
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="rounded-none border border-border px-3 py-1.5 font-light transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const projects = [
    {
      title: "AI Operations Intelligence Platform",
      description:
        "One decision surface for leadership: meeting intelligence, performance, project run-rate, revenue-bleed detection, and CSAT, unified so leaders read, decide, and act in one place instead of across a dozen dashboards. Specialised sub-agents run under an orchestrator, each with scoped tools.",
      outcome:
        "Gave back roughly six hours a week per leader and turned scattered status work into a single operational view. I own its vision, roadmap, and commercial outcomes.",
      technologies: ["Multi-Agent", "LangGraph", "MCP"],
      icon: Activity,
    },
    {
      title: "Context Layer for Enterprise",
      description:
        "An EBITDA-weighted model of the organisation, its people, relationships, and decisions, with Value Causation Trees tying every node to a financial driver, so agents prioritise by causal impact on the P&L rather than by what merely looks relevant.",
      outcome:
        "It is the substrate the firm now funds AI work against: every proposed intervention has to carry a quantified financial claim before it earns headcount. I own the product.",
      technologies: ["Knowledge Graph", "Value Causation Trees", "P&L Modelling"],
      icon: Network,
    },
    {
      title: "Memory Systems for Agents",
      description:
        "The memory layer that lets agents carry context instead of starting cold: structured short-term, episodic, and semantic memory, with persistent per-user and per-team history across calendar, transcripts, delivery, and finance.",
      outcome:
        "Part of a shared platform layer that stopped every engagement rebuilding its own stack and cut time-to-ship for new AI capabilities by over 40 percent.",
      technologies: ["Episodic Memory", "Semantic Memory", "Shared Tool Registry"],
      icon: Database,
    },
    {
      title: "Customer Support Agents",
      description:
        "Production support agents across four enterprise SaaS customers, owning the full path from retrieval strategy through generation guardrails, measured by an evaluation framework for correctness, groundedness, and latency.",
      outcome:
        "The first AI beachhead that proved the model and set the reliability bar, regression checks that catch hallucination drift before it ships, that later work inherited.",
      technologies: ["RAG", "Evals", "Observability"],
      icon: MessageSquare,
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
            <Eyebrow>Projects</Eyebrow>
            <h2 className="mt-6 text-5xl font-thin tracking-tight text-foreground md:text-6xl">
              Systems people hand work to
            </h2>
            <p className="mt-4 text-lg font-light leading-relaxed text-muted-foreground">
              Operational systems I have owned from strategy through production,
              where agents run the work, people manage the exceptions, and the
              outcome is a number someone signed up for.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
