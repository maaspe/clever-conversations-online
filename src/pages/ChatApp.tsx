
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: number;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello! I'm your AI assistant. How can I help you today?", type: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check local storage for prompt count on initial load
  useEffect(() => {
    const storedCount = localStorage.getItem('promptCount');
    if (storedCount) {
      setPromptCount(parseInt(storedCount, 10));
    }
  }, []);

  // Update local storage when prompt count changes
  useEffect(() => {
    localStorage.setItem('promptCount', promptCount.toString());
    
    // Show login dialog after 3 prompts
    if (promptCount >= 3) {
      setShowLoginDialog(true);
    }
  }, [promptCount]);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content: input,
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Increment prompt count
    setPromptCount(prev => prev + 1);
    
    // Sample responses for demo
    const responses = [
      "I've analyzed your request and here's what I found...",
      "That's an interesting question! Based on my knowledge, I can tell you that...",
      "Thank you for your query. Here's a comprehensive answer to your question...",
      "I've processed your request and have several insights to share with you..."
    ];
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now(),
        content: responses[Math.floor(Math.random() * responses.length)],
        type: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Show success toast
      toast({
        title: "Response generated",
        description: "AI has processed your request successfully.",
        duration: 3000,
      });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-card rounded-xl border shadow-sm max-w-4xl mx-auto flex flex-col h-[calc(100vh-200px)]">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">AI Chat Assistant</h2>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-muted rounded-tl-none'
                  }`}
                >
                  <div>{message.content}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-2 rounded-lg rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {promptCount >= 3 ? (
                <span>You've used 3/3 free prompts. Sign in to continue.</span>
              ) : (
                <span>You've used {promptCount}/3 free prompts.</span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Free trial ended</DialogTitle>
            <DialogDescription>
              You've used your 3 free prompts. Sign in or create an account to continue using our AI assistant.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              Maybe later
            </Button>
            <Button onClick={navigateToLogin}>
              Sign in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ChatApp;
