import { useContext, useRef } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Socket } from "socket.io-client"
import ChatBox from "./components/ChatBox"
import AuthContext from "./contexts/AuthContext"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"

function App() {

  const { state } = useContext(AuthContext);

  const { user } = state;

  const socket = useRef<Socket>(null!);

  return (
    <div>
      <Routes>
        <Route path="/home" element={user ? <Home socket={socket} /> : <Navigate to="/login" /> } />
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/chat" element={<ChatBox socket={socket} />} />
      </Routes>
    </div>
  )
}

export default App
