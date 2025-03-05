// src/hooks/useLocalMeetingState.ts
import { useState, useEffect } from 'react';
import { MeetingState } from '@/lib/langgraph/types';

/**
 * Hook for managing meeting state locally without relying on Supabase
 * Uses localStorage to persist meeting states across sessions
 */
export const useLocalMeetingState = (sessionId: string) => {
  const [meetingState, setMeetingState] = useState<MeetingState>('NOT_STARTED');
  const [appointmentLinkShown, setAppointmentLinkShown] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    if (!sessionId) return;
    
    try {
      const savedState = localStorage.getItem(`meeting_state_${sessionId}`);
      const savedLinkShown = localStorage.getItem(`appointment_link_shown_${sessionId}`);
      
      if (savedState && ['NOT_STARTED', 'READY_FOR_BOOKING', 'BOOKED'].includes(savedState)) {
        setMeetingState(savedState as MeetingState);
      }
      
      if (savedLinkShown) {
        setAppointmentLinkShown(savedLinkShown === 'true');
      }
    } catch (error) {
      console.error('Error loading meeting state from localStorage:', error);
    }
  }, [sessionId]);

  // Save state changes to localStorage
  const updateMeetingState = (newState: MeetingState) => {
    if (!sessionId) return;
    
    try {
      setMeetingState(newState);
      localStorage.setItem(`meeting_state_${sessionId}`, newState);
    } catch (error) {
      console.error('Error saving meeting state to localStorage:', error);
    }
  };

  const updateAppointmentLinkShown = (shown: boolean) => {
    if (!sessionId) return;
    
    try {
      setAppointmentLinkShown(shown);
      localStorage.setItem(`appointment_link_shown_${sessionId}`, shown.toString());
    } catch (error) {
      console.error('Error saving appointment link shown state to localStorage:', error);
    }
  };

  return {
    meetingState,
    appointmentLinkShown,
    updateMeetingState,
    updateAppointmentLinkShown
  };
};