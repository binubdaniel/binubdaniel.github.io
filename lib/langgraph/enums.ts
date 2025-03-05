// lib/langgraph/types/enums.ts

export enum ValidationStates {
    NONE = "NONE",
    ANALYZING = "ANALYZING",
    INSUFFICIENT = "INSUFFICIENT",
    READY = "READY",
    EMAIL_REQUIRED = "EMAIL_REQUIRED",
    PIN_SENT = "PIN_SENT",
    PIN_EXPIRED = "PIN_EXPIRED",
    VALIDATED = "VALIDATED"
  }
  
  export enum MeetingStates {
    NOT_STARTED = "NOT_STARTED",
    REQUESTED = "REQUESTED",
    SLOT_SELECTED = "SLOT_SELECTED",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED"
  }