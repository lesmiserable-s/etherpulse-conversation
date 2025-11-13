# EtherPulse Conversational Studio

EtherPulse Conversational Studio is an AI-native chat workspace that fuses Puter’s serverless APIs with a React + TypeScript interface. Use it to prototype assistants, test new prompt-driven workflows, or embed conversational experiences straight into the browser.

## Highlights

- **Live Puter Connectivity** — Stream responses from Puter-backed inference services with minimal setup.
- **Conversation Intelligence** — Threaded chat history, markdown rendering, and adaptive avatars keep sessions readable.
- **Developer Friendly** — Built with Vite, Tailwind-inspired styling, and modular components designed for remixing.
- **Local State Persistence** — Conversations survive refreshes thanks to client-side storage helpers.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the printed URL in your browser and begin exploring.

## Configuration

Create a `.env` file at the project root and define any credentials required for your Puter account or preferred AI providers. Never commit these secrets to version control.

```
VITE_PUTER_API_KEY=your-key-here
```

Additional runtime options can be adjusted in `src/utils/puter.ts`.

## Project Structure

- `src/components` houses the chat UI elements such as headers, message bubbles, and input controls.
- `src/hooks/useChat.ts` orchestrates message state, streaming updates, and error handling.
- `src/utils` contains adapters for markdown parsing, Puter API access, and local persistence.

Refer to inline comments and TypeScript interfaces for guidance while extending the experience.

## Testing Ideas

- Run conversations with varying model parameters to ensure resilience.
- Validate markdown rendering with code blocks, tables, and lists.
- Simulate network drop-outs to verify reconnection logic.

## Contributing

Feel free to fork the project, experiment with new assistant behaviors, or refactor components to fit your needs. When opening pull requests, include a short summary and any relevant screenshots or screen recordings.

## License

Released under the MIT License. See `LICENSE` for details.