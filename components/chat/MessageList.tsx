"use client";

import React, { useState } from "react";
import { Message } from "@/lib/langgraph/types";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onQuickReplySelect?: (reply: string) => Promise<void>;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  onQuickReplySelect,
  messageEndRef
}) => {
  // Track which quick replies have been selected
  const [selectedReplies, setSelectedReplies] = useState<Record<string, string>>({});
  
  // Wrap the quick reply selection handler to track selections
  const handleQuickReplySelect = async (value: string, messageId: string) => {
    if (!onQuickReplySelect) return;
    
    // Update selected replies
    setSelectedReplies(prev => ({
      ...prev,
      [messageId]: value
    }));
    
    // Call the parent handler
    await onQuickReplySelect(value);
  };

  // Show empty state if no messages
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No messages yet</h3>
        <p className="text-center text-muted-foreground max-w-md">
          Start the conversation by sending a message. Ask about Binu&apos;s expertise or schedule a meeting.
        </p>
      </div>
    );
  }

  // Render messages
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          onQuickReplySelect={
            onQuickReplySelect 
              ? (value) => handleQuickReplySelect(value, message.id) 
              : undefined
          }
          selectedReplies={selectedReplies}
        />
      ))}
      
      {isLoading && <TypingIndicator />}
      
      <div ref={messageEndRef} />
    </div>
  );
};