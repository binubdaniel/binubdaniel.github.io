// src/lib/langgraph/nodes.ts

import { 
  ChatState, 
  Node, 
  Message, 
  ChatError, 
  ErrorCode, 
  MODEL_CONFIG,
  VALIDATION_THRESHOLDS,
  CONVERSATION_LIMITS
} from "@/lib/langgraph/types";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import { calculateTotalScore, calculateMeetingPriority } from "./scoring";
import { getBookingLink } from "@/lib/langgraph/types";
import { extractKeyInsights, generateNextSteps } from "./summary";

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
 * Enhanced with comprehensive analysis and dynamic meeting suggestions
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
              content: `You are Groot, an advanced AI assistant for Binu B Daniel that excels at analyzing conversations to determine user intent and qualification for potential collaboration. Your primary role is to:
1. Identify the conversation's primary intent
2. Evaluate the quality and depth of the interaction
3. Assess if the conversation warrants a meeting with Binu
4. Provide relevant insights and next steps

ABOUT BINU B DANIEL:
Binu Babu is a technical leader and AI specialist with 8+ years of experience in technology innovation and entrepreneurship. His expertise spans generative AI, LLMs, and product development, with a proven track record in building scalable AI-integrated solutions.

Key Highlights:
- Founded Socife Technologies, developing a sophisticated social platform leveraging AI for content curation and user engagement
- Currently leads AI integration initiatives at Bridge Global, implementing cutting-edge technologies including RAG and LLMs
- Strong focus on AI governance and ethical frameworks in applications
- Expertise in cloud-native architectures and microservices for scalable AI systems

Binu specializes in transforming complex AI concepts into practical business solutions, with particular emphasis on multi-modal LLMs and autonomous systems. His leadership approach combines technical innovation with sustainable growth strategies, making him adept at guiding organizations through AI transformation initiatives.

ABOUT GROOT:
Groot is an advanced multi-agent AI system developed by Binu, designed to streamline your workflow through intelligent conversation and task management. Leveraging state-of-the-art Large Language Models and graph-based processing, Groot excels at understanding context, managing meetings, and providing comprehensive assistance while maintaining natural, engaging interactions.

CONVERSATION MANAGEMENT:
Instead of using fixed message count thresholds:
1. Dynamically assess the conversation's quality, depth, and the user's needs
2. Suggest scheduling a meeting when:
   - The conversation reaches a validation score of 0.7 or higher, AND
   - The discussion has sufficient depth to warrant a live conversation
3. Focus on value-based triggers rather than arbitrary message counts
4. Track conversation quality metrics to determine when a meeting would be beneficial

ENHANCED ANALYSIS APPROACH:
1. Technical Requirements Analysis - Identify specific technologies, frameworks, tools and their confidence levels
2. Sentiment Analysis - Assess user's excitement, interest, and concerns
3. Timeline Estimation - Evaluate project complexity and provide rough timeline estimates
4. Entity Recognition - Extract key organizations, technologies, markets, and concepts
5. Meeting Priority Assessment - Determine how urgently a meeting should be scheduled

JSON RESPONSE FORMAT:
{
  "intent": "IDEA_VALIDATION" | "PROJECT_ASSISTANCE" | "TECHNICAL_CONSULTATION" | "RECRUITMENT" | "INFORMATION",
  
  "baseScores": {
    "problemUnderstanding": number,  // 0-1
    "solutionVision": number,        // 0-1
    "projectCommitment": number,     // 0-1
    "engagementQuality": number      // 0-1
  },
  
  "intentCriteria": {
    // For IDEA_VALIDATION
    "hasBusinessModel": number,      // 0-1
    "marketResearch": number,        // 0-1
    "technicalFeasibility": number,  // 0-1
    "resourcePlanning": number,      // 0-1
    "implementationTimeline": number // 0-1
    
    // For PROJECT_ASSISTANCE
    "scopeClarity": number,          // 0-1
    "technicalRequirements": number, // 0-1
    "timeline": number,              // 0-1
    "budget": number,                // 0-1
    "success_criteria": number       // 0-1
    
    // For TECHNICAL_CONSULTATION
    "problemComplexity": number,     // 0-1
    "aiRelevance": number,          // 0-1
    "requirementClarity": number,    // 0-1
    "implementationPath": number,    // 0-1
    "expectedOutcomes": number       // 0-1
    
    // For RECRUITMENT
    "isAIRole": boolean,
    "meetsSalary": boolean,
    "isRemoteHybrid": boolean,
    "hasCompanyInfo": boolean,
    "hasJobDescription": boolean,
    "hasCultureInfo": boolean,
    "hasGrowthInfo": boolean
  },
  
  "technicalRequirements": [
    {
      "name": string,
      "confidence": number  // 0-1
    }
  ],
  
  "sentimentAnalysis": {
    "overall": "Positive" | "Neutral" | "Negative",
    "details": {
      "excitement": number,  // 0-1
      "interest": number,    // 0-1
      "concern": number      // 0-1
    }
  },
  
  "projectTimeline": {
    "estimated": string,  // e.g., "2-3 months"
    "complexity": "Low" | "Medium" | "High"
  },
  
  "keyEntities": [
    {
      "name": string,
      "type": string,  // e.g., "Technology", "Organization", "Concept"
      "significance": number  // 0-1
    }
  ],
  
  "meetingPriority": "Low" | "Medium" | "High",
  
  "shouldOfferMeeting": boolean,  // Based on score and conversation quality
  
  "context": "Detailed summary of the current conversation stage and key discussion points",
  
  "response": "Your next message to the user, maintaining conversation flow while gathering missing information",
  
  "keyInsights": [
    "Key observation 1",
    "Key observation 2",
    ...
  ],
  
  "nextSteps": [
    "Recommended action 1",
    "Recommended action 2",
    ...
  ],
  
  "conversationStatus": {
    "messageCount": number,
    "approachingLimit": boolean,
    "shouldPromptMeeting": boolean,
    "requiresDirectContact": boolean
  },
  
  "conversationLimitResponse": string | null
}

IMPORTANT GUIDELINES:
1. Always maintain conversation context
2. Focus on gathering missing information naturally
3. Evaluate both quantitative and qualitative aspects
4. Consider both technical and business perspectives
5. Flag any critical missing information
6. Provide actionable next steps
7. Ensure scoring consistency across conversations
8. Use dynamic assessment rather than fixed message counts
9. Make timely meeting suggestions based on score (>= 0.7), not message count
10. Guide conversation toward conclusion when nearing the maximum limit of ${CONVERSATION_LIMITS.MAX_MESSAGES} messages
11. Decline queries that are not relevant to the domain expertise of Binu B Daniel
12. Mimic human tone in all responses

MEETING SUGGESTIONS:
- Only suggest meetings when the validation score is at least ${VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE}
- Consider the complexity and depth of the topic when suggesting meetings
- Tailor meeting suggestions to the specific context and intent
- For complex technical discussions or high-value opportunities, assign higher meeting priority

BE SURE TO PROVIDE ACCURATE SCORES FOR ALL CRITERIA - THIS IS CRITICAL FOR PROPERLY CALCULATING VALIDATION SCORES. ALL SCORES MUST BE ACCURATE NUMERIC VALUES BETWEEN 0.0 AND 1.0.
`,
            },
            { role: "user", content: conversation },
          ],
          response_format: { type: "json_object" },
          temperature: MODEL_CONFIG.TEMPERATURE,
          max_tokens: MODEL_CONFIG.MAX_TOKENS
        });
      } catch (error) {
        console.error("Error calling primary model:", error);
        // Fallback to mini model
        response = await openai.chat.completions.create({
          model: MODEL_CONFIG.FALLBACK_MODEL,
          messages: [
            {
              role: "system",
              content: "You are an AI assistant analyzing a conversation. Provide an analysis in JSON format.",
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
          problemUnderstanding: 0.5,
          solutionVision: 0.5,
          projectCommitment: 0.5, 
          engagementQuality: 0.5
        };
      }

      // Calculate overall validation score
      const totalScore = calculateTotalScore(
        result.intent,
        result.baseScores,
        result.intentCriteria
      );

      // Update conversation status
      const messageCount = state.messages.length + 1; // Add 1 for upcoming assistant message
      
      // Dynamic meeting suggestion based on score rather than message count
      const shouldPromptMeeting = 
        totalScore >= VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE && 
        (result.shouldOfferMeeting === true || result.meetingPriority === "High");
      
      const conversationStatus = {
        messageCount,
        approachingLimit: messageCount >= CONVERSATION_LIMITS.SOFT_WARNING_AT,
        shouldPromptMeeting,
        requiresDirectContact: messageCount >= CONVERSATION_LIMITS.MAX_MESSAGES - 5
      };

      // Check if we need to add a conversation limit warning
      let responseContent = result.response;
      if (conversationStatus.approachingLimit && !shouldPromptMeeting) {
        // Only add warning if we're not already suggesting a meeting
        if (messageCount % CONVERSATION_LIMITS.WARNING_DEBOUNCE_MESSAGES === 0) {
          // Add warning every few messages
          responseContent += `\n\n*Note: We're approaching the conversation limit. To have a more in-depth discussion, it might be helpful to schedule a meeting with Binu soon.*`;
        }
      }

      // Create assistant message from response
      const assistantMessage: Message = {
        id: uuidv4(),
        content: responseContent,
        role: "assistant",
        created_at: new Date().toISOString(),
        session_id: state.sessionId,
      };

      // Add quick replies for meeting scheduling if suggestion criteria met
      if (shouldPromptMeeting) {
        assistantMessage.quickReplies = [
          {
            text: "Schedule a meeting",
            value: "I'd like to schedule a meeting with Binu"
          },
          {
            text: "Continue discussion",
            value: "I'd like to continue our discussion for now"
          }
        ];
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

      // If technical requirements or meeting priority weren't provided, calculate them
      const technicalRequirements = result.technicalRequirements || [];
      const meetingPriority = result.meetingPriority || calculateMeetingPriority({
        ...state,
        validationScore: totalScore,
        scoreDetails: {
          baseScores: result.baseScores,
          intentCriteria: result.intentCriteria
        },
        projectTimeline: result.projectTimeline
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
        technicalRequirements,
        sentimentAnalysis: result.sentimentAnalysis || {
          overall: "Neutral",
          details: { excitement: 0.5, interest: 0.5, concern: 0.5 }
        },
        projectTimeline: result.projectTimeline,
        keyEntities: result.keyEntities || [],
        meetingPriority,
        shouldOfferMeeting: shouldPromptMeeting,
        conversationStatus,
        messageCount,
        conversationLimitResponse: result.conversationLimitResponse,
        messages: [
          ...state.messages,
          assistantMessage
        ],
      };
    } catch (error) {
      console.error("Error in context analyzer:", error);
      
      // Create proper error message
      const errorMessage = error instanceof ChatError 
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
        messages: [...state.messages, fallbackMessage]
      };
    }
  };
};

/**
 * Extract time information from message content
 */
const extractTimeInfo = (content: string): string | null => {
  // Match various time formats like "9 AM", "9:30 AM", "9am", etc.
  const timePatterns = [
    // Time with AM/PM + day
    /\b(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM))\s+(?:on\s+)?(\w+day)\b/i,
    
    // Just time with AM/PM
    /\b(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM))\b/i,
    
    // Day of week
    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    
    // Shortened day of week
    /\b(mon|tue|wed|thu|fri|sat|sun)\b/i,
    
    // Date formats like March 15
    /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?\b/i,
    
    // ISO date format
    /\b\d{4}-\d{2}-\d{2}\b/i
  ];
  
  for (const pattern of timePatterns) {
    const match = content.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  return null;
};

