import { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import { MessageItem } from './message-item';
import type { Message } from '../types/chat';

interface MessagesContainerProps {
  messages: Message[];
  isLoading: boolean;
  onEditMessage: (content: string) => void;
  onDeleteMessage: (id: string) => void;
  onFileDrop: (files: FileList) => void;
}

export function MessagesContainer({
  messages,
  isLoading,
  onEditMessage,
  onDeleteMessage,
  onFileDrop
}: MessagesContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    if (containerRef.current) {
      containerRef.current.classList.add('bg-gray-900/20', 'border-2', 'border-dashed', 'border-gray-600');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0 && containerRef.current) {
      containerRef.current.classList.remove('bg-gray-900/20', 'border-2', 'border-dashed', 'border-gray-600');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    if (containerRef.current) {
      containerRef.current.classList.remove('bg-gray-900/20', 'border-2', 'border-dashed', 'border-gray-600');
    }
    
    if (e.dataTransfer?.files) {
      onFileDrop(e.dataTransfer.files);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-thin"
      style={{ minHeight: '60vh' }}
      aria-live="polite"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onEdit={onEditMessage}
          onDelete={onDeleteMessage}
        />
      ))}
      
      {isLoading && (
        <div className="slide-in group mb-4 flex justify-start">
          <div className="max-w-[75%] md:max-w-[60%]">
            {/* Loading Bubble */}
            <div className="bg-slate-800 text-slate-100 border border-slate-700 rounded-2xl rounded-bl-md p-4 transition-all duration-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
                <span className="text-sm text-slate-400 font-mono">Thinking...</span>
              </div>
            </div>
            
            {/* Avatar & Name */}
            <div className="flex items-center gap-2 mt-2 justify-start">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs">
                  <Bot className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-xs text-slate-400 font-medium">Assistant</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}