
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  isTyping?: boolean;
  promptCount?: number;
  maxPrompts?: number;
  isLoggedIn?: boolean;
}

const ChatInput = ({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Type your message here...",
  isTyping = false,
  promptCount = 0,
  maxPrompts = 3,
  isLoggedIn = false
}: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '' || disabled) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const promptLimitReached = !isLoggedIn && promptCount >= maxPrompts;

  return (
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={promptLimitReached ? "Sign in to continue..." : placeholder}
          className="flex-1"
          disabled={isTyping || promptLimitReached}
        />
        <Button 
          onClick={handleSend} 
          disabled={isTyping || promptLimitReached}
          className={promptLimitReached ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : ""}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {!isLoggedIn && (
        <div className="mt-2 text-xs text-muted-foreground">
          {promptLimitReached ? (
            <span className="text-destructive font-medium">You've used {promptCount}/{maxPrompts} free prompts. Sign in to continue.</span>
          ) : (
            <span>You've used {promptCount}/{maxPrompts} free prompts.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
