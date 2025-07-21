import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import Sidebar from './components/Sidebar'

function App() {
  const [conversations, setConversations] = useState([
    { id: 1, title: 'New Chat', messages: [] },
    { id: 2, title: 'What is React and how does it work?', messages: [{ id: 1, role: 'user', content: 'What is React?', timestamp: new Date() }] },
    { id: 3, title: 'JavaScript Array Methods', messages: [{ id: 1, role: 'user', content: 'Tell me about JavaScript array methods', timestamp: new Date() }] },
    { id: 4, title: 'CSS Grid vs Flexbox', messages: [{ id: 1, role: 'user', content: 'What is the difference between CSS Grid and Flexbox?', timestamp: new Date() }] },
    { id: 5, title: 'Node.js Best Practices', messages: [{ id: 1, role: 'user', content: 'What are Node.js best practices?', timestamp: new Date() }] },
    { id: 6, title: 'Database Design Principles', messages: [{ id: 1, role: 'user', content: 'Database design principles', timestamp: new Date() }] },
    { id: 7, title: 'API Design and REST', messages: [{ id: 1, role: 'user', content: 'How to design good APIs?', timestamp: new Date() }] },
    { id: 8, title: 'Machine Learning Basics', messages: [{ id: 1, role: 'user', content: 'Explain machine learning basics', timestamp: new Date() }] },
    { id: 9, title: 'Cloud Computing Overview', messages: [{ id: 1, role: 'user', content: 'What is cloud computing?', timestamp: new Date() }] },
    { id: 10, title: 'Cybersecurity Fundamentals', messages: [{ id: 1, role: 'user', content: 'Cybersecurity fundamentals', timestamp: new Date() }] }
  ])
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
