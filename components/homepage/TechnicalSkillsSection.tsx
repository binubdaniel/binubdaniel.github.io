"use client";

import React from 'react';
import { Cloud, Monitor, Database, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const skillVariants = {
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

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon: Icon }) => (
  <motion.div 
    variants={itemVariants}
    className="group elegant-card border-l-4 border-l-accent p-8 hover:shadow-lg transition-all duration-300"
  >
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <motion.div 
          className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-6 w-6 text-accent" />
        </motion.div>
        <h3 className="text-xl font-light text-foreground">{title}</h3>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={skillVariants}
            className="group/skill"
          >
            <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 hover:scale-105 transition-all duration-200 cursor-default">
              <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover/skill:scale-125 transition-transform duration-200" />
              <span className="text-sm text-foreground/80 font-light group-hover/skill:text-foreground transition-colors duration-200">{skill}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

const TechnicalSkillsSection = () => {
  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: Cpu,
      skills: [
        "OpenAI",
        "LangChain",
        "LangGraph",
        "RAG",
        "LLMs",
        "TensorFlow",
        "PyTorch",
        "Neural Networks",
        "NLP",
        "MLOps",
        "Fine-tuning",
        "Transformers",
      ]
    },
    {
      title: "Cloud & Architecture",
      icon: Cloud,
      skills: [
        "AWS",
        "GCP",
        "Docker",
        "Kubernetes",
        "Microservices",
        "Event-Driven",
        "Redis",
        "Kafka",
        "CI/CD",
        "Infrastructure as Code",
        "Monitoring",
        "Security",
      ]
    },
    {
      title: "Frontend Engineering",
      icon: Monitor,
      skills: [
        "React",
        "Next.js",
        "Vue.js",
        "Nuxt.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
        "Flutter",
        "Flutter Web",
        "PWA",
        "Performance",
        "Accessibility",
      ]
    },
    {
      title: "Backend & Database",
      icon: Database,
      skills: [
        "Node.js",
        "Python",
        "FastAPI",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "ElasticSearch",
        "REST APIs",
        "GraphQL",
        "WebSockets",
        "Authentication",
      ]
    }
  ];

  return (
    <section className="relative bg-background py-24">
      {/* Minimalist background */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:60px_60px]" />
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
                <span className="text-accent font-light tracking-wider uppercase text-sm">Skills</span>
                <div className="h-px w-full bg-accent mt-2" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Technical Expertise
              </h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
                Comprehensive skillset across modern technologies and frameworks, refined through years of hands-on experience.
              </p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skillCategories.map((category, index) => (
              <SkillCard
                key={index}
                {...category}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkillsSection;