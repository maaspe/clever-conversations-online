
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import LoginDialog from '@/components/chat/LoginDialog';
import { ChatHistoryItem, Message, User } from '@/components/chat/types';
import { getInitialChatHistory, processChatMessage, createNewChat } from '@/services/chatService';

const ChatApp = () => {
  // User state
  const [user, setUser] = useState<User | null>(null);
  
  // Chat state
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(getInitialChatHistory());
  const [activeChat, setActiveChat] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [promptLimitReached, setPromptLimitReached] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

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

  const handleSend = (input: string) => {
    if (input.trim() === '' || (promptLimitReached && !user)) return;
    
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
    
    // Process message and get response
    processChatMessage(input, chatHistory, activeChat, (updatedHistory) => {
      setChatHistory(updatedHistory);
      
      // Update messages with the latest from current chat
      const currentChat = updatedHistory.find(chat => chat.id === activeChat);
      if (currentChat) {
        setMessages(currentChat.messages);
      }
      
      // If this is the second update (with bot response), stop typing indicator
      if (updatedHistory.find(chat => chat.id === activeChat)?.messages.length > messages.length + 1) {
        setIsTyping(false);
      }
    });
  };

  const handleNewChat = () => {
    const newChat = createNewChat(chatHistory);
    setChatHistory([...chatHistory, newChat]);
    setActiveChat(newChat.id);
    setMessages(newChat.messages);
  };

  const handleSelectChat = (chatId: number) => {
    setActiveChat(chatId);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            activeChat={activeChat}
            collapsed={!showSidebar}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatMessages 
              messages={messages} 
              isTyping={isTyping} 
            />
            
            <ChatInput 
              onSendMessage={handleSend}
              isTyping={isTyping}
              promptCount={promptCount}
              isLoggedIn={!!user}
            />
          </div>
        </div>

        <LoginDialog 
          open={showLoginDialog} 
          onOpenChange={setShowLoginDialog}
        />
      </div>
    </SidebarProvider>
  );
};

export default ChatApp;
