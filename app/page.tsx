"use client";
import React from "react";

// Import all components
import HeroSection from '@/components/homepage/HeroSection';
import ProductVisionSection from '@/components/homepage/ProductVisionSection';
import ExperienceSection from '@/components/homepage/ExperienceSection';
import ProjectsSection from '@/components/homepage/ProjectsSection';
import TechnicalSkillsSection from '@/components/homepage/TechnicalSkillsSection';
import { ContactSection, Footer } from '@/components/homepage/ContactFooter';

const Portfolio = () => {



  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection  />

      {/* AI Tools Section */}


      {/* Product Vision Section */}
      <ProductVisionSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Technical Skills Section */}
      <TechnicalSkillsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Portfolio;