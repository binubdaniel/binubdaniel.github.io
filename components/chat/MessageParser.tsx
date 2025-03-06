import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface MessageParserProps {
  content: string;
  className?: string;
}

/**
 * Component for parsing and rendering message content
 * Handles markdown and special content types
 */
const MessageParser: React.FC<MessageParserProps> = ({ content, className = '' }) => {
  // Function to format link text to prevent overflow
  const formatLinkText = (href: string, children: React.ReactNode) => {
    // If children is actual text and not just the URL, return it as is
    const childrenText = String(children);
    if (href !== childrenText) {
      return children;
    }

    try {
      // Format URLs to show only domain or part of it
      const url = new URL(href);
      const domain = url.hostname;
      
      // If it's a short URL, just return it
      if (domain.length <= 30) {
        return domain;
      }
      
      // Otherwise, truncate it
      return `${domain.slice(0, 27)}...`;
    } catch {
      // If parsing fails, return a truncated version of the text
      return childrenText.length > 30 
        ? `${childrenText.slice(0, 27)}...` 
        : childrenText;
    }
  };

  // Define components with proper TypeScript typing
  const components: Components = {
    a: (props) => (
      <a 
        {...props}
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline break-words"
        title={props.href} // Show full URL on hover
      >
        {formatLinkText(props.href || '', props.children)}
      </a>
    ),
    p: (props) => (
      <p {...props} className="mb-2 last:mb-0 break-words" />
    ),
    ul: (props) => (
      <ul {...props} className="list-disc pl-5 mb-3" />
    ),
    ol: (props) => (
      <ol {...props} className="list-decimal pl-5 mb-3" />
    ),
    li: (props) => (
      <li {...props} className="mb-1 break-words" />
    ),
    code: (props) => {
      const isInline = !props.className?.includes('language-');
      return isInline ? (
        <code {...props} className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm" />
      ) : (
        <code {...props} className="block bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm overflow-x-auto my-2" />
      );
    }
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MessageParser;