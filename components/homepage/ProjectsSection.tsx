"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Box, Terminal, Cpu, BookOpen, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      duration: 0.6
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const impactVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
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
    variants={itemVariants}
    className="group elegant-card border-l-4 border-l-accent p-8 hover:shadow-xl transition-all duration-300 cursor-pointer"
    whileHover={{ y: -5 }}
  >
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <motion.div 
            className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-6 w-6 text-accent" />
          </motion.div>
          <h3 className="text-2xl font-light text-foreground group-hover:text-accent transition-colors duration-300">{title}</h3>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="p-2 bg-accent/5 rounded-full group-hover:bg-accent/15 transition-colors duration-300"
        >
          <ArrowUpRight className="h-5 w-5 text-accent" />
        </motion.div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed font-light group-hover:text-foreground/80 transition-colors duration-300">
        {description}
      </p>

      {/* Impact Metrics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="text-sm font-light text-foreground uppercase tracking-wider">Impact</span>
        </div>
        <motion.div 
          className="grid grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {impact.map((item, index) => (
            <motion.div
              key={index}
              variants={impactVariants}
              className="group/impact"
            >
              <div className="p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 hover:scale-105 transition-all duration-200 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full group-hover/impact:scale-125 transition-transform duration-200" />
                  <p className="text-sm text-foreground/80 font-light group-hover/impact:text-foreground transition-colors duration-200">{item}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Technologies */}
      <div className="space-y-4">
        <div className="h-px w-full bg-border/50" />
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge 
                variant="secondary"
                className="px-3 py-1.5 rounded-full font-light border border-secondary/20 hover:border-accent/30 hover:bg-accent/10 hover:text-accent transition-all duration-200"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const projects = [
    {
      title: "Enterprise AI Chatbot Suite",
      description: "Advanced chatbot platform leveraging GPT models with custom fine-tuning for domain-specific tasks, revolutionizing customer support and engagement.",
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
      description: "AI-powered voice biometric system using deep learning for voice print analysis and authentication, enhancing security infrastructure.",
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
      description: "Scalable social platform with real-time notifications and AI-powered recommendations, connecting readers and authors globally.",
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
      description: "ML-powered content generation platform using custom CNN/RNN models for multi-lingual support, streamlining content creation workflows.",
      impact: [
        "85% Accuracy Rate",
        "75% Cost Reduction",
        "1M+ Pages Generated",
        "3 New Markets"
      ],
      technologies: ["PyTorch", "FastAPI", "React", "Docker"],
      icon: Box
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-background via-muted/5 to-background py-24">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-accent font-light tracking-wider uppercase text-sm">Projects</span>
                <div className="h-px w-full bg-accent mt-2" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Featured Work
              </h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
                Innovative solutions driving real-world impact through advanced technology and thoughtful design.
              </p>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;