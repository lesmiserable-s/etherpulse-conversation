import { useState } from 'react';
import { ChatHeader } from './components/chat-header';
import { MessagesContainer } from './components/messages-container';
import { ChatInput } from './components/chat-input';
import { useChat } from './hooks/useChat';
import { exportChatData, importChatData } from './utils/storage';

function App() {
  const [editingContent, setEditingContent] = useState('');
  
  const {
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
  } = useChat();

  const handleEditMessage = (content: string) => {
    setEditingContent(content);
  };

  const handleSendMessage = (message: string) => {
    setEditingContent('');
    sendMessage(message);
  };

  const handleImport = async (file: File) => {
    try {
      await importChatData(file);
      window.location.reload();
    } catch (error) {
      alert('Invalid JSON file');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-mono antialiased">
      <div className="min-h-screen flex flex-col max-w-5xl mx-auto">
      <ChatHeader
        status={status}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onClear={clearMessages}
        onExport={exportChatData}
        onImport={handleImport}
      />
      
      <MessagesContainer
        messages={messages}
        isLoading={isLoading}
        onEditMessage={handleEditMessage}
        onDeleteMessage={deleteMessage}
        onFileDrop={processDroppedFiles}
      />
      
      <ChatInput
        onSendMessage={handleSendMessage}
        onStop={stopGeneration}
        isLoading={isLoading}
        initialValue={editingContent}
      />
      </div>
    </div>
  );
}

export default App;
