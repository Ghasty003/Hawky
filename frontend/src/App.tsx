import { useContext, lazy, Suspense } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import AuthContext from "./contexts/AuthContext"
import LandingPage from "./pages/LandingPage";
import Loading from "./components/Loading";

function App() {

  const { state } = useContext(AuthContext);

  const { user } = state;

  const Home = lazy(() => import("./pages/Home"));
  const Login = lazy(() => import("./pages/auth/Login"));
  const Register = lazy(() => import("./pages/auth/Register"));

  return (
    <div>
      <Routes>
        <Route index path="/" element={!user ? <LandingPage /> : <Navigate to="/home" />} />

        <Route path="/home" element={
          <Suspense fallback={<Loading />}>
            { user ? <Home /> : <Navigate to="/login" /> }
          </Suspense> 
        } />

        <Route path="/login" element={
          <Suspense fallback={<Loading />}>
            { !user ? <Login /> : <Navigate to="/home" /> }
          </Suspense> 
        } />

        <Route path="/register" element={
          <Suspense fallback={<Loading />}>
            { !user ? <Register /> : <Navigate to="/home" /> }
          </Suspense> 
        } />
      </Routes>
    </div>
  )
}

export default App
