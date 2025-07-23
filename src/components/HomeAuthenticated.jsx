import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatInterface from './ChatInterface';
import Sidebar from './Sidebar';
import conversationsData from '../data/conversationsData'; // Assuming you have some initial conversations data
// import { useAuth0 } from '@auth0/auth0-react';

function HomeAuthenticated() {
//   const { isAuthenticated, login } = useAuth0(); // Get authenticated user
  const { t } = useTranslation()
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
      title: t('common.new_chat'), 
      messages: [] 
    }
    setConversations(prev => [...prev, newConversation])
    setActiveConversation(newId)
  }

  const updateConversation = (id, messages) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, messages } // just update messages for this conversation
          : conv
      )
    )
  }

  const currentConversation = conversations.find(c => c.id === activeConversation)

  const handleShareConversation = (id) => {
    console.log(`Share conversation ${id}. TODO: implement this`);
  }

  const handleArchiveConversation = (id) => {
    console.log(`Archive conversation ${id}. TODO: implement this`);
  };

  const handleUserInfoClick = () => {
    console.log('TODO: handle user info click.');
    // alert('TODO: handle user info click.');    
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidebar 
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
        onNewConversation={addNewConversation}
        isOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={onRenameConversation}
        onShareConversation={handleShareConversation}
        onArchiveConversation={handleArchiveConversation}
        onUserInfoClick={handleUserInfoClick}
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

export default HomeAuthenticated