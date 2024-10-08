import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useAuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
function App() {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className=" h-screen p-4 flex items-center justify-center">
        <div className="lds-roller text-white"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className=" h-screen p-4 flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
