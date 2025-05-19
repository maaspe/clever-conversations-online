
import React from 'react';
import { User } from './types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserProfileMenuProps {
  user: User | null;
  onLogout: () => void;
}

const UserProfileMenu = ({ user, onLogout }: UserProfileMenuProps) => {
  const handleSelectAvatar = () => {
    // In a real app, this would open a file picker
    toast({
      title: "Select Avatar",
      description: "This feature would allow users to upload a profile picture.",
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-9 w-9 hover:ring-2 hover:ring-primary transition-all">
          <AvatarImage src={user?.avatarUrl || ""} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user?.name?.charAt(0).toUpperCase() || 'G'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user?.name || 'Guest'}</p>
            <p className="text-sm text-muted-foreground">{user?.email || ''}</p>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleSelectAvatar} className="cursor-pointer">
          <Image className="mr-2 h-4 w-4" />
          <span>Select Avatar</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
