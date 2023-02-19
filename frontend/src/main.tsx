import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthContextProvider } from './contexts/AuthContext'
import { ChatContextProvider } from './contexts/ChatContext'
import { FriendContextProvider } from './contexts/FriendContext'
import { MessageContextProvider } from './contexts/MessageContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AuthContextProvider>
      <FriendContextProvider>
        <ChatContextProvider>
          <MessageContextProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </MessageContextProvider>
        </ChatContextProvider>
      </FriendContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
)
