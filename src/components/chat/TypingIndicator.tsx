
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-muted px-4 py-2 rounded-lg rounded-tl-none">
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
