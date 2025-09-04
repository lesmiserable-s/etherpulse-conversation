# AI Chatbot with Puter Integration

A modern, responsive chatbot application built with React, TypeScript, and Puter AI services. Features real-time streaming responses, file processing capabilities, and a clean, professional interface.

## ✨ Features

- **Real-time Chat**: Streaming responses with live typing indicators
- **File Processing**: Drag & drop support for text files (txt, md, csv, json, js, ts, py, html, css, xml)
- **Message Management**: Edit, delete, and manage conversation history
- **Data Persistence**: Automatic save/load of chat sessions to localStorage
- **Export/Import**: Backup and restore chat conversations
- **Model Selection**: Support for different AI models through Puter AI
- **Responsive Design**: Modern, mobile-friendly interface with Tailwind CSS
- **Dark Theme**: Professional dark mode interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Puter AI access (application must run in Puter environment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/beydemirfurkan/chatbot-with-puter.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` or deploy to Puter platform

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reloading |
| `npm run build` | Build production-ready application |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run preview` | Preview production build locally |

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Build Tool**: Vite 7
- **AI Integration**: Puter AI Services
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── chat-header.tsx   # Header with model selection & controls
│   ├── chat-input.tsx    # Message input with file upload
│   ├── message-item.tsx  # Individual message display
│   └── messages-container.tsx # Message list container
├── hooks/
│   └── useChat.ts        # Main chat logic and state management
├── types/
│   └── chat.ts           # TypeScript type definitions
├── utils/
│   ├── puter.ts          # Puter AI integration
│   ├── storage.ts        # LocalStorage utilities
│   └── markdown.ts       # Markdown rendering utilities
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

## 🔧 Configuration

### Environment Setup
This application is designed to run within the Puter environment, which provides the AI services through `window.puter.ai.chat`. No additional API keys are required.

### Customization
- **Models**: Modify available models in the chat header component
- **Styling**: Customize themes in `tailwind.config.js` and component styles
- **File Types**: Extend supported file types in the file processing logic

## 📱 Usage

1. **Start Chatting**: Type your message in the input field and press Enter
2. **File Upload**: Drag and drop text files directly into the chat area
3. **Message Actions**: Hover over messages to edit or delete them
4. **Export Data**: Use the header menu to backup your conversations
5. **Model Selection**: Choose different AI models from the dropdown

## 🔒 Privacy & Security

- All chat data is stored locally in your browser's localStorage
- No external servers store your conversation data
- File processing happens entirely in your browser
- Export/import functions work with local JSON files

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Puter
Upload the built application to your Puter environment for full AI integration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Furkan Beydemir**
- GitHub: [@beydemirfurkan](https://github.com/beydemirfurkan)
- Project Repository: [chatbot-with-puter](https://github.com/beydemirfurkan/chatbot-with-puter)

## 🙏 Acknowledgments

- [Puter](https://puter.com) for AI services integration
- [Vite](https://vitejs.dev) for lightning-fast build tooling
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [Lucide](https://lucide.dev) for beautiful icons

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
