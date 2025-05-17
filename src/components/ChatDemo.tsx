
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatDemo = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! How can I help you today?', id: 1 }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input, id: Date.now() }]);
    setInput('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Sample responses
    const responses = [
      "I can help you analyze that data. What specific insights are you looking for?",
      "That's an interesting question! Based on the latest information, I can tell you that...",
      "Here's a summary of what you're looking for. Would you like me to go into more detail?",
      "I've processed your request and found several options. Let me walk you through them."
    ];
    
    // Simulate response after delay
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { type: 'bot', content: randomResponse, id: Date.now() }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto glass-card rounded-xl overflow-hidden shadow-lg h-[400px] flex flex-col">
      <div className="p-4 bg-aipurple-600/10 border-b">
        <h3 className="font-medium text-aipurple-700 dark:text-aipurple-300">AiChat Assistant</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-aipurple-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t">
        <div className="flex">
          <input
            type="text"
            className="flex-1 rounded-l-lg border bg-background p-2 text-sm focus:outline-none focus:ring-1 focus:ring-aipurple-500"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button 
            onClick={handleSend}
            className="rounded-l-none bg-aipurple-600 hover:bg-aipurple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
