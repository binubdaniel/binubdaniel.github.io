"use client";
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Network, 
  ArrowRight, 
  Puzzle, 
  Layers, 
  BarChart, 
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeSwitcher } from '@/components/theme-switcher';

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

const EvolveComingSoon = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setEmail] = useState('');

  // Set launch date to August 15, 2025
  useEffect(() => {
    const target = new Date('2025-08-15T00:00:00');

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

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // Handle email submission logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  // Define the EVOLVE framework phases
  const evolvePhases = [
    { 
      icon: <Calendar className="h-6 w-6 text-primary" />, 
      title: "Explore", 
      description: "Find the right problem to solve with AI, one that creates genuine value and leverages AI's unique capabilities." 
    },
    { 
      icon: <CheckCircle className="h-6 w-6 text-primary" />, 
      title: "Validate", 
      description: "Test critical assumptions about data availability, technical feasibility, and user value before investing." 
    },
    { 
      icon: <Puzzle className="h-6 w-6 text-primary" />, 
      title: "Optimize", 
      description: "Build the foundation through data pipelines, model development, and infrastructure planning." 
    },
    { 
      icon: <Layers className="h-6 w-6 text-primary" />, 
      title: "Launch", 
      description: "Bring your AI system to life with thoughtful deployment strategies and monitoring systems." 
    },
    { 
      icon: <BarChart className="h-6 w-6 text-primary" />, 
      title: "Value", 
      description: "Measure what matters through multiple dimensions of impact, learning, and refinement." 
    },
    { 
      icon: <Lightbulb className="h-6 w-6 text-primary" />, 
      title: "Enhance", 
      description: "Evolve your system for lasting impact through continuous improvement and adaptation." 
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* IBM-style grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(180deg,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
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
          <motion.header variants={itemAnimation} className="text-center mb-16">
            <h1 className="font-mono text-5xl md:text-7xl font-medium text-foreground mb-4 tracking-tight">
              EVOLVE
            </h1>
            <p className="font-mono text-xl md:text-2xl text-primary max-w-3xl mx-auto">
              An Adaptive Framework with a New Mindset for AI Product Development
            </p>
            <div className="w-16 h-1 bg-primary mx-auto mt-8"></div>
          </motion.header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Book Information */}
            <motion.div variants={itemAnimation} className="lg:col-span-5 space-y-8">
              <h2 className="font-mono text-2xl font-medium text-foreground">
                About the Book
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">EVOLVE</span> presents a hypothesis for addressing the unique challenges of AI product development. 
                With AI project failure rates between 70% and 85%, traditional product development 
                approaches often fall short. This book introduces a new framework specifically designed 
                for the probabilistic nature of AI.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The EVOLVE framework is built on core principles that address common failure patterns 
                in AI initiatives. It embraces probability over certainty, centers data as a first-class 
                product component, and integrates ethical considerations throughout the development process.
              </p>

              {/* Author Information */}
              <div className="border-l-4 border-l-primary p-6 bg-card">
                <p className="font-mono text-foreground mb-2">By Binu Babu</p>
                <p className="text-muted-foreground">
                  AI Product Architect & Technology Consultant with extensive experience in developing 
                  innovative AI solutions across industries.
                </p>
              </div>

              <div className="flex items-center pt-4">
                <button className="group inline-flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200">
                  <span className="font-mono">Pre-order Now</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Countdown Timer Card */}
            <motion.div 
              variants={itemAnimation}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <div className="border-l-4 border-l-primary bg-card p-8">
                <h3 className="font-mono text-xl font-medium text-foreground mb-8 flex items-center gap-3">
                  <Network className="h-5 w-5 text-primary" />
                  <span>Book Launch Countdown</span>
                </h3>

                <div className="grid grid-cols-4 gap-4 text-center mb-8">
                  <div className="bg-secondary/10 p-6 flex flex-col items-center">
                    <div className="text-4xl font-mono font-bold text-primary mb-2">{days}</div>
                    <div className="text-muted-foreground text-sm">Days</div>
                  </div>
                  <div className="bg-secondary/10 p-6 flex flex-col items-center">
                    <div className="text-4xl font-mono font-bold text-primary mb-2">{hours}</div>
                    <div className="text-muted-foreground text-sm">Hours</div>
                  </div>
                  <div className="bg-secondary/10 p-6 flex flex-col items-center">
                    <div className="text-4xl font-mono font-bold text-primary mb-2">{minutes}</div>
                    <div className="text-muted-foreground text-sm">Minutes</div>
                  </div>
                  <div className="bg-secondary/10 p-6 flex flex-col items-center">
                    <div className="text-4xl font-mono font-bold text-primary mb-2">{seconds}</div>
                    <div className="text-muted-foreground text-sm">Seconds</div>
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <p className="text-muted-foreground">Sign up to be notified when the book launches:</p>
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email address"
                      className="flex-grow px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono px-6 py-3 transition-colors duration-200"
                    >
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Framework Overview Section */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <p className="font-mono text-primary mb-2">Framework Overview</p>
              <h2 className="font-mono text-3xl md:text-4xl font-medium text-foreground mb-4">
                The Six Phases of EVOLVE
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A cyclical approach to AI product development that embraces continuous learning and adaptation.
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

          {/* Early Access Section */}
          <motion.section 
            variants={itemAnimation}
            className="mb-20 border-l-4 border-l-primary bg-card p-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3 space-y-4">
                <h2 className="font-mono text-2xl font-medium text-foreground">
                  Join the Early Access Program
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Get exclusive access to early manuscript chapters, participate in framework testing, 
                  and help shape the final version of the book through your feedback and insights.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground text-sm">Preview chapters as they&apos;re completed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground text-sm">Provide feedback that shapes the final version</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground text-sm">Participate in exclusive discussion groups</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-primary" />
                    <p className="text-muted-foreground text-sm">Get acknowledged in the published book</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 flex items-center justify-center">
                <button className="group inline-flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200">
                  <span className="font-mono">Apply for Early Access</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.section>

          {/* Quote Section */}
          <motion.section 
            variants={itemAnimation}
            className="mb-20 text-center max-w-4xl mx-auto"
          >
            <div className="bg-secondary/10 p-8 md:p-12">
              <p className="text-2xl text-foreground italic mb-6 leading-relaxed">
                &quot;The most meaningful evolution is not survival of the fittest but rather continuous adaptation to changing circumstances.&quot;
              </p>
              <p className="font-mono text-primary">— EVOLVE Framework Philosophy</p>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer variants={itemAnimation} className="text-center text-muted-foreground pt-8 border-t border-border">
            <p>© {new Date().getFullYear()} Binu Babu. All rights reserved.</p>
            <p className="mt-2">
              For inquiries: <a href="mailto:info@evolveframework.com" className="text-primary hover:text-primary/80 transition-colors duration-200">info@evolveframework.com</a>
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
};

export default EvolveComingSoon;