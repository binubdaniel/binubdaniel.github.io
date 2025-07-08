// lib/supabase.ts - Legacy client for backward compatibility
// For new code, use @/lib/supabase/client or @/lib/supabase/server
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our database
export type Message = {
  id: string;
  content: string | object;
  role: 'user' | 'assistant';
  session_id: string;
  createdAt: string;
}

export type Session = {
  id: string;
  user_id?: string;
  createdAt: string;
}