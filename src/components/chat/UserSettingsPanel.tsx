
import React, { useState } from 'react';
import { User, UserSettings } from './types';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Moon, Sun, HelpCircle } from "lucide-react";
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from "@/hooks/use-toast";

interface UserSettingsPanelProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
}

const UserSettingsPanel = ({ user, onUpdateUser, onLogout }: UserSettingsPanelProps) => {
  const { theme, setTheme } = useTheme();
  const [displayName, setDisplayName] = useState(user?.displayName || user?.name || '');

  const handleSaveSettings = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      displayName: displayName
    };
    
    onUpdateUser(updatedUser);
    
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[340px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>User Settings</SheetTitle>
          <SheetDescription>
            Customize your experience
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="displayName">Display Name</Label>
            <Input 
              id="displayName"
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How you want to be addressed"
            />
            <p className="text-xs text-muted-foreground">
              This name will be used in greetings and throughout the app.
            </p>
          </div>
          
          <div className="space-y-3">
            <Label>Theme Preference</Label>
            <div className="flex gap-3">
              <Button 
                variant={theme === 'light' ? 'default' : 'outline'} 
                className="flex-1"
                onClick={() => setTheme('light')}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button 
                variant={theme === 'dark' ? 'default' : 'outline'} 
                className="flex-1"
                onClick={() => setTheme('dark')}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Button>
              <Button 
                variant={theme === 'system' ? 'default' : 'outline'} 
                className="flex-1"
                onClick={() => setTheme('system')}
              >
                System
              </Button>
            </div>
          </div>
          
          <div>
            <Button variant="outline" className="w-full" onClick={() => window.open('/help', '_blank')}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
          </div>
        </div>
        
        <SheetFooter className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
            Save Changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserSettingsPanel;
