// src/lib/langgraph/scoring.ts

import { 
  Intent, 
  BaseScores, 
  IntentCriteria, 
  ChatState, 
  ANALYSIS_WEIGHTS, 
  VALIDATION_THRESHOLDS 
} from "@/lib/langgraph/types";

/**
 * Calculate total validation score based on base scores and intent-specific criteria
 * Improved calculation with better debugging
 */
export const calculateTotalScore = (
  intent: Intent,
  baseScores: BaseScores,
  intentCriteria: IntentCriteria
): number => {
  // Verify we have valid baseScores
  if (!baseScores || typeof baseScores !== 'object') {
    console.error('Invalid baseScores:', baseScores);
    return 0;
  }
  
  // Make sure all required fields exist in baseScores
  const safeBaseScores = {
    problemUnderstanding: baseScores.problemUnderstanding || 0,
    solutionVision: baseScores.solutionVision || 0,
    engagementQuality: baseScores.engagementQuality || 0,
    projectCommitment: baseScores.projectCommitment || 0
  };
  
  // Base score calculation (40% of total)
  const baseScoreTotal = (
    safeBaseScores.problemUnderstanding * ANALYSIS_WEIGHTS.TECHNICAL_DEPTH +
    safeBaseScores.solutionVision * ANALYSIS_WEIGHTS.PROJECT_CLARITY +
    safeBaseScores.engagementQuality * ANALYSIS_WEIGHTS.ENGAGEMENT +
    safeBaseScores.projectCommitment * ANALYSIS_WEIGHTS.COMMITMENT
  ) * 0.4;

  // Intent-specific criteria (60% of total)
  let intentScoreTotal = 0;

  if (!intentCriteria || typeof intentCriteria !== 'object') {
    console.error('Invalid intentCriteria:', intentCriteria);
    intentScoreTotal = 0.3; // Default moderate score
  } else {
    switch (intent) {
      case "IDEA_VALIDATION":
        if (
          intentCriteria.hasBusinessModel !== undefined &&
          intentCriteria.marketResearch !== undefined &&
          intentCriteria.technicalFeasibility !== undefined &&
          intentCriteria.resourcePlanning !== undefined &&
          intentCriteria.implementationTimeline !== undefined
        ) {
          intentScoreTotal = (
            intentCriteria.hasBusinessModel * 0.25 +
            intentCriteria.marketResearch * 0.2 +
            intentCriteria.technicalFeasibility * 0.25 +
            intentCriteria.resourcePlanning * 0.15 +
            intentCriteria.implementationTimeline * 0.15
          ) * 0.6;
        } else {
          // If we're missing some criteria, calculate with what we have
          let validCount = 0;
          let sum = 0;
          
          if (intentCriteria.hasBusinessModel !== undefined) { sum += intentCriteria.hasBusinessModel * 0.25; validCount += 1; }
          if (intentCriteria.marketResearch !== undefined) { sum += intentCriteria.marketResearch * 0.2; validCount += 1; }
          if (intentCriteria.technicalFeasibility !== undefined) { sum += intentCriteria.technicalFeasibility * 0.25; validCount += 1; }
          if (intentCriteria.resourcePlanning !== undefined) { sum += intentCriteria.resourcePlanning * 0.15; validCount += 1; }
          if (intentCriteria.implementationTimeline !== undefined) { sum += intentCriteria.implementationTimeline * 0.15; validCount += 1; }
          
          intentScoreTotal = validCount > 0 ? (sum / validCount) * 0.6 : 0.3;
        }
        break;

      case "PROJECT_ASSISTANCE":
        if (
          intentCriteria.scopeClarity !== undefined &&
          intentCriteria.technicalRequirements !== undefined &&
          intentCriteria.timeline !== undefined &&
          intentCriteria.budget !== undefined &&
          intentCriteria.success_criteria !== undefined
        ) {
          intentScoreTotal = (
            intentCriteria.scopeClarity * 0.25 +
            intentCriteria.technicalRequirements * 0.25 +
            intentCriteria.timeline * 0.15 +
            intentCriteria.budget * 0.15 +
            intentCriteria.success_criteria * 0.2
          ) * 0.6;
        } else {
          // Calculate with available criteria
          let validCount = 0;
          let sum = 0;
          
          if (intentCriteria.scopeClarity !== undefined) { sum += intentCriteria.scopeClarity * 0.25; validCount += 1; }
          if (intentCriteria.technicalRequirements !== undefined) { sum += intentCriteria.technicalRequirements * 0.25; validCount += 1; }
          if (intentCriteria.timeline !== undefined) { sum += intentCriteria.timeline * 0.15; validCount += 1; }
          if (intentCriteria.budget !== undefined) { sum += intentCriteria.budget * 0.15; validCount += 1; }
          if (intentCriteria.success_criteria !== undefined) { sum += intentCriteria.success_criteria * 0.2; validCount += 1; }
          
          intentScoreTotal = validCount > 0 ? (sum / validCount) * 0.6 : 0.3;
        }
        break;

      case "TECHNICAL_CONSULTATION":
        if (
          intentCriteria.problemComplexity !== undefined &&
          intentCriteria.aiRelevance !== undefined &&
          intentCriteria.requirementClarity !== undefined &&
          intentCriteria.implementationPath !== undefined &&
          intentCriteria.expectedOutcomes !== undefined
        ) {
          intentScoreTotal = (
            intentCriteria.problemComplexity * 0.2 +
            intentCriteria.aiRelevance * 0.25 +
            intentCriteria.requirementClarity * 0.2 +
            intentCriteria.implementationPath * 0.15 +
            intentCriteria.expectedOutcomes * 0.2
          ) * 0.6;
        } else {
          // Calculate with available criteria
          let validCount = 0;
          let sum = 0;
          
          if (intentCriteria.problemComplexity !== undefined) { sum += intentCriteria.problemComplexity * 0.2; validCount += 1; }
          if (intentCriteria.aiRelevance !== undefined) { sum += intentCriteria.aiRelevance * 0.25; validCount += 1; }
          if (intentCriteria.requirementClarity !== undefined) { sum += intentCriteria.requirementClarity * 0.2; validCount += 1; }
          if (intentCriteria.implementationPath !== undefined) { sum += intentCriteria.implementationPath * 0.15; validCount += 1; }
          if (intentCriteria.expectedOutcomes !== undefined) { sum += intentCriteria.expectedOutcomes * 0.2; validCount += 1; }
          
          intentScoreTotal = validCount > 0 ? (sum / validCount) * 0.6 : 0.3;
        }
        break;

      case "RECRUITMENT":
        // For recruitment, convert boolean criteria to numbers and calculate score
        if (
          intentCriteria.isAIRole !== undefined &&
          intentCriteria.meetsSalary !== undefined &&
          intentCriteria.isRemoteHybrid !== undefined &&
          intentCriteria.hasCompanyInfo !== undefined &&
          intentCriteria.hasJobDescription !== undefined &&
          intentCriteria.hasCultureInfo !== undefined &&
          intentCriteria.hasGrowthInfo !== undefined
        ) {
          const criteriaSum = [
            intentCriteria.isAIRole ? 0.3 : 0.1, // Higher weight for AI roles
            intentCriteria.meetsSalary ? 0.2 : 0,
            intentCriteria.isRemoteHybrid ? 0.1 : 0,
            intentCriteria.hasCompanyInfo ? 0.1 : 0,
            intentCriteria.hasJobDescription ? 0.1 : 0,
            intentCriteria.hasCultureInfo ? 0.1 : 0,
            intentCriteria.hasGrowthInfo ? 0.1 : 0
          ].reduce((sum, val) => sum + val, 0);
          
          intentScoreTotal = criteriaSum * 0.6;
        } else {
          // Provide a partial score based on available criteria
          let criteriaSum = 0;
          let availableCriteria = 0;
          
          if (intentCriteria.isAIRole !== undefined) { 
            criteriaSum += intentCriteria.isAIRole ? 0.3 : 0.1;
            availableCriteria += 1;
          }
          
          if (intentCriteria.meetsSalary !== undefined) {
            criteriaSum += intentCriteria.meetsSalary ? 0.2 : 0;
            availableCriteria += 1;
          }
          
          // Add other criteria checks...
          
          intentScoreTotal = availableCriteria > 0 ? (criteriaSum / availableCriteria) * 0.6 : 0.3;
        }
        break;

      default:
        // For INFORMATION or any other intent, use a base calculation
        intentScoreTotal = 0.3; // Medium score for general inquiries
    }
  }

  // Return the combined score (base + intent) with proper rounding to avoid floating point issues
  const totalScore = Math.min(Math.max(baseScoreTotal + intentScoreTotal, 0), 1);
  
  // Log the calculation for debugging
  console.log('Score calculation:', {
    intent,
    baseScores: safeBaseScores,
    baseScoreTotal,
    intentCriteria,
    intentScoreTotal,
    totalScore: totalScore
  });
  
  return totalScore;
};

