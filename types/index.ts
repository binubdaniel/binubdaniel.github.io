// types/index.ts

export interface Message {
  id: string;
  session_id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  created_at: string;
  quickReplies?: string[];
}

export interface InfoBannerProps {
  message?: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  icon?: React.ReactNode;
  show?: boolean;
}

export interface ChatState {
  messages: Message[];
  input: string;
  isLoading: boolean;
}

// types/session.ts
export interface Session {
  id: string;
  created_at: string;
  last_message_at: string;
  message_count: number;
}
