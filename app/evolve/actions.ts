'use server'

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

// Define schemas for validation
const EmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const QuickSurveySchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  experience: z.string().min(1, 'Please select your experience level'),
  reasons: z.array(z.string()).optional(),
});

// Google Chat webhook URL
const GOOGLE_CHAT_WEBHOOK_URL = process.env.GOOGLE_CHAT_WEBHOOK_URL || 'https://chat.googleapis.com/v1/spaces/AAQATVKdtQo/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=IjHas5pePf1EsRI4Wk3LNE2bp6I9sPfJQBjTsxdU79Q';

/**
 * Server action to handle email subscription and send Google Chat notification
 */
export async function subscribeToWaitingList(formData: FormData) {
  const email = formData.get('email') as string;
  
  try {
    const result = EmailSchema.parse({ email });
    
    // Save to database
    const supabase = await createClient();
    const { error } = await supabase
      .from('waiting_list')
      .insert({
        email: result.email.toLowerCase().trim(),
        source: 'evolve_page',
        metadata: {}
      });

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return { success: false, message: 'This email is already registered for updates.' };
      }
      console.error('Database error:', error);
      return { success: false, message: 'Failed to save your email. Please try again.' };
    }
    
    // Send notification (don't fail if this fails)
    try {
      await sendWaitlistNotification(result.email);
    } catch (notificationError) {
      console.error('Failed to send notification, but email was saved:', notificationError);
    }

    return { 
      success: true, 
      message: 'Thank you for joining the EVOLVE waiting list! We will keep you updated on our progress.' 
    };
    
  } catch (error) {
    console.error('Error processing subscription:', error);
    
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}

/**
 * Server action to handle quick survey submission
 */
export async function submitQuickSurvey(formData: FormData) {
  console.log('=== SURVEY SUBMISSION DEBUG ===');
  
  const email = formData.get('email') as string;
  const experience = formData.get('experience') as string;
  const reasonsArray = formData.getAll('reasons') as string[];
  
  console.log('Received data:', { email, experience, reasonsArray });
  
  try {
    // Validate the data
    const result = QuickSurveySchema.parse({ 
      email, 
      experience, 
      reasons: reasonsArray
    });
    
    console.log('Validation passed:', result);
    
    // Save to database
    const supabase = await createClient();
    const { error } = await supabase
      .from('survey_responses')
      .insert({
        email: result.email?.toLowerCase().trim() || null,
        experience_level: result.experience,
        failure_reasons: result.reasons || [],
        metadata: {
          submitted_at: new Date().toISOString(),
          user_agent: formData.get('userAgent') as string || null
        }
      });

    if (error) {
      console.error('Database error:', error);
      return { success: false, message: 'Failed to save your response. Please try again.' };
    }
    
    // Send notification (don't fail if this fails)
    try {
      await sendQuickSurveyNotification(result);
    } catch (notificationError) {
      console.error('Failed to send notification, but survey was saved:', notificationError);
    }

    console.log('Survey submitted successfully');
    return { 
      success: true, 
      message: 'Thank you for your insights! This will help improve AI development practices.' 
    };
    
  } catch (error) {
    console.error('Error processing quick survey:', error);
    
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.errors);
      return { success: false, message: error.errors[0].message };
    }
    
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}

/**
 * Helper function to send waitlist notification to Google Chat
 */
async function sendWaitlistNotification(email: string) {
  if (!GOOGLE_CHAT_WEBHOOK_URL) {
    console.error('Google Chat webhook URL is not defined');
    throw new Error('Webhook URL is not configured');
  }

  const timestamp = new Date().toLocaleString();
  
  const payload = {
    text: '',
    cards: [
      {
        header: {
          title: '📚 New EVOLVE Book Subscription',
          subtitle: `Received at ${timestamp}`
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Email Address',
                  content: email
                }
              },
              {
                buttons: [
                  {
                    textButton: {
                      text: 'View Admin Dashboard',
                      onClick: {
                        openLink: {
                          url: 'https://binubabu.in/admin/subscribers'
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  return fetch(GOOGLE_CHAT_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

/**
 * Helper function to send quick survey notification to Google Chat
 */
async function sendQuickSurveyNotification(surveyData: {
  email: string;
  experience: string;
  reasons?: string[];
}) {
  console.log('Sending survey notification for:', surveyData);
  
  if (!GOOGLE_CHAT_WEBHOOK_URL) {
    console.error('Google Chat webhook URL is not defined');
    throw new Error('Webhook URL is not configured');
  }

  const timestamp = new Date().toLocaleString();
  
  // Map technical values to readable labels
  const experienceLabels: Record<string, string> = {
    'never': 'Never worked on AI projects',
    'planning': 'Planning first AI project',
    'few': 'Worked on 1-3 AI projects',
    'experienced': 'Worked on 4-10 AI projects',
    'expert': 'Led 10+ AI initiatives'
  };

  const reasonLabels: Record<string, string> = {
    'data-quality': 'Poor data quality or availability',
    'unclear-objectives': 'Lack of clear business objectives',
    'unrealistic-expectations': 'Unrealistic expectations about AI capabilities',
    'insufficient-expertise': 'Inadequate team expertise',
    'stakeholder-alignment': 'Insufficient stakeholder buy-in',
    'technical-complexity': 'Underestimated technical complexity',
    'integration-challenges': 'Poor integration with existing systems',
    'budget-constraints': 'Budget constraints or cost overruns',
    'regulatory-compliance': 'Regulatory or compliance issues',
    'wrong-framework': 'Using traditional development frameworks',
    'deployment-issues': 'Deployment and production challenges',
    'maintenance-neglect': 'Lack of proper maintenance and monitoring'
  };

  const readableReasons = surveyData.reasons?.map(reason => reasonLabels[reason] || reason).join('\n• ') || 'None selected';
  const formattedReasons = surveyData.reasons?.length ? `• ${readableReasons}` : readableReasons;
  
  const payload = {
    text: '',
    cards: [
      {
        header: {
          title: '🚀 Quick AI Survey Response',
          subtitle: `Received at ${timestamp}`
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Email Address',
                  content: surveyData.email
                }
              },
              {
                keyValue: {
                  topLabel: 'Experience Level',
                  content: experienceLabels[surveyData.experience] || surveyData.experience
                }
              },
              {
                keyValue: {
                  topLabel: 'AI Project Failure Reasons',
                  content: formattedReasons
                }
              }
            ]
          },
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: 'View All Survey Responses',
                      onClick: {
                        openLink: {
                          url: 'https://binubabu.in/admin/quick-surveys'
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  console.log('Sending payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(GOOGLE_CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Chat API error:', errorText);
    }
    
    return response;
  } catch (error) {
    console.error('Network error sending to Google Chat:', error);
    throw error;
  }
}