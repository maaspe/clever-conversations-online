
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
  email: string;
}
