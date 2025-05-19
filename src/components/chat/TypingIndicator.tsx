
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const TypingIndicator = () => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  return (
    <div className="flex justify-start">
      <div className={`${isDarkMode ? 'bg-muted/70' : 'bg-muted'} px-4 py-2 rounded-lg rounded-tl-none ${isDarkMode ? 'shadow-sm' : ''}`}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
