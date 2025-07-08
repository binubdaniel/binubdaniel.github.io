// Database types for your EVOLVE project
// These will be auto-generated once you run: npx supabase gen types typescript

export interface Database {
  public: {
    Tables: {
      waiting_list: {
        Row: {
          id: string
          email: string
          source: string
          metadata: Record<string, unknown>
          status: 'active' | 'unsubscribed' | 'bounced'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          source?: string
          metadata?: Record<string, unknown>
          status?: 'active' | 'unsubscribed' | 'bounced'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          source?: string
          metadata?: Record<string, unknown>
          status?: 'active' | 'unsubscribed' | 'bounced'
          created_at?: string
          updated_at?: string
        }
      }
      survey_responses: {
        Row: {
          id: string
          session_id: string
          email: string | null
          experience_level: string | null
          failure_reasons: string[]
          additional_comments: string | null
          ip_address: string | null
          user_agent: string | null
          completed_at: string
          metadata: Record<string, unknown>
        }
        Insert: {
          id?: string
          session_id?: string
          email?: string | null
          experience_level?: string | null
          failure_reasons?: string[]
          additional_comments?: string | null
          ip_address?: string | null
          user_agent?: string | null
          completed_at?: string
          metadata?: Record<string, unknown>
        }
        Update: {
          id?: string
          session_id?: string
          email?: string | null
          experience_level?: string | null
          failure_reasons?: string[]
          additional_comments?: string | null
          ip_address?: string | null
          user_agent?: string | null
          completed_at?: string
          metadata?: Record<string, unknown>
        }
      }
      launch_notifications: {
        Row: {
          id: string
          email: string
          notification_type: string
          sent_at: string | null
          opened_at: string | null
          clicked_at: string | null
          status: 'pending' | 'sent' | 'delivered' | 'failed'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          notification_type: string
          sent_at?: string | null
          opened_at?: string | null
          clicked_at?: string | null
          status?: 'pending' | 'sent' | 'delivered' | 'failed'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          notification_type?: string
          sent_at?: string | null
          opened_at?: string | null
          clicked_at?: string | null
          status?: 'pending' | 'sent' | 'delivered' | 'failed'
          created_at?: string
        }
      }
      user_engagement: {
        Row: {
          id: string
          email: string | null
          session_id: string | null
          action: string
          page_url: string | null
          metadata: Record<string, unknown>
          created_at: string
        }
        Insert: {
          id?: string
          email?: string | null
          session_id?: string | null
          action: string
          page_url?: string | null
          metadata?: Record<string, unknown>
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          session_id?: string | null
          action?: string
          page_url?: string | null
          metadata?: Record<string, unknown>
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}