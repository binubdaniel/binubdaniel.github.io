"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Linkedin,
  Calendar,
  BookOpen,
  ArrowRight,
  Code,
  Zap,
  Rocket,
  CalendarCheck,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeSwitcher } from "../theme-switcher";
import Link from "next/link";

const HeroSection = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const bookPhrases = [
    "Transform how you build AI products",
    "70-85% of AI projects fail. Yours doesn't have to.",
    "A new mindset for a new technology",
    "From concept to continuous value"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % bookPhrases.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [bookPhrases.length]);

  // Google Calendar appointment URL
  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rO2EGQWPlDm9BkvW3xAcBBf8MRuJ7MbaBAQFkn99voBUOjnEOXc0WVL2l9jdHkgJIioCGX_s5";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8
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

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      {/* Floating elements */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 right-20 opacity-10 dark:opacity-20"
      >
        <Sparkles className="h-8 w-8 text-accent" />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.5 }}
        className="absolute bottom-32 left-20 opacity-10 dark:opacity-20"
      >
        <Brain className="h-6 w-6 text-accent" />
      </motion.div>

      {/* Theme switcher */}
      <div className="absolute top-8 right-8 z-10">
        <ThemeSwitcher />
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative min-h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full py-20"
        >
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground">
                  Binu Babu
                </h1>
                <div className="h-px w-24 bg-accent" />
                <p className="text-xl md:text-2xl text-accent font-light">
                  AI Product Architect & Technology Consultant
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-light">
                  Pioneering the future of AI product development with innovative frameworks and practical methodologies that transform how organizations build intelligent systems.
                </p>
              </motion.div>
            </motion.div>

            {/* Expertise Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Badge className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-full font-light hover:bg-accent/20 transition-all duration-300">
                <Brain className="mr-2 h-4 w-4" />
                AI Strategy
              </Badge>
              <Badge className="px-4 py-2 bg-secondary/50 text-secondary-foreground border border-secondary/20 rounded-full font-light hover:bg-secondary/70 transition-all duration-300">
                <Code className="mr-2 h-4 w-4" />
                Technical Leadership
              </Badge>
              <Badge className="px-4 py-2 bg-secondary/50 text-secondary-foreground border border-secondary/20 rounded-full font-light hover:bg-secondary/70 transition-all duration-300">
                <BookOpen className="mr-2 h-4 w-4" />
                Framework Author
              </Badge>
              <Badge className="px-4 py-2 bg-secondary/50 text-secondary-foreground border border-secondary/20 rounded-full font-light hover:bg-secondary/70 transition-all duration-300">
                <Zap className="mr-2 h-4 w-4" />
                Innovation Catalyst
              </Badge>
            </motion.div>

            {/* Book Promotion */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="elegant-card p-8 border-l-4 border-l-accent">
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground mb-2">EVOLVE Framework</h3>
                    <motion.p
                      key={currentPhrase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="text-accent font-medium text-lg"
                    >
                      {bookPhrases[currentPhrase]}
                    </motion.p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <p className="text-muted-foreground leading-relaxed">
                    A revolutionary approach to AI product development that addresses the unique challenges
                    of building systems with probabilistic outputs and complex data dependencies. Designed for product
                    managers, data scientists, and technical leaders working on AI initiatives.
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href="/evolve" 
                    className="inline-flex items-center gap-3 bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-full font-light transition-all duration-300 hover:shadow-lg"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Rocket className="h-4 w-4 text-accent" />
                    <span>August 2025</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8"
            >
              <a
                href="https://linkedin.com/in/binubdaniel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-accent hover:text-accent/80 transition-all duration-300 font-light"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect</span>
              </a>

              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-full font-light transition-all duration-300 hover:shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Appointment</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-8"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative w-80 h-80 md:w-96 md:h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3 blur-sm" />
              <div className="absolute inset-0 bg-card rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Binu Babu"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Book Preview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden lg:block elegant-card p-6 max-w-sm border-l-4 border-l-accent"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/10 rounded-full">
                  <CalendarCheck className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Book Launch: August 2025</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Be among the first to apply the EVOLVE framework to your AI initiatives.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;