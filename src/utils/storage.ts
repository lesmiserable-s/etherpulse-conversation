import type { ChatData } from '../types/chat';

const LS_KEY = 'puter-chat-v2';

export function saveChatData(data: ChatData): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save chat data:', error);
  }
}

export function loadChatData(): ChatData | null {
  try {
    const data = localStorage.getItem(LS_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load chat data:', error);
    return null;
  }
}

export function clearChatData(): void {
  try {
    localStorage.removeItem(LS_KEY);
  } catch (error) {
    console.error('Failed to clear chat data:', error);
  }
}

export function exportChatData(): void {
  const data = localStorage.getItem(LS_KEY) || '{}';
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'puter-chat.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importChatData(file: File): Promise<ChatData | null> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    localStorage.setItem(LS_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Failed to import chat data:', error);
    throw new Error('Invalid JSON file');
  }
}