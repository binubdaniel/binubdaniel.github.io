import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Users2, LineChart, Puzzle, Lightbulb, Zap, Brain, ChevronDown } from "lucide-react";
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

interface PhilosophyCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({ title, description, icon: Icon }) => (
  <motion.div 
    variants={itemAnimation}
    className="group relative border-l-4 border-l-blue-500 bg-[#161616] hover:bg-[#262626] transition-colors duration-200"
  >
    <div className="p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h3 className="font-mono text-lg font-medium text-white mb-2">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

interface MetricsPanelProps {
  items: { text: string; subtext?: string }[];
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ items }) => (
  <motion.div 
    variants={containerAnimation}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="grid gap-px bg-gray-800"
  >
    {items.map((item, index) => (
      <motion.div 
        key={index}
        variants={itemAnimation}
        className="group bg-[#161616] hover:bg-[#262626] transition-colors duration-200"
      >
        <div className="p-6 flex items-start gap-4">
          <div className="w-1.5 h-1.5 mt-2 bg-blue-500" />
          <div>
            <h4 className="font-mono text-white group-hover:text-blue-400 transition-colors duration-200">
              {item.text}
            </h4>
            {item.subtext && (
              <p className="mt-1 text-sm text-gray-400">{item.subtext}</p>
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
    className="border border-gray-800 bg-[#161616]"
  >
    <Accordion.Trigger className="flex items-center justify-between w-full p-6 cursor-pointer group">
      <h3 className="font-mono text-xl text-white group-hover:text-blue-400 transition-colors duration-200">
        {title}
      </h3>
      <ChevronDown className="h-5 w-5 text-blue-400 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
    </Accordion.Trigger>
    <Accordion.Content className="overflow-hidden transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
      <div className="p-6 pt-0">
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
    <section className="relative bg-[#000000] text-white">
      {/* IBM Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerAnimation}
          className="space-y-12"
        >
          <motion.div 
            variants={itemAnimation}
            className="max-w-2xl"
          >
            <p className="font-mono text-blue-400 mb-2">Product Vision</p>
            <h2 className="font-mono text-4xl font-medium mb-6">
              Philosophy & Approach
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              Building successful products requires a perfect blend of innovation,
              user-centricity, and technical excellence.
            </p>
          </motion.div>

          <Accordion.Root
            type="multiple"
            defaultValue={[]}
            className="space-y-px"
          >
            <AccordionSection value="philosophy" title="Core Philosophy">
              <motion.div 
                variants={containerAnimation}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800"
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
      </div>
    </section>
  );
};

export default ProductVisionSection;