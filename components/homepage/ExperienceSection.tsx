import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Briefcase, Star, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
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
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <Accordion.Item value={value} className="group">
      <div className="relative border-l-4 border-l-blue-500 bg-[#161616] transition-colors duration-200 group-data-[state=open]:bg-[#262626]">
        <Accordion.Trigger className="w-full">
          <div className="flex items-start p-6 w-full text-left">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-4">
                <Briefcase className="h-5 w-5 text-blue-400" />
                <span className="font-mono text-sm text-blue-400">{period}</span>
              </div>
              <h3 className="font-mono text-xl text-white mb-2">{role}</h3>
              <p className="text-gray-400">{company}</p>
            </div>
            <ChevronDown className="h-5 w-5 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180 ml-4" />
          </div>
        </Accordion.Trigger>

        <Accordion.Content className="overflow-hidden transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="px-6 pb-6 space-y-8">
            <div className="pt-4 border-t border-gray-800">
              <p className="text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-blue-400" />
                <h4 className="font-mono text-white">Key Achievements</h4>
              </div>
              <div className="grid gap-2">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[#262626]"
                  >
                    <div className="w-1.5 h-1.5 mt-2 bg-blue-500" />
                    <p className="text-gray-400 text-sm">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <h4 className="font-mono text-white">Key Learnings</h4>
              </div>
              <div className="grid gap-2">
                {learnings.map((learning, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[#262626]"
                  >
                    <div className="w-1.5 h-1.5 mt-2 bg-blue-500" />
                    <p className="text-gray-400 text-sm">{learning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Accordion.Content>
      </div>
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
    <section className="relative  text-white">
      {/* IBM Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16"
        >
          <p className="font-mono text-blue-400 mb-2">Experience</p>
          <h2 className="font-mono text-4xl font-medium mb-6">
            Professional Journey
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
            Building impactful solutions and leading innovative teams across different roles and challenges.
          </p>
        </motion.div>

        <Accordion.Root type="single" collapsible className="space-y-px bg-gray-800">
          {experiences.map((experience, index) => (
            <ExperiencePanel
              key={index}
              {...experience}
              value={`item-${index}`}
            />
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};

export default ExperienceSection;