
import React, { useRef, useEffect } from 'react';
import { Message } from './types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
