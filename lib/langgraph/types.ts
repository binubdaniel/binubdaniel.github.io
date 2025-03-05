// src/types/index.ts

// Message Types
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  created_at: string;
  session_id: string;
  quickReplies?: QuickReply[];
}

export interface QuickReply {
  text: string;
  value: string;
}

// Intent Types
export type Intent =
  | "IDEA_VALIDATION"
  | "PROJECT_ASSISTANCE"
  | "TECHNICAL_CONSULTATION"
  | "INFORMATION"
  | "RECRUITMENT";

// Validation Types
export type ValidationState =
  | "NONE"
  | "ANALYZING"
  | "INSUFFICIENT"
  | "READY"
  | "EMAIL_REQUIRED"
  | "PIN_SENT"
  | "PIN_EXPIRED"
  | "VALIDATED";

export interface ValidationInfo {
  state: ValidationState;
  email?: string;
  pin?: string;
  pinExpiresAt?: string;
  lastPinSentAt?: string;
  pinAttempts: number;
  resendAttempts: number;
  score: number;
}

// Meeting Types - Simplified for Google Calendar
export type MeetingState =
  | "NOT_STARTED"
  | "READY_FOR_BOOKING"
  | "BOOKED";

// State Types
export interface ConversationStatus {
  messageCount: number;
  approachingLimit: boolean;
  shouldPromptMeeting: boolean;
  requiresDirectContact: boolean;
}

export interface ChatState {
  sessionId: string;
  messages: Message[];
  validationState: ValidationState;
  meetingState: MeetingState;
  validationScore: number;
  messageCount: number;
  conversationStatus: ConversationStatus;
  conversationLimitResponse: string | null;
  
  // Optional fields
  email?: string;
  validation?: ValidationInfo;
  scoreDetails?: ScoreDetails;
  currentIntent?: Intent;
  conversationContext?: string;
  insights?: string[];
  nextSteps?: string[];
  recruitmentMatch?: {
    matches: boolean;
    reason: string;
    missingInfo: string[];
  };
  shouldOfferMeeting?: boolean;
  appointmentLinkShown?: boolean; // New field to track if we've shown the appointment link
}

// Analysis Types
export interface ScoreDetails {
  baseScores: BaseScores;
  intentCriteria: IntentCriteria;
}

export interface BaseScores {
  problemUnderstanding: number;
  solutionVision: number;
  projectCommitment: number;
  engagementQuality: number;
}

export interface IntentCriteria {
  // For IDEA_VALIDATION
  hasBusinessModel?: number;
  marketResearch?: number;
  technicalFeasibility?: number;
  resourcePlanning?: number;
  implementationTimeline?: number;

  // For PROJECT_ASSISTANCE
  scopeClarity?: number;
  technicalRequirements?: number;
  timeline?: number;
  budget?: number;
  success_criteria?: number;

  // For TECHNICAL_CONSULTATION
  problemComplexity?: number;
  aiRelevance?: number;
  requirementClarity?: number;
  implementationPath?: number;
  expectedOutcomes?: number;

  // For RECRUITMENT
  isAIRole?: boolean;
  meetsSalary?: boolean;
  isRemoteHybrid?: boolean;
  hasCompanyInfo?: boolean;
  hasJobDescription?: boolean;
  hasCultureInfo?: boolean;
  hasGrowthInfo?: boolean;
}

// Graph Types
export type Node<T> = (state: T) => Promise<T>;
export type Edge<T> = (state: T) => boolean;

export interface Graph<T> {
  nodes: Map<string, Node<T>>;
  edges: Map<string, Map<string, Edge<T>>>;
  start: string;
  end: string;
}

// Constants
export const VALIDATION_THRESHOLDS = {
  MIN_MESSAGES: 7,
  MIN_CONFIDENCE: 0.8,
  MIN_TECHNICAL_DEPTH: 0.6,
  MIN_PROJECT_CLARITY: 0.7,
  MIN_ENGAGEMENT: 0.65,
  MAX_PIN_ATTEMPTS: 3,
  MAX_RESEND_ATTEMPTS: 3,
  PIN_EXPIRY_MINUTES: 15
} as const;

export const ANALYSIS_WEIGHTS = {
  TECHNICAL_DEPTH: 0.3,
  PROJECT_CLARITY: 0.3,
  ENGAGEMENT: 0.2,
  COMMITMENT: 0.2
} as const;

// Google Calendar Appointment link
export const GOOGLE_CALENDAR_APPOINTMENT_URL = 
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rO2EGQWPlDm9BkvW3xAcBBf8MRuJ7MbaBAQFkn99voBUOjnEOXc0WVL2l9jdHkgJIioCGX_s5?gv=true';

// Error handling types
export enum ErrorCode {
  INVALID_REQUEST = "INVALID_REQUEST",
  INVALID_MESSAGE = "INVALID_MESSAGE",
  INVALID_SESSION = "INVALID_SESSION",
  SESSION_ERROR = "SESSION_ERROR",
  STORE_MESSAGE_ERROR = "STORE_MESSAGE_ERROR",
  PROCESS_MESSAGE_ERROR = "PROCESS_MESSAGE_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  MEETING_ERROR = "MEETING_ERROR",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  UNAUTHORIZED = "UNAUTHORIZED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

export class ChatError extends Error {
  code: ErrorCode;
  statusCode: number;
  details?: Record<string, unknown>;

  constructor(
    message: string, 
    code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    statusCode: number = 500,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ChatError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}


// Update in src/types/index.ts

// Alternate direct booking link format (enables better tracking)
export const getBookingLink = (email?: string) => {
  const baseUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rO2EGQWPlDm9BkvW3xAcBBf8MRuJ7MbaBAQFkn99voBUOjnEOXc0WVL2l9jdHkgJIioCGX_s5';
  const params = new URLSearchParams();
  params.append('gv', 'true');
  
  // Add email parameter if provided
  if (email) {
    params.append('email', email);
  }
  
  return `${baseUrl}?${params.toString()}`;
};