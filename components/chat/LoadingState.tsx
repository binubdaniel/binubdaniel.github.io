// components/chat/LoadingState.tsx
import { Loader2 } from 'lucide-react';

export const ChatLoadingState: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-background">
    <div className="text-center p-8">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
      <p className="text-gray-600 dark:text-gray-400">
        Loading chat interface...
      </p>
    </div>
  </div>
);