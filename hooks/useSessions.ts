// src/hooks/useSessions.ts
import { useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  ChatState, 
  ConversationStatus, 
  ValidationState, 
  ChatError,
  ErrorCode
} from "@/lib/langgraph/types";
import { v4 as uuidv4 } from "uuid";

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

const supabase = createClient(
  supabaseUrl!,
  supabaseAnonKey!
);

const DEFAULT_CONVERSATION_STATUS: ConversationStatus = {
  messageCount: 0,
  approachingLimit: false,
  shouldPromptMeeting: false,
  requiresDirectContact: false
};

/**
 * Hook for managing session state with Supabase
 * Modified to avoid meeting state updates in database
 */
export const useSessions = () => {
  const [currentSession, setCurrentSession] = useState<ChatState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Creates a new session in the database
   */
  const createSession = useCallback(async (): Promise<ChatState> => {
    setIsLoading(true);
    try {
      const sessionId = uuidv4();

      const { data, error: dbError } = await supabase
        .from("sessions")
        .insert([{
          id: sessionId,
          validation_state: "NONE" as ValidationState,
          // Set meeting_state as NOT_STARTED to satisfy database constraint, but we'll use local state
          meeting_state: "NOT_STARTED",
          validation_score: 0,
          message_count: 0,
          conversation_status: DEFAULT_CONVERSATION_STATUS,
          insights: [],
          next_steps: []
        }])
        .select()
        .single();

      if (dbError) {
        throw new ChatError(
          `Failed to create session: ${dbError.message}`,
          ErrorCode.SESSION_ERROR,
          500,
          { details: dbError }
        );
      }

      if (!data) {
        throw new ChatError(
          "No data returned when creating session",
          ErrorCode.SESSION_ERROR
        );
      }

      const sessionState: ChatState = {
        sessionId: data.id,
        messages: [],
        validationState: data.validation_state,
        meetingState: "NOT_STARTED", // Use the default meeting state
        validationScore: data.validation_score,
        messageCount: data.message_count,
        conversationStatus: data.conversation_status || DEFAULT_CONVERSATION_STATUS,
        insights: data.insights || [],
        nextSteps: data.next_steps || [],
        conversationLimitResponse: data.conversation_limit_response,
      };

      setCurrentSession(sessionState);
      return sessionState;
    } catch (err) {
      const chatError = err instanceof ChatError 
        ? err 
        : new ChatError(
            `Failed to create session: ${err instanceof Error ? err.message : String(err)}`,
            ErrorCode.SESSION_ERROR
          );
      
      setError(chatError);
      throw chatError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Retrieves a session from the database by ID
   */
  const getSession = useCallback(async (sessionId: string): Promise<ChatState> => {
    if (!sessionId) {
      throw new ChatError(
        "Cannot get session: Missing session ID",
        ErrorCode.INVALID_SESSION,
        400
      );
    }

    setIsLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", sessionId)
        .single();

      if (dbError) {
        throw new ChatError(
          `Failed to get session: ${dbError.message}`,
          ErrorCode.SESSION_ERROR,
          dbError.code === "PGRST116" ? 404 : 500,
          { details: dbError }
        );
      }

      if (!data) {
        throw new ChatError(
          `Session not found: ${sessionId}`,
          ErrorCode.INVALID_SESSION,
          404
        );
      }

      const sessionState: ChatState = {
        sessionId: data.id,
        messages: [], // Messages need to be fetched separately
        validationState: data.validation_state,
        meetingState: "NOT_STARTED", // Use the default meeting state from local storage later
        email: data.email,
        validationScore: data.validation_score || 0,
        conversationContext: data.conversation_context,
        insights: data.insights || [],
        nextSteps: data.next_steps || [],
        recruitmentMatch: data.recruitment_match,
        conversationStatus: data.conversation_status || DEFAULT_CONVERSATION_STATUS,
        messageCount: data.message_count || 0,
        conversationLimitResponse: data.conversation_limit_response,
      };

      setCurrentSession(sessionState);
      return sessionState;
    } catch (err) {
      const chatError = err instanceof ChatError 
        ? err 
        : new ChatError(
            `Failed to get session: ${err instanceof Error ? err.message : String(err)}`,
            ErrorCode.SESSION_ERROR
          );
      
      setError(chatError);
      throw chatError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Updates an existing session in the database
   * Modified to skip meeting_state updates
   */
  const updateSession = useCallback(async (
    sessionId: string, 
    updates: Partial<ChatState>
  ): Promise<ChatState> => {
    if (!sessionId) {
      throw new ChatError(
        "Cannot update session: Missing session ID",
        ErrorCode.INVALID_SESSION,
        400
      );
    }

    setIsLoading(true);
    try {
      // Convert from camelCase to snake_case for database
      // IMPORTANT: We're NOT updating meeting_state in the database anymore
      const { error: dbError } = await supabase
        .from("sessions")
        .update({
          validation_state: updates.validationState,
          // Intentionally skipping meeting_state update
          validation_score: updates.validationScore,
          message_count: updates.messageCount,
          email: updates.email,
          conversation_context: updates.conversationContext,
          insights: updates.insights,
          next_steps: updates.nextSteps,
          recruitment_match: updates.recruitmentMatch,
          conversation_status: updates.conversationStatus,
          conversation_limit_response: updates.conversationLimitResponse,
        })
        .eq("id", sessionId);

      if (dbError) {
        throw new ChatError(
          `Failed to update session: ${dbError.message}`,
          ErrorCode.SESSION_ERROR,
          500,
          { details: dbError }
        );
      }

      // Ensure we have a current session
      if (!currentSession) {
        const session = await getSession(sessionId);
        const updatedSession: ChatState = {
          ...session,
          ...updates,
        };
        setCurrentSession(updatedSession);
        return updatedSession;
      }

      const updatedSession: ChatState = {
        ...currentSession,
        ...updates,
        sessionId, // Ensure sessionId is preserved
      };

      setCurrentSession(updatedSession);
      return updatedSession;
    } catch (err) {
      const chatError = err instanceof ChatError 
        ? err 
        : new ChatError(
            `Failed to update session: ${err instanceof Error ? err.message : String(err)}`,
            ErrorCode.SESSION_ERROR
          );
      
      setError(chatError);
      throw chatError;
    } finally {
      setIsLoading(false);
    }
  }, [currentSession, getSession]);

  

  return {
    currentSession,
    isLoading,
    error,
    createSession,
    getSession,
    updateSession
  };
};