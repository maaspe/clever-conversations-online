
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

interface Message {
  id: number;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

interface ChatHistoryItem {
  id: number;
  title: string;
  date: string;
  messages: Message[];
}

const ChatApp = () => {
  // Chat state
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    { 
      id: 1, 
      title: "AI Capabilities", 
      date: "Today", 
      messages: [
        { id: 1, content: "What can you help me with?", type: 'user', timestamp: new Date() },
        { id: 2, content: "I can help with information, creative writing, problem-solving, and more!", type: 'bot', timestamp: new Date() }
      ] 
    },
    { 
      id: 2, 
      title: "Project Ideas", 
      date: "Yesterday",
      messages: [
        { id: 1, content: "Can you suggest some project ideas?", type: 'user', timestamp: new Date() },
        { id: 2, content: "Here are some project ideas you might consider...", type: 'bot', timestamp: new Date() }
      ] 
    }
  ]);
  const [activeChat, setActiveChat] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [promptLimitReached, setPromptLimitReached] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Load active chat messages
  useEffect(() => {
    const currentChat = chatHistory.find(chat => chat.id === activeChat);
    if (currentChat) {
      setMessages(currentChat.messages);
    }
  }, [activeChat, chatHistory]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check local storage for prompt count on initial load
  useEffect(() => {
    const storedCount = localStorage.getItem('promptCount');
    if (storedCount) {
      const count = parseInt(storedCount, 10);
      setPromptCount(count);
      
      // Check if prompt limit reached on initial load
      if (count >= 3 && !user) {
        setPromptLimitReached(true);
      }
    }
  }, [user]);

  // Update local storage when prompt count changes
  useEffect(() => {
    localStorage.setItem('promptCount', promptCount.toString());
    
    // Show login dialog and update prompt limit status when count reaches 3
    if (promptCount >= 3 && !user) {
      setShowLoginDialog(true);
      setPromptLimitReached(true);
    }
  }, [promptCount, user]);

  const handleSend = () => {
    if (input.trim() === '' || (promptLimitReached && !user)) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content: input,
      type: 'user',
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    
    // Update chat history with new message
    setChatHistory(prev => prev.map(chat => 
      chat.id === activeChat 
        ? {...chat, messages: updatedMessages}
        : chat
    ));
    
    // Increment prompt count only for non-logged-in users
    if (!user) {
      const newCount = promptCount + 1;
      setPromptCount(newCount);
      
      // Check if this is the 3rd prompt (limit reached)
      if (newCount >= 3) {
        setPromptLimitReached(true);
        setShowLoginDialog(true);
        return;
      }
    }
    
    setIsTyping(true);
    
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
      
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      
      // Update chat history with bot response
      setChatHistory(prev => prev.map(chat => 
        chat.id === activeChat 
          ? {...chat, messages: finalMessages}
          : chat
      ));
      
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

  const createNewChat = () => {
    const newChatId = Math.max(0, ...chatHistory.map(chat => chat.id)) + 1;
    const newChat: ChatHistoryItem = {
      id: newChatId,
      title: "New Conversation",
      date: "Today",
      messages: [
        { 
          id: 1, 
          content: "Hello! I'm your AI assistant. How can I help you today?", 
          type: 'bot', 
          timestamp: new Date() 
        }
      ]
    };
    
    setChatHistory([...chatHistory, newChat]);
    setActiveChat(newChatId);
    setMessages(newChat.messages);
  };

  const selectChat = (chatId: number) => {
    setActiveChat(chatId);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Check for user authentication
  if (!user && !promptLimitReached) {
    // Allow guests to use the chat with limited prompts
  }

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        <ChatHeader 
          toggleSidebar={toggleSidebar} 
          userName={user ? user.name : 'Guest'}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar 
            chatHistory={chatHistory}
            onSelectChat={selectChat}
            onNewChat={createNewChat}
            activeChat={activeChat}
            collapsed={!showSidebar}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
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
                  placeholder={promptLimitReached && !user ? "Sign in to continue..." : "Type your message here..."}
                  className="flex-1"
                  disabled={promptLimitReached && !user}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={isTyping || (promptLimitReached && !user)}
                  className={(promptLimitReached && !user) ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : ""}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {!user && (
                <div className="mt-2 text-xs text-muted-foreground">
                  {promptLimitReached ? (
                    <span className="text-destructive font-medium">You've used 3/3 free prompts. Sign in to continue.</span>
                  ) : (
                    <span>You've used {promptCount}/3 free prompts.</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

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
      </div>
    </SidebarProvider>
  );
};

export default ChatApp;
