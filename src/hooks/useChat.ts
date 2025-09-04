import { useState, useEffect, useRef, useCallback } from 'react';
import { sendChatMessage, handleStreamResponse } from '../utils/puter';
import { saveChatData, loadChatData } from '../utils/storage';
import { renderMarkdown } from '../utils/markdown';
import type { Message } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [status, setStatus] = useState('Loading...');
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const savedData = loadChatData();
        if (savedData?.model) {
          setSelectedModel(savedData.model);
        }
        
        if (savedData?.messages && savedData.messages.length > 0) {
          const loadedMessages: Message[] = savedData.messages.map((msg, index) => ({
            id: `loaded-${index}`,
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
            timestamp: Date.now() - (savedData.messages.length - index) * 1000,
          }));
          setMessages(loadedMessages);
        } else {
          const welcomeMessage: Message = {
            id: 'welcome',
            role: 'assistant',
            content: 'Hello. How can I help you today?',
            timestamp: Date.now(),
          };
          setMessages([welcomeMessage]);
        }
        
        setStatus('Ready');
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setStatus('Error');
      }
    };

    initializeChat();
  }, []);

  useEffect(() => {
    const chatData = {
      model: selectedModel,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    };
    saveChatData(chatData);
  }, [messages, selectedModel]);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string): Message => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const updateMessage = useCallback((id: string, content: string) => {
    setMessages(prev => 
      prev.map(msg => msg.id === id ? { ...msg, content } : msg)
    );
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (isLoading) return;

    const userMessage = addMessage('user', content);
    setIsLoading(true);
    setStatus('Thinking...');
    
    abortControllerRef.current = new AbortController();
    
    try {
      let assistantMessage: Message | null = null;
      let accumulatedContent = '';

      const options = {
        stream: true,
        model: selectedModel || undefined,
        signal: abortControllerRef.current.signal,
      };

      const response = await sendChatMessage([...messages, userMessage], options);

      await handleStreamResponse(
        response,
        (chunk: string) => {
          accumulatedContent += chunk;
          
          // Only create the assistant message when we get the first chunk
          if (!assistantMessage) {
            assistantMessage = addMessage('assistant', accumulatedContent);
          } else {
            updateMessage(assistantMessage.id, accumulatedContent);
          }
        },
        abortControllerRef.current.signal
      );

      // If no chunks were received, create an empty assistant message
      if (!assistantMessage) {
        addMessage('assistant', 'No response received.');
      }

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Chat error:', error);
        addMessage('assistant', `Sorry, an error occurred: ${error?.message || error}`);
      }
    } finally {
      setIsLoading(false);
      setStatus('Ready');
      abortControllerRef.current = null;
    }
  }, [messages, selectedModel, isLoading, addMessage, updateMessage]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const processDroppedFiles = useCallback(async (files: FileList) => {
    for (const file of Array.from(files)) {
      try {
        if (file.type.startsWith('text') || /\.(txt|md|csv|json|js|ts|py|html|css|xml)$/i.test(file.name)) {
          const text = await file.text();
          const content = `**File:** ${file.name}\n**Size:** ${(file.size / 1024).toFixed(1)} KB\n\n\`\`\`${file.name.split('.').pop()}\n${text.slice(0, 40000)}\n\`\`\``;
          addMessage('user', content);
        } else {
          const errorMsg = `I can only read text files at the moment.\n\n**Received file:** ${file.name}\n**File type:** ${file.type || 'unknown'}\n**Supported formats:** txt, md, csv, json, js, ts, py, html, css, xml`;
          addMessage('assistant', errorMsg);
        }
      } catch (error) {
        console.error('Error processing file:', file.name, error);
        addMessage('assistant', `Error processing file ${file.name}: ${error}`);
      }
    }
  }, [addMessage]);

  return {
    messages,
    isLoading,
    selectedModel,
    status,
    setSelectedModel,
    sendMessage,
    stopGeneration,
    deleteMessage,
    clearMessages,
    processDroppedFiles,
  };
}