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
const MIN_HEIGHT = 36; // Line height in pixels

export const MessageInput: React.FC<MessageInputProps> = ({
  input,
  isLoading,
  onSubmit,
  onChange,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && !input && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading, input]);

  const handleChange = (value: string) => {
    if (value.length <= MAX_LENGTH) {
      onChange(value);
      adjustHeight();
    }
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const lines = Math.ceil(scrollHeight / MIN_HEIGHT);
    const newRows = Math.min(lines, MAX_ROWS);
    
    textarea.style.height = `${newRows * MIN_HEIGHT}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading && !disabled) {
        onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  const remainingChars = MAX_LENGTH - input.length;
  const isNearLimit = remainingChars <= 50;
  const isDisabled = isLoading || disabled 

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1" aria-label="Message input form">
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
          disabled={isDisabled}
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