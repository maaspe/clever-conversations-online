
import React from 'react';
import { Message } from './types';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  return (
    <div 
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] px-4 py-2 rounded-lg ${
          message.type === 'user' 
            ? `bg-primary text-primary-foreground rounded-tr-none ${isDarkMode ? 'shadow-md shadow-primary/20' : ''}` 
            : `${isDarkMode ? 'bg-muted/70' : 'bg-muted'} rounded-tl-none ${isDarkMode ? 'shadow-sm' : ''}`
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
