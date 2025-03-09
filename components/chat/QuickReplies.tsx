"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuickReply } from '@/lib/langgraph/types'; 
import { Calendar, Loader2, Check, Zap, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  
  // Get appropriate icon based on content
  const getButtonIcon = (text: string, value: string, isSelected: boolean) => {
    if (isSelected) {
      return <Check className="h-4 w-4" />;
    } else if (isSchedulingButton(text)) {
      return <Calendar className="h-4 w-4" />;
    } else if (value.toLowerCase().includes('lead') || value.toLowerCase().includes('customer')) {
      return <Zap className="h-4 w-4" />;
    } else {
      return <MessageSquare className="h-4 w-4" />;
    }
  };



  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {replies.map((reply) => {
        const isProcessing = processingId === reply.value;
        const isSelected = selectedReplies[messageId] === reply.value;
        const isSchedule = isSchedulingButton(reply.text);
        
        return (
          <TooltipProvider key={reply.value}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isSelected ? "default" : isSchedule ? "default" : "secondary"}
                  size="sm"
                  onClick={() => handleClick(reply)}
                  disabled={hasSelectedReply || isLoading}
                  className={cn(
                    "flex items-start gap-2 h-auto py-2 px-3 w-auto max-w-xs transition-all",
                    isSelected && "bg-primary/80 text-primary-foreground",
                    hasSelectedReply && !isSelected && "opacity-50 cursor-default"
                  )}
                >
                  <div className="shrink-0 mt-0.5">
                    {isProcessing && isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      getButtonIcon(reply.text, reply.value, isSelected)
                    )}
                  </div>
                  
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-xs leading-4">{reply.text}</span>
                    <span className="text-[10px] leading-tight opacity-80 line-clamp-2 max-w-[200px]">
                      {reply.value}
                    </span>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs w-auto">
                <p className="text-xs">{reply.value}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default QuickReplies;