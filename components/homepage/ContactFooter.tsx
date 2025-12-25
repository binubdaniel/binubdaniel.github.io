"use client";

import React from 'react';
import { ArrowUpRight, ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
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

interface ElegantButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  icon?: React.ReactNode;
}

const ElegantButton: React.FC<ElegantButtonProps> = ({ 
  href, 
  children, 
  variant = "primary",
  icon
}) => (
  <motion.a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className={`
      group inline-flex items-center gap-3 px-8 py-4 font-light transition-all duration-300
      ${variant === "primary" 
        ? "bg-foreground text-background hover:bg-foreground/80" 
        : variant === "secondary"
        ? "bg-transparent text-foreground hover:bg-foreground hover:text-background border border-foreground"
        : "bg-muted text-foreground hover:bg-foreground hover:text-background"}
    `}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {icon && <span>{icon}</span>}
    <span>{children}</span>
    {variant === "primary" ? (
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    ) : (
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    )}
  </motion.a>
);

export const ContactSection = () => {
  return (
    <section className="relative bg-background py-32">
      {/* Minimal background */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-foreground font-light tracking-wider uppercase text-sm">Contact</span>
                <div className="h-px w-full bg-foreground mt-2" />
              </div>
              <h2 className="text-5xl md:text-6xl font-thin text-foreground">
                Looking for an AI Strategy Partner?
              </h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
                Helping CEOs, Founders, and Product Leaders architect the next generation of AI-native products. Secure your strategy consultation below.
              </p>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center items-center gap-6"
          >
            <ElegantButton 
              href="https://calendar.app.google/8aUmjsXDvFni8wF38" 
              variant="primary"
              icon={<Calendar className="h-5 w-5" />}
            >
              Book a Strategy Call
            </ElegantButton>
            <ElegantButton 
              href="https://linkedin.com/in/binubdaniel" 
              variant="secondary"
              icon={<MessageCircle className="h-5 w-5" />}
            >
              LinkedIn
            </ElegantButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          {/* Main Footer Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-foreground">
              Binu Babu
            </h3>
            <div className="h-px w-16 bg-foreground mx-auto" />
            <p className="text-muted-foreground font-light">
              AI Product Architect & Technology Consultant
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground font-light">
              © {currentYear} Binu Babu. Crafting the future of AI products with precision and purpose.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

