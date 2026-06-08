"use client";

import { Badge } from "@/components/ui/badge";
import {
  Linkedin,
  ArrowRight,
  Workflow,
  Gauge,
  CalendarCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative min-h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full py-20"
        >
          {/* Left Column */}
          <div className="space-y-10">
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
                  AI Product Manager @Techjays
                </p>
                <p className="text-lg text-foreground max-w-2xl leading-relaxed font-light">
                  Most AI products stall in the gap between a working demo and
                  something you can ship. I help founders and product leaders
                  close it, building agentic systems that are reliable,
                  defensible, and genuinely production grade. The moat was never
                  the model. It is the orchestration around it.
                </p>
              </motion.div>
            </motion.div>

            {/* What I work on */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Badge className="px-4 py-2 bg-foreground text-background border border-foreground rounded-none font-light hover:bg-foreground/80 transition-all duration-300">
                <Workflow className="mr-2 h-4 w-4" />
                Agentic Systems
              </Badge>
              <Badge className="px-4 py-2 bg-transparent text-foreground border border-foreground rounded-none font-light hover:bg-foreground hover:text-background transition-all duration-300">
                <Target className="mr-2 h-4 w-4" />
                AI Product Strategy
              </Badge>
              <Badge className="px-4 py-2 bg-transparent text-foreground border border-foreground rounded-none font-light hover:bg-foreground hover:text-background transition-all duration-300">
                <Gauge className="mr-2 h-4 w-4" />
                Evals &amp; Reliability
              </Badge>
              <Badge className="px-4 py-2 bg-transparent text-foreground border border-foreground rounded-none font-light hover:bg-foreground hover:text-background transition-all duration-300">
                <TrendingUp className="mr-2 h-4 w-4" />
                0&rarr;1 to Scale
              </Badge>
            </motion.div>

            {/* CTAs: primary action first, secondary links demoted to a
                quieter second row that wraps cleanly on small screens. */}
            <motion.div variants={itemVariants} className="space-y-5">
              <div>
                <a
                  href="https://calendar.app.google/8aUmjsXDvFni8wF38"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 whitespace-nowrap bg-foreground px-8 py-4 font-light text-background transition-all duration-300 hover:bg-foreground/80"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <Link
                  href="/product-playbook"
                  className="font-light transition-colors duration-300 hover:text-foreground"
                >
                  Playbook
                </Link>
                <span aria-hidden className="h-3.5 w-px bg-border" />
                <a
                  href="https://linkedin.com/in/binubdaniel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-light transition-colors duration-300 hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
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
                  <h4 className="text-sm font-light text-foreground mb-2">
                    Let&apos;s connect
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    If you are stuck between a promising prototype and a real
                    product, that is exactly where I like to work.
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
