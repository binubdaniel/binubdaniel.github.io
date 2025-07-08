// Database utilities and type-safe operations
import { PrismaClient } from '@prisma/client';
import { createClient } from '@/lib/supabase/server';

// Initialize Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// ====================================
// Waiting List Operations
// ====================================

export async function addToWaitingList(
  email: string,
  source: string = 'evolve_page',
  metadata: Record<string, unknown> = {}
) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('waiting_list')
      .insert({
        email: email.toLowerCase().trim(),
        source,
        metadata,
      })
      .select();
    
    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'EMAIL_EXISTS', message: 'Email already registered' };
      }
      console.error('Database error:', error);
      return { success: false, error: 'DATABASE_ERROR', message: 'Failed to add email' };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR', message: 'Failed to add email' };
  }
}

export async function getWaitingListStats() {
  try {
    const supabase = await createClient();
    
    const { count: total, error: totalError } = await supabase
      .from('waiting_list')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (totalError) throw totalError;

    const { count: recent, error: recentError } = await supabase
      .from('waiting_list')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (recentError) throw recentError;

    return { success: true, data: { total: total || 0, recent: recent || 0 } };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR' };
  }
}

// ====================================
// Survey Operations
// ====================================

export async function saveSurveyResponse(data: {
  email?: string;
  experienceLevel?: string;
  failureReasons: string[];
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('survey_responses')
      .insert({
        email: data.email?.toLowerCase().trim(),
        experience_level: data.experienceLevel,
        failure_reasons: data.failureReasons,
        session_id: data.sessionId,
        ip_address: data.ipAddress,
        user_agent: data.userAgent,
        metadata: data.metadata || {},
      })
      .select();
    
    if (error) {
      console.error('Database error:', error);
      return { success: false, error: 'DATABASE_ERROR', message: 'Failed to save survey response' };
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR', message: 'Failed to save survey response' };
  }
}

export async function getSurveyAnalytics() {
  try {
    const supabase = await createClient();
    
    // Get total responses
    const { count: totalResponses } = await supabase
      .from('survey_responses')
      .select('*', { count: 'exact', head: true });

    // For now, return basic stats - you can expand this later
    return {
      success: true,
      data: {
        totalResponses: totalResponses || 0,
        // Add more analytics as needed
      }
    };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR' };
  }
}

// ====================================
// User Engagement Tracking
// ====================================

export async function trackUserEngagement(data: {
  email?: string;
  sessionId?: string;
  action: string;
  pageUrl?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    const supabase = await createClient();
    
    // Don't await this - fire and forget for performance
    void supabase.from('user_engagement').insert({
      email: data.email?.toLowerCase().trim(),
      session_id: data.sessionId,
      action: data.action,
      page_url: data.pageUrl,
      metadata: data.metadata || {},
    });

    return { success: true };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR' };
  }
}

// ====================================
// Launch Notification Operations
// ====================================

export async function queueLaunchNotification(
  email: string,
  notificationType: string = 'launch',
  metadata: Record<string, unknown> = {}
) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('launch_notifications')
      .insert({
        email: email.toLowerCase().trim(),
        notification_type: notificationType,
        status: 'pending',
        metadata,
      })
      .select();
    
    if (error) {
      console.error('Database error:', error);
      return { success: false, error: 'DATABASE_ERROR' };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR' };
  }
}

export async function markNotificationSent(
  notificationId: string,
  status: 'sent' | 'delivered' | 'failed' = 'sent'
) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('launch_notifications')
      .update({
        status,
        sent_at: status === 'sent' ? new Date().toISOString() : undefined,
      })
      .eq('id', notificationId)
      .select();
    
    if (error) {
      console.error('Database error:', error);
      return { success: false, error: 'DATABASE_ERROR' };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR' };
  }
}

// ====================================
// Analytics and Reporting
// ====================================

export async function getDashboardStats() {
  try {
    const supabase = await createClient();
    
    // Get basic counts
    const { count: waitingListCount } = await supabase
      .from('waiting_list')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const { count: surveyResponseCount } = await supabase
      .from('survey_responses')
      .select('*', { count: 'exact', head: true });

    const { count: recentSignups } = await supabase
      .from('waiting_list')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    return {
      success: true,
      data: {
        waitingListCount: waitingListCount || 0,
        surveyResponseCount: surveyResponseCount || 0,
        recentSignups: recentSignups || 0,
      }
    };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR' };
  }
}

// ====================================
// Data Export Functions
// ====================================

export async function exportWaitingListData() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('waiting_list')
      .select('email, source, created_at, metadata')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR' };
  }
}

export async function exportSurveyData() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('survey_responses')
      .select('experience_level, failure_reasons, completed_at, metadata')
      .order('completed_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'DATABASE_ERROR' };
  }
}