import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthContextProvider } from './contexts/AuthContext'
import { FriendContextProvider } from './contexts/FriendContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AuthContextProvider>
      <FriendContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </FriendContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
)
