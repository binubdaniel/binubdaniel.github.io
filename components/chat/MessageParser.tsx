import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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
      const path = url.pathname !== '/' ? url.pathname : '';
      
      // If it's a short URL, show domain + short path
      if (domain.length + path.length <= 40) {
        return `${domain}${path.length <= 15 ? path : '...'}`;
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

  // Extract URLs from text and make them clickable
  const processContent = (content: string) => {
    // Check if content already has markdown links
    const hasMarkdownLinks = /\[.*?\]\(.*?\)/.test(content);
    
    // If it has markdown links, don't process further
    if (hasMarkdownLinks) {
      return content;
    }
    
    // URL regex pattern with improved matching
    const urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    
    // Replace plain URLs with markdown links
    return content.replace(urlPattern, (url) => {
      // Ensure URL has protocol
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      return `[${url}](${fullUrl})`;
    });
  };

  // Define components with proper TypeScript typing
  const components: Components = {
    a: ({ children, href, ...props }) => (
      <a 
        href={href}
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:underline break-words"
        title={href} // Show full URL on hover
        {...props}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
        }}
      >
        {formatLinkText(href || '', children)}
      </a>
    ),
    p: ({ children, ...props }) => (
      <p {...props} className="mb-2 last:mb-0 break-words">{children}</p>
    ),
    ul: ({ children, ...props }) => (
      <ul {...props} className="list-disc pl-5 mb-3">{children}</ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="list-decimal pl-5 mb-3">{children}</ol>
    ),
    li: ({ children, ...props }) => (
      <li {...props} className="mb-1 break-words">{children}</li>
    ),
    code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
      const isInline = inline || !className?.includes('language-');
      return isInline ? (
        <code 
          className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono" 
          {...props}
        >
          {children}
        </code>
      ) : (
        <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md overflow-x-auto my-2">
          <code 
            className={`${className || ''} block text-sm font-mono`}
            {...props}
          >
            {children}
          </code>
        </pre>
      );
    },
    // Ensure tables render properly
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-2">
        <table {...props} className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead {...props} className="bg-gray-100 dark:bg-gray-800">
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody {...props} className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr {...props} className="hover:bg-gray-50 dark:hover:bg-gray-900">
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th 
        {...props} 
        className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td {...props} className="px-3 py-2 whitespace-nowrap text-sm">
        {children}
      </td>
    ),
  };

  // Process content to make URLs clickable
  const processedContent = processContent(content);

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown 
        components={components}
        remarkPlugins={[remarkGfm]} // Support GFM (tables, autolinks, etc)
        rehypePlugins={[rehypeRaw]} // Allow HTML in markdown
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MessageParser;