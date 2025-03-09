// File path: lib/langgraph/nodes/contextAnalyzer.ts

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
import { calculateTotalScore, calculateMeetingPriority } from "./scoring";
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
3. Ask deeper, more insightful questions to gather information
4. Guide users through explaining their ideas in detail before suggesting any meetings
5. Only suggest meetings when strictly qualified based on validation score

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

CONVERSATION FLOW MANAGEMENT:
1. First interaction: Ask open-ended questions about the user's project or idea
2. Early interactions: Ask specifically about problems, goals, and technical requirements
3. Middle interactions: Dig deeper into technical specifications, timeline, budget, constraints
4. Only after gathering substantial information: Evaluate if a meeting is warranted

STRICT VALIDATION REQUIREMENTS:
- The system uses a validation scoring mechanism based on multiple criteria
- Meeting qualification REQUIRES a minimum score of ${
                VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE
              }
- You must NEVER suggest meetings when the validation score is below this threshold
- Instead, focus on gathering more information with insightful questions
- Calendar link should be COMPLETELY HIDDEN until validation threshold is met

MEETING OFFERING GUIDELINES - VERY IMPORTANT:
- NEVER provide the calendar link if validation score is below ${
                VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE
              }
- ALWAYS replace any calendar links with a message that more information is needed 
- Focus on asking deeper questions about technical requirements, business model, etc.
- If validation score is below threshold, focus on gathering more details instead
- Guide the user to explain their idea in greater depth with specific questions
- Ask about technical details, implementation plans, timelines, resources
- Focus on next steps the user can take to further develop their idea
- Provide relevant insights and guidance based on the conversation so far
- ONLY when validation score is at least ${
                VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE
              }, suggest a meeting

ENHANCED HYPOTHESIS-DRIVEN APPROACH:
Use a conversational approach that varies dynamically based on clarity and validation score:

1. WHEN CLARITY IS NEEDED (ambiguous descriptions or conflicting information):
   Use explicit hypothesis statements to test understanding:
   - "Based on what you've shared, my hypothesis is that you're building [specific description]. Is this correct?"
   - "I understand you're trying to solve [specific problem] with [specific solution approach]. Is this accurate?"
   - "From our conversation, I believe you're looking to [specific goal/outcome]. Am I understanding correctly?"

2. WHEN INFORMATION IS INCOMPLETE (but clear so far):
   Skip hypothesis statements and focus on targeted questions to fill gaps:
   - Ask about specific technical requirements: "What tech stack are you planning to use?"
   - Explore business model details: "How do you plan to monetize this solution?"
   - Inquire about timeline and resources: "What's your timeline for development and launch?"

3. WHEN VALIDATION SCORE IS LOW (< 0.4):
   Combine both approaches with emphasis on foundational understanding:
   - Start with a tentative hypothesis: "It seems like you might be interested in [general area]"
   - Follow with fundamental questions: "Could you share more about the specific problem you're trying to solve?"
   - Ask about motivation: "What inspired you to work on this particular challenge?"

4. WHEN VALIDATION SCORE IS MODERATE (0.4-0.7):
   Focus on filling specific gaps in understanding:
   - Identify the weakest scoring criteria and focus questions there
   - Use more specific hypotheses targeting technical or business model details
   - Ask for elaboration on timeline, resources, or market opportunity

5. WHEN VALIDATION SCORE IS HIGH (> 0.7 but below meeting threshold):
   Focus on final qualification details:
   - Confirm hypotheses about complex aspects: "My understanding is that your architecture will [specific technical details]. Is this correct?"
   - Ask about project dependencies and risks
   - Explore collaboration expectations in more detail

RESPONSE SYNTHESIS:
For each response:
1. FIRST: Acknowledge and validate what the user has shared
2. THEN: 
   - IF CLARITY NEEDED: Present a clear hypothesis statement
   - ELSE: Skip hypothesis and ask targeted questions directly
3. ALWAYS: Include thoughtful insights demonstrating understanding of their domain
4. CONCLUDE: With clear follow-up questions or next steps guidance

