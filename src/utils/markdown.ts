export function renderMarkdown(text: string): string {
  if (!text) return '';
  
  let s = text;
  
  // Escape HTML
  s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Code blocks with syntax highlighting
  s = s.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || 'text';
    return `<pre class="bg-slate-800 border border-slate-600 rounded-lg p-4 my-3 overflow-x-auto"><code class="language-${language} text-sm font-mono text-slate-200">${code.trim()}</code></pre>`;
  });
  
  // Inline code
  s = s.replace(/`([^`]+?)`/g, '<code class="bg-slate-800 text-slate-200 px-2 py-1 rounded text-sm font-mono">$1</code>');
  
  // Headers
  s = s.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-slate-100">$1</h3>');
  s = s.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2 text-slate-100">$1</h2>');
  s = s.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-3 text-slate-100">$1</h1>');
  
  // Bold/italic
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>')
       .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
  
  // Links
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300 underline">$1 ↗</a>');
  
  // Lists
  s = s.replace(/^\* (.+$)/gim, '<li class="ml-4">$1</li>');
  s = s.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1 my-2">$1</ul>');
  
  // Blockquotes
  s = s.replace(/^> (.+$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-2 bg-slate-800/50 rounded-r">$1</blockquote>');
  
  // Line breaks
  s = s.replace(/\n\n/g, '</p><p class="mb-3">');
  s = s.replace(/\n/g, '<br>');
  
  return `<p class="mb-3">${s}</p>`;
}

export function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}