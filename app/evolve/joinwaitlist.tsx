'use client';

import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { subscribeToWaitingList } from '@/app/evolve/actions';
import { motion } from 'framer-motion';

import { Variants } from 'framer-motion';

export default function WaitingListForm({ itemAnimation }: { itemAnimation: Variants }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ message: '', isError: false, isSuccess: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setStatus({ message: '', isError: false, isSuccess: false });
    
    try {
      const result = await subscribeToWaitingList(formData);
      
      if (result.success) {
        setStatus({ 
          message: result.message || 'You have been added to the waiting list!', 
          isError: false,
          isSuccess: true 
        });
        setEmail('');
        formRef.current?.reset();
      } else {
        setStatus({ 
          message: result.message || 'Something went wrong. Please try again.', 
          isError: true,
          isSuccess: false 
        });
      }
    } catch (error) {
      setStatus({ 
        message: 'An unexpected error occurred. Please try again.', 
        isError: true,
        isSuccess: false 
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div variants={itemAnimation} className="border-l-4 border-l-primary p-6 bg-card flex flex-col justify-between">
      <div className="space-y-4">
        <h3 className="font-mono text-xl font-medium text-foreground mb-2">
          Join the Waiting List
        </h3>
        <p className="text-muted-foreground">
          Sign up to receive exclusive updates, early access opportunities, and be the first to know when EVOLVE launches.
        </p>
      </div>
      
      <div className="space-y-4 mt-6">
        <form ref={formRef} action={handleSubmit} className="space-y-3">
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="font-mono">
                {isSubmitting ? 'Processing...' : 'Join Waiting List'}
              </span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
          
          {status.message && (
            <p className={`text-sm ${status.isError ? 'text-red-500' : status.isSuccess ? 'text-green-500' : 'text-muted-foreground'}`}>
              {status.message}
            </p>
          )}
        </form>
        <p className="text-xs text-muted-foreground">
          We respect your privacy.
        </p>
      </div>
    </motion.div>
  );
}