import { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import AuthContext from "./contexts/AuthContext"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"

function App() {

  const { state } = useContext(AuthContext);

  const { user } = state;

  return (
    <div>
      <Routes>
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" /> } />
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
      </Routes>
    </div>
  )
}

export default App
