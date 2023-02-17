import { Route, Routes } from "react-router"
import Register from "./pages/auth/Register"
import LandingPage from "./pages/LandingPage"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
