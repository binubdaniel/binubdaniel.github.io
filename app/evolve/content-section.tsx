// Contents section component for the EVOLVE coming soon page
// This can be inserted in the EvolveComingSoon component between other sections

import { motion, Variants } from "framer-motion";

export default function ContentsSection({ itemAnimation }: { itemAnimation: Variants }) {
    // Chapter data extracted from the document
    const chapters = [
      {
        number: "1",
        title: "Why We Need a New Approach for AI Product Development",
        description: "Explores the unique nature of AI systems, how traditional methods fail, and introduces the EVOLVE framework."
      },
      {
        number: "2",
        title: "The Observed Failure Patterns of Traditional Frameworks in the AI Context",
        description: "Analyzes common failure patterns in AI projects and why frameworks like Agile, Waterfall, and Design Thinking fall short."
      },
      {
        number: "3",
        title: "EVOLVE Overview: A Proposed Adaptive Framework with a New Mindset",
        description: "Introduces the philosophy, six phases, and cyclical nature of the EVOLVE framework."
      },
      {
        number: "4",
        title: "Theoretical Core Principles that Could Guide the Framework",
        description: "Explores the guiding principles: Evidence-based Decision Making, Value-centric Prioritization, Operational Excellence, Learning Loops, and Ethical Vigilance."
      },
      {
        number: "5",
        title: "Phase 1: EXPLORE - A Hypothesis for Finding the Right Problem",
        description: "Examines approaches to problem discovery, stakeholder analysis, market research, and ethical framework definition."
      },
      {
        number: "6",
        title: "Phase 2: VALIDATE - Theoretical Approaches to Proving It Before Building It",
        description: "Explores hypothesis formation, data assessment, prototyping, and technical feasibility evaluation."
      },
      {
        number: "7",
        title: "Phase 3: OPTIMIZE - Conceptual Foundation Building for AI Systems",
        description: "Covers data pipeline development, feature engineering, infrastructure planning, and model development."
      },
      {
        number: "8",
        title: "Phase 4: LAUNCH - A Proposed Approach to Bringing AI to Life",
        description: "Examines deployment strategies, monitoring systems, security approaches, and rollout planning."
      },
      {
        number: "9",
        title: "Phase 5: VALUE - Theoretical Models for Measuring What Matters",
        description: "Explores business impact measurement, user feedback, ethical impact assessment, and value communication."
      },
      {
        number: "10",
        title: "Phase 6: ENHANCE - Conceptual Approaches to Evolving for Lasting Impact",
        description: "Covers improvement prioritization, infrastructure scaling, model retraining, and continuous learning loops."
      },
      {
        number: "11",
        title: "Looking Forward - Governance, Evolution, and An Invitation",
        description: "Considers governance approaches, potential evolution, and invites readers to test and contribute to the framework."
      }
    ];
  
    return (
      <motion.section variants={itemAnimation} className="mb-20">
        <div className="text-center mb-12">
          <p className="font-mono text-primary mb-2">Book Preview</p>
          <h2 className="font-mono text-3xl md:text-4xl font-medium text-foreground mb-4">
            Contents Overview
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the comprehensive journey from understanding AI&apos;s unique challenges to implementing a new adaptive framework.
          </p>
        </div>
  
        <div className="grid grid-cols-1 gap-4">
          {chapters.map((chapter, index) => (
            <div 
              key={index} 
              className="border-l-4 border-l-primary p-6 bg-card hover:bg-secondary/20 transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 md:self-center">
                  <span className="font-mono font-bold text-primary">{chapter.number}</span>
                </div>
                <div>
                  <h3 className="font-mono text-lg font-medium text-foreground mb-2">
                    {chapter.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    );
  };
  
