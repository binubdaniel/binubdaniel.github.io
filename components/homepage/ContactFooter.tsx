"use client";

import React from 'react';
import { ArrowUpRight, ArrowRight, Bot, Mail, MessageCircle } from "lucide-react";
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
      group inline-flex items-center gap-3 px-6 py-4 rounded-full font-light transition-all duration-300 hover:shadow-lg
      ${variant === "primary" 
        ? "bg-accent text-accent-foreground hover:bg-accent/90" 
        : variant === "secondary"
        ? "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 border border-secondary/20"
        : "bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20"}
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
    <section className="relative bg-gradient-to-br from-background via-background to-muted/10 py-24">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-accent font-light tracking-wider uppercase text-sm">Contact</span>
                <div className="h-px w-full bg-accent mt-2" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Let&apos;s Build Something Amazing
              </h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
                Available for consulting and technical leadership opportunities. Let&apos;s discuss how we can transform your ideas into reality.
              </p>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center items-center gap-6"
          >
            <ElegantButton 
              href="mailto:binubabu@socife.com" 
              variant="primary"
              icon={<Mail className="h-5 w-5" />}
            >
              Get in Touch
            </ElegantButton>
            <ElegantButton 
              href="https://linkedin.com/in/binubdaniel" 
              variant="secondary"
              icon={<MessageCircle className="h-5 w-5" />}
            >
              LinkedIn
            </ElegantButton>
            <ElegantButton 
              href="/enquire" 
              variant="tertiary"
              icon={<Bot className="h-5 w-5" />}
            >
              Chat with Groot Assistant
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
    <footer className="bg-gradient-to-r from-card via-muted/5 to-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
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
            <div className="h-px w-16 bg-accent mx-auto" />
            <p className="text-muted-foreground font-light">
              AI Product Architect & Technology Consultant
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground font-light">
              © {currentYear} Binu Babu. Crafting the future of AI products with precision and purpose.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

