"use client";

import React from 'react';
import { ArrowUpRight, ArrowRight, Bot } from "lucide-react";
import { motion } from "framer-motion";

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

interface IBMButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  icon?: React.ReactNode;
}

const IBMButton: React.FC<IBMButtonProps> = ({ 
  href, 
  children, 
  variant = "primary",
  icon
}) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className={`
      group inline-flex items-center gap-3 px-6 py-4 transition-colors duration-200
      ${variant === "primary" 
        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
        : variant === "secondary"
        ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
        : "bg-accent/20 text-accent-foreground hover:bg-accent/30"}
    `}
  >
    {icon && <span className="mr-2">{icon}</span>}
    <span className="font-mono">{children}</span>
    {variant === "primary" ? (
      <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
    ) : (
      <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
    )}
  </a>
);

export const ContactSection = () => {
  return (
    <section className="relative bg-background text-foreground">
      {/* IBM Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(180deg,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerAnimation}
          className="max-w-3xl"
        >
          <motion.div variants={itemAnimation} className="mb-12">
            <p className="font-mono text-primary mb-2">Contact</p>
            <h2 className="font-mono text-4xl font-medium mb-6">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Available for consulting and technical leadership opportunities.
              Let&apos;s discuss how we can transform your ideas into reality.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemAnimation}
            className="flex flex-col sm:flex-row gap-4"
          >
            <IBMButton href="mailto:binubabu@socife.com" variant="primary">
              Get in Touch
            </IBMButton>
            <IBMButton href="https://linkedin.com/in/binubdaniel" variant="secondary">
              View LinkedIn
            </IBMButton>
            <IBMButton 
              href="/enquire" 
              variant="tertiary"
              icon={<Bot className="h-5 w-5" />}
            >
              Enquire with Groot Assistant
            </IBMButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card text-foreground border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="font-mono text-primary">
              © {currentYear} Binu Babu
            </p>
            <p className="text-muted-foreground">
              AI Product Architect & Technology Consultant
            </p>
          </div>
          
         
        </div>
      </div>
    </footer>
  );
};

