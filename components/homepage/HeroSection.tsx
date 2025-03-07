"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Globe,
  Linkedin,
  ArrowUpRight,
  Calendar,
  Network,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeSwitcher } from "../theme-switcher";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* IBM-style grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(180deg,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Theme switcher in the top right */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 min-h-screen items-center pt-20 md:pt-0">
          {/* Left Column - Responsive padding for mobile */}
          <div className="md:col-span-8 space-y-12">
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
                AI Product Architect & Technology Consultant
              </p>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Leading technological innovation and AI integration at Bridge
                Global, with a proven track record of building future-ready
                solutions.
              </p>
            </motion.div>

            {/* IBM-style tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Badge className="px-4 py-2 bg-primary text-primary-foreground rounded-none transition-colors duration-200 hover:bg-primary/90">
                <Brain className="mr-2 h-4 w-4" />
                AI Specialist
              </Badge>
              <Badge className="px-4 py-2 bg-secondary text-secondary-foreground rounded-none transition-colors duration-200 hover:bg-secondary/90">
                <Globe className="mr-2 h-4 w-4" />
                Tech Leader
              </Badge>
            </motion.div>

            {/* Groot AI Multi-Agent System Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 border border-primary/20 bg-background relative group/card hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <Link href="/enquire" className="block">
                <div className="absolute top-0 right-0 w-1/2 h-1 bg-primary group-hover/card:w-full transition-all duration-300 ease-in-out" />
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full group-hover/card:bg-primary/20 transition-colors duration-300">
                    <Network className="h-6 w-6 text-primary group-hover/card:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <span>I&apos;m Groot</span>
                      <Badge className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-sm">
                        Binu&apos;s AI Assistant
                      </Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover/card:text-foreground/90 transition-colors duration-300">
                      I&apos;m a sophisticated graph-based multi-agent AI
                      system. I coordinate specialist AI agents to analyze
                      conversations, manage meetings, and provide technical
                      insights, all to streamline your interactions and help you
                      connect with Binu effectively.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 text-primary">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </Link>
            </motion.div>

            {/* IBM-style CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 flex flex-col sm:flex-row gap-6"
            >
              <a
                href="https://linkedin.com/in/binubdaniel"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-lg text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
                <span className="border-b-2 border-primary group-hover:border-primary/80">
                  Connect on LinkedIn
                </span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <Link
                href="/enquire"
                className="group inline-flex items-center justify-center gap-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 transition-colors duration-200 relative overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="font-medium">Schedule with Groot AI</span>
                <div className="absolute bottom-0 left-0 w-full h-1 opacity-30 bg-white/20" />
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-4 flex justify-center md:justify-end items-start"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 bg-primary transform rotate-3" />
              <div className="absolute inset-0 bg-background">
                <Image
                  src="/profile.jpg"
                  alt="Binu Babu"
                  fill
                  className="object-cover mix-blend-multiply dark:mix-blend-normal"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
