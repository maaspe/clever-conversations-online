
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { User } from './types';
import UserProfileMenu from './UserProfileMenu';
import UserSettingsPanel from './UserSettingsPanel';

interface ChatHeaderProps {
  toggleSidebar: () => void;
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

const ChatHeader = ({ toggleSidebar, user, onUpdateUser }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-aipurple-600 to-aiteal-400 mr-2"></div>
          <span className="font-bold">AiChat</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <UserSettingsPanel 
          user={user} 
          onUpdateUser={onUpdateUser}
          onLogout={handleLogout}
        />
        
        <UserProfileMenu 
          user={user} 
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default ChatHeader;
