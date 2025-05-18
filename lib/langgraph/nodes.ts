// src/lib/langgraph/nodes/contextAnalyzer.ts

import {
  ChatState,
  Node,
  Message,
  ChatError,
  ErrorCode,
  MODEL_CONFIG,
  VALIDATION_THRESHOLDS,
  CONVERSATION_LIMITS,
  MEETING_CONFIG,
} from "@/lib/langgraph/types";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import {
  calculateTotalScore,
  calculateMeetingPriority,
  evaluateQueryAuthenticity,
} from "@/lib/langgraph/scoring";
import { extractKeyInsights, generateNextSteps } from "@/lib/langgraph/summary";
import { prompt } from "@/prompts";

// Initialize OpenAI client with error handling
let openai: OpenAI;
try {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error("Missing OpenAI API key");
  }
  openai = new OpenAI({ apiKey: openaiApiKey });
} catch (error) {
  console.error("Error initializing OpenAI client:", error);
  throw new ChatError(
    "Failed to initialize AI client",
    ErrorCode.MODEL_ERROR,
    500
  );
}

/**
 * Create a node for analyzing conversation context and user intent
 * Enhanced with focus on meeting necessity rather than user knowledge
 */
export const createContextAnalyzer = (): Node<ChatState> => {
  return async (state: ChatState) => {
    try {
      // Format conversation history for analysis
      const conversation = state.messages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      // Call OpenAI for analysis with error handling
      let response;
      try {
        response = await openai.chat.completions.create({
          model: MODEL_CONFIG.DEFAULT_MODEL,
          messages: [
            {
              role: "system",
              content: prompt,
            },
            { role: "user", content: conversation },
          ],
          response_format: { type: "json_object" },
          temperature: MODEL_CONFIG.TEMPERATURE,
          max_tokens: MODEL_CONFIG.MAX_TOKENS,
        });
      } catch (error) {
        console.error("Error calling primary model:", error);
        // Fallback to mini model
        response = await openai.chat.completions.create({
          model: MODEL_CONFIG.FALLBACK_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are an AI assistant analyzing a conversation. Provide an analysis in JSON format focusing on whether a meeting is necessary.",
            },
            { role: "user", content: conversation },
          ],
          response_format: { type: "json_object" },
        });
      }

      // Parse response and extract relevant information with error handling
      let result;
      try {
        result = JSON.parse(response.choices[0].message.content || "{}");
      } catch (parseError) {
        console.error("Error parsing API response:", parseError);
        throw new ChatError(
          "Failed to parse AI response",
          ErrorCode.MODEL_ERROR,
          500
        );
      }

      // Check if required fields exist and provide defaults if missing
      if (!result.baseScores) {
        console.warn("Missing baseScores in API response, using defaults");
        result.baseScores = {
          problemRelevance: 0.5,
          projectPotential: 0.5,
          consultationUrgency: 0.5,
          clientEngagement: 0.5,
        };
      }

      // Calculate overall validation score based on meeting necessity
      const totalScore = calculateTotalScore(
        result.intent,
        result.baseScores,
        result.intentCriteria
      );

      // Calculate query authenticity score
      const queryAuthenticity =
        result.queryAuthenticity || evaluateQueryAuthenticity(state);

      // Update conversation status
      const messageCount = state.messages.length + 1; // Add 1 for upcoming assistant message

      // STRICT validation check for meeting prompt
      const shouldPromptMeeting =
        totalScore >= VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE &&
        queryAuthenticity >= 0.7 && // Only suggest meetings for authentic queries
        (result.shouldOfferMeeting === true ||
          result.meetingPriority === "High");

      const conversationStatus = {
        messageCount,
        approachingLimit: messageCount >= CONVERSATION_LIMITS.SOFT_WARNING_AT,
        shouldPromptMeeting,
        requiresDirectContact:
          messageCount >= CONVERSATION_LIMITS.MAX_MESSAGES - 5,
      };

      // Enhance response with follow-up questions if score is below threshold
      let responseContent = result.response;

      // AGGRESSIVELY sanitize response to remove calendar link when below threshold
      if (totalScore < VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE) {
        // Remove phrases suggesting direct meetings with Binu
        const meetingPhrases = [
          "schedule a meeting",
          "book a call",
          "speak directly with Binu",
          "talk to Binu",
          "meet with Binu",
          "schedule a consultation",
          "book a session",
          "schedule time with",
          "best discussed directly with Binu",
          "Binu can help you with this",
          "Binu would be happy to discuss",
        ];

        for (const phrase of meetingPhrases) {
          // Case insensitive replacement with more detailed follow-up suggestion
          responseContent = responseContent.replace(
            new RegExp(phrase, "gi"),
            "we should explore more details about your specific needs first"
          );
        }

        // Add guidance for very low scoring conversations
        if (
          totalScore < 0.4 &&
          result.intent !== "RECRUITMENT" &&
          result.intent !== "INFORMATION"
        ) {
          responseContent +=
            "\n\nTo help me understand if this would benefit from Binu's direct input, could you share more about:";

          // Customize questions based on intent
          if (result.intent === "IDEA_VALIDATION") {
            responseContent +=
              "\n1. The specific problem your idea addresses\n2. How developed your concept is currently\n3. What type of feedback you're looking for";
          } else if (result.intent === "PROJECT_ASSISTANCE") {
            responseContent +=
              "\n1. The specific challenges you're facing\n2. Your current timeline and priorities\n3. The technical complexity of what you're building";
          } else if (result.intent === "TECHNICAL_CONSULTATION") {
            responseContent +=
              "\n1. The technical aspects you need help with\n2. Whether you need architecture guidance or implementation support\n3. How urgent your technical needs are";
          }
        }
      }

      // Add conversation limit warning if approaching limit but not suggesting meeting
      if (conversationStatus.approachingLimit && !shouldPromptMeeting) {
        if (
          messageCount % CONVERSATION_LIMITS.WARNING_DEBOUNCE_MESSAGES ===
          0
        ) {
          responseContent += `\n\n*Note: We're approaching the conversation limit. To have a more in-depth discussion, I need to better understand if this requires Binu's direct expertise. Could you provide more specific details about your project?*`;
        }
      }

      // Update meeting state if meeting was offered in the response AND score meets threshold
      let meetingState = state.meetingState;

      // ONLY update meeting state if score is above threshold AND link is in response
      if (
        totalScore >= VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE &&
        responseContent.includes(MEETING_CONFIG.CALENDAR_URL)
      ) {
        meetingState = "READY_FOR_BOOKING";
      } else {
      }

      // Check if response indicates booking confirmation
      if (
        meetingState === "READY_FOR_BOOKING" &&
        isLastMessageBookingConfirmation(state.messages)
      ) {
        meetingState = "BOOKED";
      }

      // Create assistant message from response
      const assistantMessage: Message = {
        id: uuidv4(),
        content: responseContent,
        role: "assistant",
        created_at: new Date().toISOString(),
        session_id: state.sessionId,
      };

      // DYNAMIC QUICK REPLIES IMPLEMENTATION
      // Only add quick replies when qualified for a meeting OR when LLM suggests them
      if (
        result.quickReplySuggestions &&
        Array.isArray(result.quickReplySuggestions)
      ) {
        // For non-meeting conversations, use quick replies from LLM if they exist
        const formattedQuickReplies = result.quickReplySuggestions
          .filter(
            (suggestion: { buttonText: string; responseText: string }) =>
              suggestion.buttonText && suggestion.responseText
          )
          .slice(0, 5) // Limit to 5 max
          .map((suggestion: { buttonText: string; responseText: string }) => ({
            text: suggestion.buttonText,
            value: suggestion.responseText,
          }));

        if (formattedQuickReplies.length > 0) {
          assistantMessage.quickReplies = formattedQuickReplies;
        }
      }

      // Get more detailed insights and next steps if they weren't provided
      let insights = result.keyInsights || [];
      let nextSteps = result.nextSteps || [];

      if (insights.length === 0) {
        try {
          insights = await extractKeyInsights(state.messages);
        } catch (error) {
          console.error("Error extracting key insights:", error);
          insights = [];
        }
      }

      if (nextSteps.length === 0) {
        try {
          nextSteps = await generateNextSteps(state.messages);
        } catch (error) {
          console.error("Error generating next steps:", error);
          nextSteps = [];
        }
      }

      // Calculate meeting priority considering complexity, urgency and technical requirements
      const meetingPriority =
        result.meetingPriority ||
        calculateMeetingPriority({
          ...state,
          validationScore: totalScore,
          scoreDetails: {
            baseScores: result.baseScores,
            intentCriteria: result.intentCriteria,
          },
          projectTimeline: result.projectTimeline,
          sentimentAnalysis: result.sentimentAnalysis,
        });

      // Return updated state with all enhanced analysis
      return {
        ...state,
        currentIntent: result.intent,
        conversationContext: result.context,
        validationScore: totalScore,
        scoreDetails: {
          baseScores: result.baseScores,
          intentCriteria: result.intentCriteria,
        },
        insights,
        nextSteps,
        technicalRequirements: result.technicalRequirements || [],
        sentimentAnalysis: result.sentimentAnalysis || {
          overall: "Neutral",
          details: { excitement: 0.5, interest: 0.5, concern: 0.5 },
        },
        projectTimeline: result.projectTimeline,
        keyEntities: result.keyEntities || [],
        meetingPriority,
        shouldOfferMeeting: shouldPromptMeeting,
        queryAuthenticity,
        conversationStatus,
        messageCount,
        conversationLimitResponse: result.conversationLimitResponse,
        messages: [...state.messages, assistantMessage],
        meetingState,
        // ONLY set appointmentLinkShown if score is above threshold
        appointmentLinkShown:
          meetingState !== "NOT_STARTED" &&
          totalScore >= VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE
            ? true
            : state.appointmentLinkShown,
      };
    } catch (error) {
      console.error("Error in context analyzer:", error);

      // Create proper error message
      const errorMessage =
        error instanceof ChatError
          ? error.message
          : "I'm having trouble processing your message. Could you please try again?";

      // If there's an error, create a fallback message
      const fallbackMessage: Message = {
        id: uuidv4(),
        content: errorMessage,
        role: "assistant",
        created_at: new Date().toISOString(),
        session_id: state.sessionId,
      };

      // Return state with error message but don't update scores
      return {
        ...state,
        messages: [...state.messages, fallbackMessage],
      };
    }
  };
};

