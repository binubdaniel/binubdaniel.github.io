import React from 'react';
import { ArrowUpRight, ArrowRight } from "lucide-react";
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
  variant?: "primary" | "secondary";
}

const IBMButton: React.FC<IBMButtonProps> = ({ href, children, variant = "primary" }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className={`
      group inline-flex items-center gap-3 px-6 py-4 transition-colors duration-200
      ${variant === "primary" 
        ? "bg-blue-600 hover:bg-blue-700 text-white" 
        : "bg-[#262626] hover:bg-[#363636] text-white"}
    `}
  >
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
    <section className="relative bg-[#000000] text-white">
      {/* IBM Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
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
            <p className="font-mono text-blue-400 mb-2">Contact</p>
            <h2 className="font-mono text-4xl font-medium mb-6">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              Available for consulting and technical leadership opportunities.
              Let&apos;s discuss how we can transform your ideas into reality.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemAnimation}
            className="flex flex-col md:flex-row gap-4"
          >
            <IBMButton href="mailto:bbinuservices@gmail.com" variant="primary">
              Get in Touch
            </IBMButton>
            <IBMButton href="https://linkedin.com/in/binubdaniel" variant="secondary">
              View LinkedIn
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
    <footer className="bg-[#161616] text-white border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="font-mono text-blue-400">
              © {currentYear} Binu Babu
            </p>
            <p className="text-gray-400">
              AI Product Architect & Technology Consultant
            </p>
          </div>
          
          
        </div>
      </div>
    </footer>
  );
};

export default {
  ContactSection,
  Footer
};