/**
 * Check if content indicates a meeting request
 */
const isMeetingRequest = (content: string): boolean => {
  const lowerContent = content.toLowerCase();
  
  // Keywords that suggest meeting intent
  const meetingKeywords = [
    'schedule', 'meeting', 'appointment', 'book', 'calendar', 
    'talk', 'discuss', 'conversation', 'call', 'chat', 'zoom',
    'meet', 'session', 'consultation', 'videoconference'
  ];
  
  // Check for meeting keywords
  return meetingKeywords.some(keyword => lowerContent.includes(keyword));
};

/**
 * Check if content confirms a booking
 */
const isBookingConfirmation = (content: string): boolean => {
  const lowerContent = content.toLowerCase();
  
  // Keywords that suggest booking confirmation
  const confirmationKeywords = [
    'booked', 'scheduled', 'confirmed', 'set up', 'appointment', 
    'reserved', 'selected', 'picked', 'chosen', 'time slot'
  ];
  
  // Check for confirmation keywords
  return confirmationKeywords.some(keyword => lowerContent.includes(keyword));
};

/**
 * Generate friendly response based on meeting state and time
 */
const generateMeetingResponse = (
  state: ChatState, 
  timeInfo: string | null
): string => {
  // Base meeting scheduled message
  let response = "Great! You can schedule a meeting using this link: ";
  
  // Add booking link
  response += getBookingLink(state.email);
  console.log(timeInfo)
  
  // Additional context based on current state
  switch (state.currentIntent) {
    case "IDEA_VALIDATION":
      response += "\n\nDuring the meeting, Binu can help validate your idea and provide insights on technical feasibility, market potential, and implementation strategies.";
      break;
    case "PROJECT_ASSISTANCE":
      response += "\n\nIn the meeting, Binu can dive deeper into your project requirements and discuss how he can best assist with technology selection and implementation planning.";
      break;
    case "TECHNICAL_CONSULTATION":
      response += "\n\nBinu will be able to explore technical solutions tailored to your specific requirements and help resolve any complex challenges during the meeting.";
      break;
    case "RECRUITMENT":
      response += "\n\nDuring the meeting, you can discuss your hiring needs and explore potential collaboration opportunities with Binu.";
      break;
    default:
      response += "\n\nBinu is looking forward to connecting with you!";
  }
  
  // Additional information about preparation
  response += "\n\nIs there anything specific you'd like to prepare or discuss during the meeting?";
  
  return response;
};

