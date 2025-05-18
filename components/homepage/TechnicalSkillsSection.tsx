"use client";

import React from 'react';
import { Cloud, Monitor, Database, BrainCircuit } from "lucide-react";
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

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon: Icon }) => (
  <motion.div 
    variants={itemAnimation}
    className="relative border-l-4 border-l-primary bg-card hover:bg-secondary/20 transition-colors duration-200"
  >
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Icon className="h-6 w-6 text-primary" />
        <h3 className="font-mono text-xl text-foreground">{title}</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-secondary/10 hover:bg-secondary/20 transition-colors duration-200"
          >
            <div className="w-1.5 h-1.5 bg-primary" />
            <span className="text-sm text-foreground/80">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const TechnicalSkillsSection = () => {
  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: BrainCircuit,
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
      title: "Frontend Development",
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
            <p className="font-mono text-primary mb-2">Skills</p>
            <h2 className="font-mono text-4xl font-medium mb-6">
              Technical Expertise
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
              Comprehensive skillset across modern technologies and frameworks.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={index}
                {...category}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkillsSection;