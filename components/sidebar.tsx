"use client";

import React from "react";
import {
  Bot,
  BrainCircuit,
  Calendar,
  X,
  Linkedin,
  ArrowUpRight,
  ChartBar,
  Lightbulb,
  Code2,
  Briefcase,
  ArrowUpRightFromSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const renderFeatureItem = (
    icon: React.ReactNode,
    title: string,
    desc: string
  ) => (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors duration-200">
      <div className="text-primary mt-1">{icon}</div>
      <div>
        <h5 className="font-medium text-sm text-foreground">{title}</h5>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-card border-r border-border z-50 w-80",
          "transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" />
              <h2 className="font-mono font-semibold text-xl text-foreground">
                Groot AI
              </h2>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-secondary/20 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto scrollbar">
            {/* Profile */}
            <section className="p-4 border-b border-border">
              <Link href="/">
                  <div className="flex gap-1">
                    <h3 className="font-mono font-semibold text-lg text-primary">
                      Binu B Daniel
                    </h3>{" "}
                    <ArrowUpRightFromSquare className="w-3 h-3 text-primary " />
                  </div>

                  <p className="text-sm text-primary">
                    Technical Product Consultant
                  </p>
              </Link>

              <p className="mt-4 text-sm text-muted-foreground">
                8+ years in AI, LLMs and Product Development. Expert in building
                intelligent, scalable systems.
              </p>
              <a
                href="https://linkedin.com/in/binubdaniel"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-primary/80 group transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>@binubdaniel</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </section>

            {/* Consultation */}
            <section className="p-4 border-b border-border">
              <h4 className="font-mono font-semibold text-lg text-foreground">
                Book a Free Consultation
              </h4>
              <div className="mt-2 p-3 bg-primary/5 rounded-sm border-l-4 border-l-primary">
                <p className="text-sm text-muted-foreground">
                  10-minute focused discussion to understand your needs.
                  Available only on Saturdays.
                </p>
                <br />
                <p className="text-sm text-muted-foreground">
                  Please engage with the AI assistant to help us understand your
                  requirements better. This ensures a more productive discussion
                  during the consultation.
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section className="p-4 border-b border-border">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-3">
                How It Works
              </h4>
              {renderFeatureItem(
                <BrainCircuit className="w-4 h-4" />,
                "AI Analysis",
                "Analyze conversations to understand requirements and depth"
              )}
              {renderFeatureItem(
                <ChartBar className="w-4 h-4" />,
                "Progress Score",
                "Your conversation score increases as we discuss details"
              )}
              {renderFeatureItem(
                <Calendar className="w-4 h-4" />,
                "Meeting Access",
                "Schedule consultation with Binu at 70% score"
              )}
            </section>

            {/* I Can Help With */}
            <section className="p-4 border-b border-border">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-3">
                I Can Help With
              </h4>
              {renderFeatureItem(
                <Lightbulb className="w-4 h-4" />,
                "Project Ideas",
                "Evaluate startup ideas and technical feasibility"
              )}
              {renderFeatureItem(
                <Code2 className="w-4 h-4" />,
                "Technical Solutions",
                "Analyze requirements, suggest AI/tech solutions"
              )}
              {renderFeatureItem(
                <Briefcase className="w-4 h-4" />,
                "Work Opportunities",
                "Screen AI/ML roles (compensation, remote/hybrid)"
              )}
            </section>

            {/* Expertise */}
            <section className="p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-3">
                Core Expertise
              </h4>
              <div className="space-y-2">
                {[
                  "Large Language Models & RAG",
                  "Enterprise AI Solutions",
                  "Cloud Architecture",
                  "AI System Design",
                  "Microservices",
                ].map((exp) => (
                  <div
                    key={exp}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <footer className="p-4 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              © 2024 Groot AI • Your Intelligent Assistant
            </p>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
