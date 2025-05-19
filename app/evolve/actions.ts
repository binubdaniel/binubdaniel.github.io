'use server'

import { z } from 'zod';

// Define a schema for email validation
const EmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Google Chat webhook URL - store this in environment variables in production
// Add your actual webhook URL here
const GOOGLE_CHAT_WEBHOOK_URL = process.env.GOOGLE_CHAT_WEBHOOK_URL || 'https://chat.googleapis.com/v1/spaces/AAQATVKdtQo/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=IjHas5pePf1EsRI4Wk3LNE2bp6I9sPfJQBjTsxdU79Q';

/**
 * Server action to handle email subscription and send Google Chat notification
 */
export async function subscribeToWaitingList(formData: FormData) {
  // Get email from form data
  const email = formData.get('email') as string;
  
  try {
    // Validate the email
    const result = EmailSchema.parse({ email });
    
    // Here you would typically store the email in your database
    // For this example, we'll just send the notification
    
    // Send notification to Google Chat
    const response = await sendGoogleChatNotification(result.email);
    
    if (!response.ok) {
      console.error('Failed to send Google Chat notification');
      return { success: false, message: 'Failed to send notification' };
    }

    // Return success
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
 * Helper function to send notification to Google Chat
 */
async function sendGoogleChatNotification(email: string) {
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