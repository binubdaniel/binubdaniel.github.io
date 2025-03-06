// src/lib/langgraph/summary.ts

import OpenAI from "openai";
import { Message } from "./types";

// Ensure OpenAI API key is defined
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error("Missing OpenAI API key");
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

/**
 * Extract a concise summary of the conversation
 */
export const extractConversationSummary = async (messages: Message[]): Promise<string> => {
  try {
    // Format conversation history for analysis
    const conversationHistory = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");
    
    // Call OpenAI for summarization
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant tasked with creating a concise but comprehensive summary of a conversation. 
          Focus on the key points, user needs, and critical information. Highlight technical details and project requirements.
          The summary should be professional, clear, and under 300 words.
          
          Format the summary as a coherent paragraph that captures the essence of the conversation.`
        },
        { role: "user", content: conversationHistory }
      ],
      max_tokens: 500,
    });

    // Extract and return the summary
    return response.choices[0].message.content || "No summary available.";
  } catch (error) {
    console.error("Error generating conversation summary:", error);
    return "Unable to generate conversation summary at this time.";
  }
};

/**
 * Extract key insights from conversation in bullet points
 */
export const extractKeyInsights = async (messages: Message[]): Promise<string[]> => {
  try {
    // Format conversation history for analysis
    const conversationHistory = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");
    
    // Call OpenAI for key insights
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant tasked with extracting the 5-7 most important insights from a conversation.
          Focus on key project details, technical requirements, challenges, goals, and any crucial information.
          Return these insights as a JSON array of strings, each being a concise, clear bullet point.`
        },
        { role: "user", content: conversationHistory }
      ],
      response_format: { type: "json_object" },
    });

    // Parse the insights
    try {
      const result = JSON.parse(response.choices[0].message.content || "{}");
      return Array.isArray(result.insights) ? result.insights : [];
    } catch (parseError) {
      console.error("Error parsing insights JSON:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error extracting key insights:", error);
    return [];
  }
};

/**
 * Generate next steps recommendations
 */
export const generateNextSteps = async (messages: Message[]): Promise<string[]> => {
  try {
    // Format conversation history for analysis
    const conversationHistory = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");
    
    // Call OpenAI for next steps
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant tasked with recommending 3-5 clear next steps based on a conversation.
          Focus on actionable items that move the project or discussion forward.
          Consider technical requirements, project goals, and any expressed needs.
          Return these next steps as a JSON array of strings, each being a concise, clear action item.`
        },
        { role: "user", content: conversationHistory }
      ],
      response_format: { type: "json_object" },
    });

    // Parse the next steps
    try {
      const result = JSON.parse(response.choices[0].message.content || "{}");
      return Array.isArray(result.nextSteps) ? result.nextSteps : [];
    } catch (parseError) {
      console.error("Error parsing next steps JSON:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error generating next steps:", error);
    return [];
  }
};