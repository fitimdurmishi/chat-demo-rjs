# ChatGPT Clone

A modern ChatGPT-like frontend interface built with React + Vite and TailwindCSS.

## Features

- **Modern UI**: Clean, responsive interface similar to ChatGPT
- **Conversation Management**: Sidebar with conversation history
- **Real-time Chat**: Message input with Enter key support
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Supports both theme modes
- **Loading States**: Animated typing indicators
- **Message Formatting**: Support for user and assistant messages

## Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** - Code linting

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.jsx    # Main chat interface
│   ├── MessageList.jsx      # Messages container
│   ├── Message.jsx          # Individual message component
│   ├── MessageInput.jsx     # Message input form
│   └── Sidebar.jsx          # Conversation sidebar
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css               # Global styles with Tailwind
```

## Customization

This is a demo interface with simulated AI responses. To connect to a real AI service:

1. Replace the simulated response in `ChatInterface.jsx`
2. Add your AI service API integration
3. Handle authentication and API keys
4. Implement proper error handling

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
