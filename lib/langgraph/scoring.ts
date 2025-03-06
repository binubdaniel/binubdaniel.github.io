// src/lib/langgraph/scoring.ts

import { 
  Intent, 
  BaseScores, 
  IntentCriteria, 
  ChatState,
  TechnicalRequirement,
  SentimentAnalysis
} from "./types";

/**
 * Calculate total validation score based on base scores and intent-specific criteria
 * Enhanced with better debugging and more robust handling of missing scores
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
  const weights = {
    problemUnderstanding: 0.3,  // Technical depth
    solutionVision: 0.3,        // Project clarity
    engagementQuality: 0.2,     // Engagement quality
    projectCommitment: 0.2      // Commitment
  };
  
  const baseScoreTotal = (
    safeBaseScores.problemUnderstanding * weights.problemUnderstanding +
    safeBaseScores.solutionVision * weights.solutionVision +
    safeBaseScores.engagementQuality * weights.engagementQuality +
    safeBaseScores.projectCommitment * weights.projectCommitment
  ) * 0.4;

  // Intent-specific criteria (60% of total)
  let intentScoreTotal = 0;

  if (!intentCriteria || typeof intentCriteria !== 'object') {
    console.error('Invalid intentCriteria:', intentCriteria);
    intentScoreTotal = 0.3; // Default moderate score
  } else {
    switch (intent) {
      case "IDEA_VALIDATION":
        {
          const criteriaWeights = {
            hasBusinessModel: 0.25,
            marketResearch: 0.2,
            technicalFeasibility: 0.25,
            resourcePlanning: 0.15,
            implementationTimeline: 0.15
          };
          
          let validCount = 0;
          let weightedSum = 0;
          
          for (const [key, weight] of Object.entries(criteriaWeights)) {
            const value = intentCriteria[key as keyof IntentCriteria];
            if (typeof value === 'number') {
              weightedSum += value * weight;
              validCount += weight;
            }
          }
          
          intentScoreTotal = validCount > 0 ? (weightedSum / validCount) * 0.6 : 0.3;
        }
        break;

      case "PROJECT_ASSISTANCE":
        {
          const criteriaWeights = {
            scopeClarity: 0.25,
            technicalRequirements: 0.25,
            timeline: 0.15,
            budget: 0.15,
            success_criteria: 0.2
          };
          
          let validCount = 0;
          let weightedSum = 0;
          
          for (const [key, weight] of Object.entries(criteriaWeights)) {
            const value = intentCriteria[key as keyof IntentCriteria];
            if (typeof value === 'number') {
              weightedSum += value * weight;
              validCount += weight;
            }
          }
          
          intentScoreTotal = validCount > 0 ? (weightedSum / validCount) * 0.6 : 0.3;
        }
        break;

      case "TECHNICAL_CONSULTATION":
        {
          const criteriaWeights = {
            problemComplexity: 0.2,
            aiRelevance: 0.25,
            requirementClarity: 0.2,
            implementationPath: 0.15,
            expectedOutcomes: 0.2
          };
          
          let validCount = 0;
          let weightedSum = 0;
          
          for (const [key, weight] of Object.entries(criteriaWeights)) {
            const value = intentCriteria[key as keyof IntentCriteria];
            if (typeof value === 'number') {
              weightedSum += value * weight;
              validCount += weight;
            }
          }
          
          intentScoreTotal = validCount > 0 ? (weightedSum / validCount) * 0.6 : 0.3;
        }
        break;

      case "RECRUITMENT":
        {
          // For recruitment, convert boolean criteria to scores
          const criteriaScores = {
            isAIRole: intentCriteria.isAIRole ? 0.3 : 0.1,
            meetsSalary: intentCriteria.meetsSalary ? 0.2 : 0,
            isRemoteHybrid: intentCriteria.isRemoteHybrid ? 0.1 : 0,
            hasCompanyInfo: intentCriteria.hasCompanyInfo ? 0.1 : 0,
            hasJobDescription: intentCriteria.hasJobDescription ? 0.1 : 0,
            hasCultureInfo: intentCriteria.hasCultureInfo ? 0.1 : 0,
            hasGrowthInfo: intentCriteria.hasGrowthInfo ? 0.1 : 0
          };
          
          // Calculate recruitment score
          let validCount = 0;
          let sum = 0;
          
          for (const [key, defaultValue] of Object.entries(criteriaScores)) {
            const value = intentCriteria[key as keyof IntentCriteria];
            if (typeof value === 'boolean') {
              sum += value ? defaultValue : 0;
              validCount += 1;
            } else {
              sum += defaultValue;
              validCount += 1;
            }
          }
          
          intentScoreTotal = validCount > 0 ? (sum / validCount) * 0.6 : 0.3;
        }
        break;

      case "INFORMATION":
      default:
        // For information or any other intent, use a moderate score
        intentScoreTotal = 0.3;
    }
  }

  // Return the combined score (base + intent) with proper rounding to avoid floating point issues
  const totalScore = Math.min(Math.max(baseScoreTotal + intentScoreTotal, 0), 1);
  
  // Log the calculation for debugging
  // console.log('Score calculation:', {
  //   intent,
  //   baseScores: safeBaseScores,
  //   baseScoreTotal,
  //   intentCriteria,
  //   intentScoreTotal,
  //   totalScore: totalScore
  // });
  
  return totalScore;
};

/**
 * Evaluate technical requirements to determine technical depth
 */
export const evaluateTechnicalRequirements = (requirements: TechnicalRequirement[]): number => {
  if (!requirements || requirements.length === 0) {
    return 0.5; // Default moderate score
  }
  
  // Calculate average confidence score
  const totalConfidence = requirements.reduce((sum, req) => sum + (req.confidence || 0), 0);
  const avgConfidence = requirements.length > 0 ? totalConfidence / requirements.length : 0;
  
  // Consider the number of requirements identified
  const reqCountFactor = Math.min(requirements.length / 5, 1); // Max out at 5 requirements
  
  // Combine confidence and count for final score
  return avgConfidence * 0.7 + reqCountFactor * 0.3;
};

/**
 * Evaluate sentiment for engagement quality
 */
export const evaluateSentiment = (sentiment: SentimentAnalysis): number => {
  if (!sentiment || !sentiment.details) {
    return 0.5; // Default moderate score
  }
  
  // Calculate engagement quality based on excitement and interest
  const { excitement = 0.5, interest = 0.5, concern = 0.5 } = sentiment.details;
  
  // Higher excitement and interest are positive, but some concern is natural
  // A balanced concern (around 0.3-0.6) is actually a positive signal
  const balancedConcern = Math.abs(concern - 0.4) < 0.3 ? 0.8 : 0.5;
  
  return (excitement * 0.4) + (interest * 0.4) + (balancedConcern * 0.2);
};

/**
 * Calculate meeting priority score
 */
export const calculateMeetingPriority = (state: ChatState): "Low" | "Medium" | "High" => {
  if (!state.scoreDetails) return "Medium";
  
  // Consider validation score
  if (state.validationScore >= 0.85) return "High";
  if (state.validationScore < 0.7) return "Low";
  
  // Consider project complexity
  if (state.projectTimeline?.complexity === "High") return "High";
  
  // Consider sentiment
  if (state.sentimentAnalysis?.overall === "Positive" && 
      state.sentimentAnalysis.details.interest > 0.8) {
    return "High";
  }
  
  // Default to medium
  return "Medium";
};