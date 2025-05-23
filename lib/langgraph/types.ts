// src/lib/langgraph/types.ts

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

// Enhanced Types for Insights
export interface TechnicalRequirement {
  name: string;
  confidence: number;
  needsDiscussion?: boolean; // Indicates if this requires interactive discussion
}

export interface SentimentAnalysis {
  overall: "Positive" | "Neutral" | "Negative";
  details: {
    excitement: number;
    interest: number;
    concern: number;
  };
}

export interface KeyEntity {
  name: string;
  type: string;
  significance: number;
}

export interface ProjectTimeline {
  estimated: string;
  complexity: "Low" | "Medium" | "High";
  urgency: "Low" | "Medium" | "High"; // Added urgency indicator
}

export type MeetingPriority = "Low" | "Medium" | "High";

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
  appointmentLinkShown?: boolean;
  
  // Enhanced fields for better insights
  technicalRequirements?: TechnicalRequirement[];
  sentimentAnalysis?: SentimentAnalysis;
  keyEntities?: KeyEntity[];
  projectTimeline?: ProjectTimeline;
  meetingPriority?: MeetingPriority;
  queryAuthenticity?: number; // New: 0-1 score indicating if query is genuine
  
  // Email summary data
  lastEmailSent?: string;
  emailSummary?: EmailSummaryData;
}

export interface EmailSummaryData {
  sentAt: string;
  recipient: string;
  subject: string;
  conversationSnippet: string;
  insights: string[];
  nextSteps: string[];
}

// Updated Analysis Types for Meeting-Focused Scoring
export interface ScoreDetails {
  baseScores: BaseScores;
  intentCriteria: IntentCriteria;
}

// Updated to focus on meeting necessity rather than knowledge assessment
export interface BaseScores {
  problemRelevance: number;      // How relevant is the problem to Binu's expertise
  projectPotential: number;      // How promising/feasible is the project
  consultationUrgency: number;   // How urgent is the need for consultation
  clientEngagement: number;      // How engaged is the client in the conversation
}

export interface IntentCriteria {
  // For IDEA_VALIDATION - meeting need criteria
  meetingRelevance?: number;      // How necessary is a meeting for this idea validation
  ideaMaturity?: number;          // How developed is the idea (not too early/late for meeting)
  feedbackComplexity?: number;    // How complex feedback needed (simple vs. nuanced discussion)
  resourceDiscussion?: number;    // Need to discuss resources/implementation
  followupPotential?: number;     // Potential for ongoing collaboration

  // For PROJECT_ASSISTANCE - meeting need criteria
  assistanceComplexity?: number;  // How complex is the assistance needed (meeting vs. chat)
  scopeAlignment?: number;        // How well the scope aligns with Binu's expertise
  implementationBlocking?: number; // How blocked the client is (urgent meeting need)
  decisionMakingStage?: number;   // Stage in decision process (exploring vs. committed)
  communicationNeeds?: number;    // Need for direct communication vs. async chat

  // For TECHNICAL_CONSULTATION - meeting need criteria
  technicalDepth?: number;        // How deep/specialized is the technical assistance needed
  solutionClarity?: number;       // How clear the solution path is (unclear = meeting needed)
  interactiveExploration?: number;  // Need for back-and-forth technical discussion
  implementationGuidance?: number;  // Need for guided implementation steps
  architectureDiscussion?: number;  // Need to discuss system architecture

  // For RECRUITMENT - meeting need criteria
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

// Constants - Updated with meeting-focused thresholds
export const VALIDATION_THRESHOLDS = {
  MIN_CONFIDENCE: 0.6,
  MIN_MEETING_RELEVANCE: 0.7,
  MIN_CONSULTATION_URGENCY: 0.65,
  MIN_CLIENT_ENGAGEMENT: 0.6,
  MEETING_QUALIFICATION_SCORE: 0.75 // Higher threshold for meeting suggestion
} as const;

export const CONVERSATION_LIMITS = {
  MAX_MESSAGES: 50, // Increased max limit but no fixed prompt points
  SOFT_WARNING_AT: 40, // When to start showing soft warnings about approaching limit
  WARNING_DEBOUNCE_MESSAGES: 5 // How many messages between repeated warnings
} as const;

// Model configuration
export const MODEL_CONFIG = {
  DEFAULT_MODEL: "gpt-4o-mini", // Default model for primary analysis
  FALLBACK_MODEL: "gpt-3.5-turbo", // Fallback model if primary is unavailable
  SUMMARY_MODEL: "gpt-4o-mini", // Model for generating summaries
  MAX_TOKENS: 1000, // Default max tokens for responses
  TEMPERATURE: 0.7 // Default temperature setting
} as const;

// Meeting configuration
export const MEETING_CONFIG = {
  CALENDAR_URL: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rO2EGQWPlDm9BkvW3xAcBBf8MRuJ7MbaBAQFkn99voBUOjnEOXc0WVL2l9jdHkgJIioCGX_s5',
  DEFAULT_DURATION: 30, // Default meeting duration in minutes
  BUFFER_TIME: 15, // Buffer time between meetings in minutes
  TIMEZONE: 'Asia/Kolkata' // Default timezone for meetings
} as const;

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
  MODEL_ERROR = "MODEL_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  EMAIL_ERROR = "EMAIL_ERROR",
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

// Email configuration
export const EMAIL_CONFIG = {
  FROM_EMAIL: 'noreply@yourdomain.com',
  FROM_NAME: 'Groot AI Assistant',
  RESEND_RETRY_ATTEMPTS: 3,
  SUMMARY_MAX_LENGTH: 500,
  EMAIL_TEMPLATES: {
    MEETING_CONFIRMATION: 'meeting-confirmation',
    MEETING_REMINDER: 'meeting-reminder',
    MEETING_SUMMARY: 'meeting-summary'
  }
} as const;

// Analytics tracking
export interface AnalyticsEvent {
  eventType: 'message_sent' | 'meeting_scheduled' | 'email_sent' | 'error' | 'validation_complete';
  timestamp: string;
  sessionId: string;
  userId?: string;
  data: Record<string, unknown>;
}

// Get booking link helper function
export const getBookingLink = (email?: string): string => {
  const baseUrl = MEETING_CONFIG.CALENDAR_URL;
  const params = new URLSearchParams();
  params.append('gv', 'true');
  
  // Add email parameter if provided
  if (email) {
    params.append('email', email);
  }
  
  return `${baseUrl}?${params.toString()}`;
};