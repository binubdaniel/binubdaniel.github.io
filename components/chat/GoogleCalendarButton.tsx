import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { GOOGLE_CALENDAR_APPOINTMENT_URL } from '@/lib/langgraph/types';

interface GoogleCalendarButtonProps {
  className?: string;
  email?: string;
  color?: string;
  label?: string;
}

/**
 * Fallback button for Google Calendar appointment scheduling
 * Used when the Google Calendar widget fails to load
 */
const GoogleCalendarButton: React.FC<GoogleCalendarButtonProps> = ({
  className = '',
  email,
  color = '#039BE5',
  label = 'Book an appointment with Binu'
}) => {
  // Build URL with email parameter if provided
  const buildUrl = () => {
    if (!email) return GOOGLE_CALENDAR_APPOINTMENT_URL;
    
    const url = new URL(GOOGLE_CALENDAR_APPOINTMENT_URL);
    url.searchParams.append('email', email);
    return url.toString();
  };
  
  return (
    <a
      href={buildUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium transition-colors ${className}`}
      style={{ backgroundColor: color }}
    >
      <CalendarIcon className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
};

export default GoogleCalendarButton;