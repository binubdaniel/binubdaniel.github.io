"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  ArrowRight,
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

  // Set launch date to June 14, 2025
  useEffect(() => {
    const target = new Date("2025-06-14T00:00:00");

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
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Explore",
      description:
        "Find the right problem to solve with AI, one that creates genuine value and leverages AI's unique capabilities.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Validate",
      description:
        "Test critical assumptions about data availability, technical feasibility, and user value before investing.",
    },
    {
      icon: <Puzzle className="h-6 w-6 text-primary" />,
      title: "Optimize",
      description:
        "Build the foundation through data pipelines, model development, and infrastructure planning.",
    },
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: "Launch",
      description:
        "Bring your AI system to life with thoughtful deployment strategies and monitoring systems.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Value",
      description:
        "Measure what matters through multiple dimensions of impact, learning, and refinement.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Enhance",
      description:
        "Evolve your system for lasting impact through continuous improvement and adaptation.",
    },
  ];

  // Define key benefits
  const keyBenefits = [
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Addresses AI's Unique Challenges",
      description:
        "Unlike traditional frameworks, EVOLVE tackles the probabilistic nature of AI systems, data dependencies, and ethical considerations.",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      title: "Reduce AI Project Failures",
      description:
        "Learn practical approaches to avoid the common pitfalls that lead to 70-85% of AI initiatives failing to meet expectations.",
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Cross-Functional Collaboration",
      description:
        "Bridge the gap between technical teams, product managers, and business stakeholders with shared language and processes.",
    },
    {
      icon: <Star className="h-5 w-5 text-primary" />,
      title: "Real-World Application",
      description:
        "Frameworks, tools, and templates you can immediately apply to your AI initiatives for better outcomes.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* IBM-style grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(180deg,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
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
            className="text-center mt-16 mb-16"
          >
            <h1 className="font-mono text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
              EVOLVE
            </h1>
            <p className="font-mono text-xl md:text-2xl text-primary max-w-3xl mx-auto">
              An Adaptive Framework with a New Mindset for AI Product
              Development
            </p>
          </motion.header>

          <motion.div
            variants={itemAnimation}
            className="lg:col-span-7 flex flex-col justify-center items-center text-center gap-8"
          >
            <div className=" bg-card p-8">
              <h3 className="font-mono text-3xl font-medium text-foreground mb-8 flex items-center justify-center gap-3">
                <span>Book Launch Countdown</span>
              </h3>

              <div className="grid grid-cols-4 gap-8 text-center mb-8">
                <div className="bg-secondary/10 p-6 flex flex-col items-center">
                  <div className="text-4xl font-mono font-bold text-primary mb-2">
                    {days}
                  </div>
                  <div className="text-muted-foreground text-sm">Days</div>
                </div>
                <div className="bg-secondary/10 p-6 flex flex-col items-center">
                  <div className="text-4xl font-mono font-bold text-primary mb-2">
                    {hours}
                  </div>
                  <div className="text-muted-foreground text-sm">Hours</div>
                </div>
                <div className="bg-secondary/10 p-6 flex flex-col items-center">
                  <div className="text-4xl font-mono font-bold text-primary mb-2">
                    {minutes}
                  </div>
                  <div className="text-muted-foreground text-sm">Minutes</div>
                </div>
                <div className="bg-secondary/10 p-6 flex flex-col items-center">
                  <div className="text-4xl font-mono font-bold text-primary mb-2">
                    {seconds}
                  </div>
                  <div className="text-muted-foreground text-sm">Seconds</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className=" gap-12 mb-20">
            {/* Book Information */}
            <motion.div
              variants={itemAnimation}
              className="lg:col-span-5 space-y-8"
            >
              <h2 className="font-mono text-2xl font-medium text-foreground">
                About the Book
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">EVOLVE</span>{" "}
                presents a hypothesis for addressing the unique challenges of AI
                product development. With AI project failure rates between 70%
                and 85%, traditional product development approaches often fall
                short. This book introduces a new framework specifically
                designed for the probabilistic nature of AI.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The EVOLVE framework is built on core principles that address
                common failure patterns in AI initiatives. It embraces
                probability over certainty, centers data as a first-class
                product component, and integrates ethical considerations
                throughout the development process.
              </p>

              {/* Who is this book for */}
              <div className="space-y-4">
                <h3 className="font-mono text-lg font-medium text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Who Should Read This Book
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      Product Managers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      Data Scientists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      ML Engineers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      Technical Leaders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      AI Strategists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      Innovation Teams
                    </span>
                  </li>
                </ul>
              </div>

              {/* Author Information */}
              <div className="border-l-4 border-l-primary p-6 bg-card">
                <Link href="/">
                  <div className="flex gap-1">
                    <h3 className="font-mono font-semibold text-lg text-primary">
                      Binu B Daniel
                    </h3>{" "}
                    <ArrowUpRightFromSquare className="w-3 h-3 text-primary " />
                  </div>
                  <p className="text-muted-foreground">
                    AI Product Architect & Technology Consultant with extensive
                    experience in developing innovative AI solutions across
                    industries.
                  </p>
                </Link>
              </div>

              <div className="flex items-center pt-4">
                <WaitingListForm itemAnimation={itemAnimation} />
               
              </div>
            </motion.div>

            {/* Countdown Timer Card */}
          </div>

          {/* Key Benefits Section */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <p className="font-mono text-primary mb-2">Why Read EVOLVE</p>
              <h2 className="font-mono text-3xl md:text-4xl font-medium text-foreground mb-4">
                Key Benefits
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Practical insights and actionable frameworks to transform your
                AI product development approach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="border-l-4 border-l-primary p-6 bg-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-medium text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
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
              <p className="font-mono text-primary mb-2">Framework Overview</p>
              <h2 className="font-mono text-3xl md:text-4xl font-medium text-foreground mb-4">
                The Six Phases of EVOLVE
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A cyclical approach to AI product development that embraces
                continuous learning and adaptation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {evolvePhases.map((phase, index) => (
                <div
                  key={index}
                  className="border-l-4 border-l-primary bg-card hover:bg-secondary/20 p-6 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {phase.icon}
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-medium text-foreground mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
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
              <p className="font-mono text-primary mb-2">
                Early Access Program
              </p>
              <h2 className="font-mono text-3xl md:text-4xl font-medium text-foreground mb-4">
                Join the EVOLVE Community
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Be among the first to access and apply the EVOLVE framework to
                your AI initiatives.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Benefits */}
              <div className="border-l-4 border-l-primary p-6 bg-card space-y-4">
                <h3 className="font-mono text-xl font-medium text-foreground mb-4">
                  Early Access Benefits
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground">
                      Preview chapters and frameworks as they&apos;re developed
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground">
                      Provide direct feedback that shapes the final content
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground">
                      Access exclusive templates and worksheets
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground">
                      Join a community of forward-thinking AI practitioners
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground">
                      Be acknowledged in the final publication
                    </p>
                  </li>
                </ul>
              </div>

              {/* Right side - Newsletter Signup */}
              <WaitingListForm itemAnimation={{}}  />

            </div>
          </motion.section>

          {/* Quote Section */}
          <motion.section
            variants={itemAnimation}
            className="mb-20 text-center max-w-4xl mx-auto"
          >
            <div className="bg-secondary/10 p-8 md:p-12">
              <p className="text-2xl text-foreground italic mb-6 leading-relaxed">
                &quot;The most meaningful evolution is not survival of the
                fittest but rather continuous adaptation to changing
                circumstances.&quot;
              </p>
              <p className="font-mono text-primary">
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
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                binubabu@socife.com
              </a>
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
};

export default EvolveComingSoon;
