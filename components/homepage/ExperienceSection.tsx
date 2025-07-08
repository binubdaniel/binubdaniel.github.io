"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Briefcase, Star, Lightbulb, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

interface ExperiencePanelProps {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  learnings: string[];
  value: string;
}

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({
  role,
  company,
  period,
  description,
  achievements,
  learnings,
  value,
}) => (
  <motion.div
    variants={itemVariants}
    className="group"
  >
    <Accordion.Item value={value} className="elegant-card border-l-4 border-l-accent overflow-hidden">
      <Accordion.Trigger className="w-full transition-all duration-300 hover:bg-secondary/20 group-data-[state=open]:bg-secondary/30">
        <div className="flex items-center justify-between p-8 w-full text-left">
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-full">
                <Briefcase className="h-5 w-5 text-accent" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="font-light">{period}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-foreground">{role}</h3>
              <p className="text-muted-foreground font-light">{company}</p>
            </div>
          </div>
          <ChevronDown className="h-5 w-5 text-accent transition-transform duration-300 group-data-[state=open]:rotate-180 ml-6" />
        </div>
      </Accordion.Trigger>

      <Accordion.Content className="overflow-hidden transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="px-8 pb-8 space-y-8">
          <div className="pt-6 border-t border-border/50">
            <p className="text-muted-foreground leading-relaxed font-light">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Star className="h-4 w-4 text-accent" />
                </div>
                <h4 className="text-foreground font-light">Key Achievements</h4>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors duration-200"
                  >
                    <div className="w-2 h-2 mt-2 bg-accent rounded-full flex-shrink-0" />
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Lightbulb className="h-4 w-4 text-accent" />
                </div>
                <h4 className="text-foreground font-light">Key Learnings</h4>
              </div>
              <div className="space-y-3">
                {learnings.map((learning, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors duration-200"
                  >
                    <div className="w-2 h-2 mt-2 bg-accent rounded-full flex-shrink-0" />
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">{learning}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </motion.div>
);

const ExperienceSection = () => {
  const experiences = [
    {
      role: "Technical Lead",
      company: "Bridge Global - Kochi, Kerala",
      period: "September 2024 - Present",
      description:
        "Leading AI integration initiatives and engineering teams in delivering cutting-edge solutions. Focused on implementing advanced technologies while mentoring and growing technical talent.",
      achievements: [
        "Mentored engineering teams in developing scalable solutions while maintaining exceptional quality standards",
        "Implemented advanced AI technologies including RAG and LLMs to revolutionize product development",
        "Established comprehensive training programs for junior engineers through structured mentorship",
      ],
      learnings: [
        "Effective leadership requires balance of technical expertise and people management skills",
        "Clear communication is crucial for successful cross-functional collaboration",
        "Strategic technical decisions must align with long-term business objectives",
      ],
    },
    {
      role: "Founder and CEO",
      company: "Socife Technologies",
      period: "January 2019 - December 2024",
      description:
        "Led company strategy and operations while maintaining technical leadership. Focused on building sustainable growth and fostering innovation across the organization.",
      achievements: [
        "Guided product evolution from MVP to market-ready solutions with robust lifecycle management",
        "Built and mentored high-performing cross-functional teams that consistently exceeded delivery targets",
        "Optimized operations and drove revenue growth through strategic planning and execution",
      ],
      learnings: [
        "Business strategy must seamlessly align with technical capabilities for sustainable growth",
        "Finding product-market fit requires continuous iteration and customer feedback",
        "Building a strong company culture is as critical as building great products",
      ],
    },
    {
      role: "Co-Founder",
      company: "College-Shore",
      period: "June 2016 - June 2018",
      description:
        "Built an innovative educational platform bridging students with academic resources. Led platform development and strategic initiatives to create a comprehensive digital learning ecosystem.",
      achievements: [
        "Developed and implemented a sustainable business model aligned with market needs",
        "Established strategic partnerships with educational institutions to expand content offerings",
        "Drove user acquisition through targeted marketing initiatives and platform optimization",
      ],
      learnings: [
        "Deep understanding of user needs is crucial for building successful products",
        "Data-driven decision making leads to better product outcomes and user satisfaction",
        "Strategic partnerships play a vital role in platform growth and credibility",
      ],
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-muted/5 via-background to-background py-24">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-[size:48px_48px]" />
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
                <span className="text-accent font-light tracking-wider uppercase text-sm">Experience</span>
                <div className="h-px w-full bg-accent mt-2" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Professional Journey
              </h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
                Building impactful solutions and leading innovative teams across different roles and challenges.
              </p>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants}>
            <Accordion.Root type="single" collapsible className="space-y-6">
              {experiences.map((experience, index) => (
                <ExperiencePanel
                  key={index}
                  {...experience}
                  value={`item-${index}`}
                />
              ))}
            </Accordion.Root>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;