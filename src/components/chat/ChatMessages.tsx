
import React, { useRef, useEffect, useState } from 'react';
import { Message, User } from './types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  user: User | null;
}

const ChatMessages = ({ messages, isTyping, user }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasInteraction, setHasInteraction] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  // Detect if user has sent a message
  useEffect(() => {
    if (messages.some(m => m.type === 'user')) {
      setHasInteraction(true);
    }
  }, [messages]);
  
  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const displayName = user?.displayName || user?.name || 'there';

  return (
    <div 
      className={`flex-1 overflow-y-auto p-4 space-y-4 transition-colors duration-300 ${
        hasInteraction ? (isDarkMode ? 'bg-black/10' : 'bg-black/5') : ''
      }`}
    >
      {messages.length === 0 && !isTyping ? (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-aipurple-600 to-aiteal-400 mb-6 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">AI</span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Welcome to AiChat</h3>
          <p className="text-muted-foreground mb-6">How may I help you{displayName !== 'there' ? ', ' + displayName : ''}?</p>
        </div>
      ) : (
        <>
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && <TypingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
