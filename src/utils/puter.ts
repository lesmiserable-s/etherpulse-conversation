import type { Message, PuterChatOptions } from '../types/chat';

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (messages: Array<{role: string; content: string}>, options?: PuterChatOptions) => Promise<any>;
      };
    };
  }
}

export async function waitForPuter(): Promise<void> {
  if (window.puter) return;
  
  return new Promise((resolve) => {
    const checkPuter = () => {
      if (window.puter) {
        resolve();
      } else {
        setTimeout(checkPuter, 50);
      }
    };
    checkPuter();
  });
}

export async function sendChatMessage(
  messages: Message[],
  options: PuterChatOptions = {}
): Promise<any> {
  await waitForPuter();
  
  if (!window.puter?.ai?.chat) {
    throw new Error('Puter AI is not available');
  }

  const apiMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  return await window.puter.ai.chat(apiMessages, options);
}

export async function handleStreamResponse(
  response: any,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  if (response && response[Symbol.asyncIterator]) {
    for await (const chunk of response) {
      if (signal?.aborted) break;
      
      const text = typeof chunk === 'string' 
        ? chunk 
        : (chunk?.delta ?? chunk?.text ?? chunk?.message?.content ?? '');
      
      if (text) {
        onChunk(text);
      }
    }
  } else {
    const text = typeof response === 'string'
      ? response
      : (response?.message?.content ?? response?.text ?? JSON.stringify(response));
    
    if (text) {
      onChunk(text);
    }
  }
}