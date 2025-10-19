"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Linkedin,
  ArrowRight,
  Zap,
  Rocket,
  CalendarCheck,
  Target,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeSwitcher } from "../theme-switcher";

const HeroSection = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const bookPhrases = [
    "Build defensible AI products",
    "From concept to market success", 
    "Strategic AI product development",
    "Limited availability this quarter"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % bookPhrases.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [bookPhrases.length]);

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


  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Theme switcher */}
      <div className="absolute top-8 right-8 z-10">
        <ThemeSwitcher />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative min-h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full py-20"
        >
          {/* Left Column */}
          <div className="space-y-12">
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-6xl md:text-8xl font-thin tracking-tight text-foreground">
                  Binu Babu
                </h1>
                <div className="h-px w-32 bg-foreground" />
                <p className="text-xl md:text-2xl text-muted-foreground font-light">
                  AI Product Architect & Technology Consultant
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-light">
                  Building AI products that create competitive moats and drive real business value. 
                  <span className="text-foreground font-medium">70% of AI products fail. Yours doesn&apos;t have to.</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Expertise Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Badge className="px-4 py-2 bg-foreground text-background border border-foreground rounded-none font-light hover:bg-foreground/80 transition-all duration-300">
                <Target className="mr-2 h-4 w-4" />
                Product Strategy
              </Badge>
              <Badge className="px-4 py-2 bg-transparent text-foreground border border-foreground rounded-none font-light hover:bg-foreground hover:text-background transition-all duration-300">
                <TrendingUp className="mr-2 h-4 w-4" />
                Growth & Scale
              </Badge>
              <Badge className="px-4 py-2 bg-transparent text-foreground border border-foreground rounded-none font-light hover:bg-foreground hover:text-background transition-all duration-300">
                <Rocket className="mr-2 h-4 w-4" />
                Go-to-Market
              </Badge>
              <Badge className="px-4 py-2 bg-transparent text-foreground border border-foreground rounded-none font-light hover:bg-foreground hover:text-background transition-all duration-300">
                <Zap className="mr-2 h-4 w-4" />
                Market Research
              </Badge>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-light text-foreground">AI Product Consulting</h3>
                <motion.p
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-foreground font-medium text-lg"
                >
                  {bookPhrases[currentPhrase]}
                </motion.p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Proven track record of delivering AI products that create defensible moats, 
                drive sustainable growth, and establish market leadership through strategic 
                product development and data-driven decision making.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                <a
                  href="mailto:binubabu@socife.com?subject=AI Product Strategy Inquiry&body=Hi Binu,%0D%0A%0D%0AI'm interested in discussing AI product strategy for our organization.%0D%0A%0D%0APlease let me know about availability and next steps.%0D%0A%0D%0AThank you!"
                  className="inline-flex items-center gap-3 bg-foreground text-background hover:bg-foreground/80 px-8 py-4 font-light transition-all duration-300"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                
                <a
                  href="/product-playbook"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 font-light"
                >
                  <span>Product Playbook</span>
                </a>
                
                <a
                  href="https://linkedin.com/in/binubdaniel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 font-light"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center lg:items-end space-y-8"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative w-80 h-80 md:w-96 md:h-96"
            >
              <div className="absolute inset-0 bg-muted/10 transform rotate-1 blur-sm" />
              <div className="absolute inset-0 border border-border overflow-hidden">
                <Image
                  src="/binub.jpg"
                  alt="Binu Babu"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden lg:block border border-border p-6 max-w-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted">
                  <CalendarCheck className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-light text-foreground mb-2">Available for Consulting</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Ready to help transform your AI product development approach.
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