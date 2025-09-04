import { Download, Upload, Trash2, Bot, ChevronDown, Circle } from 'lucide-react';

interface ChatHeaderProps {
  status: string;
  selectedModel: string;
  onModelChange: (model: string) => void;
  onClear: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export function ChatHeader({
  status,
  selectedModel,
  onModelChange,
  onClear,
  onExport,
  onImport
}: ChatHeaderProps) {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onImport(file);
    };
    input.click();
  };

  return (
    <header className="border-b border-slate-700 py-6 bg-slate-800/50">
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <Circle 
                className={`absolute -top-1 -right-1 w-3 h-3 ${
                  status === 'Ready' ? 'text-green-500 fill-green-500' : 'text-amber-500 fill-amber-500'
                }`}
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-100">
                Puter AI Chat
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-sm font-medium ${
                  status === 'Ready' ? 'text-green-400' : 'text-amber-400'
                }`}>
                  {status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-blue-400 appearance-none pr-10 text-slate-100"
              >
                <option value="">Default</option>
                <option value="gpt-4o-mini">GPT-4O Mini</option>
                <option value="gpt-4o">GPT-4O</option>
                <option value="llama-3.1-70b">Llama 3.1 70B</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4" />
            </div>
            
            <div className="flex items-center bg-slate-800 rounded-lg border border-slate-600">
              <button
                onClick={onClear}
                className="text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors px-3 py-2 text-sm flex items-center gap-2 rounded-l-lg border-r border-slate-600"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
              
              <button
                onClick={onExport}
                className="text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-colors px-3 py-2 text-sm flex items-center gap-2 border-r border-slate-600"
                title="Export chat"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              <button
                onClick={handleImportClick}
                className="text-slate-400 hover:text-green-400 hover:bg-slate-700 transition-colors px-3 py-2 text-sm flex items-center gap-2 rounded-r-lg"
                title="Import chat"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}