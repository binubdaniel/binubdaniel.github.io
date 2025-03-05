import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Helper function to process markdown
  const renderMarkdown = (text: string): string => {
    if (!text) return '';

    // Escape HTML to prevent XSS
    text = text.replace(/[&<>"']/g, (match) => {
      const escape: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escape[match];
    });

    // Replace code blocks with syntax highlighting
    text = text.replace(/```([\s\S]*?)```/g, (match: string, code: string) => {
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-2"><code>${code.trim()}</code></pre>`;
    });

    // Replace inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>');

    // Replace bold text
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // Replace italic text
    text = text.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

    // Replace headers
    text = text.replace(/#{4} (.*$)/gm, '<h4 class="text-lg font-semibold mt-4 mb-2 dark:text-gray-200">$1</h4>');
    text = text.replace(/#{3} (.*$)/gm, '<h3 class="text-xl font-semibold mt-4 mb-2 dark:text-gray-200">$1</h3>');
    text = text.replace(/#{2} (.*$)/gm, '<h2 class="text-2xl font-semibold mt-4 mb-2 dark:text-gray-200">$1</h2>');
    text = text.replace(/# (.*$)/gm, '<h1 class="text-3xl font-bold mt-4 mb-2 dark:text-gray-200">$1</h1>');

    // Replace unordered lists
    text = text.replace(/^\s*[-*+]\s+(.*)$/gm, '<li class="ml-4 dark:text-gray-300">$1</li>');
    text = text.replace(/(<li[^>]*>.*<\/li>)\n(?=<li)/g, '$1');
    text = text.replace(/(<li[^>]*>.*<\/li>)+/g, '<ul class="list-disc my-2">$&</ul>');

    // Replace ordered lists
    text = text.replace(/^\s*\d+\.\s+(.*)$/gm, '<li class="ml-4 dark:text-gray-300">$1</li>');
    text = text.replace(/(<li[^>]*>.*<\/li>)\n(?=<li)/g, '$1');
    text = text.replace(/(<li[^>]*>.*<\/li>)+/g, '<ol class="list-decimal my-2">$&</ol>');

    // Replace links
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Replace emails - both markdown and plain text
    text = text.replace(
      /(?:\[([^\]]+)\]\((mailto:)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\))|(?<!["'>])(([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))/g,
      (match: string, linkText: string, mailtoPrefix: string, email1: string, fullMatch: string, email2: string) => {
        const email = email1 || email2;
        const displayText = linkText || email;
        return `<a href="mailto:${email}" class="text-blue-600 dark:text-blue-400 hover:underline">${displayText}</a>`;
      }
    );

    // Replace paragraphs
    text = text.replace(/\n\n([^<].*?)\n\n/g, '<p class="my-2 dark:text-gray-300">$1</p>');
    text = text.replace(/^([^<].*?)(\n|$)/gm, '<p class="my-2 dark:text-gray-300">$1</p>');

    return text;
  };

  return (
    <div 
      className="prose prose-sm max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

export default MarkdownRenderer;