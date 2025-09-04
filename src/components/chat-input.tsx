import { useState, useRef, useEffect } from 'react';
import { Send, Square, CornerDownLeft, Command } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
  initialValue?: string;
}

export function ChatInput({ onSendMessage, onStop, isLoading, initialValue }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue) {
      setMessage(initialValue);
      if (textareaRef.current) {
        textareaRef.current.focus();
        // Set cursor to end
        const len = initialValue.length;
        textareaRef.current.setSelectionRange(len, len);
        adjustTextareaHeight();
      }
    }
  }, [initialValue]);

  // Auto-focus on component mount
  useEffect(() => {
    if (textareaRef.current && !initialValue) {
      textareaRef.current.focus();
    }
  }, []);

  // Re-focus after sending message
  useEffect(() => {
    if (!isLoading && textareaRef.current && message === '') {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, message]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;
    
    onSendMessage(trimmedMessage);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter key
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      } else {
        // Send message with Enter
        e.preventDefault();
        if (message.trim() && !isLoading) {
          handleSubmit(e as any);
        }
      }
    }
    
    // Handle Escape key to clear input
    if (e.key === 'Escape' && !isLoading) {
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
    
    // Handle Ctrl/Cmd + Enter as alternative send
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      if (message.trim()) {
        handleSubmit(e as any);
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  return (
    <div className="border-t border-slate-700 bg-slate-800/50">
      {/* Input Container */}
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              {/* Character Counter */}
              <div className="absolute -top-6 right-0 text-xs text-slate-500 font-mono">
                {message.length > 0 && `${message.length} chars`}
              </div>
              
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything... (Shift+Enter for new line)"
                  className={`w-full bg-slate-800 border rounded-lg px-4 py-3 pr-24 text-slate-100 placeholder-slate-400 focus:outline-none resize-none font-mono text-sm transition-all duration-200 ${
                    isLoading 
                      ? 'border-amber-500/50 bg-slate-800/70' 
                      : message.trim() 
                        ? 'border-blue-400 shadow-sm shadow-blue-400/20' 
                        : 'border-slate-600 hover:border-slate-500'
                  }`}
                  rows={1}
                  disabled={isLoading}
                  maxLength={4000}
                />
                
                {/* Floating keyboard shortcuts */}
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  {!isLoading && message.trim() ? (
                    <div className="flex items-center gap-1 bg-slate-700/80 rounded px-2 py-1 text-xs text-slate-300">
                      <CornerDownLeft className="w-3 h-3" />
                      <span className="font-mono">Send</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <div className="flex items-center gap-0.5 bg-slate-700/50 rounded px-1.5 py-0.5">
                        <Command className="w-2.5 h-2.5" />
                        <span className="font-mono text-[10px]">⏎</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Progress bar when loading */}
              {isLoading && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-700 rounded-b-lg overflow-hidden">
                  <div className="h-full bg-amber-400 animate-pulse"></div>
                </div>
              )}
            </div>
            {/* Action Buttons */}
            <div className="flex items-end gap-2">
              {!isLoading ? (
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    message.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transform hover:scale-105'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className={`w-4 h-4 transition-transform ${
                    message.trim() ? 'group-hover:translate-x-0.5' : ''
                  }`} />
                  <span className="hidden sm:inline font-mono text-sm">
                    {message.trim() ? 'Send' : 'Type...'}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onStop}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 animate-pulse hover:animate-none"
                >
                  <Square className="w-4 h-4" />
                  <span className="hidden sm:inline font-mono text-sm">Stop</span>
                </button>
              )}
            </div>
          </div>
        </form>
        
        {/* Tips & Shortcuts */}
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="font-mono">⌃⏎</span>
              <span>Send</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono">⇧⏎</span>
              <span>New line</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono">Esc</span>
              <span>Clear</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {message.length > 3000 && (
              <span className={`font-mono font-medium ${ 
                message.length > 3800 
                  ? 'text-red-400 animate-pulse' 
                  : message.length > 3500
                    ? 'text-amber-400'
                    : 'text-slate-400'
              }`}>
                {4000 - message.length} chars left
              </span>
            )}
            {isLoading && (
              <span className="font-mono text-amber-400 animate-pulse">
                ⏳ Generating...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}