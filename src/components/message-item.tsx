import { Copy, Edit, Trash2, User, Bot } from 'lucide-react';
import { useRef } from 'react';
import { renderMarkdown, stripHtml } from '../utils/markdown';
import type { Message } from '../types/chat';

interface MessageItemProps {
  message: Message;
  onEdit: (content: string) => void;
  onDelete: (id: string) => void;
}

export function MessageItem({ message, onEdit, onDelete }: MessageItemProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  const handleEdit = () => {
    onEdit(message.content);
  };

  const handleDelete = () => {
    if (messageRef.current) {
      messageRef.current.style.opacity = '0';
      messageRef.current.style.transform = 'translateY(-10px)';
      messageRef.current.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
      setTimeout(() => {
        onDelete(message.id);
      }, 200);
    } else {
      onDelete(message.id);
    }
  };

  const isUser = message.role === 'user';
  
  return (
    <div ref={messageRef} className={`slide-in group mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] md:max-w-[60%] ${
        isUser ? 'order-2' : 'order-1'
      }`}>
        {/* Message Bubble */}
        <div className={`relative p-4 rounded-2xl transition-all duration-200 ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-md hover:bg-blue-700' 
            : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-md hover:bg-slate-750'
        }`}>
          {/* Message Actions */}
          <div className={`absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 ${
            isUser ? '-left-20' : '-right-20'
          }`}>
            <button
              onClick={handleCopy}
              className="hover:text-blue-400 hover:bg-slate-700 text-slate-400 transition-colors p-1 rounded-full bg-slate-800/80 backdrop-blur-sm"
              title="Copy message"
            >
              <Copy className="w-3 h-3" />
            </button>
            
            <button
              onClick={handleEdit}
              className="hover:text-amber-400 hover:bg-slate-700 text-slate-400 transition-colors p-1 rounded-full bg-slate-800/80 backdrop-blur-sm"
              title="Edit message"
            >
              <Edit className="w-3 h-3" />
            </button>
            
            <button
              onClick={handleDelete}
              className="hover:text-red-400 hover:bg-slate-700 text-slate-400 transition-colors p-1 rounded-full bg-slate-800/80 backdrop-blur-sm"
              title="Delete message"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          
          {/* Message Content */}
          <div
            className={`message-body text-sm leading-relaxed font-mono max-w-none ${
              isUser ? 'text-white' : 'text-slate-200'
            }`}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
          />
          
          {/* Timestamp & Status */}
          <div className={`flex items-center gap-2 mt-2 text-xs ${
            isUser ? 'text-blue-100/70 justify-end' : 'text-slate-400 justify-start'
          }`}>
            <span className="font-mono">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        
        {/* Avatar & Name */}
        <div className={`flex items-center gap-2 mt-2 ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <div className={`flex items-center gap-2 ${
            isUser ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              isUser ? 'bg-blue-500' : 'bg-slate-600'
            }`}>
              {isUser ? (
                <User className="w-3 h-3 text-white" />
              ) : (
                <Bot className="w-3 h-3 text-blue-400" />
              )}
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {isUser ? 'You' : 'Assistant'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}