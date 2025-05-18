
import React from 'react';
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

interface ChatHistoryItem {
  id: number;
  title: string;
  date: string;
}

interface ChatSidebarProps {
  chatHistory: ChatHistoryItem[];
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  activeChat: number | null;
  collapsed: boolean;
}

const ChatSidebar = ({ chatHistory, onSelectChat, onNewChat, activeChat, collapsed }: ChatSidebarProps) => {
  return (
    <Sidebar className={`border-r transition-all duration-300 ${collapsed ? "w-0 opacity-0" : "w-64 opacity-100"}`}>
      <SidebarContent className="flex flex-col h-full">
        <div className="p-3">
          <Button className="w-full flex justify-start gap-2" onClick={onNewChat}>
            <Plus size={18} />
            <span>New Chat</span>
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chatHistory.length > 0 ? (
            <div className="space-y-1 p-2">
              {chatHistory.map((chat) => (
                <Button
                  key={chat.id}
                  variant={activeChat === chat.id ? "secondary" : "ghost"}
                  className="w-full justify-start text-left text-sm font-normal truncate"
                  onClick={() => onSelectChat(chat.id)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span className="truncate">{chat.title}</span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground text-sm">
              No chat history
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
