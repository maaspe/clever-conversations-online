
import React from 'react';
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ChatHistoryItem } from './types';
import PlanPanel from './PlanPanel';
import { User } from './types';

interface ChatSidebarProps {
  chatHistory: ChatHistoryItem[];
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  activeChat: number | null;
  collapsed: boolean;
  user: User | null;
}

const ChatSidebar = ({ chatHistory, onSelectChat, onNewChat, activeChat, collapsed, user }: ChatSidebarProps) => {
  // Function to format chat title based on first message
  const formatChatTitle = (chat: ChatHistoryItem): string => {
    const userMessages = chat.messages.filter(msg => msg.type === 'user');
    if (userMessages.length > 0) {
      // Use first user message content as title, truncate if needed
      const firstMessage = userMessages[0].content;
      return firstMessage.length > 25 ? firstMessage.substring(0, 25) + '...' : firstMessage;
    }
    return "New Conversation";
  };

  // Sort chat history to show newest chats first
  const sortedChatHistory = [...chatHistory].sort((a, b) => {
    // Convert date strings to Date objects and compare
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <Sidebar className={`border-r transition-all duration-300 bg-background relative ${collapsed ? "w-0 opacity-0" : "w-64 opacity-100"}`}>
      <SidebarContent className="flex flex-col h-full">
        <div className="p-3">
          <Button className="w-full flex justify-start gap-2" onClick={onNewChat}>
            <Plus size={18} />
            <span>New Chat</span>
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {sortedChatHistory.length > 0 ? (
            <div className="space-y-1 p-2">
              {sortedChatHistory.map((chat) => (
                <Button
                  key={chat.id}
                  variant={activeChat === chat.id ? "secondary" : "ghost"}
                  className="w-full justify-start text-left text-sm font-normal truncate"
                  onClick={() => onSelectChat(chat.id)}
                >
                  <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{formatChatTitle(chat)}</span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground text-sm">
              No chat history
            </div>
          )}
        </div>
        
        <PlanPanel user={user} />
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
