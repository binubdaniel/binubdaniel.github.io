"use client";

import React from 'react';
import { Shield, TrendingUp, Zap, Target, ArrowRight } from "lucide-react";
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

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  insights: string[];
}

const InsightCard: React.FC<InsightCardProps> = ({ title, description, icon: Icon, insights }) => (
  <motion.div 
    variants={itemVariants}
    className="group border border-border p-8 hover:border-foreground transition-all duration-300"
    whileHover={{ y: -2 }}
  >
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <motion.div 
          className="flex-shrink-0 p-3 bg-muted group-hover:bg-foreground group-hover:text-background transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <div className="space-y-4">
          <h3 className="text-lg font-light text-foreground group-hover:text-foreground transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground leading-relaxed font-light text-sm">{description}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 mt-2 bg-foreground group-hover:scale-125 transition-transform duration-200 flex-shrink-0" />
            <p className="text-xs text-muted-foreground font-light leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const AIStrategyInsights = () => {
  const strategyInsights = [
    {
      title: "Agentic Strategic Moats",
      description: "For CEOs & Founders: In the era of commoditized LLMs, defensibility shifts from the model to the orchestration. True moats are built through agentic workflows that integrate deeply with your proprietary data and business logic.",
      icon: Shield,
      insights: [
        "Orchestrate multi-step reasoning that competitors can't easily replicate",
        "Build agents that resolve ambiguity through proprietary internal data",
        "Create feedback loops where execution data compounds your advantage",
        "Increase customer switching costs by embedding agents into core operations",
        "Leverage RAG and Agentic Memory for persistent domain expertise"
      ]
    },
    {
      title: "The Shift to Agentic SaaS",
      description: "For Product Leaders: Traditional SaaS is being replaced by Agentic systems that move from 'point and click' to 'instruct and execute'. The winners will be those who reimagine workflows where the software is the primary actor.",
      icon: TrendingUp,
      insights: [
        "Transform linear UIs into intent-driven autonomous agents",
        "Build systems that proactively manage tasks instead of reacting to inputs",
        "Focus on outcome-based value rather than seat-based licensing",
        "Reduce operational friction by automating end-to-step decision logic",
        "Reimagine high-value workflows through the lens of agentic autonomy"
      ]
    },
    {
      title: "ROI-Driven AI Engineering",
      description: "For Technical Leaders: Building production-ready agents requires more than a prompt. It demands rigorous engineering around reliability, observability, and safety guardrails to ensure predictable business outcomes.",
      icon: Zap,
      insights: [
        "Implement robust error handling and self-correction in agent loops",
        "Develop specialized evaluation frameworks for business performance",
        "Build scalable infrastructure for long-running agentic tasks",
        "Establish guardrails to prevent agent drift and recursive hallucination",
        "Optimize Latency and Cost through strategic model orchestration"
      ]
    },
    {
      title: "AI-Native Strategic Architecture",
      description: "Building the Foundation: Success in modern AI requires a fundamental rethink of the tech stack. It's not about adding AI as a feature, but building architectures that prioritize data flow and agentic autonomy.",
      icon: Target,
      insights: [
        "Design modular architectures for rapid LLM model swapping",
        "Prioritize structured data output for reliable system integration",
        "Build for agentic observability and trace-based debugging",
        "Develop strategic data pipelines for fine-tuning and steering",
        "Create defensible systems through integrated agent-tool ecosystems"
      ]
    }
  ];

  return (
    <section className="relative bg-background py-32">
      {/* Minimal background */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-20"
        >
          {/* Section Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-foreground font-light tracking-wider uppercase text-sm">AI Strategy</span>
                <div className="h-px w-full bg-foreground mt-2" />
              </div>
              <h2 className="text-5xl md:text-6xl font-thin text-foreground">
                Strategic AI Insights
              </h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
                Building successful AI products requires strategic thinking about defensibility, disruption, and value creation in an era of rapid technological change.
              </p>
            </div>
          </motion.div>

          {/* Insights Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {strategyInsights.map((insight, index) => (
              <InsightCard
                key={index}
                {...insight}
              />
            ))}
          </motion.div>

          {/* Playbook CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="border border-border p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-light text-foreground mb-4">
                Comprehensive AI Product Development Framework
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Get the complete strategic framework for building defensible AI products from concept to scale. 
                Detailed playbook covering strategy, execution, launch, and growth phases.
              </p>
              <a
                href="/product-playbook"
                className="inline-flex items-center gap-3 bg-foreground text-background hover:bg-foreground/80 px-8 py-4 font-light transition-all duration-300"
              >
                <span>View Complete Playbook</span>
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