/**
 * Check if validation criteria are met
 */
export const isValidationComplete = (state: ChatState): boolean => {
  if (!state.scoreDetails) return false;
  
  const { baseScores } = state.scoreDetails;
  
  return (
    state.messageCount >= VALIDATION_THRESHOLDS.MIN_MESSAGES &&
    baseScores.problemUnderstanding >= VALIDATION_THRESHOLDS.MIN_TECHNICAL_DEPTH &&
    baseScores.solutionVision >= VALIDATION_THRESHOLDS.MIN_PROJECT_CLARITY &&
    baseScores.engagementQuality >= VALIDATION_THRESHOLDS.MIN_ENGAGEMENT &&
    state.validationScore >= VALIDATION_THRESHOLDS.MIN_CONFIDENCE
  );
};

/**
 * Check if meeting should be offered based on conversation state
 */
export const shouldOfferMeeting = (state: ChatState): boolean => {
  return (
    state.validationScore >= 0.7 && 
    (state.messageCount >= 10 || 
    state.conversationStatus.approachingLimit)
  );
};

/**
 * Format validation score as percentage
 */
export const formatValidationScore = (score: number): string => {
  return `${Math.round(score * 100)}%`;
};

/**
 * Get color based on validation score
 */
export const getScoreColor = (score: number): string => {
  if (score >= 0.7) return "#4CAF50"; // Green
  if (score >= 0.5) return "#FFC107"; // Yellow/Amber
  return "#F44336"; // Red
};

/**
 * Calculate missing validation requirements
 */
export const getMissingRequirements = (state: ChatState): string[] => {
  if (!state.scoreDetails) return ["Complete profile information"];
  
  const missing: string[] = [];
  const { baseScores } = state.scoreDetails;
  
  if (state.messageCount < VALIDATION_THRESHOLDS.MIN_MESSAGES) {
    missing.push("More conversation depth required");
  }
  
  if (baseScores.problemUnderstanding < VALIDATION_THRESHOLDS.MIN_TECHNICAL_DEPTH) {
    missing.push("More technical details needed");
  }
  
  if (baseScores.solutionVision < VALIDATION_THRESHOLDS.MIN_PROJECT_CLARITY) {
    missing.push("Project scope needs clarification");
  }
  
  if (baseScores.engagementQuality < VALIDATION_THRESHOLDS.MIN_ENGAGEMENT) {
    missing.push("Higher engagement quality needed");
  }
  
  if (state.validationScore < VALIDATION_THRESHOLDS.MIN_CONFIDENCE) {
    missing.push("Overall confidence score is too low");
  }
  
  return missing;
};