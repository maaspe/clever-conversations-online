
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, User, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface ChatHeaderProps {
  toggleSidebar: () => void;
  userName: string;
}

const ChatHeader = ({ toggleSidebar, userName }: ChatHeaderProps) => {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // In a real app, this would update the theme in the DOM and save preference
    toast({
      title: `Theme changed to ${theme === 'light' ? 'dark' : 'light'}`,
      description: "This is a demo. Theme switching functionality not fully implemented.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-aipurple-600 to-aiteal-400 mr-2"></div>
          <span className="font-bold">AiChat</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleThemeToggle}>
              {theme === 'light' ? (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark mode</span>
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light mode</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <span className="text-sm font-medium mr-2">{userName}</span>
        
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default ChatHeader;
