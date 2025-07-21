import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import Sidebar from './components/Sidebar'
import conversationsData from './data/conversationsData' // Assuming you have some initial conversations data

function App() {
  const [conversations, setConversations] = useState(conversationsData)
  const [activeConversation, setActiveConversation] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleDeleteConversation = (id) => {
    setConversations(prev => prev.filter(conv => conv.id !== id))
    // If the deleted conversation was active, switch to another one or none
    if (activeConversation === id) {
      const remaining = conversations.filter(conv => conv.id !== id)
      setActiveConversation(remaining.length > 0 ? remaining[0].id : null)
    }
  }

  const onRenameConversation = (id, newTitle) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, title: newTitle } : conv
      )
    );
  };

  const addNewConversation = () => {
    const newId = conversations.length > 0 ? Math.max(...conversations.map(c => c.id)) + 1 : 1
    const newConversation = { 
      id: newId, 
      title: 'New Chat', 
      messages: [] 
    }
    setConversations(prev => [...prev, newConversation])
    setActiveConversation(newId)
  }

  const updateConversation = (id, messages) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, messages, title: messages.length > 0 ? messages[0].content.slice(0, 30) + '...' : 'New Chat' }
          : conv
      )
    )
  }

  const currentConversation = conversations.find(c => c.id === activeConversation)

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidebar 
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
        onNewConversation={addNewConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={onRenameConversation}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatInterface 
          conversation={currentConversation}
          onUpdateConversation={updateConversation}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  )
}

export default App
