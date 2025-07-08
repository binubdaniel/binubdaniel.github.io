import React, { useState } from 'react';
import { X, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitQuickSurvey } from './actions';

interface QuickSurveyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickSurveyDialog: React.FC<QuickSurveyDialogProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{
    experience: string;
    reasons: string[];
    email: string;
  }>({
    experience: '',
    reasons: [],
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      question: "Have you worked on AI projects before?",
      type: "experience",
      options: [
        { value: "never", label: "Never worked on AI projects" },
        { value: "planning", label: "Planning my first AI project" },
        { value: "few", label: "Worked on 1-3 AI projects" },
        { value: "experienced", label: "Worked on 4-10 AI projects" },
        { value: "expert", label: "Led 10+ AI initiatives" }
      ]
    },
    {
      question: "What are the main reasons AI projects fail?",
      type: "reasons",
      options: [
        { value: "data-quality", label: "Poor data quality or availability" },
        { value: "unclear-objectives", label: "Lack of clear business objectives" },
        { value: "unrealistic-expectations", label: "Unrealistic expectations about AI capabilities" },
        { value: "insufficient-expertise", label: "Inadequate team expertise" },
        { value: "stakeholder-alignment", label: "Insufficient stakeholder buy-in" },
        { value: "technical-complexity", label: "Underestimated technical complexity" },
        { value: "integration-challenges", label: "Poor integration with existing systems" },
        { value: "budget-constraints", label: "Budget constraints or cost overruns" },
        { value: "regulatory-compliance", label: "Regulatory or compliance issues" },
        { value: "wrong-framework", label: "Using traditional development frameworks" },
        { value: "deployment-issues", label: "Deployment and production challenges" },
        { value: "maintenance-neglect", label: "Lack of proper maintenance and monitoring" }
      ]
    },
    {
      question: "Get notified when EVOLVE launches?",
      type: "email",
      placeholder: "your.email@company.com"
    }
  ];

  const handleAnswer = (value: string) => {
    const currentStepType = steps[currentStep].type;
    
    if (currentStepType === 'reasons') {
      const newReasons = answers.reasons.includes(value)
        ? answers.reasons.filter(r => r !== value)
        : [...answers.reasons, value];
      setAnswers({ ...answers, reasons: newReasons });
    } else {
      setAnswers({ ...answers, [currentStepType]: value });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Create FormData to match server action format
      const formData = new FormData();
      formData.append('email', answers.email);
      formData.append('experience', answers.experience);
      
      // Add all selected reasons
      answers.reasons.forEach(reason => {
        formData.append('reasons', reason);
      });
      
      const result = await submitQuickSurvey(formData);
      
      if (result.success) {
        setIsSubmitting(false);
        setIsComplete(true);
        
        // Auto-close after success
        setTimeout(() => {
          onClose();
          setIsComplete(false);
          setCurrentStep(0);
          setAnswers({ experience: '', reasons: [], email: '' });
        }, 3000);
      } else {
        console.error('Survey submission failed:', result.message);
        setIsSubmitting(false);
        // You could show an error state here
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    const currentStepType = steps[currentStep].type;
    if (currentStepType === 'experience') return answers.experience;
    if (currentStepType === 'reasons') return answers.reasons.length > 0;
    if (currentStepType === 'email') return answers.email.includes('@');
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="elegant-card border border-border rounded-xl p-6 max-w-md w-full shadow-2xl backdrop-blur-sm"
          >
            {!isComplete ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="text-sm text-muted-foreground font-light">
                      45 seconds · Step {currentStep + 1} of {steps.length}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-secondary rounded-full h-2 mb-6">
                  <motion.div
                    className="bg-accent h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Question */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-light mb-4 text-foreground">
                    {steps[currentStep].question}
                  </h3>

                  {steps[currentStep].type === 'email' ? (
                    <input
                      type="email"
                      placeholder={steps[currentStep].placeholder}
                      value={answers.email}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent font-light"
                    />
                  ) : (
                    <div className="space-y-2 px-2 max-h-[420px] overflow-y-auto ">
                      {steps[currentStep].options?.map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option.value)}
                          className={`w-full p-3 text-sm text-left rounded-lg border transition-all duration-200 font-light ${
                            (steps[currentStep].type === 'experience' && answers.experience === option.value) ||
                            (steps[currentStep].type === 'reasons' && answers.reasons.includes(option.value))
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border hover:border-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent/5'
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-light"
                  >
                    Back
                  </button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    disabled={!canProceed() || isSubmitting}
                    className="px-6 py-2 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-300 font-light hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                    ) : (
                      <>
                        {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-light mb-2 text-foreground">
                  Thank you!
                </h3>
                <p className="text-muted-foreground font-light">
                  Your insights will help improve AI product development.
                </p>
                <div className="mt-4 text-sm text-muted-foreground font-light">
                  Closing automatically...
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickSurveyDialog;