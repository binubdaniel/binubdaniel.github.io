"use client";

import React from "react";
import { Message } from "@/lib/langgraph/types";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import MessageParser from "./MessageParser";
import QuickReplies from "./QuickReplies";

interface MessageBubbleProps {
  message: Message;
  onQuickReplySelect?: (value: string) => Promise<void>;
  selectedReplies: Record<string, string>; // Track all selected replies by messageId
}

export const MessageBubble = React.memo<MessageBubbleProps>(
  ({ message, onQuickReplySelect, selectedReplies }) => {
    const isUser = message.role === "user";
    const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div className={cn(
        "flex gap-2 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}>
        {!isUser && (
          <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bot size={16} />
          </div>
        )}
        
        <div className="flex flex-col max-w-[80%]">
          <div className={cn(
            "rounded-lg py-3 px-4",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-none" 
              : "bg-secondary/20 text-foreground rounded-tl-none"
          )}>
            <MessageParser 
              content={message.content} 
              className={isUser ? "text-primary-foreground" : ""}
            />
            
            <div className="text-xs mt-2 opacity-70">
              {formattedTime}
            </div>
          </div>
          
          {message.quickReplies && message.quickReplies.length > 0 && onQuickReplySelect && (
            <QuickReplies
              replies={message.quickReplies}
              onSelect={onQuickReplySelect}
              messageId={message.id}
              selectedReplies={selectedReplies}
            />
          )}
        </div>
        
        {isUser && (
          <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User size={16} />
          </div>
        )}
      </div>
    );
  }
);

MessageBubble.displayName = "MessageBubble";