/**
 * Check if the last user message indicates a booking confirmation
 */
function isLastMessageBookingConfirmation(messages: Message[]): boolean {
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");

  if (!lastUserMessage) return false;

  const lowerContent = lastUserMessage.content.toLowerCase();

  // Keywords that suggest booking confirmation
  const confirmationKeywords = [
    "booked",
    "scheduled",
    "confirmed",
    "set up",
    "appointment",
    "reserved",
    "selected",
    "picked",
    "chosen",
    "time slot",
  ];

  // Check for confirmation keywords
  return confirmationKeywords.some((keyword) => lowerContent.includes(keyword));
}

/**
 * Create a node for handling validation state changes
 * Based purely on meeting necessity score
 */
export const createValidationManager = (): Node<ChatState> => {
  return async (state: ChatState) => {
    try {
      // Check current validation state and update based on score
      let validationState = state.validationState;

      // Update validation state based on score with focus on meeting necessity
      if (
        state.validationScore >=
        VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE
      ) {
        validationState = "READY";
      } else if (
        state.validationScore >= VALIDATION_THRESHOLDS.MIN_CONFIDENCE
      ) {
        validationState = "ANALYZING";
      } else {
        validationState = "INSUFFICIENT";
      }

      // Return updated state
      return {
        ...state,
        validationState,
      };
    } catch (error) {
      console.error("Error in validation manager:", error);

      // Return unchanged state on error
      return state;
    }
  };
};
