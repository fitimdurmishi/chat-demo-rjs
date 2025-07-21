import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

const Sidebar = ({ 
  conversations, 
  activeConversation, 
  onSelectConversation, 
  onNewConversation, 
  isOpen,
  onToggle,
  onDeleteConversation
}) => {
  const scrollRef = useRef(null)
  const [dialogOpenId, setDialogOpenId] = useState(null) // Track which dialog is open

  // Auto-scroll to bottom when new conversations are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversations.length])
  return (
    <>
      {/* Sidebar */}
      <div
        className={`${isOpen ? 'w-64' : 'w-0'} 
                    transition-all duration-300 overflow-hidden
                    bg-gray-900 text-white flex flex-col sidebar-container flex-shrink-0`}
        style={{ minWidth: isOpen ? '256px' : '0px' }}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex-shrink-0">
          <button
            onClick={onNewConversation}
            className="w-full flex items-center justify-center space-x-2 
                     bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     min-h-[52px] flex-shrink-0"
            aria-label="Start new conversation"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Chat</span>
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 conversations-container">
          <div ref={scrollRef} className="conversations-scroll scrollbar-thin p-2">
            {conversations.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs mt-1">Start a new chat to begin</p>
              </div>
            ) : (
              <div className="space-y-1 pb-4">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="relative group">
                    <button
                      onClick={() => onSelectConversation(conversation.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors
                                 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                   activeConversation === conversation.id 
                                     ? 'bg-gray-800 border-l-4 border-blue-500' 
                                     : ''
                                 }`}
                      aria-label={`Select conversation: ${conversation.title}`}
                    >
                      <div className="truncate text-sm">
                        {conversation.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {conversation.messages.length} messages
                      </div>
                    </button>
                    {/* Delete button */}
                    <button
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                      title="Delete conversation"
                      onClick={() => setDialogOpenId(conversation.id)}
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {/* Popup Dialog */}
                    {dialogOpenId === conversation.id && (
                      <div className="absolute z-50 top-8 right-2 bg-white text-gray-900 rounded shadow-lg p-4 w-56">
                        <div className="mb-2 font-semibold">Delete Conversation?</div>
                        <div className="mb-4 text-sm">Are you sure you want to delete this conversation?</div>
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                            onClick={() => setDialogOpenId(null)}
                            type="button"
                          >
                            Cancel
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => {
                              onDeleteConversation(conversation.id)
                              setDialogOpenId(null)
                            }}
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Demo User</div>
              <div className="text-xs text-gray-400">Free Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
          aria-label="Close sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onToggle()
            }
          }}
        />
      )}
    </>
  )
}

Sidebar.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      messages: PropTypes.array.isRequired,
    })
  ).isRequired,
  activeConversation: PropTypes.number.isRequired,
  onSelectConversation: PropTypes.func.isRequired,
  onNewConversation: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default Sidebar
