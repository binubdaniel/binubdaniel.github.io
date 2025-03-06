"use client";

import React, { FormEvent, useRef, useEffect, useState, useMemo } from "react";
import { Layout } from "@/components/chat/Layout";
import { Header } from "@/components/chat/Header";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import { useChat } from "@/hooks/useChat";
import { Info, AlertTriangle, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getBookingLink } from "@/lib/langgraph/types";
import Sidebar from "./sidebar";
import { InfoBanner } from "./chat/InfoBanner";
import { ValidationState } from "@/lib/langgraph/types";
import { Card, CardContent } from "@/components/ui/card";
import CircleInsights from "./chat/CircleInsights";

const ChatInterface: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMeetingCard, setShowMeetingCard] = useState(false);
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

  // Log session data for debugging
  useEffect(() => {
    if (currentSession) {
      // console.log("Current session metrics:", {
      //   validationScore: currentSession.validationScore,
      //   validationState: currentSession.validationState,
      //   currentIntent: currentSession.currentIntent,
      //   scoreDetails: currentSession.scoreDetails,
      //   technicalRequirements: currentSession.technicalRequirements,
      //   sentimentAnalysis: currentSession.sentimentAnalysis,
      //   keyEntities: currentSession.keyEntities,
      //   projectTimeline: currentSession.projectTimeline,
      //   meetingPriority: currentSession.meetingPriority,
      // });
    }
  }, [currentSession]);

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

  // Handle scheduling meeting
  const handleScheduleMeeting = () => {
    setShowMeetingCard(true);
    sendMessage("I'd like to schedule a meeting");
  };

  const renderConversationAlert = () => {
    if (!currentSession?.conversationStatus) return null;

    const { approachingLimit, shouldPromptMeeting, requiresDirectContact } =
      currentSession.conversationStatus;

    // When we've hit the hard limit
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

    // When a meeting is recommended based on score, show a more prominent UI
    if (shouldPromptMeeting && currentSession.validationScore >= 0.7) {
      return (
        <Alert variant="default" className="mb-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-2">
            <Sparkles className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <AlertTitle className="text-blue-700 dark:text-blue-400">Ready to dive deeper?</AlertTitle>
              <AlertDescription className="text-blue-600 dark:text-blue-300">
                Based on our conversation, a meeting would be valuable to discuss your project in more detail.
              </AlertDescription>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800" onClick={handleScheduleMeeting}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        </Alert>
      );
    }

    // For approaching conversation limit warning
    if (approachingLimit) {
      return (
        <Alert variant="warning" className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            We&apos;re approaching the conversation limit. Consider scheduling a meeting to continue the discussion.
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  };

  // Render meeting scheduling card
  const renderMeetingCard = () => {
    if (!showMeetingCard || !currentSession) return null;
    
    const bookingLink = getBookingLink(currentSession.email);
    
    return (
      <Card className="mb-4 overflow-hidden border-primary/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-medium">Schedule a Meeting</h3>
              <p className="text-sm text-muted-foreground">
                Select a time that works for you using the booking link below.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Button 
                  variant="default" 
                  className="text-sm"
                  onClick={() => window.open(bookingLink, '_blank')}
                >
                  Open Booking Calendar
                </Button>
                <Button 
                  variant="outline" 
                  className="text-sm"
                  onClick={() => setShowMeetingCard(false)}
                >
                  Dismiss
                </Button>
              </div>
              {currentSession.meetingState === "BOOKED" && (
                <div className="flex items-center mt-2 bg-green-50 dark:bg-green-900/20 p-2 rounded text-green-700 dark:text-green-400 text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Meeting scheduled!
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Show meeting card when meeting state changes
  useEffect(() => {
    if (currentSession?.meetingState === "READY_FOR_BOOKING") {
      setShowMeetingCard(true);
    }
  }, [currentSession?.meetingState]);

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
          {renderMeetingCard()}
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
                scoreDetails={currentSession.scoreDetails}
                recruitmentMatch={currentSession.recruitmentMatch}
                projectTimeline={currentSession.projectTimeline}
                technicalRequirements={currentSession.technicalRequirements}
                sentimentAnalysis={currentSession.sentimentAnalysis}
                keyEntities={currentSession.keyEntities}
                meetingPriority={currentSession.meetingPriority}
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