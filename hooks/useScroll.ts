import { useRef, useCallback } from 'react';

export function useScroll() {
  // Create refs with proper typing
  // In React, useRef<HTMLDivElement>() returns { current: HTMLDivElement | null }
  const containerRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Helper function to scroll to the bottom of the container
  const scrollToBottom = useCallback(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return {
    containerRef,
    messageEndRef,
    scrollToBottom,
  };
}