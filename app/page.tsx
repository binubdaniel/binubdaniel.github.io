"use client";
import React from "react";

// Import all components
import HeroSection from '@/components/homepage/HeroSection';
import AIStrategyInsights from '@/components/homepage/AIStrategyInsights';
import ExperienceSection from '@/components/homepage/ExperienceSection';
import ProjectsSection from '@/components/homepage/ProjectsSection';
import { ContactSection, Footer } from '@/components/homepage/ContactFooter';

const Portfolio = () => {



  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* AI Strategy Insights Section */}
      <AIStrategyInsights />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Portfolio;