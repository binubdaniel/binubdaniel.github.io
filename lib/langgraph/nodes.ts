// src/lib/langgraph/nodes.ts

import { ChatState, Node,  } from "@/lib/langgraph/types";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import { calculateTotalScore } from "./scoring";
import {  Message, getBookingLink } from "@/lib/langgraph/types";

// Ensure OpenAI API key is defined
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error("Missing OpenAI API key");
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

/**
 * Create a node for analyzing conversation context and user intent
 * Fixed to ensure proper score calculation and propagation
 */
export const createContextAnalyzer = (): Node<ChatState> => {
  return async (state: ChatState) => {
    try {
      // Format conversation history for analysis
      const conversation = state.messages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      // Call OpenAI for analysis
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
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
1. Maximum Conversation Length: 15-20 messages
2. When conversation reaches 12-15 messages:
   - If score ≥ 0.7: Proactively suggest scheduling a meeting
   - If score < 0.7: Guide toward key missing information
3. When conversation reaches 15-20 messages:
   - If score ≥ 0.7: Direct to schedule meeting immediately
   - If score < 0.7: Inform that the conversation length limit is approaching and suggest direct contact with Binu B Daniel
4. Track conversation progression:
   - Count total messages exchanged
   - Monitor information gathering progress
   - Assess engagement quality over time

CONVERSATION LENGTH RESPONSES:

When 12-15 messages:
"I notice we've had a detailed discussion. Given the promising direction [specific aspect], would you like to schedule a meeting with Binu to discuss this further?"

When 15-20 messages with high score:
"We've had a comprehensive discussion and your [project/idea/position] shows strong potential. Let's schedule a meeting with Binu to dive deeper into [specific aspects]."

When 15-20 messages with low score:
"While we've had an extensive discussion, I recommend connecting directly with Binu to address [missing aspects]. You can reach out to him to discuss your [project/idea/position] in more detail."

JSON RESPONSE FORMAT:
{
  "intent": "IDEA_VALIDATION" | "PROJECT_ASSISTANCE" | "TECHNICAL_CONSULTATION" | "RECRUITMENT",
  
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
8. Monitor conversation length actively
9. Make timely meeting suggestions
10. Guide conversation toward conclusion when nearing limits
11. Decline queries that are not relevant to the domain expertise of Binu B Daniel
12. Mimic human tone.

CONVERSATION PROGRESSION MANAGEMENT:
1. Early Stage (1-7 messages):
   - Focus on understanding and information gathering
   - Identify intent and key requirements
   - Establish engagement quality

2. Mid Stage (8-14 messages):
   - Deep dive into specific areas
   - Address gaps in information
   - Begin evaluating meeting readiness

3. Late Stage (15-20 messages):
   - Move toward concrete next steps
   - Make clear recommendations
   - Either schedule meeting or suggest direct contact

4. Essential flags to monitor:
   - Message count tracking
   - Information completeness
   - Score progression
   - Meeting readiness

BE SURE TO PROVIDE ACCURATE SCORES FOR ALL CRITERIA - THIS IS CRITICAL FOR PROPERLY CALCULATING VALIDATION SCORES. ALL SCORES MUST BE ACCURATE NUMERIC VALUES BETWEEN 0.0 AND 1.0.
`,
          },
          { role: "user", content: conversation },
        ],
        response_format: { type: "json_object" },
      });

      // Parse response and extract relevant information
      const result = JSON.parse(response.choices[0].message.content || "{}");

      // Check if required fields exist
      if (!result.baseScores) {
        console.error("Missing baseScores in API response");
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

      // Log scores for debugging
      // console.log("Calculated validation score:", totalScore);
      // console.log("Base scores:", result.baseScores);
      // console.log("Intent criteria:", result.intentCriteria);

      // Update conversation status
      const messageCount = state.messages.length + 1; // Add 1 for upcoming assistant message
      const conversationStatus = {
        messageCount,
        approachingLimit: messageCount >= 14,
        shouldPromptMeeting: messageCount >= 7 && totalScore >= 0.7,
        requiresDirectContact: messageCount >= 21 && totalScore < 0.7
      };

      // Create assistant message from response
      const assistantMessage: Message = {
        id: uuidv4(),
        content: result.response,
        role: "assistant",
        created_at: new Date().toISOString(),
        session_id: state.sessionId,
      };

      // Add quick replies for meeting scheduling if score is high enough
      if (totalScore >= 0.7 && messageCount >= 7) {
        assistantMessage.quickReplies = [
          {
            text: "Schedule a meeting",
            value: "I'd like to schedule a meeting with Binu"
          },
          {
            text: "Continue discussion",
            value: "I'd like to continue our discussion"
          }
        ];
      }

      // Return updated state with properly calculated score
      return {
        ...state,
        currentIntent: result.intent,
        conversationContext: result.context,
        validationScore: totalScore,
        scoreDetails: {
          baseScores: result.baseScores,
          intentCriteria: result.intentCriteria,
        },
        insights: result.keyInsights,
        nextSteps: result.nextSteps,
        shouldOfferMeeting: totalScore >= 0.7 && messageCount >= 10,
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
      
      // If there's an error, create a fallback message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm having trouble processing your message. Could you please try again or rephrase your question?",
        role: "assistant",
        created_at: new Date().toISOString(),
        session_id: state.sessionId,
      };
      
      // Return state with error message but don't update scores
      return {
        ...state,
        messages: [...state.messages, errorMessage]
      };
    }
  };
};

/**
 * Function for extracting time information from messages
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
    /\b(mon|tue|wed|thu|fri|sat|sun)\b/i
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
 * Create a node for handling meeting requests using Google Calendar Scheduling
 */
export const createMeetingManager = (): Node<ChatState> => {
  return async (state: ChatState) => {
    // Implementation continues...
    // Check if current message requests a meeting
    const lastUserMessage = [...state.messages]
      .reverse()
      .find(m => m.role === "user");
      
    if (!lastUserMessage) {
      return state;
    }
    
    const isMeetingRequest = lastUserMessage.content.toLowerCase().includes("meeting") || 
                            lastUserMessage.content.toLowerCase().includes("schedule") ||
                            lastUserMessage.content.toLowerCase().includes("appointment");
    
    // If user is requesting a meeting and has sufficient score
    if (isMeetingRequest && state.validationScore >= 0.7) {
      // We haven't shown the appointment link yet
      if (!state.appointmentLinkShown) {
        // Get booking link with user's email if available
        const bookingLink = getBookingLink(state.email);
        
        // Create a message with the direct appointment link
        const appointmentMessage: Message = {
          id: uuidv4(),
          content: `Great! You can schedule a meeting with Binu by clicking this link: ${bookingLink}\n\nPlease select a time that works for you. If you have any questions or need to reschedule, just let me know!`,
          role: "assistant",
          created_at: new Date().toISOString(),
          session_id: state.sessionId,
        };
        
        // Return updated state with appointment message and updated meeting state
        return {
          ...state,
          meetingState: "READY_FOR_BOOKING",
          appointmentLinkShown: true,
          messages: [...state.messages, appointmentMessage]
        };
      } else {
        // We've already shown the appointment link, remind the user with the direct link again
        const bookingLink = getBookingLink(state.email);
        
        const reminderMessage: Message = {
          id: uuidv4(),
          content: `You can schedule a meeting with Binu by clicking this link: ${bookingLink}\n\nIs there anything specific you'd like to discuss during the meeting?`,
          role: "assistant",
          created_at: new Date().toISOString(),
          session_id: state.sessionId,
        };
        
        return {
          ...state,
          messages: [...state.messages, reminderMessage]
        };
      }
    }
    
    // If the user confirms they've booked a meeting
    const isBookingConfirmation = 
      lastUserMessage.content.toLowerCase().includes("booked") ||
      lastUserMessage.content.toLowerCase().includes("scheduled") ||
      (lastUserMessage.content.toLowerCase().includes("appointment") && 
      lastUserMessage.content.toLowerCase().includes("confirmed"));
    
    // Extract time mentioned by user
    const timeInfo = extractTimeInfo(lastUserMessage.content);
    const mentionsTime = timeInfo !== null;
    
    if ((isBookingConfirmation || mentionsTime) && state.meetingState === "READY_FOR_BOOKING") {
      let timePhrase = "";
      if (timeInfo) {
        timePhrase = ` for ${timeInfo}`;
      }
      
      const confirmationMessage: Message = {
        id: uuidv4(),
        content: `Excellent! I've noted that you've booked a meeting with Binu${timePhrase}. He's looking forward to speaking with you. Is there anything specific you'd like him to prepare for the meeting?`,
        role: "assistant",
        created_at: new Date().toISOString(),
        session_id: state.sessionId,
      };
      
      return {
        ...state,
        meetingState: "BOOKED",
        messages: [...state.messages, confirmationMessage]
      };
    }
    
    // No changes needed
    return state;
  };
};

/**
 * Create a node for handling validation state changes
 */
export const createValidationManager = (): Node<ChatState> => {
  return async (state: ChatState) => {
    // Check current validation state and update based on score
    let validationState = state.validationState;
    
    // Log current state
    console.log("Validation manager - Current state:", {
      validationScore: state.validationScore,
      messageCount: state.messageCount,
      validationState: state.validationState
    });
    
    // Update validation state based on score and message count
    if (state.validationScore >= 0.7 && state.messageCount >= 7) {
      validationState = "READY";
    } else if (state.messageCount >= 7) {
      validationState = "INSUFFICIENT";
    } else {
      validationState = "ANALYZING";
    }
    
    console.log("Validation manager - New state:", validationState);
    
    // Return updated state
    return {
      ...state,
      validationState
    };
  };
};