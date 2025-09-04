export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  selectedModel: string;
}

export interface PuterChatOptions {
  stream?: boolean;
  model?: string;
  signal?: AbortSignal;
}

export interface ChatData {
  model: string;
  messages: Array<{ role: string; content: string }>;
}