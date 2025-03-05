// src/lib/errors.ts

export enum ErrorCode {
  // Configuration errors
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
  
  // Input validation errors
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_REQUEST = 'INVALID_REQUEST',
  INVALID_SESSION = 'INVALID_SESSION',
  
  // Authentication errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  
  // Database errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  
  // Processing errors
  PROCESS_ERROR = 'PROCESS_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  
  // Service errors
  EMAIL_ERROR = 'EMAIL_ERROR',
  ZOOM_ERROR = 'ZOOM_ERROR',
  MEETING_ERROR = 'MEETING_ERROR',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Generic errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export class ChatError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ChatError';
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      ...(this.metadata && { metadata: this.metadata })
    };
  }
}

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  CONFIGURATION_ERROR: 'System configuration error occurred',
  INVALID_INPUT: 'Invalid input provided',
  INVALID_REQUEST: 'Invalid request format',
  INVALID_SESSION: 'Invalid or expired session',
  UNAUTHORIZED: 'Unauthorized access',
  DATABASE_ERROR: 'Database operation failed',
  NOT_FOUND: 'Requested resource not found',
  PROCESS_ERROR: 'Error processing request',
  VALIDATION_ERROR: 'Validation failed',
  EMAIL_ERROR: 'Email service error',
  ZOOM_ERROR: 'Zoom service error',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later',
  UNKNOWN_ERROR: 'An unexpected error occurred',
  MEETING_ERROR: "An Meeting Error Occureds"
};