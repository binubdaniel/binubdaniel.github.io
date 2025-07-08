"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Puzzle,
  Layers,
  BarChart,
  Lightbulb,
  Home,
  Users,
  Star,
  Zap,
  ArrowUpRightFromSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import WaitingListForm from "./joinwaitlist";
import ContentsSection from "./content-section";
import SurveyTriggerCard from "./survey-triggercard";
import QuickSurveyDialog from "./quick-survey";

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const EvolveComingSoon = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  // Set launch date to August 14, 2025
  useEffect(() => {
    const target = new Date("2025-08-14T00:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Define the EVOLVE framework phases
  const evolvePhases = [
    {
      icon: <Calendar className="h-6 w-6 text-accent" />,
      title: "Explore",
      description:
        "Find the right problem to solve with AI, one that creates genuine value and leverages AI's unique capabilities.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      title: "Validate",
      description:
        "Test critical assumptions about data availability, technical feasibility, and user value before investing.",
    },
    {
      icon: <Puzzle className="h-6 w-6 text-accent" />,
      title: "Optimize",
      description:
        "Build the foundation through data pipelines, model development, and infrastructure planning.",
    },
    {
      icon: <Layers className="h-6 w-6 text-accent" />,
      title: "Launch",
      description:
        "Bring your AI system to life with thoughtful deployment strategies and monitoring systems.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-accent" />,
      title: "Value",
      description:
        "Measure what matters through multiple dimensions of impact, learning, and refinement.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-accent" />,
      title: "Enhance",
      description:
        "Evolve your system for lasting impact through continuous improvement and adaptation.",
    },
  ];

  // Define key benefits
  const keyBenefits = [
    {
      icon: <Zap className="h-5 w-5 text-accent" />,
      title: "Addresses AI's Unique Challenges",
      description:
        "Unlike traditional frameworks, EVOLVE tackles the probabilistic nature of AI systems, data dependencies, and ethical considerations.",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-accent" />,
      title: "Reduce AI Project Failures",
      description:
        "Learn practical approaches to avoid the common pitfalls that lead to 70-85% of AI initiatives failing to meet expectations.",
    },
    {
      icon: <Users className="h-5 w-5 text-accent" />,
      title: "Cross-Functional Collaboration",
      description:
        "Bridge the gap between technical teams, product managers, and business stakeholders with shared language and processes.",
    },
    {
      icon: <Star className="h-5 w-5 text-accent" />,
      title: "Real-World Application",
      description:
        "Frameworks, tools, and templates you can immediately apply to your AI initiatives for better outcomes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground relative">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="absolute top-4 right-16 z-10 p-2">
        <Link href="/">
          <Home size={20} className="text-muted-foreground" />{" "}
        </Link>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerAnimation}
        >
          {/* Header Section */}
          <motion.header
            variants={itemAnimation}
            className="text-center mt-16 mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 bg-[length:200%_100%] blur-3xl opacity-30"
                />
                <h1 className="relative text-6xl md:text-8xl font-light text-foreground tracking-tight">
                  <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite]">
                    EVOLVE
                  </span>
                </h1>
              </div>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex justify-center"
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent" />
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-xl md:text-2xl text-accent font-light max-w-4xl mx-auto leading-relaxed"
                >
                  A Revolutionary Framework Designed for the{" "}
                  <span className="text-foreground font-medium">Probabilistic Nature</span>{" "}
                  of AI Product Development
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="flex justify-center gap-8 text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span>Decoding Failures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                    <span>New Mindset</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                    <span>Experimental Framework</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.header>

          {/* Countdown Section - Reimagined */}
          <motion.section
            variants={itemAnimation}
            className="relative mb-20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl" />
            <div className="relative bg-gradient-to-br from-card/80 via-card to-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-8 md:p-12">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-sm font-light text-accent uppercase tracking-wider">Coming August 2025</span>
                  </motion.div>
                  
                  <h3 className="text-3xl md:text-4xl font-light text-foreground">
                    The Future of AI Development
                    <span className="block text-xl text-accent mt-2">Launches in</span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div 
                    className="group relative overflow-hidden bg-gradient-to-b from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative text-center">
                      <div className="text-4xl md:text-5xl font-light text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                        {days}
                      </div>
                      <div className="text-muted-foreground text-sm font-light uppercase tracking-wider">Days</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group relative overflow-hidden bg-gradient-to-b from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative text-center">
                      <div className="text-4xl md:text-5xl font-light text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                        {hours}
                      </div>
                      <div className="text-muted-foreground text-sm font-light uppercase tracking-wider">Hours</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group relative overflow-hidden bg-gradient-to-b from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative text-center">
                      <div className="text-4xl md:text-5xl font-light text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                        {minutes}
                      </div>
                      <div className="text-muted-foreground text-sm font-light uppercase tracking-wider">Minutes</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group relative overflow-hidden bg-gradient-to-b from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative text-center">
                      <div className="text-4xl md:text-5xl font-light text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                        {seconds}
                      </div>
                      <div className="text-muted-foreground text-sm font-light uppercase tracking-wider">Seconds</div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground font-light max-w-2xl mx-auto"
                >
                  Be among the first to transform how you approach AI product development.
                  Join thousands of forward-thinking practitioners preparing for the launch.
                </motion.p>
              </div>
            </div>
          </motion.section>

          {/* Main Content */}
          <div className=" gap-12 mb-20">
            {/* Book Information */}
            <motion.div
              variants={itemAnimation}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-accent font-light tracking-wider uppercase text-sm">About</span>
                  <div className="h-px w-full bg-accent mt-2" />
                </div>
                <h2 className="text-2xl font-light text-foreground">
                  About the Book
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-light">
                <span className="text-foreground font-medium">EVOLVE</span>{" "}
                presents a hypothesis for addressing the unique challenges of AI
                product development. With AI project failure rates between 70%
                and 85%, traditional product development approaches often fall
                short. This book introduces a new framework specifically
                designed for the probabilistic nature of AI.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light">
                The EVOLVE framework is built on core principles that address
                common failure patterns in AI initiatives. It embraces
                probability over certainty, centers data as a first-class
                product component, and integrates ethical considerations
                throughout the development process.
              </p>

              {/* Who is this book for */}
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Who Should Read This Book
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <span className="text-sm text-muted-foreground font-light">
                      Product Managers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <span className="text-sm text-muted-foreground font-light">
                      Data Scientists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <span className="text-sm text-muted-foreground font-light">
                      ML Engineers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <span className="text-sm text-muted-foreground font-light">
                      Technical Leaders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <span className="text-sm text-muted-foreground font-light">
                      AI Strategists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <span className="text-sm text-muted-foreground font-light">
                      Innovation Teams
                    </span>
                  </li>
                </ul>
              </div>

              {/* Author Information */}
              <div className="elegant-card border-l-4 border-l-accent p-6">
                <Link href="/">
                  <div className="flex gap-1">
                    <h3 className="font-light text-lg text-accent">
                      Binu B Daniel
                    </h3>{" "}
                    <ArrowUpRightFromSquare className="w-3 h-3 text-accent" />
                  </div>
                  <p className="text-muted-foreground font-light">
                    AI Product Architect & Technology Consultant with extensive
                    experience in developing innovative AI solutions across
                    industries.
                  </p>
                </Link>
              </div>
            </motion.div>

            {/* Countdown Timer Card */}
          </div>

          <motion.section className=" py-16">
            <motion.div
              variants={containerAnimation}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <SurveyTriggerCard
                onOpenSurvey={() => setIsSurveyOpen(true)}
                itemAnimation={itemAnimation}
              />
              <WaitingListForm itemAnimation={itemAnimation} />
            </motion.div>
          </motion.section>

          {/* Key Benefits Section */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-accent font-light tracking-wider uppercase text-sm">Why Read EVOLVE</span>
                  <div className="h-px w-full bg-accent mt-2" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  Key Benefits
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                  Practical insights and actionable frameworks to transform your
                  AI product development approach.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="elegant-card border-l-4 border-l-accent p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-light">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Framework Overview Section */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-accent font-light tracking-wider uppercase text-sm">Framework Overview</span>
                  <div className="h-px w-full bg-accent mt-2" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  The Six Phases of EVOLVE
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                  A cyclical approach to AI product development that embraces
                  continuous learning and adaptation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {evolvePhases.map((phase, index) => (
                <div
                  key={index}
                  className="elegant-card border-l-4 border-l-accent hover:shadow-lg p-6 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      {phase.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-foreground mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed font-light">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Early Access Community Section */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-accent font-light tracking-wider uppercase text-sm">Early Access Program</span>
                  <div className="h-px w-full bg-accent mt-2" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  Join the EVOLVE Community
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                  Be among the first to access and apply the EVOLVE framework to
                  your AI initiatives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Benefits */}
              <div className="elegant-card border-l-4 border-l-accent p-6 space-y-4">
                <h3 className="text-xl font-light text-foreground mb-4">
                  Early Access Benefits
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <p className="text-muted-foreground font-light">
                      Preview chapters and frameworks as they&apos;re developed
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <p className="text-muted-foreground font-light">
                      Provide direct feedback that shapes the final content
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <p className="text-muted-foreground font-light">
                      Access exclusive templates and worksheets
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <p className="text-muted-foreground font-light">
                      Join a community of forward-thinking AI practitioners
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full" />
                    <p className="text-muted-foreground font-light">
                      Be acknowledged in the final publication
                    </p>
                  </li>
                </ul>
              </div>

              {/* Right side - Newsletter Signup */}
              <WaitingListForm itemAnimation={itemAnimation} />
            </div>
          </motion.section>

          <ContentsSection itemAnimation={itemAnimation} />

          {/* Quote Section */}
          <motion.section
            variants={itemAnimation}
            className="mb-20 text-center max-w-4xl mx-auto"
          >
            <div className="elegant-card border-l-4 border-l-accent p-8 md:p-12">
              <p className="text-2xl text-foreground italic mb-6 leading-relaxed font-light">
                &quot;The most meaningful evolution is not survival of the
                fittest but rather continuous adaptation to changing
                circumstances.&quot;
              </p>
              <p className="text-accent font-light">
                — EVOLVE Framework Philosophy
              </p>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            variants={itemAnimation}
            className="text-center text-muted-foreground pt-8 border-t border-border"
          >
            <p>© {new Date().getFullYear()} Binu Babu. All rights reserved.</p>
            <p className="mt-2">
              For inquiries:{" "}
              <a
                href="mailto:founder@socife.com"
                className="text-accent hover:text-accent/80 transition-colors duration-200"
              >
                binubabu@socife.com
              </a>
            </p>
          </motion.footer>
        </motion.div>
      </div>
      <QuickSurveyDialog
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
      />
    </div>
  );
};

export default EvolveComingSoon;
