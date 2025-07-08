import React, { useState } from 'react';
import { Clock, TrendingDown, BarChart3, ArrowRight } from 'lucide-react';
import { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

interface SurveyTriggerCardProps {
  itemAnimation: Variants;
  onOpenSurvey: () => void;
}

const SurveyTriggerCard: React.FC<SurveyTriggerCardProps> = ({ onOpenSurvey, itemAnimation }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      variants={itemAnimation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative elegant-card border-l-4 border-l-accent p-6 cursor-pointer group hover:shadow-xl transition-all duration-300"
      onClick={onOpenSurvey}
    >
      <div className="space-y-4">
        {/* Header with icons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
              className="p-2 bg-accent/10 rounded-lg"
            >
              <TrendingDown className="h-5 w-5 text-accent" />
            </motion.div>
            <div>
              <h3 className="text-lg font-light text-foreground">
                Quick AI Survey
              </h3>
              <div className="flex items-center gap-2 text-sm text-accent">
                <Clock className="h-4 w-4" />
                <span>45 seconds</span>
              </div>
            </div>
          </div>
          
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="h-5 w-5 text-accent" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-muted-foreground leading-relaxed font-light">
            Help us understand why 80% of AI projects fail. Your insights will shape better development practices.
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              <span>3 quick questions</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Anonymous</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Multiple choice</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-accent/5 border border-accent/20 p-3 rounded-lg">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-light">AI Project Failure Rate</span>
            <span className="text-destructive font-light">70-85%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
            <div className="bg-destructive h-1.5 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          animate={{ 
            scale: isHovered ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-foreground text-sm font-light group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-300"
        >
          <span>Help improve AI development</span>
          <motion.div
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SurveyTriggerCard;