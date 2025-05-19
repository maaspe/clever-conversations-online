
export interface Message {
  id: number;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatHistoryItem {
  id: number;
  title: string;
  date: string;
  messages: Message[];
}

export interface User {
  name: string;
  displayName?: string; // Added for customizable greeting name
  email: string;
  plan?: SubscriptionPlan;
  avatarUrl?: string;
}

export interface SubscriptionPlan {
  type: 'free' | 'basic' | 'premium' | 'enterprise';
  promptLimit?: number;
  features?: string[];
  expiryDate?: Date;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  displayName: string;
  notifications: boolean;
}
