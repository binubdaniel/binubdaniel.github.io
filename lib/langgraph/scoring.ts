// src/lib/langgraph/scoring.ts

import {
  Intent,
  BaseScores,
  IntentCriteria,
  ChatState,
  TechnicalRequirement,
  SentimentAnalysis,
  MeetingPriority,
} from "./types";

/**
 * Calculate total validation score based on need for meeting rather than knowledge assessment
 * Focuses on meeting relevance, urgency, and alignment with expertise
 */
export const calculateTotalScore = (
  intent: Intent,
  baseScores: BaseScores,
  intentCriteria: IntentCriteria
): number => {
  // Verify we have valid baseScores
  if (!baseScores || typeof baseScores !== "object") {
    console.error("Invalid baseScores:", baseScores);
    return 0;
  }

  // Make sure all required fields exist in baseScores
  const safeBaseScores = {
    problemRelevance: baseScores.problemRelevance || 0, // How relevant is the problem to Binu's expertise
    projectPotential: baseScores.projectPotential || 0, // How promising/feasible is the project
    consultationUrgency: baseScores.consultationUrgency || 0, // How urgent is the need for consultation
    clientEngagement: baseScores.clientEngagement || 0, // How engaged is the client in the conversation
  };

  // Base score calculation (40% of total)
  const weights = {
    problemRelevance: 0.3, // How aligned with Binu's expertise
    projectPotential: 0.3, // How viable/promising the project seems
    consultationUrgency: 0.2, // How urgent/time-sensitive
    clientEngagement: 0.2, // How engaged and committed the client seems
  };

  const baseScoreTotal =
    (safeBaseScores.problemRelevance * weights.problemRelevance +
      safeBaseScores.projectPotential * weights.projectPotential +
      safeBaseScores.consultationUrgency * weights.consultationUrgency +
      safeBaseScores.clientEngagement * weights.clientEngagement) *
    0.4;

  // Intent-specific criteria (60% of total)
  let intentScoreTotal = 0;

  if (!intentCriteria || typeof intentCriteria !== "object") {
    console.error("Invalid intentCriteria:", intentCriteria);
    intentScoreTotal = 0.3; // Default moderate score
  } else {
    switch (intent) {
      case "IDEA_VALIDATION":
        {
          const criteriaWeights = {
            meetingRelevance: 0.25, // How necessary is a meeting for this idea validation
            ideaMaturity: 0.2, // How developed is the idea (not too early/late for meeting)
            feedbackComplexity: 0.25, // How complex feedback needed (simple vs. nuanced discussion)
            resourceDiscussion: 0.15, // Need to discuss resources/implementation
            followupPotential: 0.15, // Potential for ongoing collaboration
          };

          let validCount = 0;
          let weightedSum = 0;

          for (const [key, weight] of Object.entries(criteriaWeights)) {
            const value = intentCriteria[key as keyof IntentCriteria];
            if (typeof value === "number") {
              weightedSum += value * weight;
              validCount += weight;
            }
          }

          intentScoreTotal =
            validCount > 0 ? (weightedSum / validCount) * 0.6 : 0.3;
        }
        break;

      case "PROJECT_ASSISTANCE":
        {
          const criteriaWeights = {
            assistanceComplexity: 0.25, // How complex is the assistance needed (meeting vs. chat)
            scopeAlignment: 0.25, // How well the scope aligns with Binu's expertise
            implementationBlocking: 0.2, // How blocked the client is (urgent meeting need)
            decisionMakingStage: 0.15, // Stage in decision process (exploring vs. committed)
            communicationNeeds: 0.15, // Need for direct communication vs. async chat
          };

          let validCount = 0;
          let weightedSum = 0;

          for (const [key, weight] of Object.entries(criteriaWeights)) {
            const value = intentCriteria[key as keyof IntentCriteria];
            if (typeof value === "number") {
              weightedSum += value * weight;
              validCount += weight;
            }
          }

          intentScoreTotal =
            validCount > 0 ? (weightedSum / validCount) * 0.6 : 0.3;
        }
        break;

      case "TECHNICAL_CONSULTATION":
        {
          const criteriaWeights = {
            technicalDepth: 0.25, // How deep/specialized is the technical assistance needed
            solutionClarity: 0.2, // How clear the solution path is (unclear = meeting needed)
            interactiveExploration: 0.2, // Need for back-and-forth technical discussion
            implementationGuidance: 0.15, // Need for guided implementation steps
            architectureDiscussion: 0.2, // Need to discuss system architecture
          };

          let validCount = 0;
          let weightedSum = 0;

          for (const [key, weight] of Object.entries(criteriaWeights)) {
            const value = intentCriteria[key as keyof IntentCriteria];
            if (typeof value === "number") {
              weightedSum += value * weight;
              validCount += weight;
            }
          }

          intentScoreTotal =
            validCount > 0 ? (weightedSum / validCount) * 0.6 : 0.3;
        }
        break;

      case "RECRUITMENT":
        {
          // For recruitment, convert boolean criteria to meeting relevance scores
          const criteriaScores = {
            isRelevantRole: intentCriteria.isAIRole ? 0.3 : 0.1,
            salaryFitForDiscussion: intentCriteria.meetsSalary ? 0.2 : 0,
            locationCompatible: intentCriteria.isRemoteHybrid ? 0.1 : 0,
            detailsForMeeting: intentCriteria.hasCompanyInfo ? 0.1 : 0,
            roleComplexity: intentCriteria.hasJobDescription ? 0.1 : 0,
            cultureDiscussionNeeded: intentCriteria.hasCultureInfo ? 0.1 : 0,
            careerPathClarity: intentCriteria.hasGrowthInfo ? 0.1 : 0,
          };

          // Calculate recruitment meeting relevance score
          let validCount = 0;
          let sum = 0;

          for (const [key, defaultValue] of Object.entries(criteriaScores)) {
            const value = intentCriteria[key as keyof IntentCriteria];
            if (typeof value === "boolean") {
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
        // For general information, use a low meeting relevance score
        intentScoreTotal = 0.2; // Information requests rarely need meetings
    }
  }

  // Return the combined score (base + intent) with proper rounding to avoid floating point issues
  const totalScore = Math.min(
    Math.max(baseScoreTotal + intentScoreTotal, 0),
    1
  );

  return totalScore;
};

/**
 * Evaluate technical requirements to determine meeting necessity
 */
export const evaluateTechnicalRequirements = (
  requirements: TechnicalRequirement[]
): number => {
  if (!requirements || requirements.length === 0) {
    return 0.4; // Default moderate-low score for meeting necessity
  }

  // Calculate complexity score (more complex requirements suggest meeting need)
  const totalComplexity = requirements.reduce((sum, req) => {
    // Check if requirement is complex enough to warrant discussion
    const complexityIndicators = [
      "integration",
      "architecture",
      "custom",
      "optimization",
      "security",
      "scalability",
      "performance",
      "governance",
      "compliance",
      "design",
      "infrastructure",
    ];

    // Score higher if requirement contains complexity indicators
    const hasComplexityTerms = complexityIndicators.some((term) =>
      req.name.toLowerCase().includes(term)
    );

    // Also consider if requirement is flagged as needing discussion
    const discussionNeed = req.needsDiscussion === true ? 1.5 : 1;

    return (
      sum +
      (req.confidence || 0) * (hasComplexityTerms ? 1.5 : 1) * discussionNeed
    );
  }, 0);

  const complexityScore =
    requirements.length > 0 ? totalComplexity / requirements.length : 0;

  // Consider how many requirements need discussion vs. autonomous handling
  const discussionNeededCount = requirements.filter(
    (req) => req.needsDiscussion === true || req.confidence < 0.7
  ).length;

  const discussionRatio =
    requirements.length > 0 ? discussionNeededCount / requirements.length : 0;

  // Combine factors - higher score means more meeting necessity
  return complexityScore * 0.6 + discussionRatio * 0.4;
};

/**
 * Evaluate sentiment for meeting relevance
 */
export const evaluateSentiment = (sentiment: SentimentAnalysis): number => {
  if (!sentiment || !sentiment.details) {
    return 0.5; // Default moderate score
  }

  // Calculate meeting relevance based on sentiment indicators
  const { excitement = 0.5, interest = 0.5, concern = 0.5 } = sentiment.details;

  // Higher excitement and interest can indicate meeting relevance
  // Higher concern typically suggests need for direct conversation
  return excitement * 0.3 + interest * 0.3 + concern * 0.4;
};

/**
 * Calculate meeting priority score based on need rather than opportunity value
 */
export const calculateMeetingPriority = (state: ChatState): MeetingPriority => {
  if (!state.scoreDetails) return "Medium";

  // Higher validation scores indicate higher meeting relevance
  if (state.validationScore >= 0.85) return "High";
  if (state.validationScore < 0.6) return "Low";

  // Consider project complexity (complex projects benefit more from meetings)
  if (state.projectTimeline?.complexity === "High") return "High";

  // Consider urgency indicators in sentiment and timeline
  if (
    (state.sentimentAnalysis?.details.concern ?? 0 > 0.7) ||
    state.projectTimeline?.urgency === "High"
  ) {
    return "High"; // High concern or urgency suggests urgent meeting need
  }

  // Consider engagement level (highly engaged users get more value from meetings)
  if (state.sentimentAnalysis?.details.interest ?? 0 > 0.8) {
    return "High";
  }

  // Default to medium
  return "Medium";
};

/**
 * Determine if query is genuine or speculative
 */
export const evaluateQueryAuthenticity = (state: ChatState): number => {
  // Implementation analyzes:
  // 1. Consistency of information provided
  // 2. Specificity of details
  // 3. Concrete vs. hypothetical language patterns
  // 4. Commitment signaling in responses

  const messageCount = state.messages.length;
  const userMessages = state.messages.filter((m) => m.role === "user");

  if (userMessages.length === 0) return 0.5;

  // Calculate average message length (longer messages often have more genuine queries)
  const avgUserMessageLength =
    userMessages.reduce((sum, msg) => sum + msg.content.length, 0) /
    userMessages.length;

  // Check for specificity markers in messages
  const specificityMarkers = [
    "timeline",
    "budget",
    "deadline",
    "cost",
    "requirement",
    "specifications",
    "specific",
    "exactly",
    "need to",
    "must have",
    "project",
    "company",
    "team",
    "our",
    "we are",
    "we need",
  ];

  let specificityCount = 0;

  userMessages.forEach((msg) => {
    const content = msg.content.toLowerCase();
    specificityMarkers.forEach((marker) => {
      if (content.includes(marker)) specificityCount++;
    });
  });

  const specificityScore = Math.min(
    specificityCount / (userMessages.length * 5),
    1
  );

  // More messages and longer content suggest more genuine inquiry
  const messageFactor = Math.min(messageCount / 5, 1);
  const lengthFactor = Math.min(avgUserMessageLength / 200, 1);

  // Combine factors - more weight on specificity and consistency
  return specificityScore * 0.5 + messageFactor * 0.2 + lengthFactor * 0.3;
};
