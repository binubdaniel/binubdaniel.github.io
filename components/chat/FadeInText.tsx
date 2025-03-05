import React, { useEffect } from "react";
import MarkdownRenderer from "../ui/markdown-renderer";

// components/FadeInText.tsx
interface FadeInTextProps {
    content: string;
    onComplete: () => void;
  }
  
  export const FadeInText = React.memo<FadeInTextProps>(({ content, onComplete }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }, [onComplete]);
  
    return (
      <div className="min-h-[20px] animate-fade-in">
        <MarkdownRenderer content={content} />
      </div>
    );
  });
  
  FadeInText.displayName = 'FadeInText';