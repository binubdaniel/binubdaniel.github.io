import React from "react";
import { Bot } from "lucide-react";

export const TypingIndicator: React.FC = () => (
  <div className="flex justify-start mb-4 gap-2">
    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
      <Bot size={16} />
    </div>
    
    <div className="bg-secondary/20 text-foreground rounded-lg rounded-tl-none px-4 py-3">
      <div className="flex space-x-2">
        {[0, 150, 300].map((delay) => (
          <div
            key={delay}
            className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);