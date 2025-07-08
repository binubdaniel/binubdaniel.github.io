"use client";

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Users2, LineChart, Puzzle, Lightbulb, Zap, Brain, ChevronDown } from "lucide-react";
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

interface PhilosophyCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({ title, description, icon: Icon }) => (
  <motion.div 
    variants={itemVariants}
    className="group elegant-card p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent"
    whileHover={{ y: -2 }}
  >
    <div className="flex items-start gap-4">
      <motion.div 
        className="flex-shrink-0 p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-5 w-5 text-accent" />
      </motion.div>
      <div className="space-y-3">
        <h3 className="text-lg font-light text-foreground group-hover:text-accent transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground leading-relaxed font-light text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);

interface MetricsPanelProps {
  items: { text: string; subtext?: string }[];
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ items }) => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="grid md:grid-cols-2 gap-4"
  >
    {items.map((item, index) => (
      <motion.div 
        key={index}
        variants={itemVariants}
        className="group bg-secondary/10 hover:bg-secondary/20 rounded-lg p-4 transition-all duration-200 hover:scale-105"
      >
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 bg-accent rounded-full group-hover:scale-125 transition-transform duration-200 flex-shrink-0" />
          <div>
            <h4 className="font-light text-foreground group-hover:text-accent transition-colors duration-200">
              {item.text}
            </h4>
            {item.subtext && (
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.subtext}</p>
            )}
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

interface AccordionSectionProps {
  value: string;
  title: string;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ value, title, children }) => (
  <Accordion.Item 
    value={value} 
    className="elegant-card overflow-hidden"
  >
    <Accordion.Trigger className="flex items-center justify-between w-full p-8 cursor-pointer group transition-all duration-300 hover:bg-secondary/20">
      <h3 className="text-xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <ChevronDown className="h-5 w-5 text-accent transition-transform duration-300 group-data-[state=open]:rotate-180" />
    </Accordion.Trigger>
    <Accordion.Content className="overflow-hidden transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
      <div className="p-8 pt-0 border-t border-border/50">
        {children}
      </div>
    </Accordion.Content>
  </Accordion.Item>
);

const ProductVisionSection = () => {
  const philosophyItems = [
    {
      title: "User-Centric Design",
      description: "Every product decision starts with deep user understanding. We build for real people, solving real problems through extensive research and continuous feedback.",
      icon: Users2
    },
    {
      title: "Data-Driven Excellence",
      description: "Leverage analytics, user feedback, and market insights to make informed decisions. Every feature and improvement is backed by concrete data and measurable impact.",
      icon: LineChart
    },
    {
      title: "Iterative Development",
      description: "Embrace rapid iteration and continuous improvement. We start lean, gather feedback, and evolve products based on real-world usage patterns and user insights.",
      icon: Puzzle
    },
    {
      title: "Innovation Leadership",
      description: "Stay ahead of technological trends while ensuring solutions are practical and scalable. Balance cutting-edge innovation with reliability and maintainability.",
      icon: Lightbulb
    },
    {
      title: "Performance First",
      description: "Optimize for speed, efficiency, and reliability at every level. Create seamless experiences that delight users while maintaining robust system performance.",
      icon: Zap
    },
    {
      title: "AI Integration",
      description: "Leverage artificial intelligence and machine learning to enhance product capabilities and create smarter, more personalized user experiences.",
      icon: Brain
    }
  ];
  
  const metrics = [
    {
      text: "User Engagement Depth",
      subtext: "Focus on meaningful interaction metrics over vanity metrics like page views"
    },
    {
      text: "Retention & Loyalty",
      subtext: "Measure user retention across different cohorts and usage patterns"
    },
    {
      text: "Feature Adoption Rate",
      subtext: "Track how quickly and effectively users adopt new features"
    },
    {
      text: "User Satisfaction Score",
      subtext: "Monitor NPS, CSAT, and user feedback across all touchpoints"
    },
    {
      text: "Performance Metrics",
      subtext: "Track system performance, load times, and technical reliability"
    },
    {
      text: "Revenue Growth",
      subtext: "Monitor MRR, customer acquisition costs, and lifetime value"
    }
  ];
  
  const strategy = [
    {
      text: "Product-Led Growth",
      subtext: "Focus on creating products that naturally drive user acquisition and retention"
    },
    {
      text: "Network Effect Optimization",
      subtext: "Build features that become more valuable as user base grows"
    },
    {
      text: "Community Development",
      subtext: "Foster active user communities and encourage user-generated content"
    },
    {
      text: "Continuous Feedback Loop",
      subtext: "Implement systems for gathering and acting on user feedback"
    },
    {
      text: "Market Expansion",
      subtext: "Strategic approach to entering new markets and user segments"
    },
    {
      text: "Innovation Pipeline",
      subtext: "Maintain a robust roadmap of innovative features and improvements"
    }
  ];
  
  const security = [
    {
      text: "Data Protection",
      subtext: "Implement comprehensive data security and privacy measures"
    },
    {
      text: "Compliance Standards",
      subtext: "Maintain industry-standard compliance and regular audits"
    },
    {
      text: "Access Control",
      subtext: "Robust user authentication and authorization systems"
    },
    {
      text: "Security Testing",
      subtext: "Regular penetration testing and security assessments"
    },
    {
      text: "Incident Response",
      subtext: "Well-defined protocols for handling security incidents"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-background via-muted/5 to-background py-24">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-accent font-light tracking-wider uppercase text-sm">Product Vision</span>
                <div className="h-px w-full bg-accent mt-2" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Philosophy & Approach
              </h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
                Building successful products requires a perfect blend of innovation, user-centricity, and technical excellence.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Accordion.Root
              type="multiple"
              defaultValue={[""]}
              className="space-y-6"
            >
              <AccordionSection value="philosophy" title="Core Philosophy">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {philosophyItems.map((item, index) => (
                    <PhilosophyCard key={index} {...item} />
                  ))}
                </motion.div>
              </AccordionSection>

              <AccordionSection value="metrics" title="Success Metrics">
                <MetricsPanel items={metrics} />
              </AccordionSection>

              <AccordionSection value="strategy" title="Growth Strategy">
                <MetricsPanel items={strategy} />
              </AccordionSection>

              <AccordionSection value="security" title="Security & Compliance">
                <MetricsPanel items={security} />
              </AccordionSection>
            </Accordion.Root>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductVisionSection;