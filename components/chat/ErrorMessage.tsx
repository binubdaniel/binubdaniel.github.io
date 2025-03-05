import { AlertTriangle } from "lucide-react";

// components/chat/ErrorMessage.tsx
interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
  }
  
  export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 
                    border border-red-200 dark:border-red-800 rounded-lg">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <span className="text-red-700 dark:text-red-300">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Retry
        </button>
      )}
    </div>
  );