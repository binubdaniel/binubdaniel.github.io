// app/chat/page.tsx
"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ChatErrorBoundary } from '@/components/chat/ErrorBoundary';
import { ChatLoadingState } from '@/components/chat/LoadingState';

// Dynamically import the ChatInterface component
const ChatInterface = dynamic(() => import('@/components/ChatInterface'), {
  loading: () => <ChatLoadingState />,
  ssr: false
});

export default function ChatPage() {
  return (
    <ChatErrorBoundary>
      <Suspense fallback={<ChatLoadingState />}>
        <ChatInterface />
      </Suspense>
    </ChatErrorBoundary>
  );
}