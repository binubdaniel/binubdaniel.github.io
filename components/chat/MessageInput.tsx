// src/components/ui/MessageInput.tsx

import { Send } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const MAX_LENGTH = 480;
const MAX_ROWS = 4;
const MIN_HEIGHT = 24; // Line height in pixels

export const MessageInput: React.FC<MessageInputProps> = ({
  input,
  isLoading,
  onSubmit,
  onChange,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus textarea when loading completes and input is empty
  useEffect(() => {
    if (!isLoading && !input && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading, input]);

  // Adjust height whenever input changes
  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleChange = (value: string) => {
    if (value.length <= MAX_LENGTH) {
      onChange(value);
    }
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate proper scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height based on content
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = MIN_HEIGHT;
    const lines = Math.ceil(scrollHeight / lineHeight);
    const newRows = Math.min(lines, MAX_ROWS);
    
    // Set new height
    textarea.style.height = `${newRows * lineHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading && !disabled) {
        formRef.current?.requestSubmit();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      await onSubmit(e);
      // Reset height after submission
      if (textareaRef.current) {
        textareaRef.current.style.height = `${MIN_HEIGHT}px`;
      }
    }
  };

  const remainingChars = MAX_LENGTH - input.length;
  const isNearLimit = remainingChars <= 50;
  const isDisabled = isLoading || disabled;

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="flex flex-col gap-1" 
      aria-label="Message input form"
    >
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isDisabled}
          className="flex-1 p-3 rounded-lg border resize-none overflow-y-auto 
            border-input bg-background hover:border-accent
            focus:outline-none focus:ring-2 focus:ring-ring 
            disabled:cursor-not-allowed disabled:opacity-50"
          maxLength={MAX_LENGTH}
          rows={1}
          aria-label="Message input"
          aria-invalid={isNearLimit && remainingChars <= 20}
          aria-describedby={isNearLimit ? "char-limit" : undefined}
        />
        <button
          type="submit"
          disabled={isDisabled || !input.trim()}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center gap-2 transition-colors"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {isNearLimit && (
        <div 
          id="char-limit"
          className="text-right text-sm"
          aria-live="polite"
        >
          <span className={remainingChars <= 20 ? "text-destructive" : "text-muted-foreground"}>
            {remainingChars} characters remaining
          </span>
        </div>
      )}
    </form>
  );
};