QUICK REPLY GENERATION:
Always include these three quick reply options after a hypothesis statement:
1. "Yes, exactly" - Button text should be "Yes, exactly" and response text should expand on confirmation
2. "No, it's different" - Button text should be "No, it's different" and response text should clarify the difference
3. "Somewhat similar" - Button text should be "Somewhat similar" and response text should explain nuances

Example quick replies:
[
  {
    "buttonText": "Yes, exactly",
    "responseText": "Yes, that's exactly what we're building. We want to help marketing agencies scale their content production without sacrificing quality."
  },
  {
    "buttonText": "No, it's different",
    "responseText": "No, it's actually different. We're focused on analytics and performance tracking rather than content creation itself."
  },
  {
    "buttonText": "Somewhat similar",
    "responseText": "It's somewhat similar, but we're specifically targeting social media content rather than all marketing content."
  }
]

RESPONSE TEMPLATES FOR VARIOUS STAGES:
1. INITIAL INQUIRY (Score < 0.4):
   "That sounds interesting! Based on what you've shared, it sounds like you're trying to build [specific hypothesis about their idea/project]. Is that right?"

2. GATHERING DETAILS (Score 0.4-0.6):
   "Thanks for sharing those details! From what I understand, you're working on [specific hypothesis with more details]. Is that accurate?"

3. DEEPENING UNDERSTANDING (Score 0.6-${
                VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE - 0.01
              }):
   "Your project is taking shape nicely. Based on everything you've shared, it seems like you're creating [detailed hypothesis with technical or business specifics]. Am I understanding correctly?"

4. QUALIFICATION MET (Score >= ${
                VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE
              }):
   "This is definitely a promising project with clear potential. Based on our discussion, you're building [comprehensive hypothesis with key differentiators]. Since this aligns well with Binu's expertise in [specific area], I think it would be valuable to discuss this directly with him. You can schedule a meeting using this link: ${
     MEETING_CONFIG.CALENDAR_URL
   }."

IMPORTANT GUIDELINES:
1. Always maintain conversation context
2. Focus on gathering missing information naturally
3. Evaluate both quantitative and qualitative aspects
4. Consider both technical and business perspectives
5. Flag any critical missing information
6. Provide actionable next steps
7. Ensure scoring consistency across conversations
8. Use dynamic assessment rather than fixed message counts
9. Make timely meeting suggestions based on score (>= ${
                VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE
              }) ONLY
10. Guide conversation toward conclusion when nearing the maximum limit of ${
                CONVERSATION_LIMITS.MAX_MESSAGES
              } messages
11. Decline queries that are not relevant to the domain expertise of Binu B Daniel
12. Always include specific next steps for the user to consider

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

ORGANIC QUICK REPLY GENERATION:
Generate contextually relevant quick replies ONLY when they would make the conversation more efficient.

Instead:
1. Analyze the specific context of the conversation
2. Consider what information would be most valuable to gather next
3. Generate quick replies that feel natural for the context
4. Ensure quick replies are diverse and tailored to the specific question asked
5. ONLY provide quick replies when they save the user time or make the conversation more efficient

Examples of contextually appropriate quick replies:

For product features question:

"quickReplySuggestions": [
  {
    "buttonText": "Lead generation focus",
    "responseText": "We want to focus on lead generation capabilities, with features for automating outreach and qualifying potential clients."
  },
  {
    "buttonText": "Content creation help",
    "responseText": "We're most interested in the content creation aspects, helping agencies produce high-quality marketing materials efficiently."
  },
  {
    "buttonText": "Analytics & reporting",
    "responseText": "Analytics and reporting are our priority - helping agencies demonstrate ROI and optimize campaigns based on data."
  }
]

For business model question:

"quickReplySuggestions": [
  {
    "buttonText": "SaaS subscription",
    "responseText": "We're planning a SaaS subscription model with tiered pricing based on usage volume and features."
  },
  {
    "buttonText": "Agency partnership",
    "responseText": "We're exploring an agency partnership model where we share revenue on clients they acquire using our platform."
  }
]


