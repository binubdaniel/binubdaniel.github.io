import React  from 'react';
import { Badge } from "@/components/ui/badge";
import { Brain, Globe, Linkedin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/* IBM-style grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
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
              <p className="font-mono text-xl md:text-2xl text-blue-400">
                AI Product Architect & Technology Consultant
              </p>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
                Leading technological innovation and AI integration at Bridge Global, 
                with a proven track record of building future-ready solutions.
              </p>
            </motion.div>

            {/* IBM-style tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Badge className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-none transition-colors duration-200">
                <Brain className="mr-2 h-4 w-4" />
                AI Specialist
              </Badge>
              <Badge className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-none transition-colors duration-200">
                <Globe className="mr-2 h-4 w-4" />
                Tech Leader
              </Badge>
            </motion.div>

            {/* IBM-style CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6"
            >
              <a
                href="https://linkedin.com/in/binubdaniel"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
                <span className="border-b-2 border-blue-400 group-hover:border-blue-300">
                  Connect on LinkedIn
                </span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
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
              <div className="absolute inset-0 bg-blue-600 transform rotate-3" />
              <div className="absolute inset-0 bg-white/90 dark:bg-black/90">
                <Image
                  src="/picture.png"
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