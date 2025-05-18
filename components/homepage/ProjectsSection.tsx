"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Box, Terminal, Cpu, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface ProjectCardProps {
  title: string;
  description: string;
  impact: string[];
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  impact,
  technologies,
  icon: Icon
}) => (
  <motion.div 
    variants={itemAnimation}
    className="group relative border-l-4 border-l-primary bg-card hover:bg-secondary/20 transition-colors duration-200"
  >
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Icon className="h-6 w-6 text-primary" />
          <h3 className="font-mono text-xl text-foreground">{title}</h3>
        </div>
        <ArrowUpRight className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-8 leading-relaxed">{description}</p>

      {/* Impact Grid */}
      <div className="grid grid-cols-2 gap-px bg-border mb-8">
        {impact.map((item, index) => (
          <div 
            key={index}
            className="p-4 bg-secondary/10"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary" />
              <p className="text-sm text-foreground/80">{item}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <Badge 
            key={index}
            variant="secondary"
            className="px-3 py-1 rounded-none transition-colors duration-200"
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
      title: "Enterprise AI Chatbot Suite",
      description: "Advanced chatbot platform leveraging GPT models with custom fine-tuning for domain-specific tasks.",
      impact: [
        "65% Cost Reduction",
        "80% Faster Response",
        "10K+ Daily Users",
        "96% Satisfaction Rate"
      ],
      technologies: ["OpenAI", "Node.js", "React", "Redis"],
      icon: Cpu
    },
    {
      title: "Voice Analysis System",
      description: "AI-powered voice biometric system using deep learning for voice print analysis and authentication.",
      impact: [
        "96% Detection Rate",
        "70% Faster Auth",
        "50M+ Verifications",
        "90% Fraud Reduction"
      ],
      technologies: ["TensorFlow", "Python", "FastAPI", "Docker"],
      icon: Terminal
    },
    {
      title: "Literary Social Platform",
      description: "Scalable social platform with real-time notifications and AI-powered recommendations.",
      impact: [
        "50K+ Active Users",
        "200% Engagement",
        "85% Retention",
        "4.8/5 Rating"
      ],
      technologies: ["Next.js", "MongoDB", "Redis", "Kafka"],
      icon: BookOpen
    },
    {
      title: "Content Generator",
      description: "ML-powered content generation platform using custom CNN/RNN models for multi-lingual support.",
      impact: [
        "85% Accuracy Rate",
        "75% Cost Reduction",
        "1M+ Pages Done",
        "3 New Markets"
      ],
      technologies: ["PyTorch", "FastAPI", "React", "Docker"],
      icon: Box
    }
  ];

  return (
    <section className="relative bg-background text-foreground">
      {/* IBM Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(180deg,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerAnimation}
        >
          {/* Section Header */}
          <motion.div variants={itemAnimation} className="mb-16">
            <p className="font-mono text-primary mb-2">Projects</p>
            <h2 className="font-mono text-4xl font-medium mb-6">
              Featured Work
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
              Innovative solutions driving real-world impact through advanced technology and thoughtful design.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;