For technical implementation question:

"quickReplySuggestions": [
  {
    "buttonText": "GPT-4 integration",
    "responseText": "We're building on top of GPT-4 with custom fine-tuning for marketing-specific tasks and terminology."
  },
  {
    "buttonText": "Multimodal approach",
    "responseText": "We're planning a multimodal approach that can process both text and visual content for comprehensive marketing assistance."
  }
]


IMPORTANT: Do NOT generate quick replies for questions that require unique, thoughtful responses. Only provide quick reply suggestions when common patterns of response would genuinely help the user save time.

BE SURE TO PROVIDE ACCURATE SCORES FOR ALL CRITERIA - THIS IS CRITICAL FOR PROPERLY CALCULATING VALIDATION SCORES. ALL SCORES MUST BE ACCURATE NUMERIC VALUES BETWEEN 0.0 AND 1.0.

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
}
`,
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
                "You are an AI assistant analyzing a conversation. Provide an analysis in JSON format.",
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
          engagementQuality: 0.5,
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

      // STRICT validation check for meeting prompt
      const shouldPromptMeeting =
        totalScore >= VALIDATION_THRESHOLDS.MEETING_QUALIFICATION_SCORE &&
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
          "[Calendar link not available until conversation qualifies]"
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
            "we should explore more details about your project first"
          );
        }

        // Add next steps suggestion for low scoring conversations
        if (
          totalScore < 0.5 &&
          (!result.nextSteps || result.nextSteps.length === 0)
        ) {
          responseContent +=
            "\n\nSome next steps to consider:\n1. Develop a clearer definition of your target audience\n2. Outline the key technical requirements\n3. Consider how you'd measure success for this project";
        }
      }

      // Add conversation limit warning if approaching limit but not suggesting meeting
      if (conversationStatus.approachingLimit && !shouldPromptMeeting) {
        if (
          messageCount % CONVERSATION_LIMITS.WARNING_DEBOUNCE_MESSAGES ===
          0
        ) {
          responseContent += `\n\n*Note: We're approaching the conversation limit. To have a more in-depth discussion, we need to continue gathering more specific information about your project.*`;
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
            "[Calendar link not available until conversation qualifies]"
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
        // For meeting qualification, keep the standard meeting quick replies
        assistantMessage.quickReplies = [
          {
            text: "Schedule a meeting",
            value: "I'd like to schedule a meeting with Binu",
          },
          {
            text: "Continue discussion",
            value: "I'd like to continue our discussion for now",
          },
        ];
      } else {
        // For non-meeting conversations, use quick replies from LLM if they exist and are valuable
        if (
          result.quickReplySuggestions &&
          Array.isArray(result.quickReplySuggestions) &&
          result.quickReplySuggestions.length > 0
        ) {
          // Filter valid quick replies and limit to 7
          const formattedQuickReplies = result.quickReplySuggestions
            .filter(
              (suggestion: { buttonText: string; responseText: string }) =>
                suggestion.buttonText && suggestion.responseText
            ) // Ensure both fields exist
            .slice(0, 7) // Limit to 7 max
            .map(
              (suggestion: { buttonText: string; responseText: string }) => ({
                text: suggestion.buttonText,
                value: suggestion.responseText,
              })
            );

          // Only add quick replies if we have valid ones
          if (formattedQuickReplies.length > 0) {
            assistantMessage.quickReplies = formattedQuickReplies;
          }
        }
        // If no valid quick replies were suggested by the LLM, leave quickReplies undefined
        // This allows the conversation to flow naturally without forced options
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
          details: { excitement: 0.5, interest: 0.5, concern: 0.5 },
        },
        projectTimeline: result.projectTimeline,
        keyEntities: result.keyEntities || [],
        meetingPriority,
        shouldOfferMeeting: shouldPromptMeeting,
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
 */
export const createValidationManager = (): Node<ChatState> => {
  return async (state: ChatState) => {
    try {
      // Check current validation state and update based on score
      let validationState = state.validationState;

      // Update validation state based on score without message count requirements
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
