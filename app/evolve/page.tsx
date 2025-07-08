"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Home,
  Users,
  Star,
  Zap,
  ArrowUpRightFromSquare,
  Eye,
  FlaskConical,
  Hammer,
  Compass,
  Search,
  Sprout
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeSwitcher } from "@/components/theme-switcher";


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

  // Set launch date to September 14, 2025
  useEffect(() => {
    const target = new Date("2025-09-14T00:00:00");

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

  // Define the mindset-driven phases
  const mindsetPhases = [
    {
      icon: <Eye className="h-6 w-6 text-accent" />,
      mindset: "Explorer Mindset",
      phase: "Explore",
      description: "Think like an explorer to discover AI opportunities that others miss through systematic curiosity and adventure.",
    },
    {
      icon: <FlaskConical className="h-6 w-6 text-accent" />,
      mindset: "Scientist Mindset",
      phase: "Validate", 
      description: "Think like a scientist to build bulletproof confidence through rigorous testing and evidence-based validation.",
    },
    {
      icon: <Hammer className="h-6 w-6 text-accent" />,
      mindset: "Architect Mindset",
      phase: "Optimize",
      description: "Think like an architect to create AI systems that scale from prototype to production reality.",
    },
    {
      icon: <Compass className="h-6 w-6 text-accent" />,
      mindset: "Navigator Mindset", 
      phase: "Launch",
      description: "Think like a navigator to safely cross the production chasm and bring AI systems to life.",
    },
    {
      icon: <Search className="h-6 w-6 text-accent" />,
      mindset: "Detective Mindset",
      phase: "Value",
      description: "Think like a detective to uncover the truth about what your AI is really accomplishing.",
    },
    {
      icon: <Sprout className="h-6 w-6 text-accent" />,
      mindset: "Gardener Mindset",
      phase: "Enhance", 
      description: "Think like a gardener to cultivate AI value that compounds and grows sustainably over time.",
    },
  ];

  // Define key benefits
  const keyBenefits = [
    {
      icon: <Zap className="h-5 w-5 text-accent" />,
      title: "Transform Your Thinking First",
      description:
        "Discover how the right mindset at each stage creates breakthrough results where traditional methods fail.",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-accent" />,
      title: "Learn From Real Success Stories", 
      description:
        "Explore actual transformation stories from teams who learned to think differently about AI product development.",
    },
    {
      icon: <Users className="h-5 w-5 text-accent" />,
      title: "Bridge Technical and Business Worlds",
      description:
        "Master the mindset-method combinations that help technical teams and business stakeholders work together effectively.",
    },
    {
      icon: <Star className="h-5 w-5 text-accent" />,
      title: "Apply Insights Immediately",
      description:
        "Start transforming your approach today with mindset shifts and practical tools you can use right away.",
    },
  ];

  // Updated chapter data reflecting the new storytelling approach
  const chapters = [
    {
      number: "Intro",
      title: "The Moment Everything Changed",
      description: "The personal story of discovering why brilliant teams fail and what the successful ones do differently."
    },
    {
      number: "1", 
      title: "How Thinking Like an Explorer Changes Everything About Finding AI Opportunities",
      description: "The transformation story of a team that broke free from conventional thinking to discover revolutionary possibilities."
    },
    {
      number: "2",
      title: "How Thinking Like a Scientist Saves You From Expensive Mistakes", 
      description: "Following teams who learned to build bulletproof confidence through rigorous validation before investing millions."
    },
    {
      number: "3",
      title: "How Thinking Like an Architect Creates AI Systems That Actually Scale",
      description: "The journey from prototype to production reality through architectural thinking that prevents costly failures."
    },
    {
      number: "4", 
      title: "How Thinking Like a Navigator Gets Your AI Safely to Shore",
      description: "Transformation stories of teams who learned to navigate the treacherous waters between development and production."
    },
    {
      number: "5",
      title: "How Thinking Like a Detective Reveals What Your AI Is Really Accomplishing",
      description: "Discovery stories of teams who learned to uncover the truth about AI value beyond surface metrics."
    },
    {
      number: "6",
      title: "How Thinking Like a Gardener Grows AI Value That Compounds Over Time", 
      description: "The wisdom of teams who learned to cultivate sustainable AI success through patient, systematic growth."
    },
    {
      number: "7",
      title: "Your Journey to AI Product Mastery",
      description: "Developing fluency across all mindsets and learning to flow between them as your AI initiatives evolve."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground relative">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="absolute top-4 right-16 z-10 p-2">
        <Link href="/">
          <Home size={20} className="text-muted-foreground" />
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
                <h1 className="relative text-5xl md:text-7xl font-light text-foreground tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite]">
                    The AI Product Mindset
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light">
                  How to Build Successful AI Products Using the <span className="text-accent font-medium">EVOLVE</span> Approach
                </p>
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
                  className="text-lg md:text-xl text-foreground font-light max-w-4xl mx-auto leading-relaxed"
                >
                  Through working with dozens of AI teams across industries, I discovered that{" "}
                  <span className="text-accent font-medium">mindset precedes method</span>.{" "}
                  This book reveals the six mindset-method pairs that transform AI product development.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="flex justify-center gap-8 text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span>Real Transformation Stories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                    <span>Mindset-Driven Methods</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                    <span>Immediate Application</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.header>

          {/* Core Discovery Section */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="relative bg-gradient-to-br from-card/80 via-card to-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-8 md:p-12">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-light text-foreground">
                    The Discovery That Changes Everything
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-3xl mx-auto font-light leading-relaxed">
                    The same team using the same framework would succeed with one AI project and fail with another. 
                    The difference wasn&apos;t the method, it was the <span className="text-accent font-medium">mental model</span> they brought to each phase.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <Users className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-light text-foreground">Teams with Great Tools</h3>
                    <p className="text-sm text-muted-foreground font-light">But wrong thinking patterns fail</p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <Zap className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-light text-foreground">Teams with Mediocre Tools</h3>
                    <p className="text-sm text-muted-foreground font-light">But right thinking patterns succeed</p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <Star className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-light text-foreground">The Breakthrough Insight</h3>
                    <p className="text-sm text-muted-foreground font-light">Six mindset-method pairs that transform outcomes</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Countdown Section */}
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
                    <span className="text-sm font-light text-accent uppercase tracking-wider">Coming September 2025</span>
                  </motion.div>
                  
                  <h3 className="text-3xl md:text-4xl font-light text-foreground">
                    The Future of AI Development
                    <span className="block text-xl text-accent mt-2">Launches in</span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: days, label: "Days" },
                    { value: hours, label: "Hours" },
                    { value: minutes, label: "Minutes" },
                    { value: seconds, label: "Seconds" }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.label}
                      className="group relative overflow-hidden bg-gradient-to-b from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative text-center">
                        <div className="text-4xl md:text-5xl font-light text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                          {item.value}
                        </div>
                        <div className="text-muted-foreground text-sm font-light uppercase tracking-wider">{item.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Key Benefits Section */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-accent font-light tracking-wider uppercase text-sm">Why This Book Matters</span>
                  <div className="h-px w-full bg-accent mt-2" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  Transform Your AI Success Rate
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                  Learn the mindset-method combinations that distinguish successful AI teams from those that struggle.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="elegant-card border-l-4 border-l-accent p-6 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2 }}
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
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Mindset-Method Framework Overview */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-accent font-light tracking-wider uppercase text-sm">The EVOLVE Approach</span>
                  <div className="h-px w-full bg-accent mt-2" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  Six Mindset-Method Pairs That Transform Results
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                  Each phase of AI development comes alive when driven by its corresponding mindset. 
                  Here&apos;s how the right thinking transforms outcomes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mindsetPhases.map((phase, index) => (
                <motion.div
                  key={index}
                  className="group elegant-card border-l-4 border-l-accent hover:shadow-xl p-6 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors duration-300">
                      {phase.icon}
                    </div>
                    <div>
                      <div className="mb-2">
                        <h3 className="text-lg font-medium text-accent">
                          {phase.mindset}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light">
                          {phase.phase} Phase
                        </p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed font-light text-sm">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contents Preview Section */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-accent font-light tracking-wider uppercase text-sm">Book Preview</span>
                  <div className="h-px w-full bg-accent mt-2" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  Your Transformation Journey
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                  Follow the interconnected stories that reveal how mindset changes everything about AI product success.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chapters.map((chapter, index) => (
                <motion.div 
                  key={index} 
                  className="group elegant-card border-l-4 border-l-accent p-6 hover:shadow-xl transition-all duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.25, 0.4, 0.25, 1]
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <motion.div 
                      className="bg-accent/10 p-3 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 md:self-center group-hover:bg-accent/20 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="font-light text-accent text-sm">{chapter.number}</span>
                    </motion.div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-light text-foreground group-hover:text-accent transition-colors duration-300 leading-snug">
                        {chapter.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed font-light text-sm group-hover:text-foreground/80 transition-colors duration-300">
                        {chapter.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Who This Book Is For */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="text-center mb-12">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-accent font-light tracking-wider uppercase text-sm">For Practitioners</span>
                  <div className="h-px w-full bg-accent mt-2" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  Who Should Read This Book
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "AI Product Managers",
                "Engineering Leaders", 
                "Data Scientists",
                "ML Engineers",
                "UX Designers",
                "AI Strategists",
                "Innovation Teams",
                "Technical Leaders",
                "Executives"
              ].map((role, index) => (
                <div key={index} className="elegant-card border-l-4 border-l-accent p-4 text-center">
                  <span className="text-foreground font-light">{role}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Author Information */}
          <motion.section variants={itemAnimation} className="mb-20">
            <div className="elegant-card border-l-4 border-l-accent p-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-light text-accent">BB</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-light text-accent mb-1">Binu B Daniel</h3>
                    <p className="text-muted-foreground font-light">Author & AI Product Architect</p>
                  </div>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Technology consultant with extensive experience developing innovative AI solutions across industries. 
                    Through working with dozens of AI teams, I discovered the mindset-method patterns that distinguish 
                    successful projects from those that struggle.
                  </p>
                  <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200">
                    <span className="text-sm">Learn more</span>
                    <ArrowUpRightFromSquare className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section variants={itemAnimation} className="mb-20 text-center">
            <div className="elegant-card border-l-4 border-l-accent p-8 md:p-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  Transform Your AI Development Approach
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                  Join thousands of practitioners preparing to revolutionize how they think about and build AI products.
                </p>
                <motion.button
                  className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-light hover:bg-accent/90 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join the Waiting List
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* Quote Section */}
          <motion.section
            variants={itemAnimation}
            className="mb-20 text-center max-w-4xl mx-auto"
          >
            <div className="elegant-card border-l-4 border-l-accent p-8 md:p-12">
              <p className="text-2xl text-foreground italic mb-6 leading-relaxed font-light">
                &quot;The most profound discoveries come not from learning new methods, 
                but from thinking about familiar problems in fundamentally new ways.&quot;
              </p>
              <p className="text-accent font-light">
                - The AI Product Mindset
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
                href="mailto:binubabu@socife.com"
                className="text-accent hover:text-accent/80 transition-colors duration-200"
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