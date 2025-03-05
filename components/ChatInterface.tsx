"use client";

import React, { FormEvent, useRef, useEffect, useState, useMemo } from "react";
import { Layout } from "@/components/chat/Layout";
import { Header } from "@/components/chat/Header";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import CircleInsights from "@/components/chat/CircleInsights";
import { useChat } from "@/hooks/useChat";
import { Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Sidebar from "./sidebar";
import { InfoBanner } from "./chat/InfoBanner";
import { ValidationState } from "@/lib/langgraph/types";

const ChatInterface: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    messages, 
    input, 
    setInput, 
    isLoading, 
    sendMessage, 
    currentSession 
  } = useChat();
  
  // Create refs directly instead of using useScroll hook
  const containerRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
  };

  const handleQuickReplySelect = async (reply: string): Promise<void> => {
    try {
      await sendMessage(reply);
    } catch (error) {
      console.error("Error handling quick reply:", error);
    }
  };

  const renderConversationAlert = () => {
    if (!currentSession?.conversationStatus) return null;

    const { approachingLimit, shouldPromptMeeting, requiresDirectContact } =
      currentSession.conversationStatus;

    if (requiresDirectContact && currentSession.conversationLimitResponse) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {currentSession.conversationLimitResponse}
          </AlertDescription>
        </Alert>
      );
    }

    if (approachingLimit || shouldPromptMeeting) {
      return (
        <Alert variant="warning" className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            {approachingLimit
              ? "We're approaching the conversation limit. Consider scheduling a meeting to continue the discussion."
              : "Based on our conversation, would you like to schedule a meeting to discuss further?"}
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  };

  // Prepare validation info for CircleInsights
  const validationInfo = useMemo(() => {
    // If no session exists yet, return default values
    if (!currentSession) {
      return {
        state: "NONE" as ValidationState,
        score: 0,
        pinAttempts: 0,
        resendAttempts: 0
      };
    }

    // Use direct validation score from session rather than validation object
    return {
      state: currentSession.validationState || "NONE",
      score: currentSession.validationScore || 0,
      pinAttempts: currentSession.validation?.pinAttempts || 0,
      resendAttempts: currentSession.validation?.resendAttempts || 0
    };
    
  }, [currentSession]);
  
  // Log state for debugging
  useEffect(() => {
    if (currentSession) {
      // console.log("Current session state:", {
      //   validationScore: currentSession.validationScore,
      //   validationState: currentSession.validationState,
      //   validationInfo: validationInfo,
      //   scoreDetails: currentSession.scoreDetails
      // });
    }
  }, [currentSession, validationInfo]);

  return (
    <Layout
      sidebar={
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      }
      isSidebarOpen={isSidebarOpen}
    >
      <div className="flex-none bg-background border-b border-gray-200 dark:border-gray-700">
        <div className="w-full p-4">
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <InfoBanner
            message="Welcome to the chat! Feel free to ask any questions."
            type="info"
            icon={<Info className="w-4 h-4" />}
            show={messages.length === 0}
          />
          {renderConversationAlert()}
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto min-h-0">
        <div className="flex flex-col justify-end min-h-full px-4 py-4">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            onQuickReplySelect={handleQuickReplySelect}
            messageEndRef={messageEndRef}
          />
        </div>
      </div>

      <div className="flex-none bg-background border-t border-gray-200 dark:border-gray-700">
        <div className="w-full p-4 flex items-center gap-2">
          {currentSession && (
            <div className="flex-none">
              <CircleInsights
                validation={validationInfo}
                messageCount={currentSession.messageCount || 0}
                currentIntent={currentSession.currentIntent}
                conversationContext={currentSession.conversationContext}
                insights={currentSession.insights || []}
                nextSteps={currentSession.nextSteps || []}
                recruitmentMatch={currentSession.recruitmentMatch}
              />
            </div>
          )}
          <div className="flex-1">
            <MessageInput
              input={input}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onChange={setInput}
              disabled={
                !currentSession ||
                (currentSession.conversationStatus?.requiresDirectContact === true) ||
                currentSession.conversationLimitResponse != null
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatInterface;