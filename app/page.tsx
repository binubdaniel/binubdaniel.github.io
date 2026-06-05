// Import all components
import HeroSection from '@/components/homepage/HeroSection';
import AIStrategyInsights from '@/components/homepage/AIStrategyInsights';
import ExperienceSection from '@/components/homepage/ExperienceSection';
import ProjectsSection from '@/components/homepage/ProjectsSection';
import LatestPosts from '@/components/homepage/LatestPosts';
import { ContactSection, Footer } from '@/components/homepage/ContactFooter';

// Reads the latest posts from the DB at request time, so render dynamically.
export const dynamic = 'force-dynamic';

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

      {/* Latest from the blog (hidden when there are no published posts) */}
      <LatestPosts />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Portfolio;
