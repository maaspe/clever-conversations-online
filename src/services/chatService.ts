
import { Message, ChatHistoryItem } from '@/components/chat/types';
import { toast } from "@/hooks/use-toast";

// Sample initial chat data
export const getInitialChatHistory = (): ChatHistoryItem[] => [
  { 
    id: 1, 
    title: "AI Capabilities", 
    date: "Today", 
    messages: [
      { id: 1, content: "What can you help me with?", type: 'user', timestamp: new Date() },
      { id: 2, content: "I can help with information, creative writing, problem-solving, and more!", type: 'bot', timestamp: new Date() }
    ] 
  },
  { 
    id: 2, 
    title: "Project Ideas", 
    date: "Yesterday",
    messages: [
      { id: 1, content: "Can you suggest some project ideas?", type: 'user', timestamp: new Date() },
      { id: 2, content: "Here are some project ideas you might consider...", type: 'bot', timestamp: new Date() }
    ] 
  }
];

// Get predefined bot responses (for demo purposes)
export const getBotResponse = (): string => {
  const responses = [
    "I've analyzed your request and here's what I found...",
    "That's an interesting question! Based on my knowledge, I can tell you that...",
    "Thank you for your query. Here's a comprehensive answer to your question...",
    "I've processed your request and have several insights to share with you..."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Process message and generate bot response
export const processChatMessage = (
  message: string, 
  chatHistory: ChatHistoryItem[], 
  activeChat: number,
  callback: (updatedHistory: ChatHistoryItem[]) => void
) => {
  const userMessage: Message = {
    id: Date.now(),
    content: message,
    type: 'user',
    timestamp: new Date()
  };
  
  // Update chat history with new user message
  const currentChat = chatHistory.find(chat => chat.id === activeChat);
  if (!currentChat) return;
  
  const updatedMessages = [...currentChat.messages, userMessage];
  const updatedHistory = chatHistory.map(chat => 
    chat.id === activeChat 
      ? {...chat, messages: updatedMessages}
      : chat
  );
  
  // Return immediately with user message added
  callback(updatedHistory);
  
  // Simulate bot response after delay
  setTimeout(() => {
    const botMessage: Message = {
      id: Date.now(),
      content: getBotResponse(),
      type: 'bot',
      timestamp: new Date()
    };
    
    const finalMessages = [...updatedMessages, botMessage];
    const finalHistory = updatedHistory.map(chat => 
      chat.id === activeChat 
        ? {...chat, messages: finalMessages}
        : chat
    );
    
    callback(finalHistory);
    
    // Show success toast
    toast({
      title: "Response generated",
      description: "AI has processed your request successfully.",
      duration: 3000,
    });
  }, 1500);
};

// Create a new chat
export const createNewChat = (chatHistory: ChatHistoryItem[]): ChatHistoryItem => {
  const newChatId = Math.max(0, ...chatHistory.map(chat => chat.id)) + 1;
  return {
    id: newChatId,
    title: "New Conversation",
    date: "Today",
    messages: [
      { 
        id: 1, 
        content: "Hello! I'm your AI assistant. How can I help you today?", 
        type: 'bot', 
        timestamp: new Date() 
      }
    ]
  };
};
