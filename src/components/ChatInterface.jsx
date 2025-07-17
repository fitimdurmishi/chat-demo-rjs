import { useState } from 'react'
import PropTypes from 'prop-types'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatInterface = ({ conversation, onUpdateConversation, onToggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(false)

  // Safety check for conversation
  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No conversation selected
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please select or create a new conversation to start chatting.
          </p>
        </div>
      </div>
    )
  }

  const handleSendMessage = async (content) => {
    if (!content.trim() || !conversation) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    const newMessages = [...conversation.messages, userMessage]
    onUpdateConversation(conversation.id, newMessages)

    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I'm a demo AI assistant. In a real implementation, this would be connected to an actual AI service like OpenAI's GPT API. Your message was: "${content}"`,
        timestamp: new Date()
      }
      
      onUpdateConversation(conversation.id, [...newMessages, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle sidebar"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI Chat Demo
        </h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={conversation.messages} 
          isLoading={isLoading}
        />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <MessageInput 
          onSendMessage={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}

ChatInterface.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        role: PropTypes.oneOf(['user', 'assistant']).isRequired,
        content: PropTypes.string.isRequired,
        timestamp: PropTypes.instanceOf(Date).isRequired,
      })
    ).isRequired,
  }).isRequired,
  onUpdateConversation: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
}

export default ChatInterface
