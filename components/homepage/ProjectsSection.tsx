"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, Network, Database, Workflow, MessageSquare } from "lucide-react";
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
        "A multi-agent copilot for leadership teams that unifies meeting intelligence, performance synthesis, project run-rate, revenue-bleed detection, and CSAT into a single decision surface. Specialised sub-agents sit under an orchestrator, each with scoped tools.",
      outcome:
        "Replaced roughly six hours a week of manual status assembly per leader, turning fragmented dashboards and standups into one place where the work is read, decided, and acted on.",
      technologies: ["LangGraph", "MCP", "Multi-Agent", "OpenAI"],
      icon: Activity,
    },
    {
      title: "AI Enterprise Brain",
      description:
        "An organisational knowledge substrate for autonomous systems: an EBITDA-weighted knowledge graph that models the company as a navigable map of people, relationships, beliefs, facts, and observations. Value Causation Trees tie every node to a financial driver.",
      outcome:
        "Agents prioritise by causal impact on the P&L rather than semantic similarity, and reason over an executable substrate, so the output is a playbook that acts, not a passage retrieved.",
      technologies: ["Knowledge Graph", "Value Causation Trees", "Weaviate"],
      icon: Network,
    },
    {
      title: "Memory Systems for Agents",
      description:
        "The memory and state layer that lets agents carry context instead of starting cold: structured short-term, episodic, and semantic memory, with persistent episodic memory per user and team and a shared tool registry across calendar, transcripts, project management, and finance.",
      outcome:
        "Agents remember what happened, who it involved, and what was decided, so delegated work compounds over time rather than repeating itself, and oversight has a trail to review.",
      technologies: ["Episodic Memory", "Semantic Memory", "Weaviate", "LangGraph"],
      icon: Database,
    },
    {
      title: "Lending Workflow Automation",
      description:
        "An agentic system for regulated financial services that runs multi-stage lending end to end: document intake, structured extraction, policy-grounded reasoning, and decisioning, with human-in-the-loop checkpoints held at every high-stakes decision node.",
      outcome:
        "A deliberate ceiling on autonomy given the regulatory exposure: strict tool-calling boundaries, structured-output validation, and RAG over internal policy with groundedness evaluation on every answer.",
      technologies: ["RAG", "MCP", "Structured Extraction", "HITL"],
      icon: Workflow,
    },
    {
      title: "Customer Support Agents",
      description:
        "Production RAG support agents running across four enterprise SaaS customers, owning the full path from ingestion and chunking through embedding, retrieval tuning, and generation guardrails.",
      outcome:
        "Backed by an evaluation framework covering correctness, groundedness, and latency, with regression checks that catch hallucination drift before it ships.",
      technologies: ["RAG", "Evals", "Weaviate", "OpenAI"],
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
              Operational systems that made it past the demo and into production,
              where agents run the work, people manage the exceptions, and the
              numbers actually have to hold up.
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
