// src/lib/langgraph/summary.ts

import { Message, MODEL_CONFIG } from "./types";
import OpenAI from "openai";

/**
 * Extract key insights from conversation focused on meeting necessity
 */
export const extractKeyInsights = async (messages: Message[]): Promise<string[]> => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Format conversation for analysis
    const conversation = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const response = await openai.chat.completions.create({
      model: MODEL_CONFIG.DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an AI assistant tasked with extracting key insights from a conversation. 
          Focus specifically on:
          
          1. The complexity of the user's needs or problems
          2. The urgency or timeline they've mentioned
          3. Technical aspects that would require discussion
          4. Specific expertise areas that align with Binu's specialization
          5. Signs of genuine project commitment vs. casual inquiry
          
          Return exactly 3-5 bullet points of key insights, with each focusing on meeting necessity.
          Format as a JSON array of strings.`,
        },
        { role: "user", content: conversation },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    try {
      const result = JSON.parse(response.choices[0].message.content || "{}");
      return Array.isArray(result.insights) ? result.insights : [];
    } catch (error) {
      console.error("Error parsing insights:", error);
      return [];
    }
  } catch (error) {
    console.error("Error extracting insights:", error);
    return [];
  }
};

/**
 * Generate recommended next steps focused on qualifying for meeting or
 * gathering more information to assess meeting necessity
 */
export const generateNextSteps = async (messages: Message[]): Promise<string[]> => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Format conversation for analysis
    const conversation = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const response = await openai.chat.completions.create({
      model: MODEL_CONFIG.DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an AI assistant tasked with generating recommended next steps based on a conversation.
          Focus on action items that will help determine if a meeting with Binu is necessary:
          
          1. Information that needs to be gathered to assess meeting necessity
          2. Specific aspects of the project that need clarification
          3. Technical details that would help qualify or disqualify the need for a meeting
          4. Steps to move the discussion forward productively
          
          Return exactly 3-5 bullet points, with each focusing on qualifying for a meeting.
          If a meeting seems necessary based on the conversation, include scheduling it as one step.
          Format as a JSON array of strings.`,
        },
        { role: "user", content: conversation },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    try {
      const result = JSON.parse(response.choices[0].message.content || "{}");
      return Array.isArray(result.nextSteps) ? result.nextSteps : [];
    } catch (error) {
      console.error("Error parsing next steps:", error);
      return [];
    }
  } catch (error) {
    console.error("Error generating next steps:", error);
    return [];
  }
};