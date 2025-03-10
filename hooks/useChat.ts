// src/hooks/useChat.ts
import { useState, useCallback, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message, ChatState, ChatError, ErrorCode } from "@/lib/langgraph/types";
import { useSessions } from "./useSessions";
import { useLocalMeetingState } from "./useLocalMeetingState";

/**
 * Hook for managing chat interactions
 * Updated to use local meeting state
 */
export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const { currentSession, createSession, updateSession } = useSessions();
  
  // Use local meeting state instead of database state
  const { 
    meetingState, 
    appointmentLinkShown, 
    updateMeetingState, 
    updateAppointmentLinkShown 
  } = useLocalMeetingState(currentSession?.sessionId || '');
  
  /**
   * Initializes a new chat session with welcome message
   */
  const initializeChat = useCallback(async () => {
    try {
      const session = await createSession();
      
      // Create welcome message with session ID
      const welcomeMessage: Message = {
        id: uuidv4(),
        content: `Hi! I'm Groot, Binu's AI assistant 👋\nI evaluate ideas and projects to help connect promising opportunities with Binu. Check your conversation analysis at the bottom left.\nHow can I help you today?`,
        role: "assistant",
        created_at: new Date().toISOString(),
        session_id: session.sessionId,
        quickReplies: [
          {
            text: "Project/startup idea",
            value: "I have a project/startup idea"
          },
          {
            text: "Need technical consultation",
            value: "I need technical consultation"
          },
          {
            text: "Want to discuss a work opportunity",
            value: "I'd like to discuss a work opportunity"
          },
          {
            text: "AI Adoption at workplace",
            value: "How can we implement AI at our workplace?"
          },
          {
            text: "Tell me about Binu",
            value: "Tell me about Binu's background and expertise"
          },
        ],
      };

      setMessages([welcomeMessage]);

      // Update session with initial message
      await updateSession(session.sessionId, {
        ...session,
        messages: [welcomeMessage],
        messageCount: 1
      });

    } catch (error) {
      console.error("Failed to initialize chat:", error);
      throw new ChatError(
        `Failed to initialize chat: ${error instanceof Error ? error.message : String(error)}`,
        ErrorCode.SESSION_ERROR
      );
    }
  }, [createSession, updateSession]);

  /**
   * Sends a user message and processes the response
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        return;
      }
      
      if (!currentSession?.sessionId) {
        throw new ChatError(
          "Cannot send message: No active session",
          ErrorCode.INVALID_SESSION,
          400
        );
      }

      // Cancel any in-progress request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);
      setInput("");

      try {
        const newMessage: Message = {
          id: uuidv4(),
          content,
          role: "user",
          created_at: new Date().toISOString(),
          session_id: currentSession.sessionId,
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages,
            sessionId: currentSession.sessionId,
            validationState: currentSession.validationState,
            meetingState: meetingState, // Use local meeting state
            validationScore: currentSession.validationScore,
            messageCount: currentSession.messageCount,
            email: currentSession.email,
            conversationContext: currentSession.conversationContext,
            insights: currentSession.insights,
            nextSteps: currentSession.nextSteps,
            recruitmentMatch: currentSession.recruitmentMatch,
            conversationStatus: currentSession.conversationStatus,
            conversationLimitResponse: currentSession.conversationLimitResponse,
            appointmentLinkShown: appointmentLinkShown // Pass whether we've shown the link
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new ChatError(
            errorData.error || `HTTP error! status: ${response.status}`,
            errorData.code || ErrorCode.PROCESS_MESSAGE_ERROR,
            response.status,
            errorData.details
          );
        }

        const result: ChatState = await response.json();
        
        // Apply any meeting state changes from the API response
        if (result.meetingState && result.meetingState !== meetingState) {
          updateMeetingState(result.meetingState);
        }
        
        // Update appointment link shown status if needed
        if (result.appointmentLinkShown && !appointmentLinkShown) {
          updateAppointmentLinkShown(true);
        }
        
        // Ensure all messages have the correct session ID
        if (result.messages) {
          const processedMessages = result.messages.map((msg: Message) => ({
            ...msg,
            session_id: currentSession.sessionId
          }));
          
          setMessages(processedMessages);
          
          // Update session with processed data, but don't update meeting state in database
          await updateSession(currentSession.sessionId, {
            ...result,
            messages: processedMessages,
            meetingState: undefined // Skip updating meeting state in database
          });
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Request was cancelled");
          return;
        }
        
        console.error("Failed to process message:", error);
        // Restore previous messages if there was an error
        setMessages(messages);
        
        throw new ChatError(
          `Failed to process message: ${error.message || String(error)}`,
          error.code || ErrorCode.PROCESS_MESSAGE_ERROR,
          error.statusCode || 500,
          error.details
        );
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, currentSession, updateSession, meetingState, appointmentLinkShown, updateMeetingState, updateAppointmentLinkShown]
  );

  /**
   * Resets the chat and initializes a new session
   */
  const resetChat = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setInput("");
    setIsLoading(false);
    await initializeChat();
  }, [initializeChat]);

  // Initialize chat on first load if no session exists
  useEffect(() => {
    if (!currentSession?.sessionId) {
      initializeChat();
    }
  }, [currentSession, initializeChat]);

  // Create an enhanced current session with local meeting state
  const enhancedCurrentSession = currentSession ? {
    ...currentSession,
    meetingState,
    appointmentLinkShown
  } : null;

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    resetChat,
    currentSession: enhancedCurrentSession,
  };
};