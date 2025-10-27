import React, { useState } from 'react';
import { Button } from './ui/Button';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden my-4 relative group">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
            <span className="text-xs font-mono text-gray-400">{language}</span>
            <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-gray-400 hover:text-white hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {copied ? 'Copiado!' : 'Copiar'}
            </Button>
        </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;