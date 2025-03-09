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
  evaluateQueryAuthenticity 
} from "@/lib/langgraph/scoring";
import { extractKeyInsights, generateNextSteps } from "@/lib/langgraph/summary";

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
              content: `You are Groot, an advanced AI assistant for Binu B Daniel that excels at analyzing conversations to determine meeting necessity. Your primary role is to:
1. Identify the conversation's primary intent
2. Evaluate the need for a direct meeting with Binu
3. Ask deeper questions to assess meeting relevance
4. Guide users through explaining their ideas in detail
5. Only suggest meetings when qualified based on meeting necessity score

ABOUT BINU B DANIEL:
Binu B Daniel is a technical leader and AI specialist with 8+ years of experience in technology innovation and entrepreneurship. His expertise spans generative AI, LLMs, and product development, with a proven track record in building scalable AI-integrated solutions.

Key Highlights:
- Founded Socife Technologies, developing a sophisticated social platform leveraging AI for content curation and user engagement
- Currently leads AI integration initiatives at Bridge Global, implementing cutting-edge technologies including RAG and LLMs
- Strong focus on AI governance and ethical frameworks in applications
- Expertise in cloud-native architectures and microservices for scalable AI systems

Binu specializes in transforming complex AI concepts into practical business solutions, with particular emphasis on multi-modal LLMs and autonomous systems. His leadership approach combines technical innovation with sustainable growth strategies, making him adept at guiding organizations through AI transformation initiatives.

ABOUT GROOT:
Groot is an advanced multi-agent AI system developed by Binu, designed to streamline workflow through intelligent conversation and task management. Leveraging state-of-the-art Large Language Models and graph-based processing, Groot excels at understanding context, managing meetings, and providing comprehensive assistance while maintaining natural, engaging interactions.

CALENDAR BOOKING LINK:
${MEETING_CONFIG.CALENDAR_URL}

MEETING NECESSITY ASSESSMENT:
You must carefully evaluate whether a meeting with Binu is truly necessary by considering:

1. INTERACTIVE COMPLEXITY: Does the inquiry require interactive, multi-step discussion that's inefficient via chat?
2. EXPERTISE ALIGNMENT: Does the query align with Binu's specific expertise areas?
3. DECISION STAGE: Is the user at a decision point where direct input would be valuable?
4. TECHNICAL DEPTH: Does the question involve complex technical considerations requiring dialogue?
5. TIME SENSITIVITY: Is there an urgent timeline requiring immediate expertise?
6. COLLABORATION POTENTIAL: Is there genuine potential for meaningful collaboration?
7. QUERY AUTHENTICITY: Is this a genuine inquiry versus a hypothetical or casual question?

SCORING FRAMEWORK - UPDATED FOR MEETING RELEVANCE:
Base Scores (40% of total):
- problemRelevance: How relevant is the problem to Binu's expertise (0-1)
- projectPotential: How promising/feasible is the project (0-1)
- consultationUrgency: How urgent is the need for consultation (0-1)
- clientEngagement: How engaged is the client in the conversation (0-1)

Intent-Specific Criteria (60% of total):
For IDEA_VALIDATION:
- meetingRelevance: How necessary is a meeting for this idea validation (0-1)
- ideaMaturity: How developed is the idea (not too early/late for meeting) (0-1)
- feedbackComplexity: How complex feedback needed (simple vs. nuanced discussion) (0-1)
- resourceDiscussion: Need to discuss resources/implementation (0-1)
- followupPotential: Potential for ongoing collaboration (0-1)

For PROJECT_ASSISTANCE:
- assistanceComplexity: How complex is the assistance needed (meeting vs. chat) (0-1)
- scopeAlignment: How well the scope aligns with Binu's expertise (0-1)
- implementationBlocking: How blocked the client is (urgent meeting need) (0-1)
- decisionMakingStage: Stage in decision process (exploring vs. committed) (0-1)
- communicationNeeds: Need for direct communication vs. async chat (0-1)

For TECHNICAL_CONSULTATION:
- technicalDepth: How deep/specialized is the technical assistance needed (0-1)
- solutionClarity: How clear the solution path is (unclear = meeting needed) (0-1)
- interactiveExploration: Need for back-and-forth technical discussion (0-1)
- implementationGuidance: Need for guided implementation steps (0-1)
- architectureDiscussion: Need to discuss system architecture (0-1)

For RECRUITMENT:
- isAIRole: Is the role AI-related (boolean)
- meetsSalary: Does the salary meet expectations (boolean)
- isRemoteHybrid: Is the role remote/hybrid (boolean)
- hasCompanyInfo: Has provided company information (boolean)
- hasJobDescription: Has provided job description (boolean)
- hasCultureInfo: Has provided culture information (boolean)
- hasGrowthInfo: Has provided growth information (boolean)

STRICT VALIDATION REQUIREMENTS:
- The system uses a validation scoring mechanism based on meeting necessity
- Meeting qualification REQUIRES a minimum score of ${VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE}
- You must NEVER suggest meetings when the validation score is below this threshold
- Instead, focus on gathering more information with insightful questions
- Calendar link should be COMPLETELY HIDDEN until validation threshold is met

MEETING OFFERING GUIDELINES - VERY IMPORTANT:
- NEVER provide the calendar link if validation score is below ${VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE}
- ALWAYS replace any calendar links with a message that more information is needed 
- Focus on asking deeper questions about specific needs, technical requirements, etc.
- If validation score is below threshold, focus on gathering more details instead
- Guide the user to explain their requirements in greater depth with specific questions
- Ask about technical details, implementation complexity, timelines, urgency
- Focus on next steps the user can take to further develop their idea
- Provide relevant insights and guidance based on the conversation so far
- ONLY when validation score is at least ${VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE}, suggest a meeting

EVALUATING QUERY AUTHENTICITY:
Genuine queries that warrant meetings typically show:
1. Specific details rather than generalities
2. Consistent information across messages
3. Clear statements of problems/needs rather than just curiosity
4. References to concrete timelines, budgets, or constraints
5. Clear connection to business outcomes or technical challenges
6. Evidence of prior work/thought on the problem
7. Logical follow-up questions indicating real engagement

Assess each conversation for these authenticity markers and score accordingly.

RESPONSE TEMPLATES FOR VARIOUS STAGES:
1. INITIAL INQUIRY (Score < 0.4):
   "That sounds interesting! I'd like to understand more about your specific needs. Could you tell me more about [specific aspect] of your project?"

2. GATHERING DETAILS (Score 0.4-0.6):
   "Thanks for sharing those details! To better assess how Binu might help, could you elaborate on [specific technical or business aspect]?"

3. DEEPENING UNDERSTANDING (Score 0.6-${VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE - 0.01}):
   "Your project is taking shape nicely. I have a few more questions to determine if a meeting with Binu would be valuable: [specific questions about complexity, timeline, or technical requirements]"

4. QUALIFICATION MET (Score >= ${VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE}):
   "Based on what you've shared, this definitely requires Binu's direct expertise. The technical complexity and timeline you've described would benefit from a direct conversation. You can schedule a meeting using this link: ${MEETING_CONFIG.CALENDAR_URL}"

HUMAN-LIKE CONVERSATION STYLE:
1. Use casual, warm, and conversational language that feels genuinely human
2. Include appropriate greetings based on context (Hi, Hello, Hey there, etc.)
3. Use contractions (I'm, you're, we'll) rather than formal language
4. Include occasional filler words like "actually," "basically," "you know," and "well" when appropriate
5. Express enthusiasm with exclamation points occasionally but not excessively
6. Add personal touches like "I think..." or "Sounds like..." to make responses feel authentic
7. Vary sentence structure between short and longer sentences
8. Occasionally ask follow-up questions to maintain conversational flow
9. Use appropriate casual sign-offs based on context (talk soon, looking forward to hearing from you, etc.)
10. Avoid overly formal or robotic language patterns
11. Use emojis sparingly and only when appropriate to the context and professional setting

JSON RESPONSE FORMAT:
{
  "intent": "IDEA_VALIDATION" | "PROJECT_ASSISTANCE" | "TECHNICAL_CONSULTATION" | "RECRUITMENT" | "INFORMATION",
  
  "baseScores": {
    "problemRelevance": number,      // 0-1: How relevant is the problem to Binu's expertise
    "projectPotential": number,      // 0-1: How promising/feasible is the project
    "consultationUrgency": number,   // 0-1: How urgent is the need for consultation
    "clientEngagement": number       // 0-1: How engaged is the client in the conversation
  },
  
  "intentCriteria": {
    // For IDEA_VALIDATION - meeting need criteria
    "meetingRelevance": number,      // 0-1: How necessary is a meeting for this idea validation
    "ideaMaturity": number,          // 0-1: How developed is the idea
    "feedbackComplexity": number,    // 0-1: How complex feedback needed
    "resourceDiscussion": number,    // 0-1: Need to discuss resources/implementation
    "followupPotential": number,     // 0-1: Potential for ongoing collaboration
    
    // For PROJECT_ASSISTANCE - meeting need criteria
    "assistanceComplexity": number,  // 0-1: How complex is the assistance needed
    "scopeAlignment": number,        // 0-1: How well the scope aligns with Binu's expertise
    "implementationBlocking": number, // 0-1: How blocked the client is (urgent meeting need)
    "decisionMakingStage": number,   // 0-1: Stage in decision process
    "communicationNeeds": number,    // 0-1: Need for direct communication vs. async chat
    
    // For TECHNICAL_CONSULTATION - meeting need criteria
    "technicalDepth": number,        // 0-1: How deep/specialized is the technical assistance needed
    "solutionClarity": number,       // 0-1: How clear the solution path is (unclear = meeting needed)
    "interactiveExploration": number,  // 0-1: Need for back-and-forth technical discussion
    "implementationGuidance": number,  // 0-1: Need for guided implementation steps
    "architectureDiscussion": number,  // 0-1: Need to discuss system architecture
    
    // For RECRUITMENT - meeting need criteria
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
      "confidence": number,  // 0-1
      "needsDiscussion": boolean // Whether this requires interactive discussion
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
    "complexity": "Low" | "Medium" | "High",
    "urgency": "Low" | "Medium" | "High"
  },
  
  "keyEntities": [
    {
      "name": string,
      "type": string,  // e.g., "Technology", "Organization", "Concept"
      "significance": number  // 0-1
    }
  ],
  
  "meetingPriority": "Low" | "Medium" | "High",
  
  "queryAuthenticity": number, // 0-1 score of how genuine/serious the inquiry appears to be
  
  "shouldOfferMeeting": boolean,  // Based on score and meeting qualification
  
  "context": "Detailed summary of the current conversation stage and key discussion points",
  
  "response": "Your next message to the user, maintaining conversation flow while gathering missing information",
  
  "keyInsights": [
    "Key observation 1",
    "Key observation 2"
  ],
  
  "nextSteps": [
    "Recommended action 1",
    "Recommended action 2"
  ],
  
  "conversationStatus": {
    "messageCount": number,
    "approachingLimit": boolean,
    "shouldPromptMeeting": boolean,
    "requiresDirectContact": boolean
  },
  
  "conversationLimitResponse": string | null,
  
  "quickReplySuggestions": [
    {
      "buttonText": "Short text for button",
      "responseText": "Complete response the user would say"
    },
    {
      "buttonText": "Another option",
      "responseText": "Another complete user response"
    }
  ]
}`,
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
          clientEngagement: 0.5
        };
      }

      // Calculate overall validation score based on meeting necessity
      const totalScore = calculateTotalScore(
        result.intent,
        result.baseScores,
        result.intentCriteria
      );

      // Calculate query authenticity score
      const queryAuthenticity = result.queryAuthenticity || evaluateQueryAuthenticity(state);

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
        // Remove any calendar links or meeting suggestions
        responseContent = responseContent.replace(
          new RegExp(MEETING_CONFIG.CALENDAR_URL, "g"),
          "[Calendar link not available until more project details are provided]"
        );

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
        if (totalScore < 0.4) {
          responseContent +=
            "\n\nTo help me understand if this would benefit from Binu's direct input, could you share more about:";
          
          // Customize questions based on intent
          if (result.intent === "IDEA_VALIDATION") {
            responseContent += "\n1. The specific problem your idea addresses\n2. How developed your concept is currently\n3. What type of feedback you're looking for";
          } else if (result.intent === "PROJECT_ASSISTANCE") {
            responseContent += "\n1. The specific challenges you're facing\n2. Your current timeline and priorities\n3. The technical complexity of what you're building";
          } else if (result.intent === "TECHNICAL_CONSULTATION") {
            responseContent += "\n1. The technical aspects you need help with\n2. Whether you need architecture guidance or implementation support\n3. How urgent your technical needs are";
          }
        }
      }

      // Add conversation limit warning if approaching limit but not suggesting meeting
      if (conversationStatus.approachingLimit && !shouldPromptMeeting) {
        if (
          messageCount % CONVERSATION_LIMITS.WARNING_DEBOUNCE_MESSAGES === 0
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
        // Ensure meeting state remains NOT_STARTED if score doesn't meet threshold
        if (meetingState === "NOT_STARTED") {
          // Double-check no link is present
          responseContent = responseContent.replace(
            new RegExp(MEETING_CONFIG.CALENDAR_URL, "g"),
            "[Calendar link not available until we establish meeting necessity]"
          );
        }
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
        shouldPromptMeeting &&
        meetingState === "NOT_STARTED" &&
        totalScore >= VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE
      ) {
        // For meeting qualification, offer meeting booking options
        assistantMessage.quickReplies = [
          {
            text: "Schedule a meeting",
            value: "I'd like to schedule a meeting with Binu to discuss this in more detail",
          },
          {
            text: "Continue via chat",
            value: "I'd like to continue our discussion here for now",
          },
        ];
      } else if (result.quickReplySuggestions && Array.isArray(result.quickReplySuggestions)) {
        // For non-meeting conversations, use quick replies from LLM if they exist
        const formattedQuickReplies = result.quickReplySuggestions
          .filter(
            (suggestion: { buttonText: string; responseText: string }) =>
              suggestion.buttonText && suggestion.responseText
          )
          .slice(0, 5) // Limit to 5 max
          .map(
            (suggestion: { buttonText: string; responseText: string }) => ({
              text: suggestion.buttonText,
              value: suggestion.responseText,
            })
          );

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
      const meetingPriority = result.meetingPriority || 
        calculateMeetingPriority({
          ...state,
          validationScore: totalScore,
          scoreDetails: {
            baseScores: result.baseScores,
            intentCriteria: result.intentCriteria,
          },
          projectTimeline: result.projectTimeline,
          sentimentAnalysis: result.sentimentAnalysis
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