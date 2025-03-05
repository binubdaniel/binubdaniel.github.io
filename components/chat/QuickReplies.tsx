"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuickReply } from '@/lib/langgraph/types'; 
import { Calendar, MessageSquare, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (value: string) => Promise<void>;
  messageId: string; // To track which message these quick replies belong to
  selectedReplies: Record<string, string>; // Track all selected replies by messageId
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ 
  replies, 
  onSelect, 
  messageId,
  selectedReplies 
}) => {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if this message already has a selected reply
  const hasSelectedReply = selectedReplies[messageId] !== undefined;
  
  // Handle click on a quick reply
  const handleClick = async (reply: QuickReply) => {
    // Don't allow selection if this message already has a selected reply
    if (hasSelectedReply || isLoading) return;
    
    try {
      setProcessingId(reply.value);
      setIsLoading(true);
      await onSelect(reply.value);
    } catch (error) {
      console.error('Error selecting quick reply:', error);
    } finally {
      setIsLoading(false);
      setProcessingId(null);
    }
  };
  
  // Determine if this is a scheduling button
  const isSchedulingButton = (text: string): boolean => {
    return text.toLowerCase().includes('schedule') || 
           text.toLowerCase().includes('meeting') || 
           text.toLowerCase().includes('appointment');
  };
  
  // Get appropriate icon for button
  const getButtonIcon = (text: string, isSelected: boolean) => {
    if (isSelected) {
      return <Check className="h-4 w-4 mr-2" />;
    } else if (isSchedulingButton(text)) {
      return <Calendar className="h-4 w-4 mr-2" />;
    } else {
      return <MessageSquare className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {replies.map((reply) => {
        const isProcessing = processingId === reply.value;
        const isSelected = selectedReplies[messageId] === reply.value;
        const isSchedule = isSchedulingButton(reply.text);
        
        return (
          <Button
            key={reply.value}
            variant={isSelected ? "default" : isSchedule ? "default" : "outline"}
            size="sm"
            onClick={() => handleClick(reply)}
            disabled={hasSelectedReply || isLoading}
            className={cn(
              "flex items-center transition-colors",
              isSelected && "bg-primary/80 text-primary-foreground",
              hasSelectedReply && !isSelected && "opacity-50 hover:bg-50 cursor-default"
            )}
          >
            {isProcessing && isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              getButtonIcon(reply.text, isSelected)
            )}
            <span>{reply.text}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default QuickReplies;