// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { ChatGraph } from '@/lib/langgraph/graph';
import { ChatState, ValidationState, MeetingState } from '@/lib/langgraph/types';
import { ChatError, ErrorCode } from '@/lib/langgraph/types';

const chatGraph = new ChatGraph();

const DEFAULT_CONVERSATION_STATUS = {
  messageCount: 0,
  approachingLimit: false,
  shouldPromptMeeting: false,
  requiresDirectContact: false
};

/**
 * API route handler for chat processing
 * Updated to handle local meeting state
 */
export async function POST(req: Request) {
  try {
    const { 
      messages, 
      sessionId, 
      validationState, 
      meetingState,
      validationScore,
      currentIntent,
      conversationContext,
      email,
      conversationStatus,
      messageCount,
      conversationLimitResponse,
      insights,
      nextSteps,
      recruitmentMatch,
      scoreDetails,
      appointmentLinkShown
    } = await req.json();

    // Validate required data
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { 
          error: 'Invalid messages format',
          code: ErrorCode.INVALID_MESSAGE
        }, 
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { 
          error: 'Session ID is required',
          code: ErrorCode.INVALID_SESSION
        }, 
        { status: 400 }
      );
    }

    // Initialize state with all required properties
    const state: ChatState = {
      sessionId,
      messages,
      validationState: validationState as ValidationState || 'NONE',
      meetingState: meetingState as MeetingState || 'NOT_STARTED',
      validationScore: validationScore || 0,
      messageCount: messageCount || messages.length,
      conversationStatus: conversationStatus || {
        ...DEFAULT_CONVERSATION_STATUS,
        messageCount: messages.length
      },
      conversationLimitResponse: conversationLimitResponse || null,
      currentIntent: currentIntent,
      conversationContext: conversationContext,
      email: email,
      insights: insights || [],
      nextSteps: nextSteps || [],
      recruitmentMatch: recruitmentMatch,
      scoreDetails: scoreDetails,
      appointmentLinkShown: appointmentLinkShown || false
    };

    // Process the state through the chat graph
    const result = await chatGraph.process(state);
    
    // Ensure session ID is preserved in response
    if (result.messages) {
      result.messages = result.messages.map(msg => ({
        ...msg,
        session_id: sessionId
      }));
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chat processing error:', error);
    
    // Provide more detailed error response
    if (error instanceof ChatError) {
      return NextResponse.json({ 
        error: 'Failed to process chat',
        message: error.message,
        code: error.code,
        details: error.details
      }, { 
        status: error.statusCode || 500 
      });
    }
    
    return NextResponse.json({ 
      error: 'Failed to process chat',
      message: error instanceof Error ? error.message : String(error),
      code: ErrorCode.PROCESS_MESSAGE_ERROR
    }, { 
      status: 500 
    });
  }
}

/**
 * GET handler for getting conversation history
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json(
        { 
          error: 'Session ID is required',
          code: ErrorCode.INVALID_SESSION
        }, 
        { status: 400 }
      );
    }
    
    // This would typically connect to your database to fetch messages
    // For now, just return a 501 Not Implemented
    return NextResponse.json(
      { 
        error: 'Fetching messages is not implemented yet',
        code: ErrorCode.UNKNOWN_ERROR
      }, 
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch messages',
        message: error instanceof Error ? error.message : String(error),
        code: ErrorCode.UNKNOWN_ERROR
      }, 
      { status: 500 }
    );
  }
}