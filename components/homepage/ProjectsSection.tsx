"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Box, Terminal, Cpu, Brain } from "lucide-react";
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
      title: "Agentic Support Orchestrator",
      description:
        "A multi-agent system that handles Tier 1 and 2 support tickets on its own, coordinating retrieval, CRM tools, and self-correction loops.",
      outcome:
        "In production it resolves about 75 percent of those tickets without a human, usually in under 30 seconds, and stays hallucination-free roughly 92 percent of the time.",
      technologies: ["LangGraph", "OpenAI", "Python", "Pinecone"],
      icon: Cpu,
    },
    {
      title: "Autonomous Engineering Agent",
      description:
        "An agent that takes on real codebase refactoring and documentation by actually understanding cross-file dependencies, not just pattern matching.",
      outcome:
        "It refactors around 60 percent faster than doing it by hand, documents everything it touches, and ships without logic regressions. Engineers approved its changes about 95 percent of the time.",
      technologies: ["Claude", "TypeScript", "Tree-sitter", "Node.js"],
      icon: Terminal,
    },
    {
      title: "Enterprise Brain",
      description:
        "A knowledge graph and RAG system that acts as a company's single source of truth, connecting scattered documents, tickets, and databases so people can ask hard, cross-system questions and get grounded answers.",
      outcome:
        "Pairing a graph database with vector search lifted answer accuracy about 40 percent and made genuinely multi-hop questions answerable, with the graph staying current as the underlying data changes.",
      technologies: ["Neo4j", "LlamaIndex", "FastAPI", "React"],
      icon: Brain,
    },
    {
      title: "Gen AI Performance Engine",
      description:
        "Middleware for LLM orchestration: load balancing, semantic caching, and dynamic model routing to keep cost and latency under control at scale.",
      outcome:
        "Caching and routing cut model cost about 65 percent and latency about 40 percent, holding steady at over 3 million tokens a day.",
      technologies: ["Go", "Redis", "Prometheus", "Docker"],
      icon: Box,
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
              Things I have built
            </h2>
            <p className="mt-4 text-lg font-light leading-relaxed text-muted-foreground">
              A few systems that made it past the demo and into production, where
              the numbers actually have to hold up.
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
