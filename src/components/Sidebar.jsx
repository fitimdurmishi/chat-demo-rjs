import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Sidebar = ({ 
  conversations, 
  activeConversation, 
  onSelectConversation, 
  onNewConversation, 
  isOpen,
  onToggleSidebar,
  onDeleteConversation,
  onRenameConversation,
  onShareConversation,
  onArchiveConversation,
  onUserInfoClick
}) => {
  const env = import.meta.env.VITE_ENVIRONMENT // Get the environment variable
  const { t } = useTranslation()
  const scrollRef = useRef(null)
  const [menuOpenId, setMenuOpenId] = useState(null) // Track which menu is open
  const [renameId, setRenameId] = useState(null) // Track which conversation is being renamed
  const [renameValue, setRenameValue] = useState('') // Rename input value
  const [deleteConfirmId, setDeleteConfirmId] = useState(null) // Track which delete dialog is open
  const [shareId, setShareId] = useState(null) // Track which conversation is being shared
  const [archiveId, setArchiveId] = useState(null) // Track which conversation is being archived

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
                     bg-gray-800 hover:bg-gray-700 px-3 py-3 rounded-lg transition-colors
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     h-[52px]"
            aria-label={t('sidebar.new_conversation')}
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{t('common.new_chat')}</span>
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
                    <div
                      onClick={() => onSelectConversation(conversation.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors
                        hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          activeConversation === conversation.id
                            ? 'bg-gray-800 border-l-4 border-blue-500'
                            : ''
                        }`}
                      aria-label={`Select conversation: ${conversation.title}`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onSelectConversation(conversation.id)
                        }
                      }}
                    >
                      <div className="truncate text-sm">
                        {renameId === conversation.id ? (
                          <form
                            onSubmit={e => {
                              e.preventDefault()
                              onRenameConversation(conversation.id, renameValue)
                              setRenameId(null)
                            }}
                            className="flex items-center space-x-2"
                          >
                            <input
                              className="border rounded px-2 py-1 text-sm w-full text-gray-400"
                              value={renameValue}
                              autoFocus
                              onChange={e => setRenameValue(e.target.value)}
                              maxLength={50}
                            />
                            <button type="submit" className="text-blue-600 text-xs px-2">Save</button>
                            <button type="button" className="text-gray-500 text-xs px-2" onClick={() => setRenameId(null)}>Cancel</button>                            
                          </form>
                        ) : (
                          conversation.title
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {conversation.messages.length} messages
                      </div>
                    </div>
                    {/* More (three dots) button */}
                    {renameId !== conversation.id && (
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="More actions"
                        onClick={() => setMenuOpenId(menuOpenId === conversation.id ? null : conversation.id)}
                        type="button"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="5" cy="12" r="1.5" />
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="19" cy="12" r="1.5" />
                        </svg>
                      </button>
                    )}
                    {/* More menu popup */}
                    {menuOpenId === conversation.id && (
                      <div className="absolute z-50 top-8 right-2 bg-white text-gray-900 rounded shadow-lg w-40">
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => {
                            setShareId(conversation.id)
                            setMenuOpenId(null)
                          }}
                          type="button"
                        >
                          {/* Share Icon */}
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 9l5-5 5 5" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12" />
                          </svg>
                          {t('common.share')}
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => {
                            setRenameId(conversation.id)
                            setRenameValue(conversation.title)
                            setMenuOpenId(null)
                          }}
                          type="button"
                        >
                          {/* Pencil icon */}
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6h6v-6H3v6z" />
                          </svg>
                          {t('common.rename')}
                        </button>
                        <hr className="border-t border-gray-200 my-1" />
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => {
                            setArchiveId(conversation.id)
                            setMenuOpenId(null)
                          }}
                          type="button"
                        >
                          {/* Archive Icon */}
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="4" rx="2" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 12h4" />
                          </svg>
                          {t('common.archive')}
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                          onClick={() => {
                            setDeleteConfirmId(conversation.id)
                            setMenuOpenId(null)
                          }}
                          type="button"
                        >
                          {/* Trash/Delete Icon */}
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m5 0H4" />
                          </svg>
                          {t('common.delete')}
                        </button>
                      </div>
                    )}
                    {/* Delete confirmation dialog */}
                    {deleteConfirmId === conversation.id && (
                      <div className="absolute z-50 top-8 right-2 bg-white text-gray-900 rounded shadow-lg p-4 w-56">
                        <div className="mb-2 font-semibold">{t('common.delete')} {t('sidebar.conversation_menu')}?</div>
                        <div className="mb-4 text-sm">{t('sidebar.delete_confirmation')}</div>
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                            onClick={() => setDeleteConfirmId(null)}
                            type="button"
                          >
                            {t('common.cancel')}
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => {
                              onDeleteConversation(conversation.id)
                              setDeleteConfirmId(null)
                            }}
                            type="button"
                          >
                            {t('common.delete')}
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Share dialog */}
                    {shareId === conversation.id && (
                      <div className="absolute z-50 top-8 right-2 bg-white text-gray-900 rounded shadow-lg p-4 w-56">
                        <div className="mb-2 font-semibold">Share this conversation?</div>
                        <div className="mb-4 text-sm">TODO:</div>
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                            onClick={() => setShareId(null)}
                            type="button"
                          >
                            Cancel
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => {
                              onShareConversation(conversation.id)
                              setShareId(null)
                            }}
                            type="button"
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Archive dialog */}
                    {archiveId === conversation.id && (
                      <div className="absolute z-50 top-8 right-2 bg-white text-gray-900 rounded shadow-lg p-4 w-56">
                        <div className="mb-2 font-semibold">Archive this conversation?</div>
                        <div className="mb-4 text-sm">TODO:</div>
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                            onClick={() => setArchiveId(null)}
                            type="button"
                          >
                            Cancel
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => {
                              onArchiveConversation(conversation.id)
                              setArchiveId(null)
                            }}
                            type="button"
                          >
                            Archive
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
        <div className="p-4 border-t border-gray-700 flex-shrink-0 transition-colors hover:bg-gray-800 hover:rounded-xl"
          onClick={onUserInfoClick}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Demo User</div>
              <div className="text-xs text-gray-400">Free Plan</div>
              <div className="text-xs text-gray-400">Env: {env}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggleSidebar}
          aria-label="Close sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onToggleSidebar()
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
  onToggleSidebar: PropTypes.func.isRequired,
  onDeleteConversation: PropTypes.func.isRequired,
  onRenameConversation: PropTypes.func.isRequired,
  onShareConversation: PropTypes.func.isRequired,
  onArchiveConversation: PropTypes.func.isRequired,
  onUserInfoClick: PropTypes.func.isRequired,
}

export default Sidebar
