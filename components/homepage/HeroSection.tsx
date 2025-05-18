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
  CalendarCheck
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
  }, []);

  // Google Calendar appointment URL
  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rO2EGQWPlDm9BkvW3xAcBBf8MRuJ7MbaBAQFkn99voBUOjnEOXc0WVL2l9jdHkgJIioCGX_s5";

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* IBM-style grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(180deg,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Theme switcher in the top right */}
      <div className="absolute top-2 right-4 z-10">
        <ThemeSwitcher />
      </div>

      <div className="container max-w-7xl py-10 mx-auto px-6 relative h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 min-h-screen items-center pt-20 md:pt-0">
          {/* Left Column */}
          <div className="md:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="font-mono text-4xl md:text-6xl font-medium tracking-tight">
                Binu Babu
              </h1>
              <p className="font-mono text-xl md:text-2xl text-primary">
                AI Product Architect & Author
              </p>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Pioneering the future of AI product development with innovative frameworks and practical methodologies that transform how organizations build intelligent systems.
              </p>
            </motion.div>

            {/* Expertise Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <Badge className="px-3 py-1.5 bg-primary text-primary-foreground rounded-none transition-colors duration-200 hover:bg-primary/90">
                <Brain className="mr-2 h-4 w-4" />
                AI Strategy
              </Badge>
              <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-none transition-colors duration-200 hover:bg-secondary/90">
                <Code className="mr-2 h-4 w-4" />
                Technical Leadership
              </Badge>
              <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-none transition-colors duration-200 hover:bg-secondary/90">
                <BookOpen className="mr-2 h-4 w-4" />
                Framework Author
              </Badge>
              <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-none transition-colors duration-200 hover:bg-secondary/90">
                <Zap className="mr-2 h-4 w-4" />
                Innovation Catalyst
              </Badge>
            </motion.div>

            {/* Book Promotion - Aligned with screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="border-l-4 border-l-primary p-6">
                <div className="flex items-start gap-4 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-mono text-lg font-medium text-foreground">EVOLVE Framework</h3>
                </div>
                
                <div className="mb-4">
                  <p className="text-primary font-medium">
                    {bookPhrases[currentPhrase]}
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    A revolutionary approach to AI product development that addresses the unique challenges
                    of building systems with probabilistic outputs and complex data dependencies. Designed for product
                    managers, data scientists, and technical leaders working on AI initiatives.
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href="/evolve" 
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 transition-colors duration-200"
                  >
                    <span className="font-mono">Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Rocket className="h-4 w-4 text-primary" />
                    <span>June 2025</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6"
            >
              <a
                href="https://linkedin.com/in/binubdaniel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect</span>
              </a>

              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 transition-colors duration-200"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Meeting</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-5 flex flex-col items-center md:items-end space-y-8"
          >
            {/* Profile Image */}
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 bg-primary transform rotate-3" />
              <div className="absolute inset-0 bg-background">
                <Image
                  src="/profile.jpg"
                  alt="Binu Babu"
                  fill
                  className="object-cover mix-blend-multiply dark:mix-blend-normal grayscale"
                  priority
                />
              </div>
            </div>
            
            {/* Book Preview Card - Only visible on medium screens and up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="hidden md:block relative bg-card border-l-4 border-l-primary p-4 max-w-xs"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded-full">
                  <CalendarCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Book Launch: June 2025</h4>
                  <p className="text-xs text-muted-foreground">
                    Be among the first to apply the EVOLVE
                    framework to your AI initiatives.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;