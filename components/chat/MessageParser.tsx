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
  // Define components with proper TypeScript typing
  const components: Components = {
    a: (props) => (
      <a 
        {...props}
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline"
      />
    ),
    p: (props) => (
      <p {...props} className="mb-2 last:mb-0" />
    ),
    ul: (props) => (
      <ul {...props} className="list-disc pl-5 mb-3" />
    ),
    ol: (props) => (
      <ol {...props} className="list-decimal pl-5 mb-3" />
    ),
    li: (props) => (
      <li {...props} className="mb-1" />
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