/**
 * Create a node for handling meeting requests
 */
export const createMeetingManager = (): Node<ChatState> => {
  return async (state: ChatState) => {
    try {
      // Get the last user message
      const lastUserMessage = [...state.messages]
        .reverse()
        .find(m => m.role === "user");
      
      if (!lastUserMessage) {
        return state;
      }
      
      // Check if the message is requesting a meeting
      const meetingRequested = isMeetingRequest(lastUserMessage.content);
      const timeInfo = extractTimeInfo(lastUserMessage.content);
      
      // If user is requesting a meeting and their score is sufficient
      if (meetingRequested && state.validationScore >= VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE) {
        // If we haven't shown the booking link yet
        if (state.meetingState === "NOT_STARTED") {
          // Generate response with booking link
          const responseContent = generateMeetingResponse(state, timeInfo);
          
          // Create assistant message
          const appointmentMessage: Message = {
            id: uuidv4(),
            content: responseContent,
            role: "assistant",
            created_at: new Date().toISOString(),
            session_id: state.sessionId
          };
          
          // Return updated state
          return {
            ...state,
            meetingState: "READY_FOR_BOOKING",
            appointmentLinkShown: true,
            messages: [...state.messages, appointmentMessage]
          };
        } 
        // If we've already shown the booking link but they're asking again
        else if (state.meetingState === "READY_FOR_BOOKING") {
          // Remind them about the booking link
          const bookingLink = getBookingLink(state.email);
          
          const reminderMessage: Message = {
            id: uuidv4(),
            content: `You can still schedule a meeting using this link: ${bookingLink}\n\nIs there anything specific you'd like to discuss in the meeting?`,
            role: "assistant",
            created_at: new Date().toISOString(),
            session_id: state.sessionId
          };
          
          return {
            ...state,
            messages: [...state.messages, reminderMessage]
          };
        }
      }
      
      // Check if user is confirming they've booked a meeting
      if (isBookingConfirmation(lastUserMessage.content) && 
          state.meetingState === "READY_FOR_BOOKING") {
        
        // Extract any time information they mention
        const mentionedTime = timeInfo;
        
        // Create confirmation message
        let confirmationText = "Excellent! I've noted that you've booked a meeting with Binu";
        if (mentionedTime) {
          confirmationText += ` for ${mentionedTime}`;
        }
        confirmationText += ". He's looking forward to the conversation!";
        
        // Add preparation question
        confirmationText += "\n\nIs there anything specific you'd like to prepare or discuss during your meeting?";
        
        const confirmationMessage: Message = {
          id: uuidv4(),
          content: confirmationText,
          role: "assistant",
          created_at: new Date().toISOString(),
          session_id: state.sessionId
        };
        
        // Update state to booked
        return {
          ...state,
          meetingState: "BOOKED",
          messages: [...state.messages, confirmationMessage]
        };
      }
      
      // No changes to state
      return state;
    } catch (error) {
      console.error("Error in meeting manager:", error);
      
      // Return unchanged state on error
      return state;
    }
  };
};

/**
 * Create a node for handling validation state changes
 */
export const createValidationManager = (): Node<ChatState> => {
  return async (state: ChatState) => {
    try {
      // Check current validation state and update based on score
      let validationState = state.validationState;
      
      // Update validation state based on score without message count requirements
      if (state.validationScore >= VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE) {
        validationState = "READY";
      } else if (state.validationScore >= VALIDATION_THRESHOLDS.MIN_CONFIDENCE) {
        validationState = "ANALYZING";
      } else {
        validationState = "INSUFFICIENT";
      }
      
      // Return updated state
      return {
        ...state,
        validationState
      };
    } catch (error) {
      console.error("Error in validation manager:", error);
      
      // Return unchanged state on error
      return state;
    }